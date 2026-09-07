import type { TestQuestion } from '../../test.types';

// مجموعه ۲ / سطح آسان برای مرتب‌سازی انتخابی.
// مقادیر frameIndex در برابر selectionSortVisualization([3, 7, 2, 5]) بررسی شده‌اند.

export const SELECTION_SORT_EASY_SET_2_FA: TestQuestion[] = [

  {

    id: 'ss-easy-s2-q1',

    type: 'conceptual',

    prompt: 'چرا مرتب‌سازی انتخابی پیش از انجام هر جابه‌جایی، کل بخش مرتب‌نشده را پیمایش می‌کند؟',

    options: [

      {

        id: 'a',

        text: 'زیرا باید ابتدا کوچک‌ترین مقدار موجود در آن محدوده را پیدا کند تا بداند چه مقداری را باید در جای خود قرار دهد',

      },

      { id: 'b', text: 'زیرا باید هر جفت عنصر مجاور را با یکدیگر مقایسه کند' },

      { id: 'c', text: 'زیرا ابتدا باید آرایه به دو نیمه تقسیم شود' },

      { id: 'd', text: 'زیرا به محض پیدا کردن هر همسایه کوچک‌تر، جابه‌جایی را انجام می‌دهد' },

    ],

    correctOptionId: 'a',

    explanation:

      'برخلاف مرتب‌سازی حبابی که در هر جفت عنصر مجاورِ خارج از ترتیب جابه‌جایی انجام می‌دهد، مرتب‌سازی انتخابی در هر گذر تنها یک جابه‌جایی انجام می‌دهد؛ اما برای مشخص کردن محل کمینه، ابتدا باید تمام عناصر باقی‌مانده را بررسی کند.',

  },

  {

    id: 'ss-easy-s2-q2',

    type: 'conceptual',

    prompt: 'کوچک‌ترین مقدارِ پردازش‌نشده در طول یک گذر کامل مرتب‌سازی انتخابی چه اتفاقی برایش می‌افتد؟',

    options: [

      { id: 'a', text: 'به ابتدای بخشِ همچنان مرتب‌نشده منتقل می‌شود' },

      { id: 'b', text: 'به انتهای آرایه منتقل می‌شود' },

      { id: 'c', text: 'در میانهٔ آرایه باقی می‌ماند' },

      { id: 'd', text: 'از آرایه حذف شده و دوباره در انتهای آن قرار می‌گیرد' },

    ],

    correctOptionId: 'a',

    explanation:

      'پس از پایان پیمایش در یک گذر، اندیسی که کوچک‌ترین مقدار پردازش‌نشده را در خود داشته است، با ابتدای بخشِ همچنان مرتب‌نشده جابه‌جا می‌شود.',

  },

  {

    id: 'ss-easy-s2-q3',

    type: 'execution',

    prompt: 'آرایه در حال پردازش است. در مرحلهٔ بعد چه اتفاقی می‌افتد؟',

    // قاب ۴ برای [3, 7, 2, 5]: مقایسه اندیس کاندید ۲ (مقدار ۲) با کمینهٔ فعلی در اندیس ۰ (مقدار ۳).

    visualization: { inputArray: [3, 7, 2, 5], frameIndex: 4 },

    options: [

      { id: 'a', text: 'اندیس ۲ به کمینهٔ کاندید جدید تبدیل می‌شود، زیرا ۲ از ۳ کوچک‌تر است' },

      { id: 'b', text: 'اندیس‌های ۰ و ۲ بلافاصله جابه‌جا می‌شوند، زیرا ۲ از ۳ کوچک‌تر است' },

      { id: 'c', text: 'اندیس ۲ بدون تغییر باقی می‌ماند، زیرا ۲ از ۳ بزرگ‌تر است' },

      { id: 'd', text: 'الگوریتم بدون تکمیل این گذر، به گذر بعدی می‌رود' },

    ],

    correctOptionId: 'a',

    explanation:

      'arr[2]=2 از کمینهٔ فعلی arr[0]=3 کوچک‌تر است، بنابراین اندیس ۲ به کاندید جدید تبدیل می‌شود؛ اما خود جابه‌جایی تا پایان پیمایش کل گذر به تعویق می‌افتد.',

  },

  {

    id: 'ss-easy-s2-q4',

    type: 'execution',

    prompt: 'گذر دوم در حال انجام است. در مرحلهٔ بعد چه اتفاقی می‌افتد؟',

    // قاب ۱۳ برای [3, 7, 2, 5]: گذر i=1، مقایسه اندیس ۳ (مقدار ۵) با کمینهٔ فعلی در اندیس ۲ (مقدار ۳).

    visualization: { inputArray: [3, 7, 2, 5], frameIndex: 13 },

    options: [

      { id: 'a', text: 'کمینهٔ فعلی در اندیس ۲ باقی می‌ماند، زیرا ۵ از ۳ کوچک‌تر نیست' },

      { id: 'b', text: 'اندیس‌های ۲ و ۳ جابه‌جا می‌شوند، زیرا ۵ از ۳ بزرگ‌تر است' },

      { id: 'c', text: 'اندیس ۳ به کمینهٔ جدید تبدیل می‌شود' },

      { id: 'd', text: 'گذر بدون بررسی اندیس ۳ به پایان می‌رسد' },

    ],

    correctOptionId: 'a',

    explanation:

      'arr[3]=5 از کمینهٔ فعلی arr[2]=3 کوچک‌تر نیست، بنابراین کمینهٔ کاندید تغییر نمی‌کند.',

  },

  {

    id: 'ss-easy-s2-q5',

    type: 'code',

    prompt: 'جای خالی را پر کنید — جابه‌جایی باید از کدام اندیس به‌عنوان هدف دوم استفاده کند؟',

    codeLines: [

      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function selectionSort(arr):', kind: 'plain' }] },

      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'for i = 0 to n - 2:', kind: 'plain' }] },

      { lineNumber: 3, indentLevel: 2, tokens: [{ text: 'minIndex = i', kind: 'plain' }] },

      { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'for j = i + 1 to n - 1:', kind: 'plain' }] },

      { lineNumber: 5, indentLevel: 3, tokens: [{ text: 'if arr[j] < arr[minIndex]: minIndex = j', kind: 'plain' }] },

      {

        lineNumber: 6,

        indentLevel: 2,

        tokens: [

          { text: 'swap(arr[i], arr[', kind: 'plain' },

          { text: '____', kind: 'blank' },

          { text: '])', kind: 'plain' },

        ],

      },

      { lineNumber: 7, indentLevel: 1, tokens: [{ text: 'return arr', kind: 'plain' }] },

    ],

    options: [

      { id: 'a', text: 'minIndex' },

      { id: 'b', text: 'i' },

      { id: 'c', text: 'j' },

      { id: 'd', text: 'i + 1' },

    ],

    correctOptionId: 'a',

    explanation:

      'پس از پیمایش کامل گذر، minIndex اندیس کوچک‌ترین مقدار باقی‌مانده را در خود نگه می‌دارد؛ بنابراین جابه‌جایی باید arr[i] را با arr[minIndex] تعویض کند.',

  },

];