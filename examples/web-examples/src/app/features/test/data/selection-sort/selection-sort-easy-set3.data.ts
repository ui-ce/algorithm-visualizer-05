import type { TestQuestion } from '../../models/test.types';

// Set 3 / Easy for Selection Sort. Reuses [3, 7, 2, 5] with different
// frames/wording than Set 2, same pattern as Bubble Sort's Easy Set 3.
export const SELECTION_SORT_EASY_SET_3: TestQuestion[] = [
  {
    id: 'ss-easy-s3-q1',
    type: 'conceptual',
    prompt: 'How many swaps does Selection Sort perform per pass, at most?',
    options: [
      { id: 'a', text: 'Exactly one — the minimum found is swapped into place a single time' },
      { id: 'b', text: 'One swap per comparison made during the pass' },
      { id: 'c', text: 'Two, one for the minimum and one for the maximum' },
      { id: 'd', text: 'It depends on how many elements are out of order' },
    ],
    correctOptionId: 'a',
    explanation:
      'Selection Sort only swaps once per pass — after scanning the whole unsorted range to find the minimum, that value is exchanged into the front position exactly once.',
  },
  {
    id: 'ss-easy-s3-q2',
    type: 'conceptual',
    prompt: "If a pass's candidate minimum never changes from arr[i], what happens at the end of that pass?",
    options: [
      { id: 'a', text: 'No swap is performed, because the element at index i is already the smallest' },
      { id: 'b', text: 'The algorithm swaps arr[i] with itself, which changes nothing' },
      { id: 'c', text: 'An error is raised, since minIndex must always change' },
      { id: 'd', text: 'The pass repeats from the beginning' },
    ],
    correctOptionId: 'a',
    explanation:
      'When minIndex stays equal to i for the whole pass, the element already sitting at index i was the smallest remaining value — the algorithm can skip the swap entirely.',
  },
  {
    id: 'ss-easy-s3-q3',
    type: 'execution',
    prompt: 'The algorithm is comparing the highlighted elements. What happens next?',
    // Frame 2 for [3, 7, 2, 5]: comparing candidate index 1 (value 7) against the current minimum, index 0 (value 3).
    visualization: { inputArray: [3, 7, 2, 5], frameIndex: 2 },
    options: [
      { id: 'a', text: 'The candidate minimum stays at index 0, because 7 is not less than 3' },
      { id: 'b', text: 'Index 1 becomes the new candidate minimum, because 7 is greater than 3' },
      { id: 'c', text: 'Index 0 and 1 swap, because 3 is less than 7' },
      { id: 'd', text: 'The algorithm compares index 2 and 3 instead' },
    ],
    correctOptionId: 'a',
    explanation: 'arr[1]=7 is not smaller than the current minimum arr[0]=3, so the candidate minimum is unchanged.',
  },
  {
    id: 'ss-easy-s3-q4',
    type: 'execution',
    prompt: 'The first pass has just finished. Which index is now guaranteed to hold its final sorted value?',
    // Frame 9 for [3, 7, 2, 5]: kind 'sorted', i=0, index=0, arr after swap=[2, 7, 3, 5].
    visualization: { inputArray: [3, 7, 2, 5], frameIndex: 9 },
    options: [
      { id: 'a', text: 'Index 0 — the smallest value in the array was just swapped into it' },
      { id: 'b', text: 'Index 3 — the last position is always fixed after one pass' },
      { id: 'c', text: 'Index 0, but it may still change again in a later pass' },
      { id: 'd', text: 'No index is fixed yet' },
    ],
    correctOptionId: 'a',
    explanation:
      "Selection Sort fixes the front of the unsorted range each pass, not the back like Bubble Sort. After pass one, index 0 holds the array's minimum and is never touched again.",
  },
  {
    id: 'ss-easy-s3-q5',
    type: 'code',
    prompt: 'Fill in the blank — where should the search for the minimum start scanning from?',
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
      'Index i already holds the current candidate minimum (minIndex = i), so the search for a smaller value only needs to check the remaining elements, starting at i + 1.',
  },
];
