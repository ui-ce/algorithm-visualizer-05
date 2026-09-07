import type { TestQuestion } from '../../test.types';
import { DFS_TEST_GRAPH } from './dfs-graph.data';

// Set 2 / Medium for DFS.
export const DFS_MEDIUM_SET_2: TestQuestion[] = [
  {
    id: 'dfs-medium-s2-q1',
    type: 'conceptual',
    prompt: 'Which of these problems is DFS a natural fit for?',
    options: [
      { id: 'a', text: 'Detecting whether a graph contains a cycle' },
      { id: 'b', text: 'Finding the shortest path in a weighted graph' },
      { id: 'c', text: 'Sorting a list of numbers' },
      { id: 'd', text: 'Finding the maximum value stored in the graph' },
    ],
    correctOptionId: 'a',
    explanation:
      'DFS can detect a cycle by noticing when it reaches a node that is already on the current path being explored — a byproduct of how it tracks its own traversal. Shortest-path problems need Dijkstra or BFS instead.',
  },
  {
    id: 'dfs-medium-s2-q2',
    type: 'conceptual',
    prompt: 'If the graph passed to DFS is disconnected (some nodes cannot be reached from the start node), what happens to those unreachable nodes?',
    options: [
      { id: 'a', text: 'They never get pushed onto the stack and are never marked visited' },
      { id: 'b', text: 'They cause the algorithm to throw an error and stop' },
      { id: 'c', text: 'They are visited last, after every reachable node' },
      { id: 'd', text: 'They are visited first, before the start node' },
    ],
    correctOptionId: 'a',
    explanation:
      "DFS only ever discovers a node by finding it in an already-visited node's neighbor list. A node with no path back to the start is never pushed onto the stack in the first place, so it simply never appears in the visited set.",
  },
  {
    id: 'dfs-medium-s2-q3',
    type: 'conceptual',
    prompt: 'Does this DFS implementation guarantee finding the shortest path (fewest edges) from the start to any other node?',
    options: [
      { id: 'a', text: 'No — DFS commits to the first available neighbor rather than exploring breadth-first, so it can reach a node via a longer path than necessary' },
      { id: 'b', text: 'Yes, DFS always finds the shortest path in any graph' },
      { id: 'c', text: 'Only if the graph has no cycles' },
      { id: 'd', text: 'Only if every edge has the same weight' },
    ],
    correctOptionId: 'a',
    explanation:
      "DFS's traversal order (A, B, D, E, F, C on this graph) isn't organized by distance from the start at all — that guarantee belongs to BFS on unweighted graphs, or Dijkstra on weighted ones.",
  },
  {
    id: 'dfs-medium-s2-q4',
    type: 'execution',
    prompt: "E has just been visited. E's neighbors are B (already visited) and F (never seen before). What happens to each of them?",
    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 25 },
    options: [
      { id: 'a', text: 'Both B and F are pushed onto the stack — B as a stale duplicate, F as a genuinely new discovery' },
      { id: 'b', text: 'Only F is pushed, since B is already visited' },
      { id: 'c', text: 'Only B is pushed, since F was already discovered by a different node' },
      { id: 'd', text: 'Neither is pushed, since E has already been visited' },
    ],
    correctOptionId: 'a',
    explanation:
      "Line 7 pushes every neighbor with no visited check — so B (already visited) is pushed again as a stale duplicate, right alongside F (truly new, and now marked for discovery on the graph).",
  },
  {
    id: 'dfs-medium-s2-q5',
    type: 'execution',
    prompt: 'This is the second stale copy of B to reach the top of the stack. What happens when it is popped here?',
    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 29 },
    options: [
      { id: 'a', text: "It's still already visited, so it's skipped exactly the same way the first stale copy was" },
      { id: 'b', text: 'It gets a special second visit, since it has now appeared on the stack twice' },
      { id: 'c', text: 'It causes the traversal to jump back to the start node A' },
      { id: 'd', text: 'It permanently removes B from the graph' },
    ],
    correctOptionId: 'a',
    explanation:
      "Every stale duplicate of an already-visited node is handled identically: line 5's check fails, and the loop moves on. It doesn't matter how many times a node was pushed — only the very first pop where it's unvisited actually does anything.",
  },
  {
    id: 'dfs-medium-s2-q6',
    type: 'execution',
    prompt: 'F has just been popped from the stack for the first time. What happens to it?',
    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 33 },
    options: [
      { id: 'a', text: "F is marked visited, and its neighbors (C and E) will be pushed onto the stack next" },
      { id: 'b', text: 'F is skipped, since C, one of its neighbors, was discovered earlier' },
      { id: 'c', text: "F is visited, but no neighbors are pushed since E is already visited" },
      { id: 'd', text: 'The traversal ends, since F is the graph\'s last remaining node' },
    ],
    correctOptionId: 'a',
    explanation:
      "F hasn't appeared in the visited set yet, so it gets marked visited here — and just like every other node, both of its neighbors get pushed onto the stack next, regardless of their own visited status.",
  },
  {
    id: 'dfs-medium-s2-q7',
    type: 'code',
    prompt: 'Fill in the blank in the DFS pseudocode:',
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function dfs(graph, start):', kind: 'plain' }] },
      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'stack = [start], visited = {}', kind: 'plain' }] },
      { lineNumber: 3, indentLevel: 1, tokens: [{ text: 'while stack is not empty:', kind: 'plain' }] },
      { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'node = stack.pop()', kind: 'plain' }] },
      { lineNumber: 5, indentLevel: 2, tokens: [{ text: 'if node not in visited:', kind: 'plain' }] },
      { lineNumber: 6, indentLevel: 3, tokens: [{ text: 'mark node visited', kind: 'plain' }] },
      {
        lineNumber: 7,
        indentLevel: 3,
        tokens: [
          { text: 'push node ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ' onto stack', kind: 'plain' },
        ],
      },
      { lineNumber: 8, indentLevel: 1, tokens: [{ text: 'return visited', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: 'neighbors' },
      { id: 'b', text: 'parent' },
      { id: 'c', text: 'index' },
      { id: 'd', text: 'value' },
    ],
    correctOptionId: 'a',
    explanation:
      "It's node's neighbors that get pushed once node itself is visited — that's what makes the traversal spread outward to adjacent nodes, one step at a time.",
  },
];
