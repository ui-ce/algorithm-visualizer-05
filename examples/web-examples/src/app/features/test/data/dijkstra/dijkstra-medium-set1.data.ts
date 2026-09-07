import type { TestQuestion } from '../../test.types';
import { DIJKSTRA_TEST_GRAPH } from './dijkstra-graph.data';

// Set 1 / Medium for Dijkstra. Order: 3 conceptual, 3 execution, 1 code.
export const DIJKSTRA_MEDIUM_SET_1: TestQuestion[] = [
  {
    id: 'dijkstra-medium-s1-q1',
    type: 'conceptual',
    prompt: "How does this implementation decide which node in the open set to process next, step by step?",
    options: [
      { id: 'a', text: 'It sorts the entire open set by cost every single iteration, then removes the first (cheapest) entry' },
      { id: 'b', text: 'It removes whichever node was added to the open set first, ignoring cost entirely' },
      { id: 'c', text: 'It picks a node at random from the open set' },
      { id: 'd', text: 'It only sorts the open set once, at the very start of the algorithm' },
    ],
    correctOptionId: 'a',
    explanation:
      "Line 4 runs 'sort open by cost' inside the main while loop, so it re-sorts on every single iteration — not just once — since new nodes with new costs keep getting added to the open set as the algorithm progresses.",
  },
  {
    id: 'dijkstra-medium-s1-q2',
    type: 'conceptual',
    prompt: 'Once a node has been moved to the closed set, can this implementation still change its cost later?',
    options: [
      { id: 'a', text: "The code technically doesn't prevent line 9 from updating a closed node's cost value, but that update is harmless — since the node is closed, it's never re-added to the open set or reprocessed, so the change has no effect on the final result" },
      { id: 'b', text: "No — the code explicitly checks the closed set before ever comparing costs" },
      { id: 'c', text: "Yes, and this actually changes the final answer, since closed nodes get reprocessed" },
      { id: 'd', text: 'Cost values become read-only the instant a node is created' },
    ],
    correctOptionId: 'a',
    explanation:
      "Line 8's comparison doesn't check whether neighbor is already closed — but because Dijkstra guarantees a closed node's cost is already the true shortest one (as long as weights are non-negative), no later comparison could actually produce a smaller value anyway, so this gap in the logic never causes an incorrect result.",
  },
  {
    id: 'dijkstra-medium-s1-q3',
    type: 'conceptual',
    prompt: 'What is the relationship between Dijkstra\'s algorithm and BFS?',
    options: [
      { id: 'a', text: 'If every edge in the graph has the same weight (say, 1), Dijkstra behaves identically to BFS, since "cheapest cost" becomes the same as "fewest edges"' },
      { id: 'b', text: 'They are completely unrelated algorithms that happen to both use graphs' },
      { id: 'c', text: 'Dijkstra is just BFS run in reverse, from the destination to the start' },
      { id: 'd', text: 'BFS is a special case of Dijkstra that only works on trees' },
    ],
    correctOptionId: 'a',
    explanation:
      'BFS finds the path with the fewest edges; Dijkstra finds the path with the lowest total weight. When every edge weighs exactly the same, minimizing total weight and minimizing edge count become the same problem, so the two algorithms end up producing identical results.',
  },
  {
    id: 'dijkstra-medium-s1-q4',
    type: 'execution',
    prompt: "B has just been visited and moved to the closed set. The algorithm is now checking B's neighbor C — but C was already closed earlier. What happens here?",
    visualization: { graph: DIJKSTRA_TEST_GRAPH, start: 'A', end: 'F', frameIndex: 19 },
    options: [
      { id: 'a', text: "The tentative cost through B (0 + 4 + 5 = 9) is compared against C's current cost (2) anyway — since 9 is not cheaper, nothing changes" },
      { id: 'b', text: "C is skipped entirely without any comparison, since it's already closed" },
      { id: 'c', text: 'C is reopened and moved back into the open set' },
      { id: 'd', text: "The algorithm raises an error, since C shouldn't be revisited" },
    ],
    correctOptionId: 'a',
    explanation:
      "The code doesn't special-case closed neighbors — it still computes newCost and compares it on line 8. Here, 9 is worse than C's existing cost of 2, so the comparison simply fails and nothing is updated, exactly as it should be.",
  },
  {
    id: 'dijkstra-medium-s1-q5',
    type: 'execution',
    prompt: "B has just been checked against its neighbor D, and D turns out to be a brand-new node. D's cost is set to 14 (the cost through B). Is this D's final cost?",
    visualization: { graph: DIJKSTRA_TEST_GRAPH, start: 'A', end: 'F', frameIndex: 22 },
    options: [
      { id: 'a', text: "No — 14 is just the best cost found so far. It can still be lowered if a cheaper path to D is discovered before D itself is closed" },
      { id: 'b', text: 'Yes, once any cost is assigned to a node it never changes again' },
      { id: 'c', text: "No, but only because D has more than one neighbor" },
      { id: 'd', text: 'It is impossible for a node\'s cost to be updated more than once' },
    ],
    correctOptionId: 'a',
    explanation:
      "D's cost is only final once D itself is popped as \"current\" and moved to the closed set. Until then, it stays open to being lowered — and on this exact graph, D's cost does get improved from 14 down to 9 shortly after, once E is processed.",
  },
  {
    id: 'dijkstra-medium-s1-q6',
    type: 'execution',
    prompt: "E has just been visited. The algorithm checks E's neighbor D — which already has a cost of 14 from earlier — and finds a cheaper route through E. What happens?",
    visualization: { graph: DIJKSTRA_TEST_GRAPH, start: 'A', end: 'F', frameIndex: 27 },
    options: [
      { id: 'a', text: "D's cost is lowered from 14 to 9 (5 + 4), and the best-known path to D now runs through E instead of B" },
      { id: 'b', text: "D's cost stays at 14, since a node's cost can only be set once" },
      { id: 'c', text: 'D is removed from the open set because its cost changed' },
      { id: 'd', text: "Both the old and new costs for D are kept and averaged" },
    ],
    correctOptionId: 'a',
    explanation:
      "This is exactly the scenario line 8's check exists for: the tentative cost through E (cost[E]=5, plus the E-D edge weight of 4) comes to 9, which is cheaper than D's current cost of 14 — so D's cost updates, and the path-tracking data is updated to reflect the new, cheaper route through E.",
  },
  {
    id: 'dijkstra-medium-s1-q7',
    type: 'code',
    prompt: "Fill in the blank in Dijkstra's pseudocode:",
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function dijkstra(graph, start, end):', kind: 'plain' }] },
      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'cost[start] = 0, open = [start]', kind: 'plain' }] },
      { lineNumber: 3, indentLevel: 1, tokens: [{ text: 'while open is not empty:', kind: 'plain' }] },
      { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'sort open by cost, current = open.shift()', kind: 'plain' }] },
      { lineNumber: 5, indentLevel: 2, tokens: [{ text: 'if current == end: return path', kind: 'plain' }] },
      { lineNumber: 6, indentLevel: 2, tokens: [{ text: 'for neighbor in graph[current]:', kind: 'plain' }] },
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
    ],
    options: [
      { id: 'a', text: 'weight' },
      { id: 'b', text: 'newCost' },
      { id: 'c', text: 'cost[neighbor]' },
      { id: 'd', text: '1' },
    ],
    correctOptionId: 'a',
    explanation:
      "The tentative cost of reaching a neighbor is the cost of reaching the current node plus the weight of the edge connecting them — that edge weight is what gets added here.",
  },
];
