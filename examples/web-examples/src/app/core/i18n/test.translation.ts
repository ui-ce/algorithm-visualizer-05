import type { TranslationDictionary } from './translations.type';

// UI chrome for features/test: level selection (test-plan), the quiz
// itself (test.ts + its components), and the results page
// (test-results). See translations.ts's stage checklist — this was the
// one feature area with zero i18n wiring at all (every string was a
// raw English literal), not just missing/incomplete keys.
//
// Deliberately NOT covered here: the actual question bank content
// (prompts/options/explanations in features/test/data/**) — that's ~300
// hand-written quiz questions across 4 algorithms × 3 difficulties × 3
// sets, a large content-translation effort in its own right, not a
// wiring task. It stays English-only for now, the same way Practice's
// per-algorithm content does for every algorithm except bubble-sort
// (see translations.ts).
export const TEST_TRANSLATIONS: TranslationDictionary = {
  // Shared difficulty labels — level-card, question-sidebar, and the
  // results page's "Previous Attempt" pill all show the same three
  // words, so they're translated once here instead of three times.
  'test.difficulty.easy': { fa: 'آسان', en: 'Easy' },
  'test.difficulty.medium': { fa: 'متوسط', en: 'Medium' },
  'test.difficulty.hard': { fa: 'سخت', en: 'Hard' },

  // test-plan.html (level selection)
  'test.plan.chooseTitle': { fa: 'برنامه آزمون خود را انتخاب کنید', en: 'Choose your test plan' },
  'test.plan.subtitle': {
    fa: 'یک سطح دشواری را برای شروع پاسخ به سوالات انتخاب کنید. برای باز شدن سطح بعدی، همه‌ی مجموعه‌های این سطح را کامل کنید.',
    en: 'Select a difficulty level to start solving questions. Complete all sets in a level to unlock the next one.',
  },

  // level-card.html
  'test.level.setsSubtitle': {
    fa: '{sets} مجموعه - {questions} سوال در هر مجموعه',
    en: '{sets} Sets - {questions} Questions per Set',
  },
  'test.level.lockedText': {
    fa: 'همه‌ی ۳ مجموعه در {unlocksAfter} را کامل کنید تا {level} باز شود',
    en: 'Complete all 3 sets in {unlocksAfter} to unlock {level}',
  },
  'test.level.cta.locked': { fa: 'قفل شده', en: 'Locked' },
  'test.level.cta.start': { fa: 'شروع {level}', en: 'Start {level}' },
  'test.level.starWorthTitle': {
    fa: 'اتمام {level} مجموع ستاره‌های شما را به {count} ستاره می‌رساند',
    en: 'Finishing {level} brings your total to {count} star{plural}',
  },
  'test.level.starTooltip.earned': {
    fa: 'کسب شده — شما سطح {level} را کامل کردید',
    en: 'Earned — you completed the {level} level',
  },
  'test.level.starTooltip.toEarn': {
    fa: 'سطح {level} را کامل کنید تا این ستاره را به دست آورید',
    en: 'Complete the {level} level to earn this star',
  },

  // set-row.html
  'test.set.label': { fa: 'مجموعه {number}', en: 'Set {number}' },

  // question-sidebar.html
  'test.sidebar.setTitle': { fa: 'مجموعه {number}', en: 'Set {number}' },
  'test.sidebar.question': { fa: 'سوال {number}', en: 'Question {number}' },

  // question-type-badge.ts
  'test.type.conceptual': { fa: 'مفهومی', en: 'Conceptual' },
  'test.type.execution': { fa: 'اجرایی', en: 'Execution' },
  'test.type.code': { fa: 'کد', en: 'Code' },

  // question-card.html
  'test.question.number': { fa: 'سوال {number}', en: 'Question {number}' },

  // test-progress.html
  'test.progress.title': { fa: 'پیشرفت آزمون', en: 'Test Progress' },

  // test-stats.html / test-results.html summary boxes
  'test.stats.xp': { fa: 'امتیاز', en: 'XP' },
  'test.stats.correct': { fa: 'درست', en: 'Correct' },
  'test.stats.incorrect': { fa: 'نادرست', en: 'Incorrect' },
  'test.stats.skipped': { fa: 'رد شده', en: 'Skipped' },
  'test.stats.streak': { fa: 'زنجیره', en: 'Streak' },
  'test.stats.bestStreak': { fa: 'بهترین زنجیره', en: 'Best Streak' },

  // test.html footer button + leave-confirm
  'test.footer.backToResults': { fa: 'بازگشت به نتیجه', en: 'Back to Results' },
  'test.footer.nextQuestion': { fa: 'سوال بعدی', en: 'Next question' },
  'test.footer.finishTest': { fa: 'پایان آزمون', en: 'Finish Test' },
  'test.footer.skipToNext': { fa: 'رد کردن و رفتن به بعدی', en: 'Skip to next question' },
  'test.confirmLeave': {
    fa: 'مطمئنید می‌خواهید خارج شوید؟ پیشرفت شما در این آزمون از بین می‌رود.',
    en: 'Are you sure you want to leave? Your progress on this test will be lost.',
  },

  // test-results.html
  'test.results.title.passed': { fa: 'آزمون کامل شد!', en: 'Test Completed!' },
  'test.results.title.failed': { fa: 'به تمرین ادامه بده!', en: 'Keep Practicing!' },
  'test.results.scoreLabel': { fa: 'امتیاز شما', en: 'Your Score' },
  'test.results.sentence.pass.0': {
    fa: 'آفرین! برای بهتر شدن باز هم تمرین کن.',
    en: 'Great job! Keep practicing to improve even better.',
  },
  'test.results.sentence.pass.1': {
    fa: 'عالی بود — تسلط خوبی روی این مبحث داری.',
    en: "Nicely done — you've got a solid handle on this one.",
  },
  'test.results.sentence.pass.2': {
    fa: 'کار خوبی بود! این سطح رسماً مال توئه.',
    en: 'Solid work! This level is officially yours.',
  },
  'test.results.sentence.fail.0': {
    fa: 'هنوز به آن نرسیدی. تمرین کن و دوباره امتحان کن!',
    en: 'Not quite there yet. Keep practicing and try again!',
  },
  'test.results.sentence.fail.1': {
    fa: 'خیلی نزدیکی — یک دور دیگه و بهش می‌رسی.',
    en: "So close — one more round and you'll have it.",
  },
  'test.results.sentence.fail.2': {
    fa: 'نگران نباش، جواب‌ها رو مرور کن و دوباره تلاش کن.',
    en: "Don't worry, review the answers and give it another shot.",
  },
  'test.results.action.nextTest': { fa: 'آزمون بعدی', en: 'Next Test' },
  'test.results.action.backToAlgorithms': { fa: 'بازگشت به الگوریتم‌ها', en: 'Back to Algorithms' },
  'test.results.action.reviewAnswers': { fa: 'مرور پاسخ‌ها', en: 'Review Answers' },
  'test.results.action.tryAgain': { fa: 'تلاش دوباره', en: 'Try Again' },
  'test.results.panel.performanceSummary': { fa: 'خلاصه عملکرد', en: 'Performance Summary' },
  'test.results.panel.questionOverview': { fa: 'مرور سوالات', en: 'Question Overview' },
  'test.results.panel.performanceInsight': { fa: 'تحلیل عملکرد', en: 'Performance Insight' },
  'test.results.panel.previousAttempt': { fa: 'تلاش قبلی', en: 'Previous Attempt' },
  'test.results.insight.strongest': { fa: 'قوی‌ترین بخش شما:', en: 'Your strongest area:' },
  'test.results.insight.weakest': { fa: 'نیازمند تقویت:', en: 'Needs improvement:' },
  // 'needLearning' links a conceptual weak area to the Learn page;
  // 'needPractice' links an execution/code weak area to Practice
  // instead — see test-results.ts's weakAreaActionLabel/onNeedMoreClick.
  'test.results.insight.needLearning': { fa: '(نیاز به یادگیری؟)', en: '(need learning?)' },
  'test.results.insight.needPractice': { fa: '(نیاز به تمرین؟)', en: '(need practice?)' },
  'test.results.insight.type.conceptual': { fa: 'سوالات مفهومی', en: 'Conceptual questions' },
  'test.results.insight.type.execution': {
    fa: 'سوالات اجرایی / دنبال کردن مراحل',
    en: 'Execution / step-tracing questions',
  },
  'test.results.insight.type.code': { fa: 'سوالات کد (شبه‌کد)', en: 'Code (pseudocode) questions' },
  'test.results.insight.empty': { fa: '—', en: '—' },
  'test.results.chart.currentScore': { fa: 'امتیاز فعلی:', en: 'Current Score:' },
  'test.results.chart.fromPrevious': { fa: 'نسبت به تلاش قبلی', en: 'from previous attempt' },
  'test.results.chart.loading': { fa: 'در حال بارگذاری پیشرفت شما…', en: 'Loading your progress…' },
  'test.results.chart.notEnough': {
    fa: 'نمودار پیشرفت شما بعد از چند بار تکمیل این مجموعه نمایش داده می‌شود.',
    en: "Your progress chart will show up once you've completed this set a couple of times.",
  },
  'test.results.locked.text': {
    fa: 'این بخش پس از ورود به حساب کاربری‌تان باز می‌شود',
    en: 'This feature will be open when you log in to your account',
  },
  'test.results.locked.signIn': { fa: 'ثبت‌نام / ورود', en: 'Sign up / Log in' },

  'test.footer.skipToNextQuestion': {
    fa: 'رفتن به سؤال بعدی',
    en: 'Skip to next question',
  },

  'test.confirm.leave': {
    fa: 'آیا مطمئن هستید که می‌خواهید خارج شوید؟ پیشرفت شما در این آزمون از بین خواهد رفت.',
    en: 'Are you sure you want to leave? Your progress on this test will be lost.',
  },
};
