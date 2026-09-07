import {
  ChartInitParams,
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
    ? text.replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)])
    : text;
}

export function mergeSortVisualization(
  arr: number[],
  language: Language = 'en',
): Recording {
  const recorderEngine = new RecorderEngine();

  recorderEngine.beginGroup();

  const logInitParams: LogInitParams = {
    name: 'Log',
    message: language === 'fa' ? 'وضعیت اولیه' : 'Initial State',
  };

  const logRecorder = new LogRecorder(
    recorderEngine,
    logInitParams,
    'Log',
  );

  const chartInitParams: ChartInitParams = {
    name: 'Chart',
    values: arr.map((item, index) => ({
      value: item,
      label: index.toString(),
    })),
  };

  const chartRecorder = new ChartRecorder(
    recorderEngine,
    chartInitParams,
    'Array',
  );

  recorderEngine.endGroup();

  /*
   * Highlights the section currently being processed.
   */
  function highlightSection(
    start: number,
    end: number,
    tag: 'section' | 'sorting',
  ): void {
    chartRecorder.clearCellsHighlight({
      startIndex: 0,
      endIndex: arr.length - 1,
    });

    chartRecorder.setCellsHighlight({
      startIndex: start,
      endIndex: end,
      highlightTags: [tag],
    });
  }

  /*
   * Records the recursive call for a section.
   */
  function recordSortingSection(
    start: number,
    end: number,
  ): void {
    recorderEngine.beginGroup();

    highlightSection(start, end, 'section');

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'مرتب‌سازی یک بخش'
          : 'Sorting a section',

      message:
        language === 'fa'
          ? `بخش آرایه از ایندکس ${n(start, language)} تا ${n(end, language)} برای مرتب‌سازی بررسی می‌شود.`
          : `The section from index ${start} to ${end} is being processed for sorting.`,

      line: 1,
    });

    recorderEngine.endGroup();
  }

  /*
   * Records the base case.
   */
  function recordBaseCase(
    start: number,
    end: number,
  ): void {
    recorderEngine.beginGroup();

    highlightSection(start, end, 'section');

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'بخش تک‌عنصری'
          : 'Single-element section',

      message:
        language === 'fa'
          ? `بخش از ایندکس ${n(start, language)} تا ${n(end, language)} فقط یک عنصر دارد، بنابراین از قبل مرتب است.`
          : `The section from index ${start} to ${end} contains one element, so it is already sorted.`,

      line: 2,
    });

    recorderEngine.endGroup();
  }

  /*
   * Records the midpoint calculation.
   */
  function recordMidpoint(
    start: number,
    end: number,
    mid: number,
  ): void {
    recorderEngine.beginGroup();

    highlightSection(start, end, 'section');

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'محاسبه نقطه میانی'
          : 'Finding the midpoint',

      message:
        language === 'fa'
          ? `نقطه میانی بخش از ایندکس ${n(start, language)} تا ${n(end, language)} برابر با ایندکس ${n(mid, language)} است.`
          : `The midpoint of the section from index ${start} to ${end} is index ${mid}.`,

      line: 3,
    });

    recorderEngine.endGroup();
  }

  /*
   * Records that the left half is about to be recursively sorted.
   */
  function recordLeftRecursiveCall(
    start: number,
    mid: number,
  ): void {
    recorderEngine.beginGroup();

    highlightSection(start, mid, 'section');

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'مرتب‌سازی نیمه چپ'
          : 'Sorting the left half',

      message:
        language === 'fa'
          ? `نیمه چپ، از ایندکس ${n(start, language)} تا ${n(mid, language)}، به‌صورت بازگشتی مرتب می‌شود.`
          : `The left half, from index ${start} to ${mid}, is recursively sorted.`,

      line: 4,
    });

    recorderEngine.endGroup();
  }

  /*
   * Records that the right half is about to be recursively sorted.
   */
  function recordRightRecursiveCall(
    mid: number,
    end: number,
  ): void {
    recorderEngine.beginGroup();

    highlightSection(mid + 1, end, 'section');

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'مرتب‌سازی نیمه راست'
          : 'Sorting the right half',

      message:
        language === 'fa'
          ? `نیمه راست، از ایندکس ${n(mid + 1, language)} تا ${n(end, language)}، به‌صورت بازگشتی مرتب می‌شود.`
          : `The right half, from index ${mid + 1} to ${end}, is recursively sorted.`,

      line: 5,
    });

    recorderEngine.endGroup();
  }

  /*
   * Records the beginning of the merge operation.
   */
  function recordMergeStart(
    start: number,
    mid: number,
    end: number,
  ): void {
    recorderEngine.beginGroup();

    highlightSection(start, end, 'sorting');

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'شروع ادغام'
          : 'Starting the merge',

      message:
        language === 'fa'
          ? `دو نیمه مرتب‌شده از ایندکس ${n(start, language)} تا ${n(end, language)} اکنون با هم ادغام می‌شوند.`
          : `The two sorted halves from index ${start} to ${end} are now being merged.`,

      line: 6,
    });

    recorderEngine.endGroup();
  }

  /*
   * Records the initial pointers used during merge.
   */
  function recordMergePointers(
    start: number,
    mid: number,
    end: number,
  ): void {
    recorderEngine.beginGroup();

    highlightSection(start, end, 'sorting');

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'آماده‌سازی ادغام'
          : 'Preparing the merge',

      message:
        language === 'fa'
          ? `اشاره‌گر نیمه چپ روی ایندکس ${n(start, language)} و اشاره‌گر نیمه راست روی ایندکس ${n(mid + 1, language)} قرار می‌گیرد.`
          : `The left pointer starts at index ${start}, and the right pointer starts at index ${mid + 1}.`,

      line: 8,
    });

    recorderEngine.endGroup();
  }

  /*
   * Records creation of the temporary merged array.
   */
  function recordMergedArrayCreation(
    start: number,
    end: number,
  ): void {
    recorderEngine.beginGroup();

    highlightSection(start, end, 'sorting');

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'ایجاد آرایه موقت'
          : 'Creating the temporary array',

      message:
        language === 'fa'
          ? `یک آرایه موقت خالی برای نگهداری نتیجه ادغام بخش ${n(start, language)} تا ${n(end, language)} ایجاد می‌شود.`
          : `An empty temporary array is created to hold the merged result of the section from ${start} to ${end}.`,

      line: 9,
    });

    recorderEngine.endGroup();
  }

  /*
   * Records comparison between the current elements of the two halves.
   */
  function recordComparison(
    left: number,
    right: number,
  ): void {
    recorderEngine.beginGroup();

    chartRecorder.clearCellsHighlight({
      startIndex: 0,
      endIndex: arr.length - 1,
    });

    chartRecorder.setCellsHighlight({
      startIndex: left,
      endIndex: left,
      highlightTags: ['active'],
    });

    chartRecorder.setCellsHighlight({
      startIndex: right,
      endIndex: right,
      highlightTags: ['sorting'],
    });

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'مقایسه دو عنصر'
          : 'Comparing two elements',

      message:
        language === 'fa'
          ? `عنصر ایندکس ${n(left, language)} با عنصر ایندکس ${n(right, language)} مقایسه می‌شود تا عنصر کوچک‌تر انتخاب شود.`
          : `The element at index ${left} is compared with the element at index ${right} to choose the smaller one.`,

      line: 11,
    });

    recorderEngine.endGroup();
  }

  /*
   * Records taking an element from the left half.
   */
  function recordTakeLeft(
    index: number,
    value: number,
  ): void {
    recorderEngine.beginGroup();

    chartRecorder.setCellsHighlight({
      startIndex: index,
      endIndex: index,
      highlightTags: ['swap'],
    });

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'انتخاب عنصر سمت چپ'
          : 'Taking the left element',

      message:
        language === 'fa'
          ? `عنصر ${n(value, language)} از ایندکس ${n(index, language)} کوچک‌تر یا مساوی است، بنابراین به آرایه موقت اضافه می‌شود.`
          : `The element ${value} at index ${index} is smaller or equal, so it is added to the temporary array.`,

      line: 12,
    });

    recorderEngine.endGroup();
  }

  /*
   * Records taking an element from the right half.
   */
  function recordTakeRight(
    index: number,
    value: number,
  ): void {
    recorderEngine.beginGroup();

    chartRecorder.setCellsHighlight({
      startIndex: index,
      endIndex: index,
      highlightTags: ['swap'],
    });

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'انتخاب عنصر سمت راست'
          : 'Taking the right element',

      message:
        language === 'fa'
          ? `عنصر ${n(value, language)} از ایندکس ${n(index, language)} کوچک‌تر است، بنابراین به آرایه موقت اضافه می‌شود.`
          : `The element ${value} at index ${index} is smaller, so it is added to the temporary array.`,

      line: 14,
    });

    recorderEngine.endGroup();
  }

  /*
   * Records that the remaining elements of the left half are copied.
   */
  function recordRemainingLeft(
    index: number,
    value: number,
  ): void {
    recorderEngine.beginGroup();

    chartRecorder.setCellsHighlight({
      startIndex: index,
      endIndex: index,
      highlightTags: ['swap'],
    });

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'افزودن عناصر باقی‌مانده چپ'
          : 'Adding remaining left elements',

      message:
        language === 'fa'
          ? `عنصر ${n(value, language)} از نیمه چپ باقی مانده است، بنابراین بدون مقایسه بیشتر به آرایه موقت اضافه می‌شود.`
          : `The element ${value} remains in the left half, so it is added to the temporary array without another comparison.`,

      line: 16,
    });

    recorderEngine.endGroup();
  }

  /*
   * Records that the remaining elements of the right half are copied.
   */
  function recordRemainingRight(
    index: number,
    value: number,
  ): void {
    recorderEngine.beginGroup();

    chartRecorder.setCellsHighlight({
      startIndex: index,
      endIndex: index,
      highlightTags: ['swap'],
    });

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'افزودن عناصر باقی‌مانده راست'
          : 'Adding remaining right elements',

      message:
        language === 'fa'
          ? `عنصر ${n(value, language)} از نیمه راست باقی مانده است، بنابراین بدون مقایسه بیشتر به آرایه موقت اضافه می‌شود.`
          : `The element ${value} remains in the right half, so it is added to the temporary array without another comparison.`,

      line: 18,
    });

    recorderEngine.endGroup();
  }

  /*
   * Records copying the completed merged array back into the original
   * array.
   */
  function recordCopyBack(
    start: number,
    end: number,
    merged: number[],
  ): void {
    recorderEngine.beginGroup();

    chartRecorder.clearCellsHighlight({
      startIndex: 0,
      endIndex: arr.length - 1,
    });

    chartRecorder.setCellsHighlight({
      startIndex: start,
      endIndex: end,
      highlightTags: ['sorted'],
    });

    chartRecorder.setCells({
      startIndex: start,
      values: merged.map((item, i) => ({
        value: item,
        label: (start + i).toString(),
      })),
    });

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'بازگرداندن نتیجه ادغام'
          : 'Copying the merged result back',

      message:
        language === 'fa'
          ? `نتیجه مرتب‌شده دوباره از آرایه موقت به بخش ${n(start, language)} تا ${n(end, language)} در آرایه اصلی منتقل می‌شود.`
          : `The sorted result is copied from the temporary array back into the original section from ${start} to ${end}.`,

      line: 19,
    });

    recorderEngine.endGroup();
  }

  function mergeSort(start: number, end: number): void {
    // Line 1
    recordSortingSection(start, end);

    // Line 2
    if (start >= end) {
      recordBaseCase(start, end);
      return;
    }

    const mid = Math.floor((start + end) / 2);

    // Line 3
    recordMidpoint(start, end, mid);

    // Line 4
    recordLeftRecursiveCall(start, mid);
    mergeSort(start, mid);

    // Line 5
    recordRightRecursiveCall(mid, end);
    mergeSort(mid + 1, end);

    // Line 6
    recordMergeStart(start, mid, end);

    // Line 8
    recordMergePointers(start, mid, end);

    // Line 9
    recordMergedArrayCreation(start, end);

    const merged: number[] = [];
    let left = start;
    let right = mid + 1;

    // Lines 10–14
    while (left <= mid && right <= end) {
      recorderEngine.beginGroup();

      chartRecorder.clearCellsHighlight({
        startIndex: 0,
        endIndex: arr.length - 1,
      });

      chartRecorder.setCellsHighlight({
        startIndex: left,
        endIndex: left,
        highlightTags: ['active'],
      });

      chartRecorder.setCellsHighlight({
        startIndex: right,
        endIndex: right,
        highlightTags: ['sorting'],
      });

      logRecorder.setMessage({
        title:
          language === 'fa'
            ? 'بررسی عناصر دو نیمه'
            : 'Checking both halves',

        message:
          language === 'fa'
            ? `عناصر فعلی دو نیمه، در ایندکس‌های ${n(left, language)} و ${n(right, language)}، برای ادغام بررسی می‌شوند.`
            : `The current elements at indexes ${left} and ${right} are checked during the merge.`,

        line: 10,
      });

      recorderEngine.endGroup();

      // Line 11
      recordComparison(left, right);

      if (+arr[left] <= +arr[right]) {
        const value = arr[left];

        // Line 12
        recordTakeLeft(left, value);

        merged.push(value);
        left++;
      } else {
        const value = arr[right];

        // Line 14
        recordTakeRight(right, value);

        merged.push(value);
        right++;
      }
    }

    // Lines 15–16
    while (left <= mid) {
      const value = arr[left];

      recorderEngine.beginGroup();

      chartRecorder.clearCellsHighlight({
        startIndex: 0,
        endIndex: arr.length - 1,
      });

      chartRecorder.setCellsHighlight({
        startIndex: left,
        endIndex: left,
        highlightTags: ['active'],
      });

      logRecorder.setMessage({
        title:
          language === 'fa'
            ? 'باقی‌مانده نیمه چپ'
            : 'Remaining left elements',

        message:
          language === 'fa'
            ? `نیمه راست تمام شده است؛ عنصر باقی‌مانده در ایندکس ${n(left, language)} مستقیماً به نتیجه اضافه می‌شود.`
            : `The right half is exhausted, so the remaining element at index ${left} is added directly to the result.`,

        line: 15,
      });

      recorderEngine.endGroup();

      recordRemainingLeft(left, value);

      merged.push(value);
      left++;
    }

    // Lines 17–18
    while (right <= end) {
      const value = arr[right];

      recorderEngine.beginGroup();

      chartRecorder.clearCellsHighlight({
        startIndex: 0,
        endIndex: arr.length - 1,
      });

      chartRecorder.setCellsHighlight({
        startIndex: right,
        endIndex: right,
        highlightTags: ['active'],
      });

      logRecorder.setMessage({
        title:
          language === 'fa'
            ? 'باقی‌مانده نیمه راست'
            : 'Remaining right elements',

        message:
          language === 'fa'
            ? `نیمه چپ تمام شده است؛ عنصر باقی‌مانده در ایندکس ${n(right, language)} مستقیماً به نتیجه اضافه می‌شود.`
            : `The left half is exhausted, so the remaining element at index ${right} is added directly to the result.`,

        line: 17,
      });

      recorderEngine.endGroup();

      recordRemainingRight(right, value);

      merged.push(value);
      right++;
    }

    // Line 19
    recordCopyBack(start, end, merged);

    for (let i = 0; i < merged.length; i++) {
      arr[start + i] = merged[i];
    }
  }

  mergeSort(0, arr.length - 1);

  // Line 20
  recorderEngine.beginGroup();

  chartRecorder.clearCellsHighlight({
    startIndex: 0,
    endIndex: arr.length - 1,
  });

  chartRecorder.setCellsHighlight({
    startIndex: 0,
    endIndex: arr.length - 1,
    highlightTags: ['sorted'],
  });

  logRecorder.setMessage({
    title:
      language === 'fa'
        ? 'تمام شد!'
        : 'Done!',

    message:
      language === 'fa'
        ? 'تمام بخش‌ها مرتب و با یکدیگر ادغام شده‌اند — آرایه به‌طور کامل مرتب شده است.'
        : 'All sections have been sorted and merged — the array is fully sorted.',

    line: 20,
  });

  recorderEngine.endGroup();

  return recorderEngine.getRecording();
}