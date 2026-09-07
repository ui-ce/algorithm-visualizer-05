import type { TestQuestion } from '../../test.types';

export const BUBBLE_SORT_MEDIUM_SET_1: TestQuestion[] = [
  {
    id: 'bs-medium-s1-q1',
    type: 'conceptual',
    prompt: 'In the worst case, how many total comparisons does Bubble Sort perform on an array of n elements?',
    options: [
      { id: 'a', text: 'n(n - 1) / 2' },
      { id: 'b', text: 'n log n' },
      { id: 'c', text: 'n - 1' },
      { id: 'd', text: '2n' },
    ],
    correctOptionId: 'a',
    explanation:
      'Each of the n - 1 passes compares one fewer pair than the last, giving (n-1) + (n-2) + ... + 1 comparisons, which sums to n(n - 1) / 2.',
  },
  {
    id: 'bs-medium-s1-q2',
    type: 'conceptual',
    prompt:
      "This platform's Bubble Sort pseudocode has no 'swapped' flag or early-exit check. Given that, what is its best-case time complexity, even if the input array is already sorted?",
    options: [
      { id: 'a', text: 'O(n²) — every pass still runs in full, regardless of whether any swap happened' },
      { id: 'b', text: 'O(n) — the algorithm stops after the first pass finds no swaps' },
      { id: 'c', text: 'O(n log n)' },
      { id: 'd', text: 'O(1)' },
    ],
    correctOptionId: 'a',
    explanation:
      "The pseudocode shown on this platform always runs all n - 1 outer passes with no early-exit check, so it does not get the classic O(n) best case some textbook versions have — here best case equals worst case, O(n²).",
  },
  {
    id: 'bs-medium-s1-q3',
    type: 'execution',
    prompt: 'The array is mid-pass. What happens next?',
    // Frame 6: pass i=0, j=1 — comparing left=9, right=6, willSwap=true.
    visualization: { inputArray: [9, 3, 6, 1, 5], frameIndex: 6 },
    options: [
      { id: 'a', text: 'The elements swap, because 9 is greater than 6' },
      { id: 'b', text: 'The elements stay in place, because 9 is greater than 6' },
      { id: 'c', text: 'Index 2 and 3 are compared next, skipping this pair' },
      { id: 'd', text: 'The first pass ends here without checking the remaining pairs' },
    ],
    correctOptionId: 'a',
    explanation:
      'By this point index 0 already holds 9 (moved there by the previous swap). Comparing index 1 and 2 (9 vs 6), 9 is greater, so they swap.',
  },
  {
    id: 'bs-medium-s1-q4',
    type: 'execution',
    prompt: 'The second pass is underway. What happens next?',
    // Frame 19: pass i=1, j=0 — comparing left=3, right=6, willSwap=false.
    visualization: { inputArray: [9, 3, 6, 1, 5], frameIndex: 19 },
    options: [
      { id: 'a', text: 'The elements stay in place, because 3 is less than 6' },
      { id: 'b', text: 'The elements swap, because 3 is less than 6' },
      { id: 'c', text: 'The whole array is re-scanned from index 0 again' },
      { id: 'd', text: 'Index 4 is compared next' },
    ],
    correctOptionId: 'a',
    explanation:
      "After pass one, the array is [3, 6, 1, 5, 9]. Comparing index 0 and 1 (3 vs 6), 3 is already smaller, so nothing swaps and the algorithm moves on to index 1 and 2.",
  },
  {
    id: 'bs-medium-s1-q5',
    type: 'execution',
    prompt: 'The first pass has just finished. Which index is now guaranteed to hold its final sorted value?',
    // Frame 17: kind 'sorted', i=0, index=4, arr=[3, 6, 1, 5, 9].
    visualization: { inputArray: [9, 3, 6, 1, 5], frameIndex: 17 },
    options: [
      { id: 'a', text: 'Index 4 — the largest value bubbled all the way to the end of the pass' },
      { id: 'b', text: 'Index 0 — the first element is always fixed after one pass' },
      { id: 'c', text: 'Index 4, but it may still move again in a later pass' },
      { id: 'd', text: 'No index is fixed yet — that only happens once the whole array is sorted' },
    ],
    correctOptionId: 'a',
    explanation:
      "Each full pass carries the largest unprocessed value to the right end of the range it scans. After pass one, index 4 holds 9 — the array's maximum — and the algorithm never touches that position again.",
  },
  {
    id: 'bs-medium-s1-q6',
    type: 'conceptual',
    prompt: 'For a strictly descending array of 5 distinct elements (the worst case), how many swaps does this Bubble Sort implementation perform in total?',
    options: [
      { id: 'a', text: '10' },
      { id: 'b', text: '5' },
      { id: 'c', text: '4' },
      { id: 'd', text: '25' },
    ],
    correctOptionId: 'a',
    explanation:
      'In the worst case every single comparison also causes a swap, so the swap count equals the comparison count: n(n - 1) / 2 = 5 × 4 / 2 = 10.',
  },
  {
    id: 'bs-medium-s1-q7',
    type: 'code',
    prompt: 'Fill in the blank — what bound does the outer loop need to guarantee the whole array gets sorted?',
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function bubbleSort(arr):', kind: 'plain' }] },
      {
        lineNumber: 2,
        indentLevel: 1,
        tokens: [
          { text: 'for i = 0 to ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ':', kind: 'plain' },
        ],
      },
      { lineNumber: 3, indentLevel: 2, tokens: [{ text: 'for j = 0 to n - i - 2:', kind: 'plain' }] },
      { lineNumber: 4, indentLevel: 3, tokens: [{ text: 'if arr[j] > arr[j + 1]:', kind: 'plain' }] },
      { lineNumber: 5, indentLevel: 4, tokens: [{ text: 'swap(arr[j], arr[j + 1])', kind: 'plain' }] },
      { lineNumber: 6, indentLevel: 1, tokens: [{ text: 'return arr', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: 'n - 2' },
      { id: 'b', text: 'n - 1' },
      { id: 'c', text: 'n' },
      { id: 'd', text: 'n / 2' },
    ],
    correctOptionId: 'a',
    explanation:
      "With n - 1 passes needed in total and i starting at 0, the loop must run while i is 0 through n - 2 inclusive — 'to n - 2' — to produce exactly n - 1 passes.",
  },
];
