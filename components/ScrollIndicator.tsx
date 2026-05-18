'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/* ─── ScrollIndicator ────────────────────────────────────────────────
 * Industrial Brutalist scroll prompt.
 * Layout (bottom-center, absolute):
 *   [ SYS:SCROLL ] label
 *   1px vertical track line
 *   animated fill bar that loops top→bottom (GSAP infinite)
 *   ▼ chevron bracket
 *
 * Fades out when user scrolls past 80px via scroll listener.
 * pointer-events-none — parent wrapper already sets this.
 * ────────────────────────────────────────────────────────────────── */

export default function ScrollIndicator() {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const fillRef  = useRef<HTMLDivElement>(null);

  /* ── Looping fill animation ─────────────────────────────────────── */
  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
    tl.fromTo(
      fill,
      { scaleY: 0, transformOrigin: 'top center', opacity: 1 },
      { scaleY: 1, duration: 0.9, ease: 'power2.inOut' },
    ).to(fill, {
      opacity: 0,
      duration: 0.2,
      ease: 'none',
    });

    return () => { tl.kill(); };
  }, []);

  /* ── Fade out on scroll ─────────────────────────────────────────── */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    function onScroll() {
      if (!wrap) return;
      const progress = Math.min(window.scrollY / 80, 1);
      wrap.style.opacity = String(1 - progress);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{
        position:      'absolute',
        bottom:        'clamp(1.5rem, 3vh, 2.5rem)',
        left:          '50%',
        transform:     'translateX(-50%)',
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        gap:           '0.5rem',
        userSelect:    'none',
      }}
    >
      {/* SYS label */}
      <span
        style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.4rem',
          fontWeight:    700,
          letterSpacing: '0.26em',
          textTransform: 'uppercase',
          color:         'var(--chrome-dark)',
          whiteSpace:    'nowrap',
        }}
      >
        [ SYS:SCROLL ]
      </span>

      {/* Track + fill */}
      <div
        style={{
          position:        'relative',
          width:           '1px',
          height:          '2.5rem',
          backgroundColor: 'var(--chrome-dark)',
          overflow:        'hidden',
        }}
      >
        <div
          ref={fillRef}
          style={{
            position:        'absolute',
            inset:           0,
            backgroundColor: 'var(--chrome-mid)',
            transformOrigin: 'top center',
            transform:       'scaleY(0)',
          }}
        />
      </div>

      {/* Chevron bracket */}
      <svg
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.35 }}
      >
        <path d="M1 1L5 5L9 1" stroke="var(--chrome-mid)" strokeWidth="1" />
      </svg>
    </div>
  );
}
