import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<'default' | 'clickable' | 'cta' | 'project' | 'image'>('default');
  const [cursorText, setCursorText] = useState('');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check touch devices or mobile
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Determine hover target type
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const customTextElem = target.closest('[data-cursor-text]') as HTMLElement | null;
      const ctaButton = target.closest('[data-cursor="cta"], .cta-button, .btn-primary, [data-cta="true"], .see-all-btn');
      const cvTarget = target.closest('[data-cursor="cv"]');
      const contactTarget = target.closest('[data-cursor="contact"]');
      const projectCard = target.closest('[data-cursor="project"]');
      const imageCard = target.closest('[data-cursor="image"]');
      const clickAction = target.closest('[data-cursor="click"]');
      const clickable = target.closest('button, a, input, textarea, select, [role="button"], .interactive-element');

      if (customTextElem && customTextElem.getAttribute('data-cursor-text')) {
        setIsHovering(true);
        setCursorVariant(ctaButton ? 'cta' : 'clickable');
        setCursorText(customTextElem.getAttribute('data-cursor-text') || '');
      } else if (ctaButton) {
        setIsHovering(true);
        setCursorVariant('cta');
        setCursorText('EXPLORE');
      } else if (cvTarget) {
        setIsHovering(true);
        setCursorVariant('cta');
        setCursorText('GET CV');
      } else if (contactTarget) {
        setIsHovering(true);
        setCursorVariant('cta');
        setCursorText('CONNECT');
      } else if (projectCard) {
        setIsHovering(true);
        setCursorVariant('project');
        setCursorText('VIEW PROJECT');
      } else if (imageCard) {
        setIsHovering(true);
        setCursorVariant('image');
        setCursorText('ZOOM');
      } else if (clickAction) {
        setIsHovering(true);
        setCursorVariant('clickable');
        setCursorText('CLICK');
      } else if (clickable) {
        setIsHovering(true);
        setCursorVariant('clickable');
        const tag = clickable.tagName.toLowerCase();
        setCursorText(tag === 'a' ? 'OPEN' : 'CLICK');
      } else {
        setIsHovering(false);
        setCursorVariant('default');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth trailing spring effect
  useEffect(() => {
    if (isTouchDevice) return;
    let animationFrameId: number;

    const animate = () => {
      setTargetPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.24,
        y: prev.y + (pos.y - prev.y) * 0.24,
      }));
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [pos, isTouchDevice]);

  if (isTouchDevice) return null;

  const isCta = cursorVariant === 'cta';

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-300">
      {/* Outer Ring / Tag - Leather & Amber Theme */}
      <div
        className={`fixed -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-200 ease-out ${
          isCta
            ? 'w-28 h-28 rounded-full bg-gradient-to-tr from-[#964e1c]/40 via-[#c87a3e]/30 to-[#f59e0b]/25 backdrop-blur-xs border-2 border-[#e59850]/90 shadow-xl shadow-[#c87a3e]/30 scale-105'
            : isHovering
            ? 'w-24 h-24 rounded-full bg-[#c87a3e]/20 backdrop-blur-xs border border-[#e59850]/60 shadow-lg shadow-[#c87a3e]/20'
            : 'w-8 h-8 rounded-full border border-[#c87a3e]/40'
        }`}
        style={{
          left: `${targetPos.x}px`,
          top: `${targetPos.y}px`,
        }}
      >
        {isHovering && cursorText && (
          <span className={`text-[9px] font-mono font-bold tracking-wider uppercase text-center px-1.5 transition-colors ${
            isCta ? 'text-[#fde68a] font-extrabold drop-shadow-sm' : 'text-[#f3d5b5]'
          }`}>
            {cursorText}
          </span>
        )}
      </div>

      {/* Main Center Dot - Warm Caramel & Cognac */}
      <div
        className={`fixed -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 ${
          isCta
            ? 'w-2.5 h-2.5 bg-[#f59e0b] shadow-md shadow-[#d97706]'
            : isHovering
            ? 'w-1.5 h-1.5 bg-[#e59850]'
            : 'w-2 h-2 bg-[#c87a3e]'
        }`}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      />
    </div>
  );
};
