import type { TestQuestion } from '../../test.types';
import { DFS_TEST_GRAPH } from './dfs-graph.data';

// Set 3 / Hard for DFS. Order: 4 conceptual, 3 execution, 3 code.
//
// The three code questions (q8, q9, q10) share one snippet with three
// blanks (line 1's parameter, line 5's full condition, and line 8's
// return value) all shown at once in every question — same
// consistency rule as the other two Hard sets' code groups.
const CODE_GROUP_3_LINES = (): TestQuestion['codeLines'] => [
  {
    lineNumber: 1,
    indentLevel: 0,
    tokens: [
      { text: 'function dfs(graph, ', kind: 'plain' },
      { text: '____', kind: 'blank' },
      { text: '):', kind: 'plain' },
    ],
  },
  { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'stack = [start], visited = {}', kind: 'plain' }] },
  { lineNumber: 3, indentLevel: 1, tokens: [{ text: 'while stack is not empty:', kind: 'plain' }] },
  { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'node = stack.pop()', kind: 'plain' }] },
  {
    lineNumber: 5,
    indentLevel: 2,
    tokens: [
      { text: 'if ', kind: 'plain' },
      { text: '____', kind: 'blank' },
      { text: ':', kind: 'plain' },
    ],
  },
  { lineNumber: 6, indentLevel: 3, tokens: [{ text: 'mark node visited', kind: 'plain' }] },
  { lineNumber: 7, indentLevel: 3, tokens: [{ text: 'push node neighbors onto stack', kind: 'plain' }] },
  {
    lineNumber: 8,
    indentLevel: 1,
    tokens: [
      { text: 'return ', kind: 'plain' },
      { text: '____', kind: 'blank' },
    ],
  },
];

export const DFS_HARD_SET_3: TestQuestion[] = [
  {
    id: 'dfs-hard-s3-q1',
    type: 'conceptual',
    prompt: 'Could this DFS pseudocode be turned into BFS by changing only one thing?',
    options: [
      { id: 'a', text: "Yes — replacing the stack (and stack.pop()) with a queue (and queue.shift()) turns the exact same skeleton into BFS" },
      { id: 'b', text: 'No — BFS requires an entirely different algorithm with no structural resemblance to DFS' },
      { id: 'c', text: 'Yes — removing the visited set is the only change needed' },
      { id: 'd', text: 'No — BFS cannot be expressed with a while loop at all' },
    ],
    correctOptionId: 'a',
    explanation:
      "DFS and BFS share almost the exact same loop structure — pop/dequeue a node, check if visited, mark it, enqueue its neighbors. The single meaningful difference is which end of the pending-nodes structure gets removed from: the top of a stack (LIFO, depth-first) versus the front of a queue (FIFO, breadth-first).",
  },
  {
    id: 'dfs-hard-s3-q2',
    type: 'conceptual',
    prompt: 'Can this DFS implementation, as written, be used directly to find the shortest path in a weighted graph?',
    options: [
      { id: 'a', text: 'No — it has no concept of edge weights or accumulated cost at all; Dijkstra (or Bellman-Ford for negative weights) is needed for that' },
      { id: 'b', text: "Yes, as long as the graph's weights are all positive" },
      { id: 'c', text: 'Yes, but only if the graph is a tree' },
      { id: 'd', text: 'No algorithm can find shortest paths in a weighted graph' },
    ],
    correctOptionId: 'a',
    explanation:
      "This pseudocode never reads or accumulates any notion of cost — it only tracks which nodes have been reached. Adapting a traversal to find shortest weighted paths means tracking and comparing costs along the way, which is what Dijkstra's algorithm adds on top of a similar graph-exploration skeleton.",
  },
  {
    id: 'dfs-hard-s3-q3',
    type: 'conceptual',
    prompt: 'This implementation pushes every neighbor of a visited node onto the stack without first checking whether that neighbor is already visited. Does that affect the correctness of the final visited set DFS returns?',
    options: [
      { id: 'a', text: "No — it only creates extra, harmless stale entries on the stack that get filtered out later by line 5's check; the final visited set is exactly the same either way" },
      { id: 'b', text: "Yes — it causes some reachable nodes to be left out of the visited set" },
      { id: 'c', text: "Yes — it causes the algorithm to visit some nodes more than once in the final result" },
      { id: 'd', text: 'It causes an infinite loop on any graph with a cycle' },
    ],
    correctOptionId: 'a',
    explanation:
      "Correctness and efficiency are separate questions here. The extra pushes cost some wasted stack space and pop operations, but the check on line 5 guarantees a node is only ever marked visited (and only ever counted once in the final set) the first time it's popped — the result is identical to a version that checked visited status before pushing.",
  },
  {
    id: 'dfs-hard-s3-q4',
    type: 'conceptual',
    prompt: 'What does the visited set returned by dfs(graph, start) represent?',
    options: [
      { id: 'a', text: 'Every node reachable from start by following the graph\'s edges' },
      { id: 'b', text: 'Every node in the entire graph, whether reachable from start or not' },
      { id: 'c', text: 'Only the nodes that lie on the single longest path found from start' },
      { id: 'd', text: 'The shortest path from start to every other node' },
    ],
    correctOptionId: 'a',
    explanation:
      "Since a node can only enter the stack by being listed as a neighbor of an already-discovered node, the visited set at the end contains exactly the connected component reachable from start — nothing from a separate, disconnected part of the graph is ever included.",
  },
  {
    id: 'dfs-hard-s3-q5',
    type: 'execution',
    prompt: "A's neighbors, B and C, are being reversed before they're pushed here, so C ends up on the bottom and B on top. Why does the algorithm do this reversal?",
    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 2 },
    options: [
      { id: 'a', text: "So that the FIRST neighbor in the original list (B) ends up on TOP of the stack and gets visited first — without reversing, pushing [B, C] in order would put C on top instead" },
      { id: 'b', text: 'To make sure both neighbors get visited at the same time' },
      { id: 'c', text: "To guarantee the traversal always finds the shortest path" },
      { id: 'd', text: 'The reversal has no effect on which node is visited next' },
    ],
    correctOptionId: 'a',
    explanation:
      "Pushing a list in its original order would put its LAST element on top of the stack (popped first), which reverses the intended visiting order. Reversing the neighbor list before pushing cancels that out, so the traversal visits neighbors in the same left-to-right order they're listed in the graph.",
  },
  {
    id: 'dfs-hard-s3-q6',
    type: 'execution',
    prompt: 'At this point the stack holds [C, E, D, A], from bottom to top. Which of these entries represents genuinely unvisited work, and which are stale?',
    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 7 },
    options: [
      { id: 'a', text: 'C, E, and D are all still unvisited and will each trigger a real visit; A is a stale duplicate that will be skipped when popped' },
      { id: 'b', text: 'All four entries represent genuinely unvisited nodes' },
      { id: 'c', text: 'All four entries are stale duplicates of already-visited nodes' },
      { id: 'd', text: 'Only A represents real, unvisited work' },
    ],
    correctOptionId: 'a',
    explanation:
      "At this moment only A has been visited. C was discovered earlier and is still waiting; D and E were just discovered as B's neighbors. A itself, discovered by both A's own push and now re-pushed as B's neighbor, is the one stale entry here — it will be popped, found already visited, and skipped.",
  },
  {
    id: 'dfs-hard-s3-q7',
    type: 'execution',
    prompt: 'At this point the stack holds [C, E, F, A]. Given that C, E, F, and A have all already been visited earlier in the traversal, what does that tell you about the rest of this run?',
    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 39 },
    options: [
      { id: 'a', text: "Every remaining pop from here to the end of the traversal will find an already-visited node and be skipped — no new node will ever be visited again" },
      { id: 'b', text: 'The traversal still has at least one genuinely unvisited node left to discover' },
      { id: 'c', text: "This means the graph must have more than six nodes" },
      { id: 'd', text: "It means the algorithm will restart the traversal from the beginning" },
    ],
    correctOptionId: 'a',
    explanation:
      "Since all six of the graph's nodes are visited by this point (A, B, D, E, F, and C), every entry left on the stack — no matter how many more duplicates get pushed — can only ever be a stale copy. The rest of the run is pure cleanup: popping and discarding until the stack empties.",
  },
  {
    id: 'dfs-hard-s3-q8',
    type: 'code',
    prompt: "Fill in the blank on line 1 — what parameter does the function need besides the graph itself?",
    codeLines: CODE_GROUP_3_LINES(),
    options: [
      { id: 'a', text: 'start' },
      { id: 'b', text: 'end' },
      { id: 'c', text: 'visited' },
      { id: 'd', text: 'target' },
    ],
    correctOptionId: 'a',
    explanation:
      "DFS needs to know where to begin, and the very next line uses that same name to seed the stack — the parameter is start. The other two blanks in this snippet (line 5 and line 8) are covered by the next two questions.",
  },
  {
    id: 'dfs-hard-s3-q9',
    type: 'code',
    prompt: 'Fill in the blank on line 5 — what full condition decides whether a popped node gets processed?',
    codeLines: CODE_GROUP_3_LINES(),
    options: [
      { id: 'a', text: 'node not in visited' },
      { id: 'b', text: 'node in visited' },
      { id: 'c', text: 'node not in stack' },
      { id: 'd', text: 'stack not in visited' },
    ],
    correctOptionId: 'a',
    explanation:
      "The whole point of this check is to skip stale duplicates and only process a node the first time it's popped — that requires checking the popped node against the visited set, specifically that it is NOT already in it. The remaining blank in this snippet (line 8) is covered by the next question.",
  },
  {
    id: 'dfs-hard-s3-q10',
    type: 'code',
    prompt: 'Fill in the blank on line 8 — what does the function return once the loop finishes?',
    codeLines: CODE_GROUP_3_LINES(),
    options: [
      { id: 'a', text: 'visited' },
      { id: 'b', text: 'stack' },
      { id: 'c', text: 'graph' },
      { id: 'd', text: 'node' },
    ],
    correctOptionId: 'a',
    explanation:
      "The whole purpose of the traversal is to build up the set of reachable nodes, so that's what gets returned — the visited set, which by the time the loop ends contains every node reachable from start.",
  },
];
