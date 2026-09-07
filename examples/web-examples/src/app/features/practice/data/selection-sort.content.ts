import type { AlgorithmContent } from './algorithm-content.types';

export const SELECTION_SORT_CONTENT: AlgorithmContent = {
  overview:
    'Selection Sort builds a sorted array one element at a time by repeatedly scanning the unsorted remainder for its smallest value and moving that value into place at the front of the unsorted region. After each pass, the sorted region at the front of the array grows by exactly one element, and that element never needs to be touched again. Unlike Bubble Sort, which swaps repeatedly as it scans, Selection Sort only performs a single swap per pass \u2014 after finding the minimum, it swaps it directly into place instead of bubbling it there one step at a time.',
  intuition:
    'Imagine sorting a hand of playing cards by repeatedly scanning through the remaining unsorted cards, finding the smallest one, and placing it at the end of the row you\u2019ve already sorted. You don\u2019t rearrange anything else while scanning \u2014 you just remember which card is currently the smallest as you go \u2014 and only once you\u2019ve seen every remaining card do you actually move that one card into place. Then you scan the (now slightly smaller) remaining pile again for its smallest card, and repeat until there\u2019s nothing left to scan.',
  howItWorks: [
    'Treat the array as split into a sorted region at the front (initially empty) and an unsorted region covering the rest.',
    'Scan the entire unsorted region to find its smallest value, keeping track of its index as you go.',
    'Once the scan finishes, swap that minimum value into the first position of the unsorted region.',
    'That position now belongs to the sorted region, which grows by one element, and the unsorted region shrinks by one.',
    'Repeat the scan-and-swap process on the new, smaller unsorted region.',
    'Once only one element remains in the unsorted region, it\u2019s automatically in its correct place and the array is fully sorted.',
  ],
  keyCharacteristic:
    'Selection Sort performs at most n-1 swaps, regardless of how the input is arranged — unlike Bubble Sort or Insertion Sort, whose number of swaps or shifts depends heavily on the initial order of the data. This makes Selection Sort attractive when writing to memory is expensive, but it also means it cannot finish early on already-sorted data: it still scans the full unsorted region on every pass.',
  overviewFaq: [
    {
      question: 'Why does Selection Sort perform at most n-1 swaps?',
      answer:
        'Because it performs at most one swap per pass, moving the found minimum into its correct position. With n elements, there are n-1 passes, so the algorithm performs at most n-1 swaps. If the minimum is already in the correct position, the implementation can skip the swap entirely.',
    },
    {
      question: 'Is Selection Sort a stable sort?',
      answer:
        'Not in its typical implementation. Swapping the found minimum into place can jump it past other elements it\u2019s equal to, changing their relative order. It can be made stable by inserting the minimum in place with repeated adjacent swaps instead of one direct swap, but that gives up its main advantage of a fixed, small number of swaps.',
    },
    {
      question: 'Does Selection Sort sort in place?',
      answer:
        'Yes. It only swaps elements within the original array and needs no additional data structure, giving it O(1) space complexity regardless of input size.',
    },
    {
      question: 'Why is Selection Sort always O(n\u00b2), even on sorted data?',
      answer:
        'Because finding the minimum of the unsorted region always requires scanning every element in it, no matter how the values are arranged \u2014 there\u2019s no way to detect "this is already sorted" partway through a scan the way Bubble Sort\u2019s early-exit check can. That full scan happens on every one of the n passes, giving O(n\u00b2) comparisons in every case.',
    },
    {
      question: 'How is Selection Sort different from Bubble Sort?',
      answer:
        'Bubble Sort compares and swaps adjacent elements repeatedly as it scans, which can mean many swaps but lets it exit early on nearly-sorted data. Selection Sort instead only tracks the minimum during the scan and performs a single swap at the very end of each pass \u2014 always exactly n-1 swaps total, but always the full O(n\u00b2) number of comparisons with no early exit.',
    },
    {
      question: 'When is making fewer swaps actually useful?',
      answer:
        'When writing to the underlying storage is much more expensive than reading and comparing \u2014 for example, writing to flash memory, which wears out with repeated writes. Selection Sort\u2019s guaranteed n-1 swaps can be a meaningful advantage there, even though it does more comparisons overall than some other O(n\u00b2) sorts.',
    },
    {
      question: 'When would a real project actually use Selection Sort?',
      answer:
        'Rarely for general-purpose sorting \u2014 its O(n\u00b2) comparisons with no early exit make it consistently slower in practice than Insertion Sort. It shows up mainly in teaching, and in the specific niche where minimizing the number of writes (not comparisons) genuinely matters more than total running time.',
    },
  ],
  complexity: {
    bestTime: 'O(n\u00b2)',
    averageTime: 'O(n\u00b2)',
    worstTime: 'O(n\u00b2)',
    space: 'O(1)',
    stable: 'No',
    inPlace: 'Yes',
    note:
      'Every case is O(n\u00b2) because finding the minimum of the unsorted region always requires a full scan of it, regardless of how the values are arranged \u2014 there\u2019s no early exit like Bubble Sort\u2019s zero-swap-pass check. The array\u2019s arrangement changes nothing about the number of comparisons needed.',
  },
  pros: [
    'Simple to understand and implement, making it a common early example for teaching how sorting algorithms work.',
    'Sorts in place, using no extra memory beyond the input array (O(1) space).',
    'Performs at most n-1 swaps in total, which can matter when writes to the underlying storage are unusually expensive.',
    'Its performance doesn\u2019t depend on the input\u2019s initial arrangement, which makes its running time easy to predict exactly.',
    'Easy to verify correctness of \u2014 there is little algorithmic machinery to get wrong.',
  ],
  cons: [
    'O(n\u00b2) time complexity in every case \u2014 including already-sorted input \u2014 makes it impractical for large datasets.',
    'Not stable in its typical implementation, unlike Bubble Sort and Insertion Sort.',
    'Cannot exit early on nearly-sorted or already-sorted data the way Bubble Sort\u2019s zero-swap check or Insertion Sort\u2019s short inner loop can.',
    'Consistently outperformed by Insertion Sort in practice for small-to-medium inputs, despite both being O(n\u00b2).',
  ],
  whenToUse: [
    'Teaching or learning the core idea of comparison-based sorting, since the scan-then-swap structure is easy to trace by hand.',
    'Sorting very small arrays, where its overhead is negligible regardless of algorithm choice.',
    'Situations where minimizing the number of writes (not comparisons) to the underlying storage matters more than total running time \u2014 for example, memory with limited write endurance.',
    'Environments with strict code-size constraints that can\u2019t afford a more complex sort implementation.',
  ],
  whenNotToUse: [
    'Any dataset large enough that O(n\u00b2) time matters \u2014 use Merge Sort, Quick Sort, or a language\u2019s built-in sort instead.',
    'Data that is already nearly sorted, where Bubble Sort or Insertion Sort will finish noticeably faster thanks to their early-exit behavior.',
    'Situations that require a stable sort \u2014 use Merge Sort or Insertion Sort instead.',
  ],
  applications: [
    {
      title: 'Teaching comparison-based sorting',
      description:
        'Its clean split between "scan for the minimum" and "swap it into place" makes the core idea of building a sorted region incrementally easy to follow before moving on to more complex algorithms.',
    },
    {
      title: 'Sorting very small datasets',
      description:
        'For a handful of elements, Selection Sort\u2019s O(n\u00b2) overhead is negligible, and its predictable, fixed number of swaps makes its behavior easy to reason about.',
    },
    {
      title: 'Write-expensive storage scenarios',
      description:
        'Its guarantee of at most n-1 total swaps makes it a reasonable choice when writes to the underlying medium (such as certain flash memory) are far more costly than reads and comparisons.',
    },
    {
      title: 'Finding the k smallest elements',
      description:
        'Running only the first k passes of Selection Sort finds the k smallest elements in sorted order without needing to fully sort the rest of the array, which can be cheaper than a full sort when k is small.',
    },
    {
      title: 'A stepping stone to other sorts',
      description:
        'Understanding how Selection Sort builds a sorted region one minimum at a time makes it easier to see what Insertion Sort and Heap Sort each change and why those changes improve on it.',
    },
  ],
  implementations: [
    {
      language: 'Python',
      code: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_index = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_index]:
                min_index = j
        if min_index != i:
            arr[i], arr[min_index] = arr[min_index], arr[i]
    return arr`,
    },
    {
      language: 'JavaScript',
      code: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}`,
    },
    {
      language: 'Java',
      code: `public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex != i) {
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}`,
    },
    {
      language: 'C++',
      code: `void selectionSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex != i) {
            std::swap(arr[i], arr[minIndex]);
        }
    }
}`,
    },
  ],
};