import type { TestQuestion } from '../../models/test.types';

// Set 1 / Easy for Bubble Sort — content from the quiz-content pass,
// reshaped into TestQuestion. frameIndex values were verified by
// actually running bubbleSortVisualization([5, 2, 8, 1]) and reading the
// resulting Recording, not guessed — see the chat history for the trace.
// Ordered by type on purpose: conceptual, conceptual, execution,
// execution, code — not shuffled, so question order always groups by
// type even though each question's own options are shuffled.
export const BUBBLE_SORT_EASY_SET_1: TestQuestion[] = [
  {
    id: 'bs-easy-s1-q1',
    type: 'conceptual',
    prompt: 'What is the main goal of the Bubble Sort algorithm?',
    options: [
      { id: 'a', text: 'Sorting an array by repeatedly comparing and swapping adjacent elements' },
      { id: 'b', text: 'Searching for a specific element in an array' },
      { id: 'c', text: 'Splitting an array into smaller subarrays and merging them' },
      { id: 'd', text: 'Finding the shortest path between two nodes' },
    ],
    correctOptionId: 'a',
    explanation:
      'Bubble Sort repeatedly compares each pair of adjacent elements and swaps them if they are in the wrong order, gradually sorting the array.',
  },
  {
    id: 'bs-easy-s1-q3',
    type: 'conceptual',
    prompt: 'What is guaranteed after one full pass of Bubble Sort over the array?',
    options: [
      { id: 'a', text: 'The largest remaining element is now at the end of the array' },
      { id: 'b', text: 'The entire array is fully sorted' },
      { id: 'c', text: 'The smallest element is now at the start of the array' },
      { id: 'd', text: 'Half of the array is sorted' },
    ],
    correctOptionId: 'a',
    explanation:
      'Each full pass pushes the largest unprocessed value toward the end of the array, so after one pass at least the last position holds its final value.',
  },
  {
    id: 'bs-easy-s1-q2',
    type: 'execution',
    prompt: 'The array is being processed. What happens next?',
    visualization: { inputArray: [5, 2, 8, 1], frameIndex: 2 },
    options: [
      { id: 'a', text: 'The elements swap, because 5 is greater than 2' },
      { id: 'b', text: 'The elements stay in place, because 5 is less than 2' },
      { id: 'c', text: 'Index 2 and 3 are compared next without touching index 0 and 1' },
      { id: 'd', text: 'The algorithm ends' },
    ],
    correctOptionId: 'a',
    explanation: 'arr[0]=5 is greater than arr[1]=2, so Bubble Sort swaps them.',
  },
  {
    id: 'bs-easy-s1-q4',
    type: 'execution',
    prompt: 'The array is being processed. What happens next?',
    visualization: { inputArray: [5, 2, 8, 1], frameIndex: 15 },
    options: [
      { id: 'a', text: 'The elements stay in place, because 2 is less than 5' },
      { id: 'b', text: 'The elements swap, because 2 is less than 5' },
      { id: 'c', text: 'Index 2 and 3 are compared instead' },
      { id: 'd', text: 'The algorithm restarts from index 0' },
    ],
    correctOptionId: 'a',
    explanation: 'arr[0]=2 is already less than arr[1]=5, so the order is correct and no swap happens.',
  },
  {
    id: 'bs-easy-s1-q5',
    type: 'code',
    prompt: 'Fill in the blank in the Bubble Sort pseudocode:',
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function bubbleSort(arr):', kind: 'plain' }] },
      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'for i = 0 to n - 2:', kind: 'plain' }] },
      { lineNumber: 3, indentLevel: 2, tokens: [{ text: 'for j = 0 to n - i - 2:', kind: 'plain' }] },
      {
        lineNumber: 4,
        indentLevel: 3,
        tokens: [
          { text: 'if arr[j] ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ' arr[j + 1]:', kind: 'plain' },
        ],
      },
      { lineNumber: 5, indentLevel: 4, tokens: [{ text: 'swap(arr[j], arr[j + 1])', kind: 'plain' }] },
      { lineNumber: 6, indentLevel: 1, tokens: [{ text: 'return arr', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: '>' },
      { id: 'b', text: '<' },
      { id: 'c', text: '==' },
      { id: 'd', text: '!=' },
    ],
    correctOptionId: 'a',
    explanation:
      'To sort in ascending order, a swap is needed whenever the current element is greater than the next one - arr[j] > arr[j + 1].',
  },
];
