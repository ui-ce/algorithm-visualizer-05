import type { TestQuestion } from '../../test.types';

// Set 1 / Easy for Selection Sort. Same shape as Bubble Sort's Easy sets
// (2 conceptual, 2 execution, 1 code — grouped by type, options shuffled
// per-question). frameIndex values were verified by actually running
// selectionSortVisualization([5, 2, 8, 1]) through the recorder + framer
// and reading the resulting animation, not guessed — see the standalone
// trace script used for this pass.
export const SELECTION_SORT_EASY_SET_1: TestQuestion[] = [
  {
    id: 'ss-easy-s1-q1',
    type: 'conceptual',
    prompt: 'What is the main goal of the Selection Sort algorithm?',
    options: [
      {
        id: 'a',
        text: 'Repeatedly finding the smallest remaining element and placing it at the front of the unsorted portion',
      },
      { id: 'b', text: 'Splitting the array into halves and merging them back in order' },
      { id: 'c', text: 'Searching for a specific value using binary search' },
      { id: 'd', text: 'Repeatedly swapping adjacent elements until the array is sorted' },
    ],
    correctOptionId: 'a',
    explanation:
      "Selection Sort scans the unsorted portion of the array each pass to find its minimum value, then swaps it into the next position — unlike Bubble Sort, which only ever compares neighbors.",
  },
  {
    id: 'ss-easy-s1-q2',
    type: 'conceptual',
    prompt: 'What is guaranteed after one full pass of Selection Sort?',
    options: [
      { id: 'a', text: 'The smallest remaining value is now at the front of the unsorted portion' },
      { id: 'b', text: 'The array is fully sorted' },
      { id: 'c', text: 'The largest value is now at the end of the array' },
      { id: 'd', text: 'Half of the array is sorted' },
    ],
    correctOptionId: 'a',
    explanation:
      "Each pass scans the rest of the array once, finds its minimum, and swaps it into the next front position — the opposite end from Bubble Sort, which fixes values at the back.",
  },
  {
    id: 'ss-easy-s1-q3',
    type: 'execution',
    prompt: 'The array is being processed. What happens next?',
    // Frame 2 for [5, 2, 8, 1]: comparing candidate index 1 (value 2) against the current minimum, index 0 (value 5).
    visualization: { inputArray: [5, 2, 8, 1], frameIndex: 2 },
    options: [
      { id: 'a', text: 'Index 1 becomes the new candidate minimum, because 2 is less than 5' },
      { id: 'b', text: 'Index 0 and 1 swap immediately, because 2 is less than 5' },
      { id: 'c', text: 'Index 1 is skipped and index 2 is compared next' },
      { id: 'd', text: 'The pass ends here' },
    ],
    correctOptionId: 'a',
    explanation:
      'arr[1]=2 is less than the current minimum arr[0]=5, so index 1 becomes the new candidate minimum — but no swap happens yet. Selection Sort only swaps once, after the whole pass finishes scanning.',
  },
  {
    id: 'ss-easy-s1-q4',
    type: 'execution',
    prompt: 'The second pass is underway. What happens next?',
    // Frame 13 for [5, 2, 8, 1]: pass i=1, comparing index 3 (value 5) against the current minimum, index 1 (value 2).
    visualization: { inputArray: [5, 2, 8, 1], frameIndex: 13 },
    options: [
      { id: 'a', text: 'The current minimum stays at index 1, because 5 is not less than 2' },
      { id: 'b', text: 'Index 1 and 3 swap, because 5 is greater than 2' },
      { id: 'c', text: 'Index 3 becomes the new minimum' },
      { id: 'd', text: 'The pass restarts from index 1' },
    ],
    correctOptionId: 'a',
    explanation:
      "arr[3]=5 is not less than the current minimum arr[1]=2, so the candidate minimum doesn't change and the pass simply continues to the next comparison.",
  },
  {
    id: 'ss-easy-s1-q5',
    type: 'code',
    prompt: 'Fill in the blank in the Selection Sort pseudocode:',
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function selectionSort(arr):', kind: 'plain' }] },
      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'for i = 0 to n - 2:', kind: 'plain' }] },
      { lineNumber: 3, indentLevel: 2, tokens: [{ text: 'minIndex = i', kind: 'plain' }] },
      { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'for j = i + 1 to n - 1:', kind: 'plain' }] },
      {
        lineNumber: 5,
        indentLevel: 3,
        tokens: [
          { text: 'if arr[j] ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ' arr[minIndex]: minIndex = j', kind: 'plain' },
        ],
      },
      { lineNumber: 6, indentLevel: 2, tokens: [{ text: 'swap(arr[i], arr[minIndex])', kind: 'plain' }] },
      { lineNumber: 7, indentLevel: 1, tokens: [{ text: 'return arr', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: '<' },
      { id: 'b', text: '>' },
      { id: 'c', text: '==' },
      { id: 'd', text: '!=' },
    ],
    correctOptionId: 'a',
    explanation:
      'Selection Sort is looking for the smallest value, so the comparison must check whether the candidate is smaller than the current minimum — arr[j] < arr[minIndex].',
  },
];
