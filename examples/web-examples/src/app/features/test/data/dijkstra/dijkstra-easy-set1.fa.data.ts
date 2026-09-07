import type { TestQuestion } from '../../test.types';
import { DIJKSTRA_TEST_GRAPH } from './dijkstra-graph.data';

export const DIJKSTRA_EASY_SET_1_FA: TestQuestion[] = [
  {
    id: 'dijkstra-easy-s1-q1',
    type: 'conceptual',
    prompt: 'الگوریتم دایکسترا چه مسئله‌ای را حل می‌کند؟',
    options: [
      { id: 'a', text: 'پیدا کردن کوتاه‌ترین مسیر (کمترین هزینه‌ی کل) از گره‌ی شروع به همه‌ی گره‌های دیگر در یک گراف وزن‌دار' },
      { id: 'b', text: 'بازدید همه‌ی گره‌های یک گراف تا جای ممکن به‌صورت عمیق، پیش از بازگشت' },
      { id: 'c', text: 'مرتب کردن گره‌های گراف بر اساس تعداد همسایه‌هایشان' },
      { id: 'd', text: 'تشخیص اینکه آیا یک گراف حلقه (Cycle) دارد یا نه' },
    ],
    correctOptionId: 'a',
    explanation:
      'دایکسترا برای هر گره یک «کمترین هزینه‌ی شناخته‌شده تا الان» نگه می‌دارد و فقط وقتی آن را به‌روزرسانی می‌کند که مسیر واقعاً ارزان‌تری پیدا شود؛ همین چیزی است که تضمین می‌کند هزینه‌های نهایی، واقعاً کوتاه‌ترین فاصله‌ها باشند.',
  },
  {
    id: 'dijkstra-easy-s1-q2',
    type: 'conceptual',
    prompt: 'چرا دایکسترا همیشه ارزان‌ترین گره در مجموعه‌ی باز (Open Set) را برای پردازش بعدی انتخاب می‌کند؟',
    options: [
      {
        id: 'a',
        text: 'چون وقتی یک گره کمترین هزینه را در میان همه‌ی گزینه‌های باقی‌مانده داشته باشد، هیچ مسیر آینده‌ای از یک گره گران‌تر نمی‌تواند از آن بهتر شود — هزینه‌اش از الان قطعی است',
      },
      { id: 'b', text: 'چون باعث می‌شود الگوریتم گره‌ها را به ترتیب الفبایی بازدید کند' },
      { id: 'c', text: 'چون گره با کمترین هزینه همیشه کمترین همسایه را دارد' },
      { id: 'd', text: 'این یک انتخاب دلبخواهی است و روی درستی الگوریتم اثری ندارد' },
    ],
    correctOptionId: 'a',
    explanation:
      'این همان ایده‌ی حریصانه (Greedy) اصلی پشت دایکستراست: تا وقتی همه‌ی وزن یال‌ها نامنفی باشند، یک مسیر فقط با اضافه‌شدن یال بیشتر می‌تواند گران‌تر شود — پس ارزان‌ترین گره در مجموعه‌ی باز هیچ‌وقت با یک مسیر طولانی‌تر که بعداً کشف می‌شود، شکست نمی‌خورد.',
  },
  {
    id: 'dijkstra-easy-s1-q3',
    type: 'execution',
    prompt: 'الگوریتم همین الان شروع شده است. الان محتوای مجموعه‌ی باز و مجموعه‌ی بسته چیست؟',
    visualization: { graph: DIJKSTRA_TEST_GRAPH, start: 'A', end: 'F', frameIndex: 0 },
    options: [
      { id: 'a', text: 'مجموعه‌ی باز فقط شامل گره‌ی شروع A است، و مجموعه‌ی بسته خالی است' },
      { id: 'b', text: 'مجموعه‌ی باز خالی است، و مجموعه‌ی بسته فقط شامل A است' },
      { id: 'c', text: 'هر دو مجموعه‌ی باز و بسته شامل همه‌ی گره‌های گراف هستند' },
      { id: 'd', text: 'مجموعه‌ی باز شامل همه‌ی گره‌ها به‌جز A است' },
    ],
    correctOptionId: 'a',
    explanation:
      'خط ۲ مقدار cost[start] = 0 و open = [start] را مقداردهی اولیه می‌کند — پس در همان ابتدا، A تنها عضو مجموعه‌ی باز است و هنوز چیزی به مجموعه‌ی بسته منتقل نشده.',
  },
  {
    id: 'dijkstra-easy-s1-q4',
    type: 'execution',
    prompt: 'گره A همین الان از مجموعه‌ی باز به مجموعه‌ی بسته منتقل شده است. این چه چیزی درباره‌ی A نشان می‌دهد؟',
    visualization: { graph: DIJKSTRA_TEST_GRAPH, start: 'A', end: 'F', frameIndex: 3 },
    options: [
      {
        id: 'a',
        text: 'A اکنون کاملاً پردازش‌شده در نظر گرفته می‌شود — هزینه‌ی کوتاه‌ترین مسیرش (۰) قطعی است، و الگوریتم به بررسی همسایه‌های A می‌رود',
      },
      { id: 'b', text: 'A به‌طور کامل از گراف حذف شده است' },
      { id: 'c', text: 'هزینه‌ی A همچنان می‌تواند بعداً در روند اجرا تغییر کند' },
      { id: 'd', text: 'الگوریتم تمام شده است، چون A گره‌ی شروع است' },
    ],
    correctOptionId: 'a',
    explanation:
      'انتقال یک گره به مجموعه‌ی بسته (گام «بازدید یک گره» در خط ۳) آن را تمام‌شده علامت می‌زند — هزینه‌اش قطعی می‌شود، و گام بعدی بلافاصله بررسی همسایه‌هایش در خط ۶ است تا ببیند آیا عبور از A مسیر ارزان‌تری برای هرکدام فراهم می‌کند یا نه.',
  },
  {
    id: 'dijkstra-easy-s1-q5',
    type: 'code',
    prompt: 'جای خالی را در شبه‌کد دایکسترا کامل کنید:',
    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function dijkstra(graph, start, end):', kind: 'plain' }] },
      { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'cost[start] = 0, open = [start]', kind: 'plain' }] },
      { lineNumber: 3, indentLevel: 1, tokens: [{ text: 'while open is not empty:', kind: 'plain' }] },
      {
        lineNumber: 4,
        indentLevel: 2,
        tokens: [
          { text: 'sort open by cost, current = open.', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: '()', kind: 'plain' },
        ],
      },
      { lineNumber: 5, indentLevel: 2, tokens: [{ text: 'if current == end: return path', kind: 'plain' }] },
      { lineNumber: 6, indentLevel: 2, tokens: [{ text: 'for neighbor in graph[current]:', kind: 'plain' }] },
      { lineNumber: 7, indentLevel: 3, tokens: [{ text: 'newCost = cost[current] + weight', kind: 'plain' }] },
      { lineNumber: 8, indentLevel: 3, tokens: [{ text: 'if newCost < cost[neighbor]:', kind: 'plain' }] },
      { lineNumber: 9, indentLevel: 4, tokens: [{ text: 'cost[neighbor] = newCost, open.push(neighbor)', kind: 'plain' }] },
      { lineNumber: 10, indentLevel: 1, tokens: [{ text: 'return no path', kind: 'plain' }] },
    ],
    options: [
      { id: 'a', text: 'shift' },
      { id: 'b', text: 'pop' },
      { id: 'c', text: 'sort' },
      { id: 'd', text: 'push' },
    ],
    correctOptionId: 'a',
    explanation:
      'چون مجموعه‌ی باز تازه بر اساس هزینه مرتب شده و ارزان‌ترین گره اول است، ()shift همان اولین عضو (کم‌هزینه‌ترین) را حذف می‌کند — درحالی‌که ()pop گران‌ترین عضو را از انتهای لیست مرتب‌شده حذف می‌کرد.',
  },
];