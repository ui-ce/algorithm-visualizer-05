import type { TestQuestion } from '../../models/test.types';

// Set 1 / Hard for Bubble Sort. Per سفر_کاربر / گزارش_نیازمندی_ها, Hard
// is "Cloze Test + purely conceptual: complexity / comparison /
// real-world usage" — no easy definition-recall questions here. Since
// TestQuestion supports one blank per question (not a multi-blank cloze
// paragraph), the "Cloze Test" requirement is covered by three separate
// code-type questions, each blanking a different part of the pseudocode
// (comparison operator, swap target, inner-loop bound) rather than one
// question with several blanks — same UI component, spread across more
// questions instead of one denser one.
//
// The two execution questions use bubbleSortVisualization([4, 2, 4, 1])
// specifically because it contains a duplicate value (4 appears twice) —
// this is what lets Q6 test the stability guarantee (equal elements
// never swap) with a real frame instead of just asserting it in prose.
// frameIndex values were verified the same way as the Easy/Medium sets:
// traced against the actual recorder output, not guessed.
export const BUBBLE_SORT_HARD_SET_1: TestQuestion[] = [
  {
    id: 'bs-hard-s1-q1',
    type: 'conceptual',
    prompt: "How does Bubble Sort's average-case time complexity compare to its worst case?",
    options: [
      { id: 'a', text: 'They are the same order — O(n²) either way' },
      { id: 'b', text: 'Average case is O(n log n), worst case is O(n²)' },
      { id: 'c', text: 'Average case is O(n), worst case is O(n²)' },
      { id: 'd', text: 'Average case is always faster than best case' },
    ],
    correctOptionId: 'a',
    explanation:
      'Unlike algorithms such as Quick Sort, Bubble Sort has no favorable average-case behavior — a randomly ordered array still needs roughly the same number of comparisons as the worst case, so both are O(n²).',
  },
  {
    id: 'bs-hard-s1-q2',
    type: 'conceptual',
    prompt: 'Is this Bubble Sort implementation stable — does it preserve the relative order of equal elements?',
    options: [
      { id: 'a', text: "Yes — it only swaps when arr[j] is strictly greater than arr[j + 1], so equal elements are never swapped past each other" },
      { id: 'b', text: 'No — swapping adjacent elements always breaks stability' },
      { id: 'c', text: 'Only when the array has no duplicate values' },
      { id: 'd', text: 'Only if the input is already sorted before running' },
    ],
    correctOptionId: 'a',
    explanation:
      'The swap condition is arr[j] > arr[j + 1], a strict inequality. Two equal elements never satisfy that condition, so they never trade places — their original left-to-right order survives.',
  },
  {
    id: 'bs-hard-s1-q3',
    type: 'conceptual',
    prompt: 'What is the space complexity of this Bubble Sort implementation?',
    options: [
      { id: 'a', text: 'O(1) — it sorts in place, swapping within the same array' },
      { id: 'b', text: 'O(n) — it needs a second array the same size as the input' },
      { id: 'c', text: 'O(log n) — proportional to the recursion depth' },
      { id: 'd', text: 'O(n²) — one cell of extra memory per comparison' },
    ],
    correctOptionId: 'a',
    explanation:
      'Every swap happens between two positions of the same input array — no second array or recursion stack is ever allocated, so the auxiliary space is constant.',
  },
  {
    id: 'bs-hard-s1-q4',
    type: 'conceptual',
    prompt: 'Unlike Merge Sort, why does this Bubble Sort implementation never need a second, temporary array?',
    options: [
      { id: 'a', text: 'It sorts by swapping elements directly within the original array, while Merge Sort needs a buffer to merge two already-sorted halves' },
      { id: 'b', text: 'Because Bubble Sort only works on arrays smaller than 10 elements' },
      { id: 'c', text: 'Because Merge Sort does not use recursion' },
      { id: 'd', text: "Both algorithms need the same amount of extra memory" },
    ],
    correctOptionId: 'a',
    explanation:
      "Merge Sort's merge step combines two sorted halves into a new sequence, which needs somewhere to build that sequence before copying it back. Bubble Sort never separates the array at all — it just exchanges neighboring cells in place.",
  },
  {
    id: 'bs-hard-s1-q5',
    type: 'execution',
    prompt: 'The array contains a duplicate value. What happens at this comparison?',
    // Frame 6 for [4, 2, 4, 1]: pass i=0, j=1 — comparing left=4, right=4, willSwap=false (equal values).
    visualization: { inputArray: [4, 2, 4, 1], frameIndex: 6 },
    options: [
      { id: 'a', text: 'Nothing swaps — the two values are equal, and equal values never satisfy arr[j] > arr[j + 1]' },
      { id: 'b', text: 'The elements swap, because equal values are always swapped to check for duplicates' },
      { id: 'c', text: 'The algorithm raises an error because of the duplicate value' },
      { id: 'd', text: 'Only one of the two 4s is kept, and the other is discarded' },
    ],
    correctOptionId: 'a',
    explanation:
      'By this point the array is [2, 4, 4, 1] — index 1 and 2 both hold 4. Since 4 is not strictly greater than 4, the swap condition is false, so they stay exactly where they are.',
  },
  {
    id: 'bs-hard-s1-q6',
    type: 'execution',
    prompt: 'Continuing the same pass, what happens at this next comparison?',
    // Frame 10 for [4, 2, 4, 1]: pass i=0, j=2 — comparing left=4, right=1, willSwap=true.
    visualization: { inputArray: [4, 2, 4, 1], frameIndex: 10 },
    options: [
      { id: 'a', text: 'The elements swap, because 4 is greater than 1' },
      { id: 'b', text: 'Nothing happens, since this pair was already checked earlier in the pass' },
      { id: 'c', text: 'The pass ends without comparing this pair' },
      { id: 'd', text: 'The two 4s from earlier are compared again instead' },
    ],
    correctOptionId: 'a',
    explanation:
      'After the previous no-swap step the array is still [2, 4, 4, 1]. Comparing index 2 and 3 (4 vs 1), 4 is greater, so they swap — producing [2, 4, 1, 4] and locking 4 into the last position for this pass.',
  },
  {
    id: 'bs-hard-s1-q7',
    type: 'code',
    prompt: 'Fill in the blank in the swap call:',
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function bubbleSort(arr):', kind: 'plain' }] },
      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'for i = 0 to n - 2:', kind: 'plain' }] },
      { lineNumber: 3, indentLevel: 2, tokens: [{ text: 'for j = 0 to n - i - 2:', kind: 'plain' }] },
      { lineNumber: 4, indentLevel: 3, tokens: [{ text: 'if arr[j] > arr[j + 1]:', kind: 'plain' }] },
      {
        lineNumber: 5,
        indentLevel: 4,
        tokens: [
          { text: 'swap(arr[j], arr[', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: '])', kind: 'plain' },
        ],
      },
      { lineNumber: 6, indentLevel: 1, tokens: [{ text: 'return arr', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: 'j + 1' },
      { id: 'b', text: 'j - 1' },
      { id: 'c', text: 'j' },
      { id: 'd', text: 'j + 2' },
    ],
    correctOptionId: 'a',
    explanation:
      'The comparison one line above checks arr[j] against arr[j + 1], so the swap must exchange those exact same two positions — arr[j] and arr[j + 1].',
  },
  {
    id: 'bs-hard-s1-q8',
    type: 'code',
    prompt: 'Fill in the blank — what bound keeps the inner loop from reading past the end of the unsorted region?',
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function bubbleSort(arr):', kind: 'plain' }] },
      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'for i = 0 to n - 2:', kind: 'plain' }] },
      {
        lineNumber: 3,
        indentLevel: 2,
        tokens: [
          { text: 'for j = 0 to ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ':', kind: 'plain' },
        ],
      },
      { lineNumber: 4, indentLevel: 3, tokens: [{ text: 'if arr[j] > arr[j + 1]:', kind: 'plain' }] },
      { lineNumber: 5, indentLevel: 4, tokens: [{ text: 'swap(arr[j], arr[j + 1])', kind: 'plain' }] },
      { lineNumber: 6, indentLevel: 1, tokens: [{ text: 'return arr', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: 'n - i - 2' },
      { id: 'b', text: 'n - i - 1' },
      { id: 'c', text: 'n - 1' },
      { id: 'd', text: 'n - 2' },
    ],
    correctOptionId: 'a',
    explanation:
      "Each pass i already fixed i elements at the end of the array, and j + 1 must stay a valid index, so the inner loop stops at n - i - 2 — one less than the size of the still-unsorted region.",
  },
  {
    id: 'bs-hard-s1-q9',
    type: 'code',
    prompt: 'Fill in the blank — which comparison actually decides whether a swap happens?',
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function bubbleSort(arr):', kind: 'plain' }] },
      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'for i = 0 to n - 2:', kind: 'plain' }] },
      { lineNumber: 3, indentLevel: 2, tokens: [{ text: 'for j = 0 to n - i - 2:', kind: 'plain' }] },
      {
        lineNumber: 4,
        indentLevel: 3,
        tokens: [
          { text: 'if ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ':', kind: 'plain' },
        ],
      },
      { lineNumber: 5, indentLevel: 4, tokens: [{ text: 'swap(arr[j], arr[j + 1])', kind: 'plain' }] },
      { lineNumber: 6, indentLevel: 1, tokens: [{ text: 'return arr', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: 'arr[j] > arr[j + 1]' },
      { id: 'b', text: 'arr[j] >= arr[j + 1]' },
      { id: 'c', text: 'arr[j] < arr[j + 1]' },
      { id: 'd', text: 'arr[j] == arr[j + 1]' },
    ],
    correctOptionId: 'a',
    explanation:
      'A strict greater-than is what makes this implementation both correct (ascending order) and stable (equal elements never swap) — using >= instead would still sort correctly but would break stability.',
  },
  {
    id: 'bs-hard-s1-q10',
    type: 'conceptual',
    prompt: 'Despite its O(n²) worst case, in which situation is Bubble Sort still a reasonable practical choice?',
    options: [
      { id: 'a', text: 'Very small or nearly-sorted arrays, where simplicity matters more than raw speed' },
      { id: 'b', text: 'Large, randomly ordered datasets that need to sort as fast as possible' },
      { id: 'c', text: 'Situations where preserving the order of equal elements does not matter' },
      { id: 'd', text: 'Any case where O(n log n) performance is required' },
    ],
    correctOptionId: 'a',
    explanation:
      "Bubble Sort's simplicity and low overhead make it reasonable for tiny inputs or teaching, but its O(n²) worst case makes it a poor fit for large or heavily shuffled datasets — that's exactly where algorithms like Merge Sort or Quick Sort win.",
  },
];
