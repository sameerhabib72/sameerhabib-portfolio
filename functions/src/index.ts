import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { onRequest } from 'firebase-functions/v2/https';
import { setGlobalOptions } from 'firebase-functions/v2';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

// Set global options for region & concurrency
setGlobalOptions({
  region: 'us-central1',
  maxInstances: 10,
  timeoutSeconds: 60,
  memory: '256MiB',
});

// Default notification recipient
const DEFAULT_RECIPIENT = process.env.NOTIFICATION_RECIPIENT_EMAIL || 'sameerhabib72@gmail.com';

/**
 * Interface for email parameters
 */
interface EmailPayload {
  recipient?: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  source: string;
  replyTo?: string;
}

/**
 * Universal email dispatcher: Attempts SendGrid first, then Nodemailer / SMTP, then logs to Firestore
 */
async function dispatchEmail(payload: EmailPayload): Promise<{ success: boolean; provider: string; info: string }> {
  const recipient = payload.recipient || DEFAULT_RECIPIENT;
  const sendgridKey = process.env.SENDGRID_API_KEY;
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  // 1. Try SendGrid if API key is configured
  if (sendgridKey) {
    try {
      sgMail.setApiKey(sendgridKey);
      const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'notifications@sameerhabib.dev';
      const fromName = process.env.SENDGRID_FROM_NAME || 'Sameer Habib Portfolio Alerts';

      await sgMail.send({
        to: recipient,
        from: {
          email: fromEmail,
          name: fromName,
        },
        replyTo: payload.replyTo || payload.senderEmail,
        subject: payload.subject,
        text: payload.textContent,
        html: payload.htmlContent,
      });

      await logNotification(payload, recipient, 'sendgrid', 'delivered');
      return { success: true, provider: 'sendgrid', info: `Sent via SendGrid to ${recipient}` };
    } catch (sendgridError: any) {
      console.warn('SendGrid delivery failed, attempting Nodemailer fallback:', sendgridError?.message);
    }
  }

  // 2. Try Nodemailer / SMTP if credentials are configured
  if (smtpHost && smtpUser && smtpPass) {
    try {
      const port = parseInt(process.env.SMTP_PORT || '465', 10);
      const secure = process.env.SMTP_SECURE === 'true' || port === 465;

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port,
        secure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const fromName = process.env.SMTP_FROM_NAME || 'Sameer Habib Portfolio Alerts';
      const fromEmail = process.env.SMTP_FROM_EMAIL || smtpUser;

      await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: recipient,
        replyTo: payload.replyTo || payload.senderEmail,
        subject: payload.subject,
        text: payload.textContent,
        html: payload.htmlContent,
      });

      await logNotification(payload, recipient, 'nodemailer-smtp', 'delivered');
      return { success: true, provider: 'nodemailer', info: `Sent via Nodemailer to ${recipient}` };
    } catch (smtpError: any) {
      console.warn('Nodemailer SMTP delivery failed:', smtpError?.message);
    }
  }

  // 3. Fallback: Log email record in Firestore with pending/unconfigured status
  await logNotification(payload, recipient, 'cloud-function-logged', 'logged-pending-gateway');
  console.log(`[Notification Queued] Email to ${recipient} logged. Configure SENDGRID_API_KEY or SMTP_* for direct SMTP delivery.`);

  return {
    success: true,
    provider: 'firestore-queue',
    info: `Email notification logged in Firestore. Direct credentials: ${sendgridKey ? 'SendGrid configured' : 'SendGrid not set'}, ${smtpHost ? 'SMTP configured' : 'SMTP not set'}.`,
  };
}

/**
 * Log notification to Firestore for auditing in the Admin Dashboard
 */
async function logNotification(
  payload: EmailPayload,
  recipient: string,
  provider: string,
  status: string
) {
  try {
    const logId = `cf-notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    await db.collection('email_notifications').doc(logId).set({
      id: logId,
      recipient,
      senderName: payload.senderName,
      senderEmail: payload.senderEmail,
      subject: payload.subject,
      message: payload.textContent,
      source: payload.source,
      status,
      provider,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('Could not write notification log in Firestore:', err);
  }
}

// ============================================================================
// TRIGGER 1: Inbound Contact Message Created
// ============================================================================
export const onContactMessageCreated = onDocumentCreated(
  'contact_messages/{messageId}',
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      console.log('No data associated with the event');
      return;
    }

    const data = snapshot.data();
    const messageId = event.params.messageId;
    const name = data.name || 'Anonymous Visitor';
    const email = data.email || 'no-email@provided.com';
    const subject = data.subject || 'New Portfolio Contact Message';
    const message = data.message || 'No message content provided';
    const phone = data.phone || 'Not provided';
    const dateFormatted = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });

    console.log(`[Contact Trigger] Processing new contact message from ${name} (${email}) [ID: ${messageId}]`);

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b0f17; color: #f0f6fc; padding: 32px; border-radius: 16px; border: 1px solid #1f293d;">
        <div style="border-bottom: 2px solid #c87a3e; padding-bottom: 20px; margin-bottom: 24px;">
          <div style="display: inline-block; padding: 4px 10px; background: rgba(200, 122, 62, 0.2); border-radius: 20px; font-size: 11px; font-weight: bold; color: #e59850; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
            Firebase Cloud Functions Alert
          </div>
          <h2 style="margin: 4px 0 0; color: #ffffff; font-size: 24px; font-weight: 800;">🚀 New Client Contact Message</h2>
          <p style="margin: 6px 0 0; color: #94a3b8; font-size: 13px;">Received via Portfolio Contact Section • ${dateFormatted} (PKT)</p>
        </div>

        <div style="background-color: #141b2b; padding: 20px; border-radius: 12px; margin-bottom: 24px; border: 1px solid #1e293b; border-left: 4px solid #c87a3e;">
          <p style="margin: 0 0 10px; font-size: 15px;"><strong style="color: #cbd5e1;">Client / Recruiter:</strong> <span style="color: #ffffff; font-weight: 600;">${name}</span></p>
          <p style="margin: 0 0 10px; font-size: 15px;"><strong style="color: #cbd5e1;">Email:</strong> <a href="mailto:${email}" style="color: #38bdf8; text-decoration: underline;">${email}</a></p>
          <p style="margin: 0 0 10px; font-size: 15px;"><strong style="color: #cbd5e1;">Phone / WhatsApp:</strong> <span style="color: #4ade80;">${phone}</span></p>
          <p style="margin: 0; font-size: 15px;"><strong style="color: #cbd5e1;">Subject:</strong> <span style="color: #f1f5f9;">${subject}</span></p>
        </div>

        <div style="margin-bottom: 28px;">
          <h3 style="color: #e2e8f0; font-size: 15px; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.5px;">Message Details:</h3>
          <div style="background-color: #111827; padding: 20px; border-radius: 12px; font-size: 14px; line-height: 1.7; white-space: pre-wrap; color: #e2e8f0; border: 1px solid #1f2937;">
${message}
          </div>
        </div>

        <div style="text-align: center; margin: 28px 0;">
          <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; background: linear-gradient(135deg, #c87a3e, #d97706); color: #ffffff; padding: 14px 28px; font-weight: bold; text-decoration: none; border-radius: 10px; font-size: 14px;">
            ✉️ Reply Directly to ${name}
          </a>
        </div>

        <div style="border-top: 1px solid #1e293b; margin-top: 32px; padding-top: 16px; font-size: 12px; color: #64748b; text-align: center;">
          Dispatched via Firebase Cloud Function <code>onContactMessageCreated</code> to <strong>${DEFAULT_RECIPIENT}</strong>
        </div>
      </div>
    `;

    const textContent = `New Contact Message from ${name} (${email}):\n\nSubject: ${subject}\nPhone: ${phone}\nDate: ${dateFormatted}\n\nMessage:\n${message}`;

    const result = await dispatchEmail({
      senderName: name,
      senderEmail: email,
      subject: `🔔 [Portfolio Contact] ${subject} — from ${name}`,
      htmlContent,
      textContent,
      source: 'Firebase Cloud Function (Contact Trigger)',
      replyTo: email,
    });

    // Mark document as notified
    await snapshot.ref.update({
      emailNotificationDispatched: true,
      emailNotificationTimestamp: admin.firestore.FieldValue.serverTimestamp(),
      emailNotificationProvider: result.provider,
    });

    console.log(`[Contact Trigger Complete] Result: ${result.info}`);
  }
);

// ============================================================================
// TRIGGER 2: AI Assistant Query Processed
// ============================================================================
export const onAiQueryProcessed = onDocumentCreated(
  'ai_queries/{queryId}',
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      console.log('No data associated with the event');
      return;
    }

    const data = snapshot.data();
    const queryId = event.params.queryId;
    const userQuery = data.userQuery || 'No query provided';
    const assistantReply = data.assistantReply || 'No reply generated';
    const mode = data.mode || 'general';
    const model = data.model || 'gemini-3.8-flash';
    const clientName = data.clientName || 'Website Visitor / Recruiter';
    const clientEmail = data.clientEmail || 'visitor@portfolio.dev';
    const dateFormatted = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });

    console.log(`[AI Query Trigger] Processing query [ID: ${queryId}] (Mode: ${mode})`);

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b0f17; color: #f0f6fc; padding: 32px; border-radius: 16px; border: 1px solid #1f293d;">
        <div style="border-bottom: 2px solid #06b6d4; padding-bottom: 20px; margin-bottom: 24px;">
          <div style="display: inline-block; padding: 4px 10px; background: rgba(6, 182, 212, 0.2); border-radius: 20px; font-size: 11px; font-weight: bold; color: #38bdf8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
            AI Assistant Consultation Alert
          </div>
          <h2 style="margin: 4px 0 0; color: #ffffff; font-size: 24px; font-weight: 800;">🤖 New AI Consultation Query Processed</h2>
          <p style="margin: 6px 0 0; color: #94a3b8; font-size: 13px;">Processed by Sameer's Technical Assistant • ${dateFormatted} (PKT)</p>
        </div>

        <div style="background-color: #0f172a; padding: 18px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #1e293b;">
          <p style="margin: 0 0 8px; font-size: 13px;"><strong style="color: #94a3b8;">Consultation Mode:</strong> <span style="color: #38bdf8; font-weight: bold; text-transform: uppercase;">${mode}</span></p>
          <p style="margin: 0 0 8px; font-size: 13px;"><strong style="color: #94a3b8;">Model Used:</strong> <span style="color: #a855f7; font-family: monospace;">${model}</span></p>
          <p style="margin: 0; font-size: 13px;"><strong style="color: #94a3b8;">User / Visitor:</strong> <span style="color: #f1f5f9;">${clientName} (${clientEmail})</span></p>
        </div>

        <div style="margin-bottom: 24px;">
          <h3 style="color: #38bdf8; font-size: 14px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.5px;">User Question:</h3>
          <div style="background-color: #111827; padding: 16px; border-radius: 10px; font-size: 14px; color: #f8fafc; font-weight: 600; border-left: 4px solid #06b6d4;">
            "${userQuery}"
          </div>
        </div>

        <div style="margin-bottom: 28px;">
          <h3 style="color: #cbd5e1; font-size: 14px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.5px;">Assistant Response Generated:</h3>
          <div style="background-color: #111827; padding: 16px; border-radius: 10px; font-size: 13px; line-height: 1.6; color: #cbd5e1; max-height: 300px; overflow-y: auto; white-space: pre-wrap; border: 1px solid #1f2937;">
${assistantReply}
          </div>
        </div>

        <div style="border-top: 1px solid #1e293b; margin-top: 32px; padding-top: 16px; font-size: 12px; color: #64748b; text-align: center;">
          Dispatched via Firebase Cloud Function <code>onAiQueryProcessed</code> to <strong>${DEFAULT_RECIPIENT}</strong>
        </div>
      </div>
    `;

    const textContent = `New AI Assistant Query Processed:\n\nMode: ${mode}\nModel: ${model}\nUser Query: ${userQuery}\n\nAssistant Response:\n${assistantReply}\n\nTime: ${dateFormatted}`;

    const result = await dispatchEmail({
      senderName: 'AI Technical Assistant',
      senderEmail: 'assistant@sameerhabib.dev',
      subject: `🤖 [AI Query Alert] Mode: ${mode} — "${userQuery.slice(0, 50)}${userQuery.length > 50 ? '...' : ''}"`,
      htmlContent,
      textContent,
      source: 'Firebase Cloud Function (AI Query Trigger)',
      replyTo: clientEmail !== 'visitor@portfolio.dev' ? clientEmail : undefined,
    });

    // Mark document as notified
    await snapshot.ref.update({
      emailNotificationDispatched: true,
      emailNotificationTimestamp: admin.firestore.FieldValue.serverTimestamp(),
      emailNotificationProvider: result.provider,
    });

    console.log(`[AI Query Trigger Complete] Result: ${result.info}`);
  }
);

// ============================================================================
// HTTP CALLABLE ENDPOINT (Optional Webhook / Direct Invocation)
// ============================================================================
export const sendNotificationHttp = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const { type, name, email, subject, message, userQuery, assistantReply, mode } = req.body;

    if (type === 'ai_query') {
      const result = await dispatchEmail({
        senderName: name || 'AI Assistant',
        senderEmail: email || 'assistant@sameerhabib.dev',
        subject: `🤖 [AI Query Alert] ${userQuery ? userQuery.slice(0, 50) : 'New AI Consultation'}`,
        htmlContent: `<p><strong>Query:</strong> ${userQuery}</p><p><strong>Mode:</strong> ${mode}</p><p><strong>Reply:</strong> ${assistantReply}</p>`,
        textContent: `Query: ${userQuery}\nMode: ${mode}\nReply: ${assistantReply}`,
        source: 'Cloud Function HTTP',
      });
      res.json({ success: true, result });
      return;
    }

    const result = await dispatchEmail({
      senderName: name || 'Portfolio Visitor',
      senderEmail: email || 'visitor@portfolio.dev',
      subject: subject || 'Portfolio Inbound Alert',
      htmlContent: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
      textContent: `From: ${name} (${email})\n\n${message}`,
      source: 'Cloud Function HTTP',
    });

    res.json({ success: true, result });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Internal Error' });
  }
});
