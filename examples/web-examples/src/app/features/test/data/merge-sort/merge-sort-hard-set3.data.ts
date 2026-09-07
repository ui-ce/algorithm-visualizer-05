import type { TestQuestion } from '../../test.types';

// Set 3 / Hard for Insertion Sort.
// 10 questions: conceptual, execution, and code.
// Harder than Sets 1 and 2.
// Execution questions should use verified frameIndex values from
// insertionSortVisualization([4, 2, 4, 1]).

export const INSERTION_SORT_HARD_SET_3: TestQuestion[] = [
  {
    id: 'is-hard-s3-q1',
    type: 'conceptual',
    prompt: 'Why can Insertion Sort outperform Selection Sort significantly on nearly-sorted data?',
    options: [
      {
        id: 'a',
        text: 'Its inner loop can stop as soon as the current element is already greater than or equal to the previous sorted element',
      },
      {
        id: 'b',
        text: 'It always performs fewer comparisons than Selection Sort on every input',
      },
      {
        id: 'c',
        text: 'It uses a second array to avoid comparisons',
      },
      {
        id: 'd',
        text: 'It changes its time complexity to O(n log n) whenever the input is nearly sorted',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Insertion Sort takes advantage of existing order. When the current element is already in the correct relative position, the inner shifting loop stops immediately. For nearly-sorted input, this can reduce the work substantially.',
  },

  {
    id: 'is-hard-s3-q2',
    type: 'conceptual',
    prompt: 'What is the key invariant maintained by Insertion Sort after processing index i?',
    options: [
      {
        id: 'a',
        text: 'The subarray from index 0 through i is sorted and contains exactly the elements originally found there',
      },
      {
        id: 'b',
        text: 'The entire array is sorted except for the last element',
      },
      {
        id: 'c',
        text: 'The elements from index i onward are already sorted',
      },
      {
        id: 'd',
        text: 'The smallest element in the entire array is always at index i',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Insertion Sort grows a sorted prefix. After processing position i, the prefix arr[0..i] is sorted, while the remaining suffix has not necessarily been processed yet.',
  },

  {
    id: 'is-hard-s3-q3',
    type: 'conceptual',
    prompt: 'Why does the standard Insertion Sort comparison use arr[j] > key rather than arr[j] >= key?',
    options: [
      {
        id: 'a',
        text: 'Using > keeps equal elements in their original relative order, making the algorithm stable',
      },
      {
        id: 'b',
        text: 'Using >= makes the algorithm sort in descending order',
      },
      {
        id: 'c',
        text: 'Using > makes the algorithm use O(1) memory',
      },
      {
        id: 'd',
        text: 'The two comparisons produce exactly the same stability behavior',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'With arr[j] > key, equal elements are not shifted past the key. This preserves their original relative order and is what makes the standard Insertion Sort stable.',
  },

  {
    id: 'is-hard-s3-q4',
    type: 'conceptual',
    prompt: 'For an array of n elements, what is the maximum number of shifts Insertion Sort can perform?',
    options: [
      {
        id: 'a',
        text: 'n(n - 1) / 2, when the array is in strictly descending order',
      },
      {
        id: 'b',
        text: 'n - 1, because each element can move only once',
      },
      {
        id: 'c',
        text: 'n, because there is one shift for every element',
      },
      {
        id: 'd',
        text: 'n log n, because every insertion searches a sorted prefix',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'In the worst case, every new key must move past all previously sorted elements. The total number of shifts is 1 + 2 + ... + (n - 1) = n(n - 1) / 2.',
  },

  {
    id: 'is-hard-s3-q5',
    type: 'execution',
    prompt: 'The current key is being inserted into the sorted prefix. What happens next?',
    // TODO: replace with the verified recorder frame for:
    // inputArray [4, 2, 4, 1]
    // key = 2, comparing 4 against 2 before the first shift.
    visualization: { inputArray: [4, 2, 4, 1], frameIndex: 0 },
    options: [
      {
        id: 'a',
        text: 'The value 4 is shifted one position to the right because it is greater than the key 2',
      },
      {
        id: 'b',
        text: 'The values 4 and 2 are swapped immediately',
      },
      {
        id: 'c',
        text: 'The key 2 is discarded because it is smaller than the sorted prefix',
      },
      {
        id: 'd',
        text: 'The algorithm moves directly to the next outer-loop iteration',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Insertion Sort does not swap the key with every larger element. It shifts larger elements one position to the right, then inserts the saved key into the resulting gap.',
  },

  {
    id: 'is-hard-s3-q6',
    type: 'execution',
    prompt: 'The key is being compared with an element in the sorted prefix. What happens when that element is equal to the key?',
    // TODO: replace with the verified recorder frame for:
    // inputArray [4, 2, 4, 1]
    // key = 4, comparing the previous equal 4.
    visualization: { inputArray: [4, 2, 4, 1], frameIndex: 0 },
    options: [
      {
        id: 'a',
        text: 'The equal element is not shifted, so the key is inserted after it',
      },
      {
        id: 'b',
        text: 'The equal element is shifted to the right because ties must move backward',
      },
      {
        id: 'c',
        text: 'The two equal elements are swapped',
      },
      {
        id: 'd',
        text: 'The current insertion is cancelled',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'The standard condition is arr[j] > key. Equality does not satisfy the condition, so the equal element stays in place and the key is inserted after it. This is an important reason Insertion Sort is stable.',
  },

  {
    id: 'is-hard-s3-q7',
    type: 'execution',
    prompt: 'The key is smaller than several elements in the sorted prefix. What does the algorithm do before placing the key?',
    // TODO: replace with the verified recorder frame for:
    // inputArray [4, 2, 4, 1]
    // key = 1, while multiple elements are shifted right.
    visualization: { inputArray: [4, 2, 4, 1], frameIndex: 0 },
    options: [
      {
        id: 'a',
        text: 'It shifts each larger element one position to the right until the correct insertion position is reached',
      },
      {
        id: 'b',
        text: 'It swaps the key directly with the smallest element in the prefix',
      },
      {
        id: 'c',
        text: 'It moves the key directly to index 0 without changing the other elements',
      },
      {
        id: 'd',
        text: 'It starts a new sorting pass from the beginning of the array',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Insertion Sort preserves the order of the sorted prefix while creating a gap for the key. Every element larger than the key is shifted one position to the right.',
  },

  {
    id: 'is-hard-s3-q8',
    type: 'code',
    prompt: 'Fill in the blank — which condition determines whether an element in the sorted prefix must be shifted?',
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
      { id: 'c', text: '>=' },
      { id: 'd', text: '==' },
    ],
    correctOptionId: 'a',
    explanation:
      'An element is shifted only when it is strictly greater than the key. Using > also prevents equal elements from being moved past the key, preserving stability.',
  },

  {
    id: 'is-hard-s3-q9',
    type: 'code',
    prompt: 'Fill in the blank — where should the key be placed after the shifting loop finishes?',
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
      { id: 'c', text: 'i' },
      { id: 'd', text: 'i + 1' },
    ],
    correctOptionId: 'a',
    explanation:
      'The loop decrements j after every shift. Therefore, when it stops, j points to the element immediately before the correct insertion position, so the key belongs at j + 1.',
  },

  {
    id: 'is-hard-s3-q10',
    type: 'conceptual',
    prompt: 'Which combination correctly describes the standard Insertion Sort implementation?',
    options: [
      {
        id: 'a',
        text: 'Stable, in-place, O(1) auxiliary space, O(n) best case, and O(n²) average and worst case',
      },
      {
        id: 'b',
        text: 'Unstable, in-place, O(n) auxiliary space, and O(n log n) in every case',
      },
      {
        id: 'c',
        text: 'Stable, requires O(n) auxiliary space, and always runs in O(n²)',
      },
      {
        id: 'd',
        text: 'Unstable, recursive, and O(log n) in the best case',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'The standard Insertion Sort is stable because equal elements are not moved past one another, it sorts in place using constant auxiliary memory, and its best case is O(n) when the input is already sorted. Average and worst cases are O(n²).',
  },
];