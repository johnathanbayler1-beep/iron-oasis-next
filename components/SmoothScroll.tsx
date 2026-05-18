'use client';

import Lenis from 'lenis';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,           // lower = heavier / more inertia
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    function onFrame(time: number) {
      lenis.raf(time * 1000);
    }

    function onScroll() {
      ScrollTrigger.update();
    }

    gsap.ticker.add(onFrame);
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', onScroll);

    return () => {
      gsap.ticker.remove(onFrame);
      lenis.off('scroll', onScroll);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
