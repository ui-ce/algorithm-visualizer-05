import type { TestQuestion } from '../../test.types';
import { DIJKSTRA_TEST_GRAPH } from './dijkstra-graph.data';

// Set 2 / Hard for Dijkstra. Order: 4 conceptual, 3 execution, 3 code.
//
// The three code questions (q8, q9, q10) share one snippet with three
// blanks (line 2's initial cost, line 6's neighbor source, and line
// 7's weight term) all shown at once — same consistency rule as Hard
// Set 1's code group.
const CODE_GROUP_2_LINES = (): TestQuestion['codeLines'] => [
  { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function dijkstra(graph, start, end):', kind: 'plain' }] },
  {
    lineNumber: 2,
    indentLevel: 1,
    tokens: [
      { text: 'cost[start] = ', kind: 'plain' },
      { text: '____', kind: 'blank' },
      { text: ', open = [start]', kind: 'plain' },
    ],
  },
  { lineNumber: 3, indentLevel: 1, tokens: [{ text: 'while open is not empty:', kind: 'plain' }] },
  { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'sort open by cost, current = open.shift()', kind: 'plain' }] },
  { lineNumber: 5, indentLevel: 2, tokens: [{ text: 'if current == end: return path', kind: 'plain' }] },
  {
    lineNumber: 6,
    indentLevel: 2,
    tokens: [
      { text: 'for neighbor in ', kind: 'plain' },
      { text: '____', kind: 'blank' },
      { text: ':', kind: 'plain' },
    ],
  },
  {
    lineNumber: 7,
    indentLevel: 3,
    tokens: [
      { text: 'newCost = cost[current] + ', kind: 'plain' },
      { text: '____', kind: 'blank' },
    ],
  },
  { lineNumber: 8, indentLevel: 3, tokens: [{ text: 'if newCost < cost[neighbor]:', kind: 'plain' }] },
  { lineNumber: 9, indentLevel: 4, tokens: [{ text: 'cost[neighbor] = newCost, open.push(neighbor)', kind: 'plain' }] },
  { lineNumber: 10, indentLevel: 1, tokens: [{ text: 'return no path', kind: 'plain' }] },
];

export const DIJKSTRA_HARD_SET_2: TestQuestion[] = [
  {
    id: 'dijkstra-hard-s2-q1',
    type: 'conceptual',
    prompt: 'What is the best-case time complexity of Dijkstra\'s algorithm, and how does it compare to the worst case?',
    options: [
      { id: 'a', text: "They are effectively the same — every vertex still has to be extracted from the open set and every edge still has to be examined, regardless of the specific weights or graph shape, unless the search ends early because the destination is reached" },
      { id: 'b', text: 'Best case is O(1), if the start node happens to equal the end node' },
      { id: 'c', text: 'Best case is always O(V), while worst case is always O(V^2), with nothing in between' },
      { id: 'd', text: 'Dijkstra has no meaningful worst case, since it always finds the shortest path immediately' },
    ],
    correctOptionId: 'a',
    explanation:
      "Unlike a search that can get lucky and finish in one comparison, Dijkstra's cost-tracking approach has to fully process nodes in increasing cost order — the only real shortcut is line 5's early exit once the destination itself becomes the cheapest remaining node, which just reduces the constant factor, not the underlying complexity class.",
  },
  {
    id: 'dijkstra-hard-s2-q2',
    type: 'conceptual',
    prompt: "Suppose a graph has a negative-weight edge, but no negative cycle. Could Dijkstra still produce a wrong answer, even though a correct shortest path technically exists?",
    options: [
      { id: 'a', text: "Yes — Dijkstra can still close a node too early, locking in a cost that a later negative edge would have made cheaper, even though the graph itself has a well-defined shortest path" },
      { id: 'b', text: 'No — as long as there is no negative cycle, Dijkstra always finds the correct shortest path' },
      { id: 'c', text: 'Dijkstra would simply refuse to run at all if it saw a negative edge' },
      { id: 'd', text: 'A single negative edge always creates a negative cycle' },
    ],
    correctOptionId: 'a',
    explanation:
      "Dijkstra's guarantee depends on the assumption that a path can only get more expensive as it grows longer — a single negative edge breaks that assumption regardless of whether a full negative cycle exists, so the algorithm's greedy closing can still lock in a wrong, too-high cost. This is why Bellman-Ford (which handles negative edges correctly) is used instead when they might be present.",
  },
  {
    id: 'dijkstra-hard-s2-q3',
    type: 'conceptual',
    prompt: 'If Dijkstra is run without specifying an end node — letting it run until the open set is completely empty — what does it compute?',
    options: [
      { id: 'a', text: "The shortest-path cost from the start node to every other reachable node in the graph, not just one specific destination" },
      { id: 'b', text: "Nothing useful — Dijkstra requires an end node to produce any correct results at all" },
      { id: 'c', text: "The single longest path in the entire graph" },
      { id: 'd', text: 'Only the cost to the node with the fewest neighbors' },
    ],
    correctOptionId: 'a',
    explanation:
      "Removing line 5's early-exit check doesn't break anything — it just means the algorithm keeps closing nodes in increasing cost order until none are left, ending up with a correct shortest-path cost (and reconstructable path) to every node reachable from the start, which is exactly what's needed for a 'distances from start' map.",
  },
  {
    id: 'dijkstra-hard-s2-q4',
    type: 'conceptual',
    prompt: 'This implementation stores a single graph-wide "cost" table. Could two different Dijkstra searches (say, from two different start nodes) safely share that same table?',
    options: [
      { id: 'a', text: "No — the cost table is meaningful only relative to one specific start node; reusing it for a different start node would mix up costs computed from two entirely different origins" },
      { id: 'b', text: 'Yes, since cost values are always the same no matter which node the search starts from' },
      { id: 'c', text: "Yes, as long as the two start nodes are directly connected" },
      { id: 'd', text: 'It depends only on whether the graph is directed or undirected' },
    ],
    correctOptionId: 'a',
    explanation:
      "cost[start] = 0 and every other cost is computed relative to that specific starting point on line 2. A fresh Dijkstra run needs its own fresh cost table (and open/closed sets) — reusing stale values from a previous run with a different start would produce meaningless, mixed-origin results.",
  },
  {
    id: 'dijkstra-hard-s2-q5',
    type: 'execution',
    prompt: "This is the very first iteration, and cost[start] has just been set. Given that every other node's cost is conceptually infinite at this point, what is the only node that could possibly be picked first?",
    visualization: { graph: DIJKSTRA_TEST_GRAPH, start: 'A', end: 'F', frameIndex: 1 },
    options: [
      { id: 'a', text: 'A itself — it is the only node in the open set, and its cost of 0 is trivially the lowest possible' },
      { id: 'b', text: 'Whichever node has the most neighbors, regardless of cost' },
      { id: 'c', text: 'F, since it is the destination and gets priority' },
      { id: 'd', text: "It's impossible to know without examining every edge in the graph first" },
    ],
    correctOptionId: 'a',
    explanation:
      "At this very first step, the open set contains exactly one entry — the start node itself — so sorting by cost is trivial and A is guaranteed to be picked, regardless of what any other node's (still-undiscovered) cost will eventually turn out to be.",
  },
  {
    id: 'dijkstra-hard-s2-q6',
    type: 'execution',
    prompt: "B has just been closed. At this point, has the algorithm found the true shortest path from A to every node it has discovered so far?",
    visualization: { graph: DIJKSTRA_TEST_GRAPH, start: 'A', end: 'F', frameIndex: 18 },
    options: [
      { id: 'a', text: "Only for the nodes that are already closed (A, C, and now B) — D and E are still open, and their costs (14 and 5 respectively at this point) could still change before they're closed" },
      { id: 'b', text: 'Yes, every discovered node\'s cost is already final the moment it is discovered' },
      { id: 'c', text: "No node's cost is ever considered final until the entire algorithm finishes" },
      { id: 'd', text: 'Only A\'s cost is ever guaranteed to be correct' },
    ],
    correctOptionId: 'a',
    explanation:
      "This is the precise distinction between 'discovered' and 'closed': every closed node's cost is provably final, but an open node's cost is only the best found *so far* — exactly why D's cost of 14 here still has room to improve to 9 once E is processed shortly after.",
  },
  {
    id: 'dijkstra-hard-s2-q7',
    type: 'execution',
    prompt: 'At the moment F is discovered (added to the open set) via E, with a cost of 13, is it guaranteed that 13 will be F\'s final cost when it is eventually closed?',
    visualization: { graph: DIJKSTRA_TEST_GRAPH, start: 'A', end: 'F', frameIndex: 29 },
    options: [
      { id: 'a', text: "Not yet — F is only closed once it becomes the cheapest node in the open set; until then, a cheaper route (like the one later checked through D) could still be found, though on this graph none turns out to beat 13" },
      { id: 'b', text: "Yes — the very first cost assigned to any node is always its final cost" },
      { id: 'c', text: 'No node\'s cost can ever be trusted until every node in the graph has been discovered' },
      { id: 'd', text: 'F\'s cost is guaranteed final because it is the destination node' },
    ],
    correctOptionId: 'a',
    explanation:
      "Being the destination doesn't grant any special immunity — F's cost of 13 is still just the best-known value while F sits in the open set. It happens to survive unchanged (the later D-F route of 20 is worse), but that's a fact about this graph's specific weights, not a guarantee baked into being 'discovered'.",
  },
  {
    id: 'dijkstra-hard-s2-q8',
    type: 'code',
    prompt: 'Fill in the blank on line 2 — what should the start node\'s initial cost be?',
    codeLines: CODE_GROUP_2_LINES(),
    options: [
      { id: 'a', text: '0' },
      { id: 'b', text: 'Infinity' },
      { id: 'c', text: '1' },
      { id: 'd', text: 'undefined' },
    ],
    correctOptionId: 'a',
    explanation:
      "It costs nothing to be at your own starting point — cost[start] = 0 is the baseline every other tentative cost calculation builds on. The other two blanks in this snippet (lines 6 and 7) are covered by the next two questions.",
  },
  {
    id: 'dijkstra-hard-s2-q9',
    type: 'code',
    prompt: 'Fill in the blank on line 6 — where does the list of neighbors to check come from?',
    codeLines: CODE_GROUP_2_LINES(),
    options: [
      { id: 'a', text: 'graph[current]' },
      { id: 'b', text: 'open' },
      { id: 'c', text: 'cost' },
      { id: 'd', text: 'closed' },
    ],
    correctOptionId: 'a',
    explanation:
      "The algorithm needs to look up current's own connections in the graph — graph[current] returns exactly that list. The remaining blank in this snippet (line 7) is covered by the next question.",
  },
  {
    id: 'dijkstra-hard-s2-q10',
    type: 'code',
    prompt: "Fill in the blank on line 7 — what value is added to the current node's cost to get the tentative cost of a neighbor?",
    codeLines: CODE_GROUP_2_LINES(),
    options: [
      { id: 'a', text: 'weight' },
      { id: 'b', text: 'newCost' },
      { id: 'c', text: 'end' },
      { id: 'd', text: '0' },
    ],
    correctOptionId: 'a',
    explanation:
      "The cost of reaching a neighbor through the current node is the current node's own cost plus the weight of the specific edge connecting them — that edge weight is exactly what completes this calculation.",
  },
];
