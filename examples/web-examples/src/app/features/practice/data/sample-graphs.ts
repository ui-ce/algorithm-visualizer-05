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

// ---------------------------------------------------------------------
// Real graph data patterns
// ---------------------------------------------------------------------
// The array algorithms have Nearly Sorted / Reversed / Many Duplicates —
// each one a genuinely different shape of input that demonstrates
// something different about the algorithm. Graphs need the equivalent:
// each pattern below actually changes the *shape* of the generated
// graph (not just which random numbers land where), so a person can
// pick one and see a real, different traversal every time.
export type GraphPattern = 'chain' | 'dense' | 'disconnected';

function nodeNames(count: number): string[] {
  return NODE_LABELS.slice(0, count);
}

// Undirected reachability from a start node — used below to pick an
// end node A*/Dijkstra can actually reach even inside the
// 'disconnected' pattern, and to double-check 'chain'/'dense' really
// do reach every node.
function reachableFrom(graph: Record<string, string[]>, start: string): Set<string> {
  const seen = new Set<string>([start]);
  const stack = [start];
  while (stack.length > 0) {
    const node = stack.pop()!;
    for (const neighbor of graph[node] ?? []) {
      if (!seen.has(neighbor)) {
        seen.add(neighbor);
        stack.push(neighbor);
      }
    }
  }
  return seen;
}

// 'chain': A-B-C-D-E-F and nothing else — no shortcuts at all. This is
// the worst case for traversal depth: DFS has to walk all the way to
// the far end before it can backtrack, and BFS needs one queue "layer"
// per node instead of fanning out quickly. Also the clearest possible
// graph for a first-time viewer, since there's only ever one direction
// to go.
function chainGraph(nodeCount: number): Record<string, string[]> {
  const nodes = nodeNames(nodeCount);
  const graph: Record<string, string[]> = {};
  nodes.forEach((node) => (graph[node] = []));
  for (let i = 0; i < nodes.length - 1; i++) {
    addUndirectedEdge(graph, nodes[i], nodes[i + 1]);
  }
  return graph;
}

// 'dense': a connected base (so it's never accidentally disconnected)
// plus roughly one extra shortcut edge per node wired on top, so most
// pairs of nodes have more than one path between them — this is what
// actually shows Dijkstra/A* choosing a cheaper route over a shorter
// hop-count one, and shows DFS/BFS re-encountering already-visited
// nodes through a second edge instead of always seeing each node
// exactly once.
function denseGraph(nodeCount: number): Record<string, string[]> {
  const nodes = nodeNames(nodeCount);
  const graph = chainGraph(nodeCount);

  const extraEdgeCount = Math.max(2, Math.round(nodeCount * 0.8));
  let added = 0;
  let attempts = 0;
  // Bounded by attempts, not just success count, so this can never
  // spin forever once every possible extra edge has already been
  // added (which happens for small nodeCount values).
  while (added < extraEdgeCount && attempts < extraEdgeCount * 15) {
    attempts++;
    const a = nodes[Math.floor(Math.random() * nodes.length)];
    const b = nodes[Math.floor(Math.random() * nodes.length)];
    if (a === b || graph[a].includes(b)) continue;
    addUndirectedEdge(graph, a, b);
    added++;
  }

  return graph;
}

// 'disconnected': two separate pieces with no edge between them at
// all — the *only* pattern (array or graph) whose entire point is a
// negative result. Half the nodes are providably unreachable from 'A',
// which is the one scenario none of the other patterns, nor the plain
// "random graph" Random button, reliably produce: a random connected
// graph is connected by construction, so "the algorithm correctly
// stops without visiting everything" was never actually demonstrated
// before this pattern existed.
function disconnectedGraph(nodeCount: number): Record<string, string[]> {
  const nodes = nodeNames(nodeCount);
  const graph: Record<string, string[]> = {};
  nodes.forEach((node) => (graph[node] = []));

  const splitAt = Math.max(2, Math.ceil(nodes.length / 2));
  const reachableSide = nodes.slice(0, splitAt);
  const unreachableSide = nodes.slice(splitAt);

  for (let i = 0; i < reachableSide.length - 1; i++) {
    addUndirectedEdge(graph, reachableSide[i], reachableSide[i + 1]);
  }
  // One extra edge closes the reachable side into a small loop when
  // there's room for one, so it isn't just another chain.
  if (reachableSide.length > 2) {
    addUndirectedEdge(graph, reachableSide[0], reachableSide[reachableSide.length - 1]);
  }

  for (let i = 0; i < unreachableSide.length - 1; i++) {
    addUndirectedEdge(graph, unreachableSide[i], unreachableSide[i + 1]);
  }

  return graph;
}

function buildUnweightedPattern(pattern: GraphPattern, nodeCount: number): Record<string, string[]> {
  switch (pattern) {
    case 'chain':
      return chainGraph(nodeCount);
    case 'dense':
      return denseGraph(nodeCount);
    case 'disconnected':
      return disconnectedGraph(nodeCount);
  }
}

// For DFS/BFS — 'A' is always the (only) start these two recorders
// support, so there's no start/end to choose.
export function patternedDfsGraph(pattern: GraphPattern, nodeCount = 6): Record<string, string[]> {
  return buildUnweightedPattern(pattern, nodeCount);
}

export const patternedBfsGraph: (pattern: GraphPattern, nodeCount?: number) => Record<string, string[]> =
  patternedDfsGraph;

// For Dijkstra/A* — same shapes, with a random 1-9 weight added to
// every edge, and an end node picked from whatever's actually
// reachable from 'A' so the run always finds a real path — including
// for 'disconnected', where the *unreachable* half stays exactly that:
// visibly never touched by the algorithm, without making "end" itself
// an impossible target to search for.
export function patternedWeightedGraphSample(pattern: GraphPattern, nodeCount = 6): DijkstraSample {
  const unweighted = buildUnweightedPattern(pattern, nodeCount);

  const graph: Record<string, Record<string, number>[]> = {};
  Object.entries(unweighted).forEach(([node, neighbors]) => {
    graph[node] = neighbors.map((neighbor) => ({ [neighbor]: 1 + Math.floor(Math.random() * 9) }));
  });

  const start = 'A';
  const reachable = [...reachableFrom(unweighted, start)].filter((node) => node !== start);
  const end = reachable.length > 0 ? reachable[Math.floor(Math.random() * reachable.length)] : start;

  return { graph, start, end };
}

export const patternedAStarSample: (pattern: GraphPattern, nodeCount?: number) => DijkstraSample =
  patternedWeightedGraphSample;
