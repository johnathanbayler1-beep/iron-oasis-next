'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

/* ─── Nav data ──────────────────────────────────────────────────── */
const LINKS = [
  { label: 'HOME',         href: '/',                              index: '01' },
  { label: 'ABOUT',        href: '/about',                         index: '02' },
  { label: 'PRICING',      href: '/pricing',                       index: '03' },
  { label: 'GALLERY',      href: '/gallery',                       index: '04' },
  { label: 'ARCHITECTURE', href: '/blog/architecture-of-isolation', index: '05' },
];

/* ─── Shared mono text style ────────────────────────────────────── */
const mono = (size = '0.5625rem', color = 'var(--chrome-mid)'): React.CSSProperties => ({
  fontFamily:    'var(--font-mono)',
  fontSize:      size,
  fontWeight:    700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase' as const,
  color,
});

/* ─── Nav ───────────────────────────────────────────────────────── */
export function Nav() {
  const navRef     = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ── Entrance: slide down after splash completes ─────────────── */
  useEffect(() => {
    gsap.set(navRef.current, { yPercent: -105 });

    function enter() {
      gsap.to(navRef.current, {
        yPercent: 0,
        duration: 0.65,
        ease:     'power3.out',
        delay:    0.05,
      });
    }

    const fallback = setTimeout(enter, 3600);
    window.addEventListener('splash:complete', enter, { once: true });

    return () => {
      window.removeEventListener('splash:complete', enter);
      clearTimeout(fallback);
    };
  }, []);

  /* ── Scroll-shadow: thicken bottom border when not at top ─────── */
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Menu open / close animation ────────────────────────────── */
  const toggleMenu = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (open) {
      document.body.style.overflow = 'hidden';
      gsap.set(overlay, { display: 'flex' });
      const tl = gsap.timeline();
      tl.fromTo(
        overlay,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.55, ease: 'power3.out' },
      )
        .fromTo(
          '.menu-link',
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
          '-=0.3',
        )
        .fromTo(
          '.menu-meta',
          { opacity: 0 },
          { opacity: 1, duration: 0.4, stagger: 0.06 },
          '-=0.2',
        );
    } else {
      document.body.style.overflow = '';
      gsap.to(overlay, {
        clipPath:   'inset(0 0 100% 0)',
        duration:   0.45,
        ease:       'power3.in',
        onComplete: () => gsap.set(overlay, { display: 'none' }),
      });
    }
  }, [open]);

  /* ── Close menu on ESC ───────────────────────────────────────── */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      {/* ── Sticky nav bar ──────────────────────────────────────── */}
      <nav
        ref={navRef}
        aria-label="Main navigation"
        style={{
          position:        'sticky',
          top:             0,
          zIndex:          100,
          height:          'var(--nav-h)',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'space-between',
          paddingInline:   'var(--container-pad)',
          backgroundColor: 'rgba(10,10,10,0.92)',
          backdropFilter:  'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: scrolled
            ? '1px solid var(--chrome-dark)'
            : '1px solid var(--wire)',
          transition: 'border-color 0.3s var(--ease-tac)',
        }}
      >
        {/* ─ Logo ─────────────────────────────────────────────── */}
        <a
          href="/"
          aria-label="Iron Oasis Gym — Home"
          style={{
            display:        'flex',
            alignItems:     'center',
            gap:            '0.75rem',
            textDecoration: 'none',
            flexShrink:     0,
          }}
        >
          {/* IO monogram */}
          <span
            style={{
              fontFamily:    'var(--font-display)',
              fontSize:      '1.625rem',
              lineHeight:    1,
              color:         'var(--chalk)',
              letterSpacing: '-0.02em',
            }}
          >
            IO
          </span>

          {/* Chrome separator */}
          <span
            aria-hidden="true"
            style={{
              width:      '1px',
              height:     '1rem',
              background: 'var(--chrome-dark)',
              flexShrink: 0,
            }}
          />

          {/* Wordmark */}
          <span
            style={{
              ...mono('0.5rem', 'var(--chrome-mid)'),
              lineHeight: 1.3,
              letterSpacing: '0.16em',
            }}
          >
            IRON<br />OASIS
          </span>
        </a>

        {/* ─ Desktop links ─────────────────────────────────────── */}
        <div
          aria-label="Site links"
          style={{
            display:    'flex',
            alignItems: 'center',
            gap:        'clamp(1.5rem, 3vw, 2.5rem)',
          }}
          className="nav-desktop-links"
        >
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="nav-link"
              style={mono('0.5625rem', 'var(--chrome-mid)')}
            >
              {label}
            </a>
          ))}
        </div>

        {/* ─ Right controls ────────────────────────────────────── */}
        <div
          style={{
            display:    'flex',
            alignItems: 'center',
            gap:        '1rem',
            flexShrink: 0,
          }}
        >
          {/* Book CTA — chrome, signal fill on hover via CSS class */}
          <a
            href="https://ironoasisgym.com/account-info"
            className="nav-book-btn"
            style={{
              ...mono('0.5625rem', 'var(--chrome)'),
              display:      'inline-flex',
              alignItems:   'center',
              gap:          '0.5rem',
              padding:      '0.5rem 1rem',
              border:       '1px solid var(--chrome-dark)',
              textDecoration: 'none',
              transition:   'border-color 0.2s var(--ease-tac), color 0.2s var(--ease-tac), background 0.2s var(--ease-tac)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = 'var(--chrome)';
              el.style.color       = 'var(--ink)';
              el.style.background  = 'var(--chrome)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = 'var(--chrome-dark)';
              el.style.color       = 'var(--chrome)';
              el.style.background  = 'transparent';
            }}
          >
            BOOK
            <span
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                justifyContent: 'center',
                width:          '1.125rem',
                height:         '1.125rem',
                border:         '1px solid currentColor',
                fontSize:       '0.625rem',
              }}
            >
              →
            </span>
          </a>

          {/* Hamburger — visible below 768px only via CSS */}
          <button
            onClick={toggleMenu}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="nav-hamburger"
            style={{
              display:         'none', /* shown via CSS media query */
              flexDirection:   'column',
              justifyContent:  'center',
              gap:             '5px',
              background:      'transparent',
              border:          'none',
              cursor:          'pointer',
              padding:         '0.25rem',
              width:           '2rem',
              height:          '2rem',
            }}
          >
            <span
              className="hamburger-line"
              style={{
                transform: open ? 'rotate(45deg) translate(4px, 4px)' : 'none',
              }}
            />
            <span
              className="hamburger-line"
              style={{
                opacity:  open ? 0 : 1,
                width:    open ? '0' : '22px',
              }}
            />
            <span
              className="hamburger-line"
              style={{
                transform: open ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* ── Full-screen menu overlay ─────────────────────────────── */}
      {/*
       * display:none until open. GSAP sets display:flex on open,
       * then clip-path animates inset(0 0 100% 0) → inset(0 0 0% 0)
       * (wipes down from top). Reverse on close.
       */}
      <div
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          display:         'none',
          position:        'fixed',
          inset:           0,
          zIndex:          99,
          backgroundColor: 'var(--ink)',
          flexDirection:   'column',
          justifyContent:  'space-between',
          paddingInline:   'var(--container-pad)',
          paddingTop:      'calc(var(--nav-h) + 2rem)',
          paddingBottom:   'clamp(2rem, 5vh, 3.5rem)',
          overflow:        'hidden',
        }}
      >
        {/* Structural grid texture */}
        <div className="grid-overlay" />

        {/* ASCII corners — chrome, not signal */}
        {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => (
          <span
            key={pos}
            className={`ascii-corner ascii-corner--${pos}`}
            style={{ color: 'var(--chrome-dark)', zIndex: 1 }}
          >
            {pos === 'tl' ? '┌──' : pos === 'tr' ? '──┐' : pos === 'bl' ? '└──' : '──┘'}
          </span>
        ))}

        {/* ─ Large nav links ───────────────────────────────────── */}
        <nav
          aria-label="Menu links"
          style={{
            position:      'relative',
            zIndex:        1,
            display:       'flex',
            flexDirection: 'column',
            gap:           'clamp(0.25rem, 1.5vh, 0.75rem)',
          }}
        >
          {LINKS.map(({ label, href, index }) => (
            <a
              key={label}
              href={href}
              className="menu-link"
              onClick={() => setOpen(false)}
              style={{ display: 'flex', alignItems: 'baseline', gap: '1.25rem' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--chrome)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--chalk)';  }}
            >
              {/* Index number */}
              <span
                style={{
                  ...mono('0.5625rem', 'var(--chrome-mid)'),
                  opacity:    0.6,
                  flexShrink: 0,
                  marginTop:  '0.5em',
                }}
              >
                [ {index} ]
              </span>

              {/* Link text */}
              <span
                style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      'clamp(3.5rem, 10vw, 7.5rem)',
                  lineHeight:    0.88,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.015em',
                }}
              >
                {label}
              </span>
            </a>
          ))}

          {/* BOOK — signal accent, only CTA using red in the nav */}
          <a
            href="https://ironoasisgym.com/account-info"
            className="menu-link"
            onClick={() => setOpen(false)}
            style={{ display: 'flex', alignItems: 'baseline', gap: '1.25rem' }}
          >
            <span
              style={{
                ...mono('0.5625rem', 'var(--signal)'),
                opacity:    0.8,
                flexShrink: 0,
                marginTop:  '0.5em',
              }}
            >
              [ 06 ]
            </span>
            <span
              style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'clamp(3.5rem, 10vw, 7.5rem)',
                lineHeight:    0.88,
                textTransform: 'uppercase',
                letterSpacing: '-0.015em',
                color:         'var(--signal)',
              }}
            >
              BOOK NOW
            </span>
          </a>
        </nav>

        {/* ─ Footer — contact + close hint ─────────────────────── */}
        <div
          style={{
            position:   'relative',
            zIndex:     1,
            display:    'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap:        '1rem',
            borderTop:  '1px solid var(--chrome-dark)',
            paddingTop: '1.25rem',
          }}
        >
          {/* Contact */}
          <div className="menu-meta">
            <div style={mono('0.5rem', 'var(--chrome-mid)')}>PHONE</div>
            <a
              href="tel:6476140264"
              style={{
                ...mono('0.6875rem', 'var(--chalk)'),
                textDecoration: 'none',
                marginTop: '0.3rem',
                display: 'block',
              }}
            >
              647-614-0264
            </a>
          </div>

          <div className="menu-meta">
            <div style={mono('0.5rem', 'var(--chrome-mid)')}>EMAIL</div>
            <a
              href="mailto:support@ironoasisgym.com"
              style={{
                ...mono('0.6875rem', 'var(--chalk)'),
                textDecoration: 'none',
                marginTop: '0.3rem',
                display: 'block',
              }}
            >
              support@ironoasisgym.com
            </a>
          </div>

          <div className="menu-meta">
            <div style={mono('0.5rem', 'var(--chrome-mid)')}>LOCATION</div>
            <div
              style={{
                ...mono('0.6875rem', 'var(--chalk)'),
                marginTop: '0.3rem',
              }}
            >
              East Windsor, ON
            </div>
          </div>
        </div>
      </div>

      {/* ── Responsive CSS injected as a style tag ──────────────── */}
      <style>{`
        @media (max-width: 767px) {
          .nav-desktop-links { display: none !important; }
          .nav-hamburger      { display: flex !important; }
          .nav-book-btn       { display: none !important; }
        }

        @media (min-width: 768px) {
          .nav-hamburger { display: none !important; }
        }
      `}</style>
    </>
  );
}
