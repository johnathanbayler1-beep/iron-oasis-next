'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '@/components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

/* ─── Shared type helpers ───────────────────────────────────────── */
const mono = (size = '0.5625rem', color = 'var(--chrome-mid)'): React.CSSProperties => ({
  fontFamily:    'var(--font-mono)',
  fontSize:      size,
  fontWeight:    700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase' as const,
  color,
});

/* ─── Stat box ──────────────────────────────────────────────────── */
/*
 * Three vertical stats on the right of the editorial block.
 * Chrome border hierarchy — no signal red in this section.
 */
function StatBox({
  value,
  unit,
  label,
  sublabel,
}: {
  value: string;
  unit?: string;
  label: string;
  sublabel: string;
}) {
  return (
    <div
      className="about-stat"
      style={{
        border:   '1px solid var(--chrome-dark)',
        padding:  'clamp(1rem, 2.5vw, 1.5rem)',
        display:  'flex',
        flexDirection: 'column',
        gap:      '0.35rem',
        flex:     1,
      }}
    >
      {/* Value */}
      <div
        style={{
          display:    'flex',
          alignItems: 'flex-end',
          gap:        '0.2rem',
          lineHeight: 1,
        }}
      >
        <span
          style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(2.5rem, 5vw, 4rem)',
            letterSpacing: '-0.02em',
            color:         'var(--chalk)',
          }}
        >
          {value}
        </span>
        {unit && (
          <span
            style={{
              ...mono('0.625rem', 'var(--chrome)'),
              paddingBottom: '0.35rem',
            }}
          >
            {unit}
          </span>
        )}
      </div>

      {/* Chrome rule */}
      <div
        style={{
          height:     '1px',
          width:      '2rem',
          background: 'var(--chrome)',
        }}
      />

      {/* Labels */}
      <div style={mono('0.5625rem', 'var(--chalk)')}>{label}</div>
      <div style={mono('0.5rem', 'var(--chrome-mid)')}>{sublabel}</div>
    </div>
  );
}

/* ─── Equipment card (large bento cell) ─────────────────────────── */
function EquipmentCard() {
  const EQUIPMENT = [
    { name: 'POWER RACK',         spec: 'Full squat rack setup'          },
    { name: 'OLYMPIC BARBELLS',   spec: 'Multiple barbells available'     },
    { name: 'DUMBBELLS',          spec: 'Full free weight range'          },
    { name: 'CARDIO EQUIPMENT',   spec: 'Cardio machines'                 },
  ];

  return (
    <div
      className="about-bento-card"
      style={{
        border:         '1px solid var(--chrome-dark)',
        padding:        'clamp(1.5rem, 3vw, 2.25rem)',
        backgroundColor: 'var(--steel)',
        display:        'flex',
        flexDirection:  'column',
        height:         '100%',
      }}
    >
      {/* Card label */}
      <div
        style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          marginBottom:   '1.5rem',
        }}
      >
        <span style={mono('0.5rem', 'var(--chrome)')}>WHAT'S INSIDE</span>
        <span style={mono('0.5rem', 'var(--chrome-mid)')}>[ A ]</span>
      </div>

      {/* Equipment list */}
      <ul
        style={{
          listStyle:     'none',
          display:       'flex',
          flexDirection: 'column',
          flex:          1,
          justifyContent: 'space-between',
        }}
      >
        {EQUIPMENT.map(({ name, spec }, i) => (
          <li
            key={name}
            style={{
              display:      'flex',
              flexDirection: 'column',
              gap:           '0.2rem',
              padding:       '0.875rem 0',
              borderBottom:  i < EQUIPMENT.length - 1
                ? '1px solid var(--chrome-dark)'
                : 'none',
            }}
          >
            <span
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'clamp(1.25rem, 2.5vw, 1.75rem)',
                lineHeight:    1,
                color:         'var(--chalk)',
                letterSpacing: '0.02em',
              }}
            >
              {name}
            </span>
            <span style={mono('0.5rem', 'var(--chrome-mid)')}>{spec}</span>
          </li>
        ))}
      </ul>

      {/* Footer note */}
      <div
        style={{
          marginTop:   '1.25rem',
          paddingTop:  '1rem',
          borderTop:   '1px solid var(--chrome-dark)',
          ...mono('0.5rem', 'rgba(245,245,245,0.25)'),
        }}
      >
        All equipment available to whoever holds the booking · Nothing is
        reserved within a session
      </div>
    </div>
  );
}

/* ─── Booking steps card (mid bento cell) ───────────────────────── */
function BookingCard() {
  const STEPS = [
    { n: '01', label: 'CHOOSE YOUR TIER',   desc: 'Light · Mid · Unlimited'       },
    { n: '02', label: 'BOOK YOUR SLOT',     desc: 'ironoasisgym.com/account-info' },
    { n: '03', label: 'ENTER ALONE',        desc: 'Nobody else can book your hour' },
    { n: '04', label: 'TRAIN WITHOUT LIMITS', desc: 'Full equipment at your disposal' },
  ];

  return (
    <div
      className="about-bento-card"
      style={{
        border:          '1px solid var(--chrome-dark)',
        padding:         'clamp(1.5rem, 3vw, 2.25rem)',
        backgroundColor: 'var(--ink)',
        display:         'flex',
        flexDirection:   'column',
        height:          '100%',
      }}
    >
      <div
        style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          marginBottom:   '1.5rem',
        }}
      >
        <span style={mono('0.5rem', 'var(--chrome)')}>HOW IT WORKS</span>
        <span style={mono('0.5rem', 'var(--chrome-mid)')}>[ B ]</span>
      </div>

      <ol
        style={{
          listStyle:     'none',
          display:       'flex',
          flexDirection: 'column',
          flex:          1,
          justifyContent: 'space-between',
        }}
      >
        {STEPS.map(({ n, label, desc }, i) => (
          <li
            key={n}
            style={{
              display:      'flex',
              gap:          '0.875rem',
              padding:      '0.75rem 0',
              borderBottom: i < STEPS.length - 1
                ? '1px solid var(--chrome-dark)'
                : 'none',
              alignItems:   'flex-start',
            }}
          >
            {/* Step number */}
            <span
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      '1.5rem',
                lineHeight:    1,
                color:         'var(--chrome-dark)',
                flexShrink:    0,
                paddingTop:    '0.1em',
              }}
            >
              {n}
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <span style={mono('0.5625rem', 'var(--chalk)')}>{label}</span>
              <span style={{ ...mono('0.5rem', 'var(--chrome-mid)'), fontWeight: 400, letterSpacing: '0.06em', textTransform: 'none' }}>
                {desc}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ─── Location card (right bento cell) ─────────────────────────── */
function LocationCard() {
  return (
    <div
      className="about-bento-card"
      style={{
        border:          '1px solid var(--chrome-dark)',
        padding:         'clamp(1.5rem, 3vw, 2.25rem)',
        backgroundColor: 'var(--soot)',
        display:         'flex',
        flexDirection:   'column',
        justifyContent:  'space-between',
        height:          '100%',
        gap:             '1.5rem',
      }}
    >
      <div
        style={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
        }}
      >
        <span style={mono('0.5rem', 'var(--chrome)')}>FIND US</span>
        <span style={mono('0.5rem', 'var(--chrome-mid)')}>[ C ]</span>
      </div>

      {/* Location block */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1 }}>
        <div>
          <div style={{ ...mono('0.5rem', 'var(--chrome-mid)'), marginBottom: '0.4rem' }}>
            LOCATION
          </div>
          <div
            style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(1.25rem, 2.5vw, 1.625rem)',
              lineHeight:    1.1,
              color:         'var(--chalk)',
              letterSpacing: '0.02em',
            }}
          >
            EAST WINDSOR
          </div>
          <div
            style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(1.25rem, 2.5vw, 1.625rem)',
              lineHeight:    1.1,
              color:         'var(--chalk)',
              letterSpacing: '0.02em',
            }}
          >
            ONTARIO
          </div>
          <div style={{ ...mono('0.5rem', 'var(--chrome-mid)'), marginTop: '0.4rem' }}>
            Free on-site parking · Address on signup
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'var(--chrome-dark)' }} />

        {/* Contact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { label: 'PHONE',     href: 'tel:6476140264',                   val: '647-614-0264'                },
            { label: 'EMAIL',     href: 'mailto:support@ironoasisgym.com',  val: 'support@ironoasisgym.com'    },
            { label: 'INSTAGRAM', href: 'https://instagram.com/ironoasisgym', val: '@ironoasisgym'             },
          ].map(({ label, href, val }) => (
            <div key={label}>
              <div style={mono('0.5rem', 'var(--chrome-mid)')}>{label}</div>
              <a
                href={href}
                style={{
                  ...mono('0.5625rem', 'var(--chalk)'),
                  textDecoration: 'none',
                  transition:     'color 0.2s var(--ease-tac)',
                  display:        'block',
                  marginTop:      '0.2rem',
                  fontWeight:     400,
                  letterSpacing:  '0.06em',
                  textTransform:  'none',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--chrome)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--chalk)';  }}
              >
                {val}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Book CTA */}
      <MagneticButton
        onClick={() => window.open('https://ironoasisgym.com/book', '_blank')}
        className="w-full"
      >
        Secure Location Access
      </MagneticButton>
    </div>
  );
}

/* ─── Network Expansion Card ─────────────────────────────────────── */
function NetworkExpansionCard() {
  const SPECS = [
    { label: 'TARGET FOOTPRINT', value: '300 – 500 SQ FT' },
    { label: 'SPACE TYPE',       value: 'FLEX · RETAIL · INDUSTRIAL' },
    { label: 'INFRASTRUCTURE',   value: 'HIGH-YIELD / LOW-FOOTPRINT' },
    { label: 'OPERATOR MODEL',   value: 'FULLY AUTOMATED' },
  ];

  return (
    <div
      style={{
        border:          '1px solid var(--chrome-dark)',
        backgroundColor: 'var(--steel)',
        padding:         'clamp(1.5rem, 3vw, 2.5rem)',
        position:        'relative',
        overflow:        'hidden',
      }}
    >
      {/* Structural grid texture */}
      <div className="grid-overlay" />

      {/* ASCII corner marks */}
      <span className="ascii-corner ascii-corner--tl" style={{ color: 'var(--chrome-dark)', zIndex: 1 }}>┌──</span>
      <span className="ascii-corner ascii-corner--tr" style={{ color: 'var(--chrome-dark)', zIndex: 1 }}>──┐</span>
      <span className="ascii-corner ascii-corner--bl" style={{ color: 'var(--chrome-dark)', zIndex: 1 }}>└──</span>
      <span className="ascii-corner ascii-corner--br" style={{ color: 'var(--chrome-dark)', zIndex: 1 }}>──┘</span>

      {/* Inner layout */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}>

        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ ...mono('0.5rem', 'var(--signal)'), marginBottom: '0.5rem' }}>
              [SYS_NODE // NETWORK_EXPANSION]
            </div>
            <div
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'clamp(1.75rem, 3.5vw, 3rem)',
                lineHeight:    0.92,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color:         'var(--chalk)',
              }}
            >
              SCALING THE<br />NETWORK.
            </div>
          </div>
          <div
            style={{
              border:    '1px solid var(--chrome-dark)',
              padding:   '0.625rem 1rem',
              alignSelf: 'flex-start',
            }}
          >
            <span style={{ ...mono('0.4375rem', 'var(--chrome-mid)') }}>STATUS: ACTIVELY ACQUIRING</span>
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: '5fr 4fr',
            gap:                 'clamp(2rem, 4vw, 4rem)',
            alignItems:          'start',
          }}
          className="network-expansion-grid"
        >
          {/* Copy block */}
          <div>
            <p
              style={{
                fontFamily:   'var(--font-mono)',
                fontSize:     '0.8125rem',
                lineHeight:   1.85,
                color:        'var(--chrome-mid)',
                maxWidth:     '58ch',
                marginBottom: '1.5rem',
              }}
            >
              We are aggressively scaling our micro-pod network. Seeking strategic
              partnerships, regional operators, and commercial real estate brokers
              holding 300–500 sq. ft. of flex, retail, or industrial space.
              Deploying high-yield, low-footprint automated infrastructure with
              zero ongoing staffing requirement.
            </p>

            <div
              style={{
                paddingLeft: '1rem',
                borderLeft:  '1px solid var(--chrome-dark)',
                marginBottom: '2rem',
              }}
            >
              <p
                style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.6875rem',
                  lineHeight:    1.75,
                  color:         'rgba(245,245,245,0.35)',
                }}
              >
                Preferred profile: underutilised ground-floor space with independent
                HVAC access, dedicated electrical service, and street-level or
                secure-parking adjacency. Revenue-share and fixed-lease structures
                both considered.
              </p>
            </div>

            <MagneticButton
              onClick={() => window.open('mailto:support@ironoasisgym.com?subject=Partner%20Site%20Dossier', '_blank')}
            >
              INITIATE PARTNER COMMS
            </MagneticButton>
          </div>

          {/* Spec grid */}
          <div
            style={{
              display:         'flex',
              flexDirection:   'column',
              gap:             '1px',
              backgroundColor: 'var(--chrome-dark)',
            }}
          >
            {SPECS.map(({ label, value }) => (
              <div
                key={label}
                style={{
                  backgroundColor: 'var(--ink)',
                  padding:         '0.875rem 1rem',
                  display:         'flex',
                  flexDirection:   'column',
                  gap:             '0.3rem',
                }}
              >
                <div style={mono('0.4375rem', 'var(--chrome-mid)')}>{label}</div>
                <div
                  style={{
                    fontFamily:    'var(--font-display)',
                    fontSize:      'clamp(0.875rem, 1.5vw, 1.125rem)',
                    lineHeight:    1,
                    letterSpacing: '0.02em',
                    color:         'var(--chalk)',
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────── */
export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const base = { trigger: section, toggleActions: 'play none none none' };

      /* Section meta label */
      gsap.from('.about-meta', {
        opacity: 0, x: -16, duration: 0.55, ease: 'power3.out',
        scrollTrigger: { ...base, start: 'top 88%' },
      });

      /* Editorial headline lines — clip wipe */
      gsap.from('.about-hl', {
        clipPath:  'inset(0 100% 0 0)',
        duration:  0.9,
        stagger:   0.1,
        ease:      'power3.inOut',
        scrollTrigger: { ...base, start: 'top 83%' },
      });

      /* Body copy */
      gsap.from('.about-body', {
        opacity: 0, y: 14, duration: 0.65, ease: 'power2.out',
        scrollTrigger: { ...base, start: 'top 80%' },
      });

      /* Stat boxes — stagger up */
      gsap.from('.about-stat', {
        opacity: 0, y: 30, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { ...base, start: 'top 78%' },
      });

      /* Bento cards — stagger reveal */
      gsap.from('.about-bento-card', {
        opacity: 0, y: 40, duration: 0.75, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-bento', start: 'top 82%', toggleActions: 'play none none none' },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section"
      style={{ backgroundColor: 'var(--ink)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Structural grid texture */}
      <div className="grid-overlay" />

      <div className="container">

        {/* ── Section header ────────────────────────────────────── */}
        <div
          className="about-meta"
          style={{
            display:      'flex',
            alignItems:   'center',
            gap:          '1.25rem',
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
            opacity:      0,
          }}
        >
          <span style={mono('0.5625rem', 'var(--chrome)')}>[ 003 ]</span>
          <span style={mono('0.5625rem', 'var(--chrome-mid)')}>INFRASTRUCTURE</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--chrome-dark)' }} />
        </div>

        {/* ── Primary editorial block: 7fr / 5fr ────────────────── */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: '7fr 5fr',
            gap:                 'clamp(3rem, 6vw, 6rem)',
            alignItems:          'start',
            marginBottom:        'clamp(3rem, 6vw, 5rem)',
          }}
          className="about-primary"
        >
          {/* LEFT: headline + body */}
          <div>
            <h2 style={{ marginBottom: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}>
              {['ONE MEMBER.', 'ONE HOUR.', 'EVERY TIME.'].map((line) => (
                <div
                  key={line}
                  className="about-hl"
                  style={{
                    fontFamily:    'var(--font-display)',
                    fontSize:      'clamp(3.25rem, 7vw, 6.5rem)',
                    lineHeight:    0.9,
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    color:         'var(--chalk)',
                    clipPath:      'inset(0 100% 0 0)',
                  }}
                >
                  {line}
                </div>
              ))}
            </h2>

            {/* Chrome rule */}
            <div
              style={{
                width:        '3.5rem',
                height:       '1px',
                background:   'var(--chrome)',
                marginBottom: 'clamp(1.25rem, 2.5vw, 2rem)',
              }}
            />

            <p
              className="about-body"
              style={{
                fontFamily:  'var(--font-mono)',
                fontSize:    '0.875rem',
                lineHeight:  1.8,
                color:       'var(--chrome-mid)',
                maxWidth:    '54ch',
                opacity:     0,
              }}
            >
              Iron Oasis is a private micro-pod environment. When you book a
              one-hour slot, the entire space locks exclusively to you —
              system-enforced, automated, non-negotiable. No shared surfaces.
              No ambient interference. No human friction of any kind.
            </p>

            {/* Secondary detail block */}
            <div
              className="about-body"
              style={{
                marginTop:    'clamp(1.5rem, 3vw, 2.5rem)',
                paddingLeft:  '1rem',
                borderLeft:   '1px solid var(--chrome-dark)',
                opacity:      0,
              }}
            >
              <p
                style={{
                  fontFamily:  'var(--font-mono)',
                  fontSize:    '0.75rem',
                  lineHeight:  1.75,
                  color:       'rgba(245,245,245,0.35)',
                  maxWidth:    '50ch',
                }}
              >
                Exact address withheld until after signup. Site tours available —
                call to arrange. Zero contracts. Zero initiation fees. Cancel
                by email, immediate effect.
              </p>
            </div>
          </div>

          {/* RIGHT: 3 stat boxes stacked vertically */}
          <div
            style={{
              display:       'flex',
              flexDirection: 'column',
              gap:           '1px',
              backgroundColor: 'var(--chrome-dark)', /* gap "color" */
            }}
          >
            <StatBox
              value="24"
              unit="/7"
              label="ALWAYS OPEN"
              sublabel="365 days · No exceptions"
            />
            <StatBox
              value="1"
              label="OCCUPANT PER SLOT"
              sublabel="System-enforced · Guaranteed"
            />
            <StatBox
              value="0"
              label="CONTRACTS REQUIRED"
              sublabel="Cancel anytime · Email to exit"
            />
          </div>
        </div>

        {/* Chrome structural divider */}
        <div
          style={{
            height:       '1px',
            background:   'linear-gradient(to right, var(--chrome-dark), transparent)',
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
          }}
        />

        {/* ── Bento grid: 3fr 2fr 2fr ────────────────────────────── */}
        {/*
         * NOT three equal columns. Large left card (equipment) + two
         * narrower right cards (booking steps, location). Roughly 43/28/28.
         */}
        <div
          className="about-bento"
          style={{
            display:             'grid',
            gridTemplateColumns: '3fr 2fr 2fr',
            gap:                 '1px',
            backgroundColor:     'var(--chrome-dark)', /* seam color */
            alignItems:          'stretch',
          }}
        >
          <EquipmentCard />
          <BookingCard />
          <LocationCard />
        </div>

        {/* ── Network expansion divider ───────────────────────────── */}
        <div
          style={{
            height:       '1px',
            background:   'linear-gradient(to right, var(--chrome-dark), transparent)',
            margin:       'clamp(2.5rem, 5vw, 4rem) 0 clamp(2rem, 4vw, 3rem)',
          }}
        />

        {/* ── [SYS_NODE // NETWORK_EXPANSION] ─────────────────────── */}
        <NetworkExpansionCard />

      </div>
    </section>
  );
}
