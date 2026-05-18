'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollIndicator from '@/components/ScrollIndicator';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════════
   IRON OASIS — 3D MULTI-LAYER PARALLAX HERO
   ───────────────────────────────────────────────────────────────────
   Layout: 3-column grid
     Left  20%  — Primary copy (headline, body, CTA)
     Center 60% — 4-layer parallax visual zone
     Right 20%  — Tactical spec data strip
   "Primary copy resides strictly in the outer 40% side zones."

   Parallax layers (scroll-driven scrub, start:'top top' end:'bottom top'):
     Layer 0 DEEP  yPercent: -8  → +8   Slowest — structural bg
     Layer 1 BG    yPercent: -12 → +12  Slow    — grid + accent line
     Layer 2 MID   yPercent: -5  → +5   Medium  — IO mark + tac frame
     Layer 3 FG    yPercent: +10 → -22  Fast    — floating spec chips

   Entrance: triggered by 'splash:complete' CustomEvent.
   Parallax: disabled on touch/pointer:coarse devices.
═══════════════════════════════════════════════════════════════════ */

/* ── Reticle SVG — tactical crosshair overlay (deep bg layer) ─────
 * Rendered at very low opacity (0.045) to contribute atmosphere
 * without competing with the primary mark.
 */
function Reticle() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        position:      'absolute',
        top:           '50%',
        left:          '50%',
        transform:     'translate(-50%, -50%)',
        width:         'clamp(260px, 50%, 420px)',
        height:        'auto',
        opacity:       0.045,
        pointerEvents: 'none',
      }}
    >
      {/* Outer circle */}
      <circle cx="100" cy="100" r="90" stroke="#d8d8d8" strokeWidth="0.5" />
      {/* Inner circle */}
      <circle cx="100" cy="100" r="55" stroke="#d8d8d8" strokeWidth="0.5" />
      {/* Micro center dot */}
      <circle cx="100" cy="100" r="3"  stroke="#d8d8d8" strokeWidth="0.5" />
      {/* Horizontal axis */}
      <line x1="0"   y1="100" x2="40"  y2="100" stroke="#d8d8d8" strokeWidth="0.5" />
      <line x1="160" y1="100" x2="200" y2="100" stroke="#d8d8d8" strokeWidth="0.5" />
      {/* Vertical axis */}
      <line x1="100" y1="0"   x2="100" y2="40"  stroke="#d8d8d8" strokeWidth="0.5" />
      <line x1="100" y1="160" x2="100" y2="200" stroke="#d8d8d8" strokeWidth="0.5" />
      {/* Tick marks at 45° positions */}
      <line x1="136" y1="36"  x2="142" y2="30"  stroke="#d8d8d8" strokeWidth="0.5" />
      <line x1="64"  y1="36"  x2="58"  y2="30"  stroke="#d8d8d8" strokeWidth="0.5" />
      <line x1="136" y1="164" x2="142" y2="170" stroke="#d8d8d8" strokeWidth="0.5" />
      <line x1="64"  y1="164" x2="58"  y2="170" stroke="#d8d8d8" strokeWidth="0.5" />
    </svg>
  );
}

/* ── Floating spec chip (foreground parallax layer) ──────────────── */
function SpecChip({
  label,
  value,
  style,
}: {
  label: string;
  value: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="hero-spec-chip"
      style={{
        position:            'absolute',
        border:              '1px solid var(--chrome-dark)',
        padding:             '0.625rem 0.875rem',
        backgroundColor:     'rgba(10, 10, 10, 0.82)',
        backdropFilter:      'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        ...style,
      }}
    >
      <div
        style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.4375rem',
          fontWeight:    700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color:         'var(--chrome-mid)',
          marginBottom:  '0.2rem',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily:    'var(--font-display)',
          fontSize:      '1.125rem',
          lineHeight:    1,
          color:         'var(--chalk)',
          letterSpacing: '0.04em',
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* ── Right data strip ─────────────────────────────────────────────── */
function DataStrip() {
  const STATS = [
    { val: '$65',  unit: '',    label: 'ACCESS / MO'       },
    { val: '24',   unit: '/7',  label: 'AUTOMATED ACCESS'  },
    { val: '1',    unit: 'HR',  label: 'PRIVATE SESSION'   },
    { val: '0',    unit: '',    label: 'CONTRACTS'         },
  ];

  return (
    <div
      className="hero-right-data"
      style={{
        display:         'flex',
        flexDirection:   'column',
        borderLeft:      '1px solid var(--chrome-dark)',
        height:          '100dvh',
        paddingTop:      'calc(var(--nav-h) + 2rem)',
        paddingBottom:   '2rem',
        paddingInline:   'clamp(1rem, 2vw, 1.5rem)',
        justifyContent:  'center',
        gap:             '1px',
        backgroundColor: 'var(--chrome-dark)',  /* gap seam color */
      }}
    >
      {STATS.map(({ val, unit, label }) => (
        <div
          key={label}
          style={{
            backgroundColor: 'var(--soot)',
            padding:         '1.25rem clamp(0.75rem, 2vw, 1.25rem)',
            flex:            1,
            display:         'flex',
            flexDirection:   'column',
            justifyContent:  'center',
            gap:             '0.3rem',
          }}
        >
          {/* Chrome rule above value */}
          <div style={{ width: '1.5rem', height: '1px', background: 'var(--chrome-dark)' }} />
          {/* Value */}
          <div
            style={{
              display:    'flex',
              alignItems: 'flex-end',
              gap:        '0.15rem',
              lineHeight: 1,
            }}
          >
            <span
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'clamp(1.625rem, 3vw, 2.5rem)',
                letterSpacing: '-0.02em',
                color:         'var(--chalk)',
              }}
            >
              {val}
            </span>
            {unit && (
              <span
                style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.5rem',
                  fontWeight:    700,
                  letterSpacing: '0.12em',
                  color:         'var(--chrome-mid)',
                  paddingBottom: '0.25rem',
                }}
              >
                {unit}
              </span>
            )}
          </div>
          {/* Label */}
          <div
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.4375rem',
              fontWeight:    700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color:         'var(--chrome-mid)',
            }}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────── */
interface HeroProps {
  onBookingOpen?: () => void;
}

export function Hero({ onBookingOpen }: HeroProps) {
  const heroRef    = useRef<HTMLElement>(null);
  const copyRef    = useRef<HTMLDivElement>(null);
  const deepRef    = useRef<HTMLDivElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const midRef     = useRef<HTMLDivElement>(null);
  const fgRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {

      /* ── Entrance animation ─────────────────────────────────────
       * Runs after 'splash:complete' fires.
       * Hero runs "under the splash" — when curtain lifts, the hero
       * copy is already fully rendered and the clip wipe looks like
       * the splash itself was the reveal animation.
       */
      function buildEntrance() {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        tl.fromTo('.hero-status',
          { opacity: 0, x: -14 },
          { opacity: 1, x: 0,   duration: 0.55 }
        )
          .fromTo('.hero-hl-1',
            { yPercent: 112, skewX: 4 },
            { yPercent: 0,   skewX: 0, duration: 0.85 },
            '-=0.3'
          )
          .fromTo('.hero-hl-2',
            { yPercent: 112, skewX: 4 },
            { yPercent: 0,   skewX: 0, duration: 0.85 },
            '-=0.68'
          )
          .fromTo('.hero-rule-line',
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 0.5, ease: 'power3.out' },
            '-=0.45'
          )
          .fromTo('.hero-body-copy',
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0,  duration: 0.55 },
            '-=0.3'
          )
          .fromTo('.hero-cta-row',
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0,  duration: 0.5 },
            '-=0.35'
          )
          /* Center visual zone: clip-path wipe from left */
          .fromTo('.hero-center',
            { clipPath: 'inset(0 100% 0 0)' },
            { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power3.inOut' },
            0.1
          )
          /* Spec chips stagger fade */
          .fromTo('.hero-spec-chip',
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0,  duration: 0.45, stagger: 0.1 },
            0.65
          )
          /* Right data strip fade */
          .fromTo('.hero-right-data',
            { opacity: 0 },
            { opacity: 1, duration: 0.55 },
            0.5
          );
      }

      /* Fire on splash:complete, with 3.6 s safety fallback */
      const fallback = setTimeout(buildEntrance, 3600);

      function onSplashComplete() {
        clearTimeout(fallback);
        buildEntrance();
      }

      window.addEventListener('splash:complete', onSplashComplete, { once: true });

      /* ── Scroll parallax ─────────────────────────────────────────
       * Disabled on touch/pointer:coarse (mobile, tablet) to prevent
       * janky behaviour on scroll momentum.
       *
       * Layer velocity reference (ScrollTrigger scrub, hero top→bottom):
       *
       *   DEEP  yPercent -8  → +8   Moves DOWN  within section → appears slower
       *   BG    yPercent -12 → +12  Moves DOWN  within section → appears slower
       *   MID   yPercent -5  → +5   Moves DOWN  within section → mild drift
       *   FG    yPercent +10 → -22  Moves UP    within section → appears faster
       *   COPY  yPercent  0  → -10  Moves UP slightly + fades as hero scrolls off
       *
       * All layers extend 25% beyond their container (inset: -25% 0)
       * so yPercent travel doesn't expose empty space at boundaries.
       */
      const touchOnly = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

      if (!touchOnly) {
        const st = {
          trigger: hero,
          start:   'top top',
          end:     'bottom top',
          scrub:   true,
        };

        gsap.fromTo(deepRef.current,
          { yPercent: -8  },
          { yPercent:  8,   ease: 'none', scrollTrigger: st },
        );
        gsap.fromTo(bgRef.current,
          { yPercent: -12 },
          { yPercent:  12,  ease: 'none', scrollTrigger: st },
        );
        gsap.fromTo(midRef.current,
          { yPercent: -5  },
          { yPercent:  5,   ease: 'none', scrollTrigger: st },
        );
        gsap.fromTo(fgRef.current,
          { yPercent:  10 },
          { yPercent: -22,  ease: 'none', scrollTrigger: st },
        );
        gsap.fromTo(copyRef.current,
          { yPercent: 0, opacity: 1 },
          { yPercent: -10, opacity: 0.3, ease: 'none', scrollTrigger: st },
        );
      }

      return () => {
        window.removeEventListener('splash:complete', onSplashComplete);
        clearTimeout(fallback);
      };
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        position:        'relative',
        minHeight:       '100dvh',
        overflow:        'hidden',
        backgroundColor: 'var(--soot)',
      }}
    >
      {/* Full-bleed structural grid */}
      <div className="grid-overlay" />

      {/* ── 3-column grid ──────────────────────────────────────────
       *  left 20% | center 60% | right 20%
       *  "Primary copy resides strictly in the outer 40% side zones"
       */}
      <div
        className="container hero-grid"
        style={{
          display:             'grid',
          gridTemplateColumns: '2fr 6fr 2fr',
          gridTemplateRows:    '1fr',
          alignItems:          'stretch',
          minHeight:           '100dvh',
        }}
      >

        {/* ╔═══════════════════════════════╗
            ║  LEFT — primary copy zone     ║  20%
            ╚═══════════════════════════════╝ */}
        <div
          ref={copyRef}
          className="hero-left"
          style={{
            display:         'flex',
            flexDirection:   'column',
            justifyContent:  'center',
            position:        'relative',
            zIndex:          10,
            paddingTop:      'calc(var(--nav-h) + 2rem)',
            paddingBottom:   '2.5rem',
            paddingRight:    'clamp(1rem, 2vw, 1.5rem)',
            borderRight:     '1px solid var(--chrome-dark)',
            minHeight:       '100dvh',
          }}
        >
          {/* Status indicator row */}
          <div
            className="hero-status"
            style={{
              display:      'flex',
              alignItems:   'center',
              gap:          '0.625rem',
              marginBottom: 'clamp(1.5rem, 3vh, 2.5rem)',
              opacity:      0,
            }}
          >
            <span className="status-dot" />
            <span
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.5rem',
                fontWeight:    700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color:         'var(--signal)',
              }}
            >
              SYS:ONLINE
            </span>
          </div>

          {/* Headline — two punch-reveal lines */}
          <h1
            style={{
              marginBottom: 'clamp(1.25rem, 2.5vh, 2rem)',
            }}
          >
            <div style={{ overflow: 'hidden' }}>
              <div
                className="hero-hl-1"
                style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      'clamp(4rem, 6.5vw, 7rem)',
                  lineHeight:    0.88,
                  letterSpacing: '-0.025em',
                  textTransform: 'uppercase',
                  color:         'var(--chalk)',
                }}
              >
                SPATIAL
              </div>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div
                className="hero-hl-2"
                style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      'clamp(4rem, 6.5vw, 7rem)',
                  lineHeight:    0.88,
                  letterSpacing: '-0.025em',
                  textTransform: 'uppercase',
                  color:         'var(--chalk)',
                }}
              >
                ISOLATION<span style={{ color: 'var(--signal)' }}>.</span>
              </div>
            </div>
          </h1>

          {/* Chrome signal rule */}
          <div
            className="hero-rule-line"
            style={{
              width:           '2.5rem',
              height:          '1px',
              background:      'var(--chrome)',
              marginBottom:    'clamp(1rem, 2vh, 1.75rem)',
              transform:       'scaleX(0)',
              transformOrigin: 'left center',
            }}
          />

          {/* Body copy */}
          <p
            className="hero-body-copy"
            style={{
              fontFamily:   'var(--font-mono)',
              fontSize:     '0.75rem',
              lineHeight:   1.78,
              color:        'var(--chrome-mid)',
              maxWidth:     '32ch',
              marginBottom: 'clamp(1.5rem, 3vh, 2.5rem)',
              opacity:      0,
            }}
          >
            On-demand, acoustically decoupled environments engineered for absolute
            privacy. Zero human friction. 24/7 automated access.
          </p>

          {/* CTA row */}
          <div
            className="hero-cta-row"
            style={{
              display:        'flex',
              flexDirection:  'column',
              gap:            '0.625rem',
              opacity:        0,
            }}
          >
            <button
              onClick={onBookingOpen}
              className="btn btn--primary"
              style={{ justifyContent: 'space-between', width: '100%' }}
            >
              REQUEST APP ACCESS
              <span className="btn__trail">→</span>
            </button>
            <a
              href="/pricing"
              className="btn btn--ghost"
              style={{ justifyContent: 'space-between' }}
            >
              VIEW ACCESS TIERS
              <span className="btn__trail">↓</span>
            </a>
          </div>
        </div>

        {/* ╔═══════════════════════════════╗
            ║  CENTER — 4-layer parallax    ║  60%
            ╚═══════════════════════════════╝ */}
        <div
          className="hero-center"
          style={{
            position:   'relative',
            minHeight:  '100dvh',
            overflow:   'hidden',
            clipPath:   'inset(0 100% 0 0)',   /* GSAP animates to inset(0 0% 0 0) */
          }}
        >

          {/* ── LAYER 0: DEEP — slowest (yPercent -8 → +8) ───────────
           *  Contains: structural grid + crosshair reticle SVG.
           *  Inset -25% top/bottom to allow ±8% travel without clipping.
           */}
          <div
            ref={deepRef}
            style={{
              position:   'absolute',
              inset:      '-25% 0',
              zIndex:     1,
              willChange: 'transform',
            }}
          >
            <div className="grid-overlay absolute inset-0" />
            <Reticle />
          </div>

          {/* ── LAYER 1: BG — slow (yPercent -12 → +12) ─────────────
           *  Contains: horizontal structural compartment rules +
           *            vertical accent line (fading gradient).
           *  Inset -25% to handle ±12% travel.
           */}
          <div
            ref={bgRef}
            style={{
              position:   'absolute',
              inset:      '-25% 0',
              zIndex:     2,
              willChange: 'transform',
            }}
          >
            {/* CRT scanline strips */}
            <div
              style={{
                position:        'absolute',
                inset:           0,
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)',
                pointerEvents:   'none',
              }}
            />

            {/* Horizontal compartment rules — at 33% and 66% of inner zone */}
            <div
              style={{
                position:   'absolute',
                top:        '36%',
                left:       0,
                right:      0,
                height:     '1px',
                background: 'var(--chrome-dark)',
              }}
            />
            <div
              style={{
                position:   'absolute',
                top:        '67%',
                left:       0,
                right:      0,
                height:     '1px',
                background: 'var(--chrome-dark)',
              }}
            />

            {/* Left vertical accent line */}
            <div
              style={{
                position:   'absolute',
                top:        0,
                bottom:     0,
                left:       'clamp(1.5rem, 5vw, 3.5rem)',
                width:      '1px',
                background: 'linear-gradient(to bottom, transparent, var(--chrome-dark) 20%, var(--chrome-dark) 80%, transparent)',
              }}
            />
          </div>

          {/* ── LAYER 2: MID — medium (yPercent -5 → +5) ────────────
           *  Contains: large IO watermark (opacity 0.032) +
           *            double-bezel tactical frame with 24/7 mark.
           *  Inset -15% — smaller travel range, less overhang needed.
           */}
          <div
            ref={midRef}
            style={{
              position:        'absolute',
              inset:           '-15% 0',
              zIndex:          3,
              willChange:      'transform',
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
            }}
          >
            {/* IO watermark — large, near-invisible */}
            <div
              aria-hidden="true"
              style={{
                position:      'absolute',
                top:           '50%',
                left:          '50%',
                transform:     'translate(-50%, -50%)',
                fontFamily:    'var(--font-display)',
                fontSize:      'clamp(14rem, 38vw, 36rem)',
                lineHeight:    0.8,
                color:         'var(--chalk)',
                opacity:       0.032,
                userSelect:    'none',
                letterSpacing: '-0.04em',
                whiteSpace:    'nowrap',
                pointerEvents: 'none',
              }}
            >
              IO
            </div>

            {/* Tactical frame — double bezel with 24/7 */}
            <div
              className="bezel"
              style={{
                width:    'clamp(200px, 40%, 320px)',
                position: 'relative',
              }}
            >
              <div
                className="bezel__inner"
                style={{
                  textAlign: 'center',
                  padding:   'clamp(1.25rem, 3vw, 2.25rem)',
                  position:  'relative',
                }}
              >
                <span className="ascii-corner ascii-corner--tl">┌</span>
                <span className="ascii-corner ascii-corner--tr">┐</span>
                <span className="ascii-corner ascii-corner--bl">└</span>
                <span className="ascii-corner ascii-corner--br">┘</span>

                <div
                  style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.5rem',
                    fontWeight:    700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color:         'var(--chrome-mid)',
                    marginBottom:  '0.6rem',
                  }}
                >
                  ACCESS WINDOW
                </div>

                <div
                  style={{
                    fontFamily:    'var(--font-display)',
                    fontSize:      'clamp(3.5rem, 7vw, 6rem)',
                    lineHeight:    0.9,
                    letterSpacing: '-0.025em',
                    color:         'var(--chalk)',
                  }}
                >
                  24<span style={{ color: 'var(--signal)' }}>/</span>7
                </div>

                <div
                  style={{
                    height:     '1px',
                    background: 'var(--chrome-dark)',
                    margin:     '0.875rem 0 0.6rem',
                  }}
                />

                <div
                  style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.5rem',
                    fontWeight:    700,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color:         'var(--chrome-mid)',
                  }}
                >
                  365 DAYS / YEAR
                </div>
              </div>
            </div>
          </div>

          {/* ── LAYER 3: FG — fast (yPercent +10 → -22) ─────────────
           *  Contains: 4 floating spec chips positioned at corners.
           *  Inset -28% to handle 32% total travel without clipping.
           *  Inner wrapper re-anchors absolute positions to parent coords.
           */}
          <div
            ref={fgRef}
            style={{
              position:   'absolute',
              inset:      '-28% 0',
              zIndex:     4,
              willChange: 'transform',
            }}
          >
            {/* Re-anchor: offset 28% of own height downward to restore
              * visual origin to match the container's coordinate space */}
            <div
              style={{
                position: 'absolute',
                inset:    '28% 0',
              }}
            >
              <SpecChip
                label="ACCESS FROM"
                value="$65 /MO"
                style={{
                  top:  'clamp(4.5rem, 12vh, 7rem)',
                  left: 'clamp(1rem, 4vw, 2.5rem)',
                }}
              />
              <SpecChip
                label="SESSION WINDOW"
                value="1 HR SLOT"
                style={{
                  top:   'clamp(4.5rem, 12vh, 7rem)',
                  right: 'clamp(1rem, 4vw, 2.5rem)',
                }}
              />
              <SpecChip
                label="ISOLATION MODEL"
                value="PRIVATE"
                style={{
                  bottom: 'clamp(4.5rem, 12vh, 7rem)',
                  left:   'clamp(1rem, 4vw, 2.5rem)',
                }}
              />
              <SpecChip
                label="NODE LOCATION"
                value="WINDSOR ON"
                style={{
                  bottom: 'clamp(4.5rem, 12vh, 7rem)',
                  right:  'clamp(1rem, 4vw, 2.5rem)',
                }}
              />
            </div>
          </div>
        </div>

        {/* ╔═══════════════════════════════╗
            ║  RIGHT — tactical data strip  ║  20%
            ╚═══════════════════════════════╝ */}
        <DataStrip />

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-20">
        <ScrollIndicator />
      </div>
    </section>
  );
}
