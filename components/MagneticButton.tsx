'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function MagneticButton({ children, className = '', ...props }: MagneticButtonProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = triggerRef.current;
    if (!el) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = el.getBoundingClientRect();

    // Center point vectors
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    // Pull intensity factor (0.35 creates a tight, premium magnetic snap)
    gsap.to(el, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    // Snap violently back to geometric origin using an elastic oscillation curve
    gsap.to(triggerRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  return (
    <button
      {...props}
      ref={triggerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-flex items-center justify-center font-mono uppercase text-xs tracking-widest border border-[var(--chrome-dark)] px-6 py-4 bg-[var(--steel)] text-[var(--chalk)] hover:bg-[var(--chalk)] hover:text-[var(--soot)] transition-colors duration-300 select-none ${className}`}
    >
      <span className="relative z-10 pointer-events-none">{children}</span>
    </button>
  );
}
