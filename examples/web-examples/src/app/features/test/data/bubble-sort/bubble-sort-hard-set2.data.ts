import type { TestQuestion } from '../../test.types';

// Set 2 / Hard for Bubble Sort.
//
// Hard follows the project's "Cloze Test + purely conceptual"
// specification: complexity, stability, in-place behavior, comparison
// reasoning, and practical usage.
//
// This set intentionally avoids repeating the exact concepts from Set 1.
// It focuses more on:
// - exact comparison/swap counts
// - consequences of changing the comparison operator
// - best-case behavior of THIS implementation
// - relationship between input order and swaps
// - practical algorithm selection
//
// Execution questions use bubbleSortVisualization([4, 2, 4, 1]),
// the same duplicate-containing input used in Hard Set 1.

export const BUBBLE_SORT_HARD_SET_2: TestQuestion[] = [
  {
    id: 'bs-hard-s2-q1',
    type: 'conceptual',
    prompt:
      'For an array of n distinct elements in reverse order, how many swaps does this Bubble Sort implementation perform?',
    options: [
      { id: 'a', text: 'n(n - 1) / 2' },
      { id: 'b', text: 'n - 1' },
      { id: 'c', text: 'n²' },
      { id: 'd', text: 'n log n' },
    ],
    correctOptionId: 'a',
    explanation:
      'In reverse order, every adjacent comparison finds the left element larger than the right element, so every comparison causes a swap. The total number of comparisons is n(n - 1) / 2, so the swap count is the same.',
  },

  {
    id: 'bs-hard-s2-q2',
    type: 'conceptual',
    prompt:
      'What would happen to the stability of this Bubble Sort if the condition changed from arr[j] > arr[j + 1] to arr[j] >= arr[j + 1]?',
    options: [
      {
        id: 'a',
        text: 'It would still sort correctly, but it would no longer be stable because equal elements could be swapped',
      },
      {
        id: 'b',
        text: 'It would become unstable and would also fail to sort the array',
      },
      {
        id: 'c',
        text: 'Nothing would change because equal elements are never compared',
      },
      {
        id: 'd',
        text: 'It would improve the time complexity to O(n log n)',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Using >= would make equal elements satisfy the swap condition. The array could still become sorted, but equal elements could exchange positions, which breaks the stability guarantee of the current implementation.',
  },

  {
    id: 'bs-hard-s2-q3',
    type: 'conceptual',
    prompt:
      'For an already sorted array of n elements, how many comparisons does this implementation still perform?',
    options: [
      { id: 'a', text: 'n(n - 1) / 2' },
      { id: 'b', text: 'n - 1' },
      { id: 'c', text: '0' },
      { id: 'd', text: 'n log n' },
    ],
    correctOptionId: 'a',
    explanation:
      "This implementation has no swapped flag or early-exit condition. Even when every comparison finds the pair already ordered, all n - 1 passes still execute, giving n(n - 1) / 2 comparisons.",
  },

  {
    id: 'bs-hard-s2-q4',
    type: 'conceptual',
    prompt:
      'Why can an already-sorted input still be expensive for this specific Bubble Sort implementation?',
    options: [
      {
        id: 'a',
        text: 'Because it still performs every planned comparison even though no swaps are needed',
      },
      {
        id: 'b',
        text: 'Because sorted arrays always require more swaps than reverse-sorted arrays',
      },
      {
        id: 'c',
        text: 'Because Bubble Sort reverses the array before sorting it',
      },
      {
        id: 'd',
        text: 'Because the algorithm creates a second copy of the input',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'The implementation has no early-exit optimization. Therefore, an already-sorted array performs the same number of comparisons as any other input of the same length, although it performs zero swaps.',
  },

  {
    id: 'bs-hard-s2-q5',
    type: 'execution',
    prompt:
      'The duplicate values have reached adjacent positions. What does this comparison reveal about the algorithm?',
    
    // Frame 6: pass i=0, j=1
    // Comparing 4 and 4 -> willSwap=false.
    visualization: {
      inputArray: [4, 2, 4, 1],
      frameIndex: 6,
    },

    options: [
      {
        id: 'a',
        text: 'Equal elements are left untouched, which preserves their relative order',
      },
      {
        id: 'b',
        text: 'Equal elements are swapped to guarantee ascending order',
      },
      {
        id: 'c',
        text: 'One of the duplicate values is removed',
      },
      {
        id: 'd',
        text: 'The pass stops immediately whenever equal values are found',
      },
    ],

    correctOptionId: 'a',

    explanation:
      'The two 4s are equal, so 4 > 4 is false. They remain in their current order. This is the concrete behavior that gives this implementation its stability property.',
  },

  {
    id: 'bs-hard-s2-q6',
    type: 'execution',
    prompt:
      'At this point in the first pass, what is the important consequence of the next swap?',
    
    // Frame 10: pass i=0, j=2
    // Comparing 4 and 1 -> willSwap=true.
    visualization: {
      inputArray: [4, 2, 4, 1],
      frameIndex: 10,
    },

    options: [
      {
        id: 'a',
        text: 'The value 4 moves to the final position of the first pass',
      },
      {
        id: 'b',
        text: 'The value 1 moves to the first position immediately',
      },
      {
        id: 'c',
        text: 'The two equal 4s are exchanged',
      },
      {
        id: 'd',
        text: 'The algorithm finishes because a swap occurred',
      },
    ],

    correctOptionId: 'a',

    explanation:
      'The comparison is 4 versus 1, so they swap and the array becomes [2, 4, 1, 4]. The larger 4 has now bubbled to index 3, which is the final position for the largest value in this pass.',
  },

  {
    id: 'bs-hard-s2-q7',
    type: 'code',
    prompt:
      'Fill in the blank — which operator must be used to preserve stability while sorting in ascending order?',
    
    codeLines: [
      {
        lineNumber: 1,
        indentLevel: 0,
        tokens: [
          { text: 'function bubbleSort(arr):', kind: 'plain' },
        ],
      },
      {
        lineNumber: 2,
        indentLevel: 1,
        tokens: [
          { text: 'for i = 0 to n - 2:', kind: 'plain' },
        ],
      },
      {
        lineNumber: 3,
        indentLevel: 2,
        tokens: [
          { text: 'for j = 0 to n - i - 2:', kind: 'plain' },
        ],
      },
      {
        lineNumber: 4,
        indentLevel: 3,
        tokens: [
          { text: 'if arr[j] ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ' arr[j + 1]:', kind: 'plain' },
        ],
      },
      {
        lineNumber: 5,
        indentLevel: 4,
        tokens: [
          { text: 'swap(arr[j], arr[j + 1])', kind: 'plain' },
        ],
      },
      {
        lineNumber: 6,
        indentLevel: 1,
        tokens: [
          { text: 'return arr', kind: 'plain' },
        ],
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
      'The strict > operator swaps only when the left element is genuinely larger. Equal elements therefore remain in their original relative order, preserving stability.',
  },

  {
    id: 'bs-hard-s2-q8',
    type: 'code',
    prompt:
      'Fill in the blank — how many comparisons are performed by the inner loop during pass i?',
    
    codeLines: [
      {
        lineNumber: 1,
        indentLevel: 0,
        tokens: [
          { text: 'function bubbleSort(arr):', kind: 'plain' },
        ],
      },
      {
        lineNumber: 2,
        indentLevel: 1,
        tokens: [
          { text: 'for i = 0 to n - 2:', kind: 'plain' },
        ],
      },
      {
        lineNumber: 3,
        indentLevel: 2,
        tokens: [
          { text: 'for j = 0 to n - i - 2:', kind: 'plain' },
        ],
      },
      {
        lineNumber: 4,
        indentLevel: 3,
        tokens: [
          { text: 'compare(arr[j], arr[j + 1])', kind: 'plain' },
        ],
      },
      {
        lineNumber: 5,
        indentLevel: 1,
        tokens: [
          { text: 'return arr', kind: 'plain' },
        ],
      },
    ],

    options: [
      { id: 'a', text: 'n - i - 1' },
      { id: 'b', text: 'n - i - 2' },
      { id: 'c', text: 'n - 1' },
      { id: 'd', text: 'i + 1' },
    ],

    correctOptionId: 'a',

    explanation:
      'The loop runs from j = 0 through j = n - i - 2, inclusive. That gives (n - i - 2) - 0 + 1 = n - i - 1 comparisons during pass i.',
  },

  {
    id: 'bs-hard-s2-q9',
    type: 'code',
    prompt:
      'Fill in the blank — which expression gives the total number of comparisons over all passes?',
    
    codeLines: [
      {
        lineNumber: 1,
        indentLevel: 0,
        tokens: [
          { text: 'function bubbleSort(arr):', kind: 'plain' },
        ],
      },
      {
        lineNumber: 2,
        indentLevel: 1,
        tokens: [
          { text: 'for i = 0 to n - 2:', kind: 'plain' },
        ],
      },
      {
        lineNumber: 3,
        indentLevel: 2,
        tokens: [
          { text: 'for j = 0 to n - i - 2:', kind: 'plain' },
        ],
      },
      {
        lineNumber: 4,
        indentLevel: 3,
        tokens: [
          { text: 'compare(arr[j], arr[j + 1])', kind: 'plain' },
        ],
      },
      {
        lineNumber: 5,
        indentLevel: 1,
        tokens: [
          { text: 'return arr', kind: 'plain' },
        ],
      },
    ],

    options: [
      { id: 'a', text: 'n(n - 1) / 2' },
      { id: 'b', text: 'n(n + 1) / 2' },
      { id: 'c', text: 'n - 1' },
      { id: 'd', text: 'n² - 1' },
    ],

    correctOptionId: 'a',

    explanation:
      'The passes perform (n - 1), (n - 2), ..., 2, 1 comparisons. Their sum is n(n - 1) / 2.',
  },

  {
    id: 'bs-hard-s2-q10',
    type: 'conceptual',
    prompt:
      'If you need to sort a large, randomly ordered array in a performance-sensitive application, why is Bubble Sort generally a poor choice?',
    options: [
      {
        id: 'a',
        text: 'Its quadratic time complexity makes it scale poorly as the input grows',
      },
      {
        id: 'b',
        text: 'It cannot sort arrays containing duplicate values',
      },
      {
        id: 'c',
        text: 'It always requires O(n) additional memory',
      },
      {
        id: 'd',
        text: 'It cannot produce the elements in ascending order',
      },
    ],

    correctOptionId: 'a',

    explanation:
      'For large inputs, O(n²) growth causes the number of comparisons to increase rapidly. Algorithms with O(n log n) behavior, such as Merge Sort, are generally much more appropriate for performance-sensitive large datasets.',
  },
];