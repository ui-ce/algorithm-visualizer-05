// Dijkstra's recorder expects Record<string, Record<string, number>[]> —
// each node maps to a list of single-key {neighborId: weight} objects.
// Every reachable node needs its own (possibly empty) entry, since the
// node list and initial cost table are both built from Object.keys(graph).
export type DijkstraSample = {
  graph: Record<string, Record<string, number>[]>;
  start: string;
  end: string;
};

export const SAMPLE_DIJKSTRA_GRAPHS: DijkstraSample[] = [
  {
    graph: {
      A: [{ B: 4 }, { C: 2 }],
      B: [{ C: 5 }, { D: 10 }],
      C: [{ E: 3 }],
      D: [{ F: 11 }],
      E: [{ D: 4 }, { F: 8 }],
      F: [],
    },
    start: 'A',
    end: 'F',
  },
  {
    graph: {
      A: [{ B: 2 }, { D: 8 }],
      B: [{ C: 3 }],
      C: [{ E: 2 }, { F: 6 }],
      D: [{ E: 1 }],
      E: [{ F: 3 }],
      F: [],
    },
    start: 'A',
    end: 'F',
  },
];

// DFS's recorder hardcodes 'A' as the starting node, so every sample
// graph here needs an 'A' entry. Kept undirected (each edge listed on
// both ends) to match how dfs.ts builds the Graph renderer's edge list.
export const SAMPLE_DFS_GRAPH: Record<string, string[]> = {
  A: ['B', 'C'],
  B: ['A', 'D', 'E'],
  C: ['A', 'F'],
  D: ['B'],
  E: ['B', 'F'],
  F: ['C', 'E'],
};

const NODE_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function addUndirectedEdge(graph: Record<string, string[]>, a: string, b: string): void {
  if (a === b) return;
  graph[a] ??= [];
  graph[b] ??= [];
  if (!graph[a].includes(b)) graph[a].push(b);
  if (!graph[b].includes(a)) graph[b].push(a);
}

// Builds a random connected graph on nodeCount nodes (always includes
// 'A' first so DFS's hardcoded start node exists): a random spanning
// tree guarantees connectivity, then a few extra random edges add
// cycles/branching so the traversal isn't just a straight line every
// time.
function randomConnectedGraph(nodeCount: number, extraEdgeChance: number): Record<string, string[]> {
  const nodes = NODE_LABELS.slice(0, nodeCount);
  const graph: Record<string, string[]> = {};
  nodes.forEach((node) => (graph[node] = []));

  const shuffled = [...nodes].sort(() => Math.random() - 0.5);
  // Reconnect 'A' first regardless of shuffle order, so the spanning
  // tree below still grows from a single connected start.
  const ordered = ['A', ...shuffled.filter((node) => node !== 'A')];
  for (let i = 1; i < ordered.length; i++) {
    const parent = ordered[Math.floor(Math.random() * i)];
    addUndirectedEdge(graph, parent, ordered[i]);
  }

  for (const a of nodes) {
    for (const b of nodes) {
      if (a < b && Math.random() < extraEdgeChance) {
        addUndirectedEdge(graph, a, b);
      }
    }
  }

  return graph;
}

// A fresh random graph every call — 5 to 7 nodes, always connected,
// always includes 'A'.
export function randomDfsGraph(): Record<string, string[]> {
  const nodeCount = 5 + Math.floor(Math.random() * 3);
  return randomConnectedGraph(nodeCount, 0.15);
}

// BFS's recorder (algorithm/bfs.ts) has the exact same shape and the
// same hardcoded 'A' start node as DFS's, so it reuses DFS's sample
// graph and random-graph generator rather than duplicating them —
// there is nothing BFS-specific about "a connected, undirected graph
// rooted at A".
export const SAMPLE_BFS_GRAPH: Record<string, string[]> = SAMPLE_DFS_GRAPH;
export const randomBfsGraph: () => Record<string, string[]> = randomDfsGraph;

// Same shape, but returned as weighted directed edges for Dijkstra —
// built on top of the same connected-graph generator so it's never
// disconnected, with a random weight per direction and a random
// start/end pair that are guaranteed distinct.
export function randomDijkstraSample(): DijkstraSample {
  const nodeCount = 5 + Math.floor(Math.random() * 3);
  const undirected = randomConnectedGraph(nodeCount, 0.2);
  const nodes = Object.keys(undirected);

  const graph: Record<string, Record<string, number>[]> = {};
  nodes.forEach((node) => (graph[node] = []));
  for (const from of nodes) {
    for (const to of undirected[from]) {
      const weight = 1 + Math.floor(Math.random() * 9);
      if (!graph[from].some((entry) => to in entry)) {
        graph[from].push({ [to]: weight });
      }
    }
  }

  const start = 'A';
  const otherNodes = nodes.filter((node) => node !== start);
  const end = otherNodes[Math.floor(Math.random() * otherNodes.length)];

  return { graph, start, end };
}

// A*'s recorder (algorithm/a-start.ts) takes the exact same
// Record<string, Record<string, number>[]> + start/end shape as
// Dijkstra's — the current implementation uses h(n) = 0, so its search
// order matches Dijkstra's exactly and the same weighted sample graphs
// apply without changes.
export const SAMPLE_ASTAR_GRAPHS: DijkstraSample[] = SAMPLE_DIJKSTRA_GRAPHS;
export const randomAStarSample: () => DijkstraSample = randomDijkstraSample;
