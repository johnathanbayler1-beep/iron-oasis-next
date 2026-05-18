'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Hero() {
  const container = useRef(null);

  useGSAP(() => {
    // Only animate elements that exist within the 'container' ref
    gsap.to(".hero-status", { opacity: 1, duration: 1 });
    gsap.to(".hero-hl-1", { opacity: 1, duration: 1 });
    // Add all your other animations here
  }, { scope: container }); 

  return (
    <div ref={container}>
      {/* Ensure these class names match your GSAP targets exactly */}
      <div className="hero-status">...</div>
      <div className="hero-hl-1">...</div>
    </div>
  );
}
