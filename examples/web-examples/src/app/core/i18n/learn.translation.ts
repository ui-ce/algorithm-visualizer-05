import type { TranslationDictionary } from './translations.type';

export const LEARN_TRANSLATIONS: TranslationDictionary = {
  // Breadcrumb (reuses practice.breadcrumb.home / practice.breadcrumb.algorithms
  // for the first two segments — see learn.ts)
  'learn.breadcrumb.learn': { fa: 'یادگیری', en: 'Learn' },

  // Section headings — title text only; the "{name}" placeholder in
  // whatIsTitle is filled in via translateVar with the algorithm's own
  // display name (e.g. "What is DFS?" / "این DFS چیست؟").
  'learn.section.whatIsTitle': { fa: '{name} چیست؟', en: 'What is {name}?' },
  'learn.section.howItWorks': { fa: 'روش کار', en: 'How does it work?' },
  'learn.section.pseudocode': { fa: 'شبه‌کد', en: 'Pseudocode' },
  'learn.section.complexity': { fa: 'پیچیدگی', en: 'Complexity' },
  'learn.section.simpleExample': { fa: 'مثال ساده', en: 'Simple Example' },

  // Complexity block
  'learn.complexity.time': { fa: 'پیچیدگی زمانی', en: 'Time Complexity' },
  'learn.complexity.space': { fa: 'پیچیدگی فضایی', en: 'Space Complexity' },
  'learn.complexity.reference': { fa: 'منبع', en: 'Reference' },

  // Simple Example hint overlay (single Play affordance — no
  // second/custom-input button, unlike Practice's hint)
  'learn.viz.hintTitle': { fa: 'برای دیدن اجرای الگوریتم، پخش را بزنید', en: 'Press Play to watch it run' },
  'learn.viz.hintDescription': {
    fa: 'این یک نمونه‌ی ساده روی یک گراف کوچک است. فقط دکمه‌ی پخش را بزنید تا مراحل الگوریتم گام‌به‌گام نمایش داده شود.',
    en: 'This is a simple run on a small sample graph. Just press Play to watch each step happen, one at a time.',
  },
  'learn.viz.hintPlay': { fa: 'پخش', en: 'Play' },

  // Unavailable-content fallback (mirrors practice.drawer.noContent),
  // used if this page is ever reached for an algorithm without Learn
  // content yet.
  'learn.noContent': {
    fa: 'محتوای یادگیری برای {name} هنوز نوشته نشده است.',
    en: "Learn content for {name} hasn't been written yet.",
  },

  //unavalable test model
  'learn.testUnavailable.title': {
    fa: 'آزمون «{name}» هنوز آماده نیست.',
    en: 'The "{name}" test isn’t ready yet.',
  },

  'learn.testUnavailable.body': {
    fa: 'سؤالات آزمون این الگوریتم هنوز آماده نشده‌اند. فعلاً می‌توانید از بخش تمرین و یادگیری استفاده کنید.',
    en: 'Quiz questions for this algorithm haven’t been written yet. Please continue with Practice for now.',
  },

  'learn.testUnavailable.button': {
    fa: 'متوجه شدم در یادگیری می‌مانم',
    en: 'Okay, stay in Practice',
  },
};
