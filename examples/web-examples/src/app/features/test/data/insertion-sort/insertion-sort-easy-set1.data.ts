import type { TestQuestion } from '../../test.types';

// Set 1 / Easy for Insertion Sort
// 2 conceptual, 2 execution, 1 code.
// Execution frameIndex values must be verified against
// insertionSortVisualization([5, 2, 8, 1]) before use.

export const INSERTION_SORT_EASY_SET_1: TestQuestion[] = [
  {
    id: 'is-easy-s1-q1',
    type: 'conceptual',
    prompt: 'What is the main idea behind Insertion Sort?',
    options: [
      {
        id: 'a',
        text: 'Build a sorted portion by taking each new element and inserting it into its correct position',
      },
      {
        id: 'b',
        text: 'Repeatedly find the smallest value in the entire unsorted portion and swap it to the front',
      },
      {
        id: 'c',
        text: 'Split the array into smaller halves and merge the sorted halves',
      },
      {
        id: 'd',
        text: 'Repeatedly compare adjacent elements and swap them when they are out of order',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Insertion Sort grows a sorted portion from left to right. Each new element is taken as the key and inserted into its correct position among the elements already sorted.',
  },

  {
    id: 'is-easy-s1-q2',
    type: 'conceptual',
    prompt: 'What is guaranteed about the left portion of the array after each Insertion Sort iteration?',
    options: [
      {
        id: 'a',
        text: 'The processed portion is sorted',
      },
      {
        id: 'b',
        text: 'The largest value is always at its final position',
      },
      {
        id: 'c',
        text: 'The entire array is sorted',
      },
      {
        id: 'd',
        text: 'Only the first two elements are sorted',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'After processing each element, the portion to its left is maintained in sorted order. The rest of the array may still be unsorted.',
  },

  {
    id: 'is-easy-s1-q3',
    type: 'execution',
    prompt: 'The array is being processed. What happens next?',
    // VERIFY frameIndex against insertionSortVisualization([5, 2, 8, 1]).
    // Intended state: key = 2, comparing 2 with 5.
    visualization: { inputArray: [5, 2, 8, 1], frameIndex: 2 },

    options: [
      {
        id: 'a',
        text: 'The value 5 shifts to the right because it is greater than the key 2',
      },
      {
        id: 'b',
        text: 'The values 5 and 2 are swapped immediately and the iteration ends',
      },
      {
        id: 'c',
        text: 'The value 2 is discarded because it is smaller than 5',
      },
      {
        id: 'd',
        text: 'The algorithm moves directly to value 8',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'When the current key is smaller than the element before it, that larger element shifts one position to the right to make room for the key.',
  },

  {
    id: 'is-easy-s1-q4',
    type: 'execution',
    prompt: 'The current key is larger than the element immediately before it. What happens next?',
    // VERIFY frameIndex against insertionSortVisualization([5, 2, 8, 1]).
    // Intended state: key = 8 and the sorted prefix [2, 5] is already ordered.
    visualization: { inputArray: [5, 2, 8, 1], frameIndex: 9 },

    options: [
      {
        id: 'a',
        text: 'The key stays in its current position because it is already larger than the previous element',
      },
      {
        id: 'b',
        text: 'Every element in the sorted portion shifts one position to the right',
      },
      {
        id: 'c',
        text: 'The key is moved to the beginning of the array',
      },
      {
        id: 'd',
        text: 'The algorithm restarts from the first element',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'If the key is already greater than or equal to the previous sorted element, it is already in the correct position and no shifting is required.',
  },

  {
    id: 'is-easy-s1-q5',
    type: 'code',
    prompt: 'Fill in the blank in the Insertion Sort pseudocode:',

    codeLines: [
      {
        lineNumber: 1,
        indentLevel: 0,
        tokens: [{ text: 'function insertionSort(arr):', kind: 'plain' }],
      },
      {
        lineNumber: 2,
        indentLevel: 1,
        tokens: [{ text: 'for i = 1 to n - 1:', kind: 'plain' }],
      },
      {
        lineNumber: 3,
        indentLevel: 2,
        tokens: [{ text: 'key = arr[i]', kind: 'plain' }],
      },
      {
        lineNumber: 4,
        indentLevel: 2,
        tokens: [{ text: 'j = i - 1', kind: 'plain' }],
      },
      {
        lineNumber: 5,
        indentLevel: 2,
        tokens: [
          { text: 'while j >= 0 and arr[j] ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ' key:', kind: 'plain' },
        ],
      },
      {
        lineNumber: 6,
        indentLevel: 3,
        tokens: [{ text: 'arr[j + 1] = arr[j]', kind: 'plain' }],
      },
      {
        lineNumber: 7,
        indentLevel: 3,
        tokens: [{ text: 'j = j - 1', kind: 'plain' }],
      },
      {
        lineNumber: 8,
        indentLevel: 2,
        tokens: [{ text: 'arr[j + 1] = key', kind: 'plain' }],
      },
      {
        lineNumber: 9,
        indentLevel: 1,
        tokens: [{ text: 'return arr', kind: 'plain' }],
      },
    ],

    options: [
      { id: 'a', text: '>' },
      { id: 'b', text: '<' },
      { id: 'c', text: '==' },
      { id: 'd', text: '!=' },
    ],

    correctOptionId: 'a',
    explanation:
      'For ascending order, elements larger than the key must shift to the right. Therefore the condition is arr[j] > key.',
  },
];