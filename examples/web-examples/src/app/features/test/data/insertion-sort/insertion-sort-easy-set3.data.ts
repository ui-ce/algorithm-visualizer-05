import type { TestQuestion } from '../../test.types';

// Set 3 / Easy for Insertion Sort
// 2 conceptual, 2 execution, 1 code.
// frameIndex values verified against a precise simulation of
// insertionSortVisualization([3, 6, 1, 4]) (not guessed).

export const INSERTION_SORT_EASY_SET_3: TestQuestion[] = [
  {
    id: 'is-easy-s3-q1',
    type: 'conceptual',
    prompt: 'In the Insertion Sort pseudocode, what exactly does the variable key hold?',
    options: [
      {
        id: 'a',
        text: 'The value of the element currently being inserted into the sorted portion',
      },
      {
        id: 'b',
        text: 'The smallest value found so far in the whole array',
      },
      {
        id: 'c',
        text: 'The index of the last element of the sorted portion',
      },
      {
        id: 'd',
        text: 'A value that must be removed by the end of execution',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'On every iteration of the outer loop, key holds the value arr[i] until the correct spot for it in the sorted portion is found and it gets inserted there.',
  },

  {
    id: 'is-easy-s3-q2',
    type: 'conceptual',
    prompt: 'Why is the element at index 0 already considered part of the "sorted portion" from the very first moment?',
    options: [
      {
        id: 'a',
        text: 'An array with just one element is trivially sorted, so it needs no comparison at all',
      },
      {
        id: 'b',
        text: 'Because the smallest value in the array is always at index 0',
      },
      {
        id: 'c',
        text: 'Because the algorithm reads the array from right to left',
      },
      {
        id: 'd',
        text: 'Because index 0 never gets shifted',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'The outer loop starts at index 1, so index 0 is never chosen as a key — it counts as a one-element sorted portion right from the start.',
  },

  {
    id: 'is-easy-s3-q3',
    type: 'execution',
    prompt: 'The current key is 6, and the sorted portion is only [3]. What happens next?',
    // frameIndex verified against insertionSortVisualization([3, 6, 1, 4]).
    // Frame 2: i=1, key=6 just picked up, before any comparison.
    visualization: { inputArray: [3, 6, 1, 4], frameIndex: 2 },

    options: [
      {
        id: 'a',
        text: 'No shift happens, because 3 is not greater than the key 6; 6 stays right where it is',
      },
      {
        id: 'b',
        text: '3 shifts one position to the right',
      },
      {
        id: 'c',
        text: '3 and 6 are swapped with each other',
      },
      {
        id: 'd',
        text: 'The algorithm stops immediately',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Since arr[0]=3 is not greater than the key 6, the inner loop condition fails right away; so no shifting happens and 6 stays in place.',
  },

  {
    id: 'is-easy-s3-q4',
    type: 'execution',
    prompt: 'The current key is 1, and the sorted portion is [3, 6]. What happens next?',
    // frameIndex verified against insertionSortVisualization([3, 6, 1, 4]).
    // Frame 4: i=2, key=1 just picked up, before any comparison.
    visualization: { inputArray: [3, 6, 1, 4], frameIndex: 4 },

    options: [
      {
        id: 'a',
        text: '6 shifts one position to the right, because it is greater than the key 1',
      },
      {
        id: 'b',
        text: '1 stays in its current position immediately',
      },
      {
        id: 'c',
        text: 'Only 3 shifts and 6 is ignored',
      },
      {
        id: 'd',
        text: 'The sorted portion is entirely reversed',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Since 1 is smaller than every element of the sorted portion [3, 6], the scan starts from the right: first 6, being greater, shifts; 3 will shift next too, so 1 can be inserted at the very start of the array.',
  },

  {
    id: 'is-easy-s3-q5',
    type: 'code',
    prompt: 'Fill in the blank in the Insertion Sort pseudocode — which slot should the shifted element be written to?',

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
        tokens: [{ text: 'while j >= 0 and arr[j] > key:', kind: 'plain' }],
      },
      {
        lineNumber: 6,
        indentLevel: 3,
        tokens: [
          { text: 'arr[j + ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: '] = arr[j]', kind: 'plain' },
        ],
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
      { id: 'a', text: '1' },
      { id: 'b', text: '0' },
      { id: 'c', text: '-1' },
      { id: 'd', text: '2' },
    ],

    correctOptionId: 'a',
    explanation:
      'The larger element arr[j] must move one slot to the right to free up its spot for the key, so it needs to be written to arr[j + 1].',
  },
];