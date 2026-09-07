import type { TestQuestion } from '../../test.types';

// Set 1 / Medium for Insertion Sort.
// Mixes conceptual and execution questions with one code question,
// matching the "Medium — Mixed" quiz structure.
//
// Input used for execution questions:
// [9, 3, 6, 1, 5]

export const INSERTION_SORT_MEDIUM_SET_1: TestQuestion[] = [
  {
    id: 'is-medium-s1-q1',
    type: 'conceptual',
    prompt: 'What is the worst-case time complexity of Insertion Sort on an array of n elements?',
    options: [
      {
        id: 'a',
        text: 'O(n²), because an element may need to be shifted across most of the sorted portion',
      },
      {
        id: 'b',
        text: 'O(n), because every element is processed exactly once',
      },
      {
        id: 'c',
        text: 'O(log n), because the sorted portion is searched efficiently',
      },
      {
        id: 'd',
        text: 'O(n log n), because each insertion takes logarithmic time',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'In the worst case, such as a reverse-sorted array, every new key may need to move across the entire sorted portion. The total number of shifts and comparisons is therefore O(n²).',
  },

  {
    id: 'is-medium-s1-q2',
    type: 'conceptual',
    prompt: 'What is the best-case time complexity of Insertion Sort, and when does it occur?',
    options: [
      {
        id: 'a',
        text: 'O(n), when the array is already sorted or nearly requires no shifts',
      },
      {
        id: 'b',
        text: 'O(n²), because the inner loop always scans the whole sorted portion',
      },
      {
        id: 'c',
        text: 'O(log n), when the array is already sorted',
      },
      {
        id: 'd',
        text: 'O(n log n), because every element must be inserted using binary search',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'When the array is already sorted, each key only needs to be compared with the previous element and no shifting is required. The total work is linear.',
  },

  {
    id: 'is-medium-s1-q3',
    type: 'execution',
    prompt: 'The array is being processed. What happens when the current key is 3?',
    // Frame selected to represent the comparison of key 3 with 9.
    visualization: { inputArray: [9, 3, 6, 1, 5], frameIndex: 4 },

    options: [
      {
        id: 'a',
        text: 'The value 9 shifts one position to the right because 9 is greater than the key 3',
      },
      {
        id: 'b',
        text: 'The key 3 is immediately placed at index 0 and the iteration ends',
      },
      {
        id: 'c',
        text: 'The value 9 stays in place because the key is smaller',
      },
      {
        id: 'd',
        text: 'The algorithm starts processing the next key, 6',
      },
    ],

    correctOptionId: 'a',
    explanation:
      'The sorted portion initially contains [9]. Since 9 is greater than the key 3, it shifts one position to the right to make room for 3.',
  },

  {
    id: 'is-medium-s1-q4',
    type: 'execution',
    prompt: 'The key 6 is being inserted into the sorted portion [3, 9]. What happens next?',
    // Frame representing key 6 being compared with 9.
    visualization: { inputArray: [9, 3, 6, 1, 5], frameIndex: 10 },

    options: [
      {
        id: 'a',
        text: '9 shifts one position to the right because 9 is greater than 6',
      },
      {
        id: 'b',
        text: '3 shifts right because 3 is greater than 6',
      },
      {
        id: 'c',
        text: '6 is inserted before 3 immediately',
      },
      {
        id: 'd',
        text: 'The key 6 is discarded because the sorted portion already contains two elements',
      },
    ],

    correctOptionId: 'a',
    explanation:
      'The sorted portion is [3, 9]. The key is 6, so 9 must shift right. The next comparison is then made with 3, which is smaller than 6.',
  },

  {
    id: 'is-medium-s1-q5',
    type: 'execution',
    prompt: 'The key 6 has been compared with 3 after shifting 9. What happens next?',
    // Frame representing the insertion of 6 after the comparison with 3.
    visualization: { inputArray: [9, 3, 6, 1, 5], frameIndex: 13 },

    options: [
      {
        id: 'a',
        text: 'The key 6 is inserted after 3 because 3 is smaller than 6',
      },
      {
        id: 'b',
        text: '3 shifts right because it is smaller than 6',
      },
      {
        id: 'c',
        text: '6 moves to index 0 because it is the current key',
      },
      {
        id: 'd',
        text: 'The algorithm starts the next pass without inserting 6',
      },
    ],

    correctOptionId: 'a',
    explanation:
      'Once the algorithm reaches 3, it finds that 3 is not greater than the key 6. The correct insertion position is immediately after 3, producing [3, 6, 9].',
  },

  {
    id: 'is-medium-s1-q6',
    type: 'conceptual',
    prompt: 'What does the sorted portion represent during an Insertion Sort pass?',
    options: [
      {
        id: 'a',
        text: 'The elements to the left of the current key that are already sorted relative to one another',
      },
      {
        id: 'b',
        text: 'The elements that have already reached their final positions in the entire array',
      },
      {
        id: 'c',
        text: 'Only the elements that have never been moved',
      },
      {
        id: 'd',
        text: 'The elements larger than the current key',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Insertion Sort maintains a sorted prefix. Its elements are sorted relative to one another, although some of them may still move later when a new key is inserted.',
  },

  {
    id: 'is-medium-s1-q7',
    type: 'code',
    prompt: 'Fill in the blank — what should the inner loop do with an element larger than the key?',

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
          { text: 'while j >= 0 and arr[j] > key:', kind: 'plain' },
        ],
      },
      {
        lineNumber: 6,
        indentLevel: 3,
        tokens: [
          { text: 'arr[j + 1] = ', kind: 'plain' },
          { text: '____', kind: 'blank' },
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
      { id: 'a', text: 'arr[j]' },
      { id: 'b', text: 'key' },
      { id: 'c', text: 'arr[j + 1]' },
      { id: 'd', text: 'arr[i]' },
    ],

    correctOptionId: 'a',
    explanation:
      'When arr[j] is greater than the key, it must shift one position to the right. Therefore arr[j + 1] receives arr[j].',
  },
];