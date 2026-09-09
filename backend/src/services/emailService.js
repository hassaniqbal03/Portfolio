const nodemailer = require('nodemailer');
const env = require('../config/env');

let transporter = null;

const getTransporter = () => {
  if (!env.SMTP_USER || !env.SMTP_PASS) {
    return null;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });
  }

  return transporter;
};

/**
 * Send email notification to admin when someone submits a contact form message.
 */
const sendContactNotification = async ({ name, email, subject, message, created_at }) => {
  const mailer = getTransporter();

  if (!mailer) {
    console.info(
      `[EMAIL NOTICE] New message from "${name}" (${email}) saved to DB. Email notification skipped because SMTP_PASS is not configured in backend/.env.`
    );
    return false;
  }

  const dateStr = created_at ? new Date(created_at).toLocaleString() : new Date().toLocaleString();

  const mailOptions = {
    from: `"Portfolio Contact Alert" <${env.SMTP_USER}>`,
    to: env.NOTIFY_EMAIL,
    replyTo: email,
    subject: `🔔 New Portfolio Message: ${subject || 'General Inquiry'} (from ${name})`,
    text: `You received a new message on your portfolio website:\n\n` +
      `From: ${name} (${email})\n` +
      `Subject: ${subject || 'N/A'}\n` +
      `Date: ${dateStr}\n\n` +
      `Message:\n${message}\n\n` +
      `Reply directly to this email to respond to ${name}.`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; color: #e2e8f0; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #131b2e; border-radius: 16px; border: 1px solid rgba(99, 102, 241, 0.25); overflow: hidden; }
          .header { background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%); padding: 24px; text-align: center; }
          .header h1 { margin: 0; color: #ffffff; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
          .content { padding: 28px 24px; }
          .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; font-weight: 700; margin-bottom: 4px; }
          .field-value { font-size: 15px; color: #f8fafc; font-weight: 600; margin-bottom: 18px; }
          .message-box { background: #0b0f19; border-left: 4px solid #6366f1; padding: 18px; border-radius: 8px; color: #cbd5e1; font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin-top: 8px; }
          .footer { padding: 18px 24px; background: #0f172a; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid rgba(255, 255, 255, 0.05); }
          .reply-btn { display: inline-block; margin-top: 20px; background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%); color: #ffffff; text-decoration: none; padding: 10px 22px; border-radius: 9999px; font-weight: 700; font-size: 13px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Portfolio Contact Submission</h1>
          </div>
          <div class="content">
            <div class="field-label">Sender Name</div>
            <div class="field-value">${name}</div>

            <div class="field-label">Email Address</div>
            <div class="field-value"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></div>

            <div class="field-label">Subject</div>
            <div class="field-value">${subject || 'No Subject'}</div>

            <div class="field-label">Received At</div>
            <div class="field-value" style="font-size: 13px; color: #94a3b8;">${dateStr}</div>

            <div class="field-label">Message Content</div>
            <div class="message-box">${message}</div>

            <div style="text-align: center;">
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || 'Portfolio Inquiry')}" class="reply-btn">
                Reply to ${name}
              </a>
            </div>
          </div>
          <div class="footer">
            Sent automatically from your Portfolio Contact Form • ${env.FRONTEND_URL.split(',')[0]}
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    const info = await mailer.sendMail(mailOptions);
    console.log(`[EMAIL SUCCESS] Notification sent to ${env.NOTIFY_EMAIL} (messageId: ${info.messageId})`);
    return true;
  } catch (error) {
    console.error(`[EMAIL ERROR] Failed to send notification email:`, error.message);
    return false;
  }
};

module.exports = {
  sendContactNotification,
};
