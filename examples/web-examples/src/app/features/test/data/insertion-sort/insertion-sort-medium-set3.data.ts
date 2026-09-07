import type { TestQuestion } from '../../test.types';

// Set 3 / Medium for Insertion Sort.
// Same structure as the Selection Sort Medium Set 3.
//
// Input used for execution questions:
// [9, 3, 6, 1, 5]

export const INSERTION_SORT_MEDIUM_SET_3: TestQuestion[] = [
  {
    id: 'is-medium-s3-q1',
    type: 'conceptual',
    prompt: 'What determines how many shifts a key causes during an Insertion Sort iteration?',
    options: [
      {
        id: 'a',
        text: 'How many elements in the sorted portion are greater than the key',
      },
      {
        id: 'b',
        text: 'The total number of elements in the array, regardless of their values',
      },
      {
        id: 'c',
        text: 'How many elements are smaller than the key',
      },
      {
        id: 'd',
        text: 'Only the position of the largest element in the array',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'The inner loop shifts every element greater than the key one position to the right. Therefore the number of shifts depends directly on how many sorted-prefix elements are greater than the key.',
  },

  {
    id: 'is-medium-s3-q2',
    type: 'conceptual',
    prompt: 'Why does Insertion Sort process the array from left to right?',
    options: [
      {
        id: 'a',
        text: 'Because it maintains the already-processed left portion as the sorted portion into which each new key is inserted',
      },
      {
        id: 'b',
        text: 'Because the right side of the array cannot be accessed',
      },
      {
        id: 'c',
        text: 'Because only the first element can be compared',
      },
      {
        id: 'd',
        text: 'Because the largest value must always be placed first',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'At each iteration, all elements before i form a sorted prefix. The current element at i becomes the key and is inserted into that prefix.',
  },

  {
    id: 'is-medium-s3-q3',
    type: 'conceptual',
    prompt: 'For the key 5 inserted into the sorted portion [1, 3, 6, 9], how many elements must shift right?',
    options: [
      { id: 'a', text: '2 — the values 9 and 6 are greater than 5' },
      { id: 'b', text: '1 — only the largest value moves' },
      { id: 'c', text: '3 — every element except 1 moves' },
      { id: 'd', text: '0 — 5 is inserted without any comparison' },
    ],
    correctOptionId: 'a',
    explanation:
      'The algorithm scans from right to left. Both 9 and 6 are greater than 5, so they shift right. It stops when it reaches 3 because 3 is smaller than 5.',
  },

  {
    id: 'is-medium-s3-q4',
    type: 'execution',
    prompt: 'The key is 5 and the sorted portion is [1, 3, 6, 9]. What happens when the algorithm compares 5 with 6?',
    // Frame representing key 5 compared with 6.
    visualization: { inputArray: [9, 3, 6, 1, 5], frameIndex: 28 },

    options: [
      {
        id: 'a',
        text: '6 shifts one position to the right because 6 is greater than 5',
      },
      {
        id: 'b',
        text: '5 is inserted before 9 immediately',
      },
      {
        id: 'c',
        text: '6 stays in place because it is smaller than 5',
      },
      {
        id: 'd',
        text: 'The algorithm finishes because 9 was already shifted',
      },
    ],

    correctOptionId: 'a',
    explanation:
      'Since 6 is greater than the key 5, it must shift right. The algorithm then continues leftward and compares 5 with 3.',
  },

  {
    id: 'is-medium-s3-q5',
    type: 'execution',
    prompt: 'The key 5 has already shifted 9 and 6. What happens when it reaches 3?',
    // Frame representing the stopping condition for key 5.
    visualization: { inputArray: [9, 3, 6, 1, 5], frameIndex: 31 },

    options: [
      {
        id: 'a',
        text: 'The loop stops because 3 is not greater than 5, and 5 is inserted after 3',
      },
      {
        id: 'b',
        text: '3 shifts right because every element must move during insertion',
      },
      {
        id: 'c',
        text: '5 moves to index 0 because the scan reached the beginning',
      },
      {
        id: 'd',
        text: 'The algorithm starts another pass before inserting 5',
      },
    ],

    correctOptionId: 'a',
    explanation:
      'The condition is arr[j] > key. Since 3 > 5 is false, the loop stops. The key is then written to j + 1, producing [1, 3, 5, 6, 9].',
  },

  {
    id: 'is-medium-s3-q6',
    type: 'conceptual',
    prompt: 'Which statement best explains why Insertion Sort is adaptive?',
    options: [
      {
        id: 'a',
        text: 'Its amount of work decreases when elements are already close to their correct positions',
      },
      {
        id: 'b',
        text: 'It automatically changes to another sorting algorithm for difficult inputs',
      },
      {
        id: 'c',
        text: 'It always performs the same number of shifts regardless of input order',
      },
      {
        id: 'd',
        text: 'It only works correctly when the input is already sorted',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Insertion Sort does not blindly scan the entire prefix. The inner loop stops as soon as it reaches an element that is not greater than the key, so nearly sorted inputs require much less work.',
  },

  {
    id: 'is-medium-s3-q7',
    type: 'code',
    prompt: 'Fill in the blank — what condition stops the shifting loop when the correct insertion position has been reached?',

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
      { id: 'd', text: '>=' },
    ],

    correctOptionId: 'a',
    explanation:
      'The loop should continue only while the current sorted element is strictly greater than the key. When arr[j] <= key, the correct insertion position has been reached.',
  },
];