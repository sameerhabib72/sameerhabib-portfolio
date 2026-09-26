import React from 'react';
import { motion } from 'motion/react';
import { useData } from '../../context/DataContext';
import { Sparkles, Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useData();

  const published = testimonials
    .filter((t) => t.published)
    .sort((a, b) => a.order - b.order);

  return (
    <motion.section
      id="testimonials"
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px', amount: 0.1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-24 bg-[#080706] border-t border-[#c87a3e]/15 overflow-hidden"
    >
      {/* Background ambient warm leather glow */}
      <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-[#c87a3e]/12 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 rounded-full bg-[#d97706]/10 blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16 text-left"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#c87a3e]/15 border border-[#c87a3e]/30 text-xs font-mono text-[#f3d5b5] mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#e59850]" />
            <span>11 // ENDORSEMENTS &amp; SOCIAL PROOF</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Client &amp; Colleague <span className="bg-gradient-to-r from-[#f3d5b5] via-[#e59850] to-[#c87a3e] bg-clip-text text-transparent">Recommendations</span>
          </h2>
          <p className="mt-3 text-base text-[#e7bc91] leading-relaxed font-normal">
            Verified feedback from product teams, designers, and engineering leaders Sameer has collaborated with.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {published.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-7 sm:p-8 rounded-3xl bg-[#15110d]/80 border border-[#c87a3e]/20 hover:border-[#c87a3e]/60 transition-all duration-300 flex flex-col justify-between relative shadow-sm hover:shadow-[0_0_30px_-8px_rgba(200,122,62,0.3)] backdrop-blur-xl text-left"
            >
              <div>
                <div className="flex items-center space-x-1 mb-4 text-[#e59850]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#e59850]" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-[#c87a3e]/30 mb-3" />

                <p className="text-sm text-[#e7bc91] leading-relaxed italic mb-6 font-normal">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center space-x-3.5 pt-4 border-t border-[#c87a3e]/15">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-2xl object-cover border border-[#c87a3e]/40 shadow-sm"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#f3d5b5] transition-colors">{item.name}</h4>
                  <p className="text-xs text-[#a88264]">
                    {item.role} • <span className="text-[#e59850] font-semibold">{item.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
