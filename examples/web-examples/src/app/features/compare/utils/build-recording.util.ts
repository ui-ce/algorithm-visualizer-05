// Builds an Animation + RendererMetadata pair for a single algorithm
// column on the Compare page.
//
// This intentionally mirrors the dispatch logic in
// features/practice/practice.ts (buildArraySortRecording /
// setBinarySearchData / setDijkstraData / ...) rather than importing
// from it, since none of that is exported from PracticePage.
//
// The metadata objects below are trimmed copies of the ones there,
// kept only for the tag colors this page's legend actually uses.

import { FramerEngine } from '@algorithm-visualizer/typescript-framer';
import type {
  Animation,
  RendererMetadata,
} from '@algorithm-visualizer/typescript-angular-renderer';
import type { Recording } from '@algorithm-visualizer/typescript-recorder';

import type { Language } from '../../../core/services/language.service';

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
// this run's visualization uses.
//
// The actual translated labels are resolved in CompareVisualization
// itself, not here.
export type LegendKind = 'sort' | 'search' | 'graph';

export const SORT_ALGORITHM_IDS = new Set([
  'bubble-sort',
  'merge-sort',
  'quick-sort',
  'selection-sort',
  'insertion-sort',
]);

export const SEARCH_ALGORITHM_IDS = new Set([
  'binary-search',
  'linear-search',
]);

export const GRAPH_ALGORITHM_IDS = new Set([
  'dijkstra',
  'dfs',
  'bfs',
  'a-star',
]);

// Same auxiliary visualization types used by Practice's graph area.
//
// DFS/BFS do not necessarily contain a Chart frame, but filtering for
// a type that is not present is harmless.
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

  // Non-null only for graph algorithms.
  //
  // This is the second, separate "data structures" panel:
  // DFS's stack, Dijkstra/A*'s Open Set / Closed Set / Node Costs.
  //
  // Null for sort/search runs.
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
    rendererMetadata: {
      documentName: displayName,
      objectMetaData,
    },
    totalSteps: animation.length,
    includeTypes,
    auxIncludeTypes,
    legendKind,
    searchTarget,
  };
}

// One value in the array [10, 80).
//
// Both columns therefore use the same numeric range and their bars
// remain visually comparable.
function randomValue(): number {
  return Math.floor(Math.random() * 70) + 10;
}

// 8 values instead of Practice's usual 20 because two charts share
// the screen side by side on Compare.
export function generateSharedArray(count = 8): number[] {
  return Array.from(
    { length: count },
    randomValue,
  );
}

function pickSearchTarget(array: number[]): number {
  if (array.length > 0 && Math.random() < 0.8) {
    return array[Math.floor(Math.random() * array.length)];
  }

  const max = Math.max(...array, 0);

  return max + Math.floor(Math.random() * 10) + 1;
}

// Builds one column's run.
//
// `sharedArray` is required for sort/search algorithms so both columns
// run against exactly the same data.
//
// Graph algorithms are the documented exception: each algorithm uses
// its own curated/random graph sample.
export function buildCompareRun(
  algorithmId: string,
  displayName: string,
  sharedArray: number[] | null,
  language: Language = 'en',
): CompareRun {
  // ------------------------------------------------------------
  // SORT
  // ------------------------------------------------------------

  if (SORT_ALGORITHM_IDS.has(algorithmId)) {
    const array = [
      ...(sharedArray ?? generateSharedArray()),
    ];

    const recording = buildSortRecording(
      algorithmId,
      array,
      language,
    );

    return toRun(
      recording,
      [CHART_METADATA_ENTRY],
      displayName,
      null,
      'sort',
    );
  }

  // ------------------------------------------------------------
  // SEARCH
  // ------------------------------------------------------------

  if (SEARCH_ALGORITHM_IDS.has(algorithmId)) {
    const array = [
      ...(sharedArray ?? generateSharedArray()),
    ];

    if (algorithmId === 'linear-search') {
      const target = pickSearchTarget(array);

      const recording = linearSearchVisualization(
        array,
        target,
        language,
      );

      return toRun(
        recording,
        [CHART_METADATA_ENTRY],
        displayName,
        null,
        'search',
        target,
      );
    }

    const sorted = [
      ...array,
    ].sort((a, b) => a - b);

    const target = pickSearchTarget(sorted);

    const recording = binarySearchVisualization(
      sorted,
      target,
      language,
    );

    return toRun(
      recording,
      [CHART_METADATA_ENTRY],
      displayName,
      null,
      'search',
      target,
    );
  }

  // ------------------------------------------------------------
  // GRAPH
  // ------------------------------------------------------------

  switch (algorithmId) {
    // ----------------------------------------------------------
    // DIJKSTRA
    // ----------------------------------------------------------

    case 'dijkstra': {
      const sample =
        SAMPLE_DIJKSTRA_GRAPHS[
          Math.floor(
            Math.random() * SAMPLE_DIJKSTRA_GRAPHS.length,
          )
        ];

      const recording = dijkstraVisualization(
        sample.graph,
        sample.start,
        sample.end,
        language,
      );

      return toRun(
        recording,
        [
          GRAPH_METADATA_ENTRY,
          ARRAY_2D_METADATA_ENTRY,
          CHART_METADATA_ENTRY,
        ],
        displayName,
        ['Graph'],
        'graph',
        null,
        GRAPH_AUX_INCLUDE_TYPES,
      );
    }

    // ----------------------------------------------------------
    // A*
    // ----------------------------------------------------------

    case 'a-star': {
      const sample =
        SAMPLE_ASTAR_GRAPHS[
          Math.floor(
            Math.random() * SAMPLE_ASTAR_GRAPHS.length,
          )
        ];

      const recording = aStarVisualization(
        sample.graph,
        sample.start,
        sample.end,
        language,
      );

      return toRun(
        recording,
        [
          GRAPH_METADATA_ENTRY,
          ARRAY_2D_METADATA_ENTRY,
          CHART_METADATA_ENTRY,
        ],
        displayName,
        ['Graph'],
        'graph',
        null,
        GRAPH_AUX_INCLUDE_TYPES,
      );
    }

    // ----------------------------------------------------------
    // BFS
    // ----------------------------------------------------------

    case 'bfs': {
      const recording = bfsVisualization(
        SAMPLE_BFS_GRAPH,
        'A',
        language,
      );

      return toRun(
        recording,
        [
          GRAPH_METADATA_ENTRY,
          ARRAY_2D_METADATA_ENTRY,
        ],
        displayName,
        ['Graph'],
        'graph',
        null,
        GRAPH_AUX_INCLUDE_TYPES,
      );
    }

    // ----------------------------------------------------------
    // DFS
    // ----------------------------------------------------------

    case 'dfs':
    default: {
      const recording = dfsVisualization(
        SAMPLE_DFS_GRAPH,
        language,
      );

      return toRun(
        recording,
        [
          GRAPH_METADATA_ENTRY,
          ARRAY_2D_METADATA_ENTRY,
        ],
        displayName,
        ['Graph'],
        'graph',
        null,
        GRAPH_AUX_INCLUDE_TYPES,
      );
    }
  }
}

// --------------------------------------------------------------
// SORT DISPATCH
// --------------------------------------------------------------
//
// This function is intentionally outside PracticePage, so it cannot
// access `this.languageService`.
//
// Language is therefore passed explicitly from buildCompareRun.
function buildSortRecording(
  algorithmId: string,
  array: number[],
  language: Language,
): Recording {
  switch (algorithmId) {
    case 'merge-sort':
      return mergeSortVisualization(
        array,
        language,
      );

    case 'quick-sort':
      return quickSortVisualization(
        array,
        language,
      );

    case 'selection-sort':
      return selectionSortVisualization(
        array,
        language,
      );

    case 'insertion-sort':
      return insertionSortVisualization(
        array,
        language,
      );

    case 'bubble-sort':
    default:
      return bubbleSortVisualization(
        array,
        language,
      );
  }
}