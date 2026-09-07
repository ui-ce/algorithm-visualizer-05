import {
  ChartRecorder,
  LogRecorder,
  RecorderEngine,
  Recording,
} from '@algorithm-visualizer/typescript-recorder';
import type { Language } from '../core/services/language.service';

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

function n(value: number, language: Language): string {
  const text = String(value);

  return language === 'fa'
    ? text.replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)])
    : text;
}

export function linearSearchVisualization(
  array: number[],
  target: number,
  language: Language = 'en',
): Recording {
  const recorderEngine = new RecorderEngine();

  recorderEngine.beginGroup();

  const logRecorder = new LogRecorder(recorderEngine, {
    name: 'Log',
    message:
      language === 'fa'
        ? 'جستجوی خطی آغاز می‌شود.'
        : 'Linear search is starting.',
    title:
      language === 'fa'
        ? 'شروع جستجو'
        : 'Starting the search',
    line: 1,
  });

  const chartRecorder = new ChartRecorder(recorderEngine, {
    name: 'Array',
    values: array.map((value, index) => ({
      value,
      label: index.toString(),
    })),
  });

  recorderEngine.endGroup();

  /*
   * Line 2:
   * for i = 0 to length(arr) - 1
   *
   * Each iteration gets its own frame so the learner can clearly see
   * the algorithm moving from one array position to the next.
   */
  for (let i = 0; i < array.length; i++) {
    recorderEngine.beginGroup();

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'رفتن به عنصر بعدی'
          : 'Moving to the next element',
      message:
        language === 'fa'
          ? `اکنون بررسی از شاخص ${n(i, language)} آغاز می‌شود.`
          : `The search now moves to index ${i}.`,
      line: 2,
    });

    chartRecorder.clearCellsHighlight({
      startIndex: 0,
      endIndex: array.length - 1,
    });

    chartRecorder.setCellsHighlight({
      startIndex: i,
      endIndex: i,
      highlightTags: ['compare'],
    });

    recorderEngine.endGroup();

    /*
     * Line 3:
     * if arr[i] == target
     *
     * This is intentionally a separate frame from line 2.
     * The learner first sees which element is selected, then sees
     * the actual comparison.
     */
    recorderEngine.beginGroup();

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'مقایسه با مقدار هدف'
          : 'Comparing with the target',
      message:
        language === 'fa'
          ? `عنصر شاخص ${n(i, language)} با مقدار هدف ${n(target, language)} مقایسه می‌شود.`
          : `The element at index ${i} is compared with the target value ${target}.`,
      line: 3,
    });

    chartRecorder.setCellsHighlight({
      startIndex: i,
      endIndex: i,
      highlightTags: ['compare'],
    });

    recorderEngine.endGroup();

    /*
     * The result of line 3.
     */
    if (array[i] === target) {
      /*
       * Line 4:
       * return i
       */
      recorderEngine.beginGroup();

      logRecorder.setMessage({
        title:
          language === 'fa'
            ? 'مقدار پیدا شد'
            : 'Target found',
        message:
          language === 'fa'
            ? `مقدار هدف ${n(target, language)} در شاخص ${n(i, language)} پیدا شد.`
            : `The target value ${target} was found at index ${i}.`,
        line: 4,
      });

      chartRecorder.clearCellsHighlight({
        startIndex: 0,
        endIndex: array.length - 1,
      });

      chartRecorder.setCellsHighlight({
        startIndex: i,
        endIndex: i,
        highlightTags: ['target'],
      });

      recorderEngine.endGroup();

      return recorderEngine.getRecording();
    }

    /*
     * The comparison was false.
     * Keep this as a separate frame so the learner sees why the
     * algorithm continues instead of jumping directly to the next i.
     */
    recorderEngine.beginGroup();

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'مقدار برابر نیست'
          : 'Not a match',
      message:
        language === 'fa'
          ? `مقدار ${n(array[i], language)} با هدف ${n(target, language)} برابر نیست؛ جستجو ادامه پیدا می‌کند.`
          : `The value ${array[i]} is not equal to the target ${target}, so the search continues.`,
      line: 3,
    });

    chartRecorder.setCellsHighlight({
      startIndex: i,
      endIndex: i,
      highlightTags: ['eliminated'],
    });

    recorderEngine.endGroup();
  }

  /*
   * Line 5:
   * return not found
   */
  recorderEngine.beginGroup();

  logRecorder.setMessage({
    title:
      language === 'fa'
        ? 'پیدا نشد'
        : 'Not found',
    message:
      language === 'fa'
        ? `مقدار ${n(target, language)} در آرایه پیدا نشد.`
        : `The target value ${target} does not appear in the array.`,
    line: 5,
  });

  chartRecorder.clearCellsHighlight({
    startIndex: 0,
    endIndex: array.length - 1,
  });

  recorderEngine.endGroup();

  return recorderEngine.getRecording();
}