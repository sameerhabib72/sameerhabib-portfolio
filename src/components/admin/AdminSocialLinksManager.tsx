import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  Share2,
  Save,
  RotateCcw,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  Globe,
  ExternalLink,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const AdminSocialLinksManager: React.FC = () => {
  const { siteSettings, updateSiteSettings, showToast } = useData();

  // Local state for social handles
  const [githubUrl, setGithubUrl] = useState(siteSettings.githubUrl || 'https://github.com/sameerhabib72');
  const [linkedinUrl, setLinkedinUrl] = useState(siteSettings.linkedinUrl || 'https://linkedin.com/in/sameer-habib');
  const [twitterUrl, setTwitterUrl] = useState(siteSettings.twitterUrl || 'https://x.com/sameerhabib');
  const [whatsappUrl, setWhatsappUrl] = useState(siteSettings.whatsappUrl || 'https://wa.me/923112802870');
  const [email, setEmail] = useState(siteSettings.email || 'sameerhabib72@gmail.com');
  const [phone, setPhone] = useState(siteSettings.phone || '+92-311-280-2870');
  const [siteUrl, setSiteUrl] = useState(siteSettings.siteUrl || 'https://sameerhabib.dev');

  // WhatsApp quick helper state
  const [waPhoneHelper, setWaPhoneHelper] = useState('');

  const handleGenerateWhatsAppLink = () => {
    const digitsOnly = waPhoneHelper.replace(/[^0-9]/g, '');
    if (!digitsOnly || digitsOnly.length < 9) {
      showToast('Please enter a valid phone number with country code (e.g. 923112802870)', 'error');
      return;
    }
    const formatted = `https://wa.me/${digitsOnly}`;
    setWhatsappUrl(formatted);
    setWaPhoneHelper('');
    showToast(`WhatsApp link generated: ${formatted}`);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Also update footerSettings with these social links so footer stays in sync
    const currentFooter = siteSettings.footerSettings || {};
    const updatedFooter = {
      ...currentFooter,
      brandTitle: currentFooter.brandTitle || siteSettings.ownerName,
      showGithub: Boolean(githubUrl.trim()),
      showLinkedin: Boolean(linkedinUrl.trim()),
      showTwitter: Boolean(twitterUrl.trim()),
      showEmail: Boolean(email.trim()),
      showWhatsapp: Boolean(whatsappUrl.trim())
    };

    updateSiteSettings({
      githubUrl: githubUrl.trim(),
      linkedinUrl: linkedinUrl.trim(),
      twitterUrl: twitterUrl.trim(),
      whatsappUrl: whatsappUrl.trim(),
      email: email.trim(),
      phone: phone.trim(),
      siteUrl: siteUrl.trim(),
      footerSettings: updatedFooter
    });

    showToast('Social media handles and contact links updated in database!', 'success');
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset social media links to Sameer Habib default handles?')) {
      setGithubUrl('https://github.com/sameerhabib72');
      setLinkedinUrl('https://linkedin.com/in/sameer-habib');
      setTwitterUrl('https://x.com/sameerhabib');
      setWhatsappUrl('https://wa.me/923112802870');
      setEmail('sameerhabib72@gmail.com');
      setPhone('+92-311-280-2870');
      setSiteUrl('https://sameerhabib.dev');
      showToast('Reset to default profile handles. Click "Save Links" to persist.', 'info');
    }
  };

  const socialChannels = [
    {
      id: 'github',
      label: 'GitHub Profile',
      icon: Github,
      value: githubUrl,
      setFn: setGithubUrl,
      placeholder: 'https://github.com/sameerhabib72',
      color: 'text-white'
    },
    {
      id: 'linkedin',
      label: 'LinkedIn Profile',
      icon: Linkedin,
      value: linkedinUrl,
      setFn: setLinkedinUrl,
      placeholder: 'https://linkedin.com/in/sameer-habib',
      color: 'text-[#e59850]'
    },
    {
      id: 'twitter',
      label: 'Twitter / X Profile',
      icon: Twitter,
      value: twitterUrl,
      setFn: setTwitterUrl,
      placeholder: 'https://x.com/sameerhabib',
      color: 'text-[#e59850]'
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp Direct Link',
      icon: MessageCircle,
      value: whatsappUrl,
      setFn: setWhatsappUrl,
      placeholder: 'https://wa.me/923112802870',
      color: 'text-emerald-400'
    },
    {
      id: 'email',
      label: 'Primary Contact Email',
      icon: Mail,
      value: email,
      setFn: setEmail,
      placeholder: 'sameerhabib72@gmail.com',
      color: 'text-[#e59850]',
      isEmail: true
    },
    {
      id: 'phone',
      label: 'Direct Phone / Mobile',
      icon: Phone,
      value: phone,
      setFn: setPhone,
      placeholder: '+92-311-280-2870',
      color: 'text-emerald-400'
    },
    {
      id: 'site',
      label: 'Public Portfolio Website',
      icon: Globe,
      value: siteUrl,
      setFn: setSiteUrl,
      placeholder: 'https://sameerhabib.dev',
      color: 'text-[#f3d5b5]'
    }
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#120d09] border border-[#c87a3e]/30 shadow-md">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#e59850] font-bold uppercase tracking-wider mb-1">
            <Share2 className="w-3.5 h-3.5" />
            <span>Online Presence &amp; Outreach</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
            Social Media &amp; Contact Links
          </h2>
          <p className="text-xs text-[#d4a373] mt-0.5">
            Manage your GitHub, LinkedIn, Twitter/X, WhatsApp, and email addresses displayed in the Navbar, Hero, and Footer.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#1a130e] hover:bg-[#251b14] border border-[#c87a3e]/20 text-xs font-mono text-[#d4a373] hover:text-[#f3d5b5] transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#b4652a] via-[#c87a3e] to-[#d97706] hover:from-[#c87a3e] hover:to-[#e59850] text-white text-xs font-mono font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Social Links</span>
          </button>
        </div>
      </div>

      {/* Main Social Inputs Grid */}
      <div className="p-6 rounded-2xl bg-[#120d09] border border-[#c87a3e]/20 space-y-5">
        <h3 className="text-sm font-mono text-[#e59850] font-bold uppercase tracking-wider">
          Profile URLs &amp; Handle Configurations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialChannels.map((item) => {
            const ItemIcon = item.icon;
            const hasValue = Boolean(item.value.trim());

            return (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-[#18110b] border border-[#c87a3e]/20 space-y-2 hover:border-[#c87a3e]/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 text-xs font-mono text-[#f3d5b5] font-bold">
                    <ItemIcon className={`w-4 h-4 ${item.color}`} />
                    <span>{item.label}</span>
                  </label>

                  {hasValue && (
                    <a
                      href={item.isEmail ? `mailto:${item.value}` : item.value}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1 text-[11px] font-mono text-[#e59850] hover:text-white transition-colors"
                      title="Test Link in new tab"
                    >
                      <span>Test</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <input
                  type={item.isEmail ? 'email' : 'text'}
                  value={item.value}
                  onChange={(e) => item.setFn(e.target.value)}
                  placeholder={item.placeholder}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#090705] border border-[#c87a3e]/25 text-white text-xs font-mono focus:border-[#e59850] focus:outline-none"
                />

                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#a88264] truncate max-w-[200px]">
                    {hasValue ? 'Configured & active' : 'Not configured (hidden)'}
                  </span>
                  {hasValue ? (
                    <span className="text-emerald-400 flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Ready</span>
                    </span>
                  ) : (
                    <span className="text-amber-400 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>Empty</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* WhatsApp Link Quick Generator Card */}
      <div className="p-5 rounded-2xl bg-[#120d09] border border-[#c87a3e]/20 space-y-3">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <h4 className="text-xs font-mono text-[#f3d5b5] font-bold uppercase tracking-wider">
            WhatsApp Direct Link Generator
          </h4>
        </div>
        <p className="text-xs text-[#a88264]">
          Enter your WhatsApp phone number with country code (e.g. <code>+92 311 2802870</code>) to automatically generate a standard <code>https://wa.me/...</code> link.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            value={waPhoneHelper}
            onChange={(e) => setWaPhoneHelper(e.target.value)}
            placeholder="+92 311 2802870"
            className="flex-1 w-full px-3.5 py-2 rounded-xl bg-[#090705] border border-[#c87a3e]/25 text-white text-xs font-mono focus:border-[#e59850] focus:outline-none"
          />
          <button
            type="button"
            onClick={handleGenerateWhatsAppLink}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap"
          >
            ⚡ Generate WhatsApp Link
          </button>
        </div>
      </div>

      {/* Live Verification Badges */}
      <div className="p-5 rounded-2xl bg-[#120d09] border border-[#c87a3e]/20 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-[#e59850] font-bold uppercase tracking-wider">
            Live Quick Click-to-Verify Test Bar
          </span>
          <span className="text-[11px] text-[#a88264] font-mono">
            Click any badge below to test it
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#18110b] hover:bg-[#251912] border border-[#c87a3e]/30 text-xs text-[#f3d5b5] hover:text-white transition-all shadow-xs"
            >
              <Github className="w-3.5 h-3.5 text-[#e59850]" />
              <span>GitHub</span>
              <ExternalLink className="w-2.5 h-2.5 text-[#a88264]" />
            </a>
          )}

          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#18110b] hover:bg-[#251912] border border-[#c87a3e]/30 text-xs text-[#f3d5b5] hover:text-white transition-all shadow-xs"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#e59850]" />
              <span>LinkedIn</span>
              <ExternalLink className="w-2.5 h-2.5 text-[#a88264]" />
            </a>
          )}

          {twitterUrl && (
            <a
              href={twitterUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#18110b] hover:bg-[#251912] border border-[#c87a3e]/30 text-xs text-[#f3d5b5] hover:text-white transition-all shadow-xs"
            >
              <Twitter className="w-3.5 h-3.5 text-[#e59850]" />
              <span>Twitter / X</span>
              <ExternalLink className="w-2.5 h-2.5 text-[#a88264]" />
            </a>
          )}

          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#18110b] hover:bg-[#251912] border border-emerald-500/30 text-xs text-emerald-300 hover:text-white transition-all shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
              <ExternalLink className="w-2.5 h-2.5 text-emerald-500/60" />
            </a>
          )}

          {email && (
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#18110b] hover:bg-[#251912] border border-[#c87a3e]/30 text-xs text-[#f3d5b5] hover:text-white transition-all shadow-xs"
            >
              <Mail className="w-3.5 h-3.5 text-[#e59850]" />
              <span>{email}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
