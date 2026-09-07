import type { TestQuestion } from '../../test.types';

// مجموعه ۳ / سخت برای مرتب‌سازی انتخابی. از آرایه [4, 2, 4, 1]
// با فریم‌های متفاوت نسبت به مجموعه‌های ۱ و ۲ استفاده می‌کند.
export const SELECTION_SORT_HARD_SET_3_FA: TestQuestion[] = [
  {
    id: 'ss-hard-s3-q1',
    type: 'conceptual',
    prompt:
      'مرتب‌سازی انتخابی هنگام مرتب‌سازی آرایه‌ی مشخص چهار عنصری [4, 2, 4, 1] در مجموع چند مقایسه انجام می‌دهد؟',
    options: [
      {
        id: 'a',
        text: '۶ — n(n - 1) / 2 = ۴ × ۳ / ۲، که مستقل از مقادیر یا ترتیب آن‌ها است',
      },
      { id: 'b', text: '۴، یک مقایسه برای هر عنصر' },
      { id: 'c', text: '۳، یک مقایسه برای هر گذر' },
      {
        id: 'd',
        text: '۱۲، زیرا باید مقدار تکراری را دوباره بررسی کند',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'تعداد مقایسه‌های مرتب‌سازی انتخابی فقط به تعداد عناصر n وابسته است و به مقادیر واقعی آن‌ها وابسته نیست. بنابراین برای n = ۴، همیشه ۴ × ۳ / ۲ = ۶ مقایسه انجام می‌شود؛ چه مقادیر تکراری باشند و چه نباشند.',
  },

  {
    id: 'ss-hard-s3-q2',
    type: 'conceptual',
    prompt:
      'اگر آرایه‌ی ورودی از قبل به صورت صعودی مرتب شده باشد، آیا مرتب‌سازی انتخابی می‌تواند این موضوع را تشخیص دهد و بخشی از کار را انجام ندهد؟',
    options: [
      {
        id: 'a',
        text: 'خیر — سازوکاری برای تشخیص زودهنگام مرتب بودن آرایه ندارد، بنابراین همچنان تمام n(n - 1) / 2 مقایسه را انجام می‌دهد',
      },
      {
        id: 'b',
        text: 'بله، درست مانند مرتب‌سازی حبابی بهینه‌شده که با استفاده از یک پرچم تغییر می‌تواند زودتر متوقف شود',
      },
      {
        id: 'c',
        text: 'بله، اما فقط برای آرایه‌هایی با کمتر از ۵ عنصر',
      },
      {
        id: 'd',
        text: 'خیر، و در صورت مرتب بودن ورودی خطا نیز ایجاد می‌کند',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'در شبه‌کد هیچ بررسی‌ای برای تشخیص مرتب بودن آرایه وجود ندارد. هر گذر بدون توجه به وضعیت داده، تمام بخش باقی‌مانده را بررسی می‌کند؛ بنابراین آرایه‌ی مرتب نیز دقیقاً به اندازه‌ی هر ورودی دیگری مقایسه انجام می‌دهد.',
  },

  {
    id: 'ss-hard-s3-q3',
    type: 'conceptual',
    prompt:
      'کدام الگوریتم مرتب‌سازی رایج دیگری نیز مانند این مرتب‌سازی انتخابی، پایداری آن تضمین نشده است؟',
    options: [
      {
        id: 'a',
        text: 'مرتب‌سازی سریع، در شکل معمول خود با پارتیشن‌بندی درجا',
      },
      { id: 'b', text: 'مرتب‌سازی ادغامی' },
      { id: 'c', text: 'مرتب‌سازی درجی' },
      { id: 'd', text: 'مرتب‌سازی حبابی این سامانه' },
    ],
    correctOptionId: 'a',
    explanation:
      'مرتب‌سازی ادغامی، مرتب‌سازی درجی و مرتب‌سازی حبابی این سامانه به‌صورت ذاتی پایدار هستند. مرتب‌سازی سریع درجا نیز مانند مرتب‌سازی انتخابی با همین مشکل مواجه است؛ زیرا مرحله‌ی پارتیشن‌بندی آن می‌تواند باعث جابه‌جایی عناصر مساوی و تغییر ترتیب نسبی آن‌ها شود.',
  },

  {
    id: 'ss-hard-s3-q4',
    type: 'conceptual',
    prompt:
      'چرا می‌توان مرتب‌سازی انتخابی را یک الگوریتم «حریصانه» در نظر گرفت؟',
    options: [
      {
        id: 'a',
        text: 'در هر گذر، بهترین انتخاب محلی را انجام می‌دهد؛ یعنی کوچک‌ترین عنصر باقی‌مانده را در جای خود قرار می‌دهد و تصمیم‌های قبلی را دوباره بررسی نمی‌کند',
      },
      {
        id: 'b',
        text: 'زیرا نسبت به سایر الگوریتم‌های مرتب‌سازی حافظه‌ی بیشتری مصرف می‌کند',
      },
      { id: 'c', text: 'زیرا به صورت بازگشتی پیاده‌سازی شده است' },
      {
        id: 'd',
        text: 'زیرا آرایه را از انتها به سمت ابتدا پردازش می‌کند',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'یک الگوریتم حریصانه در هر مرحله بهترین انتخاب موجود را انجام می‌دهد و پس از آن به تصمیم خود بازنمی‌گردد. مرتب‌سازی انتخابی نیز دقیقاً همین کار را انجام می‌دهد: پس از آن‌که کوچک‌ترین عنصر یک گذر در جای خود قرار گرفت، این تصمیم تا پایان اجرای الگوریتم نهایی است.',
  },

  {
    id: 'ss-hard-s3-q5',
    type: 'execution',
    prompt: 'آرایه در حال پردازش است. در مرحله‌ی بعد چه اتفاقی می‌افتد؟',

    // فریم ۲ برای [4, 2, 4, 1]: گذر i=0،
    // مقایسه‌ی اندیس ۱ (مقدار ۲) با کمینه‌ی فعلی در اندیس ۰ (مقدار ۴).
    visualization: { inputArray: [4, 2, 4, 1], frameIndex: 2 },

    options: [
      {
        id: 'a',
        text: 'اندیس ۱ به کمینه‌ی کاندیدای جدید تبدیل می‌شود، زیرا ۲ از ۴ کوچک‌تر است',
      },
      {
        id: 'b',
        text: 'اندیس‌های ۰ و ۱ بلافاصله با یکدیگر جابه‌جا می‌شوند',
      },
      { id: 'c', text: 'اندیس ۱ نادیده گرفته می‌شود' },
      { id: 'd', text: 'گذر در همین‌جا به پایان می‌رسد' },
    ],
    correctOptionId: 'a',
    explanation:
      'arr[1]=2 از کمینه‌ی فعلی arr[0]=4 کوچک‌تر است؛ بنابراین اندیس ۱ به عنوان کمینه‌ی کاندیدای جدید ثبت می‌شود.',
  },

  {
    id: 'ss-hard-s3-q6',
    type: 'execution',
    prompt: 'گذر سوم به‌تازگی اسکن خود را به پایان رسانده است. اکنون چه اتفاقی می‌افتد؟',

    // فریم ۲۰ برای [4, 2, 4, 1]: گذر i=2 با minIndex برابر i
    // (اندیس ۲، یعنی دومین مقدار ۴) به پایان می‌رسد؛ بنابراین جابه‌جایی انجام نمی‌شود.
    visualization: { inputArray: [4, 2, 4, 1], frameIndex: 20 },

    options: [
      {
        id: 'a',
        text: 'هیچ جابه‌جایی‌ای انجام نمی‌شود؛ زیرا اندیس ۲ از قبل کوچک‌ترین مقدار باقی‌مانده را در خود دارد',
      },
      { id: 'b', text: 'اندیس ۲ با اندیس ۳ جابه‌جا می‌شود' },
      { id: 'c', text: 'در آخرین لحظه یک کمینه‌ی جدید پیدا می‌شود' },
      { id: 'd', text: 'گذر دوباره از ابتدا آغاز می‌شود' },
    ],
    correctOptionId: 'a',
    explanation:
      'اندیس ۳ نیز مقدار مساوی ۴ را در خود دارد و مقادیر مساوی هرگز شرط مقایسه‌ی strict < را برقرار نمی‌کنند. بنابراین minIndex در تمام این گذر روی اندیس ۲ باقی می‌ماند؛ در نتیجه جابه‌جایی انجام نمی‌شود و اندیس ۲ به عنوان بخش مرتب‌شده تثبیت می‌شود.',
  },

  {
    id: 'ss-hard-s3-q7',
    type: 'code',
    prompt: 'جای خالی را در مقایسه برای پیدا کردن کمینه پر کنید:',

    codeLines: [
      {
        lineNumber: 1,
        indentLevel: 0,
        tokens: [
          { text: 'function selectionSort(arr):', kind: 'plain' },
        ],
      },
      {
        lineNumber: 2,
        indentLevel: 1,
        tokens: [{ text: 'for i = 0 to n - 2:', kind: 'plain' }],
      },
      {
        lineNumber: 3,
        indentLevel: 2,
        tokens: [{ text: 'minIndex = i', kind: 'plain' }],
      },
      {
        lineNumber: 4,
        indentLevel: 2,
        tokens: [
          { text: 'for j = i + 1 to n - 1:', kind: 'plain' },
        ],
      },
      {
        lineNumber: 5,
        indentLevel: 3,
        tokens: [
          { text: 'if arr[j] ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ' arr[minIndex]: minIndex = j', kind: 'plain' },
        ],
      },
      {
        lineNumber: 6,
        indentLevel: 2,
        tokens: [
          { text: 'swap(arr[i], arr[minIndex])', kind: 'plain' },
        ],
      },
      {
        lineNumber: 7,
        indentLevel: 1,
        tokens: [{ text: 'return arr', kind: 'plain' }],
      },
    ],

    options: [
      { id: 'a', text: '<' },
      { id: 'b', text: '>' },
      { id: 'c', text: '<=' },
      { id: 'd', text: '!=' },
    ],

    correctOptionId: 'a',

    explanation:
      'یک کاندید فقط زمانی جایگزین کمینه‌ی فعلی می‌شود که مقدار آن واقعاً کوچک‌تر باشد؛ یعنی arr[j] < arr[minIndex]. همین موضوع باعث می‌شود در سؤال ۶، وقتی تنها مقدار باقی‌مانده برابر با کمینه است، جابه‌جایی انجام نشود.',
  },

  {
    id: 'ss-hard-s3-q8',
    type: 'code',
    prompt: 'جای خالی را پر کنید — مقدار اولیه‌ی minIndex باید چه باشد؟',

    codeLines: [
      {
        lineNumber: 1,
        indentLevel: 0,
        tokens: [
          { text: 'function selectionSort(arr):', kind: 'plain' },
        ],
      },
      {
        lineNumber: 2,
        indentLevel: 1,
        tokens: [
          { text: 'for i = 0 to n - 2:', kind: 'plain' },
        ],
      },
      {
        lineNumber: 3,
        indentLevel: 2,
        tokens: [
          { text: 'minIndex = ', kind: 'plain' },
          { text: '____', kind: 'blank' },
        ],
      },
      {
        lineNumber: 4,
        indentLevel: 2,
        tokens: [
          { text: 'for j = i + 1 to n - 1:', kind: 'plain' },
        ],
      },
      {
        lineNumber: 5,
        indentLevel: 3,
        tokens: [
          {
            text: 'if arr[j] < arr[minIndex]: minIndex = j',
            kind: 'plain',
          },
        ],
      },
      {
        lineNumber: 6,
        indentLevel: 2,
        tokens: [
          { text: 'swap(arr[i], arr[minIndex])', kind: 'plain' },
        ],
      },
      {
        lineNumber: 7,
        indentLevel: 1,
        tokens: [{ text: 'return arr', kind: 'plain' }],
      },
    ],

    options: [
      { id: 'a', text: 'i' },
      { id: 'b', text: '0' },
      { id: 'c', text: 'i + 1' },
      { id: 'd', text: 'n - 1' },
    ],

    correctOptionId: 'a',

    explanation:
      'در ابتدای هر گذر فرض می‌شود عنصر ابتدای بخش بررسی‌نشده، یعنی اندیس i، کمینه است؛ بنابراین minIndex از ابتدا برابر با i قرار می‌گیرد.',
  },

  {
    id: 'ss-hard-s3-q9',
    type: 'code',
    prompt: 'جای خالی را پر کنید — حلقه‌ی داخلی باید اسکن خود را از کجا آغاز کند؟',

    codeLines: [
      {
        lineNumber: 1,
        indentLevel: 0,
        tokens: [
          { text: 'function selectionSort(arr):', kind: 'plain' },
        ],
      },
      {
        lineNumber: 2,
        indentLevel: 1,
        tokens: [
          { text: 'for i = 0 to n - 2:', kind: 'plain' },
        ],
      },
      {
        lineNumber: 3,
        indentLevel: 2,
        tokens: [
          { text: 'minIndex = i', kind: 'plain' },
        ],
      },
      {
        lineNumber: 4,
        indentLevel: 2,
        tokens: [
          { text: 'for j = ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ' to n - 1:', kind: 'plain' },
        ],
      },
      {
        lineNumber: 5,
        indentLevel: 3,
        tokens: [
          {
            text: 'if arr[j] < arr[minIndex]: minIndex = j',
            kind: 'plain',
          },
        ],
      },
      {
        lineNumber: 6,
        indentLevel: 2,
        tokens: [
          { text: 'swap(arr[i], arr[minIndex])', kind: 'plain' },
        ],
      },
      {
        lineNumber: 7,
        indentLevel: 1,
        tokens: [{ text: 'return arr', kind: 'plain' }],
      },
    ],

    options: [
      { id: 'a', text: 'i + 1' },
      { id: 'b', text: 'i' },
      { id: 'c', text: '0' },
      { id: 'd', text: 'n - 1' },
    ],

    correctOptionId: 'a',

    explanation:
      'اندیس i از قبل به عنوان کمینه در نظر گرفته شده است (minIndex = i)، بنابراین اسکن فقط باید عناصر بعد از آن را بررسی کند و از i + 1 آغاز شود.',
  },

  {
    id: 'ss-hard-s3-q10',
    type: 'conceptual',
    prompt:
      'پیچیدگی زمانی کلی مرتب‌سازی انتخابی در حالت بهترین، متوسط و بدترین حالت چیست؟',
    options: [
      {
        id: 'a',
        text: 'در همه‌ی حالت‌ها O(n²) است — تعداد مقایسه‌ها به نحوه‌ی چیدمان عناصر ورودی وابسته نیست',
      },
      {
        id: 'b',
        text: 'در بهترین حالت O(n)، و در حالت متوسط و بدترین حالت O(n²) است',
      },
      {
        id: 'c',
        text: 'در همه‌ی حالت‌ها O(n log n) است',
      },
      { id: 'd', text: 'در همه‌ی حالت‌ها O(n) است' },
    ],
    correctOptionId: 'a',
    explanation:
      'از آنجا که هر گذر بدون توجه به داده‌ها تمام بخش باقی‌مانده را بررسی می‌کند، مرتب‌سازی انتخابی هیچ حالت مطلوبی از نظر تعداد مقایسه‌ها ندارد؛ بنابراین پیچیدگی زمانی در بهترین، متوسط و بدترین حالت برابر با O(n²) است.',
  },
];