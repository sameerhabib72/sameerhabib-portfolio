import React, { useState } from 'react';
import { useData, deduplicateById } from '../../context/DataContext';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  BellRing,
  ShieldCheck,
  Server,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Check,
  Clock,
  Settings
} from 'lucide-react';
import { SmtpConfig } from '../../types';

export const AdminEmailNotificationsManager: React.FC = () => {
  const {
    siteSettings,
    updateSiteSettings,
    contactMessages,
    testSendEmailNotification,
    testSendAiQueryNotification,
    showToast
  } = useData();

  const [testEmail, setTestEmail] = useState(
    siteSettings.emailNotificationSettings?.notificationEmail || siteSettings.email || 'sameerhabib72@gmail.com'
  );
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [isSendingAiTest, setIsSendingAiTest] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  // SMTP Settings State
  const currentSmtp = siteSettings.emailNotificationSettings?.smtpConfig || {
    enabled: false,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    user: 'sameerhabib72@gmail.com',
    pass: '',
    fromName: 'Sameer Habib Portfolio Alerts',
    fromEmail: 'sameerhabib72@gmail.com'
  };

  const [smtpForm, setSmtpForm] = useState<SmtpConfig>(currentSmtp);
  const [isSavingSmtp, setIsSavingSmtp] = useState(false);
  const [showSmtpAdvanced, setShowSmtpAdvanced] = useState(false);

  const handleSendTest = async () => {
    if (!testEmail.trim()) {
      showToast('Please enter a valid target email address', 'error');
      return;
    }

    setIsSendingTest(true);
    setTestResult(null);
    try {
      const res = await testSendEmailNotification(testEmail.trim());
      setTestResult({
        success: res.success,
        message: res.success
          ? `Test email dispatched to ${testEmail.trim()}! Please check your Gmail Inbox or Spam.`
          : `Delivery response: ${res.info}`
      });
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : 'Unknown error';
      setTestResult({
        success: false,
        message: `Failed to trigger test: ${errMessage}`
      });
    } finally {
      setIsSendingTest(false);
    }
  };

  const handleSendAiTest = async () => {
    if (!testEmail.trim()) {
      showToast('Please enter a valid target email address', 'error');
      return;
    }

    setIsSendingAiTest(true);
    setTestResult(null);
    try {
      const res = await testSendAiQueryNotification(testEmail.trim());
      setTestResult({
        success: res.success,
        message: res.success
          ? `AI Assistant Query Alert dispatched to ${testEmail.trim()}! Please check your Gmail.`
          : `AI Query Alert note: ${res.info}`
      });
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : 'Unknown error';
      setTestResult({
        success: false,
        message: `Failed to trigger AI test: ${errMessage}`
      });
    } finally {
      setIsSendingAiTest(false);
    }
  };

  const handleSaveNotificationSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSmtp(true);

    const updatedSettings = {
      ...siteSettings,
      emailNotificationSettings: {
        enabled: true,
        notificationEmail: testEmail.trim() || 'sameerhabib72@gmail.com',
        notifyOnContact: true,
        notifyOnAiInquiry: true,
        smtpConfig: smtpForm
      }
    };

    updateSiteSettings(updatedSettings);
    setTimeout(() => {
      setIsSavingSmtp(false);
      showToast('Email notification settings saved to Firestore', 'success');
    }, 400);
  };

  return (
    <div className="space-y-8 text-left max-w-4xl">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-2">
          <BellRing className="w-3.5 h-3.5" />
          <span>REAL-TIME INBOUND ALERT PIPELINE</span>
        </div>
        <h1 className="text-2xl font-display font-bold text-white">Email Notifications &amp; Query Alerts</h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure real-time automated email notifications so you receive instant alerts on your Gmail whenever a client or recruiter submits a query.
        </p>
      </div>

      {/* Target Recipient Status Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-slate-950 border border-cyan-500/30 shadow-xl space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Active Alert Recipient</span>
              <h3 className="text-lg font-bold text-white font-mono flex items-center space-x-2">
                <span>{testEmail}</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5" />
                  Active
                </span>
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Every inquiry submitted via the Contact Section or AI Consultation Hub triggers an automated email to this inbox.
              </p>
            </div>
          </div>
        </div>

        {/* FormSubmit Activation Notice */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200/90 space-y-2">
          <div className="flex items-center space-x-2 font-bold text-amber-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>One-Time Gmail Activation Link Notice</span>
          </div>
          <p className="leading-relaxed">
            The automated email forwarder dispatches notifications directly to <strong>{testEmail}</strong>. 
            On the first query, FormSubmit sends an <em>&ldquo;Activate Form&rdquo;</em> verification email to your Gmail. 
            Once you click that link in your inbox, all incoming queries will be delivered instantly to your primary Gmail tab without setup or delay.
          </p>
        </div>

        {/* Test Trigger Box */}
        <div className="pt-2 border-t border-white/5 space-y-3">
          <div>
            <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
              Send Diagnostic Test Query to:
            </label>
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="sameerhabib72@gmail.com"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={isSendingTest || isSendingAiTest}
              onClick={handleSendTest}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              {isSendingTest ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Testing Contact Alert...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Test Contact Form Query Alert</span>
                </>
              )}
            </button>

            <button
              type="button"
              disabled={isSendingTest || isSendingAiTest}
              onClick={handleSendAiTest}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-purple-600/20 cursor-pointer"
            >
              {isSendingAiTest ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Testing AI Query Alert...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Test AI Assistant Query Alert</span>
                </>
              )}
            </button>
          </div>
        </div>

        {testResult && (
          <div
            className={`p-3.5 rounded-xl border text-xs flex items-start space-x-2.5 ${
              testResult.success
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                : 'bg-amber-950/60 border-amber-500/40 text-amber-200'
            }`}
          >
            {testResult.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            )}
            <p className="leading-relaxed">{testResult.message}</p>
          </div>
        )}
      </div>

      {/* Cloud Functions & Trigger Architecture */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Server className="w-4 h-4 text-cyan-400" />
            <span>Firebase Cloud Functions &amp; Server-Side Triggers</span>
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            Node.js 20 • 2nd Gen
          </span>
        </div>

        <p className="text-xs text-slate-300">
          The notification engine operates on a multi-layer resilient architecture: real-time Firestore database triggers watch for new submissions, backed by immediate server-side email dispatching via SendGrid and Nodemailer.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-white">onContactMessageCreated</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Triggered automatically whenever a visitor, recruiter, or client submits the public ContactSection form. Dispatches instant email notification to <strong className="text-slate-300">{testEmail}</strong>.
            </p>
            <div className="text-[10px] font-mono text-cyan-400">
              Collection: <code className="text-slate-300">contact_messages/{'{messageId}'}</code>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-white">onAiQueryProcessed</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Triggered automatically whenever a technical question or interview consultation is processed in the AI Assistant Center. Delivers visitor query + assistant response to your inbox.
            </p>
            <div className="text-[10px] font-mono text-purple-400">
              Collection: <code className="text-slate-300">ai_queries/{'{queryId}'}</code>
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/40 border border-white/5 text-[11px] font-mono text-slate-400 space-y-1">
          <div className="text-slate-300 font-semibold flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Supported Email Providers:</span>
          </div>
          <div>1. <strong className="text-cyan-300">SendGrid Mail API:</strong> High-deliverability transactional emails via SENDGRID_API_KEY.</div>
          <div>2. <strong className="text-emerald-300">Nodemailer SMTP:</strong> Direct relay via your own Gmail SMTP (smtp.gmail.com).</div>
          <div>3. <strong className="text-amber-300">FormSubmit Gateway:</strong> Zero-configuration forwarder to {testEmail}.</div>
        </div>
      </div>

      {/* Optional Custom SMTP Configuration Card */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Server className="w-4 h-4 text-cyan-400" />
              <span>Custom SMTP Relay (Optional Direct Gmail Relay)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              By default, automated forwarding delivers to your inbox. You can also connect your own Gmail SMTP with an App Password.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowSmtpAdvanced((prev) => !prev)}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
          >
            {showSmtpAdvanced ? 'Hide SMTP Options' : 'Configure Custom SMTP'}
          </button>
        </div>

        {showSmtpAdvanced && (
          <form onSubmit={handleSaveNotificationSettings} className="space-y-4 pt-3 border-t border-white/5">
            <div className="flex items-center space-x-3 pb-2">
              <input
                type="checkbox"
                id="smtp-enabled"
                checked={smtpForm.enabled}
                onChange={(e) => setSmtpForm({ ...smtpForm, enabled: e.target.checked })}
                className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 bg-slate-950 border-white/20"
              />
              <label htmlFor="smtp-enabled" className="text-xs text-slate-200 font-semibold cursor-pointer">
                Enable Custom SMTP Relay (Bypasses forwarder and sends straight from your email server)
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">SMTP Host</label>
                <input
                  type="text"
                  value={smtpForm.host}
                  onChange={(e) => setSmtpForm({ ...smtpForm, host: e.target.value })}
                  placeholder="smtp.gmail.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">SMTP Port</label>
                <input
                  type="number"
                  value={smtpForm.port}
                  onChange={(e) => setSmtpForm({ ...smtpForm, port: parseInt(e.target.value, 10) || 465 })}
                  placeholder="465"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">SMTP Username / Gmail Address</label>
                <input
                  type="text"
                  value={smtpForm.user}
                  onChange={(e) => setSmtpForm({ ...smtpForm, user: e.target.value })}
                  placeholder="sameerhabib72@gmail.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  Gmail App Password (16 characters)
                </label>
                <input
                  type="password"
                  value={smtpForm.pass}
                  onChange={(e) => setSmtpForm({ ...smtpForm, pass: e.target.value })}
                  placeholder="•••• •••• •••• ••••"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSavingSmtp}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 text-xs font-bold transition-colors cursor-pointer"
            >
              {isSavingSmtp ? 'Saving Settings...' : 'Save SMTP Settings'}
            </button>
          </form>
        )}
      </div>

      {/* Recent Inbound Queries Log */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>Inbound Queries Received &amp; Logged</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              All messages received through your portfolio are archived in Firestore and backed up locally.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 font-semibold">
            {contactMessages.length} Total Received
          </span>
        </div>

        {contactMessages.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-slate-950/40 border border-white/5">
            <p className="text-xs text-slate-400">No client queries received yet. Use the test button above to send a sample query.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {deduplicateById(contactMessages).slice(0, 5).map((msg) => (
              <div
                key={msg.id}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 hover:border-white/10 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-white">{msg.name}</span>
                    <span className="text-[11px] font-mono text-slate-400">&lt;{msg.email}&gt;</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      Dispatched to Email
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium">{msg.subject}</p>
                  <p className="text-xs text-slate-400 line-clamp-1">{msg.message}</p>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-medium transition-colors flex items-center space-x-1"
                  >
                    <span>Reply to {msg.name.split(' ')[0]}</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
