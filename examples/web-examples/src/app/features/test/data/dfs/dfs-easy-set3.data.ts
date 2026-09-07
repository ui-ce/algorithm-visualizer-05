import type { TestQuestion } from '../../test.types';
import { DFS_TEST_GRAPH } from './dfs-graph.data';

// Set 3 / Easy for DFS.
export const DFS_EASY_SET_3: TestQuestion[] = [
  {
    id: 'dfs-easy-s3-q1',
    type: 'conceptual',
    prompt: 'What does it mean for DFS to "backtrack"?',
    options: [
      { id: 'a', text: 'Returning to a previous point in the traversal because the current branch has no more unvisited nodes to explore' },
      { id: 'b', text: 'Undoing every visit made so far and restarting from the start node' },
      { id: 'c', text: 'Sorting the visited nodes back into their original order' },
      { id: 'd', text: 'Removing the start node from the graph once the traversal is done' },
    ],
    correctOptionId: 'a',
    explanation:
      "Backtracking is what happens automatically once a branch runs out of unvisited neighbors to push: the stack's next entry is simply whatever was pushed earlier by an ancestor node further back in the traversal.",
  },
  {
    id: 'dfs-easy-s3-q2',
    type: 'conceptual',
    prompt: 'On the graph used in this quiz, DFS starts at node A. Is that a fixed rule of this implementation, or could it start anywhere?',
    options: [
      { id: 'a', text: "This implementation hardcodes the start node to 'A' — a general DFS could start from any chosen node" },
      { id: 'b', text: 'DFS must always start from the node with the fewest neighbors' },
      { id: 'c', text: 'DFS must always start from whichever node was added to the graph first, regardless of its label' },
      { id: 'd', text: 'The start node is chosen at random every time the algorithm runs' },
    ],
    correctOptionId: 'a',
    explanation:
      "The pseudocode's function signature, dfs(graph, start), takes a start node as a parameter — DFS itself works from any starting node. This particular app's implementation just always calls it with 'A'.",
  },
  {
    id: 'dfs-easy-s3-q3',
    type: 'execution',
    prompt: 'Node A was already visited earlier, and it has just been popped again from the stack. What happens now?',
    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 11 },
    options: [
      { id: 'a', text: "It's already visited, so this iteration does nothing further and moves on to the next pop" },
      { id: 'b', text: 'It gets visited a second time and its neighbors are pushed again' },
      { id: 'c', text: 'The algorithm stops immediately, since a node cannot be popped twice' },
      { id: 'd', text: "A's edges are removed from the graph" },
    ],
    correctOptionId: 'a',
    explanation:
      "This is exactly the case line 5's check exists for: A is already in the visited set, so the 'if node not in visited' condition is false, and the loop simply moves to its next iteration without doing anything else with A.",
  },
  {
    id: 'dfs-easy-s3-q4',
    type: 'execution',
    prompt: 'D has just been popped from the stack for the first time. What happens to it?',
    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 15 },
    options: [
      { id: 'a', text: "D is marked visited, since it hasn't been processed before" },
      { id: 'b', text: 'D is skipped, since it was already visited earlier' },
      { id: 'c', text: "D is pushed back onto the stack without being visited" },
      { id: 'd', text: 'The algorithm ends because D has only one neighbor' },
    ],
    correctOptionId: 'a',
    explanation:
      "D has not appeared in the visited set before this point, so the check on line 5 passes and D is marked visited — its one neighbor (B) will be pushed onto the stack next.",
  },
  {
    id: 'dfs-easy-s3-q5',
    type: 'code',
    prompt: 'Fill in the blank in the DFS pseudocode:',
    codeLines: [
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
      { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'node = stack.pop()', kind: 'plain' }] },
      { lineNumber: 5, indentLevel: 2, tokens: [{ text: 'if node not in visited:', kind: 'plain' }] },
      { lineNumber: 6, indentLevel: 3, tokens: [{ text: 'mark node visited', kind: 'plain' }] },
      { lineNumber: 7, indentLevel: 3, tokens: [{ text: 'push node neighbors onto stack', kind: 'plain' }] },
      { lineNumber: 8, indentLevel: 1, tokens: [{ text: 'return visited', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: 'not' },
      { id: 'b', text: 'still' },
      { id: 'c', text: 'never' },
      { id: 'd', text: 'always' },
    ],
    correctOptionId: 'a',
    explanation:
      "The loop must keep running as long as there is still work left, which is exactly while the stack is NOT empty. Once the stack empties, there is nothing left to pop, and the loop should stop.",
  },
];
