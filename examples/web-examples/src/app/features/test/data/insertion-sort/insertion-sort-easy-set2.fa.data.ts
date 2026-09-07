import type { TestQuestion } from '../../test.types';

// مجموعه ۲ / آسان برای مرتب‌سازی درجی
// ۲ سؤال مفهومی، ۲ سؤال اجرایی و ۱ سؤال کدنویسی.
// مقادیر frameIndex با شبیه‌سازی دقیق insertionSortVisualization([4, 1, 3, 2])
// بررسی و تأیید شده‌اند (نه حدسی).

export const INSERTION_SORT_EASY_SET_2_FA: TestQuestion[] = [
  {
    id: 'is-easy-s2-q1',
    type: 'conceptual',
    prompt: 'چرا مرتب‌سازی درجی یک الگوریتم «درجا» (in-place) در نظر گرفته می‌شود؟',
    options: [
      {
        id: 'a',
        text: 'زیرا عناصر را فقط درون همان آرایه ورودی جابه‌جا می‌کند و تنها به چند متغیر کمکی مانند key و j نیاز دارد',
      },
      {
        id: 'b',
        text: 'زیرا همیشه سریع‌تر از الگوریتم‌هایی است که به آرایه کمکی نیاز دارند',
      },
      {
        id: 'c',
        text: 'زیرا فقط روی آرایه‌های کوچک‌تر از ۱۰ عنصر کار می‌کند',
      },
      {
        id: 'd',
        text: 'زیرا نتیجه نهایی را در یک آرایه جدید و جداگانه برمی‌گرداند',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'مرتب‌سازی درجی هرگز یک آرایه دوم به اندازه ورودی نمی‌سازد؛ فقط با جابه‌جا کردن عناصر در همان آرایه اصلی و نگه‌داشتن key و j، فضای اضافی موردنیازش تقریباً O(1) است.',
  },

  {
    id: 'is-easy-s2-q2',
    type: 'conceptual',
    prompt: 'اگر آرایه ورودی از قبل کاملاً مرتب باشد، مرتب‌سازی درجی روی هر عنصر چه کاری انجام می‌دهد؟',
    options: [
      {
        id: 'a',
        text: 'کلید را فقط با عنصر بلافاصله قبل از خود مقایسه می‌کند و چون بزرگ‌تر است، بدون هیچ جابه‌جایی در جای خود باقی می‌ماند',
      },
      {
        id: 'b',
        text: 'همچنان تمام عناصر بخش مرتب‌شده را یک‌به‌یک جابه‌جا می‌کند',
      },
      {
        id: 'c',
        text: 'آرایه را دوباره از انتها به ابتدا بازسازی می‌کند',
      },
      {
        id: 'd',
        text: 'الگوریتم را متوقف می‌کند، زیرا آرایه از قبل مرتب است',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'روی یک آرایه از قبل مرتب، هر کلید همیشه بزرگ‌تر یا مساوی عنصر قبلی خود است؛ بنابراین حلقه داخلی بلافاصله متوقف می‌شود و هیچ جابه‌جایی رخ نمی‌دهد. به همین دلیل بهترین حالت زمانی مرتب‌سازی درجی خطی (Θ(n)) است.',
  },

  {
    id: 'is-easy-s2-q3',
    type: 'execution',
    prompt: 'کلید فعلی ۱ است و بخش مرتب‌شده فقط شامل [4] است. در مرحله بعد چه اتفاقی رخ می‌دهد؟',
    // frameIndex با insertionSortVisualization([4, 1, 3, 2]) بررسی شد.
    // فریم ۲: i=1، key=1 برداشته شده، پیش از هر مقایسه‌ای.
    visualization: { inputArray: [4, 1, 3, 2], frameIndex: 2 },

    options: [
      {
        id: 'a',
        text: '۴ یک خانه به سمت راست منتقل می‌شود، زیرا از کلید ۱ بزرگ‌تر است',
      },
      {
        id: 'b',
        text: '۱ بلافاصله در جای فعلی خود باقی می‌ماند، زیرا از ۴ کوچک‌تر است',
      },
      {
        id: 'c',
        text: '۴ و ۱ مستقیماً با یکدیگر جابه‌جا می‌شوند',
      },
      {
        id: 'd',
        text: 'الگوریتم مستقیماً به سراغ عنصر بعدی (۳) می‌رود',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'چون ۴ از کلید ۱ بزرگ‌تر است، باید یک خانه به سمت راست جابه‌جا شود تا برای درج ۱ در ابتدای آرایه فضا باز شود.',
  },

  {
    id: 'is-easy-s2-q4',
    type: 'execution',
    prompt: 'کلید فعلی ۳ است و بخش مرتب‌شده برابر [1, 4] است. در مرحله بعد چه اتفاقی رخ می‌دهد؟',
    // frameIndex با insertionSortVisualization([4, 1, 3, 2]) بررسی شد.
    // فریم ۶: i=2، key=3 برداشته شده، پیش از هر مقایسه‌ای.
    visualization: { inputArray: [4, 1, 3, 2], frameIndex: 6 },

    options: [
      {
        id: 'a',
        text: '۴ یک خانه به سمت راست منتقل می‌شود، زیرا از کلید ۳ بزرگ‌تر است؛ سپس ۱ بررسی می‌شود که از ۳ بزرگ‌تر نیست',
      },
      {
        id: 'b',
        text: '۱ و ۴ هر دو بلافاصله به سمت راست منتقل می‌شوند',
      },
      {
        id: 'c',
        text: '۳ بدون هیچ مقایسه‌ای در انتهای آرایه قرار می‌گیرد',
      },
      {
        id: 'd',
        text: 'بخش مرتب‌شده به طور کامل حذف می‌شود',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'مرتب‌سازی درجی بخش مرتب‌شده را از راست به چپ بررسی می‌کند. ۴ از ۳ بزرگ‌تر است و جابه‌جا می‌شود، اما ۱ از ۳ بزرگ‌تر نیست؛ بنابراین اسکن همان‌جا متوقف شده و ۳ بین ۱ و ۴ درج می‌شود.',
  },

  {
    id: 'is-easy-s2-q5',
    type: 'code',
    prompt: 'جای خالی را در شبه‌کد مرتب‌سازی درجی پر کنید — j باید با چه مقداری مقداردهی اولیه شود؟',

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
        tokens: [
          { text: 'j = i - ', kind: 'plain' },
          { text: '____', kind: 'blank' },
        ],
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
        tokens: [{ text: 'arr[j + 1] = key', kind: 'plain' }],
      },
      {
        lineNumber: 9,
        indentLevel: 1,
        tokens: [{ text: 'return arr', kind: 'plain' }],
      },
    ],

    options: [
      { id: 'a', text: '1' },
      { id: 'b', text: '0' },
      { id: 'c', text: '2' },
      { id: 'd', text: 'i' },
    ],

    correctOptionId: 'a',
    explanation:
      'j باید به اندیس عنصر بلافاصله قبل از key اشاره کند تا مقایسه از آنجا شروع شود؛ چون key در اندیس i قرار دارد، مقدار اولیه صحیح j برابر i - 1 است.',
  },
];
