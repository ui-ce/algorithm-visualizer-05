import type { TestQuestion } from '../../test.types';

import { DFS_TEST_GRAPH } from './dfs-graph.data';

// مجموعه ۳ / سطح آسان برای DFS.

export const DFS_EASY_SET_3_FA: TestQuestion[] = [

  {

    id: 'dfs-easy-s3-q1',

    type: 'conceptual',

    prompt: 'منظور از «بازگشت به عقب» (Backtrack) در DFS چیست؟',

    options: [

      { id: 'a', text: 'بازگشت به نقطه‌ای قبلی در پیمایش، زیرا شاخهٔ فعلی دیگر گرهٔ بازدیدنشده‌ای برای بررسی ندارد' },

      { id: 'b', text: 'لغو تمام بازدیدهای انجام‌شده و شروع دوباره از گره ابتدایی' },

      { id: 'c', text: 'مرتب‌سازی دوبارهٔ گره‌های بازدیدشده بر اساس ترتیب اولیهٔ آن‌ها' },

      { id: 'd', text: 'حذف گره شروع از گراف پس از پایان پیمایش' },

    ],

    correctOptionId: 'a',

    explanation:
      'بازگشت به عقب زمانی اتفاق می‌افتد که یک شاخه دیگر همسایهٔ بازدیدنشده‌ای برای اضافه کردن به پشته نداشته باشد. در این حالت، ورودی بعدی پشته همان گره‌ای است که قبلاً توسط یک گرهٔ اجدادی در بخش قبلی پیمایش به پشته اضافه شده است.',

  },

  {

    id: 'dfs-easy-s3-q2',

    type: 'conceptual',

    prompt: 'در گراف مورد استفاده در این آزمون، DFS از گره A شروع می‌شود. آیا این یک قانون ثابت در این پیاده‌سازی است یا می‌تواند از هر گرهی شروع شود؟',

    options: [

      { id: 'a', text: 'در این پیاده‌سازی، گره شروع به‌صورت ثابت «A» تعیین شده است؛ اما یک DFS عمومی می‌تواند از هر گرهٔ انتخاب‌شده‌ای شروع شود' },

      { id: 'b', text: 'DFS همیشه باید از گرهی با کمترین تعداد همسایه شروع شود' },

      { id: 'c', text: 'DFS همیشه باید از گرهی شروع شود که زودتر از همه به گراف اضافه شده است، بدون توجه به نام آن گره' },

      { id: 'd', text: 'گره شروع هر بار که الگوریتم اجرا می‌شود به‌صورت تصادفی انتخاب می‌شود' },

    ],

    correctOptionId: 'a',

    explanation:
      'در امضای تابع شبه‌کد، یعنی dfs(graph, start)، گره شروع به‌عنوان یک پارامتر دریافت می‌شود؛ بنابراین خود DFS می‌تواند از هر گره شروع شود. در پیاده‌سازی این برنامه، تابع همیشه با گره «A» فراخوانی می‌شود.',

  },

  {

    id: 'dfs-easy-s3-q3',

    type: 'execution',

    prompt: 'گره A قبلاً بازدید شده و اکنون دوباره از پشته خارج شده است. حالا چه اتفاقی می‌افتد؟',

    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 11 },

    options: [

      { id: 'a', text: 'چون A قبلاً بازدید شده است، این تکرار کار دیگری انجام نمی‌دهد و به خارج کردن گره بعدی از پشته می‌رود' },

      { id: 'b', text: 'A برای بار دوم بازدید می‌شود و همسایه‌های آن دوباره به پشته اضافه می‌شوند' },

      { id: 'c', text: 'الگوریتم بلافاصله متوقف می‌شود، زیرا یک گره نمی‌تواند دو بار از پشته خارج شود' },

      { id: 'd', text: 'یال‌های A از گراف حذف می‌شوند' },

    ],

    correctOptionId: 'a',

    explanation:
      'این دقیقاً همان حالتی است که بررسی خط ۵ برای آن وجود دارد: A از قبل در مجموعهٔ بازدیدشده‌ها قرار دارد، بنابراین شرط «اگر گره در مجموعهٔ بازدیدشده‌ها نیست» برقرار نیست و حلقه بدون انجام کار دیگری روی A، وارد تکرار بعدی خود می‌شود.',

  },

  {

    id: 'dfs-easy-s3-q4',

    type: 'execution',

    prompt: 'گره D برای اولین بار از پشته خارج شده است. چه اتفاقی برای آن می‌افتد؟',

    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 15 },

    options: [

      { id: 'a', text: 'D به‌عنوان بازدیدشده علامت‌گذاری می‌شود، زیرا پیش از این پردازش نشده است' },

      { id: 'b', text: 'D نادیده گرفته می‌شود، زیرا قبلاً بازدید شده است' },

      { id: 'c', text: 'D بدون بازدیدشدن دوباره به پشته اضافه می‌شود' },

      { id: 'd', text: 'الگوریتم پایان می‌یابد، زیرا D فقط یک همسایه دارد' },

    ],

    correctOptionId: 'a',

    explanation:
      'تا این مرحله D در مجموعهٔ بازدیدشده‌ها قرار نگرفته است؛ بنابراین شرط خط ۵ برقرار می‌شود و D به‌عنوان بازدیدشده علامت‌گذاری می‌شود. سپس تنها همسایهٔ آن، یعنی B، به پشته اضافه خواهد شد.',

  },

  {

    id: 'dfs-easy-s3-q5',

    type: 'code',

    prompt: 'جای خالی را در شبه‌کد DFS پر کنید:',

    codeLines: [

      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function dfs(graph, start):', kind: 'plain' }] },

      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'stack = [start], visited = {}', kind: 'plain' }] },

      {

        lineNumber: 3,

        indentLevel: 1,

        tokens: [

          { text: 'while stack is ', kind: 'plain' },

          { text: '____', kind: 'blank' },

          { text: ' empty:', kind: 'plain' },

        ],

      },

      { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'node = stack.pop()', kind: 'plain' }] },

      { lineNumber: 5, indentLevel: 2, tokens: [{ text: 'if node not in visited:', kind: 'plain' }] },

      { lineNumber: 6, indentLevel: 3, tokens: [{ text: 'mark node visited', kind: 'plain' }] },

      { lineNumber: 7, indentLevel: 3, tokens: [{ text: 'push node neighbors onto stack', kind: 'plain' }] },

      { lineNumber: 8, indentLevel: 1, tokens: [{ text: 'return visited', kind: 'plain' }] },

    ],

    options: [

      { id: 'a', text: 'not' },

      { id: 'b', text: 'still' },

      { id: 'c', text: 'never' },

      { id: 'd', text: 'always' },

    ],

    correctOptionId: 'a',

    explanation:
      'حلقه باید تا زمانی اجرا شود که هنوز کاری برای انجام دادن وجود داشته باشد؛ یعنی تا زمانی که پشته «خالی نباشد». وقتی پشته خالی شود، دیگر گرهی برای خارج کردن از پشته وجود ندارد و حلقه باید متوقف شود.',

  },

];