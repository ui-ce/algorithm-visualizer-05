import type { TestQuestion } from '../../test.types';
import { DIJKSTRA_TEST_GRAPH } from './dijkstra-graph.data';

// Set 2 / Medium for Dijkstra.
export const DIJKSTRA_MEDIUM_SET_2: TestQuestion[] = [
  {
    id: 'dijkstra-medium-s2-q1',
    type: 'conceptual',
    prompt: 'What is the time complexity of this specific implementation, given that it re-sorts the entire open set on every iteration of the main loop?',
    options: [
      { id: 'a', text: "Noticeably worse than the classic O((V + E) log V) bound, since sorting the open set from scratch every iteration is more expensive than using a proper priority queue" },
      { id: 'b', text: 'Exactly O((V + E) log V), identical to the most efficient known implementation' },
      { id: 'c', text: 'O(1), since sorting a small array is effectively instant' },
      { id: 'd', text: 'O(V), the same as a single pass over the open set' },
    ],
    correctOptionId: 'a',
    explanation:
      "A proper priority-queue-based Dijkstra only pays a logarithmic cost each time a node is inserted or extracted. Re-sorting the whole open set from scratch every iteration (as this pseudocode does) repeats work a priority queue would have already accounted for, making it strictly less efficient on larger graphs even though it produces the same correct result.",
  },
  {
    id: 'dijkstra-medium-s2-q2',
    type: 'conceptual',
    prompt: 'What is a common way to make Dijkstra more efficient than repeatedly sorting a plain array?',
    options: [
      { id: 'a', text: 'Use a min-heap (priority queue) for the open set, so both inserting a new node and extracting the cheapest one take logarithmic time instead of a full sort' },
      { id: 'b', text: 'Skip updating the cost of any node more than once' },
      { id: 'c', text: 'Run the algorithm twice and keep whichever result finishes first' },
      { id: 'd', text: 'Remove the closed set entirely to save memory' },
    ],
    correctOptionId: 'a',
    explanation:
      "A min-heap keeps the cheapest entry accessible in O(log V) time without needing to re-sort everything else. This is the standard optimization that gets Dijkstra's complexity down to O((V + E) log V) on a graph with V vertices and E edges.",
  },
  {
    id: 'dijkstra-medium-s2-q3',
    type: 'conceptual',
    prompt: "Is it possible for this Dijkstra implementation to visit (move to the closed set) a node that is not on the shortest path from start to end?",
    options: [
      { id: 'a', text: "Yes — the algorithm keeps closing nodes in increasing order of cost until it happens to close the destination; any node cheaper to reach than the destination gets closed along the way, whether or not it's on the final path" },
      { id: 'b', text: "No — Dijkstra only ever visits nodes that lie exactly on the final shortest path" },
      { id: 'c', text: 'It only happens if the graph contains a cycle' },
      { id: 'd', text: 'It only happens if the destination node has more than one incoming edge' },
    ],
    correctOptionId: 'a',
    explanation:
      "On this graph, B gets closed even though the final shortest path (A-C-E-F) never passes through B — B is simply cheaper to reach than the destination, so it gets processed along the way before the algorithm reaches F.",
  },
  {
    id: 'dijkstra-medium-s2-q4',
    type: 'execution',
    prompt: "E has just been visited, and the algorithm checks E's neighbor F for the first time. F has never been discovered before this. What happens?",
    visualization: { graph: DIJKSTRA_TEST_GRAPH, start: 'A', end: 'F', frameIndex: 30 },
    options: [
      { id: 'a', text: 'F is added to the open set with a cost of 13 (5 + 8), and the current best path to F runs through E' },
      { id: 'b', text: 'F is immediately moved to the closed set, since it is the destination' },
      { id: 'c', text: "F's cost is set to 8, ignoring E's own cost entirely" },
      { id: 'd', text: 'The algorithm terminates as soon as F is discovered, without processing it further' },
    ],
    correctOptionId: 'a',
    explanation:
      "The tentative cost for F through E is cost[E] (5) plus the E-F edge weight (8), giving 13. Since F had no previous cost to compare against, this becomes F's first known cost, and F is added to the open set to be processed later.",
  },
  {
    id: 'dijkstra-medium-s2-q5',
    type: 'execution',
    prompt: "The open set now holds D (cost 9) and F (cost 13), and is about to be sorted. Which one will be processed next, and why?",
    visualization: { graph: DIJKSTRA_TEST_GRAPH, start: 'A', end: 'F', frameIndex: 31 },
    options: [
      { id: 'a', text: 'D, since its cost (9) is lower than F\'s cost (13), and the open set is always sorted cheapest-first' },
      { id: 'b', text: 'F, since it was discovered second and the open set works like a stack' },
      { id: 'c', text: 'Both are processed together in the same step' },
      { id: 'd', text: 'Whichever one has fewer neighbors gets processed first' },
    ],
    correctOptionId: 'a',
    explanation:
      "Sorting by cost always puts the cheapest entry first — with D at 9 and F at 13, D sorts ahead of F and will be the next one shifted off the open set and processed.",
  },
  {
    id: 'dijkstra-medium-s2-q6',
    type: 'execution',
    prompt: 'D has just been visited, and the algorithm checks D\'s only neighbor, F — which already has a cost of 13 from an earlier discovery. What happens here?',
    visualization: { graph: DIJKSTRA_TEST_GRAPH, start: 'A', end: 'F', frameIndex: 34 },
    options: [
      { id: 'a', text: 'The tentative cost through D (9 + 11 = 20) is compared against F\'s current cost (13) — since 20 is worse, F\'s cost stays at 13' },
      { id: 'b', text: "F's cost is overwritten with 20, since D was just visited" },
      { id: 'c', text: 'F is removed from the open set because two different nodes both claim to reach it' },
      { id: 'd', text: 'The algorithm ends immediately, since D is the second-to-last node' },
    ],
    correctOptionId: 'a',
    explanation:
      "This shows the update check working as a safeguard, not just a formality: the route through D turns out to be worse (20) than the existing route through E (13), so line 8's comparison correctly rejects the update and F keeps its cheaper, already-known cost.",
  },
  {
    id: 'dijkstra-medium-s2-q7',
    type: 'code',
    prompt: "Fill in the blank in Dijkstra's pseudocode:",
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function dijkstra(graph, start, end):', kind: 'plain' }] },
      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'cost[start] = 0, open = [start]', kind: 'plain' }] },
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
      { lineNumber: 7, indentLevel: 3, tokens: [{ text: 'newCost = cost[current] + weight', kind: 'plain' }] },
      { lineNumber: 8, indentLevel: 3, tokens: [{ text: 'if newCost < cost[neighbor]:', kind: 'plain' }] },
      { lineNumber: 9, indentLevel: 4, tokens: [{ text: 'cost[neighbor] = newCost, open.push(neighbor)', kind: 'plain' }] },
      { lineNumber: 10, indentLevel: 1, tokens: [{ text: 'return no path', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: 'graph[current]' },
      { id: 'b', text: 'open' },
      { id: 'c', text: 'closed' },
      { id: 'd', text: 'cost' },
    ],
    correctOptionId: 'a',
    explanation:
      "The loop needs to examine the current node's own neighbors — the ones directly connected to it in the graph — which is exactly what graph[current] looks up.",
  },
];
