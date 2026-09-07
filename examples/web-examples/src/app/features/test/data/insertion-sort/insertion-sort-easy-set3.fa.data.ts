import type { TestQuestion } from '../../test.types';

// مجموعه ۳ / آسان برای مرتب‌سازی درجی
// ۲ سؤال مفهومی، ۲ سؤال اجرایی و ۱ سؤال کدنویسی.
// مقادیر frameIndex با شبیه‌سازی دقیق insertionSortVisualization([3, 6, 1, 4])
// بررسی و تأیید شده‌اند (نه حدسی).

export const INSERTION_SORT_EASY_SET_3_FA: TestQuestion[] = [
  {
    id: 'is-easy-s3-q1',
    type: 'conceptual',
    prompt: 'در شبه‌کد مرتب‌سازی درجی، متغیر key دقیقاً چه چیزی را نگه می‌دارد؟',
    options: [
      {
        id: 'a',
        text: 'مقدار عنصری که در حال حاضر در حال درج‌شدن در بخش مرتب‌شده است',
      },
      {
        id: 'b',
        text: 'کوچک‌ترین مقدار موجود در کل آرایه',
      },
      {
        id: 'c',
        text: 'اندیس آخرین عنصر بخش مرتب‌شده',
      },
      {
        id: 'd',
        text: 'مقداری که باید در پایان اجرا حذف شود',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'در هر تکرار حلقه بیرونی، key مقدار arr[i] را نگه می‌دارد تا زمانی که جایگاه صحیح آن در بخش مرتب‌شده پیدا شود و در آنجا درج شود.',
  },

  {
    id: 'is-easy-s3-q2',
    type: 'conceptual',
    prompt: 'چرا عنصر اندیس ۰ از همان اولین لحظه بخشی از «بخش مرتب‌شده» در نظر گرفته می‌شود؟',
    options: [
      {
        id: 'a',
        text: 'یک آرایه با فقط یک عنصر همیشه به‌طور بدیهی مرتب است، پس نیازی به مقایسه ندارد',
      },
      {
        id: 'b',
        text: 'چون همیشه کوچک‌ترین مقدار آرایه در اندیس ۰ قرار دارد',
      },
      {
        id: 'c',
        text: 'چون الگوریتم آرایه را از راست به چپ می‌خواند',
      },
      {
        id: 'd',
        text: 'چون اندیس ۰ هرگز جابه‌جا نمی‌شود',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'حلقه بیرونی از اندیس ۱ شروع می‌شود، بنابراین اندیس ۰ هرگز به عنوان key انتخاب نمی‌شود و از ابتدا به عنوان یک بخش مرتب‌شده تک‌عضوی در نظر گرفته می‌شود.',
  },

  {
    id: 'is-easy-s3-q3',
    type: 'execution',
    prompt: 'کلید فعلی ۶ است و بخش مرتب‌شده فقط شامل [3] است. در مرحله بعد چه اتفاقی رخ می‌دهد؟',
    // frameIndex با insertionSortVisualization([3, 6, 1, 4]) بررسی شد.
    // فریم ۲: i=1، key=6 برداشته شده، پیش از هر مقایسه‌ای.
    visualization: { inputArray: [3, 6, 1, 4], frameIndex: 2 },

    options: [
      {
        id: 'a',
        text: 'هیچ جابه‌جایی رخ نمی‌دهد، زیرا ۳ از کلید ۶ بزرگ‌تر نیست؛ ۶ در همان جایگاه فعلی خود باقی می‌ماند',
      },
      {
        id: 'b',
        text: '۳ یک خانه به سمت راست منتقل می‌شود',
      },
      {
        id: 'c',
        text: '۳ و ۶ با یکدیگر جابه‌جا می‌شوند',
      },
      {
        id: 'd',
        text: 'الگوریتم بلافاصله متوقف می‌شود',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'چون arr[0]=3 از کلید ۶ بزرگ‌تر نیست، شرط حلقه داخلی از همان ابتدا برقرار نیست؛ بنابراین هیچ جابه‌جایی رخ نمی‌دهد و ۶ در جایگاه خود باقی می‌ماند.',
  },

  {
    id: 'is-easy-s3-q4',
    type: 'execution',
    prompt: 'کلید فعلی ۱ است و بخش مرتب‌شده برابر [3, 6] است. در مرحله بعد چه اتفاقی رخ می‌دهد؟',
    // frameIndex با insertionSortVisualization([3, 6, 1, 4]) بررسی شد.
    // فریم ۴: i=2، key=1 برداشته شده، پیش از هر مقایسه‌ای.
    visualization: { inputArray: [3, 6, 1, 4], frameIndex: 4 },

    options: [
      {
        id: 'a',
        text: '۶ یک خانه به سمت راست منتقل می‌شود، زیرا از کلید ۱ بزرگ‌تر است',
      },
      {
        id: 'b',
        text: '۱ بلافاصله در جایگاه فعلی خود باقی می‌ماند',
      },
      {
        id: 'c',
        text: 'فقط ۳ جابه‌جا می‌شود و ۶ نادیده گرفته می‌شود',
      },
      {
        id: 'd',
        text: 'بخش مرتب‌شده کاملاً معکوس می‌شود',
      },
    ],
    correctOptionId: 'a',
    explanation:
      'چون ۱ از تمام عناصر بخش مرتب‌شده [3, 6] کوچک‌تر است، اسکن از راست شروع می‌شود: ابتدا ۶ که بزرگ‌تر است جابه‌جا می‌شود، و در ادامه ۳ نیز جابه‌جا خواهد شد تا ۱ در ابتدای آرایه درج شود.',
  },

  {
    id: 'is-easy-s3-q5',
    type: 'code',
    prompt: 'جای خالی را در شبه‌کد مرتب‌سازی درجی پر کنید — عنصر جابه‌جاشده در کدام خانه قرار می‌گیرد؟',

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
        tokens: [
          { text: 'arr[j + ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: '] = arr[j]', kind: 'plain' },
        ],
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
      { id: 'c', text: '-1' },
      { id: 'd', text: '2' },
    ],

    correctOptionId: 'a',
    explanation:
      'عنصر بزرگ‌تر arr[j] باید یک خانه به سمت راست منتقل شود تا جایگاهش برای key آزاد شود؛ بنابراین باید در arr[j + 1] نوشته شود.',
  },
];
