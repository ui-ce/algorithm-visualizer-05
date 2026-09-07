import type { TestQuestion } from '../../test.types';

// Set 2 / Easy for Insertion Sort
// 2 conceptual, 2 execution, 1 code.
// frameIndex values verified against a precise simulation of
// insertionSortVisualization([4, 1, 3, 2]) (not guessed).

export const INSERTION_SORT_EASY_SET_2: TestQuestion[] = [
  {
    id: 'is-easy-s2-q1',
    type: 'conceptual',
    prompt: 'Why is Insertion Sort considered an "in-place" algorithm?',
    options: [
      {
        id: 'a',
        text: 'It only moves elements around within the original array and needs just a few helper variables like key and j',
      },
      {
        id: 'b',
        text: 'Because it is always faster than algorithms that need an auxiliary array',
      },
      {
        id: 'c',
        text: 'Because it only works on arrays smaller than 10 elements',
      },
      {
        id: 'd',
        text: 'Because it returns its final result in a new, separate array',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Insertion Sort never builds a second array the size of the input; it only shifts elements within the same array while keeping track of key and j, so its extra space requirement is roughly O(1).',
  },

  {
    id: 'is-easy-s2-q2',
    type: 'conceptual',
    prompt: 'If the input array is already fully sorted, what does Insertion Sort do for each element?',
    options: [
      {
        id: 'a',
        text: 'It compares the key only with the element right before it, finds that element is not larger, and leaves the key in place with no shifting',
      },
      {
        id: 'b',
        text: 'It still shifts every element of the sorted portion one by one',
      },
      {
        id: 'c',
        text: 'It rebuilds the array from the end to the beginning',
      },
      {
        id: 'd',
        text: 'It stops the algorithm early, since the array is already sorted',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'On an already-sorted array, every key is always greater than or equal to the element before it, so the inner loop stops immediately and no shifting happens. This is why the best-case running time of Insertion Sort is linear (Θ(n)).',
  },

  {
    id: 'is-easy-s2-q3',
    type: 'execution',
    prompt: 'The current key is 1, and the sorted portion is only [4]. What happens next?',
    // frameIndex verified against insertionSortVisualization([4, 1, 3, 2]).
    // Frame 2: i=1, key=1 just picked up, before any comparison.
    visualization: { inputArray: [4, 1, 3, 2], frameIndex: 2 },

    options: [
      {
        id: 'a',
        text: '4 shifts one position to the right, because it is greater than the key 1',
      },
      {
        id: 'b',
        text: '1 stays in its current position immediately, because it is smaller than 4',
      },
      {
        id: 'c',
        text: '4 and 1 are swapped directly with each other',
      },
      {
        id: 'd',
        text: 'The algorithm moves straight on to the next element (3)',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Since 4 is greater than the key 1, it must shift one position to the right to make room for 1 to be inserted at the start of the array.',
  },

  {
    id: 'is-easy-s2-q4',
    type: 'execution',
    prompt: 'The current key is 3, and the sorted portion is [1, 4]. What happens next?',
    // frameIndex verified against insertionSortVisualization([4, 1, 3, 2]).
    // Frame 6: i=2, key=3 just picked up, before any comparison.
    visualization: { inputArray: [4, 1, 3, 2], frameIndex: 6 },

    options: [
      {
        id: 'a',
        text: '4 shifts one position to the right, because it is greater than the key 3; then 1 is checked and found not to be greater',
      },
      {
        id: 'b',
        text: 'Both 1 and 4 shift to the right immediately',
      },
      {
        id: 'c',
        text: '3 is placed at the end of the array without any comparisons',
      },
      {
        id: 'd',
        text: 'The entire sorted portion is discarded',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Insertion Sort scans the sorted portion from right to left. 4 is greater than 3 and shifts, but 1 is not greater than 3; so the scan stops right there and 3 is inserted between 1 and 4.',
  },

  {
    id: 'is-easy-s2-q5',
    type: 'code',
    prompt: 'Fill in the blank in the Insertion Sort pseudocode — what should j be initialized to?',

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
        tokens: [
          { text: 'j = i - ', kind: 'plain' },
          { text: '____', kind: 'blank' },
        ],
      },
      {
        lineNumber: 5,
        indentLevel: 2,
        tokens: [{ text: 'while j >= 0 and arr[j] > key:', kind: 'plain' }],
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
      { id: 'a', text: '1' },
      { id: 'b', text: '0' },
      { id: 'c', text: '2' },
      { id: 'd', text: 'i' },
    ],

    correctOptionId: 'a',
    explanation:
      'j must point to the element immediately before the key so the comparison starts there. Since the key lives at index i, the correct starting value for j is i - 1.',
  },
];