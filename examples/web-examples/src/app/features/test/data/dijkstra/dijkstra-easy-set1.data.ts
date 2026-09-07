import type { TestQuestion } from '../../test.types';
import { DIJKSTRA_TEST_GRAPH } from './dijkstra-graph.data';

// Set 1 / Easy for Dijkstra. Order: 2 conceptual, 2 execution, 1 code.
export const DIJKSTRA_EASY_SET_1: TestQuestion[] = [
  {
    id: 'dijkstra-easy-s1-q1',
    type: 'conceptual',
    prompt: "What problem does Dijkstra's algorithm solve?",
    options: [
      { id: 'a', text: 'Finding the shortest (lowest total cost) path from a start node to every other node in a weighted graph' },
      { id: 'b', text: 'Visiting every node in a graph as deep as possible before backtracking' },
      { id: 'c', text: 'Sorting the nodes of a graph by how many neighbors they have' },
      { id: 'd', text: 'Finding whether a graph contains a cycle' },
    ],
    correctOptionId: 'a',
    explanation:
      "Dijkstra keeps a running \"cheapest known cost so far\" for every node and only ever updates it when a genuinely cheaper path is found, which is exactly what guarantees the final costs are the true shortest distances.",
  },
  {
    id: 'dijkstra-easy-s1-q2',
    type: 'conceptual',
    prompt: 'Why does Dijkstra always pick the lowest-cost node in the open set to process next?',
    options: [
      { id: 'a', text: 'Because once a node has the lowest cost among all remaining candidates, no future path through a more expensive node could ever beat it — its cost is already final' },
      { id: 'b', text: 'Because it makes the algorithm visit nodes in alphabetical order' },
      { id: 'c', text: 'Because the lowest-cost node always has the fewest neighbors' },
      { id: 'd', text: 'It is an arbitrary choice with no effect on correctness' },
    ],
    correctOptionId: 'a',
    explanation:
      "This is the core greedy idea behind Dijkstra: as long as every edge weight is non-negative, a path can only get more expensive by adding more edges — so the cheapest node in the open set can never be beaten by a longer route discovered later.",
  },
  {
    id: 'dijkstra-easy-s1-q3',
    type: 'execution',
    prompt: 'The algorithm has just started. What are the contents of the open set and the closed set right now?',
    visualization: { graph: DIJKSTRA_TEST_GRAPH, start: 'A', end: 'F', frameIndex: 0 },
    options: [
      { id: 'a', text: 'The open set contains only the start node A, and the closed set is empty' },
      { id: 'b', text: 'The open set is empty, and the closed set contains only A' },
      { id: 'c', text: 'Both the open set and the closed set contain every node in the graph' },
      { id: 'd', text: 'The open set contains every node except A' },
    ],
    correctOptionId: 'a',
    explanation:
      "Line 2 initializes cost[start] = 0 and open = [start] — so at the very beginning, A is the only entry in the open set, and nothing has been moved to the closed set yet.",
  },
  {
    id: 'dijkstra-easy-s1-q4',
    type: 'execution',
    prompt: 'Node A has just been moved from the open set to the closed set. What does this tell you about A?',
    visualization: { graph: DIJKSTRA_TEST_GRAPH, start: 'A', end: 'F', frameIndex: 3 },
    options: [
      { id: 'a', text: "A is now considered fully processed — its shortest-path cost (0) is final, and the algorithm moves on to check A's neighbors" },
      { id: 'b', text: 'A has been removed from the graph entirely' },
      { id: 'c', text: "A's cost can still change later in the run" },
      { id: 'd', text: 'The algorithm has finished, since A is the start node' },
    ],
    correctOptionId: 'a',
    explanation:
      "Moving a node to the closed set (line 3's 'Visiting a node' step) marks it as done — its cost is locked in, and the very next step is to look at its neighbors on line 6 to see if going through A gives any of them a cheaper path.",
  },
  {
    id: 'dijkstra-easy-s1-q5',
    type: 'code',
    prompt: "Fill in the blank in Dijkstra's pseudocode:",
    codeLines: [
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
      { lineNumber: 8, indentLevel: 3, tokens: [{ text: 'if newCost < cost[neighbor]:', kind: 'plain' }] },
      { lineNumber: 9, indentLevel: 4, tokens: [{ text: 'cost[neighbor] = newCost, open.push(neighbor)', kind: 'plain' }] },
      { lineNumber: 10, indentLevel: 1, tokens: [{ text: 'return no path', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: 'shift' },
      { id: 'b', text: 'pop' },
      { id: 'c', text: 'sort' },
      { id: 'd', text: 'push' },
    ],
    correctOptionId: 'a',
    explanation:
      "Since the open set was just sorted by cost with the cheapest node first, shift() removes that very first (lowest-cost) entry — pop() would instead remove the most expensive one, from the end of the sorted list.",
  },
];
