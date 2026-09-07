import type { TestQuestion } from '../../test.types';

// مجموعه ۳ / سطح سخت برای الگوریتم Insertion Sort.
// ۱۰ سؤال شامل سؤالات مفهومی، اجرایی و کدنویسی.
// این مجموعه نسبت به مجموعه‌های ۱ و ۲ دشوارتر است.
// سؤالات اجرایی باید از مقادیر معتبر frameIndex مربوط به
// insertionSortVisualization([4, 2, 4, 1]) استفاده کنند.

export const INSERTION_SORT_HARD_SET_3: TestQuestion[] = [
  {
    id: 'is-hard-s3-q1',
    type: 'conceptual',
    prompt: 'چرا الگوریتم Insertion Sort می‌تواند روی داده‌هایی که تقریباً مرتب هستند، عملکرد بسیار بهتری از Selection Sort داشته باشد؟',
    options: [
      {
        id: 'a',
        text: 'حلقه داخلی آن می‌تواند به محض اینکه عنصر جاری بزرگ‌تر یا مساوی عنصر قبلی در بخش مرتب‌شده باشد، متوقف شود',
      },
      {
        id: 'b',
        text: 'این الگوریتم در هر ورودی همیشه تعداد مقایسه‌های کمتری نسبت به Selection Sort انجام می‌دهد',
      },
      {
        id: 'c',
        text: 'برای جلوگیری از مقایسه‌ها از یک آرایه دوم استفاده می‌کند',
      },
      {
        id: 'd',
        text: 'هر زمان ورودی تقریباً مرتب باشد، پیچیدگی زمانی آن به O(n log n) تغییر می‌کند',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Insertion Sort از نظم موجود در داده‌ها استفاده می‌کند. هنگامی که عنصر جاری در موقعیت نسبی صحیح خود قرار داشته باشد، حلقه جابه‌جایی داخلی بلافاصله متوقف می‌شود. بنابراین، برای ورودی‌های تقریباً مرتب، مقدار عملیات موردنیاز می‌تواند به‌طور قابل‌توجهی کاهش یابد.',
  },

  {
    id: 'is-hard-s3-q2',
    type: 'conceptual',
    prompt: 'پس از پردازش اندیس i، چه ناوردای کلیدی توسط Insertion Sort حفظ می‌شود؟',
    options: [
      {
        id: 'a',
        text: 'زیرآرایه از اندیس 0 تا i مرتب است و دقیقاً شامل همان عناصری است که در ابتدا در این محدوده قرار داشتند',
      },
      {
        id: 'b',
        text: 'کل آرایه به‌جز آخرین عنصر مرتب شده است',
      },
      {
        id: 'c',
        text: 'عناصر از اندیس i به بعد از قبل مرتب هستند',
      },
      {
        id: 'd',
        text: 'کوچک‌ترین عنصر کل آرایه همیشه در اندیس i قرار دارد',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Insertion Sort یک پیشوند مرتب‌شده را به‌تدریج گسترش می‌دهد. پس از پردازش موقعیت i، پیشوند arr[0..i] مرتب است، در حالی که بخش باقی‌مانده آرایه لزوماً هنوز پردازش نشده است.',
  },

  {
    id: 'is-hard-s3-q3',
    type: 'conceptual',
    prompt: 'چرا در پیاده‌سازی استاندارد Insertion Sort از مقایسه arr[j] > key به‌جای arr[j] >= key استفاده می‌شود؟',
    options: [
      {
        id: 'a',
        text: 'استفاده از > ترتیب نسبی عناصر مساوی را حفظ می‌کند و باعث پایدار بودن الگوریتم می‌شود',
      },
      {
        id: 'b',
        text: 'استفاده از >= باعث می‌شود الگوریتم به‌صورت نزولی مرتب کند',
      },
      {
        id: 'c',
        text: 'استفاده از > باعث می‌شود الگوریتم از O(1) حافظه استفاده کند',
      },
      {
        id: 'd',
        text: 'هر دو مقایسه دقیقاً رفتار یکسانی از نظر پایداری ایجاد می‌کنند',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'با استفاده از arr[j] > key، عناصر مساوی از روی key عبور داده نمی‌شوند. در نتیجه ترتیب نسبی آن‌ها حفظ می‌شود و همین موضوع باعث می‌شود پیاده‌سازی استاندارد Insertion Sort پایدار باشد.',
  },

  {
    id: 'is-hard-s3-q4',
    type: 'conceptual',
    prompt: 'برای آرایه‌ای با n عنصر، حداکثر چند جابه‌جایی (shift) توسط Insertion Sort انجام می‌شود؟',
    options: [
      {
        id: 'a',
        text: 'n(n - 1) / 2، زمانی که آرایه به‌صورت کاملاً نزولی مرتب شده باشد',
      },
      {
        id: 'b',
        text: 'n - 1، زیرا هر عنصر فقط یک‌بار می‌تواند جابه‌جا شود',
      },
      {
        id: 'c',
        text: 'n، زیرا برای هر عنصر یک جابه‌جایی انجام می‌شود',
      },
      {
        id: 'd',
        text: 'n log n، زیرا هر درج در یک پیشوند مرتب‌شده جست‌وجو می‌شود',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'در حالت بدترین وضعیت، هر key جدید باید از روی تمام عناصر قبلاً مرتب‌شده عبور کند. بنابراین تعداد کل جابه‌جایی‌ها برابر است با 1 + 2 + ... + (n - 1) = n(n - 1) / 2.',
  },

  {
    id: 'is-hard-s3-q5',
    type: 'execution',
    prompt: 'key جاری در حال درج شدن در پیشوند مرتب‌شده است. در مرحله بعد چه اتفاقی می‌افتد؟',

    // TODO: مقدار frame مربوط به ضبط‌کننده پس از تأیید جایگزین شود:
    // inputArray [4, 2, 4, 1]
    // key = 2 و مقایسه 4 با 2 پیش از اولین جابه‌جایی.
    visualization: { inputArray: [4, 2, 4, 1], frameIndex: 0 },

    options: [
      {
        id: 'a',
        text: 'مقدار 4 یک موقعیت به سمت راست جابه‌جا می‌شود، زیرا از key یعنی 2 بزرگ‌تر است',
      },
      {
        id: 'b',
        text: 'مقادیر 4 و 2 بلافاصله با یکدیگر تعویض می‌شوند',
      },
      {
        id: 'c',
        text: 'key یعنی 2 حذف می‌شود، زیرا از پیشوند مرتب‌شده کوچک‌تر است',
      },
      {
        id: 'd',
        text: 'الگوریتم مستقیماً به تکرار بعدی حلقه بیرونی می‌رود',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Insertion Sort، key را با هر عنصر بزرگ‌تر تعویض نمی‌کند. ابتدا عناصر بزرگ‌تر را یک موقعیت به سمت راست منتقل می‌کند و سپس key ذخیره‌شده را در فضای ایجادشده قرار می‌دهد.',
  },

  {
    id: 'is-hard-s3-q6',
    type: 'execution',
    prompt: 'key در حال مقایسه با یکی از عناصر پیشوند مرتب‌شده است. اگر آن عنصر با key برابر باشد، چه اتفاقی می‌افتد؟',

    // TODO: مقدار frame مربوط به ضبط‌کننده پس از تأیید جایگزین شود:
    // inputArray [4, 2, 4, 1]
    // key = 4 و مقایسه با 4 قبلی.
    visualization: { inputArray: [4, 2, 4, 1], frameIndex: 0 },

    options: [
      {
        id: 'a',
        text: 'عنصر مساوی جابه‌جا نمی‌شود و key بعد از آن قرار می‌گیرد',
      },
      {
        id: 'b',
        text: 'عنصر مساوی به سمت راست جابه‌جا می‌شود، زیرا عناصر مساوی باید به سمت عقب حرکت کنند',
      },
      {
        id: 'c',
        text: 'دو عنصر مساوی با یکدیگر تعویض می‌شوند',
      },
      {
        id: 'd',
        text: 'عملیات درج جاری لغو می‌شود',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'شرط استاندارد arr[j] > key است. برابری این شرط را برقرار نمی‌کند، بنابراین عنصر مساوی در جای خود باقی می‌ماند و key بعد از آن قرار می‌گیرد. این موضوع یکی از دلایل پایدار بودن Insertion Sort است.',
  },

  {
    id: 'is-hard-s3-q7',
    type: 'execution',
    prompt: 'key از چندین عنصر موجود در پیشوند مرتب‌شده کوچک‌تر است. الگوریتم پیش از قرار دادن key چه کاری انجام می‌دهد؟',

    // TODO: مقدار frame مربوط به ضبط‌کننده پس از تأیید جایگزین شود:
    // inputArray [4, 2, 4, 1]
    // key = 1 و چندین عنصر به سمت راست جابه‌جا می‌شوند.
    visualization: { inputArray: [4, 2, 4, 1], frameIndex: 0 },

    options: [
      {
        id: 'a',
        text: 'هر عنصر بزرگ‌تر را یک موقعیت به سمت راست جابه‌جا می‌کند تا به موقعیت صحیح درج برسد',
      },
      {
        id: 'b',
        text: 'key را مستقیماً با کوچک‌ترین عنصر پیشوند تعویض می‌کند',
      },
      {
        id: 'c',
        text: 'key را مستقیماً به اندیس 0 منتقل می‌کند، بدون اینکه عناصر دیگر را تغییر دهد',
      },
      {
        id: 'd',
        text: 'یک دور جدید مرتب‌سازی را از ابتدای آرایه آغاز می‌کند',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'Insertion Sort ترتیب پیشوند مرتب‌شده را حفظ می‌کند و با ایجاد یک فضای خالی، امکان قرارگیری key را فراهم می‌کند. هر عنصری که از key بزرگ‌تر باشد، یک موقعیت به سمت راست جابه‌جا می‌شود.',
  },

  {
    id: 'is-hard-s3-q8',
    type: 'code',
    prompt: 'جای خالی را پر کنید — چه شرطی تعیین می‌کند که یک عنصر از پیشوند مرتب‌شده باید جابه‌جا شود؟',

    codeLines: [
      {
        lineNumber: 1,
        indentLevel: 0,
        tokens: [{ text: 'function insertionSort(arr):', kind: 'plain' }],
      },
      {
        lineNumber: 2,
        indentLevel: 1,
        tokens: [{ text: 'for i = 1 to n - 1:', kind: 'plain' }],
      },
      {
        lineNumber: 3,
        indentLevel: 2,
        tokens: [{ text: 'key = arr[i]', kind: 'plain' }],
      },
      {
        lineNumber: 4,
        indentLevel: 2,
        tokens: [{ text: 'j = i - 1', kind: 'plain' }],
      },
      {
        lineNumber: 5,
        indentLevel: 2,
        tokens: [
          { text: 'while j >= 0 and arr[j] ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ' key:', kind: 'plain' },
        ],
      },
      {
        lineNumber: 6,
        indentLevel: 3,
        tokens: [{ text: 'arr[j + 1] = arr[j]', kind: 'plain' }],
      },
      {
        lineNumber: 7,
        indentLevel: 3,
        tokens: [{ text: 'j = j - 1', kind: 'plain' }],
      },
      {
        lineNumber: 8,
        indentLevel: 2,
        tokens: [{ text: 'arr[j + 1] = key', kind: 'plain' }],
      },
      {
        lineNumber: 9,
        indentLevel: 1,
        tokens: [{ text: 'return arr', kind: 'plain' }],
      },
    ],

    options: [
      { id: 'a', text: '>' },
      { id: 'b', text: '<' },
      { id: 'c', text: '>=' },
      { id: 'd', text: '==' },
    ],

    correctOptionId: 'a',
    explanation:
      'یک عنصر تنها زمانی جابه‌جا می‌شود که به‌طور اکید از key بزرگ‌تر باشد. استفاده از > همچنین از عبور عناصر مساوی از key جلوگیری می‌کند و باعث حفظ پایداری الگوریتم می‌شود.',
  },

  {
    id: 'is-hard-s3-q9',
    type: 'code',
    prompt: 'جای خالی را پر کنید — پس از پایان حلقه جابه‌جایی، key باید در کجا قرار گیرد؟',

    codeLines: [
      {
        lineNumber: 1,
        indentLevel: 0,
        tokens: [{ text: 'function insertionSort(arr):', kind: 'plain' }],
      },
      {
        lineNumber: 2,
        indentLevel: 1,
        tokens: [{ text: 'for i = 1 to n - 1:', kind: 'plain' }],
      },
      {
        lineNumber: 3,
        indentLevel: 2,
        tokens: [{ text: 'key = arr[i]', kind: 'plain' }],
      },
      {
        lineNumber: 4,
        indentLevel: 2,
        tokens: [{ text: 'j = i - 1', kind: 'plain' }],
      },
      {
        lineNumber: 5,
        indentLevel: 2,
        tokens: [{ text: 'while j >= 0 and arr[j] > key:', kind: 'plain' }],
      },
      {
        lineNumber: 6,
        indentLevel: 3,
        tokens: [{ text: 'arr[j + 1] = arr[j]', kind: 'plain' }],
      },
      {
        lineNumber: 7,
        indentLevel: 3,
        tokens: [{ text: 'j = j - 1', kind: 'plain' }],
      },
      {
        lineNumber: 8,
        indentLevel: 2,
        tokens: [
          { text: 'arr[', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: '] = key', kind: 'plain' },
        ],
      },
      {
        lineNumber: 9,
        indentLevel: 1,
        tokens: [{ text: 'return arr', kind: 'plain' }],
      },
    ],

    options: [
      { id: 'a', text: 'j + 1' },
      { id: 'b', text: 'j' },
      { id: 'c', text: 'i' },
      { id: 'd', text: 'i + 1' },
    ],

    correctOptionId: 'a',
    explanation:
      'حلقه پس از هر جابه‌جایی مقدار j را یک واحد کاهش می‌دهد. بنابراین پس از توقف حلقه، j به عنصری اشاره می‌کند که بلافاصله قبل از موقعیت صحیح درج قرار دارد؛ در نتیجه key باید در j + 1 قرار گیرد.',
  },

  {
    id: 'is-hard-s3-q10',
    type: 'conceptual',
    prompt: 'کدام گزینه ویژگی‌های پیاده‌سازی استاندارد Insertion Sort را به‌درستی بیان می‌کند؟',

    options: [
      {
        id: 'a',
        text: 'پایدار، درجا، دارای فضای کمکی O(1)، دارای بهترین حالت O(n) و دارای حالت متوسط و بدترین حالت O(n²)',
      },
      {
        id: 'b',
        text: 'ناپایدار، درجا، دارای فضای کمکی O(n) و دارای پیچیدگی O(n log n) در تمام حالت‌ها',
      },
      {
        id: 'c',
        text: 'پایدار، نیازمند فضای کمکی O(n) و همیشه دارای پیچیدگی O(n²)',
      },
      {
        id: 'd',
        text: 'ناپایدار، بازگشتی و دارای پیچیدگی O(log n) در بهترین حالت',
      },
    ],

    correctOptionId: 'a',
    explanation:
      'Insertion Sort استاندارد پایدار است، زیرا عناصر مساوی را از روی یکدیگر عبور نمی‌دهد. همچنین به‌صورت درجا مرتب‌سازی می‌کند و از فضای کمکی ثابت استفاده می‌کند. بهترین حالت آن، زمانی که ورودی از قبل مرتب باشد، O(n) است و حالت متوسط و بدترین حالت آن O(n²) است.',
  },
];
