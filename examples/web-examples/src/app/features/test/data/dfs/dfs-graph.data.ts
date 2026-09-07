// Shared graph used by every DFS Test question in every set/difficulty —
// the exact same object as SAMPLE_DFS_GRAPH in
// features/practice/data/sample-graphs.ts, duplicated here (rather than
// imported) so this data folder has no dependency on the Practice
// feature's internals, matching how the sort algorithms' Test data
// hand-writes its own input arrays instead of importing Practice's
// random-array generator.
//
// dfsVisualization always starts at the hardcoded node 'A' (see
// algorithm/dfs.ts), so every graph used here must contain an 'A' node
// — this one does, and is kept undirected (each edge listed on both
// ends) to match how dfs.ts builds the Graph renderer's edge list.
//
// All frameIndex values referenced across the dfs-*.data.ts files were
// verified by actually running dfsVisualization(DFS_TEST_GRAPH) through
// FramerEngine().getAnimation() and reading the resulting 57-frame
// animation frame by frame — not guessed. The traversal this produces,
// in the order nodes are actually marked visited (line 6), is:
// A -> B -> D -> E -> F -> C.
export const DFS_TEST_GRAPH: Record<string, string[]> = {
  A: ['B', 'C'],
  B: ['A', 'D', 'E'],
  C: ['A', 'F'],
  D: ['B'],
  E: ['B', 'F'],
  F: ['C', 'E'],
};
