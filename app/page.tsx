"use client";

import HeroSequence from "../components/HeroSequence";

export default function Home() {
  return (
    <main className="bg-black text-white antialiased">

      {/* 600vh cinematic scroll — RAF canvas + 3D text zones */}
      <HeroSequence />

      {/* About placeholder */}
      <section
        id="about"
        className="relative bg-black border-t border-zinc-800"
        style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--chrome-mid)" }}>
          About — coming soon
        </p>
      </section>

      {/* Pricing placeholder */}
      <section
        id="pricing"
        className="relative bg-black border-t border-zinc-800"
        style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--chrome-mid)" }}>
          Pricing — coming soon
        </p>
      </section>

    </main>
  );
}
