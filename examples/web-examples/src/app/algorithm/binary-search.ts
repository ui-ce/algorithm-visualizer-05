import {
  ChartRecorder,
  LogInitParams,
  LogRecorder,
  RecorderEngine,
  Recording,
} from '@algorithm-visualizer/typescript-recorder';

import type { Language } from '../core/services/language.service';

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

function n(value: number, language: Language): string {
  const text = String(value);

  return language === 'fa'
    ? text.replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[Number(digit)])
    : text;
}

// Pseudocode line numbers correspond exactly to the execution below:
//
// 1  function binarySearch(arr, target):
// 2    left = 0, right = length(arr) - 1
// 3    while left <= right:
// 4      mid = (left + right) / 2
// 5      if arr[mid] == target: return mid
// 6      else if arr[mid] < target: left = mid + 1
// 7      else: right = mid - 1
// 8    return not found

export function binarySearchVisualization(
  array: number[],
  target: number,
  language: Language = 'en',
): Recording {
  const recorderEngine = new RecorderEngine();

  // ------------------------------------------------------------
  // Initial state — line 2
  // ------------------------------------------------------------

  recorderEngine.beginGroup();

  const logInitParam: LogInitParams = {
    name: 'Log',
    message:
      language === 'fa'
        ? 'حالت اولیه'
        : 'Initial state',
    title:
      language === 'fa'
        ? 'شروع جست‌وجوی دودویی'
        : 'Getting started',
    line: 2,
  };

  const logRecorder = new LogRecorder(
    recorderEngine,
    logInitParam,
  );

  const chartRecorder = new ChartRecorder(recorderEngine, {
    name: 'Array',
    values: array.map((value, index) => ({
      value,
      label: index.toString(),
    })),
  });

  recorderEngine.endGroup();

  let left = 0;
  let right = array.length - 1;

  // ------------------------------------------------------------
  // Line 3 — while left <= right
  // ------------------------------------------------------------

  while (left <= right) {
    recorderEngine.beginGroup();

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'بررسی محدوده جست‌وجو'
          : 'Checking the search range',

      message:
        language === 'fa'
          ? `محدوده جست‌وجو از شاخص ${n(left, language)} تا ${n(right, language)} است.`
          : `The current search range is from index ${left} to ${right}.`,

      line: 3,
    });

    chartRecorder.clearCellsHighlight({
      startIndex: 0,
      endIndex: array.length - 1,
    });

    chartRecorder.setCellsHighlight({
      startIndex: left,
      endIndex: right,
      highlightTags: ['section'],
    });

    recorderEngine.endGroup();

    // ----------------------------------------------------------
    // Line 4 — calculate middle
    // ----------------------------------------------------------

    const mid = Math.floor((left + right) / 2);

    recorderEngine.beginGroup();

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'محاسبه عنصر میانی'
          : 'Calculating the middle element',

      message:
        language === 'fa'
          ? `شاخص میانی محدوده ${n(mid, language)} است؛ مقدار این خانه ${n(array[mid], language)} است.`
          : `The middle index is ${mid}, and its value is ${array[mid]}.`,

      line: 4,
    });

    chartRecorder.setCellsHighlight({
      startIndex: mid,
      endIndex: mid,
      highlightTags: ['middle'],
    });

    recorderEngine.endGroup();

    // ----------------------------------------------------------
    // Line 5 — arr[mid] == target
    // ------------------------------------------------------------

    if (array[mid] === target) {
      recorderEngine.beginGroup();

      logRecorder.setMessage({
        title:
          language === 'fa'
            ? 'عنصر پیدا شد'
            : 'Element found',

        message:
          language === 'fa'
            ? `مقدار ${n(target, language)} در شاخص ${n(mid, language)} قرار دارد؛ جست‌وجو با موفقیت پایان یافت.`
            : `The target value ${target} is at index ${mid}, so the search is complete.`,

        line: 5,
      });

      chartRecorder.clearCellsHighlight({
        startIndex: 0,
        endIndex: array.length - 1,
      });

      chartRecorder.setCellsHighlight({
        startIndex: mid,
        endIndex: mid,
        highlightTags: ['target'],
      });

      recorderEngine.endGroup();

      return recorderEngine.getRecording();
    }

    // ----------------------------------------------------------
    // Line 6 — arr[mid] < target
    // ------------------------------------------------------------

    if (array[mid] < target) {
      recorderEngine.beginGroup();

      logRecorder.setMessage({
        title:
          language === 'fa'
            ? 'حرکت به نیمه راست'
            : 'Searching the right half',

        message:
          language === 'fa'
            ? `مقدار ${n(array[mid], language)} از مقدار هدف ${n(target, language)} کوچک‌تر است؛ بنابراین نیمه چپ حذف می‌شود و جست‌وجو به سمت راست ادامه پیدا می‌کند.`
            : `The middle value ${array[mid]} is smaller than the target ${target}, so the left half can be eliminated.`,

        line: 6,
      });

      chartRecorder.setCellsHighlight({
        startIndex: left,
        endIndex: mid,
        highlightTags: ['eliminated'],
      });

      recorderEngine.endGroup();

      // --------------------------------------------------------
      // Update left boundary after line 6
      // --------------------------------------------------------

      left = mid + 1;

      recorderEngine.beginGroup();

      logRecorder.setMessage({
        title:
          language === 'fa'
            ? 'به‌روزرسانی محدوده راست'
            : 'Updating the search range',

        message:
          language === 'fa'
            ? `شاخص شروع جست‌وجوی جدید به ${n(left, language)} تغییر کرد.`
            : `The new left boundary is ${left}.`,

        line: 6,
      });

      chartRecorder.clearCellsHighlight({
        startIndex: 0,
        endIndex: array.length - 1,
      });

      if (left <= right) {
        chartRecorder.setCellsHighlight({
          startIndex: left,
          endIndex: right,
          highlightTags: ['section'],
        });
      }

      recorderEngine.endGroup();

      continue;
    }

    // ----------------------------------------------------------
    // Line 7 — arr[mid] > target
    // ----------------------------------------------------------

    recorderEngine.beginGroup();

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'حرکت به نیمه چپ'
          : 'Searching the left half',

      message:
        language === 'fa'
          ? `مقدار ${n(array[mid], language)} از مقدار هدف ${n(target, language)} بزرگ‌تر است؛ بنابراین نیمه راست حذف می‌شود و جست‌وجو به سمت چپ ادامه پیدا می‌کند.`
          : `The middle value ${array[mid]} is greater than the target ${target}, so the right half can be eliminated.`,

      line: 7,
    });

    chartRecorder.setCellsHighlight({
      startIndex: mid,
      endIndex: right,
      highlightTags: ['eliminated'],
    });

    recorderEngine.endGroup();

    // ----------------------------------------------------------
    // Update right boundary after line 7
    // ----------------------------------------------------------

    right = mid - 1;

    recorderEngine.beginGroup();

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'به‌روزرسانی محدوده جست‌وجو'
          : 'Updating the search range',

      message:
        language === 'fa'
          ? `شاخص پایان جست‌وجوی جدید به ${n(right, language)} تغییر کرد.`
          : `The new right boundary is ${right}.`,

      line: 7,
    });

    chartRecorder.clearCellsHighlight({
      startIndex: 0,
      endIndex: array.length - 1,
    });

    if (left <= right) {
      chartRecorder.setCellsHighlight({
        startIndex: left,
        endIndex: right,
        highlightTags: ['section'],
      });
    }

    recorderEngine.endGroup();
  }

  // ------------------------------------------------------------
  // Line 8 — target was not found
  // ------------------------------------------------------------

  recorderEngine.beginGroup();

  logRecorder.setMessage({
    title:
      language === 'fa'
        ? 'عنصر پیدا نشد'
        : 'Not found',

    message:
      language === 'fa'
        ? `مقدار ${n(target, language)} در آرایه وجود ندارد. محدوده جست‌وجو کاملاً بررسی و حذف شده است.`
        : `The value ${target} does not appear in the array. The entire search range has been eliminated.`,

    line: 8,
  });

  chartRecorder.clearCellsHighlight({
    startIndex: 0,
    endIndex: array.length - 1,
  });

  recorderEngine.endGroup();

  return recorderEngine.getRecording();
}