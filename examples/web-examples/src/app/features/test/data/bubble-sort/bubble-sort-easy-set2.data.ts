import type { TestQuestion } from '../../test.types';

export const BUBBLE_SORT_EASY_SET_2: TestQuestion[] = [
  {
    id: 'bs-easy-s2-q1',
    type: 'conceptual',
    prompt: 'Why does Bubble Sort compare adjacent elements?',
    options: [
      {
        id: 'a',
        text: 'Because each comparison can move a larger value one position toward the end',
      },
      {
        id: 'b',
        text: 'Because only the first and last elements can be compared',
      },
      {
        id: 'c',
        text: 'Because adjacent elements are always already sorted',
      },
      {
        id: 'd',
        text: 'Because the algorithm searches for a target value',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Bubble Sort compares neighboring elements so that a larger value can move step by step toward the end of the unsorted portion.',
  },

  {
    id: 'bs-easy-s2-q2',
    type: 'conceptual',
    prompt: 'What happens to the largest value during a complete Bubble Sort pass?',
    options: [
      {
        id: 'a',
        text: 'It moves toward the end of the unsorted portion',
      },
      {
        id: 'b',
        text: 'It always moves to the beginning of the array',
      },
      {
        id: 'c',
        text: 'It is removed from the array',
      },
      {
        id: 'd',
        text: 'It is moved to the middle of the array',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Whenever the largest value is compared with a smaller value next to it, they swap, pushing the larger value one position to the right.',
  },

  {
    id: 'bs-easy-s2-q3',
    type: 'execution',
    prompt: 'The array is being processed. What happens next?',
    visualization: {
      inputArray: [3, 7, 2, 5],
      frameIndex: 2,
    },
    options: [
      {
        id: 'a',
        text: '3 and 7 stay in place because they are already in the correct order',
      },
      {
        id: 'b',
        text: '3 and 7 swap because 3 is greater than 7',
      },
      {
        id: 'c',
        text: '7 and 2 stay in place because 7 is smaller than 2',
      },
      {
        id: 'd',
        text: 'The algorithm finishes immediately',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Since 3 is smaller than 7, the pair is already in ascending order, so Bubble Sort does not swap them.',
  },

  {
    id: 'bs-easy-s2-q4',
    type: 'execution',
    prompt: 'The array is being processed. What happens next?',
    visualization: {
      inputArray: [3, 7, 2, 5],
      frameIndex: 7,
    },
    options: [
      {
        id: 'a',
        text: '7 and 2 swap because 7 is greater than 2',
      },
      {
        id: 'b',
        text: '7 and 2 stay in place because they are already sorted',
      },
      {
        id: 'c',
        text: '3 and 7 swap because 3 is smaller than 7',
      },
      {
        id: 'd',
        text: 'The algorithm skips the entire pass',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'The pair 7 and 2 is out of order for ascending sorting, so Bubble Sort swaps them.',
  },

  {
    id: 'bs-easy-s2-q5',
    type: 'code',
    prompt: 'Which condition should be used to swap adjacent elements when sorting in ascending order?',
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
    ],
    options: [
      { id: 'a', text: '>' },
      { id: 'b', text: '<' },
      { id: 'c', text: '==' },
      { id: 'd', text: '<=' },
    ],
    correctOptionId: 'a',
    explanation:
      'For ascending order, adjacent elements are swapped when the left element is greater than the right element.',
  },
];