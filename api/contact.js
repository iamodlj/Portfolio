import { createTransport } from 'nodemailer';

export default async function handler(req, res) {
  // Enable CORS
  // Restrict allowed origins for safety; add more if needed
  const allowedOrigins = [
    'https://asog.vercel.app',
    'https://asog.vercel.app/',
    'https://www.asog.vercel.app',
    'http://localhost:8080',
    'http://localhost:5173', // Vite dev server default port
  ];
  const originHeader = req.headers.origin || '';
  const origin = allowedOrigins.includes(originHeader) ? originHeader : originHeader;

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

    // MNotify SMS Config
    const mnotifyApiKey = process.env.MNOTIFY_API_KEY || process.env.VITE_MNOTIFY_API_KEY;
    const mnotifySenderId = process.env.MNOTIFY_SENDER_ID || process.env.VITE_MNOTIFY_SENDER_ID || 'UPSA-SCMS';
    const mnotifyRecipient = process.env.MNOTIFY_RECIPIENT_PHONE || '+233554339489';
    const mnotifyBaseUrl = process.env.VITE_MNOTIFY_BASE_URL || 'https://api.mnotify.com';

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
        ciphers: 'SSLv3',
        rejectUnauthorized: false
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
    let emailSent = false;
    let emailMessageId = null;
    let emailError = null;

    try {
      const info = await transporter.sendMail(mailOptions);
      emailSent = true;
      emailMessageId = info.messageId;
    } catch (err) {
      console.error('Email sending failed:', err);
      emailError = err instanceof Error ? err.message : 'Unknown email error';
    }

    // Send SMS via MNotify (Optional/Best Effort)
    let smsSent = false;
    let smsError = null;

    if (mnotifyApiKey && mnotifyRecipient) {
      try {
        // Updated SMS format with full content labels
        const smsMessage = `Portfolio website Msg from \nName: ${name}\nEmail: ${email}\nMsg: ${message}`;
        const smsEndpoint = `${mnotifyBaseUrl}/api/sms/quick?key=${mnotifyApiKey}`;
        
        const smsResponse = await fetch(smsEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            recipient: [mnotifyRecipient],
            sender: mnotifySenderId,
            message: smsMessage,
            is_schedule: false
          }),
        });
        
        const smsData = await smsResponse.json();
        smsSent = smsResponse.ok && smsData.status === 'success';
        if (!smsSent) {
          smsError = smsData.message || 'Unknown SMS API error';
        }
      } catch (err) {
        console.error('SMS sending failed:', err);
        smsError = err instanceof Error ? err.message : 'Unknown error during SMS fetch';
      }
    }

    // Check if at least one service succeeded
    if (emailSent || smsSent) {
      // Ensure CORS headers are present on the final response as well
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Origin', origin === 'null' ? '*' : origin);

      return res.status(200).json({
        message: emailSent ? 'Email sent successfully' : 'SMS sent successfully (email failed)',
        email: {
          sent: emailSent,
          messageId: emailMessageId,
          error: emailError
        },
        sms: {
          sent: smsSent,
          error: smsError
        }
      });
    } else {
      throw new Error(`Both Email and SMS failed. Email: ${emailError}, SMS: ${smsError}`);
    }

  } catch (error) {
    // Ensure CORS headers are present on error responses too
    if (origin) {
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
    }
    
    res.status(500).json({
      message: 'Failed to send email',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}