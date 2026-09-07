import type { TestQuestion } from '../../test.types';
import { DFS_TEST_GRAPH } from './dfs-graph.data';

// Set 2 / Hard for DFS. Order: 4 conceptual, 3 execution, 3 code.
//
// The three code questions (q8, q9, q10) share one snippet with three
// blanks (lines 2, 6, 7) all shown at once in every question, same
// consistency rule as Hard Set 1's code group.
const CODE_GROUP_2_LINES = (): TestQuestion['codeLines'] => [
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
  {
    lineNumber: 6,
    indentLevel: 3,
    tokens: [
      { text: 'mark node ', kind: 'plain' },
      { text: '____', kind: 'blank' },
    ],
  },
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
];

export const DFS_HARD_SET_2: TestQuestion[] = [
  {
    id: 'dfs-hard-s2-q1',
    type: 'conceptual',
    prompt: 'How does this DFS implementation\'s best-case time complexity compare to its worst case?',
    options: [
      { id: 'a', text: 'They are the same — O(V + E) either way, since every vertex and edge is always processed once regardless of the graph\'s shape' },
      { id: 'b', text: 'Best case is O(V), worst case is O(V + E)' },
      { id: 'c', text: 'Best case is O(1), if the start node has no neighbors' },
      { id: 'd', text: 'Best case is O(log V), on a balanced graph' },
    ],
    correctOptionId: 'a',
    explanation:
      "Unlike a sorting algorithm, DFS doesn't get to finish early on a 'favorable' input — it must still visit every reachable vertex and examine every one of its edges no matter how the graph is arranged, so best and worst case are the same O(V + E).",
  },
  {
    id: 'dfs-hard-s2-q2',
    type: 'conceptual',
    prompt: "For a recursive DFS implementation specifically (not this app's iterative one), what determines how deep the call stack gets?",
    options: [
      { id: 'a', text: 'The length of the longest path the traversal follows before backtracking — a long chain-like graph produces deep recursion' },
      { id: 'b', text: 'The total number of edges in the graph, regardless of its shape' },
      { id: 'c', text: 'The number of disconnected components in the graph' },
      { id: 'd', text: 'The order the neighbors are listed in the adjacency list' },
    ],
    correctOptionId: 'a',
    explanation:
      "Each recursive call for a node stays on the call stack until every one of its descendants has finished. On a long, chain-shaped graph that means one call sits on top of another all the way down the chain — which is exactly the scenario that can overflow the call stack, and why an iterative version avoids that risk.",
  },
  {
    id: 'dfs-hard-s2-q3',
    type: 'conceptual',
    prompt: 'On a graph that is wide (many nodes at the same distance from the start) rather than deep, how does DFS\'s memory use compare to BFS\'s?',
    options: [
      { id: 'a', text: "DFS still tends to use less memory, since its stack only grows with the branches it hasn't finished exploring yet, while BFS's queue can hold an entire wide frontier at once" },
      { id: 'b', text: 'DFS always uses more memory than BFS on a wide graph' },
      { id: 'c', text: 'They always use exactly the same amount of memory, regardless of graph shape' },
      { id: 'd', text: 'Memory use depends only on the number of edges, not the graph\'s width or depth' },
    ],
    correctOptionId: 'a',
    explanation:
      "BFS's advantage (shortest paths) comes at the cost of holding a whole level of the graph in its queue, which is expensive on a wide graph. DFS's stack size is driven by how many branches are still 'pending' along the current path, which tends to stay much smaller.",
  },
  {
    id: 'dfs-hard-s2-q4',
    type: 'conceptual',
    prompt: 'Which of these tasks is DFS a poor fit for, compared to other graph algorithms?',
    options: [
      { id: 'a', text: 'Finding the shortest path between two nodes in a weighted graph — Dijkstra is built for that' },
      { id: 'b', text: 'Detecting a cycle in a graph' },
      { id: 'c', text: 'Finding the connected components of a graph' },
      { id: 'd', text: 'Traversing a file system\'s directory tree' },
    ],
    correctOptionId: 'a',
    explanation:
      "DFS's traversal order has nothing to do with edge weights or distance from the start, so it offers no shortest-path guarantee on a weighted graph — that's specifically what Dijkstra's cost-tracking is designed to solve.",
  },
  {
    id: 'dfs-hard-s2-q5',
    type: 'execution',
    prompt: 'The stack holds only one entry left — a stale copy of C — and it is about to be popped. What happens, and what is the state of the stack right after?',
    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 55 },
    options: [
      { id: 'a', text: "It's skipped since C is already visited, and the stack becomes empty, which will end the main loop on its next check" },
      { id: 'b', text: "It's visited again, adding new entries to the stack" },
      { id: 'c', text: 'The traversal restarts from A, since the stack is nearly empty' },
      { id: 'd', text: "It causes the visited set to be cleared" },
    ],
    correctOptionId: 'a',
    explanation:
      "This is the very last entry on the stack. Like every other stale duplicate, it's discarded by line 5's check — and with the stack now empty, the while condition on line 3 will fail on the next check, ending the loop.",
  },
  {
    id: 'dfs-hard-s2-q6',
    type: 'execution',
    prompt: 'The stack is now empty and every node has been marked visited. What does the algorithm do here?',
    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 56 },
    options: [
      { id: 'a', text: "The while loop's condition fails, so it exits and the visited set — now containing all six nodes — is returned" },
      { id: 'b', text: 'It picks a new, unvisited start node and begins a second traversal automatically' },
      { id: 'c', text: 'It removes nodes from the visited set one at a time until the stack refills' },
      { id: 'd', text: "It raises an error, since the stack should never become fully empty" },
    ],
    correctOptionId: 'a',
    explanation:
      "An empty stack is the normal, expected end condition — line 3's 'while stack is not empty' becomes false, the loop exits, and line 8 returns the completed visited set as the final result.",
  },
  {
    id: 'dfs-hard-s2-q7',
    type: 'execution',
    prompt: "At this exact point, A has just been marked visited but nothing else has happened yet. What are the states of the stack and the visited set right now?",
    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 1 },
    options: [
      { id: 'a', text: "The stack is empty (A was just popped off it) and the visited set contains only A — its neighbors haven't been pushed yet" },
      { id: 'b', text: "The stack still contains A, and the visited set is empty" },
      { id: 'c', text: "The stack already contains B and C, and the visited set contains A, B, and C" },
      { id: 'd', text: 'Both the stack and the visited set are empty' },
    ],
    correctOptionId: 'a',
    explanation:
      "Marking a node visited (line 6) happens strictly after it has already been popped (line 4) and strictly before its neighbors get pushed (line 7) — so at this precise moment the stack is empty and only A is in the visited set.",
  },
  {
    id: 'dfs-hard-s2-q8',
    type: 'code',
    prompt: 'Fill in the blank on line 2 — what should the stack be initialized with?',
    codeLines: CODE_GROUP_2_LINES(),
    options: [
      { id: 'a', text: 'start' },
      { id: 'b', text: 'graph' },
      { id: 'c', text: 'visited' },
      { id: 'd', text: 'an empty list' },
    ],
    correctOptionId: 'a',
    explanation:
      "The traversal has to begin somewhere — the stack is seeded with the start node so the very first iteration of the loop has something to pop. The other two blanks in this snippet (lines 6 and 7) are covered by the next two questions.",
  },
  {
    id: 'dfs-hard-s2-q9',
    type: 'code',
    prompt: 'Fill in the blank on line 6 — what should happen to a node once it passes the visited check?',
    codeLines: CODE_GROUP_2_LINES(),
    options: [
      { id: 'a', text: 'visited' },
      { id: 'b', text: 'closed' },
      { id: 'c', text: 'discovered' },
      { id: 'd', text: 'sorted' },
    ],
    correctOptionId: 'a',
    explanation:
      "This is the step that actually records the node in the visited set, so any stale duplicate of it that shows up later on the stack gets correctly filtered out by line 5. The remaining blank in this snippet (line 7) is covered by the next question.",
  },
  {
    id: 'dfs-hard-s2-q10',
    type: 'code',
    prompt: 'Fill in the blank on line 7 — what gets pushed onto the stack once a node is visited?',
    codeLines: CODE_GROUP_2_LINES(),
    options: [
      { id: 'a', text: 'neighbors' },
      { id: 'b', text: 'ancestors' },
      { id: 'c', text: 'weight' },
      { id: 'd', text: 'index' },
    ],
    correctOptionId: 'a',
    explanation:
      "It's the just-visited node's neighbors that get pushed — unconditionally, without checking if they're already visited — which is exactly the source of the stale duplicate entries seen throughout this traversal.",
  },
];
