import type { TestQuestion } from '../../models/test.types';

// Set 3 / Hard for Selection Sort. Reuses [4, 2, 4, 1] with different
// frames/wording than Sets 1 and 2.
export const SELECTION_SORT_HARD_SET_3: TestQuestion[] = [
  {
    id: 'ss-hard-s3-q1',
    type: 'conceptual',
    prompt: 'How many total comparisons does Selection Sort perform while sorting this specific 4-element array, [4, 2, 4, 1]?',
    options: [
      { id: 'a', text: '6 — n(n - 1) / 2 = 4 × 3 / 2, the same regardless of the values or their order' },
      { id: 'b', text: '4, one per element' },
      { id: 'c', text: '3, one per pass' },
      { id: 'd', text: '12, since it must double-check the duplicate value' },
    ],
    correctOptionId: 'a',
    explanation:
      "Selection Sort's comparison count is a pure function of n, never of the actual values — for n = 4 that's always 4 × 3 / 2 = 6 comparisons, duplicates or not.",
  },
  {
    id: 'ss-hard-s3-q2',
    type: 'conceptual',
    prompt: 'If the input array were already sorted in ascending order, would Selection Sort detect this and skip work?',
    options: [
      { id: 'a', text: 'No — it has no mechanism to detect a sorted array early, so it still performs all n(n - 1) / 2 comparisons' },
      { id: 'b', text: 'Yes, the same way an optimized Bubble Sort with a swapped-flag could exit early' },
      { id: 'c', text: 'Yes, but only for arrays smaller than 5 elements' },
      { id: 'd', text: 'No, and it would actually raise an error on sorted input' },
    ],
    correctOptionId: 'a',
    explanation:
      "There is no check anywhere in the pseudocode for whether the array is already sorted — every pass unconditionally scans the full remaining range, so a sorted input costs exactly as much as any other.",
  },
  {
    id: 'ss-hard-s3-q3',
    type: 'conceptual',
    prompt: 'Which other common sorting algorithm is also typically not guaranteed stable, the same as this Selection Sort?',
    options: [
      { id: 'a', text: 'Quick Sort, in its typical in-place partitioning form' },
      { id: 'b', text: 'Merge Sort' },
      { id: 'c', text: 'Insertion Sort' },
      { id: 'd', text: "This platform's Bubble Sort" },
    ],
    correctOptionId: 'a',
    explanation:
      "Merge Sort, Insertion Sort, and this platform's Bubble Sort are all stable by construction. In-place Quick Sort shares Selection Sort's problem — its partitioning step can also swap equal elements past each other.",
  },
  {
    id: 'ss-hard-s3-q4',
    type: 'conceptual',
    prompt: 'Why can Selection Sort be described as a "greedy" algorithm?',
    options: [
      { id: 'a', text: 'At each pass, it makes the locally optimal choice — placing the smallest remaining element — without ever reconsidering earlier passes' },
      { id: 'b', text: 'Because it uses more memory than other sorting algorithms' },
      { id: 'c', text: 'Because it is implemented recursively' },
      { id: 'd', text: 'Because it processes the array from the end toward the start' },
    ],
    correctOptionId: 'a',
    explanation:
      "A greedy algorithm commits to the best choice available at each step and never revisits it. Selection Sort does exactly that: once a pass's minimum is swapped into place, that decision is final for the rest of the run.",
  },
  {
    id: 'ss-hard-s3-q5',
    type: 'execution',
    prompt: 'The array is being processed. What happens next?',
    // Frame 2 for [4, 2, 4, 1]: pass i=0, comparing index 1 (value 2) against the current minimum, index 0 (value 4).
    visualization: { inputArray: [4, 2, 4, 1], frameIndex: 2 },
    options: [
      { id: 'a', text: 'Index 1 becomes the new candidate minimum, because 2 is less than 4' },
      { id: 'b', text: 'Index 0 and 1 swap immediately' },
      { id: 'c', text: 'Index 1 is skipped' },
      { id: 'd', text: 'The pass ends here' },
    ],
    correctOptionId: 'a',
    explanation: 'arr[1]=2 is less than the current minimum arr[0]=4, so index 1 becomes the new candidate minimum.',
  },
  {
    id: 'ss-hard-s3-q6',
    type: 'execution',
    prompt: 'The third pass has just finished scanning. What happens now?',
    // Frame 20 for [4, 2, 4, 1]: pass i=2 ends with minIndex still equal to i (index 2, the second 4), so no swap.
    visualization: { inputArray: [4, 2, 4, 1], frameIndex: 20 },
    options: [
      { id: 'a', text: 'No swap happens — index 2 already held the smallest remaining value' },
      { id: 'b', text: 'Index 2 swaps with index 3' },
      { id: 'c', text: 'A new minimum is found at the last moment' },
      { id: 'd', text: 'The pass restarts' },
    ],
    correctOptionId: 'a',
    explanation:
      "Index 3 holds an equal value (4), and equal values never satisfy the strict `<` comparison, so minIndex stayed at index 2 for this whole pass — the swap is skipped and index 2 locks in as sorted.",
  },
  {
    id: 'ss-hard-s3-q7',
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
      { id: 'b', text: '>' },
      { id: 'c', text: '<=' },
      { id: 'd', text: '!=' },
    ],
    correctOptionId: 'a',
    explanation:
      'A candidate only replaces the current minimum when it is strictly smaller — arr[j] < arr[minIndex] — which is what lets Q6 end without a swap when the only remaining candidate is equal, not smaller.',
  },
  {
    id: 'ss-hard-s3-q8',
    type: 'code',
    prompt: 'Fill in the blank — what should minIndex be initialized to?',
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function selectionSort(arr):', kind: 'plain' }] },
      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'for i = 0 to n - 2:', kind: 'plain' }] },
      {
        lineNumber: 3,
        indentLevel: 2,
        tokens: [
          { text: 'minIndex = ', kind: 'plain' },
          { text: '____', kind: 'blank' },
        ],
      },
      { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'for j = i + 1 to n - 1:', kind: 'plain' }] },
      { lineNumber: 5, indentLevel: 3, tokens: [{ text: 'if arr[j] < arr[minIndex]: minIndex = j', kind: 'plain' }] },
      { lineNumber: 6, indentLevel: 2, tokens: [{ text: 'swap(arr[i], arr[minIndex])', kind: 'plain' }] },
      { lineNumber: 7, indentLevel: 1, tokens: [{ text: 'return arr', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: 'i' },
      { id: 'b', text: '0' },
      { id: 'c', text: 'i + 1' },
      { id: 'd', text: 'n - 1' },
    ],
    correctOptionId: 'a',
    explanation:
      'The pass assumes the current front element (index i) is the minimum until the scan proves otherwise, so minIndex starts at i.',
  },
  {
    id: 'ss-hard-s3-q9',
    type: 'code',
    prompt: 'Fill in the blank — where should the inner loop start scanning?',
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
      { id: 'd', text: 'n - 1' },
    ],
    correctOptionId: 'a',
    explanation:
      'Index i is already assumed to be the minimum (minIndex = i), so the scan only needs to check the elements after it, starting at i + 1.',
  },
  {
    id: 'ss-hard-s3-q10',
    type: 'conceptual',
    prompt: "What is Selection Sort's overall time complexity across the best, average, and worst case?",
    options: [
      { id: 'a', text: 'O(n²) in every case — the comparison count never depends on how the input is arranged' },
      { id: 'b', text: 'O(n) best case, O(n²) average and worst case' },
      { id: 'c', text: 'O(n log n) in every case' },
      { id: 'd', text: 'O(n) in every case' },
    ],
    correctOptionId: 'a',
    explanation:
      "Because every pass unconditionally scans the entire remaining range regardless of the data, Selection Sort has no favorable case at all — best, average, and worst case are all exactly O(n²).",
  },
];
