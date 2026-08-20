import type { AlgorithmContent } from './algorithm-content.types';

export const MERGE_SORT_CONTENT: AlgorithmContent = {
  overview:
    "Merge Sort is a divide-and-conquer sorting algorithm that splits the array in half again and again until each piece holds a single element, then merges those pieces back together in sorted order. Unlike Bubble Sort, it never compares distant elements directly; instead it relies on the guarantee that two already-sorted lists can always be merged into one sorted list in linear time. This structure is what gives Merge Sort its reliable O(n log n) performance no matter how the input is arranged.",

  intuition:
    "Imagine splitting a deck of cards in half repeatedly until you are holding single cards, which are trivially sorted on their own. Then merge pairs of single cards into sorted pairs, merge pairs of pairs into sorted groups of four, and keep combining upward. At every merge step you only ever look at the front of two already-sorted piles and take the smaller card; the hard work of sorting has already been pushed down to the smallest possible pieces.",

  howItWorks: [
    "If the array has 0 or 1 elements, it is already sorted; this is the base case.",
    "Otherwise, split the array into two halves at the midpoint.",
    "Recursively sort the left half using the same process.",
    "Recursively sort the right half using the same process.",
    "Merge the two sorted halves back into a single sorted array by repeatedly comparing their front elements and taking the smaller one.",
  ],

  keyCharacteristic:
    "Merge Sort's performance is completely independent of how the input is arranged; best, average, and worst case are all O(n log n). The trade-off for this consistency is that it needs O(n) extra space for the temporary arrays used during merging, unlike in-place algorithms.",

  overviewFaq: [
    {
      question: "Why is Merge Sort always O(n log n), even in the best case?",
      answer:
        "The split step always divides the array in half regardless of its contents, producing log n levels of recursion, and the merge step always does O(n) work at each level; there is no shortcut for already-sorted input, since it still has to be split and merged like any other input.",
    },
    {
      question: "Is Merge Sort stable?",
      answer:
        "Yes, as long as the merge step is written to prefer the left list when both front elements are equal. This is a very natural way to write the merge, so most implementations are stable by default.",
    },
    {
      question: "Why does Merge Sort need O(n) extra space?",
      answer:
        "The merge step combines two sorted halves into a new, temporary array before copying the result back; it cannot merge two sorted halves of the same array in place without overwriting values it still needs to read.",
    },
    {
      question: "How is Merge Sort different from Quick Sort?",
      answer:
        "Merge Sort splits the array blindly at the midpoint and does the hard work during the merge step, guaranteeing O(n log n) in every case but using O(n) extra space. Quick Sort splits around a chosen pivot and does the hard work during partitioning, which is typically faster in practice and sorts in place, but can degrade to O(n squared) on unlucky pivot choices.",
    },
    {
      question: "What is the recurrence relation behind Merge Sort's complexity?",
      answer:
        "T(n) = 2T(n/2) + O(n): each call does O(n) work to merge, and splits into two subproblems of half the size. Solving this recurrence with the Master Theorem gives O(n log n).",
    },
    {
      question: "Can Merge Sort be done without recursion?",
      answer:
        "Yes; the bottom-up (iterative) variant starts by merging pairs of single elements, then pairs of pairs, doubling the merge width each pass, without ever calling itself recursively. It reaches the same O(n log n) result and avoids recursion-depth concerns on very large inputs.",
    },
  ],

  complexity: {
    bestTime: "O(n log n)",
    averageTime: "O(n log n)",
    worstTime: "O(n log n)",
    space: "O(n)",
    stable: "Yes",
    inPlace: "No",
    note:
      "Every case takes O(n log n) because the split step always halves the array regardless of its contents (log n levels), and the merge step always does O(n) comparisons per level; there is no input arrangement that lets Merge Sort skip work.",
  },

  pros: [
    "Guaranteed O(n log n) time in every case; no unlucky input can degrade its performance, unlike Quick Sort.",
    "Stable, which matters whenever sorting needs to preserve the relative order of equal elements.",
    "Well suited to sorting linked lists, where it can be implemented with O(1) extra space by relinking nodes instead of copying values.",
    "Naturally parallelizable: the two recursive halves are fully independent and can be sorted concurrently.",
    "Performs predictably well on very large datasets, including external sorting where data does not fit in memory.",
  ],
  cons: [
    "Requires O(n) additional memory for arrays, which can be a real constraint for very large datasets.",
    "Typically slower in practice than Quick Sort on random data, despite having the same asymptotic complexity, due to the overhead of allocating and copying temporary arrays.",
    "Not in-place, which rules it out for memory-constrained environments where Heap Sort or Quick Sort would be preferred.",
    "Recursive implementations can hit stack-depth limits on extremely large arrays unless written iteratively.",
  ],
  whenToUse: [
    "Sorting large datasets where consistent, predictable performance matters more than raw average-case speed.",
    "Sorting linked lists, where Merge Sort's access pattern is a natural fit and avoids Quick Sort's reliance on random access.",
    "Any situation requiring a stable sort; for example sorting records by one field after already sorting by another.",
    "External sorting, where data is too large to fit in memory and must be merged from sorted chunks on disk.",
  ],
  whenNotToUse: [
    "Memory-constrained environments where the O(n) extra space is not available; consider Heap Sort or in-place Quick Sort instead.",
    "Small arrays, where the overhead of recursion and array allocation outweighs Merge Sort's asymptotic advantage over simpler O(n squared) sorts.",
    "Situations demanding the fastest possible average-case time on random data with unlimited memory; Quick Sort usually wins in practice.",
  ],

  applications: [
    {
      title: "External sorting of large files",
      description:
        "Databases and file systems use Merge Sort's merge step to combine sorted chunks of data that are too large to fit in memory at once.",
    },
    {
      title: "Standard library sort implementations",
      description:
        "Java's Arrays.sort() for objects and Python's Timsort both build on merge-sort ideas to guarantee stability and O(n log n) worst-case time.",
    },
    {
      title: "Sorting linked lists",
      description:
        "Because it does not need random access, Merge Sort is the standard choice for sorting linked-list-based data structures in place.",
    },
    {
      title: "Counting inversions",
      description:
        "A modified merge step can count how many pairs are out of order in O(n log n) time, a common building block in computational geometry and ranking problems.",
    },
    {
      title: "Parallel and distributed sorting",
      description:
        "Its independent left and right recursive calls map naturally onto multi-core or distributed systems such as MapReduce-style sorting.",
    },
  ],

  implementations: [
    {
      language: "Python",
      code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)


def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
    },
    {
      language: "JavaScript",
      code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    },
    {
      language: "Java",
      code: `public static void mergeSort(int[] arr, int left, int right) {
    if (left >= right) return;
    int mid = (left + right) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

private static void merge(int[] arr, int left, int mid, int right) {
    int[] temp = new int[right - left + 1];
    int i = left, j = mid + 1, k = 0;
    while (i <= mid && j <= right) {
        temp[k++] = (arr[i] <= arr[j]) ? arr[i++] : arr[j++];
    }
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    System.arraycopy(temp, 0, arr, left, temp.length);
}`,
    },
    {
      language: "C++",
      code: `void merge(std::vector<int>& arr, int left, int mid, int right) {
    std::vector<int> temp;
    int i = left, j = mid + 1;
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) temp.push_back(arr[i++]);
        else temp.push_back(arr[j++]);
    }
    while (i <= mid) temp.push_back(arr[i++]);
    while (j <= right) temp.push_back(arr[j++]);
    std::copy(temp.begin(), temp.end(), arr.begin() + left);
}

void mergeSort(std::vector<int>& arr, int left, int right) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}`,
    },
  ],
};
