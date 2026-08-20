import type { TranslationDictionary } from './translations.type';

export const PRACTICE_TRANSLATIONS: TranslationDictionary = {
  // Breadcrumb + tabs
  'practice.breadcrumb.home': { fa: 'خانه', en: 'Home' },
  'practice.breadcrumb.algorithms': { fa: 'الگوریتم‌ها', en: 'Algorithms' },
  'practice.tabs.learn': { fa: 'یادگیری', en: 'Learn' },
  'practice.tabs.practice': { fa: 'تمرین', en: 'Practice' },
  'practice.tabs.test': { fa: 'آزمون', en: 'Test' },

  // Drawer icon-button sections (aria via title on the drawer panel)
  'practice.drawer.overview': { fa: 'مرور کلی', en: 'Overview' },
  'practice.drawer.complexity': { fa: 'پیچیدگی', en: 'Complexity' },
  'practice.drawer.prosCons': { fa: 'مزایا و معایب', en: 'Pros & Cons' },
  'practice.drawer.implementation': { fa: 'پیاده‌سازی', en: 'Implementation' },
  'practice.drawer.usage': { fa: 'کاربرد', en: 'Usage' },
  'practice.drawer.noContent': {
    fa: 'محتوایی برای {name} هنوز نوشته نشده است.',
    en: "Content for {name} hasn't been written yet.",
  },

  // Overview panel
  'practice.overview.definition': { fa: 'تعریف', en: 'Definition' },
  'practice.overview.intuition': { fa: 'شهود', en: 'Intuition' },
  'practice.overview.howItWorks': { fa: 'روش کار', en: 'How it works' },
  'practice.overview.keyCharacteristic': { fa: 'ویژگی کلیدی', en: 'Key characteristic' },

  // Complexity panel
  'practice.complexity.bestCase': { fa: 'بهترین حالت', en: 'Best case' },
  'practice.complexity.averageCase': { fa: 'حالت میانگین', en: 'Average case' },
  'practice.complexity.worstCase': { fa: 'بدترین حالت', en: 'Worst case' },
  'practice.complexity.space': { fa: 'فضا', en: 'Space' },
  'practice.complexity.stable': { fa: 'پایدار', en: 'Stable' },
  'practice.complexity.inPlace': { fa: 'درجا', en: 'In-place' },
  'practice.complexity.worstCaseExplanation': { fa: 'توضیح بدترین حالت', en: 'Worst-case explanation' },
  'practice.complexity.yes': { fa: 'بله', en: 'Yes' },
  'practice.complexity.no': { fa: 'خیر', en: 'No' },

  // Pros/cons panel
  'practice.prosCons.pros': { fa: 'مزایا', en: 'Pros' },
  'practice.prosCons.cons': { fa: 'معایب', en: 'Cons' },
  'practice.prosCons.whenToUse': { fa: 'چه زمانی استفاده شود', en: 'When to use' },
  'practice.prosCons.whenNotToUse': { fa: 'چه زمانی استفاده نشود', en: 'When NOT to use' },

  // Implementation panel
  'practice.implementation.copy': { fa: 'کپی', en: 'Copy' },
  'practice.implementation.copied': { fa: 'کپی شد', en: 'Copied' },

  // Visualization section
  'practice.viz.step': { fa: 'گام', en: 'Step' },
  'practice.viz.of': { fa: 'از', en: 'of' },
  'practice.viz.searchTarget': { fa: 'هدف جست‌وجو', en: 'Search target' },
  'practice.viz.speed': { fa: 'سرعت:', en: 'Speed:' },
  'practice.viz.toggleFullscreen': { fa: 'حالت تمام‌صفحه', en: 'Toggle fullscreen' },
  'practice.viz.close': { fa: 'بستن', en: 'Close' },
  'practice.viz.hintTitle': { fa: 'آماده‌اید ببینید چطور کار می‌کند؟', en: 'Ready to see it in action?' },
  'practice.viz.hintDescription': {
    fa: 'برای اجرای الگوریتم روی این آرایه‌ی تصادفی، پخش را بزنید یا ابتدا اعداد دلخواه خودتان را وارد کنید.',
    en: 'Press Play to run the algorithm on this random array, or enter your own numbers first.',
  },
  'practice.viz.dataStructures': { fa: 'ساختارهای داده', en: 'Data Structures' },

  // Legend — sorting algorithms (Bubble/Merge/Quick/Selection/Insertion Sort)
  'practice.legend.default': { fa: 'پیش‌فرض', en: 'Default' },
  'practice.legend.active': { fa: 'فعال', en: 'Active' },
  'practice.legend.comparing': { fa: 'مقایسه', en: 'Comparing' },
  'practice.legend.swapping': { fa: 'جابه‌جایی', en: 'Swapping' },
  'practice.legend.sorted': { fa: 'مرتب‌شده', en: 'Sorted' },

  // Legend — graph algorithms (Dijkstra / DFS / BFS / A*). These map to
  // the same color tokens as the tags GRAPH_METADATA_ENTRY defines in
  // practice.ts ('open'+'path' → active, 'current'+'compare' →
  // comparing, 'visit' → explored, 'closed'+'final-path' → sorted).
  'practice.legend.graph.frontier': { fa: 'در صف بررسی', en: 'Frontier' },
  'practice.legend.graph.current': { fa: 'گره جاری', en: 'Current' },
  'practice.legend.graph.visited': { fa: 'بازدیدشده', en: 'Visited' },
  'practice.legend.graph.finalPath': { fa: 'مسیر نهایی', en: 'Final Path' },

  // Legend — search algorithms (Binary Search / Linear Search). Maps to
  // the 'section'/'middle'+'compare'/'eliminated'/'target' tags in
  // CHART_METADATA_ENTRY.
  'practice.legend.search.range': { fa: 'محدوده جست‌وجو', en: 'Search Range' },
  'practice.legend.search.comparing': { fa: 'در حال بررسی', en: 'Checking' },
  'practice.legend.search.eliminated': { fa: 'حذف‌شده', en: 'Eliminated' },
  'practice.legend.search.found': { fa: 'پیدا شد', en: 'Found' },

  // Navigation controls
  'practice.nav.prev': { fa: 'قبلی', en: 'Prev' },
  'practice.nav.next': { fa: 'بعدی', en: 'Next' },
  'practice.nav.again': { fa: 'دوباره', en: 'Again' },

  // Input controls
  'practice.input.customInput': { fa: 'ورودی دلخواه', en: 'Custom Input' },
  'practice.input.randomInput': { fa: 'ورودی تصادفی', en: 'Random Input' },

  // Data pattern controls
  'practice.pattern.label': { fa: 'الگوی داده:', en: 'Data Pattern:' },
  'practice.pattern.none': { fa: 'بدون الگو', en: 'No Pattern' },
  'practice.pattern.nearlySorted': { fa: 'تقریباً مرتب', en: 'Nearly Sorted' },
  'practice.pattern.reversed': { fa: 'معکوس', en: 'Reversed' },
  'practice.pattern.manyDuplicates': { fa: 'تکراری‌های زیاد', en: 'Many Duplicates' },

  // Compare control
  'practice.compare.compare': { fa: 'مقایسه', en: 'Compare' },

  // Custom input modal
  'practice.modal.title': { fa: 'ورودی دلخواه', en: 'Custom Input' },
  'practice.modal.numberOfElements': { fa: 'تعداد عناصر', en: 'Number of elements' },
  'practice.modal.elements': { fa: 'عناصر', en: 'Elements' },
  'practice.modal.elementsHint': { fa: '(اعشار مجاز است، مثلاً ۳٫۵)', en: '(decimals allowed, e.g. 3.5)' },
  'practice.modal.searchTarget': { fa: 'مقدار جست‌وجو', en: 'Search target' },
  'practice.modal.searchTargetHint': {
    fa: '(لازم نیست حتماً یکی از عناصر بالا باشد)',
    en: "(doesn't have to be one of the elements above)",
  },
  'practice.modal.edges': { fa: 'یال‌ها', en: 'Edges' },
  'practice.modal.edgesHintDijkstra': {
    fa: 'هر خط یک یال، «از به وزن» — مثلاً «A B 4»',
    en: 'one per line, "from to weight" — e.g. "A B 4"',
  },
  'practice.modal.edgesHintDefault': {
    fa: 'هر خط یک یال، «از به» — مثلاً «A B»',
    en: 'one per line, "from to" — e.g. "A B"',
  },
  'practice.modal.startNode': { fa: 'گره شروع', en: 'Start node' },
  'practice.modal.endNode': { fa: 'گره پایان', en: 'End node' },
  'practice.modal.dfsFixedStartNotice': {
    fa: 'گره شروع همیشه «{start}» است — مطمئن شوید یال‌های شما آن را شامل می‌شوند.',
    en: 'Start node is always "{start}" — make sure your edges include it.',
  },
  'practice.modal.dfsMissingStartError': {
    fa: 'هیچ‌کدام از یال‌های شما گره «{start}» را شامل نمی‌شوند.',
    en: 'None of your edges include node "{start}".',
  },
  'practice.modal.apply': { fa: 'اعمال', en: 'Apply' },
  'practice.modal.generateRandom': { fa: 'تولید تصادفی', en: 'Generate Random' },
  'practice.modal.cancel': { fa: 'انصراف', en: 'Cancel' },
  'practice.modal.countPlaceholder': { fa: 'مثال ۱۰', en: 'Example 10' },
  'practice.modal.targetPlaceholder': { fa: 'مثال ۴۲', en: 'Example 42' },
  'practice.modal.error.positiveWholeNumber': {
    fa: 'لطفاً یک عدد صحیح مثبت وارد کنید.',
    en: 'Please enter a positive whole number.',
  },
  'practice.modal.notice.maxCount': {
    fa: 'حداکثر می‌توانید {max} عنصر وارد کنید — روی {max} تنظیم شد.',
    en: 'You can enter at most {max} elements — set to {max}.',
  },
  'practice.modal.error.targetMustBeNumber': { fa: 'مقدار جست‌وجو باید عدد باشد.', en: 'Target must be a number.' },
  'practice.modal.error.edgesFormatDijkstra': {
    fa: 'هر خط باید به‌صورت «از به وزن» باشد، مثلاً «A B 4».',
    en: 'Each line should be "from to weight", e.g. "A B 4".',
  },
  'practice.modal.error.edgesFormatDefault': {
    fa: 'هر خط باید به‌صورت «از به» باشد، مثلاً «A B».',
    en: 'Each line should be "from to", e.g. "A B".',
  },
  'practice.modal.error.startNodeMustAppear': {
    fa: 'گره شروع باید در یکی از یال‌های بالا وجود داشته باشد.',
    en: 'Start node must appear in one of the edges above.',
  },
  'practice.modal.error.endNodeMustAppear': {
    fa: 'گره پایان باید در یکی از یال‌های بالا وجود داشته باشد.',
    en: 'End node must appear in one of the edges above.',
  },
};
