import type { TestQuestion } from '../../test.types';

// Set 2 / Hard for Insertion Sort.
// More analytical than Set 1, with emphasis on shifts, stability,
// partially sorted input, and execution reasoning.

export const INSERTION_SORT_HARD_SET_2: TestQuestion[] = [
  {
    id: 'is-hard-s2-q1',
    type: 'conceptual',
    prompt: 'Which input pattern gives Insertion Sort its best-case behavior?',
    options: [
      {
        id: 'a',
        text: 'An array already sorted in ascending order, because every key is already at the correct position',
      },
      {
        id: 'b',
        text: 'A strictly descending array, because every key moves directly to the front',
      },
      {
        id: 'c',
        text: 'An array containing only duplicate values, because no comparisons are needed',
      },
      {
        id: 'd',
        text: 'A random array, because random values balance the number of shifts',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Insertion Sort is especially efficient when the array is already sorted or nearly sorted. In the fully sorted case, no element needs to be shifted, so the total running time is O(n).',
  },

  {
    id: 'is-hard-s2-q2',
    type: 'conceptual',
    prompt: 'Why is Insertion Sort often described as an adaptive sorting algorithm?',
    options: [
      {
        id: 'a',
        text: 'Its running time improves when the input is already partially sorted',
      },
      {
        id: 'b',
        text: 'It automatically changes into Merge Sort for large arrays',
      },
      {
        id: 'c',
        text: 'It always uses the same number of operations regardless of input order',
      },
      {
        id: 'd',
        text: 'It changes the array size while sorting',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Insertion Sort does not blindly perform the same amount of work for every input. If elements are already close to their final positions, fewer shifts are required, making it efficient for nearly sorted data.',
  },

  {
    id: 'is-hard-s2-q3',
    type: 'conceptual',
    prompt: 'For the array [5, 2, 4, 6, 1, 3], which statement best describes the work done by Insertion Sort when processing the final value 3?',
    options: [
      {
        id: 'a',
        text: 'It shifts every element in the sorted prefix that is greater than 3, then inserts 3 into the resulting gap',
      },
      {
        id: 'b',
        text: 'It searches for the global minimum and swaps 3 with it',
      },
      {
        id: 'c',
        text: 'It swaps 3 only with the element immediately before it',
      },
      {
        id: 'd',
        text: 'It discards 3 because the previous elements are already sorted',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Before processing 3, the prefix [1, 2, 4, 5, 6] is sorted. Insertion Sort walks backward, shifting values greater than 3 and then writes 3 into the open position between 2 and 4.',
  },

  {
    id: 'is-hard-s2-q4',
    type: 'execution',
    prompt: 'The current key is smaller than the element immediately before it. What happens next?',
    visualization: { inputArray: [7, 4, 5, 2, 6], frameIndex: 7 },
    options: [
      {
        id: 'a',
        text: 'The larger element is shifted one position to the right, while the key is temporarily held aside',
      },
      {
        id: 'b',
        text: 'The two elements are permanently swapped and the pass ends',
      },
      {
        id: 'c',
        text: 'The key is discarded because it is smaller than the sorted prefix',
      },
      {
        id: 'd',
        text: 'The algorithm starts scanning from index 0 again without shifting',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Insertion Sort preserves the key while moving backward through the sorted prefix. Whenever arr[j] is greater than the key, arr[j] shifts right and j moves left.',
  },

  {
    id: 'is-hard-s2-q5',
    type: 'execution',
    prompt: 'The key is smaller than multiple values in the sorted prefix. What is the next action?',
    visualization: { inputArray: [7, 4, 5, 2, 6], frameIndex: 15 },
    options: [
      {
        id: 'a',
        text: 'Continue shifting larger values right until reaching a value that is not greater than the key or the beginning of the array',
      },
      {
        id: 'b',
        text: 'Swap the key with the smallest value found so far',
      },
      {
        id: 'c',
        text: 'Stop after shifting exactly one element',
      },
      {
        id: 'd',
        text: 'Restart the entire algorithm from index 0',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Insertion Sort may shift several elements during one pass. The loop continues backward while the current sorted-prefix element is greater than the key.',
  },

  {
    id: 'is-hard-s2-q6',
    type: 'execution',
    prompt: 'The current key is equal to the element immediately before it. What should happen in the standard stable implementation?',
    visualization: { inputArray: [4, 4, 6, 2, 5], frameIndex: 6 },
    options: [
      {
        id: 'a',
        text: 'The equal element is not shifted, so the key remains after it and their relative order is preserved',
      },
      {
        id: 'b',
        text: 'The equal elements must be swapped to continue the insertion',
      },
      {
        id: 'c',
        text: 'Both equal elements are removed from the sorted prefix',
      },
      {
        id: 'd',
        text: 'The algorithm treats equality as a reason to restart the pass',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'The standard implementation shifts only when arr[j] > key. Equality therefore stops the shifting loop, which preserves the relative order of equal elements and gives stability.',
  },

  {
    id: 'is-hard-s2-q7',
    type: 'conceptual',
    prompt: 'If an array of 8 elements is in strictly descending order, how many element shifts can Insertion Sort perform in total?',
    options: [
      {
        id: 'a',
        text: '28',
      },
      {
        id: 'b',
        text: '8',
      },
      {
        id: 'c',
        text: '21',
      },
      {
        id: 'd',
        text: '56',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'For a descending array, the second element requires 1 shift, the third requires 2, and so on up to 7 shifts. The total is 1 + 2 + ... + 7 = 28.',
  },

  {
    id: 'is-hard-s2-q8',
    type: 'code',
    prompt: 'Fill in the blank — where should the key be written after the shifting loop finishes?',
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
        tokens: [
          { text: 'arr[', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: '] = key', kind: 'plain' },
        ],
      },
    ],
    options: [
      { id: 'a', text: 'j + 1' },
      { id: 'b', text: 'j' },
      { id: 'c', text: 'i' },
      { id: 'd', text: 'i + 1' },
    ],
    correctOptionId: 'a',
    explanation:
      'The loop decrements j one position beyond the insertion point. Therefore the key belongs at j + 1 after all larger elements have been shifted right.',
  },

  {
    id: 'is-hard-s2-q9',
    type: 'code',
    prompt: 'Fill in the blank — which condition prevents the algorithm from reading outside the beginning of the array?',
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
          { text: 'while ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ' and arr[j] > key:', kind: 'plain' },
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
    ],
    options: [
      { id: 'a', text: 'j >= 0' },
      { id: 'b', text: 'j <= n - 1' },
      { id: 'c', text: 'j == i' },
      { id: 'd', text: 'j > i' },
    ],
    correctOptionId: 'a',
    explanation:
      'The j >= 0 condition ensures the algorithm stops once it has moved past the first element. Without it, arr[j] could be accessed with a negative index.',
  },

  {
    id: 'is-hard-s2-q10',
    type: 'conceptual',
    prompt: 'Which statement correctly compares Insertion Sort and Selection Sort in terms of writes or movements?',
    options: [
      {
        id: 'a',
        text: 'Insertion Sort can perform many more writes in the worst case, while Selection Sort performs at most n - 1 swaps',
      },
      {
        id: 'b',
        text: 'Selection Sort always performs more writes because it scans the array more often',
      },
      {
        id: 'c',
        text: 'Both algorithms perform exactly n - 1 writes regardless of input order',
      },
      {
        id: 'd',
        text: 'Insertion Sort never moves an element more than once',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Selection Sort limits itself to at most one swap per outer pass, while Insertion Sort may shift many elements during a single insertion. Thus Insertion Sort can perform O(n²) shifts in the worst case.',
  },
];