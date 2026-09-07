import type { TestQuestion } from '../../test.types';

// Set 2 / Medium for Insertion Sort.
// Uses the same visualization style as Selection Sort's Medium sets.
//
// Input used for execution questions:
// [9, 3, 6, 1, 5]

export const INSERTION_SORT_MEDIUM_SET_2: TestQuestion[] = [
  {
    id: 'is-medium-s2-q1',
    type: 'conceptual',
    prompt: 'How does Insertion Sort behave on a reverse-sorted array?',
    options: [
      {
        id: 'a',
        text: 'It performs its maximum amount of shifting, giving O(n²) time',
      },
      {
        id: 'b',
        text: 'It becomes O(n) because every key is inserted immediately',
      },
      {
        id: 'c',
        text: 'It performs no shifts because the sorted portion is built from right to left',
      },
      {
        id: 'd',
        text: 'It automatically switches to Merge Sort',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'In a reverse-sorted array, every new key is smaller than all elements in the sorted prefix. Each key therefore shifts across that entire prefix, producing quadratic work.',
  },

  {
    id: 'is-medium-s2-q2',
    type: 'conceptual',
    prompt: 'Is the standard Insertion Sort implementation stable?',
    options: [
      {
        id: 'a',
        text: 'Yes — using arr[j] > key keeps equal elements in their original relative order',
      },
      {
        id: 'b',
        text: 'No — every insertion reverses equal elements',
      },
      {
        id: 'c',
        text: 'Only when the array contains no duplicate values',
      },
      {
        id: 'd',
        text: 'No — because it sorts the array in place',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'With the strict > comparison, an element equal to the key is not shifted past it. Therefore equal elements keep their relative order, making the standard implementation stable.',
  },

  {
    id: 'is-medium-s2-q3',
    type: 'conceptual',
    prompt: 'What is the extra space complexity of the standard Insertion Sort implementation?',
    options: [
      {
        id: 'a',
        text: 'O(1), because it sorts the input array in place using only a few variables',
      },
      {
        id: 'b',
        text: 'O(n), because a second array is created for every insertion',
      },
      {
        id: 'c',
        text: 'O(log n), because the sorted portion is stored recursively',
      },
      {
        id: 'd',
        text: 'O(n²), because every comparison needs extra memory',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Insertion Sort only needs variables such as key, i, and j in addition to the input array. It does not allocate another array proportional to n.',
  },

  {
    id: 'is-medium-s2-q4',
    type: 'execution',
    prompt: 'The key 1 is being inserted into the sorted portion [3, 6, 9]. What happens first?',
    // Frame representing key 1 starting to move through the sorted prefix.
    visualization: { inputArray: [9, 3, 6, 1, 5], frameIndex: 18 },

    options: [
      {
        id: 'a',
        text: '9 shifts one position to the right because 9 is greater than 1',
      },
      {
        id: 'b',
        text: '3 shifts first because it is the first element of the sorted portion',
      },
      {
        id: 'c',
        text: '1 is inserted after 9',
      },
      {
        id: 'd',
        text: 'The algorithm skips the key because 1 is the smallest value',
      },
    ],

    correctOptionId: 'a',
    explanation:
      'Insertion Sort scans the sorted portion from right to left. It first compares the key 1 with 9, so 9 shifts right.',
  },

  {
    id: 'is-medium-s2-q5',
    type: 'execution',
    prompt: 'The key 1 is smaller than 9, 6, and 3. What happens after all three larger values have shifted?',
    // Frame representing the final insertion of 1.
    visualization: { inputArray: [9, 3, 6, 1, 5], frameIndex: 23 },

    options: [
      {
        id: 'a',
        text: '1 is inserted at index 0, producing the sorted prefix [1, 3, 6, 9]',
      },
      {
        id: 'b',
        text: '1 is inserted at index 3 because that is where it started',
      },
      {
        id: 'c',
        text: '1 is inserted after 3 because 3 was the first element checked',
      },
      {
        id: 'd',
        text: 'The key remains outside the sorted portion',
      },
    ],

    correctOptionId: 'a',
    explanation:
      'All elements in the sorted prefix are greater than 1, so they shift right. Once j becomes -1, the insertion position is j + 1 = 0.',
  },

  {
    id: 'is-medium-s2-q6',
    type: 'conceptual',
    prompt: 'Why can Insertion Sort be faster than its O(n²) worst-case bound suggests on nearly sorted input?',
    options: [
      {
        id: 'a',
        text: 'The inner loop stops quickly because most keys require few or no shifts',
      },
      {
        id: 'b',
        text: 'The algorithm changes its complexity to O(log n)',
      },
      {
        id: 'c',
        text: 'It ignores elements that are already sorted',
      },
      {
        id: 'd',
        text: 'It uses a second array to avoid comparisons',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Insertion Sort is adaptive. When a key is already close to its correct position, only a few comparisons and shifts are necessary.',
  },

  {
    id: 'is-medium-s2-q7',
    type: 'code',
    prompt: 'Fill in the blank — where is the key finally placed after the shifting loop ends?',

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
      {
        lineNumber: 9,
        indentLevel: 1,
        tokens: [{ text: 'return arr', kind: 'plain' }],
      },
    ],

    options: [
      { id: 'a', text: 'j + 1' },
      { id: 'b', text: 'j' },
      { id: 'c', text: 'i - 1' },
      { id: 'd', text: 'i + 1' },
    ],

    correctOptionId: 'a',
    explanation:
      'The shifting loop decreases j one position at a time. When it stops, j points to the element before the key’s correct position, so the key belongs at j + 1.',
  },
];