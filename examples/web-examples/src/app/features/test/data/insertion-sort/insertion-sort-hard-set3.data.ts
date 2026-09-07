import type { TestQuestion } from '../../test.types';

// Set 3 / Hard for Insertion Sort.
// Uses the array [8, 4, 6, 2, 7, 3] with different frames and wording from Sets 1 and 2.
// frameIndex values were calculated from the exact Recorder Engine simulation (not guessed).
export const INSERTION_SORT_HARD_SET_3: TestQuestion[] = [
  {
    id: 'is-hard-s3-q1',
    type: 'conceptual',
    prompt:
      'What is the time complexity of Insertion Sort in the best, average, and worst cases?',
    options: [
      {
        id: 'a',
        text: 'Best case: Θ(n), average case: Θ(n²), worst case: Θ(n²)',
      },
      {
        id: 'b',
        text: 'Θ(n²) in all cases, without any difference',
      },
      {
        id: 'c',
        text: 'Best case: Θ(log n), average case: Θ(n log n), worst case: Θ(n²)',
      },
      {
        id: 'd',
        text: 'Θ(n) in all cases',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'When the array is already sorted, each key requires only one comparison, making the running time linear. In the average and worst cases (especially for a reversed array), each key must be compared with and shifted past a significant portion of the preceding elements, resulting in quadratic behavior.',
  },
  {
    id: 'is-hard-s3-q2',
    type: 'conceptual',
    prompt:
      'Which other common sorting algorithm, like Insertion Sort, is inherently stable?',
    options: [
      {
        id: 'a',
        text: 'Merge Sort, because during merging it never moves an equal element past another equal element that appeared earlier',
      },
      {
        id: 'b',
        text: 'Selection Sort, because it uses direct swapping',
      },
      {
        id: 'c',
        text: 'Quick Sort with in-place partitioning',
      },
      {
        id: 'd',
        text: 'None; only Insertion Sort is stable',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'In Merge Sort, when the merge step encounters two equal elements from the two halves, the element from the left half is typically selected first; therefore, their relative order is preserved. Selection Sort and Quick Sort with in-place partitioning are generally not stable because they can move equal elements past one another.',
  },
  {
    id: 'is-hard-s3-q3',
    type: 'conceptual',
    prompt:
      'Why can’t Insertion Sort be reduced to O(n log n) using binary search without reducing the number of shifts?',
    options: [
      {
        id: 'a',
        text: 'Because the main bottleneck is shifting elements to make room for the key, not finding its position; shifting elements in a contiguous array remains inherently O(n)',
      },
      {
        id: 'b',
        text: 'Because binary search only works on sorted arrays, and the sorted portion is always sorted, so this claim is incorrect',
      },
      {
        id: 'c',
        text: 'Because binary search requires recursion, which Insertion Sort does not support',
      },
      {
        id: 'd',
        text: 'Because adding binary search makes the algorithm unstable',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Binary search can reduce the number of comparisons needed to find the correct position of the key to O(log n) (this version is called Binary Insertion Sort), but physically shifting elements to make room in a contiguous array still requires O(n) operations on average. Therefore, the overall O(n²) bound does not change.',
  },
  {
    id: 'is-hard-s3-q4',
    type: 'conceptual',
    prompt:
      'In Shell Sort, what is its relationship to Insertion Sort?',
    options: [
      {
        id: 'a',
        text: 'Shell Sort is essentially a generalized version of Insertion Sort that initially compares and shifts elements using larger gaps and gradually reduces the gap until it eventually reaches a standard Insertion Sort pass',
      },
      {
        id: 'b',
        text: 'Shell Sort has no relationship to Insertion Sort and is entirely based on merging',
      },
      {
        id: 'c',
        text: 'Shell Sort is the recursive version of Insertion Sort',
      },
      {
        id: 'd',
        text: 'Shell Sort is used only for sorting text strings',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Shell Sort starts with a large gap and sorts sublists using logic similar to Insertion Sort; it then gradually reduces the gap. When the gap becomes 1, the algorithm becomes exactly a standard Insertion Sort pass, but because the array is already largely sorted, this final pass is much faster than it would normally be.',
  },
  {
    id: 'is-hard-s3-q5',
    type: 'execution',
    prompt:
      'The current key is 7, and the sorted portion is [4, 6, 8]. What happens next?',
    // Frame 18 for [8, 4, 6, 2, 7, 3]: pass i=4, key=7 has been picked up, before any comparison.
    visualization: { inputArray: [8, 4, 6, 2, 7, 3], frameIndex: 18 },
    options: [
      {
        id: 'a',
        text: '8 (the last element of the sorted portion) is shifted one position to the right because it is greater than the key 7; the scan then stops at 6',
      },
      {
        id: 'b',
        text: '4, 6, and 8 are all shifted simultaneously',
      },
      {
        id: 'c',
        text: '7 is immediately inserted at the end of the sorted portion without any comparison',
      },
      {
        id: 'd',
        text: 'The scan starts again from the beginning of the array (index 0)',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'The sorted portion is scanned from right to left. 8 is greater than 7 and is shifted, but the next value, 6, is not greater than 7. Therefore, the scan stops there and 7 is inserted between 6 and 8.',
  },
  {
    id: 'is-hard-s3-q6',
    type: 'execution',
    prompt:
      'The current key is 3, and the sorted portion is [2, 4, 6, 7, 8]. What happens next?',
    // Frame 22 for [8, 4, 6, 2, 7, 3]: pass i=5, key=3 has been picked up, before any comparison.
    visualization: { inputArray: [8, 4, 6, 2, 7, 3], frameIndex: 22 },
    options: [
      {
        id: 'a',
        text: '8 is shifted one position to the right; this begins a chain of four shifts because 3 is greater than only 2',
      },
      {
        id: 'b',
        text: 'Only 2 is shifted and the remaining elements stay unchanged',
      },
      {
        id: 'c',
        text: '3 is immediately inserted at the end of the array',
      },
      {
        id: 'd',
        text: 'The array is completely reversed',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'The key 3 is greater than only 2. Therefore, 8, 7, 6, and 4 are each shifted one position to the right, one by one from right to left, until the scan stops at 2 and 3 is inserted immediately after it.',
  },
  {
    id: 'is-hard-s3-q7',
    type: 'code',
    prompt:
      'Fill in the blank — how is j updated after each shift?',
    codeLines: [
      {
        lineNumber: 1,
        indentLevel: 0,
        tokens: [{ text: 'function insertionSort(arr):', kind: 'plain' }],
      },
      {
        lineNumber: 2,
        indentLevel: 1,
        tokens: [{ text: 'for i = 1 to n - 1:', kind: 'plain' }],
      },
      {
        lineNumber: 3,
        indentLevel: 2,
        tokens: [{ text: 'key = arr[i]', kind: 'plain' }],
      },
      {
        lineNumber: 4,
        indentLevel: 2,
        tokens: [{ text: 'j = i - 1', kind: 'plain' }],
      },
      {
        lineNumber: 5,
        indentLevel: 2,
        tokens: [
          { text: 'while j >= 0 and arr[j] > key:', kind: 'plain' },
        ],
      },
      {
        lineNumber: 6,
        indentLevel: 3,
        tokens: [{ text: 'arr[j + 1] = arr[j]', kind: 'plain' }],
      },
      {
        lineNumber: 7,
        indentLevel: 3,
        tokens: [
          { text: 'j = j - ', kind: 'plain' },
          { text: '____', kind: 'blank' },
        ],
      },
      {
        lineNumber: 8,
        indentLevel: 2,
        tokens: [{ text: 'arr[j + 1] = key', kind: 'plain' }],
      },
      {
        lineNumber: 9,
        indentLevel: 1,
        tokens: [{ text: 'return arr', kind: 'plain' }],
      },
    ],
    options: [
      { id: 'a', text: '1' },
      { id: 'b', text: '0' },
      { id: 'c', text: '-1' },
      { id: 'd', text: 'j' },
    ],
    correctOptionId: 'a',
    explanation:
      'After the element arr[j] is shifted one position to the right, the algorithm must examine the next element to the left. Therefore, j must be decreased by one so that the scan continues toward the beginning of the sorted portion.',
  },
  {
    id: 'is-hard-s3-q8',
    type: 'code',
    prompt:
      'Fill in the blank — which value should be read from the array and stored in the key variable?',
    codeLines: [
      {
        lineNumber: 1,
        indentLevel: 0,
        tokens: [{ text: 'function insertionSort(arr):', kind: 'plain' }],
      },
      {
        lineNumber: 2,
        indentLevel: 1,
        tokens: [{ text: 'for i = 1 to n - 1:', kind: 'plain' }],
      },
      {
        lineNumber: 3,
        indentLevel: 2,
        tokens: [
          { text: 'key = arr[', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ']', kind: 'plain' },
        ],
      },
      {
        lineNumber: 4,
        indentLevel: 2,
        tokens: [{ text: 'j = i - 1', kind: 'plain' }],
      },
      {
        lineNumber: 5,
        indentLevel: 2,
        tokens: [
          { text: 'while j >= 0 and arr[j] > key:', kind: 'plain' },
        ],
      },
      {
        lineNumber: 6,
        indentLevel: 3,
        tokens: [{ text: 'arr[j + 1] = arr[j]', kind: 'plain' }],
      },
      {
        lineNumber: 7,
        indentLevel: 3,
        tokens: [{ text: 'j = j - 1', kind: 'plain' }],
      },
      {
        lineNumber: 8,
        indentLevel: 2,
        tokens: [{ text: 'arr[j + 1] = key', kind: 'plain' }],
      },
      {
        lineNumber: 9,
        indentLevel: 1,
        tokens: [{ text: 'return arr', kind: 'plain' }],
      },
    ],
    options: [
      { id: 'a', text: 'i' },
      { id: 'b', text: 'j' },
      { id: 'c', text: 'i - 1' },
      { id: 'd', text: '0' },
    ],
    correctOptionId: 'a',
    explanation:
      'In each iteration of the outer loop, the element that needs to be inserted into the sorted portion is exactly arr[i]. Therefore, key must be read from index i.',
  },
  {
    id: 'is-hard-s3-q9',
    type: 'code',
    prompt:
      'Fill in the blank — what condition should be used to continue the inner loop on arr[j]?',
    codeLines: [
      {
        lineNumber: 1,
        indentLevel: 0,
        tokens: [{ text: 'function insertionSort(arr):', kind: 'plain' }],
      },
      {
        lineNumber: 2,
        indentLevel: 1,
        tokens: [{ text: 'for i = 1 to n - 1:', kind: 'plain' }],
      },
      {
        lineNumber: 3,
        indentLevel: 2,
        tokens: [{ text: 'key = arr[i]', kind: 'plain' }],
      },
      {
        lineNumber: 4,
        indentLevel: 2,
        tokens: [{ text: 'j = i - 1', kind: 'plain' }],
      },
      {
        lineNumber: 5,
        indentLevel: 2,
        tokens: [
          { text: 'while j >= 0 and arr[j] ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ' key:', kind: 'plain' },
        ],
      },
      {
        lineNumber: 6,
        indentLevel: 3,
        tokens: [{ text: 'arr[j + 1] = arr[j]', kind: 'plain' }],
      },
      {
        lineNumber: 7,
        indentLevel: 3,
        tokens: [{ text: 'j = j - 1', kind: 'plain' }],
      },
      {
        lineNumber: 8,
        indentLevel: 2,
        tokens: [{ text: 'arr[j + 1] = key', kind: 'plain' }],
      },
      {
        lineNumber: 9,
        indentLevel: 1,
        tokens: [{ text: 'return arr', kind: 'plain' }],
      },
    ],
    options: [
      { id: 'a', text: '>' },
      { id: 'b', text: '>=' },
      { id: 'c', text: '<' },
      { id: 'd', text: '==' },
    ],
    correctOptionId: 'a',
    explanation:
      'The condition should use the strict comparison arr[j] > key. If >= were used, elements equal to the key would also be shifted, and the algorithm would no longer be stable.',
  },
  {
    id: 'is-hard-s3-q10',
    type: 'conceptual',
    prompt:
      'Why is Insertion Sort generally preferred for nearly sorted data or very small arrays over O(n log n) algorithms?',
    options: [
      {
        id: 'a',
        text: 'Because its actual execution overhead — such as function calls, recursion, and array partitioning in algorithms like Quick Sort — is much lower, and on nearly sorted data it approaches its linear bound',
      },
      {
        id: 'b',
        text: 'Because it is actually faster than every O(n log n) algorithm for all types of large data',
      },
      {
        id: 'c',
        text: 'Because no other algorithm is capable of sorting small arrays',
      },
      {
        id: 'd',
        text: 'Because it requires less memory than every other algorithm, including Bubble Sort',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'O(n log n) algorithms such as Merge Sort or Quick Sort have constant overhead, such as recursive calls, array partitioning, and memory allocation, which can outweigh their theoretical benefits for very small arrays. Insertion Sort is straightforward and has little overhead, and on nearly sorted data it approaches its linear O(n) bound; therefore, it is often used for small subarrays in hybrid algorithms.',
  },
];