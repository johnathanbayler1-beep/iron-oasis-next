import { notFound }      from 'next/navigation';
import type { Metadata } from 'next';
import { TelemetryMatrix }   from '../../../components/TelemetryMatrix';
import { RealEstateMatrix }  from '../../../components/RealEstateMatrix';
import {
  getPostBySlug,
  getAllSlugs,
  type ComponentMarker,
  type Segment,
} from '../../../lib/blog';

/* ── Component map ────────────────────────────────────────────────── */
const COMPONENT_MAP: Record<ComponentMarker, React.ComponentType> = {
  TELEMETRY_MATRIX:   TelemetryMatrix,
  REAL_ESTATE_MATRIX: RealEstateMatrix,
};

function renderSegment(seg: Segment, i: number) {
  if (seg.type === 'html') {
    return (
      <div
        key={i}
        className="blog-prose"
        dangerouslySetInnerHTML={{ __html: seg.content }}
      />
    );
  }
  const Component = COMPONENT_MAP[seg.name];
  return Component ? <Component key={i} /> : null;
}

/* ── Static params ────────────────────────────────────────────────── */
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/* ── Metadata ─────────────────────────────────────────────────────── */
export async function generateMetadata(
  { params }: { params: { slug: string } },
): Promise<Metadata> {
  try {
    const { frontmatter } = getPostBySlug(params.slug);
    return {
      title:       `${frontmatter.title} — Iron Oasis`,
      description: `${frontmatter.author} · ${frontmatter.date}`,
    };
  } catch {
    return {};
  }
}

/* ── Page ─────────────────────────────────────────────────────────── */
export default function BlogPost({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  const { frontmatter, segments } = post;

  return (
    <article
      className="section"
      style={{ backgroundColor: 'var(--ink)', position: 'relative', overflow: 'hidden' }}
    >
      <div className="grid-overlay" aria-hidden="true" />

      <div
        className="container"
        style={{
          maxWidth:   '800px',
          paddingTop: 'clamp(3rem, 6vw, 5rem)',
        }}
      >

        {/* ── Header ────────────────────────────────────────────── */}
        <header style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>

          <div
            style={{
              display:      'flex',
              alignItems:   'center',
              gap:          '1.25rem',
              marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
            }}
          >
            <span
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.5625rem',
                fontWeight:    700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color:         'var(--signal)',
              }}
            >
              FIELD NOTES
            </span>
            <div style={{ flex: 1, height: '1px', background: 'var(--chrome-dark)' }} />
            <span
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.5rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color:         'var(--chrome-mid)',
                whiteSpace:    'nowrap',
              }}
            >
              {frontmatter.date}
            </span>
          </div>

          <h1
            style={{
              fontFamily:    'var(--font-display)',
              fontSize:      'clamp(2.5rem, 6vw, 5rem)',
              lineHeight:    0.92,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color:         'var(--chalk)',
              marginBottom:  'clamp(0.875rem, 2vw, 1.25rem)',
            }}
          >
            {frontmatter.title}
          </h1>

          <p
            style={{
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.5625rem',
              fontWeight:    700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color:         'var(--chrome-mid)',
              marginBottom:  'clamp(1.5rem, 3vw, 2.5rem)',
            }}
          >
            {frontmatter.author}
          </p>

          <div style={{ width: '3rem', height: '1px', background: 'var(--chrome)' }} />
        </header>

        {/* ── Segments ──────────────────────────────────────────── */}
        {segments.map(renderSegment)}

      </div>
    </article>
  );
}
