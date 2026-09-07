import type { TestQuestion } from '../../test.types';

// Set 3 / Hard for Bubble Sort.
//
// Hard — Set 3.
// Focus:
// - algorithm trade-offs
// - stability implications
// - exact behavior of the current implementation
// - complexity reasoning
// - in-place sorting
// - practical usage
// - three Cloze/code questions using different pseudocode components
//
// Execution questions again use the duplicate-containing input
// [4, 2, 4, 1] so the learner can reason about equal values and
// the resulting sorted boundary.

export const BUBBLE_SORT_HARD_SET_3: TestQuestion[] = [
  {
    id: 'bs-hard-s3-q1',
    type: 'conceptual',
    prompt:
      'Two sorting algorithms both use O(n²) time in their worst case. What additional property could make Bubble Sort preferable in a particular situation?',
    options: [
      {
        id: 'a',
        text: 'Its simple in-place behavior and stability can be useful when the input is small and equal-element order matters',
      },
      {
        id: 'b',
        text: 'Bubble Sort always uses less memory than every other sorting algorithm',
      },
      {
        id: 'c',
        text: 'Bubble Sort becomes O(n log n) whenever duplicate values exist',
      },
      {
        id: 'd',
        text: 'Bubble Sort is always faster because it uses adjacent comparisons',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Complexity is not the only consideration. For small inputs, simplicity, in-place operation, and stability can make Bubble Sort acceptable even though its asymptotic performance is poor.',
  },

  {
    id: 'bs-hard-s3-q2',
    type: 'conceptual',
    prompt:
      'What is the key difference between the number of comparisons and the number of swaps for an already-sorted array in this implementation?',
    options: [
      {
        id: 'a',
        text: 'There are still Θ(n²) comparisons, but zero swaps',
      },
      {
        id: 'b',
        text: 'Both comparisons and swaps are zero',
      },
      {
        id: 'c',
        text: 'There are Θ(n²) swaps but only Θ(n) comparisons',
      },
      {
        id: 'd',
        text: 'There are Θ(n) comparisons and Θ(n) swaps',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'The implementation always executes all planned comparisons because it has no early-exit flag. Since every adjacent pair is already ordered, none of those comparisons causes a swap.',
  },

  {
    id: 'bs-hard-s3-q3',
    type: 'conceptual',
    prompt:
      'Why does the strict comparison arr[j] > arr[j + 1] matter even though changing it to >= would still produce a sorted array?',
    options: [
      {
        id: 'a',
        text: 'It prevents equal elements from exchanging positions, which preserves stability',
      },
      {
        id: 'b',
        text: 'It prevents the algorithm from sorting descending instead of ascending',
      },
      {
        id: 'c',
        text: 'It reduces the worst-case complexity from O(n²) to O(n)',
      },
      {
        id: 'd',
        text: 'It allows the algorithm to use recursion instead of iteration',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Both > and >= can sort the values into ascending order. The important difference is that >= also swaps equal elements, which can change their relative order and therefore break stability.',
  },

  {
    id: 'bs-hard-s3-q4',
    type: 'conceptual',
    prompt:
      'Which statement best describes Bubble Sort as an in-place algorithm?',
    options: [
      {
        id: 'a',
        text: 'It rearranges the elements inside the original array instead of building a separate array for the sorted result',
      },
      {
        id: 'b',
        text: 'It always creates a copy of the array before every pass',
      },
      {
        id: 'c',
        text: 'It stores every comparison in a second array',
      },
      {
        id: 'd',
        text: 'It requires recursive storage proportional to n',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'The implementation modifies arr directly by exchanging neighboring elements. No auxiliary array proportional to the input size is required, so the auxiliary space is O(1).',
  },

  {
    id: 'bs-hard-s3-q5',
    type: 'execution',
    prompt:
      'The algorithm is comparing the two equal values. What can be concluded from this step?',
    
    // Frame 6: pass i=0, j=1
    // comparing 4 and 4 -> no swap.
    visualization: {
      inputArray: [4, 2, 4, 1],
      frameIndex: 6,
    },

    options: [
      {
        id: 'a',
        text: 'Their relative order is preserved because the strict > condition is false',
      },
      {
        id: 'b',
        text: 'Their relative order is reversed because equal values are swapped',
      },
      {
        id: 'c',
        text: 'One duplicate is removed before the next comparison',
      },
      {
        id: 'd',
        text: 'The algorithm skips the rest of the current pass',
      },
    ],

    correctOptionId: 'a',

    explanation:
      'The comparison is 4 > 4, which is false. Therefore no swap happens. This concrete behavior is what allows the implementation to remain stable when duplicate values occur.',
  },

  {
    id: 'bs-hard-s3-q6',
    type: 'execution',
    prompt:
      'After the next swap, which value becomes fixed at the end of the first pass?',
    
    // Frame 10: pass i=0, j=2
    // comparing 4 and 1 -> swap.
    visualization: {
      inputArray: [4, 2, 4, 1],
      frameIndex: 10,
    },

    options: [
      {
        id: 'a',
        text: 'The 4 being compared with 1 becomes fixed at index 3',
      },
      {
        id: 'b',
        text: 'The value 1 becomes fixed at index 3',
      },
      {
        id: 'c',
        text: 'The first 4 is moved to index 0 and becomes fixed',
      },
      {
        id: 'd',
        text: 'No value becomes fixed until the entire array is sorted',
      },
    ],

    correctOptionId: 'a',

    explanation:
      'The comparison is 4 versus 1, so the 4 moves right and reaches index 3. Because it is the largest value in the current array, it is now in its final sorted position.',
  },

  {
    id: 'bs-hard-s3-q7',
    type: 'code',
    prompt:
      'Fill in the blank — which index pair is exchanged when the comparison succeeds?',
    
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
          { text: 'if arr[j] > arr[j + 1]:', kind: 'plain' },
        ],
      },
      {
        lineNumber: 5,
        indentLevel: 4,
        tokens: [
          { text: 'swap(arr[', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: '], arr[j + 1])', kind: 'plain' },
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
      { id: 'a', text: 'j' },
      { id: 'b', text: 'j + 1' },
      { id: 'c', text: 'j - 1' },
      { id: 'd', text: 'j + 2' },
    ],

    correctOptionId: 'a',

    explanation:
      'The condition compares arr[j] with arr[j + 1]. When the left value is larger, those same two adjacent positions must be exchanged.',
  },

  {
    id: 'bs-hard-s3-q8',
    type: 'code',
    prompt:
      'Fill in the blank — how many outer-loop passes are required by this implementation?',
    
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
          { text: 'for i = 0 to ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ':', kind: 'plain' },
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
          { text: 'if arr[j] > arr[j + 1]:', kind: 'plain' },
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
      { id: 'a', text: 'n - 2' },
      { id: 'b', text: 'n - 1' },
      { id: 'c', text: 'n' },
      { id: 'd', text: 'n / 2' },
    ],

    correctOptionId: 'a',

    explanation:
      'Because i starts at 0, the values 0 through n - 2 give exactly n - 1 passes. The final element does not need a separate pass because all remaining values have already been placed before it.',
  },

  {
    id: 'bs-hard-s3-q9',
    type: 'code',
    prompt:
      'Fill in the blank — which expression represents the number of comparisons made during the first pass?',
    
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
      { id: 'a', text: 'n - 1' },
      { id: 'b', text: 'n - 2' },
      { id: 'c', text: 'n' },
      { id: 'd', text: '2n - 1' },
    ],

    correctOptionId: 'a',

    explanation:
      'The first pass has i = 0, so j runs from 0 through n - 2. That produces n - 1 adjacent comparisons.',
  },

  {
    id: 'bs-hard-s3-q10',
    type: 'conceptual',
    prompt:
      'You have two datasets: a tiny array where the relative order of equal records must be preserved, and a very large randomly ordered array. Which conclusion about Bubble Sort is most accurate?',
    options: [
      {
        id: 'a',
        text: 'It can be reasonable for the tiny stable-sorting case, but it is generally a poor choice for the large random dataset because of O(n²) scaling',
      },
      {
        id: 'b',
        text: 'It is the better choice for both because it uses adjacent comparisons',
      },
      {
        id: 'c',
        text: 'It should be avoided in both cases because Bubble Sort cannot be stable',
      },
      {
        id: 'd',
        text: 'It is better for the large dataset because it uses O(1) extra space',
      },
    ],

    correctOptionId: 'a',

    explanation:
      'Bubble Sort has useful properties such as stability and O(1) auxiliary space, which can make it acceptable for very small inputs. But for large random inputs, its O(n²) running time makes it scale poorly compared with more efficient algorithms.',
  },
];