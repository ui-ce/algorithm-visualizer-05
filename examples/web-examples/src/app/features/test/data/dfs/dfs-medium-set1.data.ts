import type { TestQuestion } from '../../test.types';
import { DFS_TEST_GRAPH } from './dfs-graph.data';

// Set 1 / Medium for DFS. Order: 3 conceptual, 3 execution, 1 code.
export const DFS_MEDIUM_SET_1: TestQuestion[] = [
  {
    id: 'dfs-medium-s1-q1',
    type: 'conceptual',
    prompt: 'What is the time complexity of DFS on a graph with V vertices and E edges, using an adjacency list?',
    options: [
      { id: 'a', text: 'O(V + E) — every vertex is visited once and every edge is examined once' },
      { id: 'b', text: 'O(V * E) — every vertex is compared against every edge' },
      { id: 'c', text: 'O(V^2), regardless of how the graph is represented' },
      { id: 'd', text: 'O(log V), since the stack keeps the traversal balanced' },
    ],
    correctOptionId: 'a',
    explanation:
      "Each vertex is popped and processed exactly once (O(V)), and each edge is looked at exactly once when its endpoints' neighbor lists are scanned (O(E)) — added together, that's O(V + E).",
  },
  {
    id: 'dfs-medium-s1-q2',
    type: 'conceptual',
    prompt: 'What is the space complexity of DFS, and what does it depend on?',
    options: [
      { id: 'a', text: 'O(V) in the worst case, for the stack and the visited set, which can together hold every vertex' },
      { id: 'b', text: 'O(1), since DFS never stores more than one node at a time' },
      { id: 'c', text: 'O(E), since every edge needs to be stored on the stack' },
      { id: 'd', text: 'O(V^2), since the visited set stores every possible pair of vertices' },
    ],
    correctOptionId: 'a',
    explanation:
      'In the worst case (for example, a graph shaped like a single long chain), the stack can end up holding close to every vertex before any of them are popped, and the visited set grows to hold every vertex too — both are O(V).',
  },
  {
    id: 'dfs-medium-s1-q3',
    type: 'conceptual',
    prompt: 'This app implements DFS iteratively with an explicit stack rather than recursively. What is the main practical benefit of that choice?',
    options: [
      { id: 'a', text: "It avoids the risk of a stack overflow on very deep graphs, since it doesn't rely on the call stack" },
      { id: 'b', text: 'It makes the traversal visit nodes in a different order than a recursive version would' },
      { id: 'c', text: 'It reduces the time complexity from O(V + E) to O(V)' },
      { id: 'd', text: 'It removes the need for a visited set entirely' },
    ],
    correctOptionId: 'a',
    explanation:
      "Recursive DFS uses the call stack itself to remember where to backtrack to, which can overflow on a graph with a very long chain of nodes. An explicit stack data structure has no such limit (beyond available memory) and produces the exact same traversal order.",
  },
  {
    id: 'dfs-medium-s1-q4',
    type: 'execution',
    prompt: "D has just been visited, and its only neighbor is B — which was already visited earlier. What happens to B here?",
    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 16 },
    options: [
      { id: 'a', text: 'B is pushed onto the stack again, creating a second, stale entry for an already-visited node' },
      { id: 'b', text: 'B is skipped and never pushed, since the algorithm remembers it is visited' },
      { id: 'c', text: "D is removed from the visited set because its only neighbor is already visited" },
      { id: 'd', text: 'The algorithm terminates, since D has no unvisited neighbors' },
    ],
    correctOptionId: 'a',
    explanation:
      "Line 7 pushes every neighbor unconditionally, with no visited check at push time. So B — already visited — gets pushed onto the stack a second time. That stale entry will simply be skipped once it's eventually popped and checked on line 5.",
  },
  {
    id: 'dfs-medium-s1-q5',
    type: 'execution',
    prompt: 'This stale, duplicate copy of B has just been popped from the stack. What happens to it?',
    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 20 },
    options: [
      { id: 'a', text: "It's already in the visited set, so line 5's check fails and nothing further happens with it" },
      { id: 'b', text: "It gets visited again, and its neighbors are pushed onto the stack a second time" },
      { id: 'c', text: 'The stack is cleared entirely to remove any other stale duplicates' },
      { id: 'd', text: 'An error is raised because the same node was pushed twice' },
    ],
    correctOptionId: 'a',
    explanation:
      'This is the direct cost of pushing neighbors without checking visited status first: stale duplicate entries do get popped eventually, but the "not in visited" check on line 5 quietly discards them without any extra visiting or pushing.',
  },
  {
    id: 'dfs-medium-s1-q6',
    type: 'execution',
    prompt: 'E has just been popped from the stack for the first time. What happens to it?',
    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 24 },
    options: [
      { id: 'a', text: 'E is marked visited, and its neighbors (B and F) will be pushed onto the stack next' },
      { id: 'b', text: 'E is skipped, since it appears more than once in the graph' },
      { id: 'c', text: 'E is visited, but its neighbors are not pushed because B was already visited' },
      { id: 'd', text: 'The traversal ends here, since E is the fourth node visited' },
    ],
    correctOptionId: 'a',
    explanation:
      "E has not been visited before this point, so line 5's check passes: E is marked visited (line 6) and then all of its neighbors — both B and F — are pushed onto the stack on line 7, regardless of whether they've been visited already.",
  },
  {
    id: 'dfs-medium-s1-q7',
    type: 'code',
    prompt: 'Fill in the blank in the DFS pseudocode:',
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function dfs(graph, start):', kind: 'plain' }] },
      {
        lineNumber: 2,
        indentLevel: 1,
        tokens: [
          { text: 'stack = [', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: '], visited = {}', kind: 'plain' },
        ],
      },
      { lineNumber: 3, indentLevel: 1, tokens: [{ text: 'while stack is not empty:', kind: 'plain' }] },
      { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'node = stack.pop()', kind: 'plain' }] },
      { lineNumber: 5, indentLevel: 2, tokens: [{ text: 'if node not in visited:', kind: 'plain' }] },
      { lineNumber: 6, indentLevel: 3, tokens: [{ text: 'mark node visited', kind: 'plain' }] },
      { lineNumber: 7, indentLevel: 3, tokens: [{ text: 'push node neighbors onto stack', kind: 'plain' }] },
      { lineNumber: 8, indentLevel: 1, tokens: [{ text: 'return visited', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: 'start' },
      { id: 'b', text: 'graph' },
      { id: 'c', text: 'visited' },
      { id: 'd', text: 'end' },
    ],
    correctOptionId: 'a',
    explanation:
      'The stack must be seeded with the node the traversal begins from — the start parameter — so the very first pop in the loop has something to work with.',
  },
];
