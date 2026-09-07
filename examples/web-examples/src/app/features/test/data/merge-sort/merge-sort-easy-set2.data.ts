import type { TestQuestion } from '../../test.types';

// Set 2 / Easy for Selection Sort. frameIndex values verified against
// selectionSortVisualization([3, 7, 2, 5]).
export const SELECTION_SORT_EASY_SET_2: TestQuestion[] = [
  {
    id: 'ss-easy-s2-q1',
    type: 'conceptual',
    prompt: 'Why does Selection Sort scan the entire unsorted portion before swapping anything?',
    options: [
      {
        id: 'a',
        text: 'Because it must find the single smallest value in that range before it knows what to swap into place',
      },
      { id: 'b', text: 'Because it needs to compare every pair of adjacent elements' },
      { id: 'c', text: 'Because the array must be split into two halves first' },
      { id: 'd', text: 'Because it swaps as soon as it finds any smaller neighbor' },
    ],
    correctOptionId: 'a',
    explanation:
      'Unlike Bubble Sort, which swaps on every out-of-order adjacent pair, Selection Sort performs only one swap per pass — but to know where the minimum is, it has to check every remaining element first.',
  },
  {
    id: 'ss-easy-s2-q2',
    type: 'conceptual',
    prompt: 'What happens to the smallest untouched value during a complete Selection Sort pass?',
    options: [
      { id: 'a', text: 'It moves to the front of the still-unsorted portion' },
      { id: 'b', text: 'It moves to the very end of the array' },
      { id: 'c', text: 'It stays in the middle of the array' },
      { id: 'd', text: "It's removed and reinserted at the end" },
    ],
    correctOptionId: 'a',
    explanation:
      'Once a pass finishes scanning, whichever index held the smallest untouched value gets swapped into the front of the still-unsorted range.',
  },
  {
    id: 'ss-easy-s2-q3',
    type: 'execution',
    prompt: 'The array is being processed. What happens next?',
    // Frame 4 for [3, 7, 2, 5]: comparing candidate index 2 (value 2) against the current minimum, index 0 (value 3).
    visualization: { inputArray: [3, 7, 2, 5], frameIndex: 4 },
    options: [
      { id: 'a', text: 'Index 2 becomes the new candidate minimum, because 2 is less than 3' },
      { id: 'b', text: 'Index 0 and 2 swap immediately, because 2 is less than 3' },
      { id: 'c', text: 'Index 2 stays unchanged, because 2 is greater than 3' },
      { id: 'd', text: 'The algorithm moves to the next pass without finishing this one' },
    ],
    correctOptionId: 'a',
    explanation:
      'arr[2]=2 is smaller than the current minimum arr[0]=3, so index 2 becomes the new candidate — the swap itself still waits until the whole pass finishes scanning.',
  },
  {
    id: 'ss-easy-s2-q4',
    type: 'execution',
    prompt: 'The second pass is underway. What happens next?',
    // Frame 13 for [3, 7, 2, 5]: pass i=1, comparing index 3 (value 5) against the current minimum, index 2 (value 3).
    visualization: { inputArray: [3, 7, 2, 5], frameIndex: 13 },
    options: [
      { id: 'a', text: 'The current minimum stays at index 2, because 5 is not less than 3' },
      { id: 'b', text: 'Index 2 and 3 swap, because 5 is greater than 3' },
      { id: 'c', text: 'Index 3 becomes the new minimum' },
      { id: 'd', text: 'The pass ends without checking index 3' },
    ],
    correctOptionId: 'a',
    explanation:
      "arr[3]=5 is not smaller than the current minimum arr[2]=3, so the candidate minimum doesn't change.",
  },
  {
    id: 'ss-easy-s2-q5',
    type: 'code',
    prompt: 'Fill in the blank — which index should the swap use as its second target?',
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function selectionSort(arr):', kind: 'plain' }] },
      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'for i = 0 to n - 2:', kind: 'plain' }] },
      { lineNumber: 3, indentLevel: 2, tokens: [{ text: 'minIndex = i', kind: 'plain' }] },
      { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'for j = i + 1 to n - 1:', kind: 'plain' }] },
      { lineNumber: 5, indentLevel: 3, tokens: [{ text: 'if arr[j] < arr[minIndex]: minIndex = j', kind: 'plain' }] },
      {
        lineNumber: 6,
        indentLevel: 2,
        tokens: [
          { text: 'swap(arr[i], arr[', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: '])', kind: 'plain' },
        ],
      },
      { lineNumber: 7, indentLevel: 1, tokens: [{ text: 'return arr', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: 'minIndex' },
      { id: 'b', text: 'i' },
      { id: 'c', text: 'j' },
      { id: 'd', text: 'i + 1' },
    ],
    correctOptionId: 'a',
    explanation:
      'After scanning the whole pass, minIndex holds the index of the smallest remaining value, so the swap must exchange arr[i] with arr[minIndex].',
  },
];
