import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { initDB, getPool, isConnected } from './db.js';
import { hashPassword, comparePassword, generateToken, requireAuth } from './auth.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../../dist');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Auto-rewrite routes without /api prefix (e.g. /auth/login -> /api/auth/login)
app.use((req, res, next) => {
  if (!req.path.startsWith('/api') && (
    req.path.startsWith('/auth') ||
    req.path.startsWith('/admin') ||
    req.path.startsWith('/leads') ||
    req.path.startsWith('/demo') ||
    req.path.startsWith('/trial-signup') ||
    req.path.startsWith('/contact') ||
    req.path.startsWith('/health') ||
    req.path.startsWith('/plans') ||
    req.path.startsWith('/login')
  )) {
    req.url = '/api' + req.url;
  }
  next();
});

// Catch JSON parse errors from invalid bodies
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Malformed JSON payload' });
  }
  next();
});

// Initialize database
await initDB();

// ---------------------------------------------------------------------------
// 1. SYSTEM HEALTH
// ---------------------------------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: {
      connected: isConnected(),
      engine: 'MySQL 8.0',
      database: process.env.DB_NAME || 'sales_avatar',
      host: process.env.DB_HOST || 'localhost'
    }
  });
});

// ---------------------------------------------------------------------------
// 2. AUTHENTICATION & ADMIN SESSION
// ---------------------------------------------------------------------------
app.post('/api/auth/login', async (req, res) => {
  const pool = getPool();
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    if (!pool) return res.status(500).json({ error: 'Database connection unavailable' });

    // 1. Look up admin in admin_users
    const [rows] = await pool.query(
      'SELECT id, name, email, password_hash, role FROM admin_users WHERE email = ? LIMIT 1',
      [email.toLowerCase().trim()]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const admin = rows[0];
    const isMatch = await comparePassword(password, admin.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // 2. Generate signed JWT token
    const token = generateToken({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    });

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (err) {
    console.error('[Auth Error]', err);
    res.status(500).json({ error: 'Internal server error during authentication' });
  }
});

// Compatibility route for existing modals
app.post('/api/login', (req, res, next) => {
  // Delegate directly to auth/login
  req.url = '/api/auth/login';
  app._router.handle(req, res, next);
});

app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

// ---------------------------------------------------------------------------
// 3. PUBLIC LEAD GENERATION ENDPOINTS
// ---------------------------------------------------------------------------

/**
 * Universal Inbound Lead Capture Endpoint
 * Captures from: Demo Modal, Trial Modal, Contact Form, Quick Inquiry, ROI Calculator
 */
app.post('/api/leads', async (req, res) => {
  const pool = getPool();
  const {
    name,
    email,
    phone = '',
    company = '',
    source = 'Website Form',
    plan = 'Professional',
    teamSize = '10-50',
    dealValue = 75000,
    message = '',
    notes = ''
  } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and Work Email are required to generate lead' });
  }

  try {
    if (!pool) return res.status(500).json({ error: 'Database unavailable' });

    // Round-robin reps assignment
    const reps = ['Prince Tiwari', 'Pooja Kapri', 'Ananya Sharma', 'Rahul Kapoor'];
    const assignedRep = reps[Math.floor(Math.random() * reps.length)];

    const combinedNotes = notes || message || `Inbound inquiry via ${source}`;

    const [result] = await pool.query(`
      INSERT INTO leads 
      (name, email, phone, company, source, plan_interested, team_size, deal_value, stage, assigned_to, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'New Inbound', ?, ?)
    `, [
      name.trim(),
      email.toLowerCase().trim(),
      phone.trim(),
      company.trim(),
      source,
      plan,
      teamSize,
      dealValue,
      assignedRep,
      combinedNotes
    ]);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your inquiry has been registered. Our CRM specialist will reach out shortly.',
      leadId: result.insertId
    });
  } catch (err) {
    console.error('[Lead Capture Error]', err);
    res.status(500).json({ error: 'Failed to capture lead: ' + err.message });
  }
});

// Legacy Demo endpoint - forwards to unified leads table
app.post('/api/demo', async (req, res) => {
  const pool = getPool();
  const name = req.body.name || req.body.fullName;
  const email = req.body.email || req.body.workEmail;
  const company = req.body.company || req.body.companyName;
  const phone = req.body.phone || '';
  const teamSize = req.body.teamSize || req.body.team_size || '10-50';
  const message = req.body.message || '';

  if (!name || !email || !company) {
    return res.status(400).json({ error: 'Name, Email, and Company are required' });
  }

  try {
    if (!pool) return res.status(500).json({ error: 'Database connection unavailable' });

    // 1. Insert into unified leads table
    const [leadRes] = await pool.query(`
      INSERT INTO leads (name, email, phone, company, source, team_size, stage, notes)
      VALUES (?, ?, ?, ?, 'Website Demo', ?, 'New Inbound', ?)
    `, [name, email, phone, company, teamSize, message || 'Requested 1-on-1 personalized demo']);

    // 2. Also keep demo_requests record
    await pool.query(`
      INSERT INTO demo_requests (name, email, company, phone, team_size, message)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [name, email, company, phone, teamSize, message]);

    res.status(201).json({
      success: true,
      message: 'Demo request received! Our sales engineering team will reach out within 2 hours.',
      leadId: leadRes.insertId
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Legacy Trial Signup endpoint - forwards to unified leads table
app.post('/api/trial-signup', async (req, res) => {
  const pool = getPool();
  const { name, email, phone, company, plan, billingCycle, usersCount } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and Work Email are required' });
  }

  try {
    if (!pool) return res.status(500).json({ error: 'Database unavailable' });

    // 1. Insert into unified leads
    const [leadRes] = await pool.query(`
      INSERT INTO leads (name, email, phone, company, source, plan_interested, team_size, stage, notes)
      VALUES (?, ?, ?, ?, 'Free Trial Signup', ?, ?, 'New Inbound', ?)
    `, [
      name, 
      email, 
      phone || '', 
      company || '', 
      plan || 'Professional', 
      usersCount || '10-20', 
      `14-day trial requested (${billingCycle || 'monthly'} billing)`
    ]);

    // 2. Insert into trial_signups
    await pool.query(
      `INSERT INTO trial_signups (name, email, phone, company, plan, billing_cycle)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE name=VALUES(name), phone=VALUES(phone), company=VALUES(company), plan=VALUES(plan)`,
      [name, email, phone || '', company || '', plan || 'Professional', billingCycle || 'monthly']
    );

    res.status(201).json({
      success: true,
      message: '14-day free trial activated successfully! Check your inbox for instant login instructions.',
      leadId: leadRes.insertId
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Legacy Contact endpoint - forwards to unified leads table
app.post('/api/contact', async (req, res) => {
  const pool = getPool();
  const { name, email, company, phone, requirement, message, teamSize } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    if (!pool) return res.status(500).json({ error: 'Database unavailable' });

    const notes = requirement || message || 'Contact form inquiry';
    const leadSource = req.body.source || 'Contact Page';

    const [leadRes] = await pool.query(`
      INSERT INTO leads (name, email, phone, company, source, team_size, stage, notes)
      VALUES (?, ?, ?, ?, ?, ?, 'New Inbound', ?)
    `, [name, email, phone || '', company || '', leadSource, teamSize || '10-50', notes]);

    await pool.query(
      `INSERT INTO contact_inquiries (name, email, company, phone, requirement)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, company || '', phone || '', notes]
    );

    res.status(201).json({
      success: true,
      message: 'Inquiry received! Our enterprise team will prepare a custom proposal.',
      leadId: leadRes.insertId
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------------------------
// 4. PROTECTED ADMIN LEAD MANAGEMENT ENDPOINTS (Require JWT Auth)
// ---------------------------------------------------------------------------

/**
 * GET /api/admin/leads
 * Fetch filtered, sorted, searchable leads
 */
app.get('/api/admin/leads', requireAuth, async (req, res) => {
  const pool = getPool();
  const { search = '', stage = 'all', source = 'all', sortBy = 'newest' } = req.query;

  try {
    if (!pool) return res.status(500).json({ error: 'Database connection unavailable' });

    let sql = 'SELECT * FROM leads WHERE 1=1';
    const params = [];

    if (stage && stage !== 'all') {
      sql += ' AND stage = ?';
      params.push(stage);
    }

    if (source && source !== 'all') {
      sql += ' AND source = ?';
      params.push(source);
    }

    if (search && search.trim() !== '') {
      const q = `%${search.trim()}%`;
      sql += ' AND (name LIKE ? OR email LIKE ? OR company LIKE ? OR phone LIKE ?)';
      params.push(q, q, q, q);
    }

    if (sortBy === 'value_desc') {
      sql += ' ORDER BY deal_value DESC';
    } else if (sortBy === 'value_asc') {
      sql += ' ORDER BY deal_value ASC';
    } else {
      sql += ' ORDER BY created_at DESC';
    }

    const [rows] = await pool.query(sql, params);
    res.json({ success: true, count: rows.length, leads: rows });
  } catch (err) {
    console.error('[Admin Leads Error]', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/admin/leads/stats
 * Key performance indicators for leads dashboard
 */
app.get('/api/admin/leads/stats', requireAuth, async (req, res) => {
  const pool = getPool();
  try {
    if (!pool) return res.status(500).json({ error: 'Database unavailable' });

    const [totalRows] = await pool.query('SELECT COUNT(*) as total, SUM(deal_value) as totalValue FROM leads');
    const [stageRows] = await pool.query(`
      SELECT stage, COUNT(*) as count, SUM(deal_value) as stageValue 
      FROM leads 
      GROUP BY stage
    `);

    const stageMap = {};
    stageRows.forEach(r => {
      stageMap[r.stage] = { count: r.count, value: r.stageValue || 0 };
    });

    res.json({
      success: true,
      stats: {
        totalLeads: totalRows[0].total || 0,
        totalPipelineValue: totalRows[0].totalValue || 0,
        newInbound: stageMap['New Inbound']?.count || 0,
        contacted: stageMap['Contacted']?.count || 0,
        qualified: stageMap['Qualified']?.count || 0,
        proposalSent: stageMap['Proposal Sent']?.count || 0,
        closedWon: stageMap['Closed Won']?.count || 0,
        closedWonRevenue: stageMap['Closed Won']?.value || 0,
        closedLost: stageMap['Closed Lost']?.count || 0
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * PATCH /api/admin/leads/:id
 * Update lead stage, notes, deal value, or assigned representative
 */
app.patch('/api/admin/leads/:id', requireAuth, async (req, res) => {
  const pool = getPool();
  const leadId = req.params.id;
  const { stage, deal_value, assigned_to, notes, follow_up_date } = req.body;

  try {
    if (!pool) return res.status(500).json({ error: 'Database unavailable' });

    const updates = [];
    const params = [];

    if (stage !== undefined) {
      updates.push('stage = ?');
      params.push(stage);
    }
    if (deal_value !== undefined) {
      updates.push('deal_value = ?');
      params.push(Number(deal_value));
    }
    if (assigned_to !== undefined) {
      updates.push('assigned_to = ?');
      params.push(assigned_to);
    }
    if (notes !== undefined) {
      updates.push('notes = ?');
      params.push(notes);
    }
    if (follow_up_date !== undefined) {
      updates.push('follow_up_date = ?');
      params.push(follow_up_date);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields provided for update' });
    }

    params.push(leadId);
    await pool.query(`UPDATE leads SET ${updates.join(', ')} WHERE id = ?`, params);

    const [updated] = await pool.query('SELECT * FROM leads WHERE id = ?', [leadId]);
    res.json({ success: true, lead: updated[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/admin/leads/manual
 * Admin manually creates a new lead
 */
app.post('/api/admin/leads/manual', requireAuth, async (req, res) => {
  const pool = getPool();
  const { name, email, phone, company, stage = 'New Inbound', deal_value = 50000, assigned_to, notes, plan_interested = 'Professional' } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    if (!pool) return res.status(500).json({ error: 'Database unavailable' });

    const [result] = await pool.query(`
      INSERT INTO leads (name, email, phone, company, source, stage, deal_value, assigned_to, notes, plan_interested)
      VALUES (?, ?, ?, ?, 'Admin Manual Entry', ?, ?, ?, ?, ?)
    `, [
      name,
      email,
      phone || '',
      company || '',
      stage,
      Number(deal_value) || 0,
      assigned_to || req.user.name,
      notes || '',
      plan_interested
    ]);

    const [created] = await pool.query('SELECT * FROM leads WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, lead: created[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE /api/admin/leads/:id
 * Delete a lead
 */
app.delete('/api/admin/leads/:id', requireAuth, async (req, res) => {
  const pool = getPool();
  try {
    if (!pool) return res.status(500).json({ error: 'Database unavailable' });

    await pool.query('DELETE FROM leads WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/**
 * POST /api/admin/leads/bulk-stage
 * Update stages for multiple leads
 */
app.post('/api/admin/leads/bulk-stage', requireAuth, async (req, res) => {
  const pool = getPool();
  const { leadIds, stage } = req.body;
  if (!Array.isArray(leadIds) || leadIds.length === 0 || !stage) {
    return res.status(400).json({ error: 'leadIds array and stage are required' });
  }

  try {
    if (!pool) return res.status(500).json({ error: 'Database unavailable' });
    const placeholders = leadIds.map(() => '?').join(',');
    await pool.query(
      `UPDATE leads SET stage = ? WHERE id IN (${placeholders})`,
      [stage, ...leadIds]
    );
    res.json({ success: true, count: leadIds.length, stage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/admin/leads/bulk-delete
 * Delete multiple leads
 */
app.post('/api/admin/leads/bulk-delete', requireAuth, async (req, res) => {
  const pool = getPool();
  const { leadIds } = req.body;
  if (!Array.isArray(leadIds) || leadIds.length === 0) {
    return res.status(400).json({ error: 'leadIds array is required' });
  }

  try {
    if (!pool) return res.status(500).json({ error: 'Database unavailable' });
    const placeholders = leadIds.map(() => '?').join(',');
    await pool.query(
      `DELETE FROM leads WHERE id IN (${placeholders})`,
      leadIds
    );
    res.json({ success: true, count: leadIds.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/admin/leads/export
 * Download all leads as formatted CSV
 */
app.get('/api/admin/leads/export', requireAuth, async (req, res) => {
  const pool = getPool();
  try {
    if (!pool) return res.status(500).json({ error: 'Database unavailable' });

    const [rows] = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');

    const headers = ['ID', 'Name', 'Email', 'Phone', 'Company', 'Source', 'Stage', 'Deal Value (INR)', 'Assigned To', 'Created Date', 'Notes'];
    const csvLines = [headers.join(',')];

    rows.forEach(r => {
      const line = [
        r.id,
        `"${(r.name || '').replace(/"/g, '""')}"`,
        `"${(r.email || '').replace(/"/g, '""')}"`,
        `"${(r.phone || '').replace(/"/g, '""')}"`,
        `"${(r.company || '').replace(/"/g, '""')}"`,
        `"${(r.source || '').replace(/"/g, '""')}"`,
        `"${(r.stage || '').replace(/"/g, '""')}"`,
        r.deal_value || 0,
        `"${(r.assigned_to || '').replace(/"/g, '""')}"`,
        `"${new Date(r.created_at).toISOString().split('T')[0]}"`,
        `"${(r.notes || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`
      ];
      csvLines.push(line.join(','));
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="salesavatar-leads.csv"');
    res.send(csvLines.join('\n'));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------------------------
// 4b. SALES REPS MANAGEMENT ENDPOINTS (Require JWT Auth)
// ---------------------------------------------------------------------------

/**
 * GET /api/admin/reps
 * Fetch all sales reps with active leads and won deal metrics
 */
app.get('/api/admin/reps', requireAuth, async (req, res) => {
  const pool = getPool();
  try {
    if (!pool) return res.status(500).json({ error: 'Database unavailable' });

    const [reps] = await pool.query('SELECT * FROM sales_reps ORDER BY name ASC');
    const [leadStats] = await pool.query(`
      SELECT 
        assigned_to,
        COUNT(*) as total_leads,
        SUM(deal_value) as total_pipeline,
        SUM(CASE WHEN stage = 'Closed Won' THEN 1 ELSE 0 END) as won_count,
        SUM(CASE WHEN stage = 'Closed Won' THEN deal_value ELSE 0 END) as won_revenue
      FROM leads
      GROUP BY assigned_to
    `);

    const statsMap = {};
    leadStats.forEach(s => {
      statsMap[s.assigned_to] = {
        totalLeads: Number(s.total_leads) || 0,
        totalPipeline: Number(s.total_pipeline) || 0,
        wonCount: Number(s.won_count) || 0,
        wonRevenue: Number(s.won_revenue) || 0
      };
    });

    const enrichedReps = reps.map(r => ({
      ...r,
      totalLeads: statsMap[r.name]?.totalLeads || 0,
      totalPipeline: statsMap[r.name]?.totalPipeline || 0,
      wonCount: statsMap[r.name]?.wonCount || 0,
      wonRevenue: statsMap[r.name]?.wonRevenue || 0
    }));

    res.json({ success: true, reps: enrichedReps });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/admin/reps
 * Add a new sales representative
 */
app.post('/api/admin/reps', requireAuth, async (req, res) => {
  const pool = getPool();
  const { name, email, phone, role = 'Sales Executive', quota = 1000000 } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    if (!pool) return res.status(500).json({ error: 'Database unavailable' });

    const [existing] = await pool.query('SELECT id FROM sales_reps WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'A sales representative with this email already exists' });
    }

    const [result] = await pool.query(
      'INSERT INTO sales_reps (name, email, phone, role, quota) VALUES (?, ?, ?, ?, ?)',
      [name.trim(), email.trim(), phone ? phone.trim() : '', role.trim(), Number(quota) || 1000000]
    );

    const [created] = await pool.query('SELECT * FROM sales_reps WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, rep: created[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * PATCH /api/admin/reps/:id
 * Update sales representative details or quota
 */
app.patch('/api/admin/reps/:id', requireAuth, async (req, res) => {
  const pool = getPool();
  const repId = req.params.id;
  const { name, email, phone, role, quota, status } = req.body;

  try {
    if (!pool) return res.status(500).json({ error: 'Database unavailable' });

    const updates = [];
    const params = [];

    if (name !== undefined) { updates.push('name = ?'); params.push(name.trim()); }
    if (email !== undefined) { updates.push('email = ?'); params.push(email.trim()); }
    if (phone !== undefined) { updates.push('phone = ?'); params.push(phone.trim()); }
    if (role !== undefined) { updates.push('role = ?'); params.push(role.trim()); }
    if (quota !== undefined) { updates.push('quota = ?'); params.push(Number(quota)); }
    if (status !== undefined) { updates.push('status = ?'); params.push(status); }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields provided for update' });
    }

    params.push(repId);
    await pool.query(`UPDATE sales_reps SET ${updates.join(', ')} WHERE id = ?`, params);

    const [updated] = await pool.query('SELECT * FROM sales_reps WHERE id = ?', [repId]);
    res.json({ success: true, rep: updated[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE /api/admin/reps/:id
 * Delete a sales representative
 */
app.delete('/api/admin/reps/:id', requireAuth, async (req, res) => {
  const pool = getPool();
  const repId = req.params.id;

  try {
    if (!pool) return res.status(500).json({ error: 'Database unavailable' });

    await pool.query('DELETE FROM sales_reps WHERE id = ?', [repId]);
    res.json({ success: true, message: 'Sales representative removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------------------------
// 5. PUBLIC WEBSITE DATA APIS
// ---------------------------------------------------------------------------
app.get('/api/stats', async (req, res) => {
  const pool = getPool();
  let liveLeads = 148290;
  if (pool) {
    try {
      const [count] = await pool.query('SELECT COUNT(*) as c FROM leads');
      if (count && count[0].c > 0) liveLeads = 148290 + count[0].c;
    } catch {
      // fallback
    }
  }

  res.json({
    activeCompanies: 500,
    totalLeadsCaptured: liveLeads,
    averageConversionIncrease: '85%',
    averageProductivityGain: '70%',
    uptimePercentage: '99.98%'
  });
});

// Serve production static assets if dist exists
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`[Sales Avatar Server] Running on http://localhost:${PORT} with secure leads & auth engine`);
});
