import type { AlgorithmContent } from './algorithm-content.types';

export const LINEAR_SEARCH_CONTENT: AlgorithmContent = {
  overview:
    "Binary Search is an efficient algorithm for finding a target value within a sorted array. Instead of checking every element one by one, it repeatedly cuts the search space in half by comparing the target with the middle element and discarding the half that cannot contain the target. This makes it much faster than Linear Search on large sorted datasets.",

  intuition:
    "Think of looking for a word in a dictionary. You do not start at the first page and check every word. You open somewhere near the middle, compare the word you want with the words on that page, and then ignore the half where the word cannot possibly be. You repeat the same process until you find the word or determine that it is not there. Binary Search applies this same idea to a sorted array.",

  howItWorks: [
    "Set two pointers, low and high, to the first and last index of the array.",
    "Calculate the middle index between low and high.",
    "Compare the target value with the element at the middle index.",
    "If the middle element equals the target, the search is complete.",
    "If the target is smaller than the middle element, discard the right half and move high to mid - 1.",
    "If the target is larger than the middle element, discard the left half and move low to mid + 1.",
    "Repeat the process until the target is found or low becomes greater than high.",
  ],

  keyCharacteristic:
    "Binary Search requires the data to be sorted. Its defining characteristic is that every comparison eliminates roughly half of the remaining search space, giving it O(log n) time complexity.",

  overviewFaq: [
    {
      question: "Why does the array need to be sorted?",
      answer:
        "Binary Search decides which half of the array can be discarded by comparing the target with the middle element. This decision is only valid when the elements are ordered, because sorted data guarantees that everything on one side of the middle is smaller and everything on the other side is larger.",
    },
    {
      question: "Why is Binary Search O(log n)?",
      answer:
        "Each comparison removes about half of the remaining elements from consideration. After one comparison, roughly n/2 elements remain; after two, n/4 remain; and so on. The number of times the search space can be halved is logarithmic, giving O(log n) time.",
    },
    {
      question: "What happens when the target is found?",
      answer:
        "When the middle element equals the target, the algorithm stops immediately and returns the target's index. In the visualization, the target and the matching element can be given a distinct success state so the result is immediately visible.",
    },
    {
      question: "What happens when the target is not in the array?",
      answer:
        "The search range keeps getting smaller until low becomes greater than high. At that point there are no elements left to check, so the algorithm concludes that the target is not present and returns a not-found result such as -1.",
    },
    {
      question: "How is Binary Search different from Linear Search?",
      answer:
        "Linear Search checks elements one by one and can require O(n) comparisons. Binary Search repeatedly removes half of the search space and requires O(log n) comparisons, but it can only make this decision efficiently when the data is sorted.",
    },
    {
      question: "Can Binary Search find duplicate values?",
      answer:
        "Yes, but a basic Binary Search usually returns one matching occurrence rather than guaranteeing the first or last occurrence. Modified versions can continue searching after finding a match to locate the first or last position of a duplicated value.",
    },
  ],

  complexity: {
    bestTime: "O(1)",
    averageTime: "O(log n)",
    worstTime: "O(log n)",
    space: "O(1)",
    stable: "N/A — not a sorting algorithm",
    inPlace: "N/A — not a sorting algorithm",
    note:
      "The best case occurs when the target is exactly the middle element on the first comparison. In the average and worst cases, the search repeatedly halves the remaining range, so the number of comparisons grows logarithmically with the size of the array.",
  },

  pros: [
    "Very fast for searching large sorted arrays because each comparison eliminates about half of the remaining elements.",
    "Runs in O(log n) time in the average and worst cases.",
    "Uses O(1) extra space in its iterative implementation.",
    "Works especially well when the same sorted dataset needs to be searched many times.",
  ],

  cons: [
    "Requires the data to be sorted before searching.",
    "Sorting an unsorted dataset can cost O(n log n), which may make Binary Search less useful for a single search.",
    "The basic algorithm does not directly work efficiently with data structures that lack random access, such as linked lists.",
    "Handling duplicates requires additional logic when the goal is to find the first or last occurrence rather than any matching element.",
  ],

  whenToUse: [
    "Searching for a value in a large sorted array.",
    "Performing many searches against the same sorted dataset.",
    "Finding boundaries, insertion positions, or ranges in sorted data.",
    "Working with problems where the possible answer space is ordered or monotonic.",
  ],

  whenNotToUse: [
    "Searching an unsorted array only once, where sorting first would cost more than simply scanning the data.",
    "Working with data structures that do not provide efficient random access, such as linked lists.",
    "Working with data that changes frequently and would require constant re-sorting.",
    "Problems where every element must be inspected regardless of its position.",
  ],

  applications: [
    {
      title: "Searching sorted arrays",
      description:
        "Binary Search is commonly used to quickly locate a value inside a large sorted array or list.",
    },
    {
      title: "Dictionary and lookup systems",
      description:
        "The same divide-and-discard principle can be used whenever information is stored in sorted order and needs to be located efficiently.",
    },
    {
      title: "Finding insertion positions",
      description:
        "Binary Search can determine where a new value should be inserted while keeping an array sorted, as used by lower_bound and upper_bound style operations.",
    },
    {
      title: "Finding boundaries",
      description:
        "Modified Binary Search can locate the first or last position satisfying a condition, making it useful for range and boundary queries.",
    },
    {
      title: "Binary Search on the answer",
      description:
        "The same halving strategy can be applied to an ordered range of possible answers when a problem has a monotonic yes-or-no condition.",
    },
  ],

  implementations: [
    {
      language: "Python",
      code: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1

    while low <= high:
        mid = low + (high - low) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return -1`,
    },
    {
      language: "JavaScript",
      code: `function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);

    if (arr[mid] === target) {
      return mid;
    }

    if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
}`,
    },
    {
      language: "Java",
      code: `public static int binarySearch(int[] arr, int target) {
    int low = 0;
    int high = arr.length - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;

        if (arr[mid] == target) {
            return mid;
        }

        if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return -1;
}`,
    },
    {
      language: "C++",
      code: `int binarySearch(const std::vector<int>& arr, int target) {
    int low = 0;
    int high = static_cast<int>(arr.size()) - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;

        if (arr[mid] == target) {
            return mid;
        }

        if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return -1;
}`,
    },
  ],
};