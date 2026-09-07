import type { TestQuestion } from '../../test.types';

// Set 1 / Hard for Insertion Sort.
// Same structure and difficulty progression as Selection Sort Hard sets.
// Mixes conceptual, execution and code questions.

export const INSERTION_SORT_HARD_SET_1: TestQuestion[] = [
  {
    id: 'is-hard-s1-q1',
    type: 'conceptual',
    prompt: 'What is the key difference between Insertion Sort and Selection Sort when deciding where an element belongs?',
    options: [
      {
        id: 'a',
        text: 'Insertion Sort takes the current element and shifts larger sorted elements to make room for it, while Selection Sort searches for a minimum and swaps it into place',
      },
      {
        id: 'b',
        text: 'Insertion Sort repeatedly finds the minimum, while Selection Sort shifts elements to the right',
      },
      {
        id: 'c',
        text: 'Both algorithms always use exactly the same movement strategy',
      },
      {
        id: 'd',
        text: 'Insertion Sort splits the array into halves before inserting each value',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Insertion Sort grows a sorted prefix by taking one value at a time and shifting larger elements right until the value fits. Selection Sort instead scans the unsorted portion for a minimum and swaps that minimum into the next position.',
  },

  {
    id: 'is-hard-s1-q2',
    type: 'conceptual',
    prompt: 'Why can Insertion Sort run in O(n) time on an already sorted array?',
    options: [
      {
        id: 'a',
        text: 'Each new element is already greater than or equal to the last sorted element, so the inner loop performs almost no shifts',
      },
      {
        id: 'b',
        text: 'The algorithm stops after sorting the first half of the array',
      },
      {
        id: 'c',
        text: 'It uses binary search to sort the entire array in linear time',
      },
      {
        id: 'd',
        text: 'The outer loop is skipped when the input is sorted',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'For an already sorted array, each key is compared with the element immediately before it and is already in the correct position. The inner shifting loop therefore performs no shifts, giving linear overall work.',
  },

  {
    id: 'is-hard-s1-q3',
    type: 'conceptual',
    prompt: 'What is the maximum number of element shifts Insertion Sort can perform when sorting an array of n elements?',
    options: [
      {
        id: 'a',
        text: 'n(n - 1) / 2, when the input is in strictly descending order',
      },
      {
        id: 'b',
        text: 'n - 1, because each element can move only once',
      },
      {
        id: 'c',
        text: 'n, because the outer loop runs once per element',
      },
      {
        id: 'd',
        text: 'log n, because the sorted prefix doubles on each pass',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'In the worst case, every new element must move across the entire already-sorted prefix. The total number of shifts is 1 + 2 + ... + (n - 1) = n(n - 1) / 2.',
  },

  {
    id: 'is-hard-s1-q4',
    type: 'execution',
    prompt: 'The array is being processed. What happens next?',
    visualization: { inputArray: [8, 3, 6, 1, 5], frameIndex: 5 },
    options: [
      {
        id: 'a',
        text: 'The value 3 is inserted before 8 by shifting 8 one position to the right',
      },
      {
        id: 'b',
        text: 'The values 8 and 3 are swapped immediately and the pass ends',
      },
      {
        id: 'c',
        text: 'The value 3 is skipped because the first element is already sorted',
      },
      {
        id: 'd',
        text: 'The array is split into two separate arrays',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'The first element is considered sorted. When 3 is processed, it is smaller than 8, so 8 is shifted right and 3 is inserted into the open position.',
  },

  {
    id: 'is-hard-s1-q5',
    type: 'execution',
    prompt: 'The current key is being compared with the sorted portion. What happens next?',
    visualization: { inputArray: [8, 3, 6, 1, 5], frameIndex: 12 },
    options: [
      {
        id: 'a',
        text: 'The value 6 is placed between 3 and 8 after shifting 8 one position to the right',
      },
      {
        id: 'b',
        text: 'The value 6 is moved to the beginning because it is smaller than 8',
      },
      {
        id: 'c',
        text: 'The value 3 is shifted because 6 is smaller than 3',
      },
      {
        id: 'd',
        text: 'The current pass ends without changing the sorted portion',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'At this point the sorted portion is [3, 8] and the current key is 6. Since 8 is larger than 6, it shifts right; 6 then fits between 3 and 8.',
  },

  {
    id: 'is-hard-s1-q6',
    type: 'execution',
    prompt: 'The current key is smaller than several elements in the sorted prefix. What happens next?',
    visualization: { inputArray: [8, 3, 6, 1, 5], frameIndex: 19 },
    options: [
      {
        id: 'a',
        text: 'Elements larger than the key are shifted right until the correct insertion position is reached',
      },
      {
        id: 'b',
        text: 'Only the first element of the sorted prefix is compared, then the pass ends',
      },
      {
        id: 'c',
        text: 'The key is swapped with the smallest element in the prefix',
      },
      {
        id: 'd',
        text: 'The algorithm starts a new array containing only the key',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Insertion Sort does not search for a minimum and swap it into place. It walks backward through the sorted prefix, shifting every value larger than the key one position to the right.',
  },

  {
    id: 'is-hard-s1-q7',
    type: 'conceptual',
    prompt: 'Which property explains why the standard Insertion Sort implementation is stable?',
    options: [
      {
        id: 'a',
        text: 'It shifts elements only when they are strictly greater than the key, so equal elements keep their relative order',
      },
      {
        id: 'b',
        text: 'It always swaps equal elements before inserting them',
      },
      {
        id: 'c',
        text: 'It sorts equal elements using a separate auxiliary array',
      },
      {
        id: 'd',
        text: 'It never compares elements with equal values',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Using a strict greater-than comparison means an equal element is not shifted past the key. Therefore equal elements retain their original relative order, making the standard implementation stable.',
  },

  {
    id: 'is-hard-s1-q8',
    type: 'code',
    prompt: 'Fill in the blank — which value should be saved before elements are shifted?',
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
        tokens: [
          { text: 'key = ', kind: 'plain' },
          { text: '____', kind: 'blank' },
        ],
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
        tokens: [{ text: 'arr[j + 1] = key', kind: 'plain' }],
      },
      {
        lineNumber: 9,
        indentLevel: 1,
        tokens: [{ text: 'return arr', kind: 'plain' }],
      },
    ],
    options: [
      { id: 'a', text: 'arr[i]' },
      { id: 'b', text: 'arr[j]' },
      { id: 'c', text: 'arr[i - 1]' },
      { id: 'd', text: 'arr[j + 1]' },
    ],
    correctOptionId: 'a',
    explanation:
      'The current element must be saved as key before shifting begins. Otherwise its original value could be overwritten while larger elements move to the right.',
  },

  {
    id: 'is-hard-s1-q9',
    type: 'code',
    prompt: 'Fill in the blank — what comparison should control the shifting loop?',
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
    ],
    options: [
      { id: 'a', text: '>' },
      { id: 'b', text: '<' },
      { id: 'c', text: '==' },
      { id: 'd', text: '<=' },
    ],
    correctOptionId: 'a',
    explanation:
      'An element should shift right only when it is larger than the key. The strict > comparison also preserves stability when equal values are encountered.',
  },

  {
    id: 'is-hard-s1-q10',
    type: 'conceptual',
    prompt: 'For an array of n elements, what are the best-case and worst-case time complexities of Insertion Sort?',
    options: [
      {
        id: 'a',
        text: 'Best case O(n), worst case O(n²)',
      },
      {
        id: 'b',
        text: 'Best case O(n²), worst case O(n)',
      },
      {
        id: 'c',
        text: 'Both are always O(n²)',
      },
      {
        id: 'd',
        text: 'Best case O(log n), worst case O(n log n)',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'When the array is already sorted, each key needs only a constant amount of checking, giving O(n). In the reverse-sorted case, every key must move across the entire sorted prefix, producing O(n²).',
  },
];