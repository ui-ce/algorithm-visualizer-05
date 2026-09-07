import type { TestQuestion } from '../../test.types';
import { DFS_TEST_GRAPH } from './dfs-graph.data';

// Set 1 / Hard for DFS. Order: 4 conceptual, 3 execution, 3 code.
//
// The three code questions (q8, q9, q10) all reference the SAME
// pseudocode snippet with THREE blanks shown at once (lines 3, 4, and
// 5) — not one blank revealed and filled per question. Each question
// asks about a different one of those three blanks, but every
// question shows all three as unresolved dashes, so answering q8
// never gives away what q9 or q10 is about.
const CODE_GROUP_1_LINES = (): TestQuestion['codeLines'] => [
  { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function dfs(graph, start):', kind: 'plain' }] },
  { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'stack = [start], visited = {}', kind: 'plain' }] },
  {
    lineNumber: 3,
    indentLevel: 1,
    tokens: [
      { text: 'while stack is ', kind: 'plain' },
      { text: '____', kind: 'blank' },
      { text: ' empty:', kind: 'plain' },
    ],
  },
  {
    lineNumber: 4,
    indentLevel: 2,
    tokens: [
      { text: 'node = stack.', kind: 'plain' },
      { text: '____', kind: 'blank' },
      { text: '()', kind: 'plain' },
    ],
  },
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
];

export const DFS_HARD_SET_1: TestQuestion[] = [
  {
    id: 'dfs-hard-s1-q1',
    type: 'conceptual',
    prompt: 'In what order does this DFS implementation visit the nodes of the graph used throughout this quiz, starting from A?',
    options: [
      { id: 'a', text: 'A, B, D, E, F, C' },
      { id: 'b', text: 'A, B, C, D, E, F' },
      { id: 'c', text: 'A, C, F, E, B, D' },
      { id: 'd', text: 'A, B, E, D, F, C' },
    ],
    correctOptionId: 'a',
    explanation:
      "Because neighbors are reversed before being pushed (so the first-listed neighbor ends up on top of the stack and is explored first), A's traversal goes A, B, D, E, F, and only then back to C, which was discovered early but sat buried on the stack the whole time.",
  },
  {
    id: 'dfs-hard-s1-q2',
    type: 'conceptual',
    prompt: 'Why is DFS (with backtracking) a natural fit for solving a maze or a puzzle like Sudoku?',
    options: [
      { id: 'a', text: 'It commits fully to one path, and backtracking to try the next option is exactly what happens automatically once a branch fails' },
      { id: 'b', text: "It always finds the shortest solution path in the fewest number of moves" },
      { id: 'c', text: "It explores every possible path in parallel at the same time" },
      { id: 'd', text: "It doesn't need a visited set, which makes it easier to implement" },
    ],
    correctOptionId: 'a',
    explanation:
      "Maze and puzzle solving is fundamentally about trying one option, following it as far as it goes, and backing up to try another when it fails — DFS's own execution model does exactly this without any extra bookkeeping needed.",
  },
  {
    id: 'dfs-hard-s1-q3',
    type: 'conceptual',
    prompt: 'If a graph has two disconnected components and dfs(graph, start) is called with a start node from only one of them, what must be done to make sure every node in the whole graph gets visited?',
    options: [
      { id: 'a', text: 'Run DFS again from an unvisited node in the other component, and repeat until every node has been visited' },
      { id: 'b', text: 'Nothing — a single DFS call always reaches every node in the graph' },
      { id: 'c', text: 'Add an edge connecting the two components before running DFS' },
      { id: 'd', text: "Sort the graph's nodes before calling DFS" },
    ],
    correctOptionId: 'a',
    explanation:
      "A single DFS call only ever reaches nodes connected to its start node. Fully covering a disconnected graph — which is exactly how DFS is used to find connected components — means looping over every node and starting a fresh DFS from any that are still unvisited.",
  },
  {
    id: 'dfs-hard-s1-q4',
    type: 'conceptual',
    prompt: 'For a very dense graph, where E (edges) is much larger than V (vertices), which part of O(V + E) dominates the actual running time?',
    options: [
      { id: 'a', text: 'The E term — with far more edges than vertices, scanning neighbor lists dominates the total work' },
      { id: 'b', text: 'The V term, since every algorithm is bounded by the number of vertices' },
      { id: 'c', text: 'Neither — dense graphs always run in constant time' },
      { id: 'd', text: 'V and E always contribute equally, regardless of the graph\'s shape' },
    ],
    correctOptionId: 'a',
    explanation:
      "O(V + E) is exactly what it says: the two terms are added, not multiplied, so whichever one is larger dominates the sum. A dense graph has E much larger than V, so the edge-scanning work is what actually drives the running time.",
  },
  {
    id: 'dfs-hard-s1-q5',
    type: 'execution',
    prompt: "This is a stale copy of A, discovered long ago via C's neighbor list, being popped near the very end of the traversal. What happens?",
    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 43 },
    options: [
      { id: 'a', text: "A is already visited, so this pop does nothing — it's simply discarded" },
      { id: 'b', text: 'A is visited a second time, since it was pushed by a different node this time' },
      { id: 'c', text: 'The traversal jumps back to the very beginning, since A is the start node' },
      { id: 'd', text: "This pop causes an error, since A has already appeared in the visited set" },
    ],
    correctOptionId: 'a',
    explanation:
      "No matter which node originally pushed a stale duplicate onto the stack, the check on line 5 only cares whether the popped node is already in the visited set — it is, so nothing else happens.",
  },
  {
    id: 'dfs-hard-s1-q6',
    type: 'execution',
    prompt: 'This stale copy of F — pushed once by E and again by itself, earlier in the traversal — is now being popped. What happens?',
    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 47 },
    options: [
      { id: 'a', text: "It's skipped, exactly like every other stale duplicate that reaches the top of the stack already visited" },
      { id: 'b', text: 'It triggers a fresh visit of F, since it was pushed from a different call' },
      { id: 'c', text: "F's neighbors are re-pushed onto the stack a third time" },
      { id: 'd', text: 'The stack is emptied entirely to prevent further duplicates' },
    ],
    correctOptionId: 'a',
    explanation:
      "There's nothing special about where or when a duplicate was pushed — every single one is handled by the same one-line check on line 5, and every one of them is skipped once the node is already visited.",
  },
  {
    id: 'dfs-hard-s1-q7',
    type: 'execution',
    prompt: 'The stack now holds just [C, E], with a stale copy of E on top. What happens when it is popped?',
    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 51 },
    options: [
      { id: 'a', text: "It's skipped, since E is already visited, leaving just [C] on the stack" },
      { id: 'b', text: 'It causes the traversal to restart from E' },
      { id: 'c', text: "It's visited again, and the stack grows instead of shrinking" },
      { id: 'd', text: 'The algorithm terminates immediately once E is popped for the second time' },
    ],
    correctOptionId: 'a',
    explanation:
      "This is the traversal's cleanup phase: every remaining entry on the stack is a stale duplicate of an already-visited node, so each pop from here to the end simply shrinks the stack by one without doing anything else.",
  },
  {
    id: 'dfs-hard-s1-q8',
    type: 'code',
    prompt: 'Fill in the blank on line 4 — which stack operation retrieves the node to process next?',
    codeLines: CODE_GROUP_1_LINES(),
    options: [
      { id: 'a', text: 'pop' },
      { id: 'b', text: 'shift' },
      { id: 'c', text: 'peek' },
      { id: 'd', text: 'sort' },
    ],
    correctOptionId: 'a',
    explanation:
      "pop() removes the most recently pushed entry, giving DFS its depth-first character. Note the two other blanks in this snippet (lines 3 and 5) are covered by the next two questions.",
  },
  {
    id: 'dfs-hard-s1-q9',
    type: 'code',
    prompt: 'Fill in the blank on line 3 — what condition keeps the main loop running?',
    codeLines: CODE_GROUP_1_LINES(),
    options: [
      { id: 'a', text: 'not' },
      { id: 'b', text: 'still' },
      { id: 'c', text: 'barely' },
      { id: 'd', text: 'always' },
    ],
    correctOptionId: 'a',
    explanation:
      'The loop needs to keep running for as long as there is unprocessed work on the stack — that\'s "while stack is NOT empty". The other two blanks in this same snippet are covered by the surrounding questions.',
  },
  {
    id: 'dfs-hard-s1-q10',
    type: 'code',
    prompt: 'Fill in the blank on line 5 — what check decides whether a popped node actually gets processed?',
    codeLines: CODE_GROUP_1_LINES(),
    options: [
      { id: 'a', text: 'not in' },
      { id: 'b', text: 'in' },
      { id: 'c', text: 'equal to' },
      { id: 'd', text: 'greater than' },
    ],
    correctOptionId: 'a',
    explanation:
      "This check — 'not in' visited — is what filters out every stale duplicate a node may have accumulated on the stack, making sure a node is only ever marked visited and expanded the first time it's popped.",
  },
];
