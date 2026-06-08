"use client";

import { useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const TIERS = [
  {
    name: "Standard",
    price: 99,
    subtitle: "Non-peak access",
    features: [
      "24/7 App-Based Smart-Lock Entry",
      "Private On-Demand Space (300–500 sq ft)",
      "Non-peak hour scheduling",
      "Commercial-grade equipment",
      "Climate-controlled environment",
    ],
    featured: false,
  },
  {
    name: "Priority",
    price: 125,
    subtitle: "Standard access + priority booking",
    features: [
      "24/7 App-Based Smart-Lock Entry",
      "Private On-Demand Space (300–500 sq ft)",
      "Priority booking windows",
      "Same-day session access",
      "Commercial-grade equipment",
      "Climate-controlled environment",
    ],
    featured: false,
  },
  {
    name: "Oasis Unlimited",
    price: 149,
    subtitle: "The ultimate 24/7 access tier",
    features: [
      "24/7 App-Based Smart-Lock Entry",
      "Private On-Demand Space (300–500 sq ft)",
      "Unrestricted 24/7 scheduling",
      "Same-day session access",
      "Monthly guest pass",
      "Commercial-grade equipment",
      "Climate-controlled environment",
    ],
    featured: true,
  },
];

const ZERO_FRICTION = [
  "Month-To-Month Subscription",
  "Zero Contracts",
  "Zero Initiation Fees",
  "Zero Cancellation Fees",
  "Cancel Anytime",
];

export default function PricingModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        .pm-card {
          flex: 1;
          padding: 2rem;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 0;
          background: transparent;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .pm-card + .pm-card {
          border-left: none;
        }
        .pm-card.featured {
          border-color: rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.03);
        }
        .pm-cards {
          display: flex;
          flex-direction: row;
          width: 100%;
        }
        @media (max-width: 768px) {
          .pm-cards {
            flex-direction: column;
          }
          .pm-card + .pm-card {
            border-left: 1px solid rgba(255,255,255,0.15);
            border-top: none;
          }
          .pm-card.featured {
            border-color: rgba(255,255,255,0.5);
          }
        }
        .pm-cta {
          width: 100%;
          padding: 16px 24px;
          background: transparent;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: 0.6875rem;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          border: 1px solid rgba(255,255,255,0.4);
          border-radius: 0;
          cursor: pointer;
          box-shadow: 4px 4px 0 rgba(255,255,255,0.65);
          transition: transform 0.08s ease, box-shadow 0.08s ease, background 0.08s ease, color 0.08s ease;
        }
        .pm-cta:hover {
          transform: translate(3px, 3px);
          box-shadow: 1px 1px 0 rgba(255,255,255,0.65);
          background: #fff;
          color: #000;
        }
        .pm-cta:active {
          transform: translate(4px, 4px);
          box-shadow: 0 0 0 rgba(255,255,255,0.65);
        }
        .pm-close {
          background: none;
          border: none;
          color: rgba(255,255,255,0.45);
          font-family: var(--font-mono);
          font-size: 1rem;
          letter-spacing: 0.15em;
          cursor: pointer;
          padding: 8px 0 8px 20px;
          line-height: 1;
          transition: color 0.12s ease;
          flex-shrink: 0;
          align-self: flex-start;
        }
        .pm-close:hover {
          color: #fff;
        }
        .pm-zero-friction {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem 0;
          border-top: 1px solid rgba(255,255,255,0.2);
          padding-top: 1.5rem;
          margin-top: 2rem;
        }
        .pm-zf-item {
          font-family: var(--font-mono);
          font-size: 0.4375rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          white-space: nowrap;
        }
        .pm-zf-sep {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0;
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10000,
          backgroundColor: "rgba(0,0,0,0.92)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(16px, 4vw, 40px)",
          overflowY: "auto",
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div style={{ position: "relative", width: "100%", maxWidth: "72rem" }}>

          {/* Header row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "2rem",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.5rem",
                  letterSpacing: "0.42em",
                  textTransform: "uppercase",
                  color: "var(--chrome-mid)",
                  marginBottom: "0.5rem",
                }}
              >
                Iron Oasis &middot; Access Subscriptions
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.75rem, 4vw, 3rem)",
                  letterSpacing: "-0.02em",
                  textTransform: "uppercase",
                  color: "#fff",
                  lineHeight: 0.9,
                }}
              >
                Select Your Access
              </h2>
            </div>
            <button className="pm-close" onClick={onClose}>
              [ X ]
            </button>
          </div>

          {/* Cards */}
          <div className="pm-cards">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`pm-card${tier.featured ? " featured" : ""}`}
              >
                {/* Tier label */}
                <div>
                  {tier.featured && (
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.4375rem",
                        letterSpacing: "0.35em",
                        textTransform: "uppercase",
                        color: "var(--chrome-mid)",
                        marginBottom: "0.4rem",
                      }}
                    >
                      &#8212; Most Popular
                    </p>
                  )}
                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 800,
                      fontSize: "0.875rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#fff",
                      lineHeight: 1,
                    }}
                  >
                    {tier.name}
                  </h3>
                </div>

                {/* Price */}
                <div
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    paddingTop: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "3px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 800,
                        fontSize: "0.875rem",
                        color: "var(--chrome-mid)",
                        marginTop: "0.4rem",
                        lineHeight: 1,
                      }}
                    >
                      $
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 800,
                        fontSize: "3.25rem",
                        letterSpacing: "-0.04em",
                        color: "#fff",
                        lineHeight: 1,
                      }}
                    >
                      {tier.price}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.5rem",
                        color: "var(--chrome-mid)",
                        alignSelf: "flex-end",
                        marginBottom: "0.4rem",
                        letterSpacing: "0.15em",
                      }}
                    >
                      /MO
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.5rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--chrome-mid)",
                      marginTop: "0.375rem",
                    }}
                  >
                    {tier.subtitle}
                  </p>
                </div>

                {/* Feature list */}
                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    flex: 1,
                  }}
                >
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.5625rem",
                        letterSpacing: "0.06em",
                        color: "var(--chrome-mid)",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.5rem",
                        lineHeight: 1.55,
                      }}
                    >
                      <span
                        style={{
                          color: "rgba(255,255,255,0.35)",
                          flexShrink: 0,
                          marginTop: "0.1em",
                        }}
                      >
                        &#8212;
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button className="pm-cta">Select Tier</button>
              </div>
            ))}
          </div>

          {/* Zero Friction banner */}
          <div className="pm-zero-friction">
            {ZERO_FRICTION.map((item, i) => (
              <span key={item} style={{ display: "contents" }}>
                {i > 0 && <span className="pm-zf-sep">/</span>}
                <span className="pm-zf-item">{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
