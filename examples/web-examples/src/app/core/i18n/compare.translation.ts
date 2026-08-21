import type { TranslationDictionary } from './translations.type';

// Translations for the Compare page (features/compare). Split out into
// its own file the same way practice/home/landing already are — see
// translations.ts for how this gets merged into the shared dictionary.
//
// 'compare.highlight.<algorithmId>.<0-4>' is the "Key Differences" list
// shown per algorithm column. The five lines follow one fixed schema for
// every algorithm so the same line index always means the same thing
// when two columns are read side by side:
//   0 — simplicity / how easy it is to understand
//   1 — space characteristic
//   2 — best-case / adaptive behavior
//   3 — main weakness
//   4 — one distinctive trait (stability, optimality, traversal order...)
export const COMPARE_TRANSLATIONS: TranslationDictionary = {
  'compare.breadcrumb.compare': { fa: 'مقایسه', en: 'Compare' },

  'compare.title': { fa: 'مقایسه الگوریتم‌ها', en: 'Compare Algorithms' },
  'compare.subtitle': {
    fa: 'دو الگوریتم را کنار هم مقایسه کنید و تفاوت آن‌ها را از نظر پیچیدگی، رفتار و پیاده‌سازی درک کنید.',
    en: 'Compare two algorithms side by side and understand their differences in complexity, behavior and implementation.',
  },

  'compare.algorithm1.label': { fa: 'الگوریتم اول', en: 'Algorithm-1' },
  'compare.algorithm2.label': { fa: 'الگوریتم دوم', en: 'Algorithm-2' },
  'compare.algorithm2.placeholder': { fa: 'یک الگوریتم انتخاب کنید', en: 'choose an algorithm' },

  'compare.noData.title': { fa: 'داده‌ای موجود نیست!', en: 'No Data!' },
  'compare.noData.subtitle': { fa: 'ابتدا یک الگوریتم انتخاب کنید.', en: 'Choose an algorithm first.' },

  'compare.complexity.title': { fa: 'پیچیدگی', en: 'Complexity' },
  'compare.complexity.bestTime': { fa: 'بهترین حالت', en: 'Best Time' },
  'compare.complexity.averageTime': { fa: 'حالت میانگین', en: 'Avrage Time' },
  'compare.complexity.worstTime': { fa: 'بدترین حالت', en: 'Worst time' },
  'compare.complexity.space': { fa: 'پیچیدگی فضایی', en: 'Space Complexity' },

  'compare.keyDifferences.title': { fa: 'تفاوت‌های کلیدی', en: 'Key Differences' },

  'compare.controls.again': { fa: 'دوباره', en: 'Again' },

  // ---- Sorting ----
  'compare.highlight.bubble-sort.0': { fa: 'درک و پیاده‌سازی آن بسیار ساده است', en: 'Simple and easy to understand' },
  'compare.highlight.bubble-sort.1': {
    fa: 'درجا اجرا می‌شود و به حافظه اضافی نیاز ندارد O(1)',
    en: 'Works in-place with O(1) space',
  },
  'compare.highlight.bubble-sort.2': {
    fa: 'روی داده‌های تقریبا مرتب با خروج زودهنگام عملکرد خوبی دارد',
    en: 'Performs well on nearly sorted data',
  },
  'compare.highlight.bubble-sort.3': {
    fa: 'برای مجموعه داده‌های بزرگ ناکارآمد است — O(n\u00b2)',
    en: 'Inefficient for large datasets (O(n\u00b2))',
  },
  'compare.highlight.bubble-sort.4': {
    fa: 'پایدار (Stable): ترتیب عناصر برابر حفظ می‌شود',
    en: 'Stable: keeps the original order of equal elements',
  },

  'compare.highlight.merge-sort.0': {
    fa: 'رویکرد تقسیم و غلبه، قابل اعتماد و قابل فهم',
    en: 'Reliable divide-and-conquer approach, easy to reason about',
  },
  'compare.highlight.merge-sort.1': { fa: 'برای ادغام به حافظه اضافی O(n) نیاز دارد', en: 'Needs O(n) extra space to merge' },
  'compare.highlight.merge-sort.2': {
    fa: 'صرف‌نظر از ترتیب ورودی، همیشه O(n log n) است',
    en: 'Consistently O(n log n), regardless of input order',
  },
  'compare.highlight.merge-sort.3': {
    fa: 'درجا نیست — حافظه اضافی برای آرایه‌های بزرگ پرهزینه است',
    en: 'Not in-place — extra memory can be costly on large arrays',
  },
  'compare.highlight.merge-sort.4': {
    fa: 'پایدار (Stable): ترتیب عناصر برابر حفظ می‌شود',
    en: 'Stable: keeps the original order of equal elements',
  },

  'compare.highlight.quick-sort.0': {
    fa: 'ایده افرازبندی ساده و در عمل سریع',
    en: 'Simple partition-based idea, fast in practice',
  },
  'compare.highlight.quick-sort.1': {
    fa: 'درجا اجرا می‌شود، فقط O(log n) حافظه برای بازگشت نیاز دارد',
    en: 'In-place, only O(log n) extra space for recursion',
  },
  'compare.highlight.quick-sort.2': {
    fa: 'بهترین عملکرد وقتی pivot آرایه را متعادل تقسیم کند',
    en: 'Performs best when the pivot splits the array evenly',
  },
  'compare.highlight.quick-sort.3': {
    fa: 'بدترین حالت روی داده مرتب/معکوس به O(n\u00b2) می‌رسد',
    en: 'Worst case degrades to O(n\u00b2) on sorted/reverse input',
  },
  'compare.highlight.quick-sort.4': {
    fa: 'ناپایدار (Not stable): ترتیب عناصر برابر ممکن است تغییر کند',
    en: 'Not stable: equal elements may be reordered',
  },

  'compare.highlight.selection-sort.0': {
    fa: 'پیاده‌سازی و دنبال‌کردن آن بسیار ساده است',
    en: 'Very simple to implement and trace by hand',
  },
  'compare.highlight.selection-sort.1': {
    fa: 'درجا اجرا می‌شود و به حافظه اضافی نیاز ندارد O(1)',
    en: 'Works in-place with O(1) space',
  },
  'compare.highlight.selection-sort.2': {
    fa: 'همیشه دقیقا n-1 جابجایی انجام می‌دهد',
    en: 'Always makes exactly n-1 swaps, regardless of input',
  },
  'compare.highlight.selection-sort.3': {
    fa: 'بدون خروج زودهنگام — حتی روی داده مرتب هم O(n\u00b2) است',
    en: 'No early exit — always O(n\u00b2), even on sorted data',
  },
  'compare.highlight.selection-sort.4': {
    fa: 'ناپایدار (Not stable): ترتیب عناصر برابر ممکن است تغییر کند',
    en: 'Not stable: equal elements may be reordered',
  },

  'compare.highlight.insertion-sort.0': {
    fa: 'ساده و شهودی، شبیه مرتب کردن کارت‌های بازی',
    en: 'Simple and intuitive, like sorting playing cards',
  },
  'compare.highlight.insertion-sort.1': {
    fa: 'درجا اجرا می‌شود و به حافظه اضافی نیاز ندارد O(1)',
    en: 'Works in-place with O(1) space',
  },
  'compare.highlight.insertion-sort.2': {
    fa: 'روی داده‌های تقریبا مرتب بسیار سریع است، نزدیک به O(n)',
    en: 'Very fast on nearly sorted data — close to O(n)',
  },
  'compare.highlight.insertion-sort.3': {
    fa: 'برای داده‌های بزرگ و کاملا تصادفی ناکارآمد است',
    en: 'Inefficient on large, randomly ordered datasets',
  },
  'compare.highlight.insertion-sort.4': {
    fa: 'پایدار (Stable): ترتیب عناصر برابر حفظ می‌شود',
    en: 'Stable: keeps the original order of equal elements',
  },

  // ---- Searching ----
  'compare.highlight.binary-search.0': {
    fa: 'منطق ساده و پیاده‌سازی بدون خطا',
    en: 'Simple logic, easy to implement correctly',
  },
  'compare.highlight.binary-search.1': { fa: 'به حافظه اضافی نیاز ندارد O(1)', en: 'Needs no extra memory (O(1) space)' },
  'compare.highlight.binary-search.2': {
    fa: 'بسیار سریع — در هر گام فضای جست‌وجو را نصف می‌کند',
    en: 'Extremely fast — halves the search space each step',
  },
  'compare.highlight.binary-search.3': {
    fa: 'نیازمند مرتب بودن از قبل آرایه است',
    en: 'Requires the array to be sorted first',
  },
  'compare.highlight.binary-search.4': {
    fa: 'الگوریتم مرتب‌سازی نیست — به‌دنبال یک مقدار هدف می‌گردد',
    en: 'Not a sorting algorithm — searches for a single target value',
  },

  'compare.highlight.linear-search.0': {
    fa: 'ساده‌ترین روش جست‌وجو، کاملا قابل فهم',
    en: 'The simplest possible search, easy to understand',
  },
  'compare.highlight.linear-search.1': { fa: 'به حافظه اضافی نیاز ندارد O(1)', en: 'Needs no extra memory (O(1) space)' },
  'compare.highlight.linear-search.2': {
    fa: 'روی داده نامرتب هم کار می‌کند — نیازی به پیش‌پردازش نیست',
    en: 'Works on unsorted data — no pre-processing needed',
  },
  'compare.highlight.linear-search.3': {
    fa: 'روی آرایه‌های بزرگ کند است — عناصر را یکی‌یکی بررسی می‌کند',
    en: 'Slow on large arrays — checks elements one by one',
  },
  'compare.highlight.linear-search.4': {
    fa: 'الگوریتم مرتب‌سازی نیست — به‌دنبال یک مقدار هدف می‌گردد',
    en: 'Not a sorting algorithm — searches for a single target value',
  },

  // ---- Graph ----
  'compare.highlight.dijkstra.0': {
    fa: 'منطق کوتاه‌ترین مسیر، قابل اعتماد و پرکاربرد',
    en: 'Reliable shortest-path logic, widely used in practice',
  },
  'compare.highlight.dijkstra.1': {
    fa: 'به O(V) حافظه اضافی برای صف اولویت و هزینه‌ها نیاز دارد',
    en: 'Needs O(V) extra space for the priority queue and costs',
  },
  'compare.highlight.dijkstra.2': {
    fa: 'روی گراف‌های با وزن‌های مثبت متفاوت عملکرد خوبی دارد',
    en: 'Handles graphs with varying positive edge weights well',
  },
  'compare.highlight.dijkstra.3': {
    fa: 'با وزن‌های منفی یال به‌درستی کار نمی‌کند',
    en: 'Does not work correctly with negative edge weights',
  },
  'compare.highlight.dijkstra.4': {
    fa: 'در پایان، کوتاه‌ترین مسیر بهینه را تضمین می‌کند',
    en: 'Guarantees the optimal (shortest) path once finished',
  },

  'compare.highlight.dfs.0': {
    fa: 'ایده بازگشتی/پشته‌ای ساده و قابل دنبال‌کردن',
    en: 'Simple recursive/stack-based idea, easy to trace',
  },
  'compare.highlight.dfs.1': {
    fa: 'به O(V) حافظه اضافی برای مجموعه بازدیدشده‌ها نیاز دارد',
    en: 'Needs O(V) extra space for the visited set and call stack',
  },
  'compare.highlight.dfs.2': {
    fa: 'برای کاوش مسیرهای عمیق یا یافتن دور مناسب است',
    en: 'Efficient for exploring deep paths or detecting cycles',
  },
  'compare.highlight.dfs.3': {
    fa: 'کوتاه‌ترین مسیر را در گراف‌های وزن‌دار تضمین نمی‌کند',
    en: 'Does not guarantee the shortest path in weighted graphs',
  },
  'compare.highlight.dfs.4': {
    fa: 'تا حد امکان پیش می‌رود، سپس بازمی‌گردد (backtrack)',
    en: 'Explores as far as possible before backtracking',
  },

  'compare.highlight.bfs.0': {
    fa: 'ایده صف‌محور ساده و قابل دنبال‌کردن لایه‌به‌لایه',
    en: 'Simple queue-based idea, easy to trace level by level',
  },
  'compare.highlight.bfs.1': {
    fa: 'به O(V) حافظه اضافی برای صف و مجموعه بازدیدشده‌ها نیاز دارد',
    en: 'Needs O(V) extra space for the queue and visited set',
  },
  'compare.highlight.bfs.2': {
    fa: 'کوتاه‌ترین مسیر را در گراف‌های بدون وزن تضمین می‌کند',
    en: 'Guarantees the shortest path in unweighted graphs',
  },
  'compare.highlight.bfs.3': {
    fa: 'روی گراف‌های پهن و کم‌عمق حافظه بیشتری مصرف می‌کند',
    en: 'Can use more memory than DFS on wide, shallow graphs',
  },
  'compare.highlight.bfs.4': {
    fa: 'پیش از دورتر رفتن، همه همسایه‌ها را بررسی می‌کند',
    en: 'Explores all neighbors before moving further away',
  },

  'compare.highlight.a-star.0': {
    fa: 'هزینه واقعی را با یک حدس اکتشافی ترکیب می‌کند',
    en: 'Combines real cost with a heuristic estimate to guide the search',
  },
  'compare.highlight.a-star.1': {
    fa: 'به O(V) حافظه اضافی برای مجموعه‌های باز و بسته نیاز دارد',
    en: 'Needs O(V) extra space for the open and closed sets',
  },
  'compare.highlight.a-star.2': {
    fa: 'با یک تابع اکتشافی خوب، گره‌های بسیار کمتری را بررسی می‌کند',
    en: 'Explores far fewer nodes than Dijkstra with a good heuristic',
  },
  'compare.highlight.a-star.3': {
    fa: 'کیفیت نتیجه به‌شدت به تابع اکتشافی انتخابی وابسته است',
    en: 'Result quality depends heavily on the chosen heuristic',
  },
  'compare.highlight.a-star.4': {
    fa: 'تنها با یک تابع اکتشافی مجاز، مسیر بهینه را تضمین می‌کند',
    en: 'Only guarantees the optimal path with an admissible heuristic',
  },
};
