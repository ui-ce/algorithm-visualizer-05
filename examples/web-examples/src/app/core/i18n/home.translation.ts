import type { TranslationDictionary } from './translations.type';

// Strings shared by every page that renders <algo-header> (aria-labels,
// account link, etc.). Lives here rather than a separate header file
// because it's small; split out once a second consumer needs its own
// header-only additions.
export const HEADER_TRANSLATIONS: TranslationDictionary = {
  'header.themeToggle.toLight': { fa: 'تغییر به حالت روشن', en: 'Switch to light mode' },
  'header.themeToggle.toDark': { fa: 'تغییر به حالت تاریک', en: 'Switch to dark mode' },
  'header.account.ariaLabel': { fa: 'حساب کاربری', en: 'Account' },
};

export const HOME_TRANSLATIONS: TranslationDictionary = {
  'home.visualizeButton': { fa: 'مشاهده', en: 'Visualize' },

  'home.algorithm.dfs.name': { fa: 'جست‌وجوی اول عمق (DFS)', en: 'Depth-First Search (DFS)' },
  'home.algorithm.dfs.class': { fa: 'گراف', en: 'Graph' },
  'home.algorithm.dfs.description': {
    fa: 'الگوریتمی برای پیمایش یا جست‌وجوی ساختارهای درختی یا گرافی که در هر شاخه تا جای ممکن پیش می‌رود و سپس بازمی‌گردد.',
    en: 'An algorithm for traversing or searching tree or graph data structures, exploring as far as possible along each branch before backtracking.',
  },

  'home.algorithm.mergeSort.name': { fa: 'ادغام‌سازی (Merge Sort)', en: 'Merge Sort' },
  'home.algorithm.mergeSort.class': { fa: 'مرتب‌سازی', en: 'Sorting' },
  'home.algorithm.mergeSort.description': {
    fa: 'الگوریتم مرتب‌سازی تقسیم‌وحل که آرایه را به دو نیمه تقسیم می‌کند، هر نیمه را به‌صورت بازگشتی مرتب می‌کند و سپس نیمه‌های مرتب‌شده را ادغام می‌کند.',
    en: 'A divide-and-conquer sorting algorithm that divides the array into halves, sorts them recursively, and then merges the sorted halves.',
  },

  'home.algorithm.bubbleSort.name': { fa: 'حبابی (Bubble Sort)', en: 'Bubble Sort' },
  'home.algorithm.bubbleSort.class': { fa: 'مرتب‌سازی', en: 'Sorting' },
  'home.algorithm.bubbleSort.description': {
    fa: 'الگوریتم مرتب‌سازی مقایسه‌ای ساده که در آن هر دو عنصر مجاور با هم مقایسه و در صورت نادرست بودن ترتیب، جابه‌جا می‌شوند.',
    en: 'A simple comparison-based sorting algorithm where each pair of adjacent elements is compared and swapped if they are in the wrong order.',
  },

  'home.algorithm.binarySearch.name': { fa: 'جست‌وجوی دودویی (Binary Search)', en: 'Binary Search' },
  'home.algorithm.binarySearch.class': { fa: 'جست‌وجو', en: 'Searching' },
  'home.algorithm.binarySearch.description': {
    fa: 'الگوریتمی کارآمد برای یافتن یک مقدار هدف در آرایه‌ای مرتب، با تقسیم مکرر بازه جست‌وجو به دو نیم.',
    en: 'An efficient algorithm for finding a target value within a sorted array by repeatedly dividing the search interval in half.',
  },

  'home.algorithm.quickSort.name': { fa: 'مرتب‌سازی سریع (Quick Sort)', en: 'Quick Sort' },
  'home.algorithm.quickSort.class': { fa: 'مرتب‌سازی', en: 'Sorting' },
  'home.algorithm.quickSort.description': {
    fa: 'الگوریتم مرتب‌سازی تقسیم‌وحل که آرایه را حول یک محور (pivot) تقسیم می‌کند تا مقادیر کوچک‌تر در سمت چپ و بزرگ‌تر در سمت راست قرار گیرند، سپس هر بخش را به‌صورت بازگشتی مرتب می‌کند.',
    en: 'A divide-and-conquer sorting algorithm that partitions the array around a pivot so smaller values end up on its left and larger values on its right, then recursively sorts each side.',
  },

  'home.algorithm.selectionSort.name': { fa: 'مرتب‌سازی انتخابی (Selection Sort)', en: 'Selection Sort' },
  'home.algorithm.selectionSort.class': { fa: 'مرتب‌سازی', en: 'Sorting' },
  'home.algorithm.selectionSort.description': {
    fa: 'الگوریتم مرتب‌سازی که به‌طور مکرر بخش مرتب‌نشده آرایه را برای یافتن کوچک‌ترین مقدار جست‌وجو کرده و آن را در ابتدای این بخش جای می‌دهد.',
    en: 'A sorting algorithm that repeatedly scans the unsorted part of the array for its smallest value and swaps it into place at the front of that region.',
  },

  'home.algorithm.insertionSort.name': { fa: 'مرتب‌سازی درجی (Insertion Sort)', en: 'Insertion Sort' },
  'home.algorithm.insertionSort.class': { fa: 'مرتب‌سازی', en: 'Sorting' },
  'home.algorithm.insertionSort.description': {
    fa: 'الگوریتم مرتب‌سازی که ناحیه‌ای مرتب را عنصر به عنصر می‌سازد؛ هر عنصر جدید را در جایگاه درست خود میان عناصر پیش‌تر مرتب‌شده قرار می‌دهد.',
    en: 'A sorting algorithm that builds a sorted region one element at a time, inserting each new element into its correct position among the elements already sorted before it.',
  },

  'home.algorithm.dijkstra.name': { fa: 'دایکسترا (Dijkstra)', en: 'Dijkstra' },
  'home.algorithm.dijkstra.class': { fa: 'گراف / مسیریابی', en: 'Graph / Pathfinding' },
  'home.algorithm.dijkstra.description': {
    fa: 'الگوریتم مسیریابی که کوتاه‌ترین مسیر بین گره‌ها را با استفاده از فاصله میان آن‌ها می‌یابد.',
    en: 'A pathfinding algorithm that finds the shortest path between nodes using distance between nodes.',
  },

  'home.algorithm.linearSearch.name': { fa: 'جست‌وجوی خطی (Linear Search)', en: 'Linear Search' },
  'home.algorithm.linearSearch.class': { fa: 'جست‌وجو', en: 'Searching' },
  'home.algorithm.linearSearch.description': {
    fa: 'الگوریتم جست‌وجوی ساده‌ای که عناصر آرایه را یکی‌یکی بررسی می‌کند تا مقدار هدف پیدا شود یا کل آرایه جست‌وجو شده باشد.',
    en: 'A simple search algorithm that checks each element one by one until the target value is found or the entire array has been searched.',
  },

  // Was "Best-First Search" — wrong algorithm name; BFS is Breadth-First Search.
  'home.algorithm.bfs.name': { fa: 'جست‌وجوی سطحی (BFS)', en: 'Breadth-First Search (BFS)' },
  'home.algorithm.bfs.class': { fa: 'گراف', en: 'Graph' },
  'home.algorithm.bfs.description': {
    fa: 'الگوریتم پیمایش گراف که گره‌ها را سطح‌به‌سطح بررسی می‌کند و پیش از رفتن به سطح بعدی، همه‌ی گره‌های همسایه را بازدید می‌کند.',
    en: 'A graph traversal algorithm that explores nodes level by level, visiting all neighboring nodes before moving to the next level.',
  },

  'home.algorithm.aStar.name': { fa: 'جست‌وجوی ای-استار (A*)', en: 'A* Search' },
  'home.algorithm.aStar.class': { fa: 'گراف', en: 'Graph' },
  'home.algorithm.aStar.description': {
    fa: 'الگوریتم مسیریابی‌ای که با ترکیب هزینه‌ی طی‌شده تا این لحظه و برآوردی از فاصله‌ی باقی‌مانده تا هدف، مسیری کارآمد پیدا می‌کند.',
    en: 'A pathfinding algorithm that finds an efficient route by combining the cost already traveled with an estimate of the remaining distance to the goal.',
  },
};