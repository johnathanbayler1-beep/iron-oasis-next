'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ──────────────────────────────────────────────────────── */

interface Tier {
  code:         string;
  tag:          string;
  name:         string;
  price:        string;
  access:       string;
  window:       string;
  windowDetail: string;
  features:     string[];
  cta:          string;
  ctaVariant:   'ghost' | 'signal';
  featured?:    boolean;
}

const TIERS: Tier[] = [
  {
    code:         'OA-001',
    tag:          'ENTRY PROTOCOL',
    name:         'Oasis Light',
    price:        '65',
    access:       '3× / WEEK',
    window:       'NON-PEAK',
    windowDetail: '< 03:00 PM  ·  > 08:00 PM',
    features: [
      'Exclusive 1-hour booking slot',
      'Full equipment access during session',
      'Zero crowd guarantee',
      'Member portal access',
      'Free on-site parking',
    ],
    cta:       'REQUEST APP ACCESS',
    ctaVariant: 'ghost',
  },
  {
    code:         'OA-002',
    tag:          'STANDARD PROTOCOL',
    name:         'Oasis Mid',
    price:        '89',
    access:       '4× / WEEK',
    window:       'FULL ACCESS',
    windowDetail: 'Peak + non-peak hours',
    features: [
      'Exclusive 1-hour booking slot',
      'Full equipment access during session',
      'Peak + non-peak entry',
      'Zero crowd guarantee',
      'Member portal access',
      'Free on-site parking',
    ],
    cta:       'REQUEST APP ACCESS',
    ctaVariant: 'ghost',
  },
  {
    code:         'OA-003',
    tag:          'PRIORITY PROTOCOL',
    name:         'Oasis Unlimited',
    price:        '109',
    access:       'UNLIMITED',
    window:       'PRIORITY QUEUE',
    windowDetail: '48-hour advance booking window',
    features: [
      'Unlimited weekly sessions',
      'Priority booking 48 hrs ahead',
      'Full peak + non-peak entry',
      'Exclusive 1-hour booking slot',
      'Full equipment access during session',
      'Zero crowd guarantee',
      'Member portal access',
      'Free on-site parking',
    ],
    cta:       'REQUEST APP ACCESS',
    ctaVariant: 'signal',
    featured:   true,
  },
];

/* ─── Shared label style ─────────────────────────────────────────── */
const label: React.CSSProperties = {
  fontFamily:    'var(--font-mono)',
  fontSize:      '0.5625rem',
  fontWeight:    700,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color:         'var(--muted)',
};

const labelSignal: React.CSSProperties = { ...label, color: 'var(--signal)' };

/* ─── Standard Card (Light / Mid) ───────────────────────────────── */
function PricingCard({ tier, onBookingOpen }: { tier: Tier; onBookingOpen?: () => void }) {
  return (
    <div
      className="pricing-card bezel"
      style={{
        height:   '100%',
        display:  'flex',
        flexDirection: 'column',
      }}
    >
      <div
        className="bezel__inner"
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        {/* Header row */}
        <div
          style={{
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'flex-start',
            marginBottom:   '1.25rem',
          }}
        >
          <span style={labelSignal}>{tier.code}</span>
          <span style={label}>{tier.tag}</span>
        </div>

        {/* Tier name */}
        <div style={{ ...label, color: 'var(--muted)', marginBottom: '0.4rem' }}>
          {tier.name}
        </div>

        {/* Price */}
        <div
          style={{
            display:    'flex',
            alignItems: 'flex-end',
            gap:        '0.2rem',
            marginBottom: '1.5rem',
          }}
        >
          <span
            style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(2.75rem, 5vw, 4rem)',
              lineHeight:    1,
              letterSpacing: '-0.02em',
              color:         'var(--chalk)',
            }}
          >
            ${tier.price}
          </span>
          <span
            style={{
              ...label,
              paddingBottom: '0.45rem',
            }}
          >
            /MO
          </span>
        </div>

        {/* Access spec row */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: '1fr 1fr',
            gap:                 '0.5rem 0.75rem',
            padding:             '0.875rem 0',
            borderTop:           '1px solid var(--wire)',
            borderBottom:        '1px solid var(--wire)',
            marginBottom:        '1.25rem',
          }}
        >
          <div>
            <div style={{ ...label, marginBottom: '0.2rem' }}>ACCESS</div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize:   '1.125rem',
                lineHeight: 1,
                color:      'var(--chalk)',
              }}
            >
              {tier.access}
            </div>
          </div>
          <div>
            <div style={{ ...label, marginBottom: '0.2rem' }}>WINDOW</div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize:   '1.125rem',
                lineHeight: 1,
                color:      'var(--chalk)',
              }}
            >
              {tier.window}
            </div>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <span
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.5625rem',
                color:         'var(--muted)',
                letterSpacing: '0.04em',
              }}
            >
              {tier.windowDetail}
            </span>
          </div>
        </div>

        {/* Feature list */}
        <ul
          style={{
            listStyle:     'none',
            display:       'flex',
            flexDirection: 'column',
            gap:           '0.45rem',
            marginBottom:  '1.5rem',
            flex:          1,
          }}
        >
          {tier.features.map((f, i) => (
            <li
              key={i}
              style={{
                display:    'flex',
                gap:        '0.5rem',
                fontFamily: 'var(--font-mono)',
                fontSize:   '0.6875rem',
                lineHeight: 1.45,
                color:      'rgba(245,245,245,0.4)',
              }}
            >
              <span style={{ color: 'var(--wire)', flexShrink: 0, marginTop: '0.05em' }}>─</span>
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={onBookingOpen}
          className="btn btn--ghost"
          style={{ width: '100%', justifyContent: 'space-between' }}
        >
          {tier.cta}
          <span className="btn__trail">→</span>
        </button>
      </div>
    </div>
  );
}

/* ─── Featured Card (Oasis Unlimited) ───────────────────────────── */
/*
 * Double-bezel: outer shell has bezel--signal (1px #E61919 border + 2px padding),
 * inner core has bezel__inner (inset border + dark-red tinted background).
 * This is the only card with the signal treatment.
 */
function FeaturedCard({ tier, onBookingOpen }: { tier: Tier; onBookingOpen?: () => void }) {

  return (
    <div
      className="pricing-card bezel bezel--signal"
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <div
        className="bezel__inner"
        style={{
          height:         '100%',
          display:        'flex',
          flexDirection:  'column',
          position:       'relative',
          padding:        'clamp(1.5rem, 3vw, 2.5rem)',
        }}
      >
        {/* Scanline overlay — subtle depth texture */}
        <div
          aria-hidden="true"
          style={{
            position:          'absolute',
            inset:             0,
            backgroundImage:   'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(230,25,25,0.03) 3px, rgba(230,25,25,0.03) 4px)',
            pointerEvents:     'none',
            zIndex:            0,
          }}
        />

        {/* ASCII frame corners */}
        <span
          className="ascii-corner ascii-corner--tl"
          style={{ color: 'var(--signal)', zIndex: 1 }}
        >
          ┌
        </span>
        <span
          className="ascii-corner ascii-corner--tr"
          style={{ color: 'var(--signal)', zIndex: 1 }}
        >
          ┐
        </span>
        <span
          className="ascii-corner ascii-corner--bl"
          style={{ color: 'var(--signal)', zIndex: 1 }}
        >
          └
        </span>
        <span
          className="ascii-corner ascii-corner--br"
          style={{ color: 'var(--signal)', zIndex: 1 }}
        >
          ┘
        </span>

        {/* Inner content — elevated above scanline overlay */}
        <div
          style={{
            position:      'relative',
            zIndex:        1,
            display:       'flex',
            flexDirection: 'column',
            height:        '100%',
          }}
        >
          {/* RECOMMENDED badge */}
          <div
            style={{
              display:     'inline-flex',
              alignSelf:   'flex-start',
              border:      '1px solid var(--signal)',
              padding:     '0.3rem 0.75rem',
              marginBottom: '1.75rem',
            }}
          >
            <span style={{ ...labelSignal }}>
              ● RECOMMENDED
            </span>
          </div>

          {/* Header row */}
          <div
            style={{
              display:        'flex',
              justifyContent: 'space-between',
              alignItems:     'flex-start',
              marginBottom:   '1.25rem',
            }}
          >
            <span style={labelSignal}>{tier.code}</span>
            <span style={label}>{tier.tag}</span>
          </div>

          {/* Tier name */}
          <div style={{ ...label, color: 'var(--muted)', marginBottom: '0.4rem' }}>
            {tier.name}
          </div>

          {/* Price — larger than standard cards */}
          <div
            style={{
              display:    'flex',
              alignItems: 'flex-end',
              gap:        '0.25rem',
              marginBottom: '0.5rem',
            }}
          >
            <span
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'clamp(4rem, 7vw, 6.5rem)',
                lineHeight:    1,
                letterSpacing: '-0.025em',
                color:         'var(--chalk)',
              }}
            >
              ${tier.price}
            </span>
            <span
              style={{
                ...label,
                paddingBottom: '0.7rem',
              }}
            >
              /MO
            </span>
          </div>

          {/* Price subline */}
          <div
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.5625rem',
              color:         'rgba(230,25,25,0.7)',
              letterSpacing: '0.08em',
              marginBottom:  '1.75rem',
            }}
          >
            No contracts · No initiation fee
          </div>

          {/* Signal rule */}
          <div
            style={{
              height:       '1px',
              background:   'linear-gradient(to right, var(--signal), transparent)',
              marginBottom: '1.5rem',
            }}
          />

          {/* Access spec row — larger, more prominent */}
          <div
            style={{
              display:             'grid',
              gridTemplateColumns: '1fr 1fr',
              gap:                 '1rem',
              marginBottom:        '1.75rem',
            }}
          >
            {[
              { key: 'ACCESS',  val: tier.access },
              { key: 'WINDOW',  val: tier.window },
            ].map(({ key, val }) => (
              <div
                key={key}
                style={{
                  border:  '1px solid rgba(230,25,25,0.18)',
                  padding: '0.75rem 1rem',
                }}
              >
                <div style={{ ...label, marginBottom: '0.3rem' }}>{key}</div>
                <div
                  style={{
                    fontFamily:    'var(--font-display)',
                    fontSize:      'clamp(1.25rem, 2.5vw, 1.75rem)',
                    lineHeight:    1,
                    color:         'var(--chalk)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {val}
                </div>
              </div>
            ))}

            {/* Window detail spans both columns */}
            <div
              style={{
                gridColumn:  '1 / -1',
                fontFamily:  'var(--font-mono)',
                fontSize:    '0.5625rem',
                color:       'rgba(230,25,25,0.6)',
                letterSpacing: '0.06em',
              }}
            >
              ► {tier.windowDetail}
            </div>
          </div>

          {/* Feature list — all features, signal markers */}
          <ul
            style={{
              listStyle:     'none',
              display:       'flex',
              flexDirection: 'column',
              gap:           '0.55rem',
              marginBottom:  '2rem',
              flex:          1,
            }}
          >
            {tier.features.map((f, i) => (
              <li
                key={i}
                style={{
                  display:    'flex',
                  gap:        '0.625rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize:   '0.75rem',
                  lineHeight: 1.45,
                  color:      'rgba(245,245,245,0.55)',
                }}
              >
                <span
                  style={{
                    color:     'var(--signal)',
                    flexShrink: 0,
                    marginTop: '0.05em',
                    opacity:   0.8,
                  }}
                >
                  ─
                </span>
                {f}
              </li>
            ))}
          </ul>

          {/* CTA — magnetic signal variant, full width */}
          <MagneticButton
            onClick={onBookingOpen}
            className="w-full !border-[var(--chalk)] !bg-[var(--chalk)] !text-[var(--soot)] hover:!bg-[var(--soot)] hover:!text-[var(--chalk)]"
          >
            SECURE EARLY ACCESS
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────── */
export function Pricing({ onBookingOpen }: { onBookingOpen?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* Section label + rule wipe in */
      gsap.from('.pricing-meta', {
        opacity:   0,
        x:         -20,
        duration:  0.6,
        ease:      'power3.out',
        scrollTrigger: {
          trigger: section,
          start:   'top 85%',
        },
      });

      /* Headline lines clip in */
      gsap.from('.pricing-hl-line', {
        clipPath:  'inset(0 100% 0 0)',
        duration:  0.9,
        stagger:   0.12,
        ease:      'power3.inOut',
        scrollTrigger: {
          trigger: '.pricing-header',
          start:   'top 82%',
        },
      });

      /* Terms block fade */
      gsap.from('.pricing-terms', {
        opacity:  0,
        y:        12,
        duration: 0.6,
        ease:     'power2.out',
        scrollTrigger: {
          trigger: '.pricing-header',
          start:   'top 75%',
        },
      });

      /* Card stagger reveal */
      gsap.from('.pricing-card', {
        opacity:  0,
        y:        40,
        duration: 0.8,
        stagger:  0.12,
        ease:     'power3.out',
        scrollTrigger: {
          trigger: '.pricing-grid',
          start:   'top 80%',
        },
      });

      /* Featured card: slide in from right */
      gsap.from('.pricing-featured', {
        x:        60,
        opacity:  0,
        duration: 0.9,
        ease:     'power3.out',
        scrollTrigger: {
          trigger: '.pricing-grid',
          start:   'top 78%',
        },
      });

      /* Footer note */
      gsap.from('.pricing-footer', {
        opacity:  0,
        duration: 0.5,
        ease:     'power2.out',
        scrollTrigger: {
          trigger: '.pricing-footer',
          start:   'top 92%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section"
      style={{ backgroundColor: 'var(--soot)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Structural grid texture */}
      <div className="grid-overlay" />

      <div className="container">

        {/* ── Section header ──────────────────────────────────── */}
        <header className="pricing-header" style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>

          {/* Meta row — section number + rule */}
          <div
            className="pricing-meta"
            style={{
              display:    'flex',
              alignItems: 'center',
              gap:        '1.25rem',
              marginBottom: 'clamp(2rem, 4vw, 3rem)',
            }}
          >
            <span style={labelSignal}>[ 002 ]</span>
            <span style={label}>MEMBERSHIP PROTOCOLS</span>
            <div
              style={{
                flex:       1,
                height:     '1px',
                background: 'var(--wire)',
              }}
            />
          </div>

          {/* Asymmetric headline + terms split */}
          <div
            style={{
              display:             'grid',
              gridTemplateColumns: '7fr 5fr',
              gap:                 'clamp(2rem, 5vw, 4rem)',
              alignItems:          'end',
            }}
          >
            {/* Left: headline */}
            <div>
              <h2>
                <div
                  className="pricing-hl-line"
                  style={{
                    fontFamily:    'var(--font-display)',
                    fontSize:      'clamp(3.5rem, 7vw, 6rem)',
                    lineHeight:    0.9,
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    color:         'var(--chalk)',
                    clipPath:      'inset(0 100% 0 0)',
                  }}
                >
                  SELECT YOUR
                </div>
                <div
                  className="pricing-hl-line"
                  style={{
                    fontFamily:    'var(--font-display)',
                    fontSize:      'clamp(3.5rem, 7vw, 6rem)',
                    lineHeight:    0.9,
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    color:         'var(--chalk)',
                    clipPath:      'inset(0 100% 0 0)',
                  }}
                >
                  ACCESS TIER<span style={{ color: 'var(--signal)' }}>.</span>
                </div>
              </h2>
            </div>

            {/* Right: terms block */}
            <div className="pricing-terms" style={{ opacity: 0 }}>
              <div
                style={{
                  borderLeft:  '1px solid var(--signal)',
                  paddingLeft: '1.25rem',
                }}
              >
                {[
                  'No contracts',
                  'No initiation fees',
                  'Cancel anytime',
                  'Email to exit',
                ].map((line) => (
                  <div
                    key={line}
                    style={{
                      fontFamily:    'var(--font-mono)',
                      fontSize:      '0.75rem',
                      lineHeight:    1.9,
                      color:         'var(--muted)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {line}
                  </div>
                ))}
                <div
                  style={{
                    marginTop:     '0.75rem',
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.5625rem',
                    color:         'rgba(245,245,245,0.25)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Book via ironoasisgym.com/account-info
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ── Pricing grid ────────────────────────────────────── */}
        {/*
          Asymmetric 5fr / 7fr split.
          Left (5fr): Light + Mid stacked vertically in a flex-col container.
          Right (7fr): Unlimited featured card spanning full height of both.
          align-items: stretch ensures right column fills the full height of left.
        */}
        <div
          className="pricing-grid"
          style={{
            display:             'grid',
            gridTemplateColumns: '5fr 7fr',
            gap:                 '1px',
            alignItems:          'stretch',
            backgroundColor:     'var(--wire)', /* gap "color" — grid gap bleeds wire border */
          }}
        >
          {/* LEFT: Light + Mid stacked */}
          <div
            style={{
              display:        'flex',
              flexDirection:  'column',
              gap:            '1px',
              backgroundColor: 'var(--wire)',
            }}
          >
            <PricingCard tier={TIERS[0]} onBookingOpen={onBookingOpen} />
            <PricingCard tier={TIERS[1]} onBookingOpen={onBookingOpen} />
          </div>

          {/* RIGHT: Unlimited featured */}
          <div className="pricing-featured" style={{ display: 'flex' }}>
            <FeaturedCard tier={TIERS[2]} onBookingOpen={onBookingOpen} />
          </div>
        </div>

        {/* ── Footer note ─────────────────────────────────────── */}
        <div
          className="pricing-footer"
          style={{
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'center',
            flexWrap:       'wrap',
            gap:            '0.75rem',
            marginTop:      'clamp(1.5rem, 3vw, 2.5rem)',
            paddingTop:     '1rem',
            borderTop:      '1px solid var(--wire)',
            opacity:        0,
          }}
        >
          <span
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.5625rem',
              color:         'rgba(245,245,245,0.3)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            All memberships include full equipment access · East Windsor, Ontario
          </span>
          <a
            href="tel:6476140264"
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.5625rem',
              color:         'var(--muted)',
              letterSpacing: '0.08em',
              textDecoration: 'none',
            }}
          >
            Questions? 647-614-0264
          </a>
        </div>

      </div>
    </section>
  );
}
