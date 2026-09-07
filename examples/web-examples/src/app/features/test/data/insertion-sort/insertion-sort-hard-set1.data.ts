import type { TestQuestion } from '../../test.types';

// Set 1 / Hard for Insertion Sort.
// 5 conceptual, 2 execution, 3 code (cloze) questions.
//
// The two execution questions use insertionSortVisualization([5, 3, 5, 1])
// specifically because it contains a duplicate value (5 appears twice).
// This lets Q5/Q6 demonstrate that, unlike Selection Sort, Insertion Sort
// is always stable: because the inner loop's condition is strict
// (arr[j] > key), an element equal to the key is never shifted past it.
// frameIndex values were verified with a precise simulation of the
// recorder engine, not guessed.
export const INSERTION_SORT_HARD_SET_1: TestQuestion[] = [
  {
    id: 'is-hard-s1-q1',
    type: 'conceptual',
    prompt:
      'How can Insertion Sort exit its inner loop early without any extra check like the "swapped flag" used in Bubble Sort?',
    options: [
      {
        id: 'a',
        text: 'The while condition itself (arr[j] > key) naturally stops as soon as it reaches an element that is not greater than the key, so early termination is a built-in part of the algorithm',
      },
      {
        id: 'b',
        text: 'Insertion Sort can never exit its loop early',
      },
      {
        id: 'c',
        text: 'Only when the array has no duplicate values',
      },
      {
        id: 'd',
        text: 'By adding a boolean flag similar to Bubble Sort, which the current pseudocode does not have',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Unlike Selection Sort, which must scan the entire remaining range to find the minimum, the inner loop of Insertion Sort stops as soon as it hits the first element that is not greater than the key. This is exactly what makes it run very fast on nearly-sorted data.',
  },
  {
    id: 'is-hard-s1-q2',
    type: 'conceptual',
    prompt: 'Is this implementation of Insertion Sort stable — does it preserve the relative order of equal elements?',
    options: [
      {
        id: 'a',
        text: "Yes — because the shift condition is written strictly as arr[j] > key, an element equal to the key is never shifted past it",
      },
      {
        id: 'b',
        text: 'No — repeated shifts can reverse the relative order of equal elements',
      },
      {
        id: 'c',
        text: 'Only if the array has no duplicate values',
      },
      {
        id: 'd',
        text: 'It depends on whether the array is sorted in ascending or descending order',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'The strict > comparison guarantees that when arr[j] equals key, the while loop stops, and key is inserted right after it. So two equal values never pass each other, and their original order is preserved. Questions 5 and 6 show exactly this behavior on real data.',
  },
  {
    id: 'is-hard-s1-q3',
    type: 'conceptual',
    prompt: 'Unlike Merge Sort, why does Insertion Sort never need a second, temporary array?',
    options: [
      {
        id: 'a',
        text: 'It only shifts elements within the original array itself and keeps the key in a single helper variable, whereas Merge Sort needs a buffer to combine two sorted halves',
      },
      {
        id: 'b',
        text: 'Because Insertion Sort only works on arrays smaller than 10 elements',
      },
      {
        id: 'c',
        text: 'Because Merge Sort does not use recursion',
      },
      {
        id: 'd',
        text: 'Both algorithms need the same amount of extra memory',
      },
    ],
    correctOptionId: 'a',
    explanation:
      "Merge Sort's merge step must combine two sorted sequences into a new array, which requires temporary space. Insertion Sort never separates the array; it just shifts elements within the same input array using a key value and an index j.",
  },
  {
    id: 'is-hard-s1-q4',
    type: 'conceptual',
    prompt: 'Does the number of shifts Insertion Sort performs depend on the initial order of the input array?',
    options: [
      {
        id: 'a',
        text: 'Yes — it ranges from 0 (for an already-sorted array) up to n(n - 1) / 2 (for a reverse-sorted array)',
      },
      {
        id: 'b',
        text: 'No, the number of shifts is always exactly n - 1 regardless of the input',
      },
      {
        id: 'c',
        text: 'No, a correct implementation always performs 0 shifts',
      },
      {
        id: 'd',
        text: 'Yes, but only when the array has duplicate values',
      },
    ],
    correctOptionId: 'a',
    explanation:
      "Unlike Selection Sort, whose comparison count is always fixed, both the comparison count and the shift count of Insertion Sort depend entirely on the input's initial order. On an already-sorted array, no shifts happen at all; on a fully reversed array, every key must pass every element before it.",
  },
  {
    id: 'is-hard-s1-q5',
    type: 'execution',
    prompt: 'The current key is 5, and the sorted portion is [3, 5]. What happens next?',
    // Frame 6 for [5, 3, 5, 1]: pass i=2, key=5 just picked up, before any comparison.
    // The last element of the sorted portion, arr[1]=5, equals the key.
    visualization: { inputArray: [5, 3, 5, 1], frameIndex: 6 },
    options: [
      {
        id: 'a',
        text: 'No shift happens — since 5 is not strictly greater than the key 5, the key is inserted right after it immediately',
      },
      {
        id: 'b',
        text: 'The 5 at the end of the sorted portion shifts right, because it equals the key',
      },
      {
        id: 'c',
        text: 'The two 5s swap places with each other',
      },
      {
        id: 'd',
        text: 'The algorithm throws an error because of the duplicate value',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'The while condition is arr[j] > key. Since arr[1]=5 is not greater than key=5, the loop never runs and the key is immediately inserted at index 2. This is exactly the behavior that guarantees stability: the second 5 never passes the first 5.',
  },
  {
    id: 'is-hard-s1-q6',
    type: 'execution',
    prompt: 'The current key is 1, and the sorted portion is [3, 5, 5]. What happens next?',
    // Frame 8 for [5, 3, 5, 1]: pass i=3, key=1 just picked up, before any comparison.
    visualization: { inputArray: [5, 3, 5, 1], frameIndex: 8 },
    options: [
      {
        id: 'a',
        text: 'The nearest 5 (index 2) shifts one position right, because it is greater than the key 1; the other 5 and 3 will shift in turn afterward',
      },
      {
        id: 'b',
        text: 'Both 5s shift at the same time in no particular order',
      },
      {
        id: 'c',
        text: '1 stays in place immediately, with no shifting at all',
      },
      {
        id: 'd',
        text: 'Only 3 shifts, and both 5s are ignored',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Since 1 is smaller than every element of the sorted portion, the scan continues right to left: first the nearest 5 shifts, then the other 5, and finally 3. These are two separate, one-at-a-time shifts, not a single jump — so the relative order of the two 5s stays intact.',
  },
  {
    id: 'is-hard-s1-q7',
    type: 'code',
    prompt: 'Fill in the blank in the inner loop condition — how far is j allowed to decrease?',
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function insertionSort(arr):', kind: 'plain' }] },
      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'for i = 1 to n - 1:', kind: 'plain' }] },
      { lineNumber: 3, indentLevel: 2, tokens: [{ text: 'key = arr[i]', kind: 'plain' }] },
      { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'j = i - 1', kind: 'plain' }] },
      {
        lineNumber: 5,
        indentLevel: 2,
        tokens: [
          { text: 'while j >= ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ' and arr[j] > key:', kind: 'plain' },
        ],
      },
      { lineNumber: 6, indentLevel: 3, tokens: [{ text: 'arr[j + 1] = arr[j]', kind: 'plain' }] },
      { lineNumber: 7, indentLevel: 3, tokens: [{ text: 'j = j - 1', kind: 'plain' }] },
      { lineNumber: 8, indentLevel: 2, tokens: [{ text: 'arr[j + 1] = key', kind: 'plain' }] },
      { lineNumber: 9, indentLevel: 1, tokens: [{ text: 'return arr', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: '0' },
      { id: 'b', text: '1' },
      { id: 'c', text: '-1' },
      { id: 'd', text: 'i' },
    ],
    correctOptionId: 'a',
    explanation:
      'Index 0 is the smallest valid array index. The condition j >= 0 makes sure the loop stops before going out of bounds — otherwise, when key is the smallest value, the algorithm would try to access arr[-1].',
  },
  {
    id: 'is-hard-s1-q8',
    type: 'code',
    prompt: 'Fill in the blank — which slot should the larger element be rewritten to?',
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function insertionSort(arr):', kind: 'plain' }] },
      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'for i = 1 to n - 1:', kind: 'plain' }] },
      { lineNumber: 3, indentLevel: 2, tokens: [{ text: 'key = arr[i]', kind: 'plain' }] },
      { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'j = i - 1', kind: 'plain' }] },
      { lineNumber: 5, indentLevel: 2, tokens: [{ text: 'while j >= 0 and arr[j] > key:', kind: 'plain' }] },
      {
        lineNumber: 6,
        indentLevel: 3,
        tokens: [
          { text: 'arr[', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: '] = arr[j]', kind: 'plain' },
        ],
      },
      { lineNumber: 7, indentLevel: 3, tokens: [{ text: 'j = j - 1', kind: 'plain' }] },
      { lineNumber: 8, indentLevel: 2, tokens: [{ text: 'arr[j + 1] = key', kind: 'plain' }] },
      { lineNumber: 9, indentLevel: 1, tokens: [{ text: 'return arr', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: 'j + 1' },
      { id: 'b', text: 'j - 1' },
      { id: 'c', text: 'j' },
      { id: 'd', text: 'i' },
    ],
    correctOptionId: 'a',
    explanation:
      'For arr[j] to shift one slot to the right, it must be rewritten to arr[j + 1]. This is what creates the empty slot needed for the final insertion of key.',
  },
  {
    id: 'is-hard-s1-q9',
    type: 'code',
    prompt: 'Fill in the blank — which index should the outer loop start from?',
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
          { text: 'for i = ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ' to n - 1:', kind: 'plain' },
        ],
      },
      { lineNumber: 3, indentLevel: 2, tokens: [{ text: 'key = arr[i]', kind: 'plain' }] },
      { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'j = i - 1', kind: 'plain' }] },
      { lineNumber: 5, indentLevel: 2, tokens: [{ text: 'while j >= 0 and arr[j] > key:', kind: 'plain' }] },
      { lineNumber: 6, indentLevel: 3, tokens: [{ text: 'arr[j + 1] = arr[j]', kind: 'plain' }] },
      { lineNumber: 7, indentLevel: 3, tokens: [{ text: 'j = j - 1', kind: 'plain' }] },
      { lineNumber: 8, indentLevel: 2, tokens: [{ text: 'arr[j + 1] = key', kind: 'plain' }] },
      { lineNumber: 9, indentLevel: 1, tokens: [{ text: 'return arr', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: '1' },
      { id: 'b', text: '0' },
      { id: 'c', text: '2' },
      { id: 'd', text: 'n / 2' },
    ],
    correctOptionId: 'a',
    explanation:
      'Index 0 is treated as a one-element sorted portion from the very start, so the first element that actually needs to be considered as a key is at index 1. Starting from index 0 would mean comparing the key against itself, which is pointless.',
  },
  {
    id: 'is-hard-s1-q10',
    type: 'conceptual',
    prompt:
      'Despite its O(n²) worst case, why is Insertion Sort still used inside production sorting algorithms (like Timsort)?',
    options: [
      {
        id: 'a',
        text: 'It has very low overhead for small or nearly-sorted subarrays, and can even outperform O(n log n) algorithms in those cases',
      },
      {
        id: 'b',
        text: 'Because its worst case never actually occurs',
      },
      {
        id: 'c',
        text: 'Because it runs in parallel across multiple CPU cores',
      },
      {
        id: 'd',
        text: 'Because it never needs to compare elements',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Hybrid algorithms like Timsort use Insertion Sort for small subarrays (typically under 64 elements) because its hidden constants are low, and on small or nearly-sorted data it can outperform O(n log n) algorithms that carry heavier recursive overhead.',
  },
];