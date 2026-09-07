import type { AlgorithmContent } from './algorithm-content.types';

import { BUBBLE_SORT_CONTENT_FA } from './bubble-sort.content.fa';
import { BINARY_SEARCH_CONTENT_FA } from './binary-search.content.fa';
import { LINEAR_SEARCH_CONTENT_FA } from './linear-search.content.fa';
import { MERGE_SORT_CONTENT_FA } from './merge-sort.content.fa';
import { QUICK_SORT_CONTENT_FA } from './quick-sort.content.fa';
import { SELECTION_SORT_CONTENT_FA } from './selection-sort.content.fa';
import { INSERTION_SORT_CONTENT_FA } from './insertion-sort.content.fa';
import { DIJKSTRA_CONTENT_FA } from './dijkstra.content.fa';
import { DFS_CONTENT_FA } from './dfs.content.fa';
import { BFS_CONTENT_FA } from './bfs.content.fa';
import { A_STAR_CONTENT_FA } from './a-star.content.fa';

export const ALGORITHM_CONTENT_FA: Record<string, AlgorithmContent> = {
  'bubble-sort': BUBBLE_SORT_CONTENT_FA,
  'binary-search': BINARY_SEARCH_CONTENT_FA,
  'linear-search': LINEAR_SEARCH_CONTENT_FA,
  'merge-sort': MERGE_SORT_CONTENT_FA,
  'quick-sort': QUICK_SORT_CONTENT_FA,
  'selection-sort': SELECTION_SORT_CONTENT_FA,
  'insertion-sort': INSERTION_SORT_CONTENT_FA,
  'dijkstra': DIJKSTRA_CONTENT_FA,
  'dfs': DFS_CONTENT_FA,
  'bfs': BFS_CONTENT_FA,
  'a-star': A_STAR_CONTENT_FA,
};