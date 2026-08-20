import type { AlgorithmContent } from './algorithm-content.types';

export const BUBBLE_SORT_CONTENT: AlgorithmContent = {
  overview:
    'Bubble Sort is one of the earliest sorting algorithms taught in computer science, valued today mainly for how clearly it demonstrates the idea of comparison-based sorting rather than for its practical speed. It works by repeatedly stepping through the array, comparing each pair of adjacent elements, and swapping them if they are in the wrong order. Each full pass pushes the largest unsorted value to its correct position at the end of the array — the same way a bubble rises to the surface of water, which is where the name comes from. Because it only ever compares neighbors, it is one of the simplest possible ways to sort a list, and a good algorithm to reach for when the goal is to understand sorting itself rather than to sort large amounts of data efficiently.',
  intuition:
    'Imagine a row of people lined up by height, and you can only ever compare two neighbors and swap them if they\u2019re in the wrong order. Walking down the row once, swapping as you go, pushes the tallest person you\u2019ve seen so far all the way to the end by the time you reach it. Walk the row again (ignoring the person now correctly placed at the end) and the next-tallest settles into place. Repeat enough times and the whole line sorts itself, one "bubble" of misplaced height rising to the top each pass.',
  howItWorks: [
    'Start at the beginning of the array and compare the first two adjacent elements.',
    'If the left element is greater than the right one, swap them.',
    'Move to the next pair and repeat the comparison-and-swap step across the whole array — this is one pass.',
    'After each full pass, the largest remaining unsorted value has "bubbled up" to its correct position at the end, so the next pass can ignore it.',
    'Repeat the passes, shrinking the unsorted region by one element each time, until a full pass completes with zero swaps.',
    'Once a pass makes no swaps, the array is fully sorted and the algorithm stops.',
  ],
  keyCharacteristic:
    'Bubble Sort only ever compares and swaps immediate neighbors, never elements further apart — that single constraint is what makes it so simple to implement and verify, and also what makes it slower than algorithms that can move elements larger distances in one step.',
  overviewFaq: [
    {
      question: 'Why is it called "Bubble" Sort?',
      answer:
        'Because on each pass, the largest remaining value "bubbles up" to its final position at the end of the array one step at a time, the same way an air bubble rises through water — always moving toward the surface (the end of the list), never sinking back down.',
    },
    {
      question: 'Is Bubble Sort a stable sort?',
      answer:
        'Yes. Bubble Sort only swaps two adjacent elements when the left one is strictly greater than the right one — equal elements are never swapped past each other, so elements that compare equal keep their original relative order.',
    },
    {
      question: 'Does Bubble Sort sort in place?',
      answer:
        'Yes. It only ever swaps elements within the original array and needs no additional data structure to hold intermediate results, which is why its space complexity is O(1) regardless of the input size.',
    },
    {
      question: 'How many comparisons and swaps does it make?',
      answer:
        'In the worst case (a reverse-sorted array), it makes n(n-1)/2 comparisons and the same number of swaps. On an already-sorted array with the early-exit optimization, it makes only n-1 comparisons and zero swaps.',
    },
    {
      question: 'What is the "early-exit" optimization?',
      answer:
        'A small change where a flag tracks whether any swap happened during a pass. If a full pass completes with no swaps, the array is already sorted and the algorithm can stop immediately instead of running all remaining passes — this is what gives Bubble Sort its O(n) best case.',
    },
    {
      question: 'How is Bubble Sort different from Selection Sort?',
      answer:
        'Selection Sort searches the unsorted part for the minimum value and moves it into place with a single swap per pass, so it always makes exactly n-1 swaps. Bubble Sort instead swaps adjacent out-of-order pairs as it goes, which can mean many more swaps but lets it finish early on nearly-sorted data — something Selection Sort cannot do.',
    },
    {
      question: 'When would a real project actually use Bubble Sort?',
      answer:
        'Almost never for performance — production code uses the language\u2019s built-in sort (typically an O(n log n) algorithm like Timsort or Introsort). Bubble Sort shows up in teaching, in code-size-constrained embedded systems, and as a cheap way to check whether a small, nearly-sorted list needs sorting at all.',
    },
  ],
  complexity: {
    bestTime: 'O(n)',
    averageTime: 'O(n\u00b2)',
    worstTime: 'O(n\u00b2)',
    space: 'O(1)',
    stable: 'Yes',
    inPlace: 'Yes',
    note:
      'The best case happens when the array is already sorted and the implementation checks for a pass with zero swaps to stop early; without that check, Bubble Sort always runs in O(n\u00b2) regardless of the input. The worst case is a reverse-sorted array, where every possible pair is out of order.',
  },
  pros: [
    'Simple to understand and implement \u2014 a good first algorithm for learning how sorting works.',
    'Sorts in place, using no extra memory beyond the input array (O(1) space).',
    'Stable: equal elements keep their original relative order, which matters when sorting records by one field while preserving another field\u2019s order.',
    'With an early-exit check, it performs well on data that is already nearly sorted.',
    'Easy to verify correctness of \u2014 there is little algorithmic machinery to get wrong, which makes it a common first exercise for writing and testing code.',
    'Adaptive: the more nearly-sorted the input already is, the fewer swaps and (with early-exit) passes it needs.',
  ],
  cons: [
    'O(n\u00b2) time complexity makes it impractical for large datasets \u2014 doubling the input roughly quadruples the work.',
    'Even in the best case without an early-exit check, it still performs the full O(n\u00b2) number of comparisons.',
    'Consistently outperformed by other simple O(n\u00b2) algorithms like Insertion Sort in practice, and by far by O(n log n) algorithms like Merge Sort or Quick Sort on anything but the smallest inputs.',
    'Can require many more element swaps than Selection Sort for the same input, since it swaps on every out-of-order adjacent pair rather than once per pass.',
    'Poor cache/memory-access behavior compared to more modern algorithms isn\u2019t the concern for small teaching examples, but becomes relevant if ever used past that scale.',
  ],
  whenToUse: [
    'Teaching or learning how comparison-based sorting works, since every step is easy to trace by hand.',
    'Sorting very small arrays (roughly under a few dozen elements), where its overhead is negligible.',
    'Data that is already nearly sorted, where the early-exit optimization lets it finish in close to O(n).',
    'Environments with strict code-size or memory constraints that can\u2019t afford a more complex sort implementation.',
  ],
  whenNotToUse: [
    'Any dataset large enough that O(n\u00b2) time matters \u2014 use Merge Sort, Quick Sort, or a language\u2019s built-in sort instead.',
    'Performance-sensitive production code, where an O(n log n) algorithm will always outperform it past small inputs.',
    'Situations that need the fewest possible swaps, since Selection Sort guarantees at most n-1 swaps versus Bubble Sort\u2019s potentially much higher count.',
  ],
  applications: [
    {
      title: 'Teaching comparison-based sorting',
      description:
        'Its step-by-step, neighbor-only swaps make it the clearest way to introduce how comparison-based sorting and algorithm analysis work before moving on to faster algorithms.',
    },
    {
      title: 'Sorting very small datasets',
      description:
        'For a handful of elements, Bubble Sort\u2019s O(n\u00b2) overhead is negligible, and its simplicity means there\u2019s less code to get wrong than a more elaborate sort.',
    },
    {
      title: 'Detecting already-sorted data',
      description:
        'With the early-exit optimization, a single pass that makes zero swaps confirms the data is sorted, making it a cheap sanity check before doing more expensive work.',
    },
    {
      title: 'Code-size-constrained embedded systems',
      description:
        'Its minimal implementation footprint makes it a reasonable choice on hardware where the program size matters more than sort performance.',
    },
    {
      title: 'A stepping stone to other sorts',
      description:
        'Understanding Bubble Sort makes it easier to see what Insertion Sort, Cocktail Sort, and Selection Sort each change and why those changes help.',
    },
  ],
  implementations: [
    {
      language: 'Python',
      code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
    },
    {
      language: 'JavaScript',
      code: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}`,
    },
    {
      language: 'Java',
      code: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
    },
    {
      language: 'C++',
      code: `void bubbleSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
    },
  ],
};
