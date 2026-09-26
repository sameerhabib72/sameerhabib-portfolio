import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../../context/DataContext';
import { dispatchEmailNotification } from '../../services/notificationService';
import {
  Mail,
  Send,
  MapPin,
  Sparkles,
  CheckCircle2,
  Github,
  Linkedin,
  Clock,
  AlertCircle,
  MessageCircle,
  Check,
  Copy,
  ExternalLink,
  RefreshCw,
  Phone,
  Zap,
  Server,
  DollarSign,
  Calendar,
  Layers
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { siteSettings, addContactMessage, trackEvent } = useData();

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [projectType, setProjectType] = useState('Full Stack Web Application');
  const [budget, setBudget] = useState('$1,500 – $4,000');
  const [timeline, setTimeline] = useState('2 – 4 Weeks');
  const [message, setMessage] = useState('');

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStage, setSubmitStage] = useState<'idle' | 'validating' | 'calling-server' | 'dispatching' | 'done'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successReceipt, setSuccessReceipt] = useState<{
    name: string;
    email: string;
    subject: string;
    projectType: string;
    budget: string;
    timeline: string;
    timestamp: string;
    recipient: string;
    method?: string;
  } | null>(null);

  const [copiedEmail, setCopiedEmail] = useState(false);

  const recipientEmail = siteSettings?.email || 'sameerhabib72@gmail.com';

  // Topic presets
  const presets = [
    { label: '⚡ Laravel & Backend API', type: 'Backend Architecture', subject: 'Laravel API & Backend Architecture' },
    { label: '🚀 Full-Stack Web Application', type: 'Full Stack Web Application', subject: 'Custom Full Stack Web Application' },
    { label: '🌐 React / Next.js Frontend', type: 'Frontend Development', subject: 'React / Next.js Web Application' },
    { label: '💼 Senior Full-Time Role', type: 'Hiring / Engineering Role', subject: 'Senior Full Stack Engineer Opportunity' },
    { label: '🔍 Database & Performance Tuning', type: 'Performance & Audit', subject: 'MySQL & Architecture Optimization' },
    { label: '💬 General Technical Consultation', type: 'Consultation', subject: 'Technical Scoping & Architecture Consultation' }
  ];

  // Budget Options
  const budgetOptions = [
    '< $1,500',
    '$1,500 – $4,000',
    '$4,000 – $8,000',
    '$8,000+',
    'Full-Time Role / Salary'
  ];

  // Timeline Options
  const timelineOptions = [
    'Immediate (< 1 week)',
    '2 – 4 Weeks',
    '1 – 2 Months',
    'Exploring / Planning'
  ];

  // Message quick templates
  const messageTemplates = [
    {
      title: 'Project Build',
      text: 'Hi Sameer, we are looking for an experienced Full Stack Developer to build a scalable web application. Our core stack requirements involve Laravel and React, and we are aiming to launch within our targeted timeframe.'
    },
    {
      title: 'Hiring Inquiry',
      text: 'Hello Sameer, I came across your portfolio and was impressed by your commercial track record in Laravel, PHP, and Next.js. We have an open Senior Full Stack role and would love to schedule a preliminary conversation.'
    },
    {
      title: 'Consulting / Audit',
      text: 'Hi Sameer, we need architectural advisory and query optimization on an existing Laravel/MySQL production system experiencing performance bottlenecks. Would love your consultation.'
    }
  ];

  const isValidEmail = (val: string) => {
    return !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(recipientEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setSubmitError('Please fill in your name, email, and message details.');
      return;
    }

    if (!isValidEmail(email)) {
      setSubmitError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStage('validating');

    try {
      // 1. Stage: Calling server-side email function
      await new Promise((r) => setTimeout(r, 400));
      setSubmitStage('calling-server');

      const inquiryData = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        subject: subject.trim() || `${projectType} Inquiry`,
        message: message.trim(),
        budget,
        timeline,
        projectType,
        source: 'ContactSection Interactive Form',
        recipient: recipientEmail,
      };

      // 2. Stage: Dispatching directly via server-side function
      setSubmitStage('dispatching');

      // Call server-side function via dispatchEmailNotification
      const dispatchResult = await dispatchEmailNotification({
        ...inquiryData,
        source: 'ContactSection Server Function',
      });

      // Also record into database/context for real-time admin sync & audit
      await addContactMessage({
        name: inquiryData.name,
        email: inquiryData.email,
        phone: inquiryData.phone,
        subject: inquiryData.subject,
        message: inquiryData.message,
        budget: inquiryData.budget,
        timeline: inquiryData.timeline,
        projectType: inquiryData.projectType,
      } as any);

      trackEvent('contact_inquiry_sent', {
        name: inquiryData.name,
        topic: inquiryData.subject,
        budget: inquiryData.budget,
        method: dispatchResult?.method || 'server-function'
      });

      setSubmitStage('done');

      // Record receipt for user display
      setSuccessReceipt({
        name: inquiryData.name,
        email: inquiryData.email,
        subject: inquiryData.subject,
        projectType: inquiryData.projectType,
        budget: inquiryData.budget,
        timeline: inquiryData.timeline,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recipient: recipientEmail,
        method: dispatchResult?.method || 'server-side function'
      });

      // Clear fields
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setSubmitError(
        err?.message || 'Unable to reach the server email function. You can also reach out directly via WhatsApp or Email below.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSuccessReceipt(null);
    setSubmitStage('idle');
    setSubmitError(null);
  };

  // Prefilled WhatsApp link
  const generateWhatsAppUrl = () => {
    const text = `Hi Sameer! I sent an inquiry through your portfolio contact form regarding: "${subject || projectType}". My name is ${name || 'a visitor'} (${email || 'email'}).`;
    return `https://wa.me/923112802870?text=${encodeURIComponent(text)}`;
  };

  // Prefilled Mailto fallback link
  const generateMailtoUrl = () => {
    const mailSubject = encodeURIComponent(subject || `Project Inquiry - ${name || 'Portfolio Client'}`);
    const mailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nTopic: ${subject || projectType}\nBudget: ${budget}\nTimeline: ${timeline}\n\nMessage:\n${message}`
    );
    return `mailto:${recipientEmail}?subject=${mailSubject}&body=${mailBody}`;
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px', amount: 0.1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-24 bg-[#080706] border-t border-[#c87a3e]/15 overflow-hidden scroll-mt-20"
    >
      {/* Background ambient warm leather glow */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#c87a3e]/15 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 -right-24 w-[30rem] h-[30rem] rounded-full bg-[#d97706]/10 blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info, Availability & Server Function Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-8 text-left"
          >
            <div>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#c87a3e]/15 border border-[#c87a3e]/30 text-xs font-mono text-[#f3d5b5] mb-4 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#e59850]" />
                <span>04 // INITIATE COLLABORATION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
                Let&apos;s Build Something <span className="bg-gradient-to-r from-[#f3d5b5] via-[#e59850] to-[#c87a3e] bg-clip-text text-transparent">Exceptional</span>.
              </h2>
              <p className="mt-4 text-base text-[#e7bc91] leading-relaxed font-normal">
                Whether you have an upcoming project, are looking to recruit a Senior Full Stack Engineer, or need architectural consultation on Laravel, React, and cloud scaling, I am ready for discussion.
              </p>
            </div>

            {/* Server Function Live Status Banner */}
            <div className="p-4 rounded-2xl bg-[#15110d]/90 border border-emerald-500/30 flex items-center justify-between backdrop-blur-md shadow-xs">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Server className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Server Email Function
                    </span>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                  </div>
                  <p className="text-[11px] text-[#a88264] font-mono">
                    Direct routing to <span className="text-[#f3d5b5] font-semibold">{recipientEmail}</span>
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                ACTIVE
              </span>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              {/* Email Card with Quick Copy */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#15110d]/80 border border-[#c87a3e]/20 hover:border-[#c87a3e]/60 transition-all group shadow-sm backdrop-blur-md">
                <div className="flex items-center">
                  <div className="p-3 rounded-xl bg-[#281b13] text-[#e59850] mr-4 group-hover:scale-110 group-hover:bg-[#342318] transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono uppercase text-[#a88264] font-semibold">Direct Email</p>
                    <a
                      href={`mailto:${recipientEmail}`}
                      className="text-base font-semibold text-white group-hover:text-[#f3d5b5] transition-colors"
                    >
                      {recipientEmail}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-[#201813] hover:bg-[#2e1f14] border border-[#c87a3e]/30 text-[#d4a373] hover:text-white transition-all cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* WhatsApp Card */}
              <motion.a
                whileHover={{ scale: 1.02, y: -2 }}
                href="https://wa.me/923112802870"
                target="_blank"
                rel="noreferrer"
                className="flex items-center p-4 rounded-2xl bg-[#15110d]/80 border border-emerald-500/20 hover:border-emerald-400/60 transition-all group shadow-sm backdrop-blur-md cursor-pointer"
              >
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 mr-4 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase text-emerald-400 font-semibold">Direct WhatsApp &amp; Mobile</p>
                  <p className="text-base font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    {siteSettings.phone} <span className="text-xs text-emerald-400 font-normal">(Instant Chat)</span>
                  </p>
                </div>
              </motion.a>

              {/* Location Card */}
              <div className="flex items-center p-4 rounded-2xl bg-[#15110d]/80 border border-[#c87a3e]/20 shadow-sm backdrop-blur-md">
                <div className="p-3 rounded-xl bg-[#281b13] text-[#e59850] mr-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase text-[#a88264] font-semibold">Location &amp; Work Mode</p>
                  <p className="text-base font-semibold text-white">{siteSettings.location} (Remote Worldwide)</p>
                </div>
              </div>

              {/* Turnaround Guarantee */}
              <div className="flex items-center p-4 rounded-2xl bg-[#15110d]/80 border border-[#c87a3e]/20 shadow-sm backdrop-blur-md">
                <div className="p-3 rounded-xl bg-[#281b13] text-[#e59850] mr-4">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase text-[#a88264] font-semibold">Guaranteed Response Time</p>
                  <p className="text-base font-semibold text-white">Within 24 Hours Guaranteed</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-[#d4a373] font-semibold mb-3">
                Verified Developer Profiles
              </p>
              <div className="flex space-x-3">
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={siteSettings.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-full bg-[#15110d]/90 border border-[#c87a3e]/30 hover:border-[#c87a3e] hover:bg-[#231a14] text-xs font-medium text-[#f3d5b5] hover:text-white transition-all shadow-sm"
                >
                  <Github className="w-4 h-4 text-[#e59850]" />
                  <span>GitHub</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={siteSettings.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-full bg-[#15110d]/90 border border-[#c87a3e]/30 hover:border-[#c87a3e] hover:bg-[#231a14] text-xs font-medium text-[#f3d5b5] hover:text-white transition-all shadow-sm"
                >
                  <Linkedin className="w-4 h-4 text-[#e59850]" />
                  <span>LinkedIn</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Intake Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="p-7 sm:p-9 rounded-3xl bg-[#15110d]/95 border border-[#c87a3e]/25 backdrop-blur-xl shadow-[0_0_50px_-15px_rgba(0,0,0,0.95)] relative text-left">
              {/* Form Heading & Server Tag */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                    Send Direct Inquiry
                  </h3>
                  <p className="text-sm text-[#e7bc91] mt-1">
                    Powered by server-side email dispatch directly to <span className="text-[#f3d5b5] font-semibold">{recipientEmail}</span>.
                  </p>
                </div>
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#201813] border border-[#c87a3e]/35 text-[11px] font-mono text-[#e59850]">
                  <Zap className="w-3 h-3 text-[#e59850]" />
                  <span>Server-Side Mail API</span>
                </span>
              </div>

              {/* SUCCESS CONFIRMATION RECEIPT */}
              <AnimatePresence>
                {successReceipt && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94, y: -15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: -15 }}
                    className="mb-8 p-6 rounded-2xl bg-gradient-to-b from-emerald-950/95 to-[#0b1d13] border border-emerald-500/60 shadow-2xl text-emerald-100"
                  >
                    <div className="flex items-start space-x-3.5 mb-4">
                      <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="text-lg font-bold text-white flex items-center space-x-2">
                            <span>Inquiry Dispatched Successfully!</span>
                          </h4>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">
                            Sent at {successReceipt.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-emerald-300/90 mt-1">
                          A complete structured email notification has been delivered directly to <strong>{successReceipt.recipient}</strong>. Sameer Habib will review and reply to <strong>{successReceipt.email}</strong> shortly.
                        </p>
                      </div>
                    </div>

                    {/* Receipt Details Card */}
                    <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/30 text-xs font-mono space-y-1.5 mb-4">
                      <div className="flex justify-between text-emerald-300">
                        <span className="text-emerald-400/70">Client:</span>
                        <span className="font-semibold text-white">{successReceipt.name}</span>
                      </div>
                      <div className="flex justify-between text-emerald-300">
                        <span className="text-emerald-400/70">Email:</span>
                        <span className="font-semibold text-white">{successReceipt.email}</span>
                      </div>
                      <div className="flex justify-between text-emerald-300">
                        <span className="text-emerald-400/70">Project Scope:</span>
                        <span className="text-emerald-200">{successReceipt.projectType}</span>
                      </div>
                      <div className="flex justify-between text-emerald-300">
                        <span className="text-emerald-400/70">Target Budget:</span>
                        <span className="text-amber-300 font-semibold">{successReceipt.budget}</span>
                      </div>
                      <div className="flex justify-between text-emerald-300">
                        <span className="text-emerald-400/70">Timeline:</span>
                        <span className="text-emerald-200">{successReceipt.timeline}</span>
                      </div>
                    </div>

                    {/* Actions after success */}
                    <div className="flex flex-wrap gap-2.5">
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="px-4 py-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-500/40 text-xs font-medium text-white transition-all flex items-center space-x-1.5 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Send Another Inquiry</span>
                      </button>
                      <a
                        href={generateWhatsAppUrl()}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition-all flex items-center space-x-1.5 shadow-md cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Instant WhatsApp Follow-up</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Alert */}
              <AnimatePresence>
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-2xl bg-rose-950/80 border border-rose-500/50 flex items-start space-x-3 text-rose-200 text-sm"
                  >
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-bold text-white">Notice</p>
                      <p className="text-xs text-rose-300/90 mt-0.5">{submitError}</p>
                      <div className="mt-2.5 flex items-center space-x-2">
                        <a
                          href={generateMailtoUrl()}
                          className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-xs font-semibold text-white border border-rose-400/40"
                        >
                          <Mail className="w-3 h-3" />
                          <span>Send via Email Client (mailto)</span>
                        </a>
                        <a
                          href={generateWhatsAppUrl()}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg bg-emerald-950/70 hover:bg-emerald-900 text-xs font-semibold text-emerald-300 border border-emerald-500/40"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>WhatsApp Directly</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Interactive Preset Subject Chips */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-[#d4a373] uppercase tracking-wider font-semibold">
                    1. Select Topic or Inquiry Focus:
                  </span>
                  <span className="text-[11px] font-mono text-[#a88264]">Click to auto-fill</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {presets.map((preset) => {
                    const isSelected = subject === preset.subject;
                    return (
                      <motion.button
                        key={preset.label}
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setSubject(preset.subject);
                          setProjectType(preset.type);
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#c87a3e] text-white font-bold border border-[#e59850] shadow-[0_0_15px_-3px_rgba(200,122,62,0.6)]'
                            : 'bg-[#201813] text-[#d4a373] hover:text-white border border-[#c87a3e]/20 hover:border-[#c87a3e]/60'
                        }`}
                      >
                        {preset.label}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Main Interactive Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#f3d5b5] font-semibold mb-1.5">
                      Your Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex Henderson"
                        className="w-full px-4 py-3 rounded-2xl bg-[#0a0806]/90 border border-[#c87a3e]/20 text-sm text-white placeholder:text-[#8d6e52] focus:outline-none focus:border-[#c87a3e] transition-colors"
                      />
                      {name.trim().length >= 2 && (
                        <Check className="w-4 h-4 text-emerald-400 absolute right-3.5 top-3.5 pointer-events-none" />
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#f3d5b5] font-semibold mb-1.5 flex justify-between">
                      <span>Your Email *</span>
                      {email && !isValidEmail(email) && (
                        <span className="text-[11px] text-amber-400 lowercase font-normal flex items-center space-x-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>Invalid email</span>
                        </span>
                      )}
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. alex@company.com"
                        className={`w-full px-4 py-3 rounded-2xl bg-[#0a0806]/90 border text-sm text-white placeholder:text-[#8d6e52] focus:outline-none transition-colors ${
                          email && !isValidEmail(email)
                            ? 'border-amber-500/80 focus:border-amber-400'
                            : 'border-[#c87a3e]/20 focus:border-[#c87a3e]'
                        }`}
                      />
                      {email && isValidEmail(email) && (
                        <Check className="w-4 h-4 text-emerald-400 absolute right-3.5 top-3.5 pointer-events-none" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Phone & Subject Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#f3d5b5] font-semibold mb-1.5">
                      Phone / WhatsApp (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +1 555 0192 / +92 300..."
                        className="w-full px-4 py-3 rounded-2xl bg-[#0a0806]/90 border border-[#c87a3e]/20 text-sm text-white placeholder:text-[#8d6e52] focus:outline-none focus:border-[#c87a3e] transition-colors"
                      />
                      <Phone className="w-3.5 h-3.5 text-[#8d6e52] absolute right-3.5 top-4 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#f3d5b5] font-semibold mb-1.5">
                      Subject / Project Title
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Laravel Platform Scoping"
                      className="w-full px-4 py-3 rounded-2xl bg-[#0a0806]/90 border border-[#c87a3e]/20 text-sm text-white placeholder:text-[#8d6e52] focus:outline-none focus:border-[#c87a3e] transition-colors"
                    />
                  </div>
                </div>

                {/* Interactive Budget & Timeline Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {/* Budget Selector */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#f3d5b5] font-semibold mb-1.5 flex items-center space-x-1">
                      <DollarSign className="w-3.5 h-3.5 text-[#e59850]" />
                      <span>Estimated Budget Range:</span>
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {budgetOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setBudget(opt)}
                          className={`py-2 px-2.5 rounded-xl text-[11px] font-mono text-left transition-all cursor-pointer ${
                            budget === opt
                              ? 'bg-[#281b13] border border-[#e59850] text-[#f3d5b5] font-bold shadow-xs'
                              : 'bg-[#0e0b08] border border-[#c87a3e]/20 text-[#a88264] hover:text-white hover:border-[#c87a3e]/50'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Timeline Selector */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#f3d5b5] font-semibold mb-1.5 flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-[#e59850]" />
                      <span>Expected Timeline:</span>
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {timelineOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setTimeline(opt)}
                          className={`py-2 px-2.5 rounded-xl text-[11px] font-mono text-left transition-all cursor-pointer ${
                            timeline === opt
                              ? 'bg-[#281b13] border border-[#e59850] text-[#f3d5b5] font-bold shadow-xs'
                              : 'bg-[#0e0b08] border border-[#c87a3e]/20 text-[#a88264] hover:text-white hover:border-[#c87a3e]/50'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Message Field with Template Starters */}
                <div>
                  <div className="flex flex-wrap justify-between items-center mb-1.5 gap-2">
                    <label className="block text-xs font-mono uppercase text-[#f3d5b5] font-semibold">
                      Inquiry Details &amp; Requirements *
                    </label>
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-mono text-[#a88264]">
                        {message.length} / 800 chars
                      </span>
                    </div>
                  </div>

                  {/* Quick starter snippet buttons */}
                  <div className="flex items-center space-x-2 mb-2 overflow-x-auto pb-1 text-xs">
                    <span className="text-[10px] font-mono text-[#a88264] shrink-0">Sample templates:</span>
                    {messageTemplates.map((tmpl) => (
                      <button
                        key={tmpl.title}
                        type="button"
                        onClick={() => setMessage(tmpl.text)}
                        className="px-2.5 py-1 rounded-lg bg-[#1e1610] hover:bg-[#281c14] border border-[#c87a3e]/25 text-[10px] font-mono text-[#d4a373] hover:text-[#f3d5b5] shrink-0 transition-colors cursor-pointer"
                      >
                        + {tmpl.title}
                      </button>
                    ))}
                  </div>

                  <textarea
                    required
                    rows={4}
                    maxLength={800}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your project, team goals, architectural questions, or recruitment details..."
                    className="w-full px-4 py-3 rounded-2xl bg-[#0a0806]/90 border border-[#c87a3e]/20 text-sm text-white placeholder:text-[#8d6e52] focus:outline-none focus:border-[#c87a3e] transition-colors resize-none leading-relaxed"
                  />
                </div>

                {/* Submit Action Button with Multi-stage animation */}
                <motion.button
                  whileHover={{ scale: 1.015, y: -2, transition: { type: 'spring', stiffness: 450, damping: 25 } }}
                  whileTap={{ scale: 0.985 }}
                  type="submit"
                  disabled={isSubmitting || (email !== '' && !isValidEmail(email))}
                  className="w-full flex items-center justify-center space-x-2.5 py-4 rounded-full bg-gradient-to-r from-[#b4652a] via-[#c87a3e] to-[#d97706] hover:from-[#c87a3e] hover:to-[#e59850] text-white font-bold text-sm shadow-[0_0_30px_-5px_rgba(200,122,62,0.5)] hover:shadow-[0_0_40px_0px_rgba(217,119,6,0.6)] border border-[#e59850]/40 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2 text-white font-mono text-xs">
                      <RefreshCw className="w-4 h-4 animate-spin text-[#f3d5b5]" />
                      <span>
                        {submitStage === 'validating' && 'Validating inquiry parameters...'}
                        {submitStage === 'calling-server' && 'Executing server-side mail function...'}
                        {submitStage === 'dispatching' && `Delivering to ${recipientEmail}...`}
                        {submitStage === 'done' && 'Delivered!'}
                      </span>
                    </div>
                  ) : (
                    <>
                      <span>Dispatch Inquiry to Sameer</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>

                {/* Footer security & delivery notice */}
                <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-[#a88264] pt-2 border-t border-[#c87a3e]/15 gap-2">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>SSL encrypted direct server dispatch</span>
                  </div>
                  <span>Recipient: {recipientEmail}</span>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
