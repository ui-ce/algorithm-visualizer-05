import { FramerEngine } from '@algorithm-visualizer/typescript-framer';
import { RendererEngine } from '@algorithm-visualizer/typescript-latex-renderer';
import { Recording } from '@algorithm-visualizer/typescript-recorder';
import { mkdirSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

// Mirrors web-examples/src/styles/tokens/_colors.scss (--color-viz-*),
// LIGHT theme values specifically — not dark. A PDF page is always a
// white/light background, so the dark-mode palette (tuned for a dark
// canvas) reads as too dark/low-contrast here regardless of which
// theme the browser happens to be in. LaTeX/TikZ has no concept of CSS
// custom properties, so these get \definecolor'd under plain names
// instead. Keep this in sync by hand if that token file changes —
// there's no build step that shares it with the Angular app.
const VIZ_COLOR_HEX = {
  default: '9CA3AF',
  comparing: 'FFA768',
  swapping: 'E14B53',
  sorted: '5BF15D',
  active: '629BF8',
  explored: '7C4FDB',
  updated: 'E0A400',
} as const;

function vizColor(token: keyof typeof VIZ_COLOR_HEX): string {
  return `viz${token.charAt(0).toUpperCase()}${token.slice(1)}`;
}

// Same three metadata entries practice.ts hands the Angular renderer
// (CHART_METADATA_ENTRY / GRAPH_METADATA_ENTRY / ARRAY_2D_METADATA_ENTRY),
// just with plain \definecolor names instead of var(--color-viz-x).
// Tag list and color choices intentionally mirror practice.ts exactly
// so this output matches the on-screen visualization — if a highlight
// color changes there, change it here too.
export const CHART_METADATA_ENTRY = {
  type: 'Chart' as const,
  metadata: {
    defaultColor: vizColor('default'),
    highlightTags: [
      { tag: 'active', color: vizColor('active') },
      { tag: 'compare', color: vizColor('comparing') },
      { tag: 'swap', color: vizColor('swapping') },
      { tag: 'sorted', color: vizColor('sorted') },
      { tag: 'section', color: vizColor('active') },
      { tag: 'sorting', color: vizColor('comparing') },
      { tag: 'middle', color: vizColor('comparing') },
      { tag: 'target', color: vizColor('sorted') },
      { tag: 'eliminated', color: vizColor('swapping') },
      { tag: 'changed', color: vizColor('updated') },
      { tag: 'pivot', color: vizColor('active') },
      { tag: 'min', color: vizColor('swapping') },
      { tag: 'shift', color: vizColor('swapping') },
    ],
  },
};

export const GRAPH_METADATA_ENTRY = {
  type: 'Graph' as const,
  metadata: {
    defaultNodeColor: vizColor('default'),
    defaultEdgeColor: vizColor('default'),
    nodeHighlightTags: [
      { tag: 'open', color: vizColor('active') },
      { tag: 'current', color: vizColor('comparing') },
      { tag: 'closed', color: vizColor('sorted') },
      { tag: 'visit', color: vizColor('explored') },
    ],
    edgeHighlightTags: [
      { tag: 'compare', color: vizColor('comparing') },
      { tag: 'path', color: vizColor('active') },
      { tag: 'final-path', color: vizColor('sorted') },
    ],
  },
};

// compact: true — matches practice.ts: this panel (DFS's call stack,
// Dijkstra's priority queue) sits underneath the main Graph, not as
// the main visualization.
export const ARRAY_2D_METADATA_ENTRY = {
  type: 'Array2D' as const,
  metadata: {
    compact: true,
    defaultColor: vizColor('default'),
    highlightTags: [
      { tag: 'sorting', color: vizColor('comparing') },
      { tag: 'remove', color: vizColor('swapping') },
      { tag: 'new', color: vizColor('active') },
      { tag: 'selected', color: vizColor('comparing') },
      { tag: 'updated', color: vizColor('updated') },
    ],
  },
};

export type ObjectMetaDataEntry =
  | typeof CHART_METADATA_ENTRY
  | typeof GRAPH_METADATA_ENTRY
  | typeof ARRAY_2D_METADATA_ENTRY;

/**
 * Frames `recording`, renders it to LaTeX using `objectMetaData` (pick
 * from CHART/GRAPH/ARRAY_2D_METADATA_ENTRY above — use the same combo
 * practice.ts's applyRecording call uses for this algorithm), writes
 * output/<name>/<name>.tex, and compiles it with pdflatex (must be
 * installed and on PATH) into the same folder.
 */
export function renderAndSave(
  recording: Recording,
  objectMetaData: ObjectMetaDataEntry[],
  name: string,
  documentName: string,
): void {
  const framer = new FramerEngine();
  const animation = framer.getAnimation(recording);

  const renderer = new RendererEngine();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = renderer.render(animation as any, { documentName, objectMetaData } as any);

  const colorDefinitions = Object.entries(VIZ_COLOR_HEX)
    .map(([token, hex]) => `\\definecolor{${vizColor(token as keyof typeof VIZ_COLOR_HEX)}}{HTML}{${hex}}`)
    .join('\n');

  // RendererEngine hardcodes its own preamble; insert xcolor + our
  // \definecolor lines right after \usepackage{tikz} rather than
  // touching the shared renderer module.
  const tex = raw.replace(
    '\\usepackage{tikz}',
    `\\usepackage{tikz}\n\\usepackage{xcolor}\n${colorDefinitions}`,
  );

  const dir = `output/${name}/`;
  mkdirSync(dir, { recursive: true });
  const texFile = `${dir}${name}.tex`;
  writeFileSync(texFile, tex);
  console.log(`LaTeX written to ${texFile}`);

  try {
    execSync(`pdflatex -interaction=nonstopmode -output-directory=${dir} ${texFile}`, { stdio: 'inherit' });
    console.log('PDF generated successfully.');
  } catch (err) {
    console.error('pdflatex failed (is it installed and on PATH?):', err);
  }
}
