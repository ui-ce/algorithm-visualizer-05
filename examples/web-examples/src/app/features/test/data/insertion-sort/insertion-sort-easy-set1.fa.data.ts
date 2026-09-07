import type { TestQuestion } from '../../test.types';

// مجموعه ۱ / آسان برای مرتب‌سازی درجی
// ۲ سؤال مفهومی، ۲ سؤال اجرایی و ۱ سؤال کدنویسی.
// مقادیر frameIndex باید پیش از استفاده با
// insertionSortVisualization([5, 2, 8, 1]) بررسی شوند.

export const INSERTION_SORT_EASY_SET_1_FA: TestQuestion[] = [
  {
    id: 'is-easy-s1-q1',
    type: 'conceptual',
    prompt: 'ایده اصلی مرتب‌سازی درجی چیست؟',
    options: [
      {
        id: 'a',
        text: 'با برداشتن هر عنصر جدید و قرار دادن آن در جایگاه صحیح، یک بخش مرتب‌شده ایجاد می‌کند',
      },
      {
        id: 'b',
        text: 'به‌طور مکرر کوچک‌ترین مقدار را در کل بخش نامرتب پیدا کرده و آن را به ابتدای آرایه منتقل می‌کند',
      },
      {
        id: 'c',
        text: 'آرایه را به نیمه‌های کوچک‌تر تقسیم کرده و نیمه‌های مرتب‌شده را با یکدیگر ادغام می‌کند',
      },
      {
        id: 'd',
        text: 'به‌طور مکرر عناصر مجاور را با یکدیگر مقایسه کرده و در صورت نامرتب بودن آن‌ها را جابه‌جا می‌کند',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'مرتب‌سازی درجی یک بخش مرتب‌شده را از چپ به راست گسترش می‌دهد. هر عنصر جدید به عنوان کلید در نظر گرفته شده و در جایگاه صحیح خود در میان عناصر از قبل مرتب‌شده قرار می‌گیرد.',
  },

  {
    id: 'is-easy-s1-q2',
    type: 'conceptual',
    prompt: 'پس از هر تکرار مرتب‌سازی درجی، درباره بخش سمت چپ آرایه چه چیزی تضمین می‌شود؟',
    options: [
      {
        id: 'a',
        text: 'بخش پردازش‌شده مرتب است',
      },
      {
        id: 'b',
        text: 'بزرگ‌ترین مقدار همیشه در جایگاه نهایی خود قرار دارد',
      },
      {
        id: 'c',
        text: 'کل آرایه مرتب است',
      },
      {
        id: 'd',
        text: 'فقط دو عنصر اول مرتب هستند',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'پس از پردازش هر عنصر، بخشی که در سمت چپ آن قرار دارد به صورت مرتب نگه داشته می‌شود. بخش باقی‌مانده آرایه ممکن است همچنان نامرتب باشد.',
  },

  {
    id: 'is-easy-s1-q3',
    type: 'execution',
    prompt: 'آرایه در حال پردازش است. در مرحله بعد چه اتفاقی رخ می‌دهد؟',
    // frameIndex را با insertionSortVisualization([5, 2, 8, 1]) بررسی کنید.
    // وضعیت موردنظر: key = 2، مقایسه 2 با 5.
    visualization: { inputArray: [5, 2, 8, 1], frameIndex: 2 },

    options: [
      {
        id: 'a',
        text: 'مقدار ۵ به سمت راست منتقل می‌شود، زیرا از کلید ۲ بزرگ‌تر است',
      },
      {
        id: 'b',
        text: 'مقادیر ۵ و ۲ بلافاصله با یکدیگر جابه‌جا می‌شوند و تکرار پایان می‌یابد',
      },
      {
        id: 'c',
        text: 'مقدار ۲ حذف می‌شود، زیرا از ۵ کوچک‌تر است',
      },
      {
        id: 'd',
        text: 'الگوریتم مستقیماً به سراغ مقدار ۸ می‌رود',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'هنگامی که کلید فعلی از عنصر قبل از خود کوچک‌تر باشد، آن عنصر بزرگ‌تر یک خانه به سمت راست منتقل می‌شود تا برای کلید فضای کافی ایجاد شود.',
  },

  {
    id: 'is-easy-s1-q4',
    type: 'execution',
    prompt: 'کلید فعلی از عنصر بلافاصله قبل از خود بزرگ‌تر است. در مرحله بعد چه اتفاقی رخ می‌دهد؟',
    // frameIndex را با insertionSortVisualization([5, 2, 8, 1]) بررسی کنید.
    // وضعیت موردنظر: key = 8 و پیشوند مرتب‌شده [2, 5] از قبل مرتب است.
    visualization: { inputArray: [5, 2, 8, 1], frameIndex: 9 },

    options: [
      {
        id: 'a',
        text: 'کلید در جایگاه فعلی خود باقی می‌ماند، زیرا از عنصر قبلی بزرگ‌تر است',
      },
      {
        id: 'b',
        text: 'تمام عناصر بخش مرتب‌شده یک خانه به سمت راست منتقل می‌شوند',
      },
      {
        id: 'c',
        text: 'کلید به ابتدای آرایه منتقل می‌شود',
      },
      {
        id: 'd',
        text: 'الگوریتم از اولین عنصر دوباره شروع می‌شود',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'اگر کلید از عنصر مرتب‌شده قبلی خود بزرگ‌تر یا مساوی باشد، در جایگاه صحیح قرار دارد و نیازی به جابه‌جایی عناصر نیست.',
  },

  {
    id: 'is-easy-s1-q5',
    type: 'code',
    prompt: 'جای خالی را در شبه‌کد مرتب‌سازی درجی پر کنید:',

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
      { id: 'c', text: '==' },
      { id: 'd', text: '!=' },
    ],

    correctOptionId: 'a',
    explanation:
      'برای مرتب‌سازی به صورت صعودی، عناصری که از کلید بزرگ‌تر هستند باید به سمت راست منتقل شوند. بنابراین شرط صحیح arr[j] > key است.',
  },
];
