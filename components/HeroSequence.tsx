"use client";

import { useEffect, useRef } from "react";

export default function HeroSequence() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef    = useRef<HTMLImageElement[]>([]);
  const rafRef       = useRef<number>(0);
  const progressRef  = useRef(0);
  const readyRef     = useRef(false);

  // DOM refs for imperative style updates — zero React re-renders on scroll
  const overlayRef = useRef<HTMLDivElement>(null);
  const promptRef  = useRef<HTMLDivElement>(null);
  const zone1Ref   = useRef<HTMLDivElement>(null);
  const zone2Ref   = useRef<HTMLDivElement>(null);
  const zone3Ref   = useRef<HTMLDivElement>(null);

  const frameCount = 201;

  function get3DStyles(start: number, peak: number, end: number, progress: number) {
    if (progress < start || progress > end) {
      return { opacity: 0, transform: "scale(0.5) translateY(100px)", transition: "" };
    }
    let opacity = 0, scale = 1, translateY = 0;
    if (progress <= peak) {
      const p    = peak === start ? 1 : (progress - start) / (peak - start);
      opacity    = p;
      scale      = 0.7 + p * 0.3;
      translateY = 50 * (1 - p);
    } else {
      const p    = (progress - peak) / (end - peak);
      opacity    = 1 - p;
      scale      = 1.0 + p * 0.5;
      translateY = -80 * p;
    }
    return {
      opacity,
      transform:  `scale(${scale.toFixed(4)}) translateY(${translateY.toFixed(2)}px)`,
      transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
    };
  }

  function applyZone(el: HTMLDivElement | null, styles: ReturnType<typeof get3DStyles>) {
    if (!el) return;
    el.style.opacity    = String(styles.opacity);
    el.style.transform  = styles.transform;
    el.style.transition = styles.transition;
  }

  function tick() {
    const canvas   = canvasRef.current;
    const ctx      = canvas?.getContext("2d");
    const progress = progressRef.current;

    if (canvas && ctx) {
      const idx = Math.min(frameCount - 1, Math.floor(progress * frameCount));
      const img = imagesRef.current[idx];
      if (img?.complete && img.naturalWidth) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    }

    // Zone 1: 0%–25% — visible at rest, zooms out on first scroll
    applyZone(zone1Ref.current, get3DStyles(0.0, 0.0, 0.25, progress));
    // Zone 2: 35%–65% — fades in and out mid-scroll
    applyZone(zone2Ref.current, get3DStyles(0.35, 0.5, 0.65, progress));
    // Zone 3: 75%–98% — fades in near the end
    applyZone(zone3Ref.current, get3DStyles(0.75, 0.88, 0.98, progress));

    if (promptRef.current) {
      promptRef.current.style.opacity = progress < 0.02 ? "1" : "0";
    }
  }

  // Preload all frames; activate once frame 1 is painted
  useEffect(() => {
    const loaded: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src   = `/assets/seq/ezgif-frame-${i.toString().padStart(3, "0")}.jpg`;

      if (i === 1) {
        const activate = () => {
          const canvas = canvasRef.current;
          const ctx    = canvas?.getContext("2d");
          if (canvas && ctx) ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          readyRef.current = true;
          if (canvas)             canvas.style.opacity             = "1";
          if (overlayRef.current) overlayRef.current.style.display = "flex";
          if (promptRef.current)  promptRef.current.style.display  = "block";
          tick();
        };
        img.onload = activate;
        if (img.complete) activate();
      }

      loaded.push(img);
    }

    imagesRef.current = loaded;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Passive scroll listener — RAF-throttled tick
  useEffect(() => {
    const onScroll = () => {
      const container = containerRef.current;
      if (!container || !readyRef.current) return;

      const rect          = container.getBoundingClientRect();
      const scrollTop     = -rect.top;
      const maxScrollTop  = rect.height - window.innerHeight;
      progressRef.current = Math.max(0, Math.min(1, scrollTop / maxScrollTop));

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className="relative bg-black" style={{ height: "600vh" }}>
      <div
        className="sticky top-0 w-full overflow-hidden bg-black"
        style={{ height: "100svh" }}
      >
        {/* Frame canvas — opacity-0 until frame 1 paints */}
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full z-0"
          style={{ opacity: 0, transition: "opacity 0.7s" }}
        />

        {/* Scroll prompt */}
        <div
          ref={promptRef}
          className="absolute bottom-12 z-20 w-full text-white text-center pointer-events-none"
          style={{
            display:    "none",
            transition: "opacity 0.3s",
            fontFamily: "var(--font-mono)",
            animation:  "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
          }}
        >
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", opacity: 0.6 }}>
            Scroll to Enter
          </p>
          <span style={{ fontSize: "1.25rem", display: "inline-block", marginTop: "0.5rem" }}>↓</span>
        </div>

        {/* 3D text overlay zones */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-4"
          style={{ display: "none" }}
        >
          {/* Zone 1 — Iron Oasis wordmark */}
          <div ref={zone1Ref} className="absolute text-center text-white" style={{ opacity: 0 }}>
            <h1
              className="uppercase leading-none"
              style={{
                fontFamily:    "var(--font-display)",
                fontSize:      "clamp(5rem, 14vw, 12rem)",
                letterSpacing: "-0.025em",
                lineHeight:    0.88,
              }}
            >
              Iron Oasis
            </h1>
            <p
              className="mt-5"
              style={{
                fontFamily:    "var(--font-mono)",
                fontSize:      "0.625rem",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                opacity:       0.6,
              }}
            >
              YOUR PRIVATE SPACE &middot; EAST WINDSOR
            </p>
          </div>

          {/* Zone 2 — Unrivaled Environment */}
          <div
            ref={zone2Ref}
            className="absolute text-center text-white"
            style={{ opacity: 0, maxWidth: "64rem" }}
          >
            <h2
              className="uppercase leading-none"
              style={{
                fontFamily:    "var(--font-display)",
                fontSize:      "clamp(4rem, 11vw, 10rem)",
                letterSpacing: "-0.02em",
                lineHeight:    0.88,
              }}
            >
              Unrivaled<br />Environment
            </h2>
            <p
              className="mt-6 mx-auto"
              style={{
                fontFamily:    "var(--font-mono)",
                fontSize:      "0.75rem",
                letterSpacing: "0.12em",
                lineHeight:    1.8,
                opacity:       0.6,
                maxWidth:      "36rem",
              }}
            >
              Premium commercial hardware. Absolute zero crowds.<br />
              Your workout ecosystem, automated 24/7.
            </p>
          </div>

          {/* Zone 3 — Oasis Unlimited */}
          <div ref={zone3Ref} className="absolute text-center text-white" style={{ opacity: 0 }}>
            <h2
              className="uppercase leading-none"
              style={{
                fontFamily:    "var(--font-display)",
                fontSize:      "clamp(4rem, 11vw, 10rem)",
                letterSpacing: "-0.02em",
                lineHeight:    0.88,
              }}
            >
              Oasis Unlimited
            </h2>
            <p
              className="mt-5"
              style={{
                fontFamily:    "var(--font-mono)",
                fontSize:      "0.5625rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                opacity:       0.5,
                color:         "var(--chrome-mid)",
              }}
            >
              Step inside the perimeter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
