import type { TestQuestion } from '../../models/test.types';

export const BUBBLE_SORT_EASY_SET_3: TestQuestion[] = [
  {
    id: 'bs-easy-s3-q1',
    type: 'conceptual',
    prompt: 'Why does Bubble Sort need fewer comparisons in later passes?',
    options: [
      {
        id: 'a',
        text: 'Because the largest elements are already in their final positions',
      },
      {
        id: 'b',
        text: 'Because the array becomes half its original size',
      },
      {
        id: 'c',
        text: 'Because Bubble Sort stops comparing adjacent elements',
      },
      {
        id: 'd',
        text: 'Because every element becomes sorted after the first comparison',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'After each pass, the largest unsorted element moves to its final position at the end of the array. Therefore, later passes do not need to compare those already-sorted elements.',
  },

  {
    id: 'bs-easy-s3-q2',
    type: 'conceptual',
    prompt: 'Which statement correctly describes what happens when Bubble Sort compares two adjacent elements?',
    options: [
      {
        id: 'a',
        text: 'They are swapped only if the left element is greater than the right element',
      },
      {
        id: 'b',
        text: 'They are always swapped after being compared',
      },
      {
        id: 'c',
        text: 'They are swapped only if the right element is greater than the left element',
      },
      {
        id: 'd',
        text: 'The larger element is always moved to the left',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'For ascending Bubble Sort, adjacent elements are swapped when the left element is greater than the right element. Otherwise, their order is already correct.',
  },

  {
    id: 'bs-easy-s3-q3',
    type: 'execution',
    prompt: 'The algorithm is comparing the highlighted elements. What happens next?',
    visualization: {
      inputArray: [3, 7, 2, 5],
      frameIndex: 2,
    },
    options: [
      {
        id: 'a',
        text: 'The elements stay in place because 3 is less than 7',
      },
      {
        id: 'b',
        text: 'The elements swap because 3 is greater than 7',
      },
      {
        id: 'c',
        text: 'The algorithm compares 2 and 5 instead',
      },
      {
        id: 'd',
        text: 'The algorithm finishes because the first pair is already sorted',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'The first pair is 3 and 7. Since 3 is already smaller than 7, no swap is needed and the algorithm continues to the next pair.',
  },

  {
    id: 'bs-easy-s3-q4',
    type: 'execution',
    prompt: 'The highlighted pair is being compared. What will Bubble Sort do next?',
    visualization: {
      inputArray: [3, 7, 2, 5],
      frameIndex: 15,
    },
    options: [
      {
        id: 'a',
        text: 'Swap 7 and 2 because 7 is greater than 2',
      },
      {
        id: 'b',
        text: 'Keep 7 and 2 in place because they are already sorted',
      },
      {
        id: 'c',
        text: 'Swap 3 and 7',
      },
      {
        id: 'd',
        text: 'Move 2 directly to the beginning of the array',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'The compared values are 7 and 2. Because Bubble Sort sorts in ascending order, 7 must move to the right of 2, so the two elements are swapped.',
  },

  {
    id: 'bs-easy-s3-q5',
    type: 'code',
    prompt: 'Which condition should be used to swap adjacent elements in ascending Bubble Sort?',
    codeLines: [
      {
        lineNumber: 1,
        indentLevel: 0,
        tokens: [{ text: 'function bubbleSort(arr):', kind: 'plain' }],
      },
      {
        lineNumber: 2,
        indentLevel: 1,
        tokens: [{ text: 'for i = 0 to n - 2:', kind: 'plain' }],
      },
      {
        lineNumber: 3,
        indentLevel: 2,
        tokens: [{ text: 'for j = 0 to n - i - 2:', kind: 'plain' }],
      },
      {
        lineNumber: 4,
        indentLevel: 3,
        tokens: [
          { text: 'if arr[j] ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ' arr[j + 1]:', kind: 'plain' },
        ],
      },
      {
        lineNumber: 5,
        indentLevel: 4,
        tokens: [{ text: 'swap(arr[j], arr[j + 1])', kind: 'plain' }],
      },
      {
        lineNumber: 6,
        indentLevel: 1,
        tokens: [{ text: 'return arr', kind: 'plain' }],
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
      'For ascending Bubble Sort, the left element must be greater than the right element before they are swapped.',
  },
];