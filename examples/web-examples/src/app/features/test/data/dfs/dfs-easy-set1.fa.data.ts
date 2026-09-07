import type { TestQuestion } from '../../test.types';
import { DFS_TEST_GRAPH } from './dfs-graph.data';

export const DFS_EASY_SET_1_FA: TestQuestion[] = [
  {
    id: 'dfs-easy-s1-q1',
    type: 'conceptual',
    prompt: 'هدف اصلی جستجوی اول عمق (DFS) چیست؟',
    options: [
      { id: 'a', text: 'پیش رفتن تا جای ممکن در یک مسیر، پیش از بازگشت (backtrack) و امتحان مسیر دیگر' },
      { id: 'b', text: 'بازدید همه‌ی گره‌های هم‌فاصله از نقطه‌ی شروع، پیش از رفتن به عمق بیشتر' },
      { id: 'c', text: 'پیدا کردن کوتاه‌ترین مسیر بین دو گره در یک گراف وزن‌دار' },
      { id: 'd', text: 'مرتب کردن گره‌های گراف بر اساس مقدار عددی‌شان' },
    ],
    correctOptionId: 'a',
    explanation:
      'DFS روی یک مسیر متعهد می‌شود و تا جایی که بشود آن را دنبال می‌کند، و فقط وقتی به بن‌بست رسید، بازمی‌گردد — همین رفتار «اول برو عمیق» دلیل نام‌گذاری آن است.',
  },
  {
    id: 'dfs-easy-s1-q2',
    type: 'conceptual',
    prompt: 'این پیاده‌سازی DFS از چه ساختار داده‌ای برای تعیین گره‌ی بعدی استفاده می‌کند؟',
    options: [
      { id: 'a', text: 'یک پشته (Stack)، بنابراین آخرین گره‌ی کشف‌شده زودتر بازدید می‌شود' },
      { id: 'b', text: 'یک صف (Queue)، بنابراین اولین گره‌ی کشف‌شده زودتر بازدید می‌شود' },
      { id: 'c', text: 'یک لیست مرتب‌شده، بنابراین گره با کوچک‌ترین مقدار زودتر بازدید می‌شود' },
      { id: 'd', text: 'یک صف اولویت‌دار بر اساس فاصله از نقطه‌ی شروع' },
    ],
    correctOptionId: 'a',
    explanation:
      'پشته به‌صورت Last-In-First-Out کار می‌کند، پس همسایه‌ای که آخر از همه اضافه شده، اول از همه برداشته می‌شود. دقیقاً همین رفتار باعث می‌شود پیمایش در یک مسیر به عمق برود، به‌جای اینکه یکنواخت پخش شود — کاری که یک صف (مورد استفاده در BFS) انجام می‌دهد.',
  },
  {
    id: 'dfs-easy-s1-q3',
    type: 'execution',
    prompt: 'پیمایش تازه شروع شده است. در همین اولین گام چه اتفاقی می‌افتد؟',
    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 0 },
    options: [
      { id: 'a', text: 'گره A، تنها عضو پشته، برای تبدیل‌شدن به گره‌ی جاری برداشته می‌شود' },
      { id: 'b', text: 'گره A بدون اینکه برداشته شود بلافاصله بازدیدشده علامت می‌خورد' },
      { id: 'c', text: 'همه‌ی همسایه‌های A پیش از خود A بازدید می‌شوند' },
      { id: 'd', text: 'پشته از ابتدا خالی است و الگوریتم بلافاصله پایان می‌یابد' },
    ],
    correctOptionId: 'a',
    explanation:
      'پشته همیشه با [A] شروع می‌شود، چون DFS از گره‌ی شروع ثابت‌شده آغاز می‌کند. اولین کاری که حلقه انجام می‌دهد، برداشتن همین تک عضو از پشته است، که A را به گره‌ی جاری برای پردازش تبدیل می‌کند.',
  },
  {
    id: 'dfs-easy-s1-q4',
    type: 'execution',
    prompt: 'گره A همین الان برداشته و بازدیدشده علامت خورده است. بعدش چه می‌شود؟',
    visualization: { graph: DFS_TEST_GRAPH, frameIndex: 2 },
    options: [
      { id: 'a', text: 'همسایه‌های A یعنی B و C، برای بررسی بعدی، به پشته اضافه می‌شوند' },
      { id: 'b', text: 'الگوریتم پایان می‌یابد، چون A همسایه‌ی بازدیدنشده‌ای ندارد' },
      { id: 'c', text: 'همسایه‌های A بدون اضافه‌شدن به پشته، بلافاصله بازدیدشده علامت می‌خورند' },
      { id: 'd', text: 'پشته پاک و از حالت خالی دوباره شروع می‌شود' },
    ],
    correctOptionId: 'a',
    explanation:
      'وقتی یک گره بازدید می‌شود، همسایه‌هایش (اینجا B و C) به پشته اضافه می‌شوند — نه اینکه بلافاصله بازدید شوند — تا هرکدام در تکرار بعدی حلقه برداشته و پردازش شوند.',
  },
  {
    id: 'dfs-easy-s1-q5',
    type: 'code',
    prompt: 'جای خالی را در شبه‌کد DFS کامل کنید:',
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function dfs(graph, start):', kind: 'plain' }] },
      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'stack = [start], visited = {}', kind: 'plain' }] },
      { lineNumber: 3, indentLevel: 1, tokens: [{ text: 'while stack is not empty:', kind: 'plain' }] },
      {
        lineNumber: 4,
        indentLevel: 2,
        tokens: [
          { text: 'node = stack.', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: '()', kind: 'plain' },
        ],
      },
      { lineNumber: 5, indentLevel: 2, tokens: [{ text: 'if node not in visited:', kind: 'plain' }] },
      { lineNumber: 6, indentLevel: 3, tokens: [{ text: 'mark node visited', kind: 'plain' }] },
      { lineNumber: 7, indentLevel: 3, tokens: [{ text: 'push node neighbors onto stack', kind: 'plain' }] },
      { lineNumber: 8, indentLevel: 1, tokens: [{ text: 'return visited', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: 'pop' },
      { id: 'b', text: 'shift' },
      { id: 'c', text: 'peek' },
      { id: 'd', text: 'sort' },
    ],
    correctOptionId: 'a',
    explanation:
      'تابع ()pop آخرین عضو اضافه‌شده به پشته را حذف کرده و برمی‌گرداند. همین حذفِ به‌روش Last-In-First-Out باعث می‌شود پیمایش در یک مسیر به عمق برود — استفاده از ()shift (اول‌ورودی-اول‌خروجی) به‌جای آن، این الگوریتم را به BFS تبدیل می‌کرد.',
  },
];

