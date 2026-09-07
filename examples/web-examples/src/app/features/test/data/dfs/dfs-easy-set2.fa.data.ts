import type { TestQuestion } from '../../test.types';

import { DFS_TEST_GRAPH } from './dfs-graph.data';

// مجموعه ۲ / سطح آسان برای DFS.

export const DFS_EASY_SET_2_FA: TestQuestion[] = [

  {

    id: 'dfs-easy-s2-q1',

    type: 'conceptual',

    prompt: 'چرا DFS به مجموعهٔ بازدیدشده‌ها (visited) نیاز دارد؟',

    options: [

      { id: 'a', text: 'برای جلوگیری از پردازش بیش از یک‌بارهٔ یک گره؛ این موضوع به‌ویژه در گراف‌های دارای چرخه اهمیت دارد' },

      { id: 'b', text: 'برای ثبت گره‌هایی که بیشترین مقدار را دارند' },

      { id: 'c', text: 'برای ذخیرهٔ کوتاه‌ترین فاصله از گره شروع تا هر گره دیگر' },

      { id: 'd', text: 'برای تعیین ترتیب نمایش همسایه‌ها در گراف ورودی' },

    ],

    correctOptionId: 'a',

    explanation:
      'بدون مجموعهٔ بازدیدشده‌ها، وجود یک چرخه در گراف باعث می‌شود DFS بین همان گره‌ها برای همیشه رفت‌وبرگشت کند. بررسی «اگر گره در مجموعهٔ بازدیدشده‌ها نیست» پیش از پردازش گره، تضمین می‌کند که هر گره دقیقاً یک بار پردازش شود.',

  },

  {

    id: 'dfs-easy-s2-q2',

    type: 'conceptual',

    prompt: 'DFS از نظر ترتیب بازدید گره‌ها چه تفاوتی با BFS دارد؟',

    options: [

      { id: 'a', text: 'DFS ابتدا در یک شاخه تا حد امکان عمیق می‌شود و سپس به عقب بازمی‌گردد؛ در حالی که BFS ابتدا همهٔ همسایه‌های موجود در عمق فعلی را بررسی می‌کند و سپس به عمق بعدی می‌رود' },

      { id: 'b', text: 'DFS و BFS همیشه گره‌ها را دقیقاً با یک ترتیب بازدید می‌کنند' },

      { id: 'c', text: 'DFS گره‌ها را به ترتیب حروف الفبا و BFS آن‌ها را به ترتیب عددی بازدید می‌کند' },

      { id: 'd', text: 'DFS فقط روی درخت‌ها کار می‌کند، در حالی که BFS فقط روی گراف‌های عمومی کار می‌کند' },

    ],

    correctOptionId: 'a',

    explanation:
      'این دو الگوریتم یک گراف یکسان را به دو روش کاملاً متفاوت پیمایش می‌کنند که دلیل آن ساختار دادهٔ مورد استفاده است: پشتهٔ DFS روی یک مسیر متمرکز می‌شود، در حالی که صف BFS به‌صورت سطح‌به‌سطح به سمت بیرون گسترش پیدا می‌کند.',

  },

  {

    id: 'dfs-easy-s2-q3',

    type: 'execution',

    prompt: 'در حال حاضر پشته شامل [C, B] است و B در بالای پشته قرار دارد. در مرحلهٔ بعد چه اتفاقی می‌افتد؟',

    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 6 },

    options: [

      { id: 'a', text: 'B از بالای پشته خارج شده و به‌عنوان بازدیدشده علامت‌گذاری می‌شود' },

      { id: 'b', text: 'C خارج می‌شود، زیرا زودتر از B به پشته اضافه شده است' },

      { id: 'c', text: 'هر دو گره B و C در این مرحله از پشته خارج شده و بازدید می‌شوند' },

      { id: 'd', text: 'الگوریتم پایان می‌یابد، زیرا پشته هنوز دو ورودی دارد' },

    ],

    correctOptionId: 'a',

    explanation:
      'پشته همیشه عنصر موجود در بالای خود را خارج می‌کند و B پس از C به پشته اضافه شده است؛ بنابراین B ابتدا خارج و پردازش می‌شود. این همان ترتیب «آخرین ورودی، اولین خروجی» است که رفتار عمق‌اول DFS را ایجاد می‌کند.',

  },

  {

    id: 'dfs-easy-s2-q4',

    type: 'execution',

    prompt: 'B به‌تازگی بازدید شده است. فهرست همسایه‌های B برابر [A, D, E] است و A قبلاً بازدید شده است. در اینجا چه اتفاقی برای A می‌افتد؟',

    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 7 },

    options: [

      { id: 'a', text: 'A با وجود بازدیدشدن دوباره به پشته اضافه می‌شود؛ بررسی بازدیدشدن آن بعداً و هنگام خارج شدن از پشته انجام می‌شود' },

      { id: 'b', text: 'A کاملاً نادیده گرفته می‌شود و به پشته اضافه نمی‌شود، زیرا الگوریتم از قبل می‌داند که بازدید شده است' },

      { id: 'c', text: 'الگوریتم خطا ایجاد می‌کند، زیرا A دو بار در فهرست همسایه‌های B ظاهر شده است' },

      { id: 'd', text: 'A از گراف حذف می‌شود تا دیگر نتوان آن را به پشته اضافه کرد' },

    ],

    correctOptionId: 'a',

    explanation:
      'در این پیاده‌سازی، همهٔ همسایه‌ها بدون بررسی وضعیت بازدیدشدن، مستقیماً به پشته اضافه می‌شوند؛ خط ۷ همهٔ همسایه‌های یک گره را بدون شرط به پشته اضافه می‌کند. بررسی «اگر گره در مجموعهٔ بازدیدشده‌ها نیست» تنها بعداً و زمانی انجام می‌شود که گره واقعاً از پشته خارج شود.',

  },

  {

    id: 'dfs-easy-s2-q5',

    type: 'code',

    prompt: 'جای خالی را در شبه‌کد DFS پر کنید:',

    codeLines: [

      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function dfs(graph, start):', kind: 'plain' }] },

      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'stack = [start], visited = {}', kind: 'plain' }] },

      { lineNumber: 3, indentLevel: 1, tokens: [{ text: 'while stack is not empty:', kind: 'plain' }] },

      { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'node = stack.pop()', kind: 'plain' }] },

      {
        lineNumber: 5,
        indentLevel: 2,
        tokens: [
          { text: 'if node ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ' visited:', kind: 'plain' },
        ],
      },

      { lineNumber: 6, indentLevel: 3, tokens: [{ text: 'mark node visited', kind: 'plain' }] },

      { lineNumber: 7, indentLevel: 3, tokens: [{ text: 'push node neighbors onto stack', kind: 'plain' }] },

      { lineNumber: 8, indentLevel: 1, tokens: [{ text: 'return visited', kind: 'plain' }] },

    ],

    options: [

      { id: 'a', text: 'not in' },

      { id: 'b', text: 'in' },

      { id: 'c', text: 'equals' },

      { id: 'd', text: 'greater than' },

    ],

    correctOptionId: 'a',

    explanation:
      'الگوریتم باید هر گره را فقط در اولین باری که از پشته خارج می‌شود پردازش کند. عبارت «not in» از پردازش مجدد گره‌ای جلوگیری می‌کند که ممکن است بیش از یک بار به پشته اضافه شده باشد؛ اتفاقی که به دلیل اضافه شدن همسایه‌ها بدون بررسی قبلی وضعیت بازدیدشدن، بسیار رایج است.',

  },

];