import type { TestQuestion } from '../../test.types';

export const BUBBLE_SORT_EASY_SET_1_FA: TestQuestion[] = [
  {
    id: 'bs-easy-s1-q1',
    type: 'conceptual',
    prompt: 'هدف اصلی الگوریتم مرتب‌سازی حبابی (Bubble Sort) چیست؟',

    options: [
      {
        id: '1',
        text: 'مرتب‌سازی آرایه با مقایسه و جابه‌جایی مکرر عناصر مجاور',
      },
      {
        id: '2',
        text: 'جستجوی یک عنصر مشخص در آرایه',
      },
      {
        id: '3',
        text: 'تقسیم آرایه به زیرآرایه‌های کوچک‌تر و ادغام آن‌ها',
      },
      {
        id: '4',
        text: 'پیدا کردن کوتاه‌ترین مسیر بین دو گره',
      },
    ],

    correctOptionId: '1',

    explanation:
      'Bubble Sort به‌طور مکرر هر جفت از عناصر مجاور را با یکدیگر مقایسه می‌کند و اگر ترتیب آن‌ها نادرست باشد، آن‌ها را جابه‌جا می‌کند. این روند به‌تدریج باعث مرتب شدن آرایه می‌شود.',
  },

  {
    id: 'bs-easy-s1-q3',
    type: 'conceptual',
    prompt: 'پس از انجام کامل یک مرحله (Pass) از Bubble Sort روی آرایه چه چیزی تضمین می‌شود؟',

    options: [
      {
        id: '1',
        text: 'بزرگ‌ترین عنصر باقی‌مانده در انتهای آرایه قرار می‌گیرد',
      },
      {
        id: '2',
        text: 'کل آرایه به‌طور کامل مرتب می‌شود',
      },
      {
        id: '3',
        text: 'کوچک‌ترین عنصر در ابتدای آرایه قرار می‌گیرد',
      },
      {
        id: '4',
        text: 'نیمی از آرایه مرتب می‌شود',
      },
    ],

    correctOptionId: '1',

    explanation:
      'در هر مرحله کامل، بزرگ‌ترین مقدار پردازش‌نشده به سمت انتهای آرایه حرکت می‌کند؛ بنابراین پس از یک مرحله، حداقل آخرین موقعیت آرایه مقدار نهایی خود را خواهد داشت.',
  },

  {
    id: 'bs-easy-s1-q2',
    type: 'execution',
    prompt: 'آرایه در حال پردازش است. در مرحله بعد چه اتفاقی می‌افتد؟',

    visualization: {
      inputArray: [5, 2, 8, 1],
      frameIndex: 2,
    },

    options: [
      {
        id: '1',
        text: 'عناصر جابه‌جا می‌شوند، زیرا ۵ از ۲ بزرگ‌تر است',
      },
      {
        id: '2',
        text: 'عناصر در جای خود باقی می‌مانند، زیرا ۵ از ۲ کوچک‌تر است',
      },
      {
        id: '3',
        text: 'اندیس‌های ۲ و ۳ با یکدیگر مقایسه می‌شوند و اندیس‌های ۰ و ۱ تغییری نمی‌کنند',
      },
      {
        id: '4',
        text: 'الگوریتم به پایان می‌رسد',
      },
    ],

    correctOptionId: '1',

    explanation:
      'از آنجا که arr[0]=5 از arr[1]=2 بزرگ‌تر است، Bubble Sort این دو عنصر را با یکدیگر جابه‌جا می‌کند.',
  },

  {
    id: 'bs-easy-s1-q4',
    type: 'execution',
    prompt: 'آرایه در حال پردازش است. در مرحله بعد چه اتفاقی می‌افتد؟',

    visualization: {
      inputArray: [5, 2, 8, 1],
      frameIndex: 15,
    },

    options: [
      {
        id: '1',
        text: 'عناصر در جای خود باقی می‌مانند، زیرا ۲ از ۵ کوچک‌تر است',
      },
      {
        id: '2',
        text: 'عناصر جابه‌جا می‌شوند، زیرا ۲ از ۵ کوچک‌تر است',
      },
      {
        id: '3',
        text: 'اندیس‌های ۲ و ۳ با یکدیگر مقایسه می‌شوند',
      },
      {
        id: '4',
        text: 'الگوریتم دوباره از اندیس ۰ شروع می‌شود',
      },
    ],

    correctOptionId: '1',

    explanation:
      'از آنجا که arr[0]=2 از arr[1]=5 کوچک‌تر است، ترتیب این دو عنصر درست است و نیازی به جابه‌جایی آن‌ها نیست.',
  },

  {
    id: 'bs-easy-s1-q5',
    type: 'code',
    prompt: 'جای خالی را در شبه‌کد Bubble Sort کامل کنید:',

    codeLines: [
      {
        lineNumber: 1,
        indentLevel: 0,
        tokens: [
          {
            text: 'function bubbleSort(arr):',
            kind: 'plain',
          },
        ],
      },

      {
        lineNumber: 2,
        indentLevel: 1,
        tokens: [
          {
            text: 'for i = 0 to n - 2:',
            kind: 'plain',
          },
        ],
      },

      {
        lineNumber: 3,
        indentLevel: 2,
        tokens: [
          {
            text: 'for j = 0 to n - i - 2:',
            kind: 'plain',
          },
        ],
      },

      {
        lineNumber: 4,
        indentLevel: 3,
        tokens: [
          {
            text: 'if arr[j] ',
            kind: 'plain',
          },
          {
            text: '____',
            kind: 'blank',
          },
          {
            text: ' arr[j + 1]:',
            kind: 'plain',
          },
        ],
      },

      {
        lineNumber: 5,
        indentLevel: 4,
        tokens: [
          {
            text: 'swap(arr[j], arr[j + 1])',
            kind: 'plain',
          },
        ],
      },

      {
        lineNumber: 6,
        indentLevel: 1,
        tokens: [
          {
            text: 'return arr',
            kind: 'plain',
          },
        ],
      },
    ],

    options: [
      {
        id: '1',
        text: '>',
      },
      {
        id: '2',
        text: '<',
      },
      {
        id: '3',
        text: '==',
      },
      {
        id: '4',
        text: '!=',
      },
    ],

    correctOptionId: '1',

    explanation:
      'برای مرتب‌سازی صعودی، هر زمان که عنصر فعلی از عنصر بعدی بزرگ‌تر باشد باید آن‌ها را جابه‌جا کنیم؛ بنابراین شرط درست arr[j] > arr[j + 1] است.',
  },
];

