import type { TestQuestion } from '../../test.types';
import { DFS_TEST_GRAPH } from './dfs-graph.data';

// Set 1 / Easy for DFS. Ordered strictly by type — conceptual,
// conceptual, execution, execution, code — matching the project's
// question-order rule (concept before execution before code) rather
// than interleaving them.
//
// Execution questions run dfsVisualization(DFS_TEST_GRAPH), which
// always starts at 'A'. See dfs-graph.data.ts for how the frameIndex
// values below were verified against the real recorder output.
export const DFS_EASY_SET_1: TestQuestion[] = [
  {
    id: 'dfs-easy-s1-q1',
    type: 'conceptual',
    prompt: 'What is the main goal of Depth-First Search (DFS)?',
    options: [
      { id: 'a', text: 'To explore as far as possible down one branch before backtracking to try another' },
      { id: 'b', text: 'To visit every node at the current distance from the start before going deeper' },
      { id: 'c', text: 'To find the shortest path between two nodes in a weighted graph' },
      { id: 'd', text: 'To sort the nodes of a graph by their numeric value' },
    ],
    correctOptionId: 'a',
    explanation:
      'DFS commits to one path and follows it as deep as it goes, only backtracking once it hits a dead end — that "go deep first" behavior is where its name comes from.',
  },
  {
    id: 'dfs-easy-s1-q2',
    type: 'conceptual',
    prompt: 'Which data structure does this DFS implementation use to decide which node to visit next?',
    options: [
      { id: 'a', text: 'A stack, so the most recently discovered node is visited next' },
      { id: 'b', text: 'A queue, so the earliest discovered node is visited next' },
      { id: 'c', text: 'A sorted list, so the smallest-value node is visited next' },
      { id: 'd', text: 'A priority queue ordered by distance from the start' },
    ],
    correctOptionId: 'a',
    explanation:
      "A stack is Last-In-First-Out, so the neighbor pushed most recently is popped first. That's exactly what makes the traversal dive deep along one branch instead of spreading out evenly, which is what a queue (used by BFS) would do.",
  },
  {
    id: 'dfs-easy-s1-q3',
    type: 'execution',
    prompt: 'The traversal is just beginning. What happens at this very first step?',
    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 0 },
    options: [
      { id: 'a', text: "Node A, the only entry on the stack, is popped to become the current node" },
      { id: 'b', text: 'Node A is immediately marked visited without being popped first' },
      { id: 'c', text: "All of A's neighbors are visited before A itself" },
      { id: 'd', text: 'The stack starts out empty and the algorithm ends immediately' },
    ],
    correctOptionId: 'a',
    explanation:
      "The stack always starts as [A], since DFS begins at the hardcoded start node. The very first thing the loop does is pop that single entry off the stack, making A the current node to process.",
  },
  {
    id: 'dfs-easy-s1-q4',
    type: 'execution',
    prompt: 'Node A has just been popped and marked visited. What happens next?',
    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 2 },
    options: [
      { id: 'a', text: "A's neighbors, B and C, are pushed onto the stack so they can be explored next" },
      { id: 'b', text: 'The algorithm ends, since A has no unvisited neighbors' },
      { id: 'c', text: "A's neighbors are marked visited immediately, without being pushed onto the stack" },
      { id: 'd', text: 'The stack is cleared and restarted from an empty state' },
    ],
    correctOptionId: 'a',
    explanation:
      "Once a node is visited, its neighbors (here, B and C) are pushed onto the stack — not visited immediately — so they can each be popped and processed in a later iteration of the loop.",
  },
  {
    id: 'dfs-easy-s1-q5',
    type: 'code',
    prompt: 'Fill in the blank in the DFS pseudocode:',
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function dfs(graph, start):', kind: 'plain' }] },
      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'stack = [start], visited = {}', kind: 'plain' }] },
      { lineNumber: 3, indentLevel: 1, tokens: [{ text: 'while stack is not empty:', kind: 'plain' }] },
      {
        lineNumber: 4,
        indentLevel: 2,
        tokens: [
          { text: 'node = stack.', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: '()', kind: 'plain' },
        ],
      },
      { lineNumber: 5, indentLevel: 2, tokens: [{ text: 'if node not in visited:', kind: 'plain' }] },
      { lineNumber: 6, indentLevel: 3, tokens: [{ text: 'mark node visited', kind: 'plain' }] },
      { lineNumber: 7, indentLevel: 3, tokens: [{ text: 'push node neighbors onto stack', kind: 'plain' }] },
      { lineNumber: 8, indentLevel: 1, tokens: [{ text: 'return visited', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: 'pop' },
      { id: 'b', text: 'shift' },
      { id: 'c', text: 'peek' },
      { id: 'd', text: 'sort' },
    ],
    correctOptionId: 'a',
    explanation:
      "pop() removes and returns the last element added to the stack. That Last-In-First-Out removal is what makes the traversal go deep along one branch — using shift() (first-in-first-out) would turn this into BFS instead.",
  },
];
