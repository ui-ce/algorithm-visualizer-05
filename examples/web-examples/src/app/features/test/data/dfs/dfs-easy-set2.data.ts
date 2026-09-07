import type { TestQuestion } from '../../test.types';
import { DFS_TEST_GRAPH } from './dfs-graph.data';

// Set 2 / Easy for DFS.
export const DFS_EASY_SET_2: TestQuestion[] = [
  {
    id: 'dfs-easy-s2-q1',
    type: 'conceptual',
    prompt: 'Why does DFS need a visited set?',
    options: [
      { id: 'a', text: 'To avoid processing the same node more than once, which matters most on graphs with cycles' },
      { id: 'b', text: 'To keep track of which nodes are the largest in value' },
      { id: 'c', text: 'To store the shortest distance from the start to every other node' },
      { id: 'd', text: 'To decide the order neighbors are listed in the input graph' },
    ],
    correctOptionId: 'a',
    explanation:
      "Without a visited set, a graph containing a cycle would send DFS back and forth between the same nodes forever. Checking 'if node not in visited' before processing a node is what guarantees every node is handled exactly once.",
  },
  {
    id: 'dfs-easy-s2-q2',
    type: 'conceptual',
    prompt: 'How does DFS differ from BFS in the order it visits nodes?',
    options: [
      { id: 'a', text: 'DFS dives deep along one branch before backtracking; BFS visits every neighbor at the current depth before going deeper' },
      { id: 'b', text: 'DFS and BFS always visit nodes in exactly the same order' },
      { id: 'c', text: 'DFS visits nodes in alphabetical order; BFS visits them in numeric order' },
      { id: 'd', text: 'DFS only works on trees, while BFS only works on general graphs' },
    ],
    correctOptionId: 'a',
    explanation:
      "The two algorithms explore the exact same graph completely differently because of the data structure behind them: DFS's stack commits to one path, while BFS's queue spreads outward level by level.",
  },
  {
    id: 'dfs-easy-s2-q3',
    type: 'execution',
    prompt: 'The stack currently holds [C, B], with B on top. What happens next?',
    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 6 },
    options: [
      { id: 'a', text: 'B is popped from the top of the stack and marked visited' },
      { id: 'b', text: 'C is popped instead, since it was pushed first' },
      { id: 'c', text: 'Both B and C are popped and visited together in this step' },
      { id: 'd', text: 'The algorithm ends because the stack still has two entries' },
    ],
    correctOptionId: 'a',
    explanation:
      'A stack pops from the top, and B was pushed last (after C), so B is popped and processed first — this is exactly the Last-In-First-Out order that gives DFS its depth-first behavior.',
  },
  {
    id: 'dfs-easy-s2-q4',
    type: 'execution',
    prompt: "B has just been visited. B's neighbor list is [A, D, E], and A was already visited earlier. What happens to A here?",
    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 7 },
    options: [
      { id: 'a', text: 'A is pushed onto the stack anyway, even though it is already visited — the check happens later, when it gets popped' },
      { id: 'b', text: 'A is skipped entirely and never pushed, since the algorithm already knows it is visited' },
      { id: 'c', text: "The algorithm raises an error because A appears in B's neighbor list twice" },
      { id: 'd', text: 'A is removed from the graph so it cannot be pushed again' },
    ],
    correctOptionId: 'a',
    explanation:
      "This implementation pushes every neighbor onto the stack without checking visited status first — line 7 pushes all of a node's neighbors unconditionally. The 'if node not in visited' check only happens later, once a node is actually popped.",
  },
  {
    id: 'dfs-easy-s2-q5',
    type: 'code',
    prompt: 'Fill in the blank in the DFS pseudocode:',
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function dfs(graph, start):', kind: 'plain' }] },
      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'stack = [start], visited = {}', kind: 'plain' }] },
      { lineNumber: 3, indentLevel: 1, tokens: [{ text: 'while stack is not empty:', kind: 'plain' }] },
      { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'node = stack.pop()', kind: 'plain' }] },
      {
        lineNumber: 5,
        indentLevel: 2,
        tokens: [
          { text: 'if node ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ' visited:', kind: 'plain' },
        ],
      },
      { lineNumber: 6, indentLevel: 3, tokens: [{ text: 'mark node visited', kind: 'plain' }] },
      { lineNumber: 7, indentLevel: 3, tokens: [{ text: 'push node neighbors onto stack', kind: 'plain' }] },
      { lineNumber: 8, indentLevel: 1, tokens: [{ text: 'return visited', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: 'not in' },
      { id: 'b', text: 'in' },
      { id: 'c', text: 'equals' },
      { id: 'd', text: 'greater than' },
    ],
    correctOptionId: 'a',
    explanation:
      "The algorithm should only process a node the first time it's popped — 'not in' guards against re-processing a node that was pushed onto the stack more than once (a common occurrence, since neighbors are pushed without a prior visited check).",
  },
];
