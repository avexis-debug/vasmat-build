const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const data = req.body;

    // Honeypot anti-spam
    if (data._honey) return res.status(200).json({ success: true });

    const clientEmail = process.env.CONTACT_EMAIL;
    const siteName = process.env.SITE_NAME || 'Un site client';

    let content = '';
    for (const [key, value] of Object.entries(data)) {
      if (key === '_honey' || key === '_next' || key === '_subject') continue;
      const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
      content += `<p><strong>${label} :</strong> ${value}</p>`;
    }

    await resend.emails.send({
      from: 'notifications@siteexpress24.com',
      to: clientEmail,
      subject: `Nouvelle demande de devis — ${siteName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #1A5276;">Nouvelle demande de devis</h2>
          <p>Un prospect a rempli le formulaire sur <strong>${siteName}</strong> :</p>
          <hr style="border: 1px solid #eee;">
          ${content}
          <hr style="border: 1px solid #eee;">
          <p style="color: #888; font-size: 12px;">Envoyé via SiteExpress24</p>
        </div>
      `
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Err envoi email' });
  }
};
