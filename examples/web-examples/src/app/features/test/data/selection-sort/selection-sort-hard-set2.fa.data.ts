import type { TestQuestion } from '../../test.types';

// مجموعه ۲ / سخت برای Selection Sort. از آرایه [4, 2, 4, 1] با
// فریم‌ها و عبارت‌بندی متفاوت نسبت به مجموعه ۱ استفاده می‌کند.

export const SELECTION_SORT_HARD_SET_2_FA: TestQuestion[] = [
  {
    id: 'ss-hard-s2-q1',
    type: 'conceptual',
    prompt: 'در مقایسه با Insertion Sort، چرا Selection Sort از ورودی تقریباً مرتب سود نمی‌برد؟',
    options: [
      {
        id: 'a',
        text: 'Selection Sort در هر پیمایش بدون توجه به میزان مرتب بودن داده‌ها، همیشه کل بخش باقی‌مانده را بررسی می‌کند؛ برخلاف حلقه داخلی Insertion Sort که می‌تواند زودتر متوقف شود',
      },
      { id: 'b', text: 'Selection Sort در واقع روی داده‌های تقریباً مرتب سریع‌تر از Insertion Sort است' },
      { id: 'c', text: 'Selection Sort زمانی که بخشی از آرایه مرتب به نظر برسد، مقایسه‌ها را متوقف می‌کند' },
      { id: 'd', text: 'هر دو الگوریتم به یک اندازه از داده‌های تقریباً مرتب سود می‌برند' },
    ],

    correctOptionId: 'a',
    explanation:
      'حلقه داخلی Insertion Sort می‌تواند به‌محض پیدا کردن عنصری که از قبل در جای درست قرار دارد، زود متوقف شود؛ بنابراین هزینه آن برای آرایه تقریباً مرتب بسیار کم است. Selection Sort چنین میان‌بری ندارد و در هر پیمایش بدون استثنا تمام کاندیداهای باقی‌مانده را برای یافتن کوچک‌ترین مقدار بررسی می‌کند.',
  },
  {
    id: 'ss-hard-s2-q2',
    type: 'conceptual',
    prompt: 'بهترین حالت از نظر تعداد جابه‌جایی‌های Selection Sort چیست و چه زمانی رخ می‌دهد؟',
    options: [
      { id: 'a', text: '۰ — زمانی که آرایه از قبل کاملاً مرتب است و کوچک‌ترین مقدار هر پیمایش از قبل در اندیس i قرار دارد' },
      { id: 'b', text: 'n - 1، بدون توجه به ورودی' },
      { id: 'c', text: 'n(n - 1) / 2، مشابه تعداد مقایسه‌ها' },
      { id: 'd', text: '۱، که همیشه فقط در پیمایش اول رخ می‌دهد' },
    ],

    correctOptionId: 'a',
    explanation:
      'یک پیمایش فقط زمانی جابه‌جایی انجام می‌دهد که minIndex با i متفاوت باشد. در یک آرایه از قبل مرتب‌شده، کوچک‌ترین مقدار هر پیمایش از قبل در ابتدای بخش قرار دارد؛ بنابراین هیچ جابه‌جایی انجام نمی‌شود، حتی اگر تعداد مقایسه‌ها تغییری نکند.',
  },
  {
    id: 'ss-hard-s2-q3',
    type: 'conceptual',
    prompt: 'بدترین حالت از نظر تعداد جابه‌جایی‌های Selection Sort برای آرایه‌ای با n عنصر چیست؟',
    options: [
      { id: 'a', text: 'n - 1 — در هر پیمایش یک جابه‌جایی انجام می‌شود؛ زمانی که کوچک‌ترین مقدار واقعی هرگز از قبل در اندیس i قرار نداشته باشد' },
      { id: 'b', text: 'n(n - 1) / 2' },
      { id: 'c', text: 'n' },
      { id: 'd', text: '۰' },
    ],

    correctOptionId: 'a',
    explanation:
      'در مجموع n - 1 پیمایش وجود دارد و هر پیمایش حداکثر یک جابه‌جایی انجام می‌دهد؛ بنابراین n - 1 سقف تعداد جابه‌جایی‌هاست، صرف‌نظر از اینکه آرایه تا چه اندازه نامرتب باشد. Selection Sort هرگز از این مقدار بیشتر نمی‌شود.',
  },
  {
    id: 'ss-hard-s2-q4',
    type: 'conceptual',
    prompt: 'کدام تغییر در الگوریتم باعث می‌شود Selection Sort به یک الگوریتم مرتب‌سازی پایدار تبدیل شود؟',
    options: [
      {
        id: 'a',
        text: 'به‌جای یک جابه‌جایی با فاصله زیاد، تمام عناصر بین minIndex و i را یک خانه جابه‌جا کنیم؛ مشابه روشی که Insertion Sort عناصر را جابه‌جا می‌کند تا عناصر مساوی ترتیب اولیه خود را حفظ کنند',
      },
      { id: 'b', text: 'استفاده از <= به‌جای < در مقایسه' },
      { id: 'c', text: 'مرتب‌سازی آرایه به‌صورت نزولی به‌جای صعودی' },
      { id: 'd', text: 'هیچ تغییری ممکن نیست؛ Selection Sort با هیچ اصلاحی نمی‌تواند پایدار شود' },
    ],

    correctOptionId: 'a',
    explanation:
      'جایگزین کردن جابه‌جایی مستقیم با یک مرحله انتقال تدریجی به محل موردنظر، مشابه حلقه داخلی Insertion Sort، باعث می‌شود کوچک‌ترین مقدار به‌جای پرش از روی عناصر میانی، مرحله‌به‌مرحله از کنار آن‌ها عبور کند. در نتیجه ترتیب نسبی عناصر حفظ می‌شود، البته با هزینه انجام عملیات نوشتن بیشتر در هر پیمایش.',
  },
  {
    id: 'ss-hard-s2-q5',
    type: 'execution',
    prompt: 'پیمایش دوم در حال انجام است. در مرحله بعد چه اتفاقی می‌افتد؟',

    // فریم ۱۱ برای [4, 2, 4, 1]: پیمایش i=1، مقایسه اندیس ۲ (مقدار ۴)
    // با کوچک‌ترین مقدار فعلی در اندیس ۱ (مقدار ۲).
    visualization: { inputArray: [4, 2, 4, 1], frameIndex: 11 },

    options: [
      { id: 'a', text: 'کوچک‌ترین مقدار کاندیدا در اندیس ۱ باقی می‌ماند، زیرا ۴ از ۲ کوچک‌تر نیست' },
      { id: 'b', text: 'اندیس‌های ۱ و ۲ جابه‌جا می‌شوند، زیرا ۴ از ۲ بزرگ‌تر است' },
      { id: 'c', text: 'اندیس ۲ به کوچک‌ترین مقدار جدید تبدیل می‌شود' },
      { id: 'd', text: 'پیمایش بدون بررسی اندیس ۳ پایان می‌یابد' },
    ],

    correctOptionId: 'a',
    explanation:
      'arr[2]=4 از کوچک‌ترین مقدار فعلی یعنی arr[1]=2 کوچک‌تر نیست؛ بنابراین هیچ تغییری رخ نمی‌دهد.',
  },
  {
    id: 'ss-hard-s2-q6',
    type: 'execution',
    prompt: 'پیمایش دوم به‌تازگی بررسی خود را به پایان رسانده است. اکنون چه اتفاقی می‌افتد؟',

    // فریم ۱۵ برای [4, 2, 4, 1]: پیمایش i=1 با minIndex برابر i به پایان می‌رسد،
    // بنابراین جابه‌جایی انجام نمی‌شود — «Already in place».
    visualization: { inputArray: [4, 2, 4, 1], frameIndex: 15 },

    options: [
      { id: 'a', text: 'هیچ جابه‌جایی انجام نمی‌شود، زیرا اندیس ۱ از قبل کوچک‌ترین مقدار باقی‌مانده را در خود داشته است' },
      { id: 'b', text: 'اندیس ۱ با اندیس ۳ جابه‌جا می‌شود' },
      { id: 'c', text: 'در آخرین لحظه یک کوچک‌ترین مقدار کاندیدای جدید پیدا می‌شود' },
      { id: 'd', text: 'پیمایش از اندیس ۱ دوباره آغاز می‌شود' },
    ],

    correctOptionId: 'a',
    explanation:
      'minIndex در طول این پیمایش هرگز از ۱ تغییر نکرده است؛ بنابراین arr[1] از قبل کوچک‌ترین مقدار باقی‌مانده بوده است. در نتیجه جابه‌جایی رد می‌شود و اندیس ۱ به‌عنوان مرتب‌شده تثبیت می‌شود.',
  },
  {
    id: 'ss-hard-s2-q7',
    type: 'code',
    prompt: 'جای خالی را در محدوده حلقه بیرونی پر کنید:',

    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function selectionSort(arr):', kind: 'plain' }] },
      {
        lineNumber: 2,
        indentLevel: 1,
        tokens: [
          { text: 'for i = 0 to ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ':', kind: 'plain' },
        ],
      },
      { lineNumber: 3, indentLevel: 2, tokens: [{ text: 'minIndex = i', kind: 'plain' }] },
      { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'for j = i + 1 to n - 1:', kind: 'plain' }] },
      { lineNumber: 5, indentLevel: 3, tokens: [{ text: 'if arr[j] < arr[minIndex]: minIndex = j', kind: 'plain' }] },
      { lineNumber: 6, indentLevel: 2, tokens: [{ text: 'swap(arr[i], arr[minIndex])', kind: 'plain' }] },
      { lineNumber: 7, indentLevel: 1, tokens: [{ text: 'return arr', kind: 'plain' }] },
    ],

    options: [
      { id: 'a', text: 'n - 2' },
      { id: 'b', text: 'n - 1' },
      { id: 'c', text: 'n' },
      { id: 'd', text: 'n / 2' },
    ],

    correctOptionId: 'a',
    explanation:
      'با شروع i از ۰، حلقه باید مقادیر i = 0 تا n - 2 را پوشش دهد تا دقیقاً n - 1 پیمایش ایجاد شود؛ زیرا پس از قرار گرفتن تمام عناصر قبل از آخرین عنصر در جای درست، آخرین عنصر نیز خودبه‌خود در جای صحیح قرار دارد.',
  },
  {
    id: 'ss-hard-s2-q8',
    type: 'code',
    prompt: 'جای خالی را پر کنید — کوچک‌ترین مقدار کاندیدای فعلی باید با چه مقداری مقایسه شود؟',

    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function selectionSort(arr):', kind: 'plain' }] },
      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'for i = 0 to n - 2:', kind: 'plain' }] },
      { lineNumber: 3, indentLevel: 2, tokens: [{ text: 'minIndex = i', kind: 'plain' }] },
      { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'for j = i + 1 to n - 1:', kind: 'plain' }] },
      {
        lineNumber: 5,
        indentLevel: 3,
        tokens: [
          { text: 'if arr[j] < arr[', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ']: minIndex = j', kind: 'plain' },
        ],
      },
      { lineNumber: 6, indentLevel: 2, tokens: [{ text: 'swap(arr[i], arr[minIndex])', kind: 'plain' }] },
      { lineNumber: 7, indentLevel: 1, tokens: [{ text: 'return arr', kind: 'plain' }] },
    ],

    options: [
      { id: 'a', text: 'minIndex' },
      { id: 'b', text: 'i' },
      { id: 'c', text: 'j - 1' },
      { id: 'd', text: '0' },
    ],

    correctOptionId: 'a',
    explanation:
      'هر arr[j] باید با کوچک‌ترین مقداری که تا آن لحظه پیدا شده مقایسه شود؛ این مقدار توسط minIndex نگهداری می‌شود، نه توسط اندیس ثابت پیمایش یعنی i.',
  },
  {
    id: 'ss-hard-s2-q9',
    type: 'code',
    prompt: 'جای خالی را در فراخوانی جابه‌جایی پر کنید:',

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
          { text: 'swap(arr[', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: '], arr[minIndex])', kind: 'plain' },
        ],
      },
      { lineNumber: 7, indentLevel: 1, tokens: [{ text: 'return arr', kind: 'plain' }] },
    ],

    options: [
      { id: 'a', text: 'i' },
      { id: 'b', text: 'j' },
      { id: 'c', text: 'minIndex' },
      { id: 'd', text: 'i + 1' },
    ],

    correctOptionId: 'a',
    explanation:
      'این جابه‌جایی کوچک‌ترین مقدار پیمایش را در ابتدای بخش مرتب‌نشده قرار می‌دهد که همان اندیس i است؛ بنابراین باید از swap(arr[i], arr[minIndex]) استفاده شود.',
  },
  {
    id: 'ss-hard-s2-q10',
    type: 'conceptual',
    prompt: 'از نظر Big-O، عملکرد Selection Sort در مقایسه با Insertion Sort روی داده‌های تقریباً مرتب چگونه است؟',
    options: [
      { id: 'a', text: 'Insertion Sort روی داده‌های تقریباً مرتب به O(n) نزدیک می‌شود، در حالی که Selection Sort بدون توجه به میزان مرتب بودن ورودی همچنان O(n²) باقی می‌ماند' },
      { id: 'b', text: 'هر دو الگوریتم روی داده‌های تقریباً مرتب به O(n) نزدیک می‌شوند' },
      { id: 'c', text: 'هر دو الگوریتم بدون توجه به شرایط همیشه O(n²) باقی می‌مانند و تفاوتی میان آن‌ها وجود ندارد' },
      { id: 'd', text: 'Selection Sort روی داده‌های تقریباً مرتب سریع‌تر از Insertion Sort است' },
    ],

    correctOptionId: 'a',
    explanation:
      'حلقه داخلی Insertion Sort زمانی که عناصر از قبل نزدیک به موقعیت صحیح خود باشند، می‌تواند تقریباً بلافاصله متوقف شود؛ بنابراین ورودی تقریباً مرتب به حالت بهترین حالت O(n) آن نزدیک است. Selection Sort چنین وابستگی‌ای به ترتیب ورودی ندارد و همیشه هزینه کامل O(n²) مقایسه‌ها را پرداخت می‌کند.',
  },
];