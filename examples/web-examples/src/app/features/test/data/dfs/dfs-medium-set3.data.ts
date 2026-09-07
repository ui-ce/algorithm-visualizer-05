import type { TestQuestion } from '../../test.types';
import { DFS_TEST_GRAPH } from './dfs-graph.data';

// Set 3 / Medium for DFS.
export const DFS_MEDIUM_SET_3: TestQuestion[] = [
  {
    id: 'dfs-medium-s3-q1',
    type: 'conceptual',
    prompt: "On this graph, node C is pushed onto the stack very early (right after A is visited) but isn't actually visited until much later. Why can that happen?",
    options: [
      { id: 'a', text: "Being pushed onto the stack (discovered) and being visited are two different events — C stays buried under other entries until every node stacked above it has been processed" },
      { id: 'b', text: 'It happens because C has no neighbors of its own' },
      { id: 'c', text: "The graph's edges are read in a random order every time the algorithm runs" },
      { id: 'd', text: 'It is a bug — a correct DFS would always visit C right after pushing it' },
    ],
    correctOptionId: 'a',
    explanation:
      "A stack only exposes its top entry. Once C is pushed, it can sit buried under everything pushed afterward until the traversal backtracks all the way down to it — which is exactly why discovery order and visit order can differ so much.",
  },
  {
    id: 'dfs-medium-s3-q2',
    type: 'conceptual',
    prompt: 'Compared to BFS, why is DFS often more memory-efficient on graphs that are deep but not wide?',
    options: [
      { id: 'a', text: "DFS's stack only needs to remember the current path plus a few pending branches, while BFS's queue can end up holding an entire wide level of the graph at once" },
      { id: 'b', text: 'DFS never needs a visited set, while BFS does' },
      { id: 'c', text: 'DFS always processes fewer nodes overall than BFS' },
      { id: 'd', text: "DFS's stack has a fixed maximum size, unlike BFS's queue" },
    ],
    correctOptionId: 'a',
    explanation:
      "BFS keeps every node at the current frontier in its queue at once, which can be huge on a wide graph. DFS's stack instead only tends to hold the nodes along the current path (plus their as-yet-unvisited siblings), which stays small on a deep, narrow graph.",
  },
  {
    id: 'dfs-medium-s3-q3',
    type: 'conceptual',
    prompt: 'How does running DFS and recording each node\'s finish time (when it and all its descendants are fully processed) relate to topological sorting?',
    options: [
      { id: 'a', text: 'On a directed acyclic graph, listing nodes in decreasing order of finish time produces a valid topological order' },
      { id: 'b', text: 'Finish times have no relationship to topological order at all' },
      { id: 'c', text: 'Topological sorting requires running DFS twice on the same graph' },
      { id: 'd', text: 'A node with an earlier finish time must always come before one with a later finish time' },
    ],
    correctOptionId: 'a',
    explanation:
      'This is the standard DFS-based topological sort: a node only "finishes" after all of its dependencies (its descendants in the DFS tree) have finished, so sorting by decreasing finish time respects every dependency edge.',
  },
  {
    id: 'dfs-medium-s3-q4',
    type: 'execution',
    prompt: "F has just been visited. Its neighbors are C (discovered long ago, still not visited) and E (already visited). What happens to each?",
    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 34 },
    options: [
      { id: 'a', text: 'Both are pushed onto the stack again — E as a stale duplicate, C as yet another copy of a node still waiting to be visited' },
      { id: 'b', text: 'Neither is pushed, since both have already appeared on the stack before' },
      { id: 'c', text: 'Only C is pushed, since E is already visited' },
      { id: 'd', text: "C is removed from the graph, since it has waited too long to be visited" },
    ],
    correctOptionId: 'a',
    explanation:
      "Line 7 doesn't check visited status before pushing, and it also doesn't check whether a node is already sitting somewhere else on the stack — so both E (visited) and C (not yet visited, but already on the stack once) get pushed again.",
  },
  {
    id: 'dfs-medium-s3-q5',
    type: 'execution',
    prompt: 'This copy of C has just been popped, and it turns out to be the first time C is actually being processed. What happens?',
    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 38 },
    options: [
      { id: 'a', text: "C is marked visited — its long wait on the stack is finally over — and its neighbors are pushed next" },
      { id: 'b', text: "C is skipped, since it was discovered so early in the traversal" },
      { id: 'c', text: "The algorithm restarts from A, since C took unusually long to be visited" },
      { id: 'd', text: 'C is visited, but no further neighbors are pushed' },
    ],
    correctOptionId: 'a',
    explanation:
      "Regardless of how long a node sat on the stack, all that matters is whether it's in the visited set when it's popped. This is C's first pop, so it passes the check on line 5 and gets visited like any other node.",
  },
  {
    id: 'dfs-medium-s3-q6',
    type: 'execution',
    prompt: "C has just been visited. Its neighbors are A and F, both already visited long ago. What happens to them?",
    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 39 },
    options: [
      { id: 'a', text: 'Both are pushed onto the stack as stale duplicates, and will simply be skipped when eventually popped' },
      { id: 'b', text: 'Neither is pushed, since the algorithm now recognizes them as visited' },
      { id: 'c', text: 'The traversal ends immediately, since both of C\'s neighbors are already visited' },
      { id: 'd', text: "A and F are merged into a single node" },
    ],
    correctOptionId: 'a',
    explanation:
      "Same unconditional push as every other visit: A and F both get pushed onto the stack again even though they're long since visited. These are the last two stale entries the traversal has to clear out before finishing.",
  },
  {
    id: 'dfs-medium-s3-q7',
    type: 'code',
    prompt: 'Fill in the blank in the DFS pseudocode:',
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function dfs(graph, start):', kind: 'plain' }] },
      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'stack = [start], visited = {}', kind: 'plain' }] },
      { lineNumber: 3, indentLevel: 1, tokens: [{ text: 'while stack is not empty:', kind: 'plain' }] },
      { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'node = stack.pop()', kind: 'plain' }] },
      { lineNumber: 5, indentLevel: 2, tokens: [{ text: 'if node not in visited:', kind: 'plain' }] },
      {
        lineNumber: 6,
        indentLevel: 3,
        tokens: [
          { text: 'mark node ', kind: 'plain' },
          { text: '____', kind: 'blank' },
        ],
      },
      { lineNumber: 7, indentLevel: 3, tokens: [{ text: 'push node neighbors onto stack', kind: 'plain' }] },
      { lineNumber: 8, indentLevel: 1, tokens: [{ text: 'return visited', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: 'visited' },
      { id: 'b', text: 'unvisited' },
      { id: 'c', text: 'closed' },
      { id: 'd', text: 'sorted' },
    ],
    correctOptionId: 'a',
    explanation:
      "This is the line that actually records the node so future pops of it (stale duplicates included) get correctly recognized and skipped by the check on line 5 — it must mark the node visited.",
  },
];
