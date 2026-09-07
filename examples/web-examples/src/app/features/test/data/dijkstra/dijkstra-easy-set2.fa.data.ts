import type { TestQuestion } from '../../test.types';
import { DIJKSTRA_TEST_GRAPH } from './dijkstra-graph.data';

// Set 2 / Easy for Dijkstra.
export const DIJKSTRA_EASY_SET_2_FA: TestQuestion[] = [
  {
    id: 'dijkstra-easy-s2-q1',
    type: 'conceptual',
    prompt: "What does a node's \"cost\" represent while Dijkstra's algorithm is running?",
    options: [
      { id: 'a', text: 'The cheapest total distance found so far from the start node to that node — it can still improve until the node is closed' },
      { id: 'b', text: "The node's fixed distance from the start, decided before the algorithm even begins" },
      { id: 'c', text: 'The number of edges connected to that node' },
      { id: 'd', text: 'The alphabetical position of the node\'s label' },
    ],
    correctOptionId: 'a',
    explanation:
      'Cost starts as a placeholder (conceptually infinite for every node except the start) and only ever gets lower, each time a cheaper path through some other node is discovered — line 9 is the only place it changes.',
  },
  {
    id: 'dijkstra-easy-s2-q2',
    type: 'conceptual',
    prompt: 'What is the difference between the "open set" and the "closed set"?',
    options: [
      { id: 'a', text: 'The open set holds nodes that have been discovered but not yet fully processed; the closed set holds nodes whose shortest cost is already final' },
      { id: 'b', text: 'The open set holds nodes with even-numbered costs, the closed set holds nodes with odd-numbered costs' },
      { id: 'c', text: 'The open set is used only at the very start, and the closed set is used for everything after' },
      { id: 'd', text: 'There is no meaningful difference between them' },
    ],
    correctOptionId: 'a',
    explanation:
      "A node moves from open to closed the moment it's picked as 'current' and processed (line 4). Once closed, its cost is treated as settled, while open still holds every node that has been reached but not yet had its own neighbors checked.",
  },
  {
    id: 'dijkstra-easy-s2-q3',
    type: 'execution',
    prompt: "A has just been visited, and the algorithm is now checking A's neighbor B. What is happening at this step?",
    visualization: { graph: DIJKSTRA_TEST_GRAPH, start: 'A', end: 'F', frameIndex: 4 },
    options: [
      { id: 'a', text: "The algorithm is comparing the cost of reaching B through A against B's current known cost, to see if this is an improvement" },
      { id: 'b', text: 'B is being moved directly into the closed set without any comparison' },
      { id: 'c', text: 'The edge between A and B is being permanently removed from the graph' },
      { id: 'd', text: 'The algorithm has already decided B will be the next node visited' },
    ],
    correctOptionId: 'a',
    explanation:
      "This is line 7's newCost calculation, immediately followed by line 8's comparison against B's current cost — the highlighted edge marks that this specific A-to-B connection is what's being evaluated right now.",
  },
  {
    id: 'dijkstra-easy-s2-q4',
    type: 'execution',
    prompt: "B has just been discovered as a new node and added to the open set, with its cost updated to 4 (the weight of the edge from A). What does this tell you?",
    visualization: { graph: DIJKSTRA_TEST_GRAPH, start: 'A', end: 'F', frameIndex: 6 },
    options: [
      { id: 'a', text: "Going from A directly to B costs 4, which is currently the cheapest known way to reach B — though a cheaper route could still be found later" },
      { id: 'b', text: "B's cost of 4 is now permanent and can never change again" },
      { id: 'c', text: "B has already been fully processed and moved to the closed set" },
      { id: 'd', text: 'The total shortest path from A to the destination is 4' },
    ],
    correctOptionId: 'a',
    explanation:
      "Since the direct edge A-B has weight 4, and A's own cost is 0, the tentative cost for B becomes 0 + 4 = 4. This value can still be lowered later if some other path to B turns out cheaper — it only becomes final once B itself is closed.",
  },
  {
    id: 'dijkstra-easy-s2-q5',
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
      {
        lineNumber: 8,
        indentLevel: 3,
        tokens: [
          { text: 'if newCost ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ' cost[neighbor]:', kind: 'plain' },
        ],
      },
      { lineNumber: 9, indentLevel: 4, tokens: [{ text: 'cost[neighbor] = newCost, open.push(neighbor)', kind: 'plain' }] },
      { lineNumber: 10, indentLevel: 1, tokens: [{ text: 'return no path', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: '<' },
      { id: 'b', text: '>' },
      { id: 'c', text: '<=' },
      { id: 'd', text: '==' },
    ],
    correctOptionId: 'a',
    explanation:
      "A neighbor's cost should only be updated when a strictly cheaper path has been found — that's what '<' checks. Using '>' would keep only the most expensive path instead of the cheapest, which defeats the entire point of the algorithm.",
  },
];
