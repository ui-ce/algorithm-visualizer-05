import type { TestQuestion } from '../../test.types';

// Set 2 / Hard for Selection Sort. Reuses [4, 2, 4, 1] with different
// frames/wording than Set 1.
export const SELECTION_SORT_HARD_SET_2: TestQuestion[] = [
  {
    id: 'ss-hard-s2-q1',
    type: 'conceptual',
    prompt: 'Compared to Insertion Sort, why does Selection Sort not benefit from input that is already nearly sorted?',
    options: [
      { id: 'a', text: "Selection Sort always scans the full remaining range every pass no matter how close to sorted the data already is, unlike Insertion Sort's early-stopping inner loop" },
      { id: 'b', text: 'Selection Sort is actually faster than Insertion Sort on nearly sorted data' },
      { id: 'c', text: 'Selection Sort skips comparisons once part of the array looks sorted' },
      { id: 'd', text: 'Both algorithms benefit from nearly sorted data equally' },
    ],
    correctOptionId: 'a',
    explanation:
      "Insertion Sort's inner while loop can stop early once it finds an element already in the right place, so a nearly sorted array costs it very little. Selection Sort has no such shortcut — every pass unconditionally checks every remaining candidate for the minimum.",
  },
  {
    id: 'ss-hard-s2-q2',
    type: 'conceptual',
    prompt: 'What is the best-case number of swaps Selection Sort performs, and when does it happen?',
    options: [
      { id: 'a', text: '0 — when the array is already fully sorted, so every pass\u2019s minimum is already sitting at index i' },
      { id: 'b', text: 'n - 1, no matter the input' },
      { id: 'c', text: 'n(n - 1) / 2, the same as the comparison count' },
      { id: 'd', text: '1, always on the first pass only' },
    ],
    correctOptionId: 'a',
    explanation:
      'A pass only swaps when minIndex ends up different from i. On an already-sorted array, every pass finds its minimum already at the front, so zero swaps happen — even though the comparison count is unaffected.',
  },
  {
    id: 'ss-hard-s2-q3',
    type: 'conceptual',
    prompt: 'What is the worst-case number of swaps Selection Sort performs on an array of n elements?',
    options: [
      { id: 'a', text: 'n - 1 — one swap in every pass, which happens when the true minimum is never already sitting at index i' },
      { id: 'b', text: 'n(n - 1) / 2' },
      { id: 'c', text: 'n' },
      { id: 'd', text: '0' },
    ],
    correctOptionId: 'a',
    explanation:
      'There are n - 1 passes total, and each one performs at most one swap, so n - 1 is the ceiling regardless of how badly disordered the array is — Selection Sort never exceeds it.',
  },
  {
    id: 'ss-hard-s2-q4',
    type: 'conceptual',
    prompt: 'Which change to the algorithm would make it a stable sort?',
    options: [
      { id: 'a', text: "Instead of one long-distance swap, shifting every element between minIndex and i over by one — the way Insertion Sort shifts elements — so equal elements keep their original order" },
      { id: 'b', text: 'Using <= instead of < in the comparison' },
      { id: 'c', text: 'Sorting the array in descending order instead of ascending' },
      { id: 'd', text: 'Nothing — Selection Sort can never be made stable by any modification' },
    ],
    correctOptionId: 'a',
    explanation:
      "Replacing the single swap with a shift-into-place step (much like Insertion Sort's inner loop) means the minimum slides past intervening elements one step at a time instead of teleporting past them — that preserves relative order at the cost of doing more than one write per pass.",
  },
  {
    id: 'ss-hard-s2-q5',
    type: 'execution',
    prompt: 'The second pass is underway. What happens next?',
    // Frame 11 for [4, 2, 4, 1]: pass i=1, comparing index 2 (value 4) against the current minimum, index 1 (value 2).
    visualization: { inputArray: [4, 2, 4, 1], frameIndex: 11 },
    options: [
      { id: 'a', text: 'The candidate minimum stays at index 1, because 4 is not less than 2' },
      { id: 'b', text: 'Index 1 and 2 swap, because 4 is greater than 2' },
      { id: 'c', text: 'Index 2 becomes the new minimum' },
      { id: 'd', text: 'The pass ends without checking index 3' },
    ],
    correctOptionId: 'a',
    explanation: 'arr[2]=4 is not smaller than the current minimum arr[1]=2, so nothing changes.',
  },
  {
    id: 'ss-hard-s2-q6',
    type: 'execution',
    prompt: 'The second pass has just finished scanning. What happens now?',
    // Frame 15 for [4, 2, 4, 1]: pass i=1 ends with minIndex still equal to i, so no swap — "Already in place".
    visualization: { inputArray: [4, 2, 4, 1], frameIndex: 15 },
    options: [
      { id: 'a', text: 'No swap happens, because index 1 already held the smallest remaining value' },
      { id: 'b', text: 'Index 1 swaps with index 3' },
      { id: 'c', text: 'A new candidate minimum is found at the last moment' },
      { id: 'd', text: 'The pass restarts from index 1' },
    ],
    correctOptionId: 'a',
    explanation:
      'minIndex never changed away from 1 during this pass, so arr[1] was already the smallest remaining value — the swap is skipped and index 1 is locked in as sorted.',
  },
  {
    id: 'ss-hard-s2-q7',
    type: 'code',
    prompt: 'Fill in the blank in the outer loop bound:',
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
      "With i starting at 0, the loop must cover i = 0 through n - 2 to produce exactly n - 1 passes — the last element is already correct once everything before it is placed.",
  },
  {
    id: 'ss-hard-s2-q8',
    type: 'code',
    prompt: 'Fill in the blank — what should the current candidate minimum be compared against?',
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function selectionSort(arr):', kind: 'plain' }] },
      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'for i = 0 to n - 2:', kind: 'plain' }] },
      { lineNumber: 3, indentLevel: 2, tokens: [{ text: 'minIndex = i', kind: 'plain' }] },
      { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'for j = i + 1 to n - 1:', kind: 'plain' }] },
      {
        lineNumber: 5,
        indentLevel: 3,
        tokens: [
          { text: 'if arr[j] < arr[', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ']: minIndex = j', kind: 'plain' },
        ],
      },
      { lineNumber: 6, indentLevel: 2, tokens: [{ text: 'swap(arr[i], arr[minIndex])', kind: 'plain' }] },
      { lineNumber: 7, indentLevel: 1, tokens: [{ text: 'return arr', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: 'minIndex' },
      { id: 'b', text: 'i' },
      { id: 'c', text: 'j - 1' },
      { id: 'd', text: '0' },
    ],
    correctOptionId: 'a',
    explanation:
      'Each candidate arr[j] must be compared against the smallest value found so far — which is tracked by minIndex, not the fixed pass index i.',
  },
  {
    id: 'ss-hard-s2-q9',
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
          { text: 'swap(arr[', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: '], arr[minIndex])', kind: 'plain' },
        ],
      },
      { lineNumber: 7, indentLevel: 1, tokens: [{ text: 'return arr', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: 'i' },
      { id: 'b', text: 'j' },
      { id: 'c', text: 'minIndex' },
      { id: 'd', text: 'i + 1' },
    ],
    correctOptionId: 'a',
    explanation:
      "The swap places the pass's minimum into the front of the still-unsorted range, which is index i — swap(arr[i], arr[minIndex]).",
  },
  {
    id: 'ss-hard-s2-q10',
    type: 'conceptual',
    prompt: 'In terms of Big-O, how does Selection Sort compare to Insertion Sort on nearly-sorted data?',
    options: [
      { id: 'a', text: "Insertion Sort approaches O(n) on nearly sorted data, while Selection Sort stays O(n²) regardless of how sorted the input already is" },
      { id: 'b', text: 'Both approach O(n) on nearly sorted data' },
      { id: 'c', text: 'Both stay O(n²) no matter what, with no difference between them' },
      { id: 'd', text: 'Selection Sort is faster than Insertion Sort on nearly sorted data' },
    ],
    correctOptionId: 'a',
    explanation:
      "Insertion Sort's inner loop can stop almost immediately when elements are already close to their correct spot, so nearly sorted input is close to its O(n) best case. Selection Sort has no such sensitivity to input order — it always pays the full O(n²) comparison cost.",
  },
];
