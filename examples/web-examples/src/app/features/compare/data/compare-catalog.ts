// The three families the Compare page groups algorithms into. An
// algorithm can only ever be compared against another algorithm from
// the same category — the category is fixed by whichever algorithm the
// person arrived from (Algorithm-1), and the Algorithm-2 dropdown only
// ever lists the other members of that same category. Matches the
// grouping already used on the Home page card grid.
export type CompareCategory = 'sorting' | 'searching' | 'graph';

export interface CompareAlgorithmMeta {
  id: string;
  // Reuses the exact same translation keys the Home page cards and the
  // Practice page breadcrumb already use for this algorithm's display
  // name, so the name isn't translated a third time in a third place.
  nameKey: string;
  category: CompareCategory;
}

// Kept in the same order as the Home page's card list (components/home/home.ts).
export const COMPARE_ALGORITHMS: CompareAlgorithmMeta[] = [
  { id: 'bubble-sort', nameKey: 'home.algorithm.bubbleSort.name', category: 'sorting' },
  { id: 'merge-sort', nameKey: 'home.algorithm.mergeSort.name', category: 'sorting' },
  { id: 'quick-sort', nameKey: 'home.algorithm.quickSort.name', category: 'sorting' },
  { id: 'selection-sort', nameKey: 'home.algorithm.selectionSort.name', category: 'sorting' },
  { id: 'insertion-sort', nameKey: 'home.algorithm.insertionSort.name', category: 'sorting' },

  { id: 'binary-search', nameKey: 'home.algorithm.binarySearch.name', category: 'searching' },
  { id: 'linear-search', nameKey: 'home.algorithm.linearSearch.name', category: 'searching' },

  { id: 'dijkstra', nameKey: 'home.algorithm.dijkstra.name', category: 'graph' },
  { id: 'dfs', nameKey: 'home.algorithm.dfs.name', category: 'graph' },
  { id: 'bfs', nameKey: 'home.algorithm.bfs.name', category: 'graph' },
  { id: 'a-star', nameKey: 'home.algorithm.aStar.name', category: 'graph' },
];

export function getCompareAlgorithmMeta(id: string | null): CompareAlgorithmMeta | null {
  if (!id) {
    return null;
  }
  return COMPARE_ALGORITHMS.find((algorithm) => algorithm.id === id) ?? null;
}

// Every other algorithm in the same category — this is exactly the list
// the Algorithm-2 dropdown should offer once Algorithm-1 (and therefore
// the category) is known. The currently-selected id (on either side) is
// excluded so the same algorithm can't be "compared" against itself.
export function algorithmsInCategory(category: CompareCategory, excludeId?: string | null): CompareAlgorithmMeta[] {
  return COMPARE_ALGORITHMS.filter((algorithm) => algorithm.category === category && algorithm.id !== excludeId);
}
