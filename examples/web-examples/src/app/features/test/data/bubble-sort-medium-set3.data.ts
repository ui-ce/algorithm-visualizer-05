import type { TestQuestion } from '../models/test.types';

// Set 3 / Medium for Bubble Sort.
//
// Medium — Mixed:
// - execution questions require tracking the array across multiple operations;
// - conceptual questions require reasoning about Bubble Sort behavior;
// - one code question checks understanding of the inner-loop range.
//
// Uses the same Bubble Sort visualization input as Set 1/2:
// bubbleSortVisualization([9, 3, 6, 1, 5])
//
// Verified recorder sequence: 46 frames total.
//
// Frame references used here:
// Frame 2  -> pass 0, j=0: comparing 9 and 3
// Frame 6  -> pass 0, j=1: comparing 9 and 6
// Frame 10 -> pass 0, j=2: comparing 9 and 1
// Frame 14 -> pass 0, j=3: comparing 1 and 5
// Frame 17 -> end of pass 0
// Frame 19 -> pass 1, j=0: comparing 3 and 6
// Frame 23 -> pass 1, j=1: comparing 6 and 1
// Frame 27 -> pass 1, j=2: comparing 6 and 5

export const BUBBLE_SORT_MEDIUM_SET_3: TestQuestion[] = [
  {
    id: 'bs-medium-s3-q1',
    type: 'conceptual',
    prompt:
      'A Bubble Sort pass starts with the unsorted portion [4, 2, 7, 1]. Which value is guaranteed to reach the right end of this portion by the end of the pass?',
    options: [
      { id: 'a', text: '7' },
      { id: 'b', text: '1' },
      { id: 'c', text: '4' },
      { id: 'd', text: '2' },
    ],
    correctOptionId: 'a',
    explanation:
      'During a complete Bubble Sort pass, the largest value in the currently unsorted portion keeps moving to the right whenever it is compared with a smaller value. Therefore, 7 reaches the right end of this portion.',
  },

  {
    id: 'bs-medium-s3-q2',
    type: 'execution',
    prompt:
      'The first pass is in progress. After the previous comparisons, what happens when the algorithm compares 9 and 6?',

    // Frame 6: pass i=0, j=1
    // Current comparison: 9 vs 6
    // willSwap = true
    visualization: {
      inputArray: [9, 3, 6, 1, 5],
      frameIndex: 6,
    },

    options: [
      {
        id: 'a',
        text: '9 and 6 swap, so 9 moves one position to the right',
      },
      {
        id: 'b',
        text: '9 and 6 stay in place because 9 is the larger value',
      },
      {
        id: 'c',
        text: '6 moves directly to the end of the array',
      },
      {
        id: 'd',
        text: 'The algorithm starts the second pass',
      },
    ],

    correctOptionId: 'a',

    explanation:
      'The previous comparison already moved 9 from index 0 to index 1. It is now compared with 6. Since 9 > 6, the pair swaps and 9 moves to index 2.',
  },

  {
    id: 'bs-medium-s3-q3',
    type: 'conceptual',
    prompt:
      'After the first pass on [9, 3, 6, 1, 5], why does the algorithm no longer need to compare index 4 during later passes?',
    options: [
      {
        id: 'a',
        text: 'Because 9 is the largest value and is already in its final position',
      },
      {
        id: 'b',
        text: 'Because index 4 always contains the smallest value',
      },
      {
        id: 'c',
        text: 'Because Bubble Sort never compares the last index',
      },
      {
        id: 'd',
        text: 'Because the array has already become completely sorted',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'The first pass moves the largest value, 9, all the way to index 4. Since that value is now in its final sorted position, later passes only work on indices 0 through 3.',
  },

  {
    id: 'bs-medium-s3-q4',
    type: 'execution',
    prompt:
      'The second pass is underway. The current array state is [3, 6, 1, 5, 9]. What happens when 6 is compared with 5?',

    // Frame 27: pass i=1, j=2
    // Current comparison: 6 vs 5
    // willSwap = true
    visualization: {
      inputArray: [9, 3, 6, 1, 5],
      frameIndex: 27,
    },

    options: [
      {
        id: 'a',
        text: '6 and 5 swap, producing [3, 1, 5, 6, 9]',
      },
      {
        id: 'b',
        text: '6 and 5 stay in place because 6 is already larger',
      },
      {
        id: 'c',
        text: '5 moves directly to index 0',
      },
      {
        id: 'd',
        text: '9 is compared with 6 again',
      },
    ],

    correctOptionId: 'a',

    explanation:
      'The second pass works on the unsorted portion [3, 6, 1, 5]. When 6 is compared with 5, 6 is greater, so they swap. The resulting array is [3, 1, 5, 6, 9].',
  },

  {
    id: 'bs-medium-s3-q5',
    type: 'conceptual',
    prompt:
      'For this Bubble Sort implementation, which statement correctly describes the relationship between comparisons and swaps?',
    options: [
      {
        id: 'a',
        text: 'Every swap is caused by a comparison, but not every comparison causes a swap',
      },
      {
        id: 'b',
        text: 'Every comparison always causes a swap',
      },
      {
        id: 'c',
        text: 'Swaps happen without comparing the two elements first',
      },
      {
        id: 'd',
        text: 'The number of swaps is always equal to the number of comparisons',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'The algorithm first compares adjacent elements. A swap happens only when the left element is greater than the right element. Therefore, every swap follows a comparison, but some comparisons result in no swap.',
  },

  {
    id: 'bs-medium-s3-q6',
    type: 'execution',
    prompt:
      'The first pass has just completed. What will the algorithm compare first in the second pass?',

    // Frame 19: pass i=1, j=0
    // Current comparison: 3 vs 6
    // willSwap = false
    visualization: {
      inputArray: [9, 3, 6, 1, 5],
      frameIndex: 19,
    },

    options: [
      {
        id: 'a',
        text: '3 and 6, because the second pass starts again from index 0',
      },
      {
        id: 'b',
        text: '6 and 1, because the first pass ended near index 3',
      },
      {
        id: 'c',
        text: '5 and 9, because the largest value must be checked again',
      },
      {
        id: 'd',
        text: '3 and 1, because Bubble Sort skips the pair 3 and 6',
      },
    ],

    correctOptionId: 'a',

    explanation:
      'At the end of the first pass the array is [3, 6, 1, 5, 9]. The second pass starts again from the beginning of the unsorted portion, so the first comparison is between 3 and 6. Index 4 containing 9 is excluded because it is already sorted.',
  },

  {
    id: 'bs-medium-s3-q7',
    type: 'code',
    prompt:
      'Fill in the blank — why does the inner loop use n - i - 2 as its upper bound when j + 1 is accessed?',

    codeLines: [
      {
        lineNumber: 1,
        indentLevel: 0,
        tokens: [
          { text: 'function bubbleSort(arr):', kind: 'plain' },
        ],
      },
      {
        lineNumber: 2,
        indentLevel: 1,
        tokens: [
          { text: 'for i = 0 to n - 2:', kind: 'plain' },
        ],
      },
      {
        lineNumber: 3,
        indentLevel: 2,
        tokens: [
          { text: 'for j = 0 to ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ':', kind: 'plain' },
        ],
      },
      {
        lineNumber: 4,
        indentLevel: 3,
        tokens: [
          { text: 'if arr[j] > arr[j + 1]:', kind: 'plain' },
        ],
      },
      {
        lineNumber: 5,
        indentLevel: 4,
        tokens: [
          { text: 'swap(arr[j], arr[j + 1])', kind: 'plain' },
        ],
      },
      {
        lineNumber: 6,
        indentLevel: 1,
        tokens: [
          { text: 'return arr', kind: 'plain' },
        ],
      },
    ],

    options: [
      {
        id: 'a',
        text: 'n - i - 2, so j + 1 stays within the current unsorted range',
      },
      {
        id: 'b',
        text: 'n - i - 1, because the algorithm should also compare the sorted position',
      },
      {
        id: 'c',
        text: 'n - 2, because the inner loop never changes between passes',
      },
      {
        id: 'd',
        text: 'i - 2, because the sorted portion is at the beginning',
      },
    ],

    correctOptionId: 'a',

    explanation:
      'At pass i, the last i elements are already fixed. Because the algorithm accesses arr[j + 1], the largest valid j is n - i - 2. This keeps both j and j + 1 inside the unsorted portion.',
  },
];