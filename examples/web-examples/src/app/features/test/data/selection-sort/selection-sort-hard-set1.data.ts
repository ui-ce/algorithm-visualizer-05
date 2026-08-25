import type { TestQuestion } from '../../models/test.types';

// Set 1 / Hard for Selection Sort. Same "Cloze Test + purely conceptual"
// shape as Bubble Sort's Hard sets: 3 code-type cloze questions blanking
// different parts of the pseudocode instead of one multi-blank question.
//
// The two execution questions use selectionSortVisualization([4, 2, 4, 1])
// specifically because it contains a duplicate value (4 appears twice) —
// this is what lets Q5/Q6 demonstrate that, unlike Bubble Sort, this
// Selection Sort is NOT guaranteed stable: the long-distance swap at
// frame 8 moves the *first* 4 (originally index 0) past the *second* 4
// (index 2), reversing their original relative order. frameIndex values
// were verified against the real recorder output, not guessed.
export const SELECTION_SORT_HARD_SET_1: TestQuestion[] = [
  {
    id: 'ss-hard-s1-q1',
    type: 'conceptual',
    prompt: "Even if a smarter version of Bubble Sort added an early-exit check for already-sorted input, would the same optimization help Selection Sort?",
    options: [
      { id: 'a', text: 'No — Selection Sort always scans the full remaining range every pass to confirm the minimum, so no early exit is possible even in principle' },
      { id: 'b', text: 'Yes, both algorithms could skip a pass on sorted input the same way' },
      { id: 'c', text: 'Only if the array has no duplicate values' },
      { id: 'd', text: 'Yes, but only for the very last pass' },
    ],
    correctOptionId: 'a',
    explanation:
      "Bubble Sort's early exit works because a swap-free pass proves the whole array is sorted. Selection Sort has no equivalent signal — even on a sorted array it still has to compare every candidate to confirm none is smaller, so its O(n²) comparison count is fundamental, not just a missing optimization.",
  },
  {
    id: 'ss-hard-s1-q2',
    type: 'conceptual',
    prompt: 'Is this Selection Sort implementation stable — does it preserve the relative order of equal elements?',
    options: [
      { id: 'a', text: 'No — swapping the minimum into place can move it past equal elements sitting between it and index i, reversing their relative order' },
      { id: 'b', text: "Yes — it only swaps when arr[j] is strictly less than arr[minIndex], so equal elements are never disturbed" },
      { id: 'c', text: 'Only when the array has no duplicate values' },
      { id: 'd', text: 'Yes, because it sorts in place' },
    ],
    correctOptionId: 'a',
    explanation:
      "The strict `<` comparison does stop a later equal element from becoming the new candidate minimum — but it can't stop the swap from moving a distant minimum across an equal value that was closer to the front. See Q6 for exactly this happening.",
  },
  {
    id: 'ss-hard-s1-q3',
    type: 'conceptual',
    prompt: 'Unlike Merge Sort, why does this Selection Sort implementation never need a second, temporary array?',
    options: [
      { id: 'a', text: 'It only ever swaps elements within the original array, while Merge Sort needs a buffer to merge two already-sorted halves' },
      { id: 'b', text: 'Because Selection Sort only works on arrays smaller than 10 elements' },
      { id: 'c', text: 'Because Merge Sort does not use recursion' },
      { id: 'd', text: 'Both algorithms need the same amount of extra memory' },
    ],
    correctOptionId: 'a',
    explanation:
      "Merge Sort's merge step combines two sorted halves into a new sequence, which needs somewhere to build that sequence before copying it back. Selection Sort never separates the array at all — it just tracks one index (minIndex) and exchanges two cells.",
  },
  {
    id: 'ss-hard-s1-q4',
    type: 'conceptual',
    prompt: "Does the number of swaps Selection Sort performs depend on the input array's initial order?",
    options: [
      { id: 'a', text: 'Yes — unlike the comparison count, the swap count can range from 0 (already sorted) up to n - 1' },
      { id: 'b', text: 'No, swaps are always exactly n - 1 regardless of input' },
      { id: 'c', text: 'No, a correct implementation performs 0 swaps' },
      { id: 'd', text: 'Yes, but only when the array contains duplicate values' },
    ],
    correctOptionId: 'a',
    explanation:
      "A pass only swaps when minIndex ends up different from i. On an already-sorted array every pass's minimum is already at the front, so 0 swaps happen — even though the comparison count stays exactly n(n - 1) / 2 either way.",
  },
  {
    id: 'ss-hard-s1-q5',
    type: 'execution',
    prompt: 'The array has two equal values. What happens at this comparison?',
    // Frame 18 for [4, 2, 4, 1]: pass i=2, comparing index 3 (value 4) against the current minimum, index 2 (value 4) — equal values.
    visualization: { inputArray: [4, 2, 4, 1], frameIndex: 18 },
    options: [
      { id: 'a', text: 'Nothing changes — 4 is not strictly less than 4, so index 3 does not become the new candidate minimum' },
      { id: 'b', text: 'Index 3 becomes the new minimum, since ties always go to the later index' },
      { id: 'c', text: 'The two elements swap because they are equal' },
      { id: 'd', text: 'The algorithm raises an error because of the duplicate value' },
    ],
    correctOptionId: 'a',
    explanation:
      'The comparison is arr[j] < arr[minIndex] — strictly less than. Since arr[3]=4 is not strictly less than arr[minIndex]=arr[2]=4, the candidate minimum stays at index 2, and this pass ends without a swap.',
  },
  {
    id: 'ss-hard-s1-q6',
    type: 'execution',
    prompt: "This swap has just happened. What does it reveal about Selection Sort's stability?",
    // Frame 8 for [4, 2, 4, 1]: pass i=0, minIndex ended at 3 (value 1) — swap(arr[0], arr[3]) just executed.
    visualization: { inputArray: [4, 2, 4, 1], frameIndex: 8 },
    options: [
      { id: 'a', text: 'The value originally at index 0 (the first 4) has just jumped past the value originally at index 2 (the second 4) — a sign Selection Sort is not stable' },
      { id: 'b', text: 'The two 4s have just swapped directly with each other' },
      { id: 'c', text: 'This swap proves Selection Sort is stable, since neither 4 moved' },
      { id: 'd', text: "This is an invalid state that shouldn't be possible" },
    ],
    correctOptionId: 'a',
    explanation:
      "This swap exchanges index 0 (the first 4) with index 3 (where the minimum, 1, was found) — it never touches the second 4 sitting at index 2. Once this lands, the second 4 will end up appearing before the first 4 in the final array, reversing their original left-to-right order.",
  },
  {
    id: 'ss-hard-s1-q7',
    type: 'code',
    prompt: 'Fill in the blank in the minimum-finding comparison:',
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function selectionSort(arr):', kind: 'plain' }] },
      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'for i = 0 to n - 2:', kind: 'plain' }] },
      { lineNumber: 3, indentLevel: 2, tokens: [{ text: 'minIndex = i', kind: 'plain' }] },
      { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'for j = i + 1 to n - 1:', kind: 'plain' }] },
      {
        lineNumber: 5,
        indentLevel: 3,
        tokens: [
          { text: 'if arr[j] ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ' arr[minIndex]: minIndex = j', kind: 'plain' },
        ],
      },
      { lineNumber: 6, indentLevel: 2, tokens: [{ text: 'swap(arr[i], arr[minIndex])', kind: 'plain' }] },
      { lineNumber: 7, indentLevel: 1, tokens: [{ text: 'return arr', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: '<' },
      { id: 'b', text: '<=' },
      { id: 'c', text: '>' },
      { id: 'd', text: '==' },
    ],
    correctOptionId: 'a',
    explanation:
      'A strict less-than is what keeps the algorithm from treating a later equal element as a new minimum — using <= instead would still find a correct minimum but would make later equal elements override earlier ones, which is worse for stability, not better.',
  },
  {
    id: 'ss-hard-s1-q8',
    type: 'code',
    prompt: 'Fill in the blank in the swap call:',
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
      'By the time the inner loop finishes, minIndex holds the index of the smallest value found across the whole pass — that is exactly what must be swapped into index i.',
  },
  {
    id: 'ss-hard-s1-q9',
    type: 'code',
    prompt: 'Fill in the blank — where should the inner loop start scanning from?',
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function selectionSort(arr):', kind: 'plain' }] },
      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'for i = 0 to n - 2:', kind: 'plain' }] },
      { lineNumber: 3, indentLevel: 2, tokens: [{ text: 'minIndex = i', kind: 'plain' }] },
      {
        lineNumber: 4,
        indentLevel: 2,
        tokens: [
          { text: 'for j = ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ' to n - 1:', kind: 'plain' },
        ],
      },
      { lineNumber: 5, indentLevel: 3, tokens: [{ text: 'if arr[j] < arr[minIndex]: minIndex = j', kind: 'plain' }] },
      { lineNumber: 6, indentLevel: 2, tokens: [{ text: 'swap(arr[i], arr[minIndex])', kind: 'plain' }] },
      { lineNumber: 7, indentLevel: 1, tokens: [{ text: 'return arr', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: 'i + 1' },
      { id: 'b', text: 'i' },
      { id: 'c', text: '0' },
      { id: 'd', text: 'i - 1' },
    ],
    correctOptionId: 'a',
    explanation:
      'Index i already holds the current candidate minimum by assumption (minIndex = i), so scanning only needs to check the remaining elements starting at i + 1 — re-checking index i against itself would be wasted work.',
  },
  {
    id: 'ss-hard-s1-q10',
    type: 'conceptual',
    prompt: 'Despite its O(n²) worst case, in which situation is Selection Sort still a reasonable practical choice?',
    options: [
      { id: 'a', text: 'When memory writes are expensive, since it minimizes the number of swaps far more than Bubble Sort does' },
      { id: 'b', text: 'Large, randomly ordered datasets that need to sort as fast as possible' },
      { id: 'c', text: 'Situations where preserving the relative order of equal elements is critical' },
      { id: 'd', text: 'Any case where O(n log n) performance is required' },
    ],
    correctOptionId: 'a',
    explanation:
      "Selection Sort's comparison count is always O(n²), same as Bubble Sort, but it caps swaps at n - 1 — useful when each write is costly (e.g. flash memory). It's a poor fit for stability-sensitive data (see Q2/Q6) or large datasets, where Merge Sort or Quick Sort win.",
  },
];
