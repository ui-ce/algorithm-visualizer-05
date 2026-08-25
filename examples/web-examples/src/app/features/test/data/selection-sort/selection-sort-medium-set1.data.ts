import type { TestQuestion } from '../../models/test.types';

// Set 1 / Medium for Selection Sort. Mixes execution (predict-the-next-
// step, placed mid-pass) with analytical/conceptual questions, matching
// the "Medium — Mixed" spec. All frameIndex values were verified against
// the real recorder output for selectionSortVisualization([9, 3, 6, 1, 5])
// (34 frames total).
export const SELECTION_SORT_MEDIUM_SET_1: TestQuestion[] = [
  {
    id: 'ss-medium-s1-q1',
    type: 'conceptual',
    prompt: 'Regardless of how the input array is ordered, how many total comparisons does Selection Sort perform on an array of n elements?',
    options: [
      { id: 'a', text: 'Always exactly n(n - 1) / 2 — the same as the worst case, no matter the input order' },
      { id: 'b', text: 'n(n - 1) / 2 in the worst case, but O(n) if the array is already sorted' },
      { id: 'c', text: 'n log n on average' },
      { id: 'd', text: 'Exactly n - 1, one comparison per pass' },
    ],
    correctOptionId: 'a',
    explanation:
      'Selection Sort always scans every remaining element to find the minimum, in every pass, no matter how the array is arranged — so its comparison count never changes: best case equals worst case, both n(n - 1) / 2.',
  },
  {
    id: 'ss-medium-s1-q2',
    type: 'conceptual',
    prompt: 'How many swaps does Selection Sort perform on an array of n elements, at most?',
    options: [
      { id: 'a', text: 'At most n - 1 — one swap per pass, and some passes may need none' },
      { id: 'b', text: 'n(n - 1) / 2, the same as the comparison count' },
      { id: 'c', text: 'Exactly n swaps, one per element' },
      { id: 'd', text: 'It depends only on how many duplicate values exist' },
    ],
    correctOptionId: 'a',
    explanation:
      "Each pass performs at most one swap (or none, if the minimum is already in place), and there are n - 1 passes, so the swap count is bounded by n - 1 — far fewer than Bubble Sort's worst case.",
  },
  {
    id: 'ss-medium-s1-q3',
    type: 'execution',
    prompt: 'The array is mid-pass. What happens next?',
    // Frame 6 for [9, 3, 6, 1, 5]: pass i=0, comparing index 3 (value 1) against the current minimum, index 1 (value 3).
    visualization: { inputArray: [9, 3, 6, 1, 5], frameIndex: 6 },
    options: [
      { id: 'a', text: 'Index 3 becomes the new candidate minimum, because 1 is less than 3' },
      { id: 'b', text: 'Index 1 and 3 swap immediately' },
      { id: 'c', text: 'The pass ends, skipping index 4' },
      { id: 'd', text: "Index 3 is ignored because it's outside the current pass" },
    ],
    correctOptionId: 'a',
    explanation:
      'arr[3]=1 is less than the current minimum arr[1]=3 (which itself replaced the original arr[0]=9 earlier in this pass), so index 3 becomes the new candidate minimum.',
  },
  {
    id: 'ss-medium-s1-q4',
    type: 'execution',
    prompt: 'The second pass is underway. What happens next?',
    // Frame 17 for [9, 3, 6, 1, 5]: pass i=1, comparing index 4 (value 5) against the current minimum, index 1 (value 3).
    visualization: { inputArray: [9, 3, 6, 1, 5], frameIndex: 17 },
    options: [
      { id: 'a', text: 'The candidate minimum stays at index 1, because 5 is not less than 3' },
      { id: 'b', text: 'Index 1 and 4 swap, because 5 is greater than 3' },
      { id: 'c', text: 'Index 4 becomes the new minimum' },
      { id: 'd', text: 'The algorithm restarts the pass from index 0' },
    ],
    correctOptionId: 'a',
    explanation:
      'arr[4]=5 is not smaller than the current minimum arr[1]=3, so the candidate minimum is unchanged and the pass moves on.',
  },
  {
    id: 'ss-medium-s1-q5',
    type: 'execution',
    prompt: 'This is the third pass. What does this frame show?',
    // Frame 25 for [9, 3, 6, 1, 5]: pass i=2, index 4 (value 5) just replaced index 2 (value 6) as the candidate minimum.
    visualization: { inputArray: [9, 3, 6, 1, 5], frameIndex: 25 },
    options: [
      { id: 'a', text: 'Index 4 has just become the new candidate minimum, because 5 is less than the previous minimum, 6' },
      { id: 'b', text: 'Index 2 and 4 have just swapped' },
      { id: 'c', text: 'The pass has ended without finding a smaller value' },
      { id: 'd', text: 'Index 3 is still being compared' },
    ],
    correctOptionId: 'a',
    explanation:
      'Before this frame, the candidate minimum was index 2 (value 6). Now arr[4]=5 has just been found to be smaller, so index 4 takes over as the candidate minimum — the swap with index 2 only happens once the pass fully ends.',
  },
  {
    id: 'ss-medium-s1-q6',
    type: 'conceptual',
    prompt: "For a strictly descending array of 5 distinct elements — Selection Sort's worst case for comparisons — how many swaps does it perform in total?",
    options: [
      { id: 'a', text: '4 — one swap per pass, since every pass\u2019s minimum sits at the far end and must move' },
      { id: 'b', text: '10, same as the comparison count' },
      { id: 'c', text: '5, one per element' },
      { id: 'd', text: '0, since a descending array is already fully out of order' },
    ],
    correctOptionId: 'a',
    explanation:
      "Selection Sort's swap count never depends on how disordered the array is — it's capped at n - 1 regardless of input. For n = 5, that's at most 4 swaps, even though the comparison count (10) matches Bubble Sort's worst case.",
  },
  {
    id: 'ss-medium-s1-q7',
    type: 'code',
    prompt: 'Fill in the blank — what bound does the outer loop need to guarantee the whole array gets sorted?',
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function selectionSort(arr):', kind: 'plain' }] },
      {
        lineNumber: 2,
        indentLevel: 1,
        tokens: [
          { text: 'for i = 0 to ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ':', kind: 'plain' },
        ],
      },
      { lineNumber: 3, indentLevel: 2, tokens: [{ text: 'minIndex = i', kind: 'plain' }] },
      { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'for j = i + 1 to n - 1:', kind: 'plain' }] },
      { lineNumber: 5, indentLevel: 3, tokens: [{ text: 'if arr[j] < arr[minIndex]: minIndex = j', kind: 'plain' }] },
      { lineNumber: 6, indentLevel: 2, tokens: [{ text: 'swap(arr[i], arr[minIndex])', kind: 'plain' }] },
      { lineNumber: 7, indentLevel: 1, tokens: [{ text: 'return arr', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: 'n - 2' },
      { id: 'b', text: 'n - 1' },
      { id: 'c', text: 'n' },
      { id: 'd', text: 'n / 2' },
    ],
    correctOptionId: 'a',
    explanation:
      "With n - 1 passes needed in total and i starting at 0, the loop must run while i is 0 through n - 2 inclusive — 'to n - 2' — to produce exactly n - 1 passes; the last element is already correct once everything else is placed.",
  },
];
