import { SmtpConfig, EmailNotificationLog } from '../types';
import { db } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';

export interface SendEmailNotificationParams {
  name: string;
  email: string;
  subject?: string;
  message: string;
  phone?: string;
  budget?: string;
  timeline?: string;
  projectType?: string;
  source?: string;
  recipient?: string;
  smtpConfig?: SmtpConfig;
}

export async function dispatchEmailNotification(
  params: SendEmailNotificationParams
): Promise<{ success: boolean; delivered: boolean; method: string; info: string }> {
  const targetRecipient = params.recipient || 'sameerhabib72@gmail.com';
  const logId = `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const timestamp = new Date().toISOString();

  let result = {
    success: false,
    delivered: false,
    method: 'server-api',
    info: '',
  };

  try {
    // 1. Attempt server-side function API call
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...params,
        recipient: targetRecipient,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      result = {
        success: Boolean(data.success),
        delivered: Boolean(data.delivered),
        method: data.method || 'server-api',
        info: data.info || 'Email notification dispatched successfully',
      };
    } else {
      throw new Error(`Server returned status ${res.status}`);
    }
  } catch (serverErr: unknown) {
    console.warn('Server notification API call failed, trying browser client fallback...', serverErr);

    // 2. Direct browser fallback via FormSubmit
    try {
      const formattedDate = new Date().toLocaleString();
      const payload = {
        name: params.name,
        email: params.email,
        phone: params.phone || 'Not provided',
        projectType: params.projectType || 'Standard',
        budget: params.budget || 'Not specified',
        timeline: params.timeline || 'Not specified',
        source: params.source || 'Website Portfolio',
        subject: params.subject || 'New Portfolio Inquiry',
        _subject: `🚀 [Inquiry Alert] ${params.subject || 'New Message'} from ${params.name}`,
        message: `Client: ${params.name}\nEmail: ${params.email}\nPhone: ${params.phone || 'N/A'}\nTopic: ${params.subject || 'General'}\nProject Type: ${params.projectType || 'N/A'}\nBudget: ${params.budget || 'N/A'}\nTimeline: ${params.timeline || 'N/A'}\nTime: ${formattedDate}\n\nInquiry Details:\n${params.message}`,
        _template: 'table',
        _captcha: 'false',
      };

      const fallbackRes = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetRecipient)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const fallbackData = await fallbackRes.json();
      result = {
        success: true,
        delivered: true,
        method: 'browser-gateway',
        info: fallbackData?.message || 'Notification sent via browser gateway',
      };
    } catch (clientErr: unknown) {
      console.error('All email dispatch routes failed:', clientErr);
      const errMessage = clientErr instanceof Error ? clientErr.message : 'Failed to dispatch email notification';
      result = {
        success: false,
        delivered: false,
        method: 'failed',
        info: errMessage,
      };
    }
  }

  // 3. Persist notification log in Firestore
  try {
    const logItem: EmailNotificationLog = {
      id: logId,
      recipient: targetRecipient,
      senderName: params.name,
      senderEmail: params.email,
      subject: params.subject || 'General Inquiry',
      message: params.message,
      phone: params.phone,
      source: params.source || 'Portfolio Query',
      status: result.delivered ? 'delivered' : result.success ? 'sent' : 'failed',
      provider: result.method,
      timestamp,
      errorMessage: result.delivered ? undefined : result.info,
    };

    await setDoc(doc(db, 'email_notifications', logId), logItem);
  } catch (dbErr) {
    console.warn('Could not record notification log in Firestore:', dbErr);
  }

  return result;
}

export interface SendAiQueryNotificationParams {
  userQuery: string;
  assistantReply: string;
  mode: string;
  model?: string;
  clientEmail?: string;
  clientName?: string;
  recipient?: string;
  smtpConfig?: SmtpConfig;
}

export async function dispatchAiQueryNotification(
  params: SendAiQueryNotificationParams
): Promise<{ success: boolean; delivered: boolean; method: string; info: string }> {
  const targetRecipient = params.recipient || 'sameerhabib72@gmail.com';
  const queryPreview = params.userQuery.length > 55 ? params.userQuery.slice(0, 55) + '...' : params.userQuery;
  const subject = `🤖 [AI Consultation] Mode: ${params.mode.toUpperCase()} — "${queryPreview}"`;

  const message = `AI Assistant Consultation Query Processed:\n\nMode: ${params.mode.toUpperCase()}\nModel: ${params.model || 'gemini-3.8-flash'}\n\nClient Question:\n"${params.userQuery}"\n\nAssistant Response:\n${params.assistantReply}`;

  return dispatchEmailNotification({
    name: params.clientName || 'AI Assistant Visitor',
    email: params.clientEmail || 'visitor@portfolio.dev',
    subject,
    message,
    source: `AI Assistant Center (${params.mode})`,
    recipient: targetRecipient,
    smtpConfig: params.smtpConfig,
  });
}

