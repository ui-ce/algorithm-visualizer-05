import type { TestQuestion } from '../../test.types';
import { DIJKSTRA_TEST_GRAPH } from './dijkstra-graph.data';

const CODE_GROUP_1_LINES = (): TestQuestion['codeLines'] => [
  { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function dijkstra(graph, start, end):', kind: 'plain' }] },
  { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'cost[start] = 0, open = [start]', kind: 'plain' }] },
  { lineNumber: 3, indentLevel: 1, tokens: [{ text: 'while open is not empty:', kind: 'plain' }] },
  {
    lineNumber: 4,
    indentLevel: 2,
    tokens: [
      { text: 'sort open by cost, current = open.', kind: 'plain' },
      { text: '____', kind: 'blank' },
      { text: '()', kind: 'plain' },
    ],
  },
  { lineNumber: 5, indentLevel: 2, tokens: [{ text: 'if current == end: return path', kind: 'plain' }] },
  { lineNumber: 6, indentLevel: 2, tokens: [{ text: 'for neighbor in graph[current]:', kind: 'plain' }] },
  { lineNumber: 7, indentLevel: 3, tokens: [{ text: 'newCost = cost[current] + weight', kind: 'plain' }] },
  {
    lineNumber: 8,
    indentLevel: 3,
    tokens: [
      { text: 'if newCost ', kind: 'plain' },
      { text: '____', kind: 'blank' },
      { text: ' cost[neighbor]:', kind: 'plain' },
    ],
  },
  {
    lineNumber: 9,
    indentLevel: 4,
    tokens: [
      { text: 'cost[neighbor] = newCost, open.', kind: 'plain' },
      { text: '____', kind: 'blank' },
      { text: '(neighbor)', kind: 'plain' },
    ],
  },
  { lineNumber: 10, indentLevel: 1, tokens: [{ text: 'return no path', kind: 'plain' }] },
];

export const DIJKSTRA_HARD_SET_1: TestQuestion[] = [
  {
    id: 'dijkstra-hard-s1-q1',
    type: 'conceptual',
    prompt: "How does Dijkstra's time complexity change depending on how the open set is implemented?",
    options: [
      { id: 'a', text: 'A plain array needing a full sort or scan each time gives roughly O(V^2); a binary heap improves this to O((V + E) log V); a Fibonacci heap can reach O(E + V log V)' },
      { id: 'b', text: 'The choice of data structure for the open set never affects the algorithm\'s complexity' },
      { id: 'c', text: 'A plain array is always faster than any heap-based implementation' },
      { id: 'd', text: 'Complexity depends only on the number of edges, never on the open-set implementation' },
    ],
    correctOptionId: 'a',
    explanation:
      "The open set's job — repeatedly finding and removing the cheapest entry, and inserting newly discovered nodes — is exactly what a priority queue is built to do efficiently. A plain array's linear scan/sort makes both operations far more expensive than a heap's logarithmic ones, especially as V grows.",
  },
  {
    id: 'dijkstra-hard-s1-q2',
    type: 'conceptual',
    prompt: 'In this specific implementation, can the same node ever exist twice at once in the open set?',
    options: [
      { id: 'a', text: "No — the actual code only pushes a neighbor onto the open set the first time it's discovered (checking it isn't already open or closed); later cost improvements just update its stored cost value in place" },
      { id: 'b', text: "Yes, exactly like DFS's stack, a node gets pushed again every time its cost improves" },
      { id: 'c', text: 'Yes, but only for the start node' },
      { id: 'd', text: 'It is impossible to know without running the algorithm on a specific graph' },
    ],
    correctOptionId: 'a',
    explanation:
      "This is a detail the simplified pseudocode's line 9 ('open.push(neighbor)') glosses over — the real implementation guards the push with a check that the neighbor isn't already in the open set or closed set, so it's only ever added once. This is a genuine difference from DFS's stack, which does allow the same node to appear multiple times.",
  },
  {
    id: 'dijkstra-hard-s1-q3',
    type: 'conceptual',
    prompt: "How does the A* algorithm relate to Dijkstra?",
    options: [
      { id: 'a', text: 'A* is Dijkstra plus a heuristic estimate of remaining distance to the goal, used to prioritize which node to explore next — when that heuristic is always zero, A* behaves exactly like Dijkstra' },
      { id: 'b', text: 'A* and Dijkstra solve completely unrelated problems' },
      { id: 'c', text: 'A* only works on unweighted graphs, unlike Dijkstra' },
      { id: 'd', text: 'A* is simply Dijkstra run backward from the destination' },
    ],
    correctOptionId: 'a',
    explanation:
      "A* extends Dijkstra's cost tracking by adding a heuristic — an estimate of how far a node is from the goal — to bias exploration toward the destination instead of expanding outward evenly. Set that heuristic to always return 0, and A* explores nodes in exactly the same order Dijkstra would.",
  },
  {
    id: 'dijkstra-hard-s1-q4',
    type: 'conceptual',
    prompt: "Why does closing nodes in strictly increasing order of cost guarantee that each node's cost is correct once it's closed?",
    options: [
      { id: 'a', text: "If a node's true shortest path went through some node not yet closed, that unclosed node would have to have a lower cost than the one being closed now — contradicting the fact that the algorithm always closes the cheapest remaining candidate first" },
      { id: 'b', text: 'It is simply an assumption the algorithm makes without any real guarantee' },
      { id: 'c', text: "It only works because the graph in this example happens to be small" },
      { id: 'd', text: 'The order nodes are closed in has no bearing on correctness' },
    ],
    correctOptionId: 'a',
    explanation:
      "This is the heart of Dijkstra's correctness proof: with non-negative weights, any path through an unclosed node would already cost at least as much as that unclosed node's own (still tentative, but already-known) cost — which is, by construction, no cheaper than the node currently being closed. So no better path can be hiding in the unexplored part of the graph.",
  },
  {
    id: 'dijkstra-hard-s1-q5',
    type: 'execution',
    prompt: "C has just been visited, and the algorithm highlights the edge C-E as it checks that neighbor. Why is this edge marked 'compare' rather than 'path'?",
    visualization: { graph: DIJKSTRA_TEST_GRAPH, start: 'A', end: 'F', frameIndex: 13 },
    options: [
      { id: 'a', text: "'compare' marks an edge being evaluated for a possible cost improvement — it only becomes 'path' afterward, once the comparison on line 8 actually succeeds and the cost is updated" },
      { id: 'b', text: "'compare' and 'path' mean exactly the same thing, just for different algorithms" },
      { id: 'c', text: "This edge is marked 'compare' because it will never be used in the final path" },
      { id: 'd', text: "'compare' means the edge has already been permanently rejected" },
    ],
    correctOptionId: 'a',
    explanation:
      "The two tags represent two different stages of the same edge's story: 'compare' is 'currently being evaluated' (line 7-8), and 'path' is 'confirmed as part of the current best-known route' — which only happens if that evaluation actually finds a cheaper cost (line 9).",
  },
  {
    id: 'dijkstra-hard-s1-q6',
    type: 'execution',
    prompt: "The open set now holds only E (cost 5), and the algorithm is about to sort and pick the next node. What can you conclude, given that B (cost 4) was already closed earlier?",
    visualization: { graph: DIJKSTRA_TEST_GRAPH, start: 'A', end: 'F', frameIndex: 24 },
    options: [
      { id: 'a', text: 'E will be picked next, since it\'s the only entry — and its cost of 5 is now guaranteed final the moment it\'s closed, since no unclosed node can offer a cheaper path to it' },
      { id: 'b', text: "E's cost is still likely to be lowered later, since it hasn't been closed yet" },
      { id: 'c', text: "The algorithm has already found the shortest path to every node in the graph" },
      { id: 'd', text: 'B will be reopened, since E is more expensive to reach than B was' },
    ],
    correctOptionId: 'a',
    explanation:
      "With only one entry in the open set, E is guaranteed to be picked next regardless of sorting — and since every other node already discovered is either closed (A, C, B) or costs at least as much, closing E here is safe under the same greedy guarantee that makes Dijkstra correct.",
  },
  {
    id: 'dijkstra-hard-s1-q7',
    type: 'execution',
    prompt: "F has just been moved to the closed set after being picked as \"current\". What check happens immediately after this, and what will it find?",
    visualization: { graph: DIJKSTRA_TEST_GRAPH, start: 'A', end: 'F', frameIndex: 37 },
    options: [
      { id: 'a', text: "Line 5's check (current == end) runs next, and since F is the destination, it will succeed — ending the main loop and triggering the path reconstruction" },
      { id: 'b', text: "The algorithm checks F's neighbors before doing anything else" },
      { id: 'c', text: 'The algorithm reopens every previously closed node to double-check their costs' },
      { id: 'd', text: 'Nothing happens differently than for any other node being closed' },
    ],
    correctOptionId: 'a',
    explanation:
      "Line 5 runs right after a node is chosen as current — before its neighbors are even examined — specifically to catch this exact moment: the destination has just become the cheapest remaining node, so its cost is final and the search can stop immediately.",
  },
  {
    id: 'dijkstra-hard-s1-q8',
    type: 'code',
    prompt: 'Fill in the blank on line 4 — how is the next node to process actually removed from the open set?',
    codeLines: CODE_GROUP_1_LINES(),
    options: [
      { id: 'a', text: 'shift' },
      { id: 'b', text: 'pop' },
      { id: 'c', text: 'sort' },
      { id: 'd', text: 'peek' },
    ],
    correctOptionId: 'a',
    explanation:
      "After sorting the open set with the cheapest node first, shift() removes exactly that front entry. The other two blanks in this snippet (lines 8 and 9) are covered by the next two questions.",
  },
  {
    id: 'dijkstra-hard-s1-q9',
    type: 'code',
    prompt: 'Fill in the blank on line 8 — what comparison decides whether a neighbor\'s cost gets updated?',
    codeLines: CODE_GROUP_1_LINES(),
    options: [
      { id: 'a', text: '<' },
      { id: 'b', text: '>' },
      { id: 'c', text: '==' },
      { id: 'd', text: '>=' },
    ],
    correctOptionId: 'a',
    explanation:
      "Only a strictly cheaper cost should ever overwrite the current one — '<' captures exactly that. The remaining blank in this snippet (line 9) is covered by the next question.",
  },
  {
    id: 'dijkstra-hard-s1-q10',
    type: 'code',
    prompt: 'Fill in the blank on line 9 — once a neighbor\'s cost improves, what operation adds it to the open set?',
    codeLines: CODE_GROUP_1_LINES(),
    options: [
      { id: 'a', text: 'push' },
      { id: 'b', text: 'pop' },
      { id: 'c', text: 'shift' },
      { id: 'd', text: 'sort' },
    ],
    correctOptionId: 'a',
    explanation:
      "push() adds the neighbor into the open set so it can eventually be picked up and processed — in the pseudocode's simplified view, this runs every time a cheaper cost is found (the actual implementation additionally checks it isn't already there, per the earlier conceptual question about duplicate entries).",
  },
];
