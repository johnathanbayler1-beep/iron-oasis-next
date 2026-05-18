'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/* ═══════════════════════════════════════════════════════════════════
   SPLASH INTRO — Iron Oasis Gym
   ───────────────────────────────────────────────────────────────────
   Sequence:
     Phase 1  t=0     — 9 shutter blades exit (alternating L/R, stagger)
     Phase 2  t=0.12  — Geometric SVG IO mark clips in top→bottom
     Phase 3  t=0.45  — Chrome rule scales from center
     Phase 4  t=0.55  — Pre-label and tagline materialise
     Phase 5  t=1.55  — HOLD (1 second)
     Phase 6  t=2.55  — Curtain collapse: scaleY+skewX from top
     Phase 7  t=3.3   — dispatch 'splash:complete', set display:none
═══════════════════════════════════════════════════════════════════ */

const BLADE_COUNT = 9;

/* ── Inline SVG — geometric "IO" industrial mark ─────────────────
 *
 *  I — vertical bar with horizontal top/bottom caps
 *  O — rectangular hollow form (no border-radius, mechanical)
 *  Corner signal marks — hazard red, structural registration markers
 *  Structural cross-hair lines — at vertical midpoint, low opacity
 */
function IOmark() {
  return (
    <svg
      viewBox="0 0 300 176"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Iron Oasis IO mark"
      style={{
        width:    'clamp(200px, 42vw, 360px)',
        height:   'auto',
        flexShrink: 0,
      }}
    >
      {/* Outer frame border */}
      <rect
        x="0.5" y="0.5"
        width="299" height="175"
        stroke="#262626"
        strokeWidth="1"
      />

      {/* Corner signal registration marks (hazard red) */}
      <path d="M0 18 L0 0 L18 0"           stroke="#E61919" strokeWidth="1" fill="none" />
      <path d="M282 0 L300 0 L300 18"      stroke="#E61919" strokeWidth="1" fill="none" />
      <path d="M0 157 L0 175 L18 175"      stroke="#E61919" strokeWidth="1" fill="none" />
      <path d="M282 175 L300 175 L300 157" stroke="#E61919" strokeWidth="1" fill="none" />

      {/* ── "I" letterform ─────────────────────────────────────── */}
      {/* Top horizontal cap */}
      <rect x="44"  y="40" width="44" height="4"  fill="#f5f5f5" />
      {/* Vertical bar */}
      <rect x="62"  y="40" width="8"  height="96" fill="#f5f5f5" />
      {/* Bottom horizontal cap */}
      <rect x="44"  y="132" width="44" height="4" fill="#f5f5f5" />

      {/* ── "O" letterform — rectangular hollow ────────────────── */}
      {/* Top bar */}
      <rect x="128" y="40" width="128" height="12" fill="#f5f5f5" />
      {/* Bottom bar */}
      <rect x="128" y="124" width="128" height="12" fill="#f5f5f5" />
      {/* Left side */}
      <rect x="128" y="40" width="12" height="96" fill="#f5f5f5" />
      {/* Right side */}
      <rect x="244" y="40" width="12" height="96" fill="#f5f5f5" />

      {/* ── Structural cross-hair lines ─────────────────────────── */}
      {/* Left field — horizontal midpoint rule */}
      <line x1="0"   y1="88" x2="40"  y2="88" stroke="#262626" strokeWidth="0.75" />
      <line x1="92"  y1="88" x2="124" y2="88" stroke="#262626" strokeWidth="0.75" />
      {/* Right field — horizontal midpoint rule */}
      <line x1="260" y1="88" x2="300" y2="88" stroke="#262626" strokeWidth="0.75" />

      {/* ── Bottom metadata zone ────────────────────────────────── */}
      {/* Separator rule */}
      <line x1="22" y1="158" x2="278" y2="158" stroke="#262626" strokeWidth="0.5" />
    </svg>
  );
}

/* ── Main Component ─────────────────────────────────────────────── */
export function SplashIntro() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const markRef    = useRef<HTMLDivElement>(null);
  const ruleRef    = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const bladesRef  = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const ctx = gsap.context(() => {
      const evenBlades = bladesRef.current.filter((_, i) => i % 2 === 0);
      const oddBlades  = bladesRef.current.filter((_, i) => i % 2 !== 0);

      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
      });

      /* ── Phase 1: Shutter blades exit (t=0) ─────────────────────
       * Even blades slide LEFT, odd blades slide RIGHT.
       * Blades share the same --soot colour as the overlay background,
       * so they are invisible at rest but act as a mask over the logo.
       * As each band exits, the mark underneath is revealed.
       */
      tl.to(evenBlades, {
        xPercent: -101,
        duration: 0.8,
        stagger:  { each: 0.048, from: 'start' },
        ease:     'power3.inOut',
      }, 0)
        .to(oddBlades, {
          xPercent: 101,
          duration: 0.8,
          stagger:  { each: 0.048, from: 'end' },
          ease:     'power3.inOut',
        }, 0)

      /* ── Phase 2: SVG IO mark clips in (t=0.12) ──────────────── */
        .fromTo(markRef.current,
          { clipPath: 'inset(0 0 100% 0)' },
          { clipPath: 'inset(0 0 0% 0)',  duration: 0.7, ease: 'power3.out' },
          0.12,
        )

      /* ── Phase 3: Chrome rule scales from center (t=0.45) ─────── */
        .fromTo(ruleRef.current,
          { scaleX: 0, transformOrigin: 'center' },
          { scaleX: 1, duration: 0.5, ease: 'power3.out' },
          0.45,
        )

      /* ── Phase 4: Label + tagline materialise (t=0.55) ─────────── */
        .fromTo(labelRef.current,
          { opacity: 0, y: -6 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
          0.55,
        )
        .fromTo(taglineRef.current,
          { opacity: 0, letterSpacing: '0.45em' },
          { opacity: 1, letterSpacing: '0.2em', duration: 0.5, ease: 'power2.out' },
          0.65,
        )

      /* ── HOLD (1 second) ─────────────────────────────────────── */
        .to({}, { duration: 1.0 })

      /* ── Phase 6: Curtain collapse — scaleY + skewX from top ─── */
        .to(overlay, {
          scaleY:          0,
          skewX:           -1.5,
          transformOrigin: 'top center',
          duration:        0.78,
          ease:            'power3.in',
        })

      /* ── Phase 7: Fire event + remove from DOM ──────────────── */
        .call(() => {
          window.dispatchEvent(new CustomEvent('splash:complete'));
        })
        .set(overlay, { display: 'none' });
    }, overlay);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={overlayRef}
      className="scanlines"
      aria-hidden="true"
      style={{
        position:        'fixed',
        inset:           0,
        zIndex:          9999,
        overflow:        'hidden',
        backgroundColor: 'var(--soot)',
        display:         'flex',
        flexDirection:   'column',
        alignItems:      'center',
        justifyContent:  'center',
      }}
    >
      {/* Structural grid texture */}
      <div className="grid-overlay" />

      {/* ── Corner ASCII markers ──────────────────────────────────── */}
      <span
        className="ascii-corner ascii-corner--tl"
        style={{ color: 'var(--chrome-dark)' }}
      >
        ┌──
      </span>
      <span
        className="ascii-corner ascii-corner--tr"
        style={{ color: 'var(--chrome-dark)' }}
      >
        ──┐
      </span>
      <span
        className="ascii-corner ascii-corner--bl"
        style={{ color: 'var(--chrome-dark)' }}
      >
        └──
      </span>
      <span
        className="ascii-corner ascii-corner--br"
        style={{ color: 'var(--chrome-dark)' }}
      >
        ──┘
      </span>

      {/* ── Status readout — top center ────────────────────────── */}
      <div
        style={{
          position:      'absolute',
          top:           '1.5rem',
          left:          '50%',
          transform:     'translateX(-50%)',
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.5rem',
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color:         'var(--signal)',
          userSelect:    'none',
          whiteSpace:    'nowrap',
        }}
      >
        [ SYS:INIT ] IRON OASIS · EAST WINDSOR
      </div>

      {/* ── Logo center ──────────────────────────────────────────── */}
      <div
        style={{
          position:       'relative',
          zIndex:         5,
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          userSelect:     'none',
          gap:            0,
        }}
      >
        {/* Pre-label */}
        <div
          ref={labelRef}
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.5rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color:         'var(--chrome-dark)',
            marginBottom:  '1rem',
            opacity:       0,
          }}
        >
          PRIVATE MICRO-GYM · ONTARIO, CA
        </div>

        {/* SVG IO mark — clip-path reveal target */}
        <div
          ref={markRef}
          style={{ clipPath: 'inset(0 0 100% 0)' }}
        >
          <IOmark />
        </div>

        {/* Chrome rule */}
        <div
          ref={ruleRef}
          style={{
            width:           'clamp(180px, 38vw, 320px)',
            height:          '1px',
            background:      'var(--chrome)',
            margin:          '1rem 0 0.875rem',
            transform:       'scaleX(0)',
            transformOrigin: 'center',
          }}
        />

        {/* Tagline */}
        <p
          ref={taglineRef}
          style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.5625rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color:         'var(--chrome-mid)',
            opacity:       0,
          }}
        >
          EAST WINDSOR · PRIVATE · 24/7
        </p>
      </div>

      {/* ── Build ID — bottom right ────────────────────────────── */}
      <div
        style={{
          position:      'absolute',
          bottom:        '1.5rem',
          right:         '1.5rem',
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.4375rem',
          letterSpacing: '0.12em',
          color:         'var(--chrome-dark)',
          userSelect:    'none',
        }}
      >
        REV 3.0 · IO-SYS · D-01
      </div>

      {/* ══ Shutter Blades ══════════════════════════════════════════
       *  9 horizontal bands that together cover the full overlay.
       *  Z-index 10 (above the logo layer at z:5).
       *  Same --soot colour as overlay bg → invisible at rest.
       *  As they exit left/right, logo is progressively revealed.
       *  overflow:hidden on the overlay clips them at the edge.
       *  +1px height prevents sub-pixel hairline gaps between blades.
       ═══════════════════════════════════════════════════════════ */}
      {Array.from({ length: BLADE_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) bladesRef.current[i] = el; }}
          style={{
            position:        'absolute',
            top:             `${(i / BLADE_COUNT) * 100}%`,
            left:            0,
            width:           '100%',
            height:          `calc(${100 / BLADE_COUNT}% + 1px)`,
            backgroundColor: 'var(--soot)',
            borderTop:       i > 0 ? '1px solid rgba(38,38,38,0.6)' : 'none',
            zIndex:          10,
          }}
        />
      ))}
    </div>
  );
}
