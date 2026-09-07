// Shared graph used by every Dijkstra Test question in every
// set/difficulty. Same shape/weights as the first entry of
// SAMPLE_DIJKSTRA_GRAPHS in features/practice/data/sample-graphs.ts,
// duplicated here rather than imported for the same reason
// dfs-graph.data.ts duplicates SAMPLE_DFS_GRAPH — this data folder has
// no dependency on the Practice feature's internals.
//
// dijkstraVisualization takes (graph, start, end) as separate
// arguments (see algorithm/dijkstra.ts), so every execution question's
// visualization object below sets graph, start, and end explicitly.
//
// All frameIndex values referenced across the dijkstra-*.data.ts files
// were verified by actually running
// dijkstraVisualization(DIJKSTRA_TEST_GRAPH, 'A', 'F') through
// FramerEngine().getAnimation() and reading the resulting 40-frame
// animation frame by frame — not guessed. The shortest path this
// produces from A to F is A -> C -> E -> F, with a total cost of 13
// (2 + 3 + 8), which beats the alternative A -> B -> D -> F route
// (4 + 10 + 11 = 25) and the more direct-looking A -> C -> E -> D -> F
// (2 + 3 + 4 + 11 = 20).
export const DIJKSTRA_TEST_GRAPH: Record<string, Record<string, number>[]> = {
  A: [{ B: 4 }, { C: 2 }],
  B: [{ C: 5 }, { D: 10 }],
  C: [{ E: 3 }],
  D: [{ F: 11 }],
  E: [{ D: 4 }, { F: 8 }],
  F: [],
};

export const DIJKSTRA_TEST_START = 'A';
export const DIJKSTRA_TEST_END = 'F';
