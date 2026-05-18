import fs   from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const POSTS_DIR = path.join(process.cwd(), 'content/blog');

/* ── Types ────────────────────────────────────────────────────────── */
export interface PostFrontmatter {
  title:  string;
  date:   string;
  author: string;
}

/*
 * Known inline component markers.
 * Add new names here as the dossier pipeline grows.
 */
export type ComponentMarker =
  | 'TELEMETRY_MATRIX'
  | 'REAL_ESTATE_MATRIX';

export type Segment =
  | { type: 'html';      content: string         }
  | { type: 'component'; name: ComponentMarker   };

export interface Post {
  slug:        string;
  frontmatter: PostFrontmatter;
  segments:    Segment[];
}

export interface PostStub {
  slug:        string;
  frontmatter: PostFrontmatter;
}

/* ── Helpers ──────────────────────────────────────────────────────── */

/* Regex that matches any registered marker: [TELEMETRY_MATRIX], etc. */
const MARKER_RE = /\[(TELEMETRY_MATRIX|REAL_ESTATE_MATRIX)\]/g;

function stripMetaBlock(content: string): string {
  return content.replace(/```json[\s\S]*?```/g, '').trim();
}

/*
 * Walk the body string, splitting on every marker occurrence.
 * Returns an ordered array of html and component segments.
 */
function extractSegments(body: string): Segment[] {
  const segments: Segment[] = [];
  const re = new RegExp(MARKER_RE.source, 'g'); /* fresh instance per call */
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(body)) !== null) {
    const before = body.slice(lastIndex, match.index).trim();
    if (before) {
      segments.push({ type: 'html', content: marked.parse(before) as string });
    }
    segments.push({ type: 'component', name: match[1] as ComponentMarker });
    lastIndex = match.index + match[0].length;
  }

  const tail = body.slice(lastIndex).trim();
  if (tail) {
    segments.push({ type: 'html', content: marked.parse(tail) as string });
  }

  return segments;
}

/* ── Public API ───────────────────────────────────────────────────── */
export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f)    => f.replace(/\.md$/, ''));
}

export function getAllPostStubs(): PostStub[] {
  return getAllSlugs().map((slug) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), 'utf-8');
    const { data } = matter(raw);
    return {
      slug,
      frontmatter: {
        title:  data.title  ?? '',
        date:   data.date   ?? '',
        author: data.author ?? '',
      },
    };
  });
}

export function getPostBySlug(slug: string): Post {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found: ${slug}`);
  }

  const raw              = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const body             = stripMetaBlock(content);

  return {
    slug,
    frontmatter: {
      title:  data.title  ?? '',
      date:   data.date   ?? '',
      author: data.author ?? '',
    },
    segments: extractSegments(body),
  };
}
