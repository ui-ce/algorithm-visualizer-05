import type { TestQuestion } from '../../test.types';
import { DIJKSTRA_TEST_GRAPH } from './dijkstra-graph.data';

// Set 3 / Easy for Dijkstra.
export const DIJKSTRA_EASY_SET_3: TestQuestion[] = [
  {
    id: 'dijkstra-easy-s3-q1',
    type: 'conceptual',
    prompt: "Why can't Dijkstra's algorithm be trusted to find the correct shortest path if the graph has a negative edge weight?",
    options: [
      { id: 'a', text: "It always processes the cheapest-looking node first and treats its cost as final — a later negative edge could make some other, already-closed path even cheaper, but Dijkstra would never go back and check" },
      { id: 'b', text: 'It would run forever and never terminate' },
      { id: 'c', text: 'It would crash with an error the moment it saw a negative number' },
      { id: 'd', text: 'Negative weights actually cause no problems at all for Dijkstra' },
    ],
    correctOptionId: 'a',
    explanation:
      "Dijkstra's greedy choice — always trusting the cheapest open node as final — relies entirely on the fact that adding more edges can never make a path cheaper. A negative edge breaks that assumption, since a longer path could suddenly become the cheapest one after all.",
  },
  {
    id: 'dijkstra-easy-s3-q2',
    type: 'conceptual',
    prompt: 'What condition causes this implementation to stop and return the path early, before the open set empties?',
    options: [
      { id: 'a', text: 'The moment the destination node is picked as "current" — meaning it has already been popped as the cheapest remaining option' },
      { id: 'b', text: "The destination node's cost first appears in the Node Costs chart" },
      { id: 'c', text: 'The closed set contains every node except the destination' },
      { id: 'd', text: 'The open set contains more than three nodes' },
    ],
    correctOptionId: 'a',
    explanation:
      "Line 5 checks 'if current == end' right after current is popped as the cheapest remaining node — at that point, its cost is guaranteed final, so there's no need to keep processing the rest of the (more expensive) open set.",
  },
  {
    id: 'dijkstra-easy-s3-q3',
    type: 'execution',
    prompt: "Node C has just had its cost updated to 2, and the edge A-C is now highlighted as part of the current best-known path. What does this mean?",
    visualization: { graph: DIJKSTRA_TEST_GRAPH, start: 'A', end: 'F', frameIndex: 9 },
    options: [
      { id: 'a', text: 'The cheapest way found so far to reach C is directly from A, at a total cost of 2' },
      { id: 'b', text: "C's cost of 2 means it took two separate paths to reach it" },
      { id: 'c', text: "C has now been moved to the closed set" },
      { id: 'd', text: 'The edge A-C has now been permanently removed from the graph' },
    ],
    correctOptionId: 'a',
    explanation:
      "The edge A-C has weight 2, and A's own cost is 0, so the tentative cost for C becomes 2. Since 2 is cheaper than C's previous (unset) cost, the update goes through and the A-C edge is marked as part of the current best path to C.",
  },
  {
    id: 'dijkstra-easy-s3-q4',
    type: 'execution',
    prompt: 'The open set is being sorted here, and it currently holds C and B. Why does C end up first?',
    visualization: { graph: DIJKSTRA_TEST_GRAPH, start: 'A', end: 'F', frameIndex: 10 },
    options: [
      { id: 'a', text: "C's cost (2) is lower than B's cost (4), and the open set is always sorted from cheapest to most expensive" },
      { id: 'b', text: "C comes first alphabetically" },
      { id: 'c', text: 'C was added to the open set before B' },
      { id: 'd', text: 'The sort order has nothing to do with cost' },
    ],
    correctOptionId: 'a',
    explanation:
      "Line 4 explicitly sorts the open set 'by cost' before picking the next node — with C at cost 2 and B at cost 4, C sorts to the front, guaranteeing it (not B) is the next one shifted off and processed.",
  },
  {
    id: 'dijkstra-easy-s3-q5',
    type: 'code',
    prompt: "Fill in the blank in Dijkstra's pseudocode:",
    codeLines: [
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
      { lineNumber: 6, indentLevel: 2, tokens: [{ text: 'for neighbor in graph[current]:', kind: 'plain' }] },
      { lineNumber: 7, indentLevel: 3, tokens: [{ text: 'newCost = cost[current] + weight', kind: 'plain' }] },
      { lineNumber: 8, indentLevel: 3, tokens: [{ text: 'if newCost < cost[neighbor]:', kind: 'plain' }] },
      { lineNumber: 9, indentLevel: 4, tokens: [{ text: 'cost[neighbor] = newCost, open.push(neighbor)', kind: 'plain' }] },
      { lineNumber: 10, indentLevel: 1, tokens: [{ text: 'return no path', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: '0' },
      { id: 'b', text: 'Infinity' },
      { id: 'c', text: '1' },
      { id: 'd', text: 'end' },
    ],
    correctOptionId: 'a',
    explanation:
      "It costs nothing to reach the start node from itself — cost[start] = 0 is what guarantees start's own tentative cost calculations always begin from the right baseline.",
  },
];
