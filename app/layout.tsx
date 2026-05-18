import type { Metadata } from 'next';
import { Bebas_Neue, Space_Mono } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/SmoothScroll';
import { SplashIntro } from '@/components/SplashIntro';
import { Nav } from '@/components/Nav';

/* ── Google Fonts — Next.js font optimization ──────────────────── */
const bebasNeue = Bebas_Neue({
  weight:   '400',
  subsets:  ['latin'],
  variable: '--font-bebas',
  display:  'swap',
});

const spaceMono = Space_Mono({
  weight:   ['400', '700'],
  subsets:  ['latin'],
  variable: '--font-space-mono',
  display:  'swap',
});

/* ── Metadata ───────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title:       "Iron Oasis Gym — Windsor's Private Micro-Gym",
  description: "Windsor's only private 24/7 gym. Exclusive hourly booking — no one else can enter your slot. East Windsor, Ontario. No contracts.",
  metadataBase: new URL('https://ironoasisgym.com'),
  openGraph: {
    title:       "Iron Oasis Gym — Windsor's Private Micro-Gym",
    description: "Private 24/7 gym. Exclusive 1-hr slots. Oasis Light $65 · Mid $89 · Unlimited $109.",
    url:         'https://ironoasisgym.com',
    siteName:    'Iron Oasis Gym',
    locale:      'en_CA',
    type:        'website',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Iron Oasis Gym',
    description: "Windsor's only private 24/7 gym. No crowds. Ever.",
  },
  robots: {
    index:  true,
    follow: true,
  },
};

/* ── Root Layout ────────────────────────────────────────────────── */
/*
 * Render order:
 *  1. SplashIntro  — fixed z:9999 overlay, dispatches 'splash:complete'
 *  2. Nav          — sticky z:100, slides down after splash completes
 *  3. SmoothScroll — Lenis provider wrapping all page content
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${spaceMono.variable}`}
    >
      <body
        className="antialiased overflow-x-hidden"
        style={{
          backgroundColor: 'var(--soot)',
          color:           'var(--chalk)',
          fontFamily:      'var(--font-mono)',
        }}
      >
        <SplashIntro />
        <Nav />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
