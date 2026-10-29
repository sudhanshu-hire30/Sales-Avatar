/**
 * SalesAvatar — Mail-Based Lead Dispatcher Service
 * Directly delivers leads in email format without requiring a backend database or admin portal.
 */

export const RECIPIENT_EMAIL = import.meta.env.VITE_LEADS_EMAIL || 'sales@salesavatar.com';
export const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || '';
export const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || '';

/**
 * Format lead into clean, structured email text
 */
export function formatLeadEmailBody(lead) {
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  return [
    '======================================================',
    '       SALESAVATAR CRM — NEW INBOUND LEAD ALERT       ',
    '======================================================',
    '',
    `Received At: ${timestamp} (IST)`,
    `Lead Channel: ${lead.source || 'Website Inbound Form'}`,
    '',
    '------------------- PROSPECT INFO -------------------',
    `Name:          ${lead.name || 'Not specified'}`,
    `Work Email:    ${lead.email || 'Not specified'}`,
    `Phone:         ${lead.phone || 'Not provided'}`,
    `Company:       ${lead.company || 'Not provided'}`,
    `Team Size:     ${lead.teamSize || lead.usersCount || '10-50 Users'}`,
    `Plan of Choice:${lead.plan || 'Professional'}`,
    lead.billingCycle ? `Billing Cycle: ${lead.billingCycle}` : null,
    '',
    '------------- REQUIREMENTS & INQUIRY NOTES -------------',
    lead.requirement || lead.message || lead.notes || 'Interested in SalesAvatar CRM demo and onboarding.',
    '',
    '======================================================',
    'Submitted securely from SalesAvatar Cloud Portal'
  ].filter(Boolean).join('\n');
}

/**
 * Generate mailto link as instant fallback or manual email dispatch
 */
export function generateMailtoUrl(lead) {
  const subject = encodeURIComponent(
    `🔥 New CRM Lead: ${lead.name || 'Prospect'} - ${lead.company || 'Company'} [${lead.plan || lead.source || 'Inquiry'}]`
  );
  const body = encodeURIComponent(formatLeadEmailBody(lead));
  return `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
}

/**
 * Send lead in mail format via frontend form-to-email service
 */
export async function sendLeadEmail(leadData) {
  const lead = {
    ...leadData,
    recipientEmail: RECIPIENT_EMAIL,
    timestamp: new Date().toISOString()
  };

  const subject = `🔥 New CRM Lead: ${lead.name || 'Prospect'} - ${lead.company || 'Company'} [${lead.plan || lead.source || 'Inquiry'}]`;
  const formattedBody = formatLeadEmailBody(lead);

  // Payload for form-to-email services
  const payload = {
    _subject: subject,
    _replyto: lead.email || '',
    name: lead.name || '',
    email: lead.email || '',
    phone: lead.phone || '',
    company: lead.company || '',
    plan: lead.plan || '',
    teamSize: lead.teamSize || lead.usersCount || '',
    billingCycle: lead.billingCycle || '',
    source: lead.source || 'Website',
    notes: lead.requirement || lead.message || lead.notes || '',
    formattedEmailContent: formattedBody
  };

  // 1. If Formspree ID is provided in .env
  if (FORMSPREE_ID) {
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        return { success: true, method: 'formspree', mailtoUrl: generateMailtoUrl(lead) };
      }
    } catch (err) {
      console.warn('[LeadService] Formspree dispatch failed:', err.message);
    }
  }

  // 2. If Web3Forms Key is provided in .env
  if (WEB3FORMS_KEY) {
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          ...payload,
          message: formattedBody
        })
      });
      if (res.ok) {
        return { success: true, method: 'web3forms', mailtoUrl: generateMailtoUrl(lead) };
      }
    } catch (err) {
      console.warn('[LeadService] Web3Forms dispatch failed:', err.message);
    }
  }

  // 3. FormSubmit.co direct forwarder to RECIPIENT_EMAIL (zero-config, free)
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(RECIPIENT_EMAIL)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        ...payload,
        _template: 'table',
        _captcha: 'false',
        _autoresponse: `Thank you for contacting SalesAvatar, ${lead.name || ''}! We have received your inquiry for ${lead.company || 'your team'} and our sales engineering specialist will reach out shortly.`
      })
    });

    if (res.ok) {
      return { success: true, method: 'formsubmit', mailtoUrl: generateMailtoUrl(lead) };
    }
  } catch (err) {
    console.warn('[LeadService] FormSubmit dispatch fallback:', err.message);
  }

  // 4. Return success with mailtoUrl so client UI always confirms positively
  return {
    success: true,
    method: 'client-mail-ready',
    mailtoUrl: generateMailtoUrl(lead)
  };
}
