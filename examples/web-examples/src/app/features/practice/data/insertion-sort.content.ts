import type { AlgorithmContent } from './algorithm-content.types';

export const INSERTION_SORT_CONTENT: AlgorithmContent = {
  overview:
    'Insertion Sort builds a sorted array one element at a time by taking each element in turn and inserting it into its correct position among the elements already sorted before it. It works much the way most people sort a hand of playing cards: starting from the second card, each new card is picked up and slid backward past any larger cards until it reaches the spot where it belongs. Because it only ever shifts elements that are actually out of place, it does very little work on data that\u2019s already close to sorted, which is one of the reasons it\u2019s often the fastest simple sort in practice for small or nearly-sorted arrays.',
  intuition:
    'Imagine sorting a hand of playing cards by holding them in your left hand and picking up cards one at a time with your right, inserting each new card into its correct spot among the cards you\u2019re already holding sorted. If the new card is bigger than everything you\u2019re holding, it just goes at the end \u2014 barely any work. If it\u2019s smaller than several cards, you slide those larger cards over one at a time to make room, then drop the new card into the gap. Repeat for every card in the original pile, and by the time you\u2019ve picked up the last one, your hand is fully sorted.',
  howItWorks: [
    'Treat the first element as a trivially sorted region of size one.',
    'Take the next element (the "key") and hold its value aside.',
    'Compare the key against the elements just before it, shifting each one that\u2019s greater than the key one position to the right.',
    'Stop shifting as soon as you find an element that\u2019s not greater than the key, or you run off the start of the sorted region.',
    'Drop the key into the gap left by the shifting \u2014 this is its correct position relative to everything already sorted.',
    'Repeat for every remaining element, and the sorted region grows by one each time until it covers the whole array.',
  ],
  keyCharacteristic:
    'Insertion Sort is adaptive: its running time scales with how far each element already is from its final position, not just with the array\u2019s size. On a nearly-sorted array, the inner shifting loop barely runs at all, giving close to O(n) time \u2014 a property Selection Sort doesn\u2019t share, since Selection Sort always does a full scan on every pass regardless of how sorted the data already is.',
  overviewFaq: [
    {
      question: 'Why is Insertion Sort described as "adaptive"?',
      answer:
        'Because the number of shifts it performs for each element depends entirely on how far out of place that element already is. An element that\u2019s already in roughly the right spot needs almost no shifting, so a nearly-sorted array is sorted in close to O(n) time, while a reverse-sorted array forces maximum shifting on every element, giving O(n\u00b2).',
    },
    {
      question: 'Is Insertion Sort a stable sort?',
      answer:
        'Yes. The inner loop only shifts an element right when it is strictly greater than the key, so equal elements are never moved past each other \u2014 elements that compare equal keep their original relative order.',
    },
    {
      question: 'Does Insertion Sort sort in place?',
      answer:
        'Yes. It only shifts elements within the original array, holding just the single key value aside temporarily, which is why its space complexity is O(1) regardless of input size.',
    },
    {
      question: 'Why is Insertion Sort\u2019s best case O(n) instead of O(n\u00b2)?',
      answer:
        'On an already-sorted array, the inner while loop condition (arr[j] > key) is false immediately for every element, so each of the n-1 outer-loop passes does exactly one comparison and zero shifts \u2014 giving O(n) total work instead of the O(n\u00b2) that a full inner scan would take.',
    },
    {
      question: 'How is Insertion Sort different from Selection Sort?',
      answer:
        'Selection Sort always scans the entire unsorted region to find its minimum before doing a single swap, so its comparison count never changes regardless of input. Insertion Sort instead shifts elements only as far as needed to place each new key, so its work scales directly with how sorted the input already is \u2014 much faster on nearly-sorted data, but potentially more total element moves on a reverse-sorted array.',
    },
    {
      question: 'Why do some fast sorts fall back to Insertion Sort for small sections?',
      answer:
        'Algorithms like Quick Sort and Merge Sort have overhead from recursion and partitioning/merging that isn\u2019t worth paying on very small arrays (often under ~10\u201320 elements), where Insertion Sort\u2019s low constant factors and adaptiveness make it faster in practice despite its worse asymptotic complexity. Many production sort implementations switch to Insertion Sort once a recursive section gets small enough.',
    },
    {
      question: 'When would a real project actually use Insertion Sort?',
      answer:
        'Directly, mainly for small arrays or data that arrives already close to sorted (such as appending a few new items to an already-sorted list). Indirectly, it\u2019s extremely common as the small-input fallback inside hybrid sorts like Timsort and Introsort, which is part of why it\u2019s worth learning even though it\u2019s rarely the top-level algorithm for large datasets.',
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
      'The best case happens on an already-sorted array, where every element\u2019s inner while loop stops immediately with zero shifts, giving O(n) total comparisons. The worst case is a reverse-sorted array, where every element has to shift all the way past every element already placed before it.',
  },
  pros: [
    'Simple to understand and implement \u2014 a natural first algorithm for learning how sorting works.',
    'Adaptive: runs close to O(n) on data that\u2019s already sorted or nearly sorted, which many real-world datasets are.',
    'Sorts in place, using no extra memory beyond the input array (O(1) space).',
    'Stable: equal elements keep their original relative order, which matters when sorting records by one field while preserving another field\u2019s order.',
    'Online: it can sort a list as elements arrive one at a time, inserting each new element into its correct position without needing the whole dataset up front.',
    'Very low overhead, which is why it\u2019s the common choice as the small-input fallback inside hybrid sorting algorithms.',
  ],
  cons: [
    'O(n\u00b2) time complexity in the average and worst case makes it impractical for large, unsorted datasets.',
    'Performance degrades sharply on reverse-sorted data, where every element requires the maximum possible number of shifts.',
    'Each shift moves only one element at a time, unlike algorithms that can move elements larger distances in a single step.',
    'Outperformed by O(n log n) algorithms like Merge Sort or Quick Sort on anything but small or nearly-sorted inputs.',
  ],
  whenToUse: [
    'Teaching or learning how comparison-based sorting works, since its card-sorting intuition is easy to follow.',
    'Sorting small arrays (roughly under a few dozen elements), where its low overhead beats more complex algorithms.',
    'Data that\u2019s already sorted or nearly sorted, where it runs close to its O(n) best case.',
    'Online scenarios where elements arrive one at a time and need to be kept in sorted order as they come in.',
    'As the fallback for small sections inside a hybrid sort like Timsort or Introsort.',
  ],
  whenNotToUse: [
    'Any large, unsorted dataset \u2014 use Merge Sort, Quick Sort, or a language\u2019s built-in sort instead.',
    'Data that\u2019s reverse-sorted or otherwise far from sorted, where its O(n\u00b2) worst case fully applies.',
    'Performance-sensitive production code sorting large collections from scratch, where an O(n log n) algorithm will always outperform it past small inputs.',
  ],
  applications: [
    {
      title: 'Sorting small or nearly-sorted datasets',
      description:
        'Its adaptiveness makes it one of the fastest simple sorts for small arrays or data that arrives already close to its final order.',
    },
    {
      title: 'Online sorting as data streams in',
      description:
        'Because it can insert one new element into an already-sorted list at a time, it fits naturally into scenarios where the full dataset isn\u2019t available up front.',
    },
    {
      title: 'Fallback inside hybrid sorting algorithms',
      description:
        'Timsort (used by Python and Java) and Introsort-style algorithms switch to Insertion Sort once a recursive section shrinks below a small threshold, since its low overhead beats recursion overhead at that scale.',
    },
    {
      title: 'Teaching comparison-based and adaptive sorting',
      description:
        'Its clear "shift elements right to make room" behavior makes it a natural next step after Bubble Sort for introducing how an algorithm\u2019s running time can depend on the input\u2019s existing order.',
    },
    {
      title: 'Maintaining a sorted collection incrementally',
      description:
        'The same shift-to-insert logic used in one sorting pass is the basis for keeping a small sorted list correctly ordered as individual new items are added to it.',
    },
  ],
  implementations: [
    {
      language: 'Python',
      code: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
    },
    {
      language: 'JavaScript',
      code: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    },
    {
      language: 'Java',
      code: `public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
    },
    {
      language: 'C++',
      code: `void insertionSort(std::vector<int>& arr) {
    for (int i = 1; i < (int)arr.size(); i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
    },
  ],
};