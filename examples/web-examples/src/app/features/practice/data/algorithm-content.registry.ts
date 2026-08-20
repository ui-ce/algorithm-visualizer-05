import type { AlgorithmContent } from './algorithm-content.types';

import { BUBBLE_SORT_CONTENT } from './bubble-sort.content';
import { BINARY_SEARCH_CONTENT } from './binary-search.content';
import { LINEAR_SEARCH_CONTENT } from './linear-search.content';
import { MERGE_SORT_CONTENT } from './merge-sort.content';
import { QUICK_SORT_CONTENT } from './quick-sort.content';
import { SELECTION_SORT_CONTENT } from './selection-sort.content';
import { INSERTION_SORT_CONTENT } from './insertion-sort.content';

import { DIJKSTRA_CONTENT } from './dijkstra.content';
import { DFS_CONTENT } from './dfs.content';
import { BFS_CONTENT } from './bfs.content';
import { A_STAR_CONTENT } from './a-star.content';

// Each remaining algorithm gets its own file the same shape as
// bubble-sort.content.ts, then one line added here — nothing else in
// the app needs to change to pick it up.
export const ALGORITHM_CONTENT: Record<string, AlgorithmContent> = {
  'bubble-sort': BUBBLE_SORT_CONTENT,
  'binary-search': BINARY_SEARCH_CONTENT,
  'linear-search': LINEAR_SEARCH_CONTENT,

  'merge-sort': MERGE_SORT_CONTENT,
  'quick-sort': QUICK_SORT_CONTENT,
  'selection-sort': SELECTION_SORT_CONTENT,
  'insertion-sort': INSERTION_SORT_CONTENT,

  'dijkstra': DIJKSTRA_CONTENT,
  'dfs': DFS_CONTENT,
  'bfs': BFS_CONTENT,
  'a-star': A_STAR_CONTENT,
};