const { Resend } = require('resend');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const { toEmail, subject, bodyHtml, imageBase64 } = req.body || {};

  if (!toEmail || !subject || !bodyHtml) {
    return res.status(400).json({ error: 'Missing required fields: toEmail, subject, bodyHtml' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

  const attachments = imageBase64
    ? [{ filename: 'mockup.png', content: imageBase64, content_id: 'mockup-preview' }]
    : [];

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      reply_to: 'matissemk12@gmail.com',
      subject,
      html: bodyHtml,
      attachments,
    });

    if (result.error) {
      return res.status(500).json({ error: result.error.message || 'Resend error' });
    }

    res.json({ ok: true, id: result.data?.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
