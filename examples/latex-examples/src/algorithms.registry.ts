import { Recording } from '@algorithm-visualizer/typescript-recorder';

// Reuses the exact same recorder functions Practice calls in the
// browser (web-examples/src/app/algorithm/*.ts) — not a separate copy.
// If one of these ever changes, this output regenerates from the same
// source instead of drifting out of sync.
import { bubbleSortVisualization } from '../../web-examples/src/app/algorithm/bubble-sort';
import { selectionSortVisualization } from '../../web-examples/src/app/algorithm/selection-sort';
import { insertionSortVisualization } from '../../web-examples/src/app/algorithm/insertion-sort';
import { mergeSortVisualization } from '../../web-examples/src/app/algorithm/merge-sort';
import { quickSortVisualization } from '../../web-examples/src/app/algorithm/quick-sort';
import { binarySearchVisualization } from '../../web-examples/src/app/algorithm/binary-search';
import { linearSearchVisualization } from '../../web-examples/src/app/algorithm/LinearSearch';
import { dijkstraVisualization } from '../../web-examples/src/app/algorithm/dijkstra';
import { dfsVisualization } from '../../web-examples/src/app/algorithm/dfs';
import { bfsVisualization } from '../../web-examples/src/app/algorithm/bfs';
import { aStarVisualization } from '../../web-examples/src/app/algorithm/a-start';

// Same sample graphs Practice defaults to for these algorithms —
// see setDijkstraData / setDfsData / setBfsData / setAStarData.
import {
  SAMPLE_DIJKSTRA_GRAPHS,
  SAMPLE_DFS_GRAPH,
  SAMPLE_BFS_GRAPH,
  SAMPLE_ASTAR_GRAPHS,
} from '../../web-examples/src/app/features/practice/data/sample-graphs';

import {
  ARRAY_2D_METADATA_ENTRY,
  CHART_METADATA_ENTRY,
  GRAPH_METADATA_ENTRY,
  ObjectMetaDataEntry,
} from './shared/latex-export';

// One fixed array every array-based algorithm runs on, so outputs are
// reproducible and comparable side by side. Swap for a fresh call to
// your own random-array generator if you want different data per run.
const SAMPLE_ARRAY = [5, 2, 9, 1, 7, 12, 2, 3, 25, 14, 6, 4, 13];
const SEARCH_TARGET = 9;

type AlgorithmEntry = {
  documentName: string;
  build: () => { recording: Recording; objectMetaData: ObjectMetaDataEntry[] };
};

/**
 * One entry per algorithm the app supports. To add a new algorithm to
 * this package later: write its recorder in
 * web-examples/src/app/algorithm/<name>.ts the same way every existing
 * one is written, then add one entry here using the same
 * objectMetaData combo practice.ts's applyRecording call uses for it
 * (Chart only for a plain array; Graph + Array2D [+ Chart] for a graph
 * algorithm with a side panel). Nothing else in this package changes.
 */
export const ALGORITHM_REGISTRY: Record<string, AlgorithmEntry> = {
  'bubble-sort': {
    documentName: 'Bubble Sort',
    build: () => ({
      recording: bubbleSortVisualization([...SAMPLE_ARRAY]),
      objectMetaData: [CHART_METADATA_ENTRY],
    }),
  },
  'selection-sort': {
    documentName: 'Selection Sort',
    build: () => ({
      recording: selectionSortVisualization([...SAMPLE_ARRAY]),
      objectMetaData: [CHART_METADATA_ENTRY],
    }),
  },
  'insertion-sort': {
    documentName: 'Insertion Sort',
    build: () => ({
      recording: insertionSortVisualization([...SAMPLE_ARRAY]),
      objectMetaData: [CHART_METADATA_ENTRY],
    }),
  },
  'merge-sort': {
    documentName: 'Merge Sort',
    build: () => ({
      recording: mergeSortVisualization([...SAMPLE_ARRAY]),
      objectMetaData: [CHART_METADATA_ENTRY],
    }),
  },
  'quick-sort': {
    documentName: 'Quick Sort',
    build: () => ({
      recording: quickSortVisualization([...SAMPLE_ARRAY]),
      objectMetaData: [CHART_METADATA_ENTRY],
    }),
  },
  'binary-search': {
    documentName: 'Binary Search',
    build: () => {
      const sorted = [...SAMPLE_ARRAY].sort((a, b) => a - b);
      return {
        recording: binarySearchVisualization(sorted, SEARCH_TARGET),
        objectMetaData: [CHART_METADATA_ENTRY],
      };
    },
  },
  'linear-search': {
    documentName: 'Linear Search',
    build: () => ({
      recording: linearSearchVisualization([...SAMPLE_ARRAY], SEARCH_TARGET),
      objectMetaData: [CHART_METADATA_ENTRY],
    }),
  },
  dijkstra: {
    documentName: 'Dijkstra',
    build: () => {
      const sample = SAMPLE_DIJKSTRA_GRAPHS[0];
      return {
        recording: dijkstraVisualization(sample.graph, sample.start, sample.end),
        objectMetaData: [GRAPH_METADATA_ENTRY, ARRAY_2D_METADATA_ENTRY, CHART_METADATA_ENTRY],
      };
    },
  },
  dfs: {
    documentName: 'DFS',
    build: () => ({
      recording: dfsVisualization(SAMPLE_DFS_GRAPH),
      objectMetaData: [GRAPH_METADATA_ENTRY, ARRAY_2D_METADATA_ENTRY],
    }),
  },
  bfs: {
    documentName: 'BFS',
    build: () => ({
      recording: bfsVisualization(SAMPLE_BFS_GRAPH),
      objectMetaData: [GRAPH_METADATA_ENTRY, ARRAY_2D_METADATA_ENTRY],
    }),
  },
  'a-star': {
    documentName: 'A*',
    build: () => {
      const sample = SAMPLE_ASTAR_GRAPHS[0];
      return {
        recording: aStarVisualization(sample.graph, sample.start, sample.end),
        objectMetaData: [GRAPH_METADATA_ENTRY, ARRAY_2D_METADATA_ENTRY, CHART_METADATA_ENTRY],
      };
    },
  },
};
