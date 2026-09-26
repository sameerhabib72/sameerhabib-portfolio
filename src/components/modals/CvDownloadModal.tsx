import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../../context/DataContext';
import {
  FileDown,
  Printer,
  X,
  MapPin,
  Mail,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Code2,
  Phone,
  MessageCircle,
  Copy,
  Check
} from 'lucide-react';

export const CvDownloadModal: React.FC = () => {
  const { isCvModalOpen, setCvModalOpen, siteSettings, experiences, education, skills, showToast } = useData();
  const [copied, setCopied] = useState(false);

  if (!isCvModalOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadText = () => {
    const resumeText = `SAMEER HABIB - FULL STACK DEVELOPER
Email: ${siteSettings.email}
Phone: ${siteSettings.phone}
Location: ${siteSettings.location}
Availability: ${siteSettings.availability}
GitHub: ${siteSettings.githubUrl}
LinkedIn: ${siteSettings.linkedinUrl}

PROFESSIONAL SUMMARY:
Full Stack Developer with 3+ years of experience engineering scalable web applications and e-commerce platforms using Laravel, PHP, React.js, Next.js, and MySQL. Proven track record at The Designs Firm, LiveBits, and FidNos.

PROFESSIONAL EXPERIENCE:
${experiences
  .map(
    (e) => `
* ${e.position} | ${e.company} (${e.startDate} - ${e.endDate})
  Location: ${e.location}
  ${e.description}
  Key Contributions:
  ${e.responsibilities.map((r) => `  - ${r}`).join('\n')}
  Technologies: ${e.technologies.join(', ')}
`
  )
  .join('\n')}

EDUCATION:
${education
  .map(
    (edu) => `
* ${edu.degree} in ${edu.field} | ${edu.institution} (${edu.startDate} - ${edu.endDate})
  ${edu.grade ? `Grade: ${edu.grade}` : ''}
  ${edu.description}
`
  )
  .join('\n')}

TECHNICAL SKILLS:
${skills.map((s) => `- ${s.name} (${s.category}, ${s.proficiency}%, ${s.experienceYears})`).join('\n')}
`;

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Sameer_Habib_Resume_Full_Stack_Developer.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Resume downloaded as text document', 'success');
  };

  const handleCopySummary = () => {
    const markdown = `# Sameer Habib - Full Stack Developer
- **Email:** ${siteSettings.email}
- **Phone:** ${siteSettings.phone}
- **Location:** ${siteSettings.location}
- **Experience:** 3+ Years in Laravel, PHP, React, Next.js, MySQL
- **GitHub:** ${siteSettings.githubUrl}
- **LinkedIn:** ${siteSettings.linkedinUrl}

## Experience
${experiences.map((e) => `- **${e.position}** at ${e.company} (${e.startDate} - ${e.endDate})`).join('\n')}

## Education
${education.map((edu) => `- **${edu.degree} in ${edu.field}**, ${edu.institution} (${edu.startDate} - ${edu.endDate})`).join('\n')}
`;
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    showToast('Resume summary copied to clipboard', 'info');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      <motion.div
        id="cv-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto"
        onClick={() => setCvModalOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="w-full max-w-3xl bg-[#120e0b] border border-[#c87a3e]/30 rounded-2xl shadow-2xl overflow-hidden my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with actions */}
          <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-[#c87a3e]/20 bg-[#1c140f] gap-3">
            <div className="flex items-center space-x-2">
              <FileDown className="w-5 h-5 text-[#e59850]" />
              <h3 className="text-sm font-mono uppercase tracking-wider text-white font-bold">
                Curriculum Vitae • Sameer Habib
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleCopySummary}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#271c14] hover:bg-[#342419] text-xs text-[#f3d5b5] transition-colors cursor-pointer"
                title="Copy Quick Markdown Summary"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#e59850]" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#271c14] hover:bg-[#342419] text-xs text-[#d4a373] transition-colors cursor-pointer"
                title="Print CV"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>

              <button
                onClick={handleDownloadText}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#b4652a] to-[#d97706] hover:from-[#c87a3e] hover:to-[#e59850] text-white font-bold text-xs transition-colors cursor-pointer"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>

              <button
                onClick={() => setCvModalOpen(false)}
                className="p-1.5 rounded-lg text-[#a88264] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close CV Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Printable Resume Document Body */}
          <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto text-left text-[#e7bc91] scrollbar-thin scrollbar-thumb-[#c87a3e]/20">
            {/* Header with Direct Contacts */}
            <div className="border-b border-[#c87a3e]/20 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                    Sameer Habib
                  </h1>
                  <p className="text-[#e59850] font-mono text-sm font-semibold mt-1">
                    Full Stack Developer • Laravel, PHP & React Specialist
                  </p>
                </div>

                {/* Direct quick action pills */}
                <div className="flex items-center gap-2">
                  <a
                    href="https://wa.me/923112802870"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 text-xs font-mono font-medium transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${siteSettings.phone.replace(/[^0-9+]/g, '')}`}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#c87a3e]/15 border border-[#c87a3e]/30 text-[#f3d5b5] hover:bg-[#c87a3e]/25 text-xs font-mono font-medium transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-4 text-xs text-[#d4a373] font-mono">
                <span className="flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#e59850] shrink-0" />
                  <span>{siteSettings.location}</span>
                </span>
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="flex items-center space-x-1.5 text-[#f3d5b5] hover:underline"
                >
                  <Mail className="w-3.5 h-3.5 text-[#e59850] shrink-0" />
                  <span>{siteSettings.email}</span>
                </a>
                <span className="flex items-center space-x-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#e59850] shrink-0" />
                  <span>{siteSettings.phone}</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-emerald-300">{siteSettings.availability}</span>
                </span>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#e59850] font-bold">
                Professional Summary
              </h2>
              <p className="text-xs sm:text-sm text-[#e7bc91] leading-relaxed">
                Full Stack Developer with 3+ years of verified software engineering experience specializing in Laravel, PHP, React.js, Next.js, and relational database systems. Extensive background developing scalable web applications, dynamic e-commerce platforms, high-throughput RESTful APIs, and agency-grade client solutions.
              </p>
            </div>

            {/* Work History */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#e59850] font-bold flex items-center space-x-2">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Work Experience (5 Roles)</span>
              </h2>

              <div className="space-y-6">
                {experiences.map((e) => (
                  <div key={e.id} className="space-y-1.5 p-4 rounded-xl bg-[#1c140f]/60 border border-[#c87a3e]/20">
                    <div className="flex flex-wrap justify-between items-start gap-1">
                      <div>
                        <h3 className="text-sm font-bold text-white">{e.position}</h3>
                        <p className="text-xs text-[#e59850]">{e.company} • {e.location}</p>
                      </div>
                      <span className="text-xs font-mono text-[#d4a373]">
                        {e.startDate} – {e.endDate}
                      </span>
                    </div>
                    <p className="text-xs text-[#e7bc91] mt-1">{e.description}</p>
                    <ul className="list-disc list-inside text-xs text-[#d4a373] space-y-1 pl-1 pt-1">
                      {e.responsibilities.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                    <p className="text-[11px] font-mono text-[#a88264] pt-1">
                      Stack: <span className="text-[#f3d5b5]">{e.technologies.join(', ')}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#e59850] font-bold flex items-center space-x-2">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Academic Education</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {education.map((edu) => (
                  <div key={edu.id} className="p-3 rounded-xl bg-[#1c140f]/60 border border-[#c87a3e]/20 text-xs">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-white">{edu.degree}</h3>
                      <span className="font-mono text-[#d4a373] text-[10px]">{edu.startDate} – {edu.endDate}</span>
                    </div>
                    <p className="text-[#e59850] mt-0.5">{edu.field}</p>
                    <p className="text-[#a88264] text-[11px]">{edu.institution} {edu.grade ? `• ${edu.grade}` : ''}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Skills Overview */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#e59850] font-bold flex items-center space-x-2">
                <Code2 className="w-3.5 h-3.5" />
                <span>Technical Competencies</span>
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s) => (
                  <span
                    key={s.id}
                    className="px-2 py-0.5 rounded-md bg-[#251a13] text-[11px] font-mono text-[#f3d5b5] border border-[#c87a3e]/25"
                  >
                    {s.name} ({s.proficiency}%)
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
