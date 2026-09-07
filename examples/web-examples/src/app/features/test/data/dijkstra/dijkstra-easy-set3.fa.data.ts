import type { TestQuestion } from '../../test.types';

import { DIJKSTRA_TEST_GRAPH } from './dijkstra-graph.data';

// مجموعه ۳ / سطح آسان برای دایکسترا.

export const DIJKSTRA_EASY_SET_3_FA: TestQuestion[] = [

  {
    id: 'dijkstra-easy-s3-q1',
    type: 'conceptual',
    prompt: "چرا اگر گراف دارای یال با وزن منفی باشد، نمی‌توان به الگوریتم دایکسترا برای پیدا کردن کوتاه‌ترین مسیر صحیح اعتماد کرد؟",

    options: [
      {
        id: 'a',
        text: "الگوریتم همیشه ابتدا گره‌ای را که در حال حاضر کمترین هزینه را دارد پردازش می‌کند و هزینه آن را نهایی در نظر می‌گیرد؛ اما یک یال منفی که بعداً بررسی شود ممکن است هزینه یک مسیر دیگر را که قبلاً بسته شده است کاهش دهد و دایکسترا دیگر برای بررسی مجدد آن مسیر برنمی‌گردد"
      },
      { id: 'b', text: 'الگوریتم برای همیشه اجرا می‌شود و هیچ‌وقت خاتمه پیدا نمی‌کند' },
      { id: 'c', text: 'به محض مشاهده یک عدد منفی، الگوریتم با خطا متوقف می‌شود' },
      { id: 'd', text: 'وزن‌های منفی در واقع هیچ مشکلی برای دایکسترا ایجاد نمی‌کنند' },
    ],

    correctOptionId: 'a',

    explanation:
      "انتخاب حریصانه دایکسترا — یعنی نهایی در نظر گرفتن گره باز با کمترین هزینه — کاملاً به این فرض وابسته است که اضافه کردن یال‌های بیشتر نمی‌تواند هزینه یک مسیر را کاهش دهد. یک یال با وزن منفی این فرض را نقض می‌کند، زیرا ممکن است یک مسیر طولانی‌تر پس از اضافه شدن یک یال منفی، در نهایت ارزان‌ترین مسیر شود.",
  },

  {
    id: 'dijkstra-easy-s3-q2',
    type: 'conceptual',
    prompt: 'چه شرطی باعث می‌شود این پیاده‌سازی، پیش از خالی شدن مجموعه باز، متوقف شده و مسیر را برگرداند؟',

    options: [
      {
        id: 'a',
        text: 'به محض اینکه گره مقصد به عنوان "current" انتخاب شود؛ یعنی از مجموعه خارج شده و به عنوان ارزان‌ترین گزینه باقی‌مانده انتخاب شود'
      },
      { id: 'b', text: 'زمانی که هزینه گره مقصد برای اولین بار در نمودار هزینه گره‌ها نمایش داده شود' },
      { id: 'c', text: 'زمانی که مجموعه بسته شامل تمام گره‌ها به جز مقصد باشد' },
      { id: 'd', text: 'زمانی که مجموعه باز بیشتر از سه گره داشته باشد' },
    ],

    correctOptionId: 'a',

    explanation:
      "در خط ۵، بلافاصله پس از خارج شدن current به عنوان گره با کمترین هزینه باقی‌مانده، شرط 'if current == end' بررسی می‌شود. در این لحظه هزینه آن گره قطعی و نهایی است؛ بنابراین دیگر نیازی به پردازش سایر گره‌های مجموعه باز که هزینه بیشتری دارند وجود ندارد.",
  },

  {
    id: 'dijkstra-easy-s3-q3',
    type: 'execution',
    prompt: "هزینه گره C به‌تازگی به ۲ به‌روزرسانی شده و یال A-C نیز به عنوان بخشی از بهترین مسیر شناخته‌شده فعلی مشخص شده است. این موضوع چه معنایی دارد؟",

    visualization: { graph: DIJKSTRA_TEST_GRAPH, start: 'A', end: 'F', frameIndex: 9 },

    options: [
      {
        id: 'a',
        text: 'ارزان‌ترین روشی که تاکنون برای رسیدن به C پیدا شده، مستقیماً از A است و هزینه کل این مسیر برابر با ۲ است'
      },
      { id: 'b', text: 'هزینه ۲ برای C یعنی برای رسیدن به آن از دو مسیر جداگانه استفاده شده است' },
      { id: 'c', text: 'گره C اکنون به مجموعه بسته منتقل شده است' },
      { id: 'd', text: 'یال A-C اکنون به‌صورت دائمی از گراف حذف شده است' },
    ],

    correctOptionId: 'a',

    explanation:
      "وزن یال A-C برابر با ۲ است و هزینه خود A برابر با ۰ است؛ بنابراین هزینه موقت C برابر با ۲ می‌شود. از آنجا که ۲ از هزینه قبلی C که هنوز تنظیم نشده بود کمتر است، این به‌روزرسانی انجام می‌شود و یال A-C به عنوان بخشی از بهترین مسیر فعلی به C مشخص می‌شود.",
  },

  {
    id: 'dijkstra-easy-s3-q4',
    type: 'execution',
    prompt: 'در این مرحله مجموعه باز در حال مرتب‌سازی است و در حال حاضر شامل C و B است. چرا C در ابتدای مجموعه قرار می‌گیرد؟',

    visualization: { graph: DIJKSTRA_TEST_GRAPH, start: 'A', end: 'F', frameIndex: 10 },

    options: [
      {
        id: 'a',
        text: 'هزینه C برابر با ۲ است که از هزینه B برابر با ۴ کمتر است و مجموعه باز همیشه از کم‌هزینه‌ترین تا پرهزینه‌ترین گره مرتب می‌شود'
      },
      { id: 'b', text: 'C از نظر حروف الفبا قبل از B قرار می‌گیرد' },
      { id: 'c', text: 'C قبل از B به مجموعه باز اضافه شده است' },
      { id: 'd', text: 'ترتیب مرتب‌سازی هیچ ارتباطی با هزینه ندارد' },
    ],

    correctOptionId: 'a',

    explanation:
      "خط ۴ مجموعه باز را به‌صورت مشخص «بر اساس هزینه» مرتب می‌کند و سپس گره بعدی را انتخاب می‌کند. از آنجا که هزینه C برابر با ۲ و هزینه B برابر با ۴ است، C در ابتدای مجموعه قرار می‌گیرد و تضمین می‌شود که C، نه B، در مرحله بعد خارج و پردازش شود.",
  },

  {
    id: 'dijkstra-easy-s3-q5',
    type: 'code',
    prompt: "جای خالی را در شبه‌کد الگوریتم دایکسترا پر کنید:",

    codeLines: [
      { lineNumber: 1, indentLevel: 0, tokens: [{ text: 'function dijkstra(graph, start, end):', kind: 'plain' }] },

      {
        lineNumber: 2,
        indentLevel: 1,
        tokens: [
          { text: 'cost[start] = ', kind: 'plain' },
          { text: '____', kind: 'blank' },
          { text: ', open = [start]', kind: 'plain' },
        ],
      },

      { lineNumber: 3, indentLevel: 1, tokens: [{ text: 'while open is not empty:', kind: 'plain' }] },
      { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'sort open by cost, current = open.shift()', kind: 'plain' }] },
      { lineNumber: 5, indentLevel: 2, tokens: [{ text: 'if current == end: return path', kind: 'plain' }] },
      { lineNumber: 6, indentLevel: 2, tokens: [{ text: 'for neighbor in graph[current]:', kind: 'plain' }] },
      { lineNumber: 7, indentLevel: 3, tokens: [{ text: 'newCost = cost[current] + weight', kind: 'plain' }] },
      { lineNumber: 8, indentLevel: 3, tokens: [{ text: 'if newCost < cost[neighbor]:', kind: 'plain' }] },
      { lineNumber: 9, indentLevel: 4, tokens: [{ text: 'cost[neighbor] = newCost, open.push(neighbor)', kind: 'plain' }] },
      { lineNumber: 10, indentLevel: 1, tokens: [{ text: 'return no path', kind: 'plain' }] },
    ],

    options: [
      { id: 'a', text: '0' },
      { id: 'b', text: 'Infinity' },
      { id: 'c', text: '1' },
      { id: 'd', text: 'end' },
    ],

    correctOptionId: 'a',

    explanation:
      "رسیدن از گره شروع به خودش هیچ هزینه‌ای ندارد؛ بنابراین cost[start] = 0 باعث می‌شود تمام محاسبات اولیه هزینه‌های موقت از مقدار پایه صحیح، یعنی صفر، شروع شوند.",
  },

];