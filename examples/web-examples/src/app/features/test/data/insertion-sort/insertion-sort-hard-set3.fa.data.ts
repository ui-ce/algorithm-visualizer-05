import type { TestQuestion } from '../../test.types';
 
// مجموعه ۳ / سخت برای مرتب‌سازی درجی. از آرایه [8, 4, 6, 2, 7, 3]
// با فریم‌ها و عبارت‌بندی متفاوت از مجموعه‌های ۱ و ۲ استفاده می‌کند.
// مقادیر frameIndex با شبیه‌سازی دقیق موتور ضبط‌کننده (نه حدس) محاسبه شده‌اند.
export const INSERTION_SORT_HARD_SET_3_FA: TestQuestion[] = [
  {
    id: 'is-hard-s3-q1',
    type: 'conceptual',
    prompt: 'پیچیدگی زمانی مرتب‌سازی درجی در بهترین، متوسط و بدترین حالت چیست؟',
    options: [
      {
        id: 'a',
        text: 'بهترین حالت: Θ(n)، حالت متوسط: Θ(n²)، بدترین حالت: Θ(n²)',
      },
      { id: 'b', text: 'در همه حالت‌ها Θ(n²)، بدون هیچ تفاوتی' },
      { id: 'c', text: 'بهترین حالت: Θ(log n)، حالت متوسط: Θ(n log n)، بدترین حالت: Θ(n²)' },
      { id: 'd', text: 'در همه حالت‌ها Θ(n)' },
    ],
    correctOptionId: 'a',
    explanation:
      'وقتی آرایه از قبل مرتب باشد، هر کلید تنها به یک مقایسه نیاز دارد و زمان اجرا خطی می‌شود. در حالت متوسط و بدترین حالت (به‌ویژه آرایه معکوس)، هر کلید باید با بخش قابل‌توجهی از عناصر پیش از خود مقایسه و جابه‌جا شود که به رفتار درجه‌دوم منجر می‌شود.',
  },
  {
    id: 'is-hard-s3-q2',
    type: 'conceptual',
    prompt: 'کدام الگوریتم مرتب‌سازی رایج دیگر، مانند مرتب‌سازی درجی، ذاتاً پایدار است؟',
    options: [
      { id: 'a', text: 'مرتب‌سازی ادغامی، زیرا در مرحله ادغام هرگز یک عنصر برابر را از روی عنصر برابر دیگری که زودتر آمده عبور نمی‌دهد' },
      { id: 'b', text: 'مرتب‌سازی انتخابی، به دلیل استفاده از جابه‌جایی مستقیم' },
      { id: 'c', text: 'مرتب‌سازی سریع با افراز درجا (in-place partitioning)' },
      { id: 'd', text: 'هیچ‌کدام؛ فقط مرتب‌سازی درجی پایدار است' },
    ],
    correctOptionId: 'a',
    explanation:
      'در مرتب‌سازی ادغامی، وقتی مرحله ادغام با دو عنصر برابر از دو نیمه مواجه می‌شود، معمولاً عنصر نیمه چپ زودتر انتخاب می‌شود؛ بنابراین ترتیب نسبی حفظ می‌شود. مرتب‌سازی انتخابی و مرتب‌سازی سریع با افراز درجا هر دو به‌طور کلی پایدار نیستند، چون می‌توانند عناصر برابر را از کنار یکدیگر عبور دهند.',
  },
  {
    id: 'is-hard-s3-q3',
    type: 'conceptual',
    prompt: 'چرا نمی‌توان بدون کاهش تعداد جابه‌جایی‌ها، مرتب‌سازی درجی را با استفاده از جست‌وجوی دودویی به O(n log n) تبدیل کرد؟',
    options: [
      {
        id: 'a',
        text: 'چون گلوگاه اصلی جابه‌جا کردن عناصر برای باز کردن جا برای key است، نه یافتن جایگاه آن؛ و جابه‌جایی در یک آرایه پیوسته ذاتاً O(n) باقی می‌ماند',
      },
      { id: 'b', text: 'چون جست‌وجوی دودویی فقط روی آرایه‌های مرتب کار می‌کند و بخش مرتب‌شده همیشه مرتب است، پس این ادعا نادرست است' },
      { id: 'c', text: 'چون جست‌وجوی دودویی نیاز به بازگشت دارد که مرتب‌سازی درجی از آن پشتیبانی نمی‌کند' },
      { id: 'd', text: 'چون افزودن جست‌وجوی دودویی باعث ناپایدار شدن الگوریتم می‌شود' },
    ],
    correctOptionId: 'a',
    explanation:
      'جست‌وجوی دودویی می‌تواند تعداد مقایسه‌های لازم برای یافتن جایگاه صحیح key را به O(log n) کاهش دهد (این نسخه Binary Insertion Sort نام دارد)، اما جابه‌جا کردن فیزیکی عناصر برای باز کردن جا در یک آرایه پیوسته همچنان به‌طور میانگین O(n) عملیات نیاز دارد. بنابراین کران کلی O(n²) تغییر نمی‌کند.',
  },
  {
    id: 'is-hard-s3-q4',
    type: 'conceptual',
    prompt: 'در الگوریتم Shell Sort، ارتباط آن با مرتب‌سازی درجی چیست؟',
    options: [
      {
        id: 'a',
        text: 'Shell Sort در واقع نسخه‌ای تعمیم‌یافته از مرتب‌سازی درجی است که ابتدا عناصر را با فاصله‌های بزرگ مقایسه و جابه‌جا می‌کند و به‌تدریج فاصله را کاهش می‌دهد تا در نهایت به یک گذر معمولی مرتب‌سازی درجی برسد',
      },
      { id: 'b', text: 'Shell Sort هیچ ارتباطی با مرتب‌سازی درجی ندارد و کاملاً بر پایه ادغام است' },
      { id: 'c', text: 'Shell Sort نسخه بازگشتی مرتب‌سازی درجی است' },
      { id: 'd', text: 'Shell Sort فقط برای مرتب‌سازی رشته‌های متنی استفاده می‌شود' },
    ],
    correctOptionId: 'a',
    explanation:
      'Shell Sort با یک «فاصله» (gap) بزرگ شروع می‌کند و زیرلیست‌هایی با آن فاصله را با منطقی شبیه به مرتب‌سازی درجی مرتب می‌کند؛ سپس فاصله را کاهش می‌دهد. وقتی فاصله به ۱ برسد، الگوریتم دقیقاً به یک اجرای استاندارد مرتب‌سازی درجی تبدیل می‌شود، اما چون آرایه از قبل تا حد زیادی مرتب شده، این گذر نهایی بسیار سریع‌تر از حالت عادی است.',
  },
  {
    id: 'is-hard-s3-q5',
    type: 'execution',
    prompt: 'کلید فعلی ۷ است و بخش مرتب‌شده برابر [4, 6, 8] است. در مرحله بعد چه اتفاقی رخ می‌دهد؟',
    // فریم ۱۸ برای [8, 4, 6, 2, 7, 3]: گذر i=4، key=7 برداشته شده، پیش از هر مقایسه‌ای.
    visualization: { inputArray: [8, 4, 6, 2, 7, 3], frameIndex: 18 },
    options: [
      {
        id: 'a',
        text: '۸ (آخرین عنصر بخش مرتب‌شده) یک خانه به سمت راست منتقل می‌شود، زیرا از کلید ۷ بزرگ‌تر است؛ سپس اسکن روی ۶ متوقف خواهد شد',
      },
      { id: 'b', text: '۴، ۶ و ۸ همگی همزمان جابه‌جا می‌شوند' },
      { id: 'c', text: '۷ بلافاصله بدون هیچ مقایسه‌ای در انتهای بخش مرتب‌شده درج می‌شود' },
      { id: 'd', text: 'اسکن از ابتدای آرایه (اندیس ۰) دوباره شروع می‌شود' },
    ],
    correctOptionId: 'a',
    explanation:
      'اسکن بخش مرتب‌شده از راست به چپ انجام می‌شود. ۸ از ۷ بزرگ‌تر است و جابه‌جا می‌شود؛ اما مقدار بعدی، ۶، از ۷ بزرگ‌تر نیست، بنابراین اسکن همان‌جا متوقف شده و ۷ بین ۶ و ۸ درج خواهد شد.',
  },
  {
    id: 'is-hard-s3-q6',
    type: 'execution',
    prompt: 'کلید فعلی ۳ است و بخش مرتب‌شده برابر [2, 4, 6, 7, 8] است. در مرحله بعد چه اتفاقی رخ می‌دهد؟',
    // فریم ۲۲ برای [8, 4, 6, 2, 7, 3]: گذر i=5، key=3 برداشته شده، پیش از هر مقایسه‌ای.
    visualization: { inputArray: [8, 4, 6, 2, 7, 3], frameIndex: 22 },
    options: [
      {
        id: 'a',
        text: '۸ یک خانه به سمت راست منتقل می‌شود؛ این آغاز زنجیره‌ای از چهار جابه‌جایی خواهد بود، زیرا ۳ فقط از ۲ بزرگ‌تر است',
      },
      { id: 'b', text: 'فقط ۲ جابه‌جا می‌شود و بقیه عناصر دست‌نخورده باقی می‌مانند' },
      { id: 'c', text: '۳ بلافاصله در انتهای آرایه درج می‌شود' },
      { id: 'd', text: 'آرایه به‌طور کامل معکوس می‌شود' },
    ],
    correctOptionId: 'a',
    explanation:
      'کلید ۳ فقط از ۲ بزرگ‌تر است؛ بنابراین ۸، ۷، ۶ و ۴ همگی یکی‌یکی از راست به چپ یک خانه به سمت راست جابه‌جا می‌شوند تا اسکن روی ۲ متوقف شود و ۳ درست بعد از آن درج شود.',
  },
  {
    id: 'is-hard-s3-q7',
    type: 'code',
    prompt: 'جای خالی را پر کنید — j پس از هر جابه‌جایی چگونه به‌روزرسانی می‌شود؟',
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function insertionSort(arr):', kind: 'plain' }] },
      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'for i = 1 to n - 1:', kind: 'plain' }] },
      { lineNumber: 3, indentLevel: 2, tokens: [{ text: 'key = arr[i]', kind: 'plain' }] },
      { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'j = i - 1', kind: 'plain' }] },
      { lineNumber: 5, indentLevel: 2, tokens: [{ text: 'while j >= 0 and arr[j] > key:', kind: 'plain' }] },
      { lineNumber: 6, indentLevel: 3, tokens: [{ text: 'arr[j + 1] = arr[j]', kind: 'plain' }] },
      {
        lineNumber: 7,
        indentLevel: 3,
        tokens: [
          { text: 'j = j - ', kind: 'plain' },
          { text: '____', kind: 'blank' },
        ],
      },
      { lineNumber: 8, indentLevel: 2, tokens: [{ text: 'arr[j + 1] = key', kind: 'plain' }] },
      { lineNumber: 9, indentLevel: 1, tokens: [{ text: 'return arr', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: '1' },
      { id: 'b', text: '0' },
      { id: 'c', text: '-1' },
      { id: 'd', text: 'j' },
    ],
    correctOptionId: 'a',
    explanation:
      'پس از آنکه عنصر arr[j] یک خانه به سمت راست جابه‌جا شد، الگوریتم باید عنصر بعدیِ سمت چپ را بررسی کند؛ بنابراین j باید یک واحد کاهش یابد تا اسکن به سمت ابتدای بخش مرتب‌شده ادامه پیدا کند.',
  },
  {
    id: 'is-hard-s3-q8',
    type: 'code',
    prompt: 'جای خالی را پر کنید — کدام مقدار باید از آرایه خوانده شود تا در متغیر key ذخیره شود؟',
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function insertionSort(arr):', kind: 'plain' }] },
      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'for i = 1 to n - 1:', kind: 'plain' }] },
      {
        lineNumber: 3,
        indentLevel: 2,
        tokens: [
          { text: 'key = arr[', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ']', kind: 'plain' },
        ],
      },
      { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'j = i - 1', kind: 'plain' }] },
      { lineNumber: 5, indentLevel: 2, tokens: [{ text: 'while j >= 0 and arr[j] > key:', kind: 'plain' }] },
      { lineNumber: 6, indentLevel: 3, tokens: [{ text: 'arr[j + 1] = arr[j]', kind: 'plain' }] },
      { lineNumber: 7, indentLevel: 3, tokens: [{ text: 'j = j - 1', kind: 'plain' }] },
      { lineNumber: 8, indentLevel: 2, tokens: [{ text: 'arr[j + 1] = key', kind: 'plain' }] },
      { lineNumber: 9, indentLevel: 1, tokens: [{ text: 'return arr', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: 'i' },
      { id: 'b', text: 'j' },
      { id: 'c', text: 'i - 1' },
      { id: 'd', text: '0' },
    ],
    correctOptionId: 'a',
    explanation:
      'در هر تکرار حلقه بیرونی، عنصری که باید در بخش مرتب‌شده درج شود دقیقاً همان arr[i] است؛ به همین دلیل key باید از اندیس i خوانده شود.',
  },
  {
    id: 'is-hard-s3-q9',
    type: 'code',
    prompt: 'جای خالی را پر کنید — شرط ادامه حلقه داخلی روی arr[j] چیست؟',
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function insertionSort(arr):', kind: 'plain' }] },
      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'for i = 1 to n - 1:', kind: 'plain' }] },
      { lineNumber: 3, indentLevel: 2, tokens: [{ text: 'key = arr[i]', kind: 'plain' }] },
      { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'j = i - 1', kind: 'plain' }] },
      {
        lineNumber: 5,
        indentLevel: 2,
        tokens: [
          { text: 'while j >= 0 and arr[j] ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ' key:', kind: 'plain' },
        ],
      },
      { lineNumber: 6, indentLevel: 3, tokens: [{ text: 'arr[j + 1] = arr[j]', kind: 'plain' }] },
      { lineNumber: 7, indentLevel: 3, tokens: [{ text: 'j = j - 1', kind: 'plain' }] },
      { lineNumber: 8, indentLevel: 2, tokens: [{ text: 'arr[j + 1] = key', kind: 'plain' }] },
      { lineNumber: 9, indentLevel: 1, tokens: [{ text: 'return arr', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: '>' },
      { id: 'b', text: '>=' },
      { id: 'c', text: '<' },
      { id: 'd', text: '==' },
    ],
    correctOptionId: 'a',
    explanation:
      'شرط باید به‌صورت strict یعنی arr[j] > key باشد. اگر از >= استفاده می‌شد، عناصر مساوی با key نیز جابه‌جا می‌شدند و الگوریتم دیگر پایدار نمی‌ماند.',
  },
  {
    id: 'is-hard-s3-q10',
    type: 'conceptual',
    prompt: 'چرا مرتب‌سازی درجی معمولاً برای مرتب‌سازی «تقریباً مرتب» یا آرایه‌های خیلی کوچک، نسبت به الگوریتم‌های O(n log n) ترجیح داده می‌شود؟',
    options: [
      {
        id: 'a',
        text: 'چون سربار (overhead) اجرای واقعی آن — مانند فراخوانی تابع، بازگشت و تقسیم آرایه در الگوریتم‌هایی مثل مرتب‌سازی سریع — بسیار کمتر است و روی داده‌های نزدیک به مرتب، به کران خطی خود نزدیک می‌شود',
      },
      { id: 'b', text: 'چون در واقع سریع‌تر از هر الگوریتم O(n log n) روی هر نوع دادۀ بزرگ نیز هست' },
      { id: 'c', text: 'چون هیچ الگوریتم دیگری قادر به مرتب‌سازی آرایه‌های کوچک نیست' },
      { id: 'd', text: 'چون به حافظه کمتری نسبت به هر الگوریتم دیگری نیاز دارد، حتی مرتب‌سازی حبابی' },
    ],
    correctOptionId: 'a',
    explanation:
      'الگوریتم‌های O(n log n) مانند مرتب‌سازی ادغامی یا سریع سربار ثابتی (فراخوانی بازگشتی، تقسیم آرایه، تخصیص حافظه) دارند که برای آرایه‌های خیلی کوچک بیشتر از فایده نظری آن‌هاست. مرتب‌سازی درجی سرراست و بدون این سربار است و روی داده‌های تقریباً مرتب به سمت کران خطی O(n) خود میل می‌کند؛ به همین دلیل در الگوریتم‌های ترکیبی برای زیرآرایه‌های کوچک به کار می‌رود.',
  },
];