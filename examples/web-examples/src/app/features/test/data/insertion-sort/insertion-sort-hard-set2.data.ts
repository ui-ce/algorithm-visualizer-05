import type { TestQuestion } from '../../test.types';

// Set 2 / Hard for Insertion Sort.
// Uses the array [8, 5, 2, 6, 1, 7] with different frames and wording from Set 1.
// frameIndex values were calculated from the exact Recorder Engine simulation (not guessed).
export const INSERTION_SORT_HARD_SET_2: TestQuestion[] = [
  {
    id: 'is-hard-s2-q1',
    type: 'conceptual',
    prompt:
      'Unlike Selection Sort, why is the number of comparisons in Insertion Sort not fixed?',
    options: [
      {
        id: 'a',
        text: 'Because the inner loop can stop early at any point, depending on the position of the key relative to the elements in the sorted portion',
      },
      {
        id: 'b',
        text: 'Because Insertion Sort always performs exactly n(n - 1) / 2 comparisons, just like Selection Sort',
      },
      {
        id: 'c',
        text: 'Because Insertion Sort never performs more than one comparison per pass',
      },
      {
        id: 'd',
        text: 'Because the number of comparisons depends only on the array size and not on its values',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Selection Sort always scans the entire remaining range to find the minimum, regardless of the input order. In Insertion Sort, however, the while loop stops as soon as it finds the first element smaller than or equal to the key; therefore, the number of comparisons depends entirely on the initial arrangement of the data.',
  },
  {
    id: 'is-hard-s2-q2',
    type: 'conceptual',
    prompt:
      'For this 6-element array [8, 5, 2, 6, 1, 7], how many comparisons can Insertion Sort perform in the best and worst cases?',
    options: [
      {
        id: 'a',
        text: 'Best case: n - 1 = 5 comparisons (if the array is already sorted), and worst case: n(n - 1) / 2 = 15 comparisons (if the array is completely reversed)',
      },
      {
        id: 'b',
        text: 'Always exactly 15 comparisons, regardless of the initial order of the array',
      },
      {
        id: 'c',
        text: 'Always exactly 6 comparisons, one for each element',
      },
      {
        id: 'd',
        text: 'Between 0 and n comparisons, but never more than n',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'In the best case (the array is already sorted), each of the n - 1 keys is placed in its position after only one comparison. In the worst case (the array is completely reversed), each key must be compared with all elements before it, resulting in a total of n(n - 1) / 2 comparisons.',
  },
  {
    id: 'is-hard-s2-q3',
    type: 'conceptual',
    prompt:
      'What does it mean for an algorithm to be "adaptive," and why does Insertion Sort have this property?',
    options: [
      {
        id: 'a',
        text: 'It means the algorithm’s running time depends on how sorted the input is; Insertion Sort performs much faster on nearly sorted data than in the worst case',
      },
      {
        id: 'b',
        text: 'It means the algorithm can change the input data type during execution',
      },
      {
        id: 'c',
        text: 'It means the algorithm automatically chooses between multiple different implementations',
      },
      {
        id: 'd',
        text: 'It means the algorithm always runs at a constant speed regardless of the input',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'An adaptive algorithm takes advantage of existing structure in the input. Because the inner loop of Insertion Sort can stop early, the closer the elements are to their final positions, the less work is required; therefore, the algorithm is naturally adaptive.',
  },
  {
    id: 'is-hard-s2-q4',
    type: 'conceptual',
    prompt:
      'If we want to reduce the number of comparisons using Binary Insertion Sort, which part of the execution cost does not decrease?',
    options: [
      {
        id: 'a',
        text: 'The number of shifts; even after finding the insertion position faster, larger elements still need to be shifted one by one to the right',
      },
      {
        id: 'b',
        text: 'The number of comparisons; binary search has no effect on the number of comparisons',
      },
      {
        id: 'c',
        text: 'The extra space; binary search requires an auxiliary array',
      },
      {
        id: 'd',
        text: 'The algorithm’s stability; the binary version is no longer stable',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Binary search can find the correct insertion position in O(log n) comparisons instead of O(n), but after finding that position, all larger elements still need to be shifted one by one. Therefore, Binary Insertion Sort improves the number of comparisons, but the overall time complexity remains O(n²), and the algorithm remains stable.',
  },
  {
    id: 'is-hard-s2-q5',
    type: 'execution',
    prompt:
      'The current key is 5, and the sorted portion contains only [8]. What happens next?',
    // Frame 2 for [8, 5, 2, 6, 1, 7]: pass i=1, key=5 has been picked up, before any comparison.
    visualization: { inputArray: [8, 5, 2, 6, 1, 7], frameIndex: 2 },
    options: [
      {
        id: 'a',
        text: '8 is shifted one position to the right because it is greater than the key 5',
      },
      {
        id: 'b',
        text: '5 immediately remains in its current position',
      },
      {
        id: 'c',
        text: '8 and 5 are directly swapped with each other',
      },
      {
        id: 'd',
        text: 'The algorithm moves to the next element (2)',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Because 8 is greater than the key 5, the while-loop condition is satisfied, so 8 must be shifted one position to the right to make room for inserting 5.',
  },
  {
    id: 'is-hard-s2-q6',
    type: 'execution',
    prompt:
      'The current key is 1, and the sorted portion is [2, 5, 6, 8]. What happens next?',
    // Frame 16 for [8, 5, 2, 6, 1, 7]: pass i=4, key=1 has been picked up, before any comparison.
    visualization: { inputArray: [8, 5, 2, 6, 1, 7], frameIndex: 16 },
    options: [
      {
        id: 'a',
        text: '8 (the last element of the sorted portion) is shifted one position to the right; this begins a four-element shift chain because 1 is smaller than all four elements',
      },
      {
        id: 'b',
        text: 'Only 2 (the element closest to the key) is shifted',
      },
      {
        id: 'c',
        text: '1 is immediately inserted without any shifting',
      },
      {
        id: 'd',
        text: 'The sorted portion is completely reversed',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Because 1 is smaller than all elements in the sorted portion [2, 5, 6, 8], the scan starts from right to left: first 8 is shifted, then 6, then 5, and finally 2. All four elements are shifted one position to the right so that 1 can be inserted at the beginning of the array.',
  },
  {
    id: 'is-hard-s2-q7',
    type: 'code',
    prompt: 'Fill in the blank — what value should j be initialized to?',
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
          { text: 'j = ', kind: 'plain' },
          { text: '____', kind: 'blank' },
        ],
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
      { id: 'a', text: 'i - 1' },
      { id: 'b', text: 'i' },
      { id: 'c', text: '0' },
      { id: 'd', text: 'i + 1' },
    ],
    correctOptionId: 'a',
    explanation:
      'j must point to the element immediately before the key so that the comparison starts from that position. Since the key is stored at index i, the correct initial value of j is i - 1.',
  },
  {
    id: 'is-hard-s2-q8',
    type: 'code',
    prompt: 'Fill in the blank in the outer loop range:',
    codeLines: [
      {
        lineNumber: 1,
        indentLevel: 0,
        tokens: [{ text: 'function insertionSort(arr):', kind: 'plain' }],
      },
      {
        lineNumber: 2,
        indentLevel: 1,
        tokens: [
          { text: 'for i = 1 to ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ':', kind: 'plain' },
        ],
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
      { id: 'a', text: 'n - 1' },
      { id: 'b', text: 'n' },
      { id: 'c', text: 'n - 2' },
      { id: 'd', text: 'n + 1' },
    ],
    correctOptionId: 'a',
    explanation:
      'The array is indexed from 0 to n - 1. Since the loop starts at index 1 and must proceed to the last valid array index, the correct upper bound is n - 1.',
  },
  {
    id: 'is-hard-s2-q9',
    type: 'code',
    prompt:
      'Fill in the blank — after the shifting loop ends, what value should be written to arr[j + 1]?',
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
          { text: 'arr[j + 1] = ', kind: 'plain' },
          { text: '____', kind: 'blank' },
        ],
      },
      {
        lineNumber: 9,
        indentLevel: 1,
        tokens: [{ text: 'return arr', kind: 'plain' }],
      },
    ],
    options: [
      { id: 'a', text: 'key' },
      { id: 'b', text: 'arr[j]' },
      { id: 'c', text: 'arr[i]' },
      { id: 'd', text: '0' },
    ],
    correctOptionId: 'a',
    explanation:
      'The while loop has shifted all larger elements and opened a space at arr[j + 1]. The original value that must be placed in this position is key — the value that was saved from arr[i] at the beginning of this iteration.',
  },
  {
    id: 'is-hard-s2-q10',
    type: 'conceptual',
    prompt:
      'Why is Insertion Sort suitable for "online" (streaming) data, where elements arrive one at a time?',
    options: [
      {
        id: 'a',
        text: 'Because each new element can be immediately inserted into its correct position in the currently sorted portion without needing access to the entire array or re-sorting it',
      },
      {
        id: 'b',
        text: 'Because Insertion Sort is always faster than Quick Sort',
      },
      {
        id: 'c',
        text: 'Because it does not need to compare new elements with previous elements',
      },
      {
        id: 'd',
        text: 'Because it never stores more than one element in memory',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'The nature of Insertion Sort is to gradually expand a sorted portion, one element at a time. This makes it natural and efficient for scenarios where data arrives over time, such as keeping an updating list sorted, because there is no need to restart the algorithm from scratch.',
  },
];