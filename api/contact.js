import { createTransport } from 'nodemailer';

export default async function handler(req, res) {
  // Enable CORS
  // Restrict allowed origins for safety; add more if needed
  const allowedOrigins = [
    'https://asog.vercel.app',
    'https://asog.vercel.app/',
    'https://www.asog.vercel.app',
    'http://localhost:8080',
  ];
  const originHeader = req.headers.origin || '';
  const origin = allowedOrigins.includes(originHeader) ? originHeader : '';

  // Set CORS headers early so preflight receives them
  if (origin) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    // Fallback to allow all if origin isn't in whitelist (less secure)
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    // Respond to preflight request
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    // Debug: parse query params safely and check headers for debug bypass
    try {
      const urlObj = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
      req.query = Object.fromEntries(urlObj.searchParams.entries());
    } catch (e) {
      req.query = {};
    }

    const debugMode =
      req.query.debug === '1' ||
      (req.headers && (req.headers['x-skip-smtp'] === '1' || req.headers['x-debug'] === '1'));

    // If debug mode is enabled, skip sending email and return success for testing CORS and plumbing
    if (debugMode) {
      if (origin) {
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Origin', origin);
      } else {
        res.setHeader('Access-Control-Allow-Origin', '*');
      }
      res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
      res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

      return res.status(200).json({
        message: 'Debug mode - mail not sent',
        debug: true,
        data: { name, email, message },
      });
    }

    // Get credentials from environment variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const recipientEmail = process.env.RECIPIENT_EMAIL || 'techwiththefather@gmail.com';
    const fromEmail = process.env.FROM_EMAIL || smtpUser;

    if (!smtpHost || !smtpUser || !smtpPass) {
      throw new Error('SMTP credentials not configured');
    }

    const transporter = createTransport({
      host: smtpHost,
      port: 587,
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        ciphers: 'SSLv3'
      }
    });

    // Prepare mail options
    const mailOptions = {
      from: `"Portfolio Contact" <${fromEmail}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `Portfolio Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          </div>
          <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3>Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    // Ensure CORS headers are present on the final response as well
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', origin === 'null' ? '*' : origin);

    res.status(200).json({
      message: 'Email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    res.status(500).json({
      message: 'Failed to send email',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}