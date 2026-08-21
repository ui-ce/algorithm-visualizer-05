import type { TranslationDictionary } from './translations.type';

// Strings for the landing page (components/landing). Algorithm
// name/class/description keys are intentionally NOT duplicated here —
// the landing page's algorithm picker section reuses the existing
// `home.algorithm.*` keys from home.translation.ts so both places stay
// in sync from one source. The mini-demo's reset button also reuses
// `practice.nav.again` from practice.translation.ts rather than having
// its own key, so it reads identically to the real practice controls.
//
// Revision note (round 3): rewrote the marketing copy to talk to the
// visitor as someone capable, not someone struggling ("Interactive
// visualizations... to help you truly understand" instead of "for a
// lot of students who find X hard"). Also removed a line that was
// actually a note to the developer, not real site copy.
export const LANDING_TRANSLATIONS: TranslationDictionary = {
  // Header center section-nav
  'landing.nav.algorithms': { fa: 'الگوریتم‌ها', en: 'Algorithms' },
  'landing.nav.features': { fa: 'مسیر یادگیری', en: 'How it works' },
  'landing.nav.tour': { fa: 'محیط برنامه', en: 'Product tour' },
  'landing.nav.quiz': { fa: 'آزمون', en: 'Testing' },
  'landing.nav.compare': { fa: 'مقایسه', en: 'Compare' },

  // Hero
  'landing.hero.title.line1': { fa: 'الگوریتم‌ها رو دیگه', en: 'Stop reading algorithms.' },
  'landing.hero.title.highlight': { fa: 'حفظ نکن، ببینشون', en: 'Start watching them.' },
  'landing.hero.subtitle': {
    fa: 'تجسم‌های تعاملی و آزمون‌هایی که کمکت می‌کنن الگوریتم‌ها رو واقعاً بفهمی.',
    en: 'Interactive visualizations and quizzes to help you truly understand how algorithms work.',
  },
  'landing.hero.cta.start': { fa: 'شروع یادگیری', en: 'Start learning' },
  'landing.hero.cta.watch': { fa: 'ببین چطور کار می‌کنه', en: 'See it in action' },
  'landing.hero.demo.label': { fa: 'مرتب‌سازی حبابی — زنده', en: 'Bubble Sort — live' },
  'landing.hero.demo.sorted': { fa: 'مرتب شد ✓', en: 'Sorted ✓' },

  // Algorithm picker section
  'landing.picker.title': { fa: 'الگوریتمت رو انتخاب کن', en: 'Pick your algorithm' },
  'landing.picker.subtitle': {
    fa: 'قبل از شروع، ببین چطور کار می‌کنه — بعد بزن بریم تمرین واقعی.',
    en: 'See it move before you dive in — then jump straight into real practice.',
  },
  'landing.picker.category.sorting': { fa: 'مرتب‌سازی', en: 'Sorting' },
  'landing.picker.category.searching': { fa: 'جست‌وجو', en: 'Searching' },
  'landing.picker.category.graph': { fa: 'گراف و مسیریابی', en: 'Graph & Pathfinding' },

  // Features / learning journey — numbers now live only in the big
  // decorative numeral badge in the template, not duplicated in the text.
  'landing.features.title': { fa: 'یاد بگیر، تمرین کن، ثابت کن', en: 'Learn it, practice it, prove it' },
  'landing.features.subtitle': {
    fa: 'هر الگوریتم سه مرحله داره — و در آخر تا سه ستاره می‌گیری تا بدونی واقعاً چقدر یادش گرفتی.',
    en: 'Every algorithm has three stages — finish them to earn up to three stars and know exactly how well you learned it.',
  },
  'landing.features.learn.title': { fa: 'یادگیری', en: 'Learn' },
  'landing.features.learn.description': {
    fa: 'شبه‌کد، توضیح مرحله‌به‌مرحله و یه اجرای نمایشی از الگوریتم، قبل از اینکه خودت دست به کار بشی.',
    en: 'Pseudocode, step-by-step explanations, and a guided run-through before you touch anything yourself.',
  },
  'landing.features.practice.title': { fa: 'تمرین', en: 'Practice' },
  'landing.features.practice.description': {
    fa: 'داده دلخواه بده، سرعت اجرا رو تنظیم کن، قدم‌به‌قدم جلو برو یا عقب برگرد و ببین دقیقاً کجای الگوریتمی.',
    en: 'Feed in your own data, control the speed, step forward or back, and see exactly where you are in the algorithm.',
  },
  'landing.features.test.title': { fa: 'آزمون', en: 'Test' },
  'landing.features.test.description': {
    fa: 'سه سطح سختی، سه نوع سؤال. جواب بده و همون‌جا نتیجه و ستاره‌هاتو بگیر.',
    en: 'Three difficulty levels, three question types. Answer them and get your result and stars right away.',
  },
  'landing.features.stars.title': { fa: 'پیشرفت قابل‌اندازه‌گیری', en: 'Progress you can measure' },
  'landing.features.stars.description': {
    fa: 'برای هر الگوریتم تا ۳ ستاره جمع می‌کنی — یه راه ساده برای اینکه بدونی کجاها هنوز باید مرور کنی.',
    en: 'Earn up to 3 stars per algorithm — a simple way to see what still needs review.',
  },

  // Product tour — mockup frames for Learn / Practice / Test. `image`
  // filenames are referenced from landing.ts; drop real screenshots at
  // src/assets/screenshots/<file> and they render automatically — until
  // then the frame still looks intentional (gradient placeholder, not a
  // broken image icon).
  'landing.tour.title': { fa: 'محیط واقعی رو ببین', en: 'See the real thing' },
  'landing.tour.subtitle': {
    fa: 'همون چیزی که خوندی، همین‌جا واقعاً داره اجرا می‌شه.',
    en: 'Everything you just read about, actually running.',
  },
  'landing.tour.learn.title': { fa: 'یادگیری قدم‌به‌قدم', en: 'Step-by-step learning' },
  'landing.tour.learn.description': {
    fa: 'شبه‌کد و توضیح هر خط، همزمان با اجرای زنده‌ی الگوریتم روی داده نمونه.',
    en: 'Pseudocode and a line-by-line explanation, synced live with the algorithm running on sample data.',
  },
  'landing.tour.practice.title': { fa: 'تمرین با داده خودت', en: 'Practice with your own data' },
  'landing.tour.practice.description': {
    fa: 'یه آرایه دلخواه بده، سرعت رو تنظیم کن، جلو و عقب برو و ببین هر مرحله دقیقاً چی تغییر می‌کنه.',
    en: 'Feed in your own array, control the speed, step forward and back, and watch exactly what changes at each step.',
  },
  'landing.tour.test.title': { fa: 'آزمون و نتیجه فوری', en: 'Testing with instant results' },
  'landing.tour.test.description': {
    fa: 'سؤال مفهومی، اجرایی و کدنویسی — با نتیجه، امتیاز و ستاره همون لحظه که تموم می‌کنی.',
    en: 'Conceptual, execution and code questions — with your score and stars the moment you finish.',
  },
  'landing.tour.cta': { fa: 'امتحانش کن', en: 'Try it' },

  // Quiz spotlight — a dedicated, larger callout for the Test feature.
  'landing.quiz.title': { fa: 'وقتی فکر می‌کنی بلدی، بسنجش', en: "Think you've got it? Prove it." },
  'landing.quiz.subtitle': {
    fa: 'برای هر الگوریتم یه آزمون واقعی داری، نه یه کوییز تزئینی.',
    en: 'Every algorithm has a real test behind it, not a decorative quiz.',
  },
  'landing.quiz.stat.levels.value': { fa: '۳', en: '3' },
  'landing.quiz.stat.levels.label': { fa: 'سطح سختی', en: 'difficulty levels' },
  'landing.quiz.stat.types.value': { fa: '۳', en: '3' },
  'landing.quiz.stat.types.label': { fa: 'نوع سؤال', en: 'question types' },
  'landing.quiz.stat.stars.value': { fa: '۳★', en: '3★' },
  'landing.quiz.stat.stars.label': { fa: 'بیشترین امتیاز', en: 'max score' },
  'landing.quiz.cta': { fa: 'برو سراغ آزمون', en: 'Go take a test' },

  // Comparison / "battle" section
  'landing.battle.title': { fa: 'بقیه در مقابل ALGO', en: 'Everyone else vs. ALGO' },
  'landing.battle.subtitle': {
    fa: 'همون الگوریتم، دو تا تجربه‌ی کاملاً متفاوت.',
    en: 'Same algorithm, two completely different experiences.',
  },
  'landing.battle.left.title': { fa: 'روش سنتی', en: 'The old way' },
  'landing.battle.left.item1': { fa: 'شبه‌کد ثابت روی کاغذ', en: 'Static pseudocode on paper' },
  'landing.battle.left.item2': { fa: 'باید تو ذهنت اجراش کنی', en: 'You trace it by hand in your head' },
  'landing.battle.left.item3': {
    fa: 'فقط بعد از امتحان می‌فهمی بلد بودی یا نه',
    en: "You only find out you didn't get it after the exam",
  },
  'landing.battle.left.item4': { fa: 'یه نسخه، یه سرعت، بدون تمرین واقعی', en: 'One version, one speed, no real practice' },
  'landing.battle.right.title': { fa: 'ALGO', en: 'ALGO' },
  'landing.battle.right.item1': { fa: 'اجرای زنده و قدم‌به‌قدم', en: 'Live, step-by-step execution' },
  'landing.battle.right.item2': { fa: 'با داده خودت امتحانش کن', en: 'Run it with your own data' },
  'landing.battle.right.item3': { fa: 'تست فوری با نتیجه و ستاره', en: 'Instant testing with results and stars' },
  'landing.battle.right.item4': { fa: 'کنترل کامل روی سرعت و مراحل', en: 'Full control over speed and steps' },
  'landing.battle.vs': { fa: 'مقابل', en: 'VS' },

  // Sign-up section (replaces the old generic "go to algorithms" final
  // CTA — that destination is already covered by the picker section
  // above, so the last thing on the page is the one CTA that isn't
  // covered anywhere else: creating an account).
  'landing.signup.title': { fa: 'پیشرفتت گم نشه', en: 'Never lose your progress' },
  'landing.signup.subtitle': {
    fa: 'با ساختن حساب کاربری، ستاره‌ها و نتیجه آزمون‌هات همیشه همون‌جا می‌مونن که ولش کردی.',
    en: 'Create an account and your stars, streaks, and test scores stay right where you left them.',
  },
  'landing.signup.cta.register': { fa: 'ثبت‌نام رایگان', en: 'Create free account' },
  'landing.signup.cta.login': { fa: 'قبلاً حساب داری؟ وارد شو', en: 'Already have an account? Log in' },

  // Footer
  'landing.footer.tagline': {
    fa: 'یادگیری الگوریتم‌ها، این‌بار به‌چشم دیدن.',
    en: 'Algorithm learning, this time you can actually see it.',
  },
  'landing.footer.sections.product': { fa: 'محصول', en: 'Product' },
  'landing.footer.links.algorithms': { fa: 'الگوریتم‌ها', en: 'Algorithms' },
  'landing.footer.links.practice': { fa: 'تمرین', en: 'Practice' },
  'landing.footer.links.test': { fa: 'آزمون', en: 'Test' },
  'landing.footer.sections.about': { fa: 'درباره', en: 'About' },
  'landing.footer.links.team': { fa: 'تیم پروژه', en: 'Project team' },
  'landing.footer.links.contact': { fa: 'تماس با ما', en: 'Contact' },
  'landing.footer.copyright': { fa: '© تمامی حقوق محفوظ است.', en: '© All rights reserved.' },
};
