import type { TestQuestion } from '../../test.types';

// مجموعه ۲ / سخت برای مرتب‌سازی درجی. از آرایه [8, 5, 2, 6, 1, 7]
// با فریم‌ها و عبارت‌بندی متفاوت از مجموعه ۱ استفاده می‌کند.
// مقادیر frameIndex با شبیه‌سازی دقیق موتور ضبط‌کننده (نه حدس) محاسبه شده‌اند.
export const INSERTION_SORT_HARD_SET_2_FA: TestQuestion[] = [
  {
    id: 'is-hard-s2-q1',
    type: 'conceptual',
    prompt: 'برخلاف مرتب‌سازی انتخابی، چرا تعداد مقایسه‌های مرتب‌سازی درجی یک مقدار ثابت نیست؟',
    options: [
      {
        id: 'a',
        text: 'چون حلقه داخلی می‌تواند در هر لحظه، بسته به موقعیت key نسبت به عناصر بخش مرتب‌شده، زودتر متوقف شود',
      },
      {
        id: 'b',
        text: 'چون مرتب‌سازی درجی همیشه دقیقاً n(n - 1) / 2 مقایسه انجام می‌دهد، درست مانند مرتب‌سازی انتخابی',
      },
      {
        id: 'c',
        text: 'چون مرتب‌سازی درجی هرگز بیش از یک مقایسه در هر گذر انجام نمی‌دهد',
      },
      {
        id: 'd',
        text: 'چون تعداد مقایسه‌ها فقط به اندازه آرایه بستگی دارد و نه به مقادیر آن',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'مرتب‌سازی انتخابی همیشه کل محدوده باقی‌مانده را برای یافتن کمینه اسکن می‌کند، صرف‌نظر از ترتیب ورودی. اما در مرتب‌سازی درجی، حلقه while به محض یافتن اولین عنصر کوچک‌تر یا مساوی متوقف می‌شود؛ بنابراین تعداد مقایسه‌ها کاملاً به آرایش اولیه داده‌ها وابسته است.',
  },
  {
    id: 'is-hard-s2-q2',
    type: 'conceptual',
    prompt: 'مرتب‌سازی درجی روی این آرایه ۶ عضوی [8, 5, 2, 6, 1, 7] چند مقایسه در بهترین و بدترین حالت ممکن انجام می‌دهد؟',
    options: [
      {
        id: 'a',
        text: 'بهترین حالت n - 1 = ۵ مقایسه (اگر آرایه از قبل مرتب بود) و بدترین حالت n(n - 1) / 2 = ۱۵ مقایسه (اگر کاملاً معکوس بود)',
      },
      { id: 'b', text: 'همیشه دقیقاً ۱۵ مقایسه، صرف‌نظر از ترتیب اولیه آرایه' },
      { id: 'c', text: 'همیشه دقیقاً ۶ مقایسه، یکی برای هر عنصر' },
      { id: 'd', text: 'بین ۰ و n مقایسه، اما هرگز بیشتر از n' },
    ],
    correctOptionId: 'a',
    explanation:
      'در بهترین حالت (آرایه از قبل مرتب) هر یک از n - 1 کلید فقط با یک مقایسه بلافاصله در جای خود قرار می‌گیرد. در بدترین حالت (آرایه کاملاً معکوس) هر کلید باید با تمام عناصر پیش از خود مقایسه شود که مجموعاً به n(n - 1) / 2 مقایسه می‌رسد.',
  },
  {
    id: 'is-hard-s2-q3',
    type: 'conceptual',
    prompt: 'الگوریتم «تطبیقی» (adaptive) بودن به چه معناست و چرا مرتب‌سازی درجی چنین ویژگی‌ای دارد؟',
    options: [
      {
        id: 'a',
        text: 'یعنی زمان اجرای الگوریتم به میزان مرتب بودن ورودی بستگی دارد؛ مرتب‌سازی درجی روی داده‌های تقریباً مرتب بسیار سریع‌تر از بدترین حالت عمل می‌کند',
      },
      {
        id: 'b',
        text: 'یعنی الگوریتم می‌تواند در حین اجرا نوع داده ورودی را تغییر دهد',
      },
      {
        id: 'c',
        text: 'یعنی الگوریتم به‌صورت خودکار بین چند پیاده‌سازی مختلف انتخاب می‌کند',
      },
      {
        id: 'd',
        text: 'یعنی الگوریتم بدون توجه به ورودی همیشه با یک سرعت ثابت اجرا می‌شود',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'یک الگوریتم تطبیقی از ساختار موجود در ورودی بهره می‌برد. چون حلقه داخلی مرتب‌سازی درجی می‌تواند زودتر متوقف شود، هرچه عناصر به جایگاه نهایی خود نزدیک‌تر باشند، کار کمتری لازم است؛ در نتیجه این الگوریتم به‌طور طبیعی تطبیقی است.',
  },
  {
    id: 'is-hard-s2-q4',
    type: 'conceptual',
    prompt: 'اگر بخواهیم تعداد مقایسه‌ها را با استفاده از جست‌وجوی دودویی (Binary Insertion Sort) کاهش دهیم، کدام بخش از هزینه اجرا کاهش نمی‌یابد؟',
    options: [
      {
        id: 'a',
        text: 'تعداد جابه‌جایی‌ها؛ حتی با یافتن سریع‌تر جایگاه درج، همچنان باید عناصر بزرگ‌تر یک‌به‌یک به سمت راست منتقل شوند',
      },
      { id: 'b', text: 'تعداد مقایسه‌ها؛ جست‌وجوی دودویی هیچ تأثیری روی تعداد مقایسه‌ها ندارد' },
      { id: 'c', text: 'فضای اضافی؛ جست‌وجوی دودویی به یک آرایه کمکی نیاز پیدا می‌کند' },
      { id: 'd', text: 'پایداری الگوریتم؛ نسخه دودویی دیگر پایدار نیست' },
    ],
    correctOptionId: 'a',
    explanation:
      'جست‌وجوی دودویی می‌تواند جایگاه صحیح درج را در O(log n) به‌جای O(n) مقایسه پیدا کند، اما پس از یافتن آن جایگاه، همچنان باید تمام عناصر بزرگ‌تر یک‌به‌یک جابه‌جا شوند. بنابراین Binary Insertion Sort مقایسه‌ها را بهبود می‌دهد، اما پیچیدگی زمانی کلی همچنان O(n²) باقی می‌ماند و پایداری الگوریتم نیز حفظ می‌شود.',
  },
  {
    id: 'is-hard-s2-q5',
    type: 'execution',
    prompt: 'کلید فعلی ۵ است و بخش مرتب‌شده فقط شامل [8] است. در مرحله بعد چه اتفاقی رخ می‌دهد؟',
    // فریم ۲ برای [8, 5, 2, 6, 1, 7]: گذر i=1، key=5 برداشته شده، پیش از هر مقایسه‌ای.
    visualization: { inputArray: [8, 5, 2, 6, 1, 7], frameIndex: 2 },
    options: [
      {
        id: 'a',
        text: '۸ یک خانه به سمت راست منتقل می‌شود، زیرا از کلید ۵ بزرگ‌تر است',
      },
      { id: 'b', text: '۵ بلافاصله در جایگاه فعلی خود باقی می‌ماند' },
      { id: 'c', text: '۸ و ۵ مستقیماً با یکدیگر جابه‌جا می‌شوند' },
      { id: 'd', text: 'الگوریتم به سراغ عنصر بعدی (۲) می‌رود' },
    ],
    correctOptionId: 'a',
    explanation:
      'چون ۸ از کلید ۵ بزرگ‌تر است، شرط حلقه while برقرار است و ۸ باید یک خانه به سمت راست جابه‌جا شود تا فضایی برای درج ۵ باز شود.',
  },
  {
    id: 'is-hard-s2-q6',
    type: 'execution',
    prompt: 'کلید فعلی ۱ است و بخش مرتب‌شده برابر [2, 5, 6, 8] است. در مرحله بعد چه اتفاقی رخ می‌دهد؟',
    // فریم ۱۶ برای [8, 5, 2, 6, 1, 7]: گذر i=4، key=1 برداشته شده، پیش از هر مقایسه‌ای.
    visualization: { inputArray: [8, 5, 2, 6, 1, 7], frameIndex: 16 },
    options: [
      {
        id: 'a',
        text: '۸ (آخرین عنصر بخش مرتب‌شده) یک خانه به سمت راست منتقل می‌شود؛ این آغاز یک زنجیره جابه‌جایی چهارتایی است، چون ۱ از هر چهار عنصر کوچک‌تر است',
      },
      { id: 'b', text: 'فقط ۲ (نزدیک‌ترین عنصر به key) جابه‌جا می‌شود' },
      { id: 'c', text: '۱ بلافاصله بدون هیچ جابه‌جایی درج می‌شود' },
      { id: 'd', text: 'بخش مرتب‌شده کاملاً معکوس می‌شود' },
    ],
    correctOptionId: 'a',
    explanation:
      'چون ۱ از تمام عناصر بخش مرتب‌شده [2, 5, 6, 8] کوچک‌تر است، اسکن از راست به چپ شروع می‌شود: ابتدا ۸ جابه‌جا می‌شود، سپس ۶، سپس ۵ و در نهایت ۲؛ هر چهار عنصر یک خانه به سمت راست منتقل می‌شوند تا ۱ در ابتدای آرایه درج شود.',
  },
  {
    id: 'is-hard-s2-q7',
    type: 'code',
    prompt: 'جای خالی را پر کنید — j باید با چه مقداری مقداردهی اولیه شود؟',
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function insertionSort(arr):', kind: 'plain' }] },
      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'for i = 1 to n - 1:', kind: 'plain' }] },
      { lineNumber: 3, indentLevel: 2, tokens: [{ text: 'key = arr[i]', kind: 'plain' }] },
      {
        lineNumber: 4,
        indentLevel: 2,
        tokens: [
          { text: 'j = ', kind: 'plain' },
          { text: '____', kind: 'blank' },
        ],
      },
      { lineNumber: 5, indentLevel: 2, tokens: [{ text: 'while j >= 0 and arr[j] > key:', kind: 'plain' }] },
      { lineNumber: 6, indentLevel: 3, tokens: [{ text: 'arr[j + 1] = arr[j]', kind: 'plain' }] },
      { lineNumber: 7, indentLevel: 3, tokens: [{ text: 'j = j - 1', kind: 'plain' }] },
      { lineNumber: 8, indentLevel: 2, tokens: [{ text: 'arr[j + 1] = key', kind: 'plain' }] },
      { lineNumber: 9, indentLevel: 1, tokens: [{ text: 'return arr', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: 'i - 1' },
      { id: 'b', text: 'i' },
      { id: 'c', text: '0' },
      { id: 'd', text: 'i + 1' },
    ],
    correctOptionId: 'a',
    explanation:
      'j باید به عنصر بلافاصله قبل از key اشاره کند تا مقایسه از همان‌جا شروع شود. چون key در اندیس i نگه‌داشته شده، مقدار صحیح اولیه j برابر i - 1 است.',
  },
  {
    id: 'is-hard-s2-q8',
    type: 'code',
    prompt: 'جای خالی را در محدوده حلقه بیرونی پر کنید:',
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function insertionSort(arr):', kind: 'plain' }] },
      {
        lineNumber: 2,
        indentLevel: 1,
        tokens: [
          { text: 'for i = 1 to ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ':', kind: 'plain' },
        ],
      },
      { lineNumber: 3, indentLevel: 2, tokens: [{ text: 'key = arr[i]', kind: 'plain' }] },
      { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'j = i - 1', kind: 'plain' }] },
      { lineNumber: 5, indentLevel: 2, tokens: [{ text: 'while j >= 0 and arr[j] > key:', kind: 'plain' }] },
      { lineNumber: 6, indentLevel: 3, tokens: [{ text: 'arr[j + 1] = arr[j]', kind: 'plain' }] },
      { lineNumber: 7, indentLevel: 3, tokens: [{ text: 'j = j - 1', kind: 'plain' }] },
      { lineNumber: 8, indentLevel: 2, tokens: [{ text: 'arr[j + 1] = key', kind: 'plain' }] },
      { lineNumber: 9, indentLevel: 1, tokens: [{ text: 'return arr', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: 'n - 1' },
      { id: 'b', text: 'n' },
      { id: 'c', text: 'n - 2' },
      { id: 'd', text: 'n + 1' },
    ],
    correctOptionId: 'a',
    explanation:
      'آرایه اندیس ۰ تا n - 1 دارد. چون حلقه از اندیس ۱ شروع می‌شود و باید تا آخرین اندیس معتبر آرایه پیش برود، کران بالای صحیح n - 1 است.',
  },
  {
    id: 'is-hard-s2-q9',
    type: 'code',
    prompt: 'جای خالی را پر کنید — پس از پایان حلقه جابه‌جایی، چه مقداری باید در arr[j + 1] نوشته شود؟',
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function insertionSort(arr):', kind: 'plain' }] },
      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'for i = 1 to n - 1:', kind: 'plain' }] },
      { lineNumber: 3, indentLevel: 2, tokens: [{ text: 'key = arr[i]', kind: 'plain' }] },
      { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'j = i - 1', kind: 'plain' }] },
      { lineNumber: 5, indentLevel: 2, tokens: [{ text: 'while j >= 0 and arr[j] > key:', kind: 'plain' }] },
      { lineNumber: 6, indentLevel: 3, tokens: [{ text: 'arr[j + 1] = arr[j]', kind: 'plain' }] },
      { lineNumber: 7, indentLevel: 3, tokens: [{ text: 'j = j - 1', kind: 'plain' }] },
      {
        lineNumber: 8,
        indentLevel: 2,
        tokens: [
          { text: 'arr[j + 1] = ', kind: 'plain' },
          { text: '____', kind: 'blank' },
        ],
      },
      { lineNumber: 9, indentLevel: 1, tokens: [{ text: 'return arr', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: 'key' },
      { id: 'b', text: 'arr[j]' },
      { id: 'c', text: 'arr[i]' },
      { id: 'd', text: '0' },
    ],
    correctOptionId: 'a',
    explanation:
      'حلقه while تمام عناصر بزرگ‌تر را جابه‌جا کرده و فضایی در arr[j + 1] باز کرده است. مقدار اصلی که باید در این جایگاه قرار گیرد key است — همان مقداری که در ابتدای این تکرار از arr[i] برداشته شده بود.',
  },
  {
    id: 'is-hard-s2-q10',
    type: 'conceptual',
    prompt: 'چرا مرتب‌سازی درجی برای داده‌های «آنلاین» (streaming)، یعنی زمانی که عناصر یکی‌یکی می‌رسند، مناسب است؟',
    options: [
      {
        id: 'a',
        text: 'زیرا هر عنصر جدید را می‌توان بلافاصله در جایگاه صحیح خود در بخش مرتب‌شده فعلی درج کرد، بدون نیاز به دسترسی به کل آرایه یا مرتب‌سازی مجدد آن',
      },
      {
        id: 'b',
        text: 'زیرا مرتب‌سازی درجی همیشه سریع‌تر از مرتب‌سازی سریع است',
      },
      {
        id: 'c',
        text: 'زیرا نیازی به مقایسه عناصر جدید با عناصر قبلی ندارد',
      },
      {
        id: 'd',
        text: 'زیرا هرگز بیش از یک عنصر را در حافظه نگه نمی‌دارد',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'ماهیت مرتب‌سازی درجی این است که یک بخش مرتب‌شده را به‌تدریج، یک عنصر در هر مرحله، گسترش می‌دهد. این ویژگی آن را برای سناریوهایی که داده‌ها به‌مرور زمان می‌رسند (مانند مرتب نگه‌داشتن یک لیست در حال به‌روزرسانی) طبیعی و کارآمد می‌کند؛ چون نیازی به شروع دوباره الگوریتم از صفر نیست.',
  },
];
