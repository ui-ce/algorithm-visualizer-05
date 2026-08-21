// Builds an Animation + RendererMetadata pair for a single algorithm
// column on the Compare page. This intentionally mirrors the dispatch
// logic in features/practice/practice.ts (buildArraySortRecording /
// setBinarySearchData / setDijkstraData / ...) rather than importing
// from it, since none of that is exported from PracticePage — the
// metadata objects below are trimmed copies of the ones there, kept
// only for the tag colors this page's legend actually uses.
import { FramerEngine } from '@algorithm-visualizer/typescript-framer';
import type { Animation, RendererMetadata } from '@algorithm-visualizer/typescript-angular-renderer';
import type { Recording } from '@algorithm-visualizer/typescript-recorder';

import { bubbleSortVisualization } from '../../../algorithm/bubble-sort';
import { mergeSortVisualization } from '../../../algorithm/merge-sort';
import { quickSortVisualization } from '../../../algorithm/quick-sort';
import { selectionSortVisualization } from '../../../algorithm/selection-sort';
import { insertionSortVisualization } from '../../../algorithm/insertion-sort';
import { binarySearchVisualization } from '../../../algorithm/binary-search';
import { linearSearchVisualization } from '../../../algorithm/LinearSearch';
import { dijkstraVisualization } from '../../../algorithm/dijkstra';
import { dfsVisualization } from '../../../algorithm/dfs';
import { bfsVisualization } from '../../../algorithm/bfs';
import { aStarVisualization } from '../../../algorithm/a-start';

import {
  SAMPLE_DFS_GRAPH,
  SAMPLE_BFS_GRAPH,
  SAMPLE_DIJKSTRA_GRAPHS,
  SAMPLE_ASTAR_GRAPHS,
} from '../../practice/data/sample-graphs';

// 'sort' | 'search' | 'graph' — which of Practice's three legend sets
// (see practice.ts's own `legendItems` getter) this run's chart uses.
// The actual translated labels are resolved in CompareVisualization
// itself (see compare-visualization.ts), not here — this module has no
// access to LanguageService, and hardcoding English strings would
// leave the legend untranslated in Persian.
export type LegendKind = 'sort' | 'search' | 'graph';

export const SORT_ALGORITHM_IDS = new Set([
  'bubble-sort',
  'merge-sort',
  'quick-sort',
  'selection-sort',
  'insertion-sort',
]);

export const SEARCH_ALGORITHM_IDS = new Set(['binary-search', 'linear-search']);

export const GRAPH_ALGORITHM_IDS = new Set(['dijkstra', 'dfs', 'bfs', 'a-star']);

// Same constant Practice's own second visualization-area uses (see
// practice.html) for every graph algorithm uniformly — DFS/BFS don't
// actually have a 'Chart' frame to show, but filtering for a type that
// isn't present is harmless (it just renders nothing for that type),
// so one shared list works for all four instead of a per-algorithm one.
const GRAPH_AUX_INCLUDE_TYPES = ['Array2D', 'Chart'];

const CHART_METADATA_ENTRY = {
  type: 'Chart' as const,
  metadata: {
    defaultColor: 'var(--color-viz-default)',
    highlightTags: [
      { tag: 'active', color: 'var(--color-viz-active)' },
      { tag: 'compare', color: 'var(--color-viz-comparing)' },
      { tag: 'swap', color: 'var(--color-viz-swapping)' },
      { tag: 'sorted', color: 'var(--color-viz-sorted)' },
      { tag: 'section', color: 'var(--color-viz-active)' },
      { tag: 'sorting', color: 'var(--color-viz-comparing)' },
      { tag: 'middle', color: 'var(--color-viz-comparing)' },
      { tag: 'target', color: 'var(--color-viz-sorted)' },
      { tag: 'eliminated', color: 'var(--color-viz-swapping)' },
      { tag: 'changed', color: 'var(--color-viz-updated)' },
      { tag: 'pivot', color: 'var(--color-viz-active)' },
      { tag: 'min', color: 'var(--color-viz-swapping)' },
      { tag: 'shift', color: 'var(--color-viz-swapping)' },
    ],
  },
};

const GRAPH_METADATA_ENTRY = {
  type: 'Graph' as const,
  metadata: {
    defaultNodeColor: 'var(--color-viz-default)',
    defaultEdgeColor: 'var(--color-viz-default)',
    nodeHighlightTags: [
      { tag: 'open', color: 'var(--color-viz-active)' },
      { tag: 'current', color: 'var(--color-viz-comparing)' },
      { tag: 'closed', color: 'var(--color-viz-sorted)' },
      { tag: 'visit', color: 'var(--color-viz-explored)' },
    ],
    edgeHighlightTags: [
      { tag: 'compare', color: 'var(--color-viz-comparing)' },
      { tag: 'path', color: 'var(--color-viz-active)' },
      { tag: 'final-path', color: 'var(--color-viz-sorted)' },
    ],
  },
};

const ARRAY_2D_METADATA_ENTRY = {
  type: 'Array2D' as const,
  metadata: {
    compact: true,
    defaultColor: 'var(--color-viz-default)',
    highlightTags: [
      { tag: 'sorting', color: 'var(--color-viz-comparing)' },
      { tag: 'remove', color: 'var(--color-viz-swapping)' },
      { tag: 'new', color: 'var(--color-viz-active)' },
      { tag: 'selected', color: 'var(--color-viz-comparing)' },
      { tag: 'updated', color: 'var(--color-viz-updated)' },
    ],
  },
};

export interface CompareRun {
  animation: Animation;
  rendererMetadata: RendererMetadata;
  totalSteps: number;
  includeTypes: string[] | null;
  // Non-null only for graph algorithms — the second, separate "data
  // structures" panel (DFS's stack, Dijkstra/A*'s Open Set / Closed
  // Set / Node Costs) rendered underneath the main graph canvas, the
  // exact same way Practice's own graph-aux-panel does (see
  // practice.html's second <algo-visualization-area>). Null for every
  // sort/search run, which has no second dataset to show.
  auxIncludeTypes: string[] | null;
  legendKind: LegendKind;
  searchTarget: number | null;
}

function toRun(
  recording: Recording,
  objectMetaData: RendererMetadata['objectMetaData'],
  displayName: string,
  includeTypes: string[] | null,
  legendKind: LegendKind,
  searchTarget: number | null = null,
  auxIncludeTypes: string[] | null = null,
): CompareRun {
  const animation = new FramerEngine().getAnimation(recording);
  return {
    animation,
    rendererMetadata: { documentName: displayName, objectMetaData },
    totalSteps: animation.length,
    includeTypes,
    auxIncludeTypes,
    legendKind,
    searchTarget,
  };
}

// One value in the array [0, 100) picked so both columns' bars stay
// comparable at a glance — same range Practice's own random generator
// uses (see practice.ts's randomArray).
function randomValue(): number {
  return Math.floor(Math.random() * 70) + 10;
}

// 8, not Practice's usual 20 — two charts have to share the screen
// side by side here instead of one chart having the whole width, so a
// smaller array keeps each bar (and its index/value labels) legible.
export function generateSharedArray(count = 8): number[] {
  return Array.from({ length: count }, randomValue);
}

function pickSearchTarget(array: number[]): number {
  if (array.length > 0 && Math.random() < 0.8) {
    return array[Math.floor(Math.random() * array.length)];
  }
  const max = Math.max(...array, 0);
  return max + Math.floor(Math.random() * 10) + 1;
}

// Builds one column's run. `sharedArray` is required for sort/search
// algorithms — both columns are run against the exact same array so
// the comparison is meaningful (per the requirement that both sides
// execute on identical data). Graph algorithms are the one documented
// exception: each pulls its own curated/random sample graph instead,
// since a Dijkstra-shaped weighted graph and a DFS-shaped unweighted
// graph can't share one data structure.
export function buildCompareRun(algorithmId: string, displayName: string, sharedArray: number[] | null): CompareRun {
  if (SORT_ALGORITHM_IDS.has(algorithmId)) {
    const array = [...(sharedArray ?? generateSharedArray())];
    const recording = buildSortRecording(algorithmId, array);
    return toRun(recording, [CHART_METADATA_ENTRY], displayName, null, 'sort');
  }

  if (SEARCH_ALGORITHM_IDS.has(algorithmId)) {
    const array = [...(sharedArray ?? generateSharedArray())];
    if (algorithmId === 'linear-search') {
      const target = pickSearchTarget(array);
      const recording = linearSearchVisualization(array, target);
      return toRun(recording, [CHART_METADATA_ENTRY], displayName, null, 'search', target);
    }
    const sorted = array.sort((a, b) => a - b);
    const target = pickSearchTarget(sorted);
    const recording = binarySearchVisualization(sorted, target);
    return toRun(recording, [CHART_METADATA_ENTRY], displayName, null, 'search', target);
  }

  // Graph algorithms — own sample data, not the shared array.
  switch (algorithmId) {
    case 'dijkstra': {
      const sample = SAMPLE_DIJKSTRA_GRAPHS[Math.floor(Math.random() * SAMPLE_DIJKSTRA_GRAPHS.length)];
      const recording = dijkstraVisualization(sample.graph, sample.start, sample.end);
      return toRun(
        recording,
        [GRAPH_METADATA_ENTRY, ARRAY_2D_METADATA_ENTRY, CHART_METADATA_ENTRY],
        displayName,
        ['Graph'],
        'graph',
        null,
        GRAPH_AUX_INCLUDE_TYPES,
      );
    }
    case 'a-star': {
      const sample = SAMPLE_ASTAR_GRAPHS[Math.floor(Math.random() * SAMPLE_ASTAR_GRAPHS.length)];
      const recording = aStarVisualization(sample.graph, sample.start, sample.end);
      return toRun(
        recording,
        [GRAPH_METADATA_ENTRY, ARRAY_2D_METADATA_ENTRY, CHART_METADATA_ENTRY],
        displayName,
        ['Graph'],
        'graph',
        null,
        GRAPH_AUX_INCLUDE_TYPES,
      );
    }
    case 'bfs': {
      const recording = bfsVisualization(SAMPLE_BFS_GRAPH);
      return toRun(
        recording,
        [GRAPH_METADATA_ENTRY, ARRAY_2D_METADATA_ENTRY],
        displayName,
        ['Graph'],
        'graph',
        null,
        GRAPH_AUX_INCLUDE_TYPES,
      );
    }
    case 'dfs':
    default: {
      const recording = dfsVisualization(SAMPLE_DFS_GRAPH);
      return toRun(
        recording,
        [GRAPH_METADATA_ENTRY, ARRAY_2D_METADATA_ENTRY],
        displayName,
        ['Graph'],
        'graph',
        null,
        GRAPH_AUX_INCLUDE_TYPES,
      );
    }
  }
}

function buildSortRecording(algorithmId: string, array: number[]): Recording {
  switch (algorithmId) {
    case 'merge-sort':
      return mergeSortVisualization(array);
    case 'quick-sort':
      return quickSortVisualization(array);
    case 'selection-sort':
      return selectionSortVisualization(array);
    case 'insertion-sort':
      return insertionSortVisualization(array);
    case 'bubble-sort':
    default:
      return bubbleSortVisualization(array);
  }
}
