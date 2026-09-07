import type { TestQuestion } from '../../test.types';

// Set 2 / Medium for Bubble Sort. Mixes execution (predict-the-next-step)
// with analytical/conceptual questions, matching the "Medium — Mixed"
// specification.
//
// Execution questions use the same verified recorder output as Set 1
// for bubbleSortVisualization([9, 3, 6, 1, 5]) — 46 frames total.
//
// Frame references used in this set:
// Frame 10: pass i=0, j=2 — comparing 9 and 1, willSwap=true.
// Frame 14: pass i=0, j=3 — comparing 1 and 5, willSwap=false.
// Frame 23: pass i=1, j=1 — comparing 6 and 1, willSwap=true.

export const BUBBLE_SORT_MEDIUM_SET_2: TestQuestion[] = [
  {
    id: 'bs-medium-s2-q1',
    type: 'conceptual',
    prompt:
      'After each complete pass of Bubble Sort, what is guaranteed about the rightmost unsorted position?',
    options: [
      {
        id: 'a',
        text: 'It contains the largest value that was still unsorted at the start of that pass',
      },
      {
        id: 'b',
        text: 'It contains the smallest value in the entire array',
      },
      {
        id: 'c',
        text: 'It contains the first value that was compared in the pass',
      },
      {
        id: 'd',
        text: 'It is always equal to the value at index 0',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'During a pass, larger values move step by step toward the right. Therefore, the largest value in the currently unsorted portion reaches its final position at the right end of that portion.',
  },

  {
    id: 'bs-medium-s2-q2',
    type: 'conceptual',
    prompt:
      'Suppose Bubble Sort has already completed two passes on an array of 6 elements. How many elements are guaranteed to be in their final sorted positions?',
    options: [
      { id: 'a', text: '2' },
      { id: 'b', text: '1' },
      { id: 'c', text: '4' },
      { id: 'd', text: '6' },
    ],
    correctOptionId: 'a',
    explanation:
      'Each complete pass places the largest remaining unsorted value into its final position at the right side. After two complete passes, the last two positions are guaranteed to be final.',
  },

  {
    id: 'bs-medium-s2-q3',
    type: 'execution',
    prompt: 'The array is partway through the first pass. What happens next?',

    // Frame 10: pass i=0, j=2
    // Current comparison: 9 vs 1
    // willSwap = true
    visualization: {
      inputArray: [9, 3, 6, 1, 5],
      frameIndex: 10,
    },

    options: [
      {
        id: 'a',
        text: 'The elements at index 2 and 3 swap, because 9 is greater than 1',
      },
      {
        id: 'b',
        text: 'The elements stay in place, because 9 is already larger',
      },
      {
        id: 'c',
        text: 'Index 0 and 1 are compared again before continuing',
      },
      {
        id: 'd',
        text: 'The first pass ends immediately',
      },
    ],

    correctOptionId: 'a',

    explanation:
      'By this point, 9 has moved from index 0 to index 2 through the previous comparisons. The algorithm is now comparing 9 and 1. Since 9 is greater than 1, the two elements swap.',
  },

  {
    id: 'bs-medium-s2-q4',
    type: 'execution',
    prompt:
      'The first pass is almost complete. What happens when the algorithm compares the last unsorted pair?',

    // Frame 14: pass i=0, j=3
    // Current comparison: 1 vs 5
    // willSwap = false
    visualization: {
      inputArray: [9, 3, 6, 1, 5],
      frameIndex: 14,
    },

    options: [
      {
        id: 'a',
        text: 'The elements stay in place because 1 is already smaller than 5',
      },
      {
        id: 'b',
        text: 'The elements swap because 1 is smaller than 5',
      },
      {
        id: 'c',
        text: 'The value 9 moves back from index 4',
      },
      {
        id: 'd',
        text: 'The algorithm starts the second pass immediately without this comparison',
      },
    ],

    correctOptionId: 'a',

    explanation:
      'The current comparison is between 1 and 5. Because the left value is already smaller than the right value, Bubble Sort does not swap them and continues to the end of the pass.',
  },

  {
    id: 'bs-medium-s2-q5',
    type: 'conceptual',
    prompt:
      'Why does Bubble Sort need fewer comparisons in each new pass than in the previous pass?',
    options: [
      {
        id: 'a',
        text: 'Because the largest remaining value has already been fixed at the right end',
      },
      {
        id: 'b',
        text: 'Because the algorithm removes the smallest value after every pass',
      },
      {
        id: 'c',
        text: 'Because the array becomes smaller after every pass',
      },
      {
        id: 'd',
        text: 'Because Bubble Sort skips every pair that was compared before',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'After each complete pass, the largest value in the remaining unsorted portion is guaranteed to be in its final position. Therefore, that position does not need to be compared again, so the comparison range becomes smaller.',
  },

  {
    id: 'bs-medium-s2-q6',
    type: 'execution',
    prompt:
      'The second pass is underway. The current comparison is between 6 and 1. What should happen next?',

    // Frame 23: pass i=1, j=1
    // Current comparison: 6 vs 1
    // willSwap = true
    visualization: {
      inputArray: [9, 3, 6, 1, 5],
      frameIndex: 23,
    },

    options: [
      {
        id: 'a',
        text: '6 and 1 swap, producing [3, 1, 6, 5, 9]',
      },
      {
        id: 'b',
        text: '6 and 1 stay in place because 6 is already larger',
      },
      {
        id: 'c',
        text: 'The algorithm compares 3 and 6 again',
      },
      {
        id: 'd',
        text: 'The value 9 is compared again because it is the largest value',
      },
    ],

    correctOptionId: 'a',

    explanation:
      'After the first pass, the array is [3, 6, 1, 5, 9]. The second pass does not need to touch index 4 because 9 is already sorted. Comparing 6 and 1, 6 is greater, so they swap and the array becomes [3, 1, 6, 5, 9].',
  },

  {
    id: 'bs-medium-s2-q7',
    type: 'code',
    prompt:
      'Fill in the blank — what bound does the inner loop need on pass i so that it compares only the unsorted portion?',

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
      { id: 'a', text: 'n - i - 2' },
      { id: 'b', text: 'n - i - 1' },
      { id: 'c', text: 'n - 2' },
      { id: 'd', text: 'i - 2' },
    ],

    correctOptionId: 'a',

    explanation:
      'At pass i, the last i elements are already fixed. Therefore, the last valid j index is n - i - 2, so that j + 1 remains inside the unsorted portion of the array.',
  },
];