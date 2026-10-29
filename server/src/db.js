import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { hashPassword } from './auth.js';

dotenv.config();

let pool = null;
let isMySQLConnected = false;

export async function initDB() {
  const host = process.env.DB_HOST || 'localhost';
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '8425';
  const database = process.env.DB_NAME || 'sales_avatar';

  try {
    // 1. Ensure database exists
    const rootConn = await mysql.createConnection({
      host,
      user,
      password,
      connectTimeout: 5000
    });
    await rootConn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await rootConn.end();

    // 2. Establish connection pool
    pool = mysql.createPool({
      host,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 15,
      queueLimit: 0,
      connectTimeout: 5000
    });

    const testConn = await pool.getConnection();
    console.log(`[Database] Connected successfully to MySQL database "${database}" at ${host}`);
    isMySQLConnected = true;
    testConn.release();

    // 3. Initialize Admin Users Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        email VARCHAR(120) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'Super Admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 4. Initialize Unified Leads Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        email VARCHAR(120) NOT NULL,
        phone VARCHAR(50),
        company VARCHAR(150),
        source VARCHAR(60) DEFAULT 'Website Demo',
        plan_interested VARCHAR(60) DEFAULT 'Professional',
        team_size VARCHAR(50) DEFAULT '10-50',
        deal_value DECIMAL(12, 2) DEFAULT 75000.00,
        stage VARCHAR(50) DEFAULT 'New Inbound',
        assigned_to VARCHAR(120) DEFAULT 'Prince Tiwari',
        notes TEXT,
        follow_up_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_stage (stage),
        INDEX idx_created (created_at),
        INDEX idx_source (source)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 4b. Initialize Sales Reps Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sales_reps (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        email VARCHAR(120) NOT NULL UNIQUE,
        phone VARCHAR(50),
        role VARCHAR(100) DEFAULT 'Sales Executive',
        quota DECIMAL(12, 2) DEFAULT 1000000.00,
        status VARCHAR(30) DEFAULT 'Active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 5. Initialize Legacy Compatibility Tables (if needed)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS demo_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        email VARCHAR(120) NOT NULL,
        company VARCHAR(150) NOT NULL,
        phone VARCHAR(50),
        team_size VARCHAR(50) DEFAULT '10-50',
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS trial_signups (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        email VARCHAR(120) NOT NULL,
        phone VARCHAR(50),
        company VARCHAR(150),
        plan VARCHAR(50) DEFAULT 'Professional',
        billing_cycle VARCHAR(20) DEFAULT 'monthly',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        email VARCHAR(120) NOT NULL,
        company VARCHAR(150),
        phone VARCHAR(50),
        requirement TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 6. Seed Super Admin User if table is empty
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@salesavatar.com';
    const adminDefaultPass = process.env.ADMIN_DEFAULT_PASSWORD || 'Admin@12345';
    
    const [existingAdmins] = await pool.query('SELECT id FROM admin_users WHERE email = ? LIMIT 1', [adminEmail]);
    if (existingAdmins.length === 0) {
      const hashed = await hashPassword(adminDefaultPass);
      await pool.query(
        'INSERT INTO admin_users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
        ['SalesAvatar Admin', adminEmail, hashed, 'Super Admin']
      );
      console.log(`[Database] Seeded default super admin user: ${adminEmail}`);
    }

    // 7. Seed Initial Demo Leads if leads table is empty
    const [existingLeads] = await pool.query('SELECT COUNT(*) as count FROM leads');
    if (existingLeads[0].count === 0) {
      const seedLeads = [
        ['Ananya Kapoor', 'ananya.k@tatacapital.com', '+91 98201 44512', 'Tata Capital Commercial', 'Website Demo', 'Professional', '25-50', 145000, 'New Inbound', 'Prince Tiwari', 'Requested 1-on-1 walkthrough for 30 commercial lending reps.'],
        ['Rohan Deshmukh', 'rohan.d@infosys-sales.com', '+91 99805 12890', 'Infosys Regional Sales', 'Free Trial', 'Business', '50+', 280000, 'Contacted', 'Pooja Kapri', 'Interested in GPS geofencing & mobile attendance for field sales.'],
        ['Siddharth Mehta', 'siddharth@reliancepolymers.in', '+91 98112 67432', 'Reliance Polymers B2B', 'ROI Calculator', 'Business', '50+', 420000, 'Qualified', 'Ananya Sharma', 'Calculated ₹5.4 Lakh monthly savings on field visit disputes.'],
        ['Meenakshi Sundaram', 'meenakshi@adaniinfra.com', '+91 97412 88910', 'Adani Infra & EPC', 'Contact Form', 'Enterprise', '50+', 750000, 'Proposal Sent', 'Prince Tiwari', 'Custom quotation sent with 99.9% uptime SLA and DPDP compliance.'],
        ['Vikram Singhania', 'vikram@singhaniatubes.com', '+91 94220 15678', 'Singhania Polychem', 'Website Demo', 'Professional', '10-25', 185000, 'Closed Won', 'Pooja Kapri', 'Signed 1-year annual contract with computerized GST ITC invoice.']
      ];

      for (const lead of seedLeads) {
        await pool.query(`
          INSERT INTO leads 
          (name, email, phone, company, source, plan_interested, team_size, deal_value, stage, assigned_to, notes) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, lead);
      }
      console.log('[Database] Seeded 5 reference leads into database.');
    }

    // 8. Seed Default Sales Reps if table is empty
    const [existingReps] = await pool.query('SELECT COUNT(*) as count FROM sales_reps');
    if (existingReps[0].count === 0) {
      const defaultReps = [
        ['Prince Tiwari', 'prince@salesavatar.com', '+91 98765 43210', 'Enterprise AE Specialist', 1500000],
        ['Pooja Kapri', 'pooja@salesavatar.com', '+91 98765 43211', 'Mid-Market Sales Lead', 1000000],
        ['Ananya Sharma', 'ananya@salesavatar.com', '+91 98765 43212', 'Inbound SDR Lead', 800000],
        ['Rahul Kapoor', 'rahul@salesavatar.com', '+91 98765 43213', 'Growth & Strategic Alliances', 800000]
      ];
      for (const rep of defaultReps) {
        await pool.query(
          'INSERT INTO sales_reps (name, email, phone, role, quota) VALUES (?, ?, ?, ?, ?)',
          rep
        );
      }
      console.log('[Database] Seeded 4 default sales representatives.');
    }

    console.log('[Database] MySQL tables verified and ready.');
  } catch (err) {
    console.error(`[Database] MySQL Error: ${err.message}`);
    isMySQLConnected = false;
  }
}

export function getPool() {
  return pool;
}

export function isConnected() {
  return isMySQLConnected;
}
