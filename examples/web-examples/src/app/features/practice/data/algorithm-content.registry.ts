import type { AlgorithmContent } from './algorithm-content.types';
import { BUBBLE_SORT_CONTENT } from './bubble-sort.content';

// Each remaining algorithm gets its own file the same shape as
// bubble-sort.content.ts, then one line added here — nothing else in
// the app needs to change to pick it up.
export const ALGORITHM_CONTENT: Record<string, AlgorithmContent> = {
  'bubble-sort': BUBBLE_SORT_CONTENT,
  // 'merge-sort': MERGE_SORT_CONTENT,
  // 'binary-search': BINARY_SEARCH_CONTENT,
  // 'dijkstra': DIJKSTRA_CONTENT,
  // 'dfs': DFS_CONTENT,
};
