'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';

interface BookingModalProps {
  isOpen:  boolean;
  onClose: () => void;
}

const inputStyle: React.CSSProperties = {
  width:           '100%',
  backgroundColor: 'var(--soot)',
  border:          '1px solid var(--chrome-dark)',
  padding:         '0.75rem 1rem',
  fontFamily:      'var(--font-mono)',
  fontSize:        '0.75rem',
  letterSpacing:   '0.06em',
  color:           'var(--chalk)',
  outline:         'none',
  transition:      'border-color 0.2s',
  borderRadius:    0,
};

const labelStyle: React.CSSProperties = {
  fontFamily:    'var(--font-mono)',
  fontSize:      '0.5rem',
  fontWeight:    700,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color:         'var(--chrome-mid)',
  display:       'block',
  marginBottom:  '0.4rem',
};

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);
  const tlRef      = useRef<gsap.core.Timeline | null>(null);

  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [phone,   setPhone]   = useState('');
  const [status,  setStatus]  = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errMsg,  setErrMsg]  = useState('');

  /* ── Build entrance / exit timeline ──────────────────────────────── */
  useEffect(() => {
    const overlay = overlayRef.current;
    const panel   = panelRef.current;
    if (!overlay || !panel) return;

    tlRef.current = gsap.timeline({ paused: true })
      .set(overlay, { display: 'flex' })
      .fromTo(overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'none' },
      )
      .fromTo(panel,
        { opacity: 0, y: 24, skewX: -1 },
        { opacity: 1, y: 0,  skewX: 0, duration: 0.4, ease: 'power3.out' },
        '-=0.15',
      );

    return () => { tlRef.current?.kill(); };
  }, []);

  /* ── Play / reverse on isOpen ─────────────────────────────────────── */
  useEffect(() => {
    const tl      = tlRef.current;
    const overlay = overlayRef.current;
    if (!tl) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      tl.play();
    } else {
      tl.reverse().then(() => {
        gsap.set(overlay, { display: 'none' });
        document.body.style.overflow = '';
      });
    }
  }, [isOpen]);

  /* ── ESC key ──────────────────────────────────────────────────────── */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  /* ── Click-outside ────────────────────────────────────────────────── */
  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  }, [onClose]);

  /* ── Form submit ──────────────────────────────────────────────────── */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrMsg('');

    try {
      const res = await fetch('/api/waitlist', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, email, phone }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? `HTTP ${res.status}`);
      }

      setStatus('success');
      setName('');
      setEmail('');
      setPhone('');
    } catch (err: unknown) {
      setErrMsg(err instanceof Error ? err.message : 'Transmission fault.');
      setStatus('error');
    }
  }

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Priority access waitlist"
      onClick={handleOverlayClick}
      style={{
        display:              'none',
        position:             'fixed',
        inset:                0,
        zIndex:               10000,
        backgroundColor:      'rgba(10, 10, 10, 0.88)',
        backdropFilter:       'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        alignItems:           'center',
        justifyContent:       'center',
        padding:              'clamp(1rem, 4vw, 2rem)',
      }}
    >
      <div
        ref={panelRef}
        style={{
          position:        'relative',
          width:           '100%',
          maxWidth:        '560px',
          backgroundColor: 'var(--ink)',
          border:          '1px solid var(--chrome-dark)',
          overflow:        'hidden',
        }}
      >
        <div className="grid-overlay" />

        <span className="ascii-corner ascii-corner--tl" style={{ color: 'var(--chrome-dark)', zIndex: 1 }}>┌──</span>
        <span className="ascii-corner ascii-corner--tr" style={{ color: 'var(--chrome-dark)', zIndex: 1 }}>──┐</span>
        <span className="ascii-corner ascii-corner--bl" style={{ color: 'var(--chrome-dark)', zIndex: 1 }}>└──</span>
        <span className="ascii-corner ascii-corner--br" style={{ color: 'var(--chrome-dark)', zIndex: 1 }}>──┘</span>

        <div style={{ position: 'relative', zIndex: 1 }}>

          {/* ── Header bar ──────────────────────────────────────── */}
          <div
            style={{
              display:         'flex',
              justifyContent:  'space-between',
              alignItems:      'center',
              padding:         '0.875rem 1.25rem',
              borderBottom:    '1px solid var(--chrome-dark)',
              backgroundColor: 'var(--soot)',
            }}
          >
            <span
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.5rem',
                fontWeight:    700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color:         'var(--signal)',
              }}
            >
              [ SYS_REQ // APP_DEPLOYMENT_PENDING ]
            </span>

            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                background:    'transparent',
                border:        '1px solid var(--chrome-dark)',
                color:         'var(--chrome-mid)',
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.5rem',
                letterSpacing: '0.14em',
                cursor:        'pointer',
                padding:       '0.3rem 0.625rem',
                transition:    'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--chrome)';
                e.currentTarget.style.color       = 'var(--chalk)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--chrome-dark)';
                e.currentTarget.style.color       = 'var(--chrome-mid)';
              }}
            >
              [ ESC ]
            </button>
          </div>

          {/* ── Body ────────────────────────────────────────────── */}
          <div style={{ padding: 'clamp(1.25rem, 3vw, 2rem)' }}>

            {/* Title block */}
            <div style={{ marginBottom: 'clamp(1.25rem, 3vw, 1.75rem)' }}>
              <h2
                style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      'clamp(1.5rem, 4vw, 2.25rem)',
                  lineHeight:    0.92,
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  color:         'var(--chalk)',
                  marginBottom:  '0.875rem',
                }}
              >
                Operator App Initialization
              </h2>

              <div style={{ width: '2.5rem', height: '1px', background: 'var(--chrome)', marginBottom: '0.875rem' }} />

              <p
                style={{
                  fontFamily:  'var(--font-mono)',
                  fontSize:    '0.6875rem',
                  lineHeight:  1.8,
                  color:       'var(--chrome-mid)',
                  maxWidth:    '52ch',
                }}
              >
                The Iron Oasis native mobile application handles all 24/7 automated
                facility access, slot scheduling, and secure Stripe billing. App
                deployment is scheduled for T-minus 7 days. Enter your comms routing
                below to receive a priority access key the moment the network goes live.
              </p>
            </div>

            {/* Success state */}
            {status === 'success' ? (
              <div
                style={{
                  border:      '1px solid var(--chrome-dark)',
                  padding:     '1.5rem',
                  textAlign:   'center',
                }}
              >
                <div
                  style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.5rem',
                    fontWeight:    700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color:         'var(--signal)',
                    marginBottom:  '0.75rem',
                  }}
                >
                  [ TRANSMISSION CONFIRMED ]
                </div>
                <p
                  style={{
                    fontFamily:  'var(--font-mono)',
                    fontSize:    '0.6875rem',
                    lineHeight:  1.8,
                    color:       'var(--chrome-mid)',
                  }}
                >
                  Identity logged. Priority access key will be transmitted to your comms
                  channel the moment the network goes live.
                </p>
              </div>
            ) : (

            /* Form */
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

              {/* Operator Identity */}
              <div>
                <label htmlFor="modal-name" style={labelStyle}>
                  Operator Identity
                </label>
                <input
                  id="modal-name"
                  type="text"
                  required
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--chrome)'; }}
                  onBlur={(e)  => { e.currentTarget.style.borderColor = 'var(--chrome-dark)'; }}
                />
              </div>

              {/* Secure Comms */}
              <div>
                <label htmlFor="modal-email" style={labelStyle}>
                  Secure Comms
                </label>
                <input
                  id="modal-email"
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--chrome)'; }}
                  onBlur={(e)  => { e.currentTarget.style.borderColor = 'var(--chrome-dark)'; }}
                />
              </div>

              {/* Mobile Node */}
              <div>
                <label htmlFor="modal-phone" style={labelStyle}>
                  Mobile Node{' '}
                  <span style={{ color: 'var(--chrome-dark)', fontWeight: 400 }}>(optional · SMS launch alert)</span>
                </label>
                <input
                  id="modal-phone"
                  type="tel"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--chrome)'; }}
                  onBlur={(e)  => { e.currentTarget.style.borderColor = 'var(--chrome-dark)'; }}
                />
              </div>

              {/* Error message */}
              {status === 'error' && (
                <div
                  style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.5625rem',
                    letterSpacing: '0.08em',
                    color:         'var(--signal)',
                    padding:       '0.5rem 0.75rem',
                    border:        '1px solid rgba(230,25,25,0.3)',
                  }}
                >
                  [ FAULT ] {errMsg}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn btn--primary"
                style={{ justifyContent: 'space-between', marginTop: '0.5rem', opacity: status === 'loading' ? 0.6 : 1 }}
              >
                {status === 'loading' ? 'TRANSMITTING…' : 'SECURE EARLY ACCESS KEY'}
                <span className="btn__trail">→</span>
              </button>

            </form>
            )}
          </div>

          {/* ── Footer ──────────────────────────────────────────── */}
          <div
            style={{
              padding:         '0.75rem 1.25rem',
              borderTop:       '1px solid var(--chrome-dark)',
              backgroundColor: 'var(--soot)',
              fontFamily:      'var(--font-mono)',
              fontSize:        '0.4375rem',
              letterSpacing:   '0.12em',
              textTransform:   'uppercase',
              color:           'var(--chrome-dark)',
            }}
          >
            Priority keys transmitted in order of registration · No spam · Unsubscribe anytime
          </div>

        </div>
      </div>
    </div>
  );
}
