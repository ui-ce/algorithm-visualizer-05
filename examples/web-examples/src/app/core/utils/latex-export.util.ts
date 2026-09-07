import type { Animation, RendererMetadata } from '@algorithm-visualizer/typescript-angular-renderer';
import { RendererEngine } from '@algorithm-visualizer/typescript-latex-renderer';

// Mirrors styles/tokens/_colors.scss (--color-viz-*) exactly. LaTeX/TikZ
// has no concept of CSS custom properties, so every var(--color-viz-x)
// string coming out of Practice's CHART_METADATA_ENTRY / GRAPH_METADATA_ENTRY
// / ARRAY_2D_METADATA_ENTRY gets swapped for a \definecolor'd name before
// being handed to the LaTeX RendererEngine. Keep this in sync by hand if
// the token file changes — there's no build step that shares them.
const VIZ_COLOR_HEX: Record<'dark' | 'light', Record<string, string>> = {
  dark: {
    default: '2C2E33',
    comparing: 'FF9142',
    swapping: 'DA1E28',
    sorted: '28BE2A',
    active: '3B82F6',
    explored: '8A63D2',
    updated: 'FFC857',
  },
  light: {
    default: '9CA3AF',
    comparing: 'FFA768',
    swapping: 'E14B53',
    sorted: '5BF15D',
    active: '629BF8',
    explored: '7C4FDB',
    updated: 'E0A400',
  },
};

// var(--color-viz-comparing) -> vizComparing
const CSS_VAR_PATTERN = /^var\(--color-viz-([a-z]+)\)$/;

function toLatexColorName(value: unknown): unknown {
  if (typeof value !== 'string') return value;
  const match = CSS_VAR_PATTERN.exec(value);
  if (!match) return value;
  const [, token] = match;
  return `viz${token.charAt(0).toUpperCase()}${token.slice(1)}`;
}

// Deep-clones objectMetaData, replacing every recognized
// var(--color-viz-x) color string with its LaTeX color name. Anything
// that isn't one of those color fields (barWidth, showLabel, compact,
// alignName, ...) passes through untouched.
function toLatexObjectMetaData(
  objectMetaData: RendererMetadata['objectMetaData'],
): RendererMetadata['objectMetaData'] {
  return objectMetaData.map(entry => {
    const metadata = { ...(entry.metadata as Record<string, unknown>) };

    (['defaultColor', 'defaultNodeColor', 'defaultEdgeColor'] as const).forEach(key => {
      if (key in metadata) {
        metadata[key] = toLatexColorName(metadata[key]);
      }
    });

    (['highlightTags', 'nodeHighlightTags', 'edgeHighlightTags'] as const).forEach(key => {
      const tags = metadata[key];
      if (Array.isArray(tags)) {
        metadata[key] = tags.map((t: { tag: string; color: unknown }) => ({
          ...t,
          color: toLatexColorName(t.color),
        }));
      }
    });

    return { ...entry, metadata };
  }) as RendererMetadata['objectMetaData'];
}

/**
 * Builds a .tex document for whatever is currently loaded in the
 * Practice page — the exact same `Animation` object the on-screen
 * visualization is already playing, not a fresh regeneration with new
 * data. Pass Practice's own `this.animation` / `this.rendererMetadata`
 * straight in: whatever array/graph is on screen right now (random,
 * pattern, or custom input) is what ends up in the file.
 *
 * `themeMode` picks which color set (dark/light) the highlight tags
 * resolve to, so the export matches whichever mode the page is
 * currently in.
 */
export function buildLatexDocument(
  animation: Animation,
  rendererMetadata: RendererMetadata,
  themeMode: 'dark' | 'light',
): string {
  const latexMetadata: RendererMetadata = {
    ...rendererMetadata,
    objectMetaData: toLatexObjectMetaData(rendererMetadata.objectMetaData),
  };

  // RendererEngine (from typescript-latex-renderer) declares its own
  // Animation/RendererMetadata types — structurally identical to the
  // angular-renderer's own, since both trace back to the same framer
  // package, but nominally distinct. Cast at this one call boundary
  // rather than threading a second parallel type through Practice.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = new RendererEngine().render(animation as any, latexMetadata as any);

  const palette = VIZ_COLOR_HEX[themeMode];
  const colorDefinitions = Object.entries(palette)
    .map(([token, hex]) => {
      const name = `viz${token.charAt(0).toUpperCase()}${token.slice(1)}`;
      return `\\definecolor{${name}}{HTML}{${hex}}`;
    })
    .join('\n');

  // RendererEngine hardcodes its own preamble (\documentclass, tikz,
  // geometry, \begin{document}, ...) inside the string it returns.
  // Insert xcolor + our \definecolor lines right after \usepackage{tikz}
  // rather than modifying the shared renderer module for this.
  return raw.replace(
    '\\usepackage{tikz}',
    `\\usepackage{tikz}\n\\usepackage{xcolor}\n${colorDefinitions}`,
  );
}

/** Triggers a browser download of `content` as a file named `filename`. */
export function downloadTextFile(filename: string, content: string, mimeType = 'text/plain'): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
