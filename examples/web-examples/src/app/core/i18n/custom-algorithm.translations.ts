import type { TranslationDictionary } from './translations.type';

// Translations for the Custom Algorithm page (features/custom-algorithm).
// Kept intentionally small -- the page no longer shows a separate
// title/subtitle/help card; the editor label and starter code comments
// are the only explanation, per the redesign that dropped the extra
// explanatory fields.
export const CUSTOM_ALGORITHM_TRANSLATIONS: TranslationDictionary = {
  'customAlgorithm.breadcrumb.custom': { fa: 'الگوریتم دلخواه', en: 'Custom Algorithm' },
  'customAlgorithm.title': { fa: 'الگوریتم دلخواه', en: 'Custom Algorithm' },

  'customAlgorithm.editor.label': { fa: 'کد Python', en: 'Python code' },

  'customAlgorithm.arraySize.label': { fa: 'تعداد عناصر', en: 'Element count' },
  'customAlgorithm.randomize': { fa: 'تولید تصادفی', en: 'Randomize' },
  'customAlgorithm.run': { fa: 'اجرا', en: 'Run' },
  'customAlgorithm.reset': { fa: 'بازنشانی', en: 'Reset' },

  'customAlgorithm.error.title': { fa: 'اجرای کد با خطا مواجه شد', en: 'Your code failed to run' },
  'customAlgorithm.error.lineLabel': { fa: 'خط', en: 'Line' },

  'customAlgorithm.legend.default': { fa: 'پیش‌فرض', en: 'Default' },
  'customAlgorithm.legend.compare': { fa: 'مقایسه', en: 'Comparing' },
  'customAlgorithm.legend.swap': { fa: 'جابجایی', en: 'Swapping' },
  'customAlgorithm.legend.active': { fa: 'در حال تغییر', en: 'Active' },
  'customAlgorithm.legend.sorted': { fa: 'نهایی/مرتب‌شده', en: 'Sorted' },
};