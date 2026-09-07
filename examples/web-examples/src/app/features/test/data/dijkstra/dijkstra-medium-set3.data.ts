import type { TestQuestion } from '../../test.types';
import { DIJKSTRA_TEST_GRAPH } from './dijkstra-graph.data';

// Set 3 / Medium for Dijkstra.
export const DIJKSTRA_MEDIUM_SET_3: TestQuestion[] = [
  {
    id: 'dijkstra-medium-s3-q1',
    type: 'conceptual',
    prompt: "On this graph, D's cost is updated twice — first to 14 (via B), then later lowered to 9 (via E). Why doesn't this ever happen to a node after it's been closed?",
    options: [
      { id: 'a', text: "Because a node is only closed once it's the cheapest remaining option in the open set — and since all edge weights are non-negative, nothing discovered afterward could ever produce a cheaper route to it" },
      { id: 'b', text: "Because the code explicitly forbids updating any node's cost more than once" },
      { id: 'c', text: 'Because closed nodes are deleted from the graph entirely' },
      { id: 'd', text: "It can happen after closing too, but the algorithm ignores it" },
    ],
    correctOptionId: 'a',
    explanation:
      "D stayed open exactly because it wasn't yet the cheapest option, which is precisely why it could still improve. Once a node like A, C, B, or E gets closed, it's provably already at its true minimum cost — that's the whole guarantee the greedy 'always pick cheapest open node' strategy provides.",
  },
  {
    id: 'dijkstra-medium-s3-q2',
    type: 'conceptual',
    prompt: 'How does Dijkstra keep track of the actual shortest path (not just its total cost) from the start to a given node?',
    options: [
      { id: 'a', text: 'By recording, each time a node\'s cost improves, which edge produced that cheaper cost — tracing those edges backward from a node reconstructs its full path' },
      { id: 'b', text: 'By storing every single path ever considered and picking the shortest one at the very end' },
      { id: 'c', text: "It doesn't — Dijkstra can only report the total cost, never the actual path" },
      { id: 'd', text: 'By re-running the entire algorithm once for every possible path' },
    ],
    correctOptionId: 'a',
    explanation:
      "Every time line 9 updates a neighbor's cost, it also implicitly means \"the best way to reach this neighbor right now is through the current node.\" Following that chain of \"reached through\" links backward from any node all the way to the start reconstructs the shortest path to it.",
  },
  {
    id: 'dijkstra-medium-s3-q3',
    type: 'conceptual',
    prompt: "If this implementation were changed so the open set was never sorted, and the FIRST entry (not necessarily the cheapest) were always shifted off instead, would the result still be correct?",
    options: [
      { id: 'a', text: 'No — the algorithm depends on always processing the cheapest available node next; without that, a node could be closed (marked final) before its true shortest cost is found' },
      { id: 'b', text: 'Yes, the result would be identical either way, just potentially slower' },
      { id: 'c', text: "Yes, as long as the graph has no cycles" },
      { id: 'd', text: 'It would only break on graphs with more than five nodes' },
    ],
    correctOptionId: 'a',
    explanation:
      "The 'always pick cheapest' rule is what makes closing a node safe. Remove that guarantee, and a node could get closed while its true shortest cost is still sitting undiscovered on the open set — corrupting the final result rather than just slowing it down.",
  },
  {
    id: 'dijkstra-medium-s3-q4',
    type: 'execution',
    prompt: "C has just been visited, and the algorithm checks C's only neighbor, E, for the very first time. What happens?",
    visualization: { graph: DIJKSTRA_TEST_GRAPH, start: 'A', end: 'F', frameIndex: 15 },
    options: [
      { id: 'a', text: 'E is added to the open set with a cost of 5 (2 + 3), and the current best path to E runs through C' },
      { id: 'b', text: "E's cost is set to 3, the weight of the edge alone, without adding C's own cost" },
      { id: 'c', text: 'E is moved directly to the closed set, skipping the open set entirely' },
      { id: 'd', text: "The algorithm ignores E because it's not directly connected to the start node A" },
    ],
    correctOptionId: 'a',
    explanation:
      "The tentative cost for E is C's own cost (2) plus the weight of the C-E edge (3), giving 5. Since this is E's first-ever cost, it's accepted immediately and E is added to the open set with the path currently running through C.",
  },
  {
    id: 'dijkstra-medium-s3-q5',
    type: 'execution',
    prompt: 'The open set now holds B (cost 4) and E (cost 5), and is about to be sorted. Which node gets processed next?',
    visualization: { graph: DIJKSTRA_TEST_GRAPH, start: 'A', end: 'F', frameIndex: 16 },
    options: [
      { id: 'a', text: 'B, since its cost of 4 is lower than E\'s cost of 5' },
      { id: 'b', text: 'E, since it was discovered more recently' },
      { id: 'c', text: 'Both nodes are processed in the same step' },
      { id: 'd', text: 'Neither — the algorithm terminates here since two nodes are tied for closest' },
    ],
    correctOptionId: 'a',
    explanation:
      'Sorting by cost consistently puts the lower value first — 4 for B versus 5 for E — so B is next in line to be shifted off and processed, even though it isn\'t on the graph\'s eventual shortest path to F.',
  },
  {
    id: 'dijkstra-medium-s3-q6',
    type: 'execution',
    prompt: 'The destination node F has just been picked as "current" — the very moment line 5\'s check succeeds. What happens next?',
    visualization: { graph: DIJKSTRA_TEST_GRAPH, start: 'A', end: 'F', frameIndex: 38 },
    options: [
      { id: 'a', text: 'The algorithm stops the main loop and traces the shortest path backward from F, highlighting the final route: A - C - E - F' },
      { id: 'b', text: "The algorithm keeps running until every other node has also been closed" },
      { id: 'c', text: "F's cost is recalculated one more time before the path is returned" },
      { id: 'd', text: "The algorithm restarts entirely, this time treating F as the new start node" },
    ],
    correctOptionId: 'a',
    explanation:
      "Line 5's whole purpose is to end the search the instant the destination is confirmed as the cheapest remaining node, since there's no need to keep exploring more expensive alternatives — the path is then reconstructed by walking the 'reached through' links backward from F.",
  },
  {
    id: 'dijkstra-medium-s3-q7',
    type: 'code',
    prompt: "Fill in the blank in Dijkstra's pseudocode:",
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function dijkstra(graph, start, end):', kind: 'plain' }] },
      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'cost[start] = 0, open = [start]', kind: 'plain' }] },
      { lineNumber: 3, indentLevel: 1, tokens: [{ text: 'while open is not empty:', kind: 'plain' }] },
      { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'sort open by cost, current = open.shift()', kind: 'plain' }] },
      { lineNumber: 5, indentLevel: 2, tokens: [{ text: 'if current == end: return path', kind: 'plain' }] },
      { lineNumber: 6, indentLevel: 2, tokens: [{ text: 'for neighbor in graph[current]:', kind: 'plain' }] },
      { lineNumber: 7, indentLevel: 3, tokens: [{ text: 'newCost = cost[current] + weight', kind: 'plain' }] },
      { lineNumber: 8, indentLevel: 3, tokens: [{ text: 'if newCost < cost[neighbor]:', kind: 'plain' }] },
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
    ],
    options: [
      { id: 'a', text: 'push' },
      { id: 'b', text: 'pop' },
      { id: 'c', text: 'shift' },
      { id: 'd', text: 'remove' },
    ],
    correctOptionId: 'a',
    explanation:
      "Once a neighbor's cost has just improved, it needs to be added to the open set so it eventually gets processed itself — push() adds it in, ready to be picked up whenever it becomes the cheapest remaining option.",
  },
];
