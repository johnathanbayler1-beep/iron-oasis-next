"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import HeroSequence from "../components/HeroSequence";
import PricingModal from "../components/PricingModal";

const GymScene = dynamic(() => import("../components/GymScene"), { ssr: false });

export default function Home() {
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  return (
    <main style={{ position: "relative", width: "100%", backgroundColor: "#000", color: "#fff", minHeight: "300vh", overflowX: "hidden" }}>

      {/* ── Hero Section ─────────────────────────────────────── */}
      <section style={{ position: "relative", width: "100%", height: "100vh" }}>

        {/* 3D Canvas — z-0, pointer-events: none */}
        <GymScene />

        {/* UI Overlay — z-999, pure inline styles, zero Tailwind dependency */}
        <div style={{ position: "absolute", inset: 0, zIndex: 999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>

          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.5625rem", letterSpacing: "0.42em", textTransform: "uppercase", opacity: 0.4, marginBottom: "5rem" }}>
            Iron Oasis &middot; East Windsor, Ontario
          </p>

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 11vw, 9rem)", letterSpacing: "-0.02em", lineHeight: 0.88, textAlign: "center", textTransform: "uppercase" }}>
            Your Private Space
          </h1>

          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", letterSpacing: "0.22em", textTransform: "uppercase", opacity: 0.35, marginTop: "1.75rem" }}>
            24/7 Access &middot; Commercial Hardware &middot; Zero Crowds
          </p>

          {/* CTA Buttons */}
          <div style={{ pointerEvents: "auto", display: "flex", gap: "24px", marginTop: "48px" }}>
            <button
              className="hover-jump"
              onClick={() => setIsPricingOpen(true)}
              style={{ padding: "20px 40px", background: "#fff", color: "#000", fontSize: "18px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.18em", border: "2px solid #fff", cursor: "pointer", transition: "transform 0.3s, background 0.3s, color 0.3s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)"; (e.currentTarget as HTMLButtonElement).style.background = "#000"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; (e.currentTarget as HTMLButtonElement).style.background = "#fff"; (e.currentTarget as HTMLButtonElement).style.color = "#000"; }}
            >
              GET ACCESS
            </button>
            <button
              className="hover-jump"
              style={{ padding: "20px 40px", background: "transparent", color: "#fff", fontSize: "18px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.18em", border: "2px solid #fff", cursor: "pointer", transition: "transform 0.3s, background 0.3s, color 0.3s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)"; (e.currentTarget as HTMLButtonElement).style.background = "#fff"; (e.currentTarget as HTMLButtonElement).style.color = "#000"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
            >
              BECOME A PARTNER
            </button>
          </div>

          {/* Scroll prompt */}
          <div style={{ position: "absolute", bottom: "40px", textAlign: "center", fontFamily: "var(--font-mono)", animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }}>
            <p style={{ fontSize: "0.625rem", letterSpacing: "0.4em", textTransform: "uppercase", opacity: 0.4 }}>Scroll to Enter</p>
            <span style={{ fontSize: "1rem", display: "block", marginTop: "0.4rem", opacity: 0.4 }}>↓</span>
          </div>

        </div>
      </section>

      {/* ── Cinematic scroll sequence ─────────────────────────── */}
      <HeroSequence />

      {/* ── About ────────────────────────────────────────────── */}
      <section id="about" style={{ position: "relative", backgroundColor: "#000", borderTop: "1px solid #27272a", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--chrome-mid)" }}>
          About — coming soon
        </p>
      </section>

      {/* ── Pricing ──────────────────────────────────────────── */}
      <section id="pricing" style={{ position: "relative", backgroundColor: "#000", borderTop: "1px solid #27272a", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--chrome-mid)" }}>
          Pricing — coming soon
        </p>
      </section>

      <PricingModal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />
    </main>
  );
}
