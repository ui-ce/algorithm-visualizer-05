import type { TestQuestion } from '../../models/test.types';

// Set 2 / Medium for Selection Sort. Reuses [9, 3, 6, 1, 5] with
// different frames/wording than Set 1.
export const SELECTION_SORT_MEDIUM_SET_2: TestQuestion[] = [
  {
    id: 'ss-medium-s2-q1',
    type: 'conceptual',
    prompt: "How does this Selection Sort implementation's best-case time complexity compare to this platform's Bubble Sort?",
    options: [
      { id: 'a', text: 'The same — both are O(n²) in the best case, since neither has an early-exit check' },
      { id: 'b', text: 'Selection Sort is O(n) in the best case, Bubble Sort is O(n²)' },
      { id: 'c', text: 'Selection Sort is O(n log n), better than Bubble Sort' },
      { id: 'd', text: 'Selection Sort has no best case — it fails on already-sorted input' },
    ],
    correctOptionId: 'a',
    explanation:
      "Both implementations always run their full nested loops with no early-exit check, so best case equals worst case for both: O(n²). Selection Sort's comparison count doesn't even react to input order, unlike some Bubble Sort variants that do.",
  },
  {
    id: 'ss-medium-s2-q2',
    type: 'conceptual',
    prompt: 'Is this Selection Sort implementation stable — does it preserve the relative order of equal elements?',
    options: [
      { id: 'a', text: 'Not guaranteed — swapping the minimum into place can move it past equal elements, changing their relative order' },
      { id: 'b', text: 'Yes — it never swaps equal elements' },
      { id: 'c', text: 'Only if minIndex never changes during a pass' },
      { id: 'd', text: "Yes, because it's an in-place algorithm" },
    ],
    correctOptionId: 'a',
    explanation:
      'The strict `<` comparison means a later equal element never overrides an earlier one as the candidate minimum — but the swap itself can still leapfrog a distant minimum over several equal or larger elements sitting between it and index i, disturbing their relative order. That makes Selection Sort not stable in general.',
  },
  {
    id: 'ss-medium-s2-q3',
    type: 'conceptual',
    prompt: 'What is the space complexity of this Selection Sort implementation?',
    options: [
      { id: 'a', text: 'O(1) — it sorts in place, only ever swapping within the same array' },
      { id: 'b', text: 'O(n) — it needs a second array the same size as the input' },
      { id: 'c', text: 'O(log n) — proportional to recursion depth' },
      { id: 'd', text: 'O(n²) — one cell of extra memory per comparison' },
    ],
    correctOptionId: 'a',
    explanation:
      'Every swap happens between two positions of the same input array, and minIndex is a single extra variable — no second array or recursion stack is ever allocated.',
  },
  {
    id: 'ss-medium-s2-q4',
    type: 'execution',
    prompt: 'The array is mid-pass. What happens next?',
    // Frame 4 for [9, 3, 6, 1, 5]: pass i=0, comparing index 2 (value 6) against the current minimum, index 1 (value 3).
    visualization: { inputArray: [9, 3, 6, 1, 5], frameIndex: 4 },
    options: [
      { id: 'a', text: 'The candidate minimum stays at index 1, because 6 is not less than 3' },
      { id: 'b', text: 'Index 1 and 2 swap, because 6 is greater than 3' },
      { id: 'c', text: 'Index 2 becomes the new minimum' },
      { id: 'd', text: 'The pass restarts from index 0' },
    ],
    correctOptionId: 'a',
    explanation: 'arr[2]=6 is not smaller than the current minimum arr[1]=3, so the candidate minimum is unchanged.',
  },
  {
    id: 'ss-medium-s2-q5',
    type: 'execution',
    prompt: 'The third pass is underway. What happens next?',
    // Frame 22 for [9, 3, 6, 1, 5]: pass i=2, comparing index 3 (value 9) against the current minimum, index 2 (value 6).
    visualization: { inputArray: [9, 3, 6, 1, 5], frameIndex: 22 },
    options: [
      { id: 'a', text: 'The candidate minimum stays at index 2, because 9 is not less than 6' },
      { id: 'b', text: 'Index 2 and 3 swap, because 9 is greater than 6' },
      { id: 'c', text: 'Index 3 becomes the new minimum' },
      { id: 'd', text: 'The pass ends without checking index 4' },
    ],
    correctOptionId: 'a',
    explanation: 'arr[3]=9 is not smaller than the current minimum arr[2]=6, so nothing changes.',
  },
  {
    id: 'ss-medium-s2-q6',
    type: 'execution',
    prompt: 'This is the fourth pass. What does this frame show?',
    // Frame 30 for [9, 3, 6, 1, 5]: pass i=3, index 4 (value 6) just replaced index 3 (value 9) as the candidate minimum.
    visualization: { inputArray: [9, 3, 6, 1, 5], frameIndex: 30 },
    options: [
      { id: 'a', text: 'Index 4 has just become the new candidate minimum, because 6 is less than the previous minimum, 9' },
      { id: 'b', text: 'Index 3 and 4 have just swapped' },
      { id: 'c', text: 'The pass has ended without finding a smaller value' },
      { id: 'd', text: 'Index 3 is still the final answer for this pass' },
    ],
    correctOptionId: 'a',
    explanation:
      'Before this frame, the candidate minimum was index 3 (value 9). Now arr[4]=6 has just been found to be smaller, so index 4 takes over — the swap with index 3 happens once the pass ends.',
  },
  {
    id: 'ss-medium-s2-q7',
    type: 'code',
    prompt: 'Fill in the blank — how far should the inner loop scan?',
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function selectionSort(arr):', kind: 'plain' }] },
      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'for i = 0 to n - 2:', kind: 'plain' }] },
      { lineNumber: 3, indentLevel: 2, tokens: [{ text: 'minIndex = i', kind: 'plain' }] },
      {
        lineNumber: 4,
        indentLevel: 2,
        tokens: [
          { text: 'for j = i + 1 to ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ':', kind: 'plain' },
        ],
      },
      { lineNumber: 5, indentLevel: 3, tokens: [{ text: 'if arr[j] < arr[minIndex]: minIndex = j', kind: 'plain' }] },
      { lineNumber: 6, indentLevel: 2, tokens: [{ text: 'swap(arr[i], arr[minIndex])', kind: 'plain' }] },
      { lineNumber: 7, indentLevel: 1, tokens: [{ text: 'return arr', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: 'n - 1' },
      { id: 'b', text: 'n' },
      { id: 'c', text: 'n - 2' },
      { id: 'd', text: 'i' },
    ],
    correctOptionId: 'a',
    explanation:
      'j must be able to reach the very last index, n - 1, since any remaining element — including the last one — could turn out to be the true minimum.',
  },
];
