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

export function selectionSortVisualization(
  arr: number[],
  language: Language = 'en',
): Recording {
  const recorderEngine = new RecorderEngine();

  // ------------------------------------------------------------
  // Initial state
  // ------------------------------------------------------------

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
    values: arr.map((value, index) => ({
      value,
      label: n(index, language),
    })),
  };

  const chartRecorder = new ChartRecorder(
    recorderEngine,
    chartInitParams,
    'Array',
  );

  recorderEngine.endGroup();

  const length = arr.length;

  // ------------------------------------------------------------
  // Empty array
  // ------------------------------------------------------------

  if (length === 0) {
    recorderEngine.beginGroup();

    logRecorder.setMessage({
      title: language === 'fa' ? 'آرایه خالی' : 'Empty array',
      message:
        language === 'fa'
          ? 'آرایه ورودی خالی است و نیازی به مرتب‌سازی ندارد.'
          : 'The input array is empty, so no sorting is required.',
      line: 8,
    });

    recorderEngine.endGroup();

    return recorderEngine.getRecording();
  }

  // ------------------------------------------------------------
  // Line 1
  // function selectionSort(arr)
  // ------------------------------------------------------------

  recorderEngine.beginGroup();

  logRecorder.setMessage({
    title:
      language === 'fa'
        ? 'شروع Selection Sort'
        : 'Starting Selection Sort',
    message:
      language === 'fa'
        ? `مرتب‌سازی انتخابی برای آرایه با ${n(
            length,
            language,
          )} عنصر آغاز می‌شود.`
        : `Selection Sort starts with an array of ${length} elements.`,
    line: 1,
  });

  recorderEngine.endGroup();

  // ------------------------------------------------------------
  // Line 2
  // for i = 0 to n - 2
  // ------------------------------------------------------------

  for (let i = 0; i < length - 1; i++) {
    recorderEngine.beginGroup();

    chartRecorder.clearCellsHighlight({
      startIndex: 0,
      endIndex: length - 1,
    });

    // Already sorted prefix
    if (i > 0) {
      chartRecorder.setCellsHighlight({
        startIndex: 0,
        endIndex: i - 1,
        highlightTags: ['sorted'],
      });
    }

    // Current position being filled
    chartRecorder.setCellsHighlight({
      startIndex: i,
      endIndex: i,
      highlightTags: ['min'],
    });

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'شروع یک دور جدید'
          : 'Starting a new pass',
      message:
        language === 'fa'
          ? `دور جدید از شاخص ${n(
              i,
              language,
            )} آغاز می‌شود. هدف، پیدا کردن کوچک‌ترین عنصر باقی‌مانده برای قرار دادن در این جایگاه است.`
          : `A new pass starts at index ${i}. The goal is to find the smallest remaining element for this position.`,
      line: 2,
    });

    recorderEngine.endGroup();

    // ----------------------------------------------------------
    // Line 3
    // minIndex = i
    // ----------------------------------------------------------

    let minIndex = i;

    recorderEngine.beginGroup();

    chartRecorder.clearCellsHighlight({
      startIndex: 0,
      endIndex: length - 1,
    });

    if (i > 0) {
      chartRecorder.setCellsHighlight({
        startIndex: 0,
        endIndex: i - 1,
        highlightTags: ['sorted'],
      });
    }

    chartRecorder.setCellsHighlight({
      startIndex: minIndex,
      endIndex: minIndex,
      highlightTags: ['min'],
    });

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'تعیین کوچک‌ترین فعلی'
          : 'Setting the current minimum',
      message:
        language === 'fa'
          ? `در ابتدای این دور، عنصر شاخص ${n(
              i,
              language,
            )} به‌عنوان کوچک‌ترین عنصر فعلی در نظر گرفته می‌شود.`
          : `At the start of this pass, the element at index ${i} is considered the current minimum.`,
      line: 3,
    });

    recorderEngine.endGroup();

    // ----------------------------------------------------------
    // Line 4
    // for j = i + 1 to n - 1
    // ----------------------------------------------------------

    for (let j = i + 1; j < length; j++) {
      recorderEngine.beginGroup();

      chartRecorder.clearCellsHighlight({
        startIndex: 0,
        endIndex: length - 1,
      });

      if (i > 0) {
        chartRecorder.setCellsHighlight({
          startIndex: 0,
          endIndex: i - 1,
          highlightTags: ['sorted'],
        });
      }

      chartRecorder.setCellsHighlight({
        startIndex: minIndex,
        endIndex: minIndex,
        highlightTags: ['min'],
      });

      chartRecorder.setCellsHighlight({
        startIndex: j,
        endIndex: j,
        highlightTags: ['compare'],
      });

      logRecorder.setMessage({
        title:
          language === 'fa'
            ? 'بررسی عنصر بعدی'
            : 'Checking the next candidate',
        message:
          language === 'fa'
            ? `عنصر شاخص ${n(
                j,
                language,
              )} با کوچک‌ترین مقدار فعلی در شاخص ${n(
                minIndex,
                language,
              )} مقایسه می‌شود.`
            : `The element at index ${j} is compared with the current minimum at index ${minIndex}.`,
        line: 4,
      });

      recorderEngine.endGroup();

      // --------------------------------------------------------
      // Line 5
      // if arr[j] < arr[minIndex]
      // --------------------------------------------------------

      recorderEngine.beginGroup();

      chartRecorder.clearCellsHighlight({
        startIndex: j,
        endIndex: j,
      });

      chartRecorder.setCellsHighlight({
        startIndex: minIndex,
        endIndex: minIndex,
        highlightTags: ['min'],
      });

      chartRecorder.setCellsHighlight({
        startIndex: j,
        endIndex: j,
        highlightTags: ['compare'],
      });

      logRecorder.setMessage({
        title:
          language === 'fa'
            ? 'مقایسه با کوچک‌ترین فعلی'
            : 'Comparing with the current minimum',
        message:
          language === 'fa'
            ? `بررسی می‌شود که آیا مقدار ${n(
                arr[j],
                language,
              )} در شاخص ${n(
                j,
                language,
              )} از مقدار ${n(
                arr[minIndex],
                language,
              )} در شاخص ${n(
                minIndex,
                language,
              )} کوچک‌تر است یا خیر.`
            : `Checking whether value ${arr[j]} at index ${j} is smaller than value ${arr[minIndex]} at index ${minIndex}.`,
        line: 5,
      });

      recorderEngine.endGroup();

      // --------------------------------------------------------
      // Line 6
      // minIndex = j
      // --------------------------------------------------------

      if (arr[j] < arr[minIndex]) {
        const previousMinIndex = minIndex;

        minIndex = j;

        recorderEngine.beginGroup();

        chartRecorder.clearCellsHighlight({
          startIndex: previousMinIndex,
          endIndex: previousMinIndex,
        });

        chartRecorder.clearCellsHighlight({
          startIndex: j,
          endIndex: j,
        });

        chartRecorder.setCellsHighlight({
          startIndex: minIndex,
          endIndex: minIndex,
          highlightTags: ['min'],
        });

        logRecorder.setMessage({
          title:
            language === 'fa'
              ? 'کوچک‌ترین جدید پیدا شد'
              : 'New minimum found',
          message:
            language === 'fa'
              ? `مقدار ${n(
                  arr[minIndex],
                  language,
                )} کوچک‌تر از کوچک‌ترین مقدار قبلی است؛ بنابراین شاخص کوچک‌ترین مقدار به ${n(
                  minIndex,
                  language,
                )} تغییر می‌کند.`
              : `Value ${arr[minIndex]} is smaller than the previous minimum, so the minimum index becomes ${minIndex}.`,
          line: 6,
        });

        recorderEngine.endGroup();
      } else {
        // The condition was false.
        // This is still a real execution step, but there is
        // no pseudocode line after the condition to execute.

        recorderEngine.beginGroup();

        chartRecorder.clearCellsHighlight({
          startIndex: j,
          endIndex: j,
        });

        chartRecorder.setCellsHighlight({
          startIndex: minIndex,
          endIndex: minIndex,
          highlightTags: ['min'],
        });

        logRecorder.setMessage({
          title:
            language === 'fa'
              ? 'کوچک‌ترین تغییری نکرد'
              : 'Minimum unchanged',
          message:
            language === 'fa'
              ? `مقدار ${n(
                  arr[j],
                  language,
                )} کوچک‌تر از مقدار فعلی نیست؛ بنابراین کوچک‌ترین مقدار همچنان در شاخص ${n(
                  minIndex,
                  language,
                )} قرار دارد.`
              : `Value ${arr[j]} is not smaller than the current minimum, so the minimum remains at index ${minIndex}.`,
          line: 5,
        });

        recorderEngine.endGroup();
      }
    }

    // ----------------------------------------------------------
    // Line 7
    // swap(arr[i], arr[minIndex])
    // ----------------------------------------------------------

    if (minIndex !== i) {
      const oldValueAtI = arr[i];
      const oldMinimum = arr[minIndex];

      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];

      recorderEngine.beginGroup();

      chartRecorder.clearCellsHighlight({
        startIndex: 0,
        endIndex: length - 1,
      });

      if (i > 0) {
        chartRecorder.setCellsHighlight({
          startIndex: 0,
          endIndex: i - 1,
          highlightTags: ['sorted'],
        });
      }

      chartRecorder.setCellsHighlight({
        startIndex: i,
        endIndex: i,
        highlightTags: ['swap'],
      });

      chartRecorder.setCellsHighlight({
        startIndex: minIndex,
        endIndex: minIndex,
        highlightTags: ['swap'],
      });

      chartRecorder.setCells({
        startIndex: i,
        values: [
          {
            value: arr[i],
            label: n(i, language),
          },
        ],
      });

      chartRecorder.setCells({
        startIndex: minIndex,
        values: [
          {
            value: arr[minIndex],
            label: n(minIndex, language),
          },
        ],
      });

      logRecorder.setMessage({
        title:
          language === 'fa'
            ? 'قرار دادن کوچک‌ترین عنصر'
            : 'Placing the minimum',
        message:
          language === 'fa'
            ? `کوچک‌ترین مقدار یعنی ${n(
                oldMinimum,
                language,
              )} از شاخص ${n(
                minIndex,
                language,
              )} به شاخص ${n(
                i,
                language,
              )} منتقل می‌شود و مقدار ${n(
                oldValueAtI,
                language,
              )} جای آن را می‌گیرد.`
            : `The minimum value ${oldMinimum} moves from index ${minIndex} to index ${i}, replacing value ${oldValueAtI}.`,
        line: 7,
      });

      recorderEngine.endGroup();
    } else {
      // No actual swap is required, but line 7 is still the
      // logical operation of the algorithm.

      recorderEngine.beginGroup();

      chartRecorder.clearCellsHighlight({
        startIndex: 0,
        endIndex: length - 1,
      });

      if (i > 0) {
        chartRecorder.setCellsHighlight({
          startIndex: 0,
          endIndex: i - 1,
          highlightTags: ['sorted'],
        });
      }

      chartRecorder.setCellsHighlight({
        startIndex: i,
        endIndex: i,
        highlightTags: ['sorted'],
      });

      logRecorder.setMessage({
        title:
          language === 'fa'
            ? 'بدون نیاز به جابجایی'
            : 'No swap needed',
        message:
          language === 'fa'
            ? `کوچک‌ترین مقدار باقی‌مانده از قبل در شاخص ${n(
                i,
                language,
              )} قرار دارد، بنابراین جابجایی لازم نیست.`
            : `The smallest remaining value is already at index ${i}, so no swap is needed.`,
        line: 7,
      });

      recorderEngine.endGroup();
    }

    // ----------------------------------------------------------
    // End of current outer-loop iteration
    // ----------------------------------------------------------

    recorderEngine.beginGroup();

    chartRecorder.clearCellsHighlight({
      startIndex: 0,
      endIndex: length - 1,
    });

    chartRecorder.setCellsHighlight({
      startIndex: 0,
      endIndex: i,
      highlightTags: ['sorted'],
    });

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'ثبت عنصر مرتب‌شده'
          : 'Locking in the sorted element',
      message:
        language === 'fa'
          ? `عنصر شاخص ${n(
              i,
              language,
            )} اکنون در جایگاه نهایی خود قرار گرفته است و در ادامه دوباره بررسی نمی‌شود.`
          : `The element at index ${i} is now in its final position and will not be examined again.`,
      line: 2,
    });

    recorderEngine.endGroup();
  }

  // ------------------------------------------------------------
  // Line 8
  // return arr
  // ------------------------------------------------------------

  recorderEngine.beginGroup();

  chartRecorder.clearCellsHighlight({
    startIndex: 0,
    endIndex: length - 1,
  });

  chartRecorder.setCellsHighlight({
    startIndex: 0,
    endIndex: length - 1,
    highlightTags: ['sorted'],
  });

  logRecorder.setMessage({
    title: language === 'fa' ? 'پایان' : 'Done!',
    message:
      language === 'fa'
        ? 'همه عناصر انتخاب و در جایگاه نهایی خود قرار گرفتند؛ آرایه به‌طور کامل مرتب شده است.'
        : 'Every element has been selected and placed in its final position; the array is fully sorted.',
    line: 8,
  });

  recorderEngine.endGroup();

  return recorderEngine.getRecording();
}