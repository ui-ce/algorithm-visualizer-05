import type { TestQuestion } from '../../models/test.types';

// Set 3 / Medium for Selection Sort. Reuses [9, 3, 6, 1, 5] with
// different frames/wording than Sets 1 and 2.
export const SELECTION_SORT_MEDIUM_SET_3: TestQuestion[] = [
  {
    id: 'ss-medium-s3-q1',
    type: 'conceptual',
    prompt: 'Why is Selection Sort sometimes preferred over Bubble Sort when the swap/write operation itself is expensive (e.g. writing to flash memory)?',
    options: [
      { id: 'a', text: "It performs far fewer swaps — at most n - 1 — even though its comparison count is the same order as Bubble Sort's" },
      { id: 'b', text: "It has a better asymptotic time complexity than Bubble Sort" },
      { id: 'c', text: "It doesn't need to make any comparisons" },
      { id: 'd', text: "It is a stable sorting algorithm, unlike Bubble Sort" },
    ],
    correctOptionId: 'a',
    explanation:
      "Both algorithms are O(n²) in comparisons, so that part is a wash. But Selection Sort caps its writes at n - 1 swaps total, while Bubble Sort can perform up to n(n - 1) / 2 swaps — a real difference when each write is costly.",
  },
  {
    id: 'ss-medium-s3-q2',
    type: 'conceptual',
    prompt: 'How many total passes does Selection Sort make over an array of n elements?',
    options: [
      { id: 'a', text: 'n - 1' },
      { id: 'b', text: 'n' },
      { id: 'c', text: 'log n' },
      { id: 'd', text: 'n / 2' },
    ],
    correctOptionId: 'a',
    explanation:
      "The outer loop runs for i = 0 to n - 2 inclusive, which is n - 1 passes — once the first n - 1 elements are placed, the last one is automatically correct.",
  },
  {
    id: 'ss-medium-s3-q3',
    type: 'conceptual',
    prompt: 'What does the variable minIndex represent while a pass is running?',
    options: [
      { id: 'a', text: 'The index of the smallest value found so far during the current pass\u2019s scan' },
      { id: 'b', text: 'The smallest value itself, not its position' },
      { id: 'c', text: 'The index of the current pass' },
      { id: 'd', text: 'The number of elements left to scan' },
    ],
    correctOptionId: 'a',
    explanation:
      'minIndex tracks a position, not a value — it updates every time a smaller element is found, and the algorithm swaps arr[i] with arr[minIndex] only once the whole pass finishes.',
  },
  {
    id: 'ss-medium-s3-q4',
    type: 'execution',
    prompt: 'The second pass has just finished scanning. What happens now?',
    // Frame 19 for [9, 3, 6, 1, 5]: pass i=1 ends with minIndex still equal to i, so no swap — "Already in place".
    visualization: { inputArray: [9, 3, 6, 1, 5], frameIndex: 19 },
    options: [
      { id: 'a', text: 'No swap happens, because index 1 already held the smallest remaining value' },
      { id: 'b', text: 'Index 1 swaps with index 4' },
      { id: 'c', text: 'A new candidate minimum is found' },
      { id: 'd', text: 'The pass restarts from index 1' },
    ],
    correctOptionId: 'a',
    explanation:
      'minIndex never changed away from 1 during this pass, meaning arr[1] was already the smallest remaining value — so the algorithm skips the swap and moves straight to locking index 1 in as sorted.',
  },
  {
    id: 'ss-medium-s3-q5',
    type: 'execution',
    prompt: 'The array is mid-pass. What happens next?',
    // Frame 8 for [9, 3, 6, 1, 5]: pass i=0, comparing index 4 (value 5) against the current minimum, index 3 (value 1).
    visualization: { inputArray: [9, 3, 6, 1, 5], frameIndex: 8 },
    options: [
      { id: 'a', text: 'The candidate minimum stays at index 3, because 5 is not less than 1' },
      { id: 'b', text: 'Index 3 and 4 swap, because 5 is greater than 1' },
      { id: 'c', text: 'Index 4 becomes the new minimum' },
      { id: 'd', text: 'The first pass ends without checking index 4' },
    ],
    correctOptionId: 'a',
    explanation: 'arr[4]=5 is not smaller than the current minimum arr[3]=1, so nothing changes.',
  },
  {
    id: 'ss-medium-s3-q6',
    type: 'execution',
    prompt: 'The second pass is underway. What happens next?',
    // Frame 13 for [9, 3, 6, 1, 5]: pass i=1, comparing index 2 (value 6) against the current minimum, index 1 (value 3).
    visualization: { inputArray: [9, 3, 6, 1, 5], frameIndex: 13 },
    options: [
      { id: 'a', text: 'The candidate minimum stays at index 1, because 6 is not less than 3' },
      { id: 'b', text: 'Index 1 and 2 swap, because 6 is greater than 3' },
      { id: 'c', text: 'Index 2 becomes the new minimum' },
      { id: 'd', text: 'The pass ends without checking index 3 and 4' },
    ],
    correctOptionId: 'a',
    explanation: 'arr[2]=6 is not smaller than the current minimum arr[1]=3, so nothing changes.',
  },
  {
    id: 'ss-medium-s3-q7',
    type: 'code',
    prompt: 'Fill in the blank — what should minIndex be initialized to at the start of each pass?',
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function selectionSort(arr):', kind: 'plain' }] },
      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'for i = 0 to n - 2:', kind: 'plain' }] },
      {
        lineNumber: 3,
        indentLevel: 2,
        tokens: [
          { text: 'minIndex = ', kind: 'plain' },
          { text: '____', kind: 'blank' },
        ],
      },
      { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'for j = i + 1 to n - 1:', kind: 'plain' }] },
      { lineNumber: 5, indentLevel: 3, tokens: [{ text: 'if arr[j] < arr[minIndex]: minIndex = j', kind: 'plain' }] },
      { lineNumber: 6, indentLevel: 2, tokens: [{ text: 'swap(arr[i], arr[minIndex])', kind: 'plain' }] },
      { lineNumber: 7, indentLevel: 1, tokens: [{ text: 'return arr', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: 'i' },
      { id: 'b', text: '0' },
      { id: 'c', text: 'i + 1' },
      { id: 'd', text: 'n - 1' },
    ],
    correctOptionId: 'a',
    explanation:
      "minIndex starts by assuming the current front element (index i) is the minimum, and the scan afterward only updates it if it finds actual proof otherwise.",
  },
];
