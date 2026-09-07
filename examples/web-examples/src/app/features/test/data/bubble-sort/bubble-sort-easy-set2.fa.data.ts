import type { TestQuestion } from '../../test.types';

export const BUBBLE_SORT_EASY_SET_2_FA: TestQuestion[] = [

  {
    id: 'bs-easy-s2-q1',

    type: 'conceptual',

    prompt: 'چرا مرتب‌سازی حبابی عناصر مجاور را با یکدیگر مقایسه می‌کند؟',

    options: [
      {
        id: 'a',
        text: 'زیرا هر مقایسه می‌تواند یک مقدار بزرگ‌تر را یک موقعیت به سمت انتهای آرایه منتقل کند',
      },
      {
        id: 'b',
        text: 'زیرا فقط عنصر اول و آخر آرایه می‌توانند با یکدیگر مقایسه شوند',
      },
      {
        id: 'c',
        text: 'زیرا عناصر مجاور همیشه از قبل مرتب هستند',
      },
      {
        id: 'd',
        text: 'زیرا الگوریتم به دنبال یک مقدار مشخص می‌گردد',
      },
    ],

    correctOptionId: 'a',

    explanation:
      'مرتب‌سازی حبابی عناصر همسایه را با یکدیگر مقایسه می‌کند تا یک مقدار بزرگ‌تر بتواند مرحله‌به‌مرحله به سمت انتهای بخش مرتب‌نشده حرکت کند.',
  },

  {
    id: 'bs-easy-s2-q2',

    type: 'conceptual',

    prompt: 'در طول یک پیمایش کامل مرتب‌سازی حبابی، چه اتفاقی برای بزرگ‌ترین مقدار می‌افتد؟',

    options: [
      {
        id: 'a',
        text: 'به سمت انتهای بخش مرتب‌نشده حرکت می‌کند',
      },
      {
        id: 'b',
        text: 'همیشه به ابتدای آرایه منتقل می‌شود',
      },
      {
        id: 'c',
        text: 'از آرایه حذف می‌شود',
      },
      {
        id: 'd',
        text: 'به وسط آرایه منتقل می‌شود',
      },
    ],

    correctOptionId: 'a',

    explanation:
      'هرگاه بزرگ‌ترین مقدار با یک مقدار کوچک‌تر که در کنار آن قرار دارد مقایسه شود، این دو با یکدیگر جابه‌جا می‌شوند و در نتیجه مقدار بزرگ‌تر یک موقعیت به سمت راست حرکت می‌کند.',
  },

  {
    id: 'bs-easy-s2-q3',

    type: 'execution',

    prompt: 'آرایه در حال پردازش است. در مرحله بعد چه اتفاقی می‌افتد؟',

    visualization: {
      inputArray: [3, 7, 2, 5],
      frameIndex: 2,
    },

    options: [
      {
        id: 'a',
        text: '۳ و ۷ در جای خود باقی می‌مانند، زیرا ترتیب آن‌ها درست است',
      },
      {
        id: 'b',
        text: '۳ و ۷ جابه‌جا می‌شوند، زیرا ۳ بزرگ‌تر از ۷ است',
      },
      {
        id: 'c',
        text: '۷ و ۲ در جای خود باقی می‌مانند، زیرا ۷ کوچک‌تر از ۲ است',
      },
      {
        id: 'd',
        text: 'الگوریتم بلافاصله به پایان می‌رسد',
      },
    ],

    correctOptionId: 'a',

    explanation:
      'از آنجا که ۳ از ۷ کوچک‌تر است، این دو عنصر در ترتیب صعودی صحیح قرار دارند؛ بنابراین مرتب‌سازی حبابی آن‌ها را جابه‌جا نمی‌کند.',
  },

  {
    id: 'bs-easy-s2-q4',

    type: 'execution',

    prompt: 'آرایه در حال پردازش است. در مرحله بعد چه اتفاقی می‌افتد؟',

    visualization: {
      inputArray: [3, 7, 2, 5],
      frameIndex: 7,
    },

    options: [
      {
        id: 'a',
        text: '۷ و ۲ جابه‌جا می‌شوند، زیرا ۷ بزرگ‌تر از ۲ است',
      },
      {
        id: 'b',
        text: '۷ و ۲ در جای خود باقی می‌مانند، زیرا ترتیب آن‌ها از قبل صحیح است',
      },
      {
        id: 'c',
        text: '۳ و ۷ جابه‌جا می‌شوند، زیرا ۳ کوچک‌تر از ۷ است',
      },
      {
        id: 'd',
        text: 'الگوریتم کل پیمایش را نادیده می‌گیرد',
      },
    ],

    correctOptionId: 'a',

    explanation:
      'دو عنصر ۷ و ۲ برای مرتب‌سازی صعودی در ترتیب نادرستی قرار دارند؛ بنابراین مرتب‌سازی حبابی آن‌ها را با یکدیگر جابه‌جا می‌کند.',
  },

  {
    id: 'bs-easy-s2-q5',

    type: 'code',

    prompt: 'برای جابه‌جایی عناصر مجاور هنگام مرتب‌سازی به صورت صعودی، از کدام شرط باید استفاده شود؟',

    codeLines: [
      {
        lineNumber: 1,
        indentLevel: 0,
        tokens: [{ text: 'function bubbleSort(arr):', kind: 'plain' }],
      },

      {
        lineNumber: 2,
        indentLevel: 1,
        tokens: [{ text: 'for i = 0 to n - 2:', kind: 'plain' }],
      },

      {
        lineNumber: 3,
        indentLevel: 2,
        tokens: [{ text: 'for j = 0 to n - i - 2:', kind: 'plain' }],
      },

      {
        lineNumber: 4,
        indentLevel: 3,
        tokens: [
          { text: 'if arr[j] ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ' arr[j + 1]:', kind: 'plain' },
        ],
      },

      {
        lineNumber: 5,
        indentLevel: 4,
        tokens: [{ text: 'swap(arr[j], arr[j + 1])', kind: 'plain' }],
      },
    ],

    options: [
      { id: 'a', text: '>' },
      { id: 'b', text: '<' },
      { id: 'c', text: '==' },
      { id: 'd', text: '<=' },
    ],

    correctOptionId: 'a',

    explanation:
      'برای مرتب‌سازی به صورت صعودی، زمانی عناصر مجاور با یکدیگر جابه‌جا می‌شوند که عنصر سمت چپ بزرگ‌تر از عنصر سمت راست باشد.',
  },

];

