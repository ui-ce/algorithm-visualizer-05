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

export function insertionSortVisualization(
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
      line: 9,
    });

    recorderEngine.endGroup();

    return recorderEngine.getRecording();
  }

  // ------------------------------------------------------------
  // Line 1
  // function insertionSort(arr)
  // ------------------------------------------------------------

  recorderEngine.beginGroup();

  logRecorder.setMessage({
    title:
      language === 'fa'
        ? 'شروع Insertion Sort'
        : 'Starting Insertion Sort',
    message:
      language === 'fa'
        ? `مرتب‌سازی درجی برای آرایه با ${n(
          length,
          language,
        )} عنصر آغاز می‌شود.`
        : `Insertion Sort starts with an array of ${length} elements.`,
    line: 1,
  });

  recorderEngine.endGroup();

  // The first element is already a sorted region.
  recorderEngine.beginGroup();

  chartRecorder.setCellsHighlight({
    startIndex: 0,
    endIndex: 0,
    highlightTags: ['sorted'],
  });

  logRecorder.setMessage({
    title:
      language === 'fa'
        ? 'شروع ناحیه مرتب‌شده'
        : 'Starting the sorted region',
    message:
      language === 'fa'
        ? `عنصر شاخص ${n(0, language)} به‌تنهایی یک ناحیه مرتب‌شده تشکیل می‌دهد.`
        : 'The first element forms a sorted region by itself.',
    line: 2,
  });

  recorderEngine.endGroup();

  // ------------------------------------------------------------
  // Line 2
  // for i = 1 to n - 1
  // ------------------------------------------------------------

  for (let i = 1; i < length; i++) {
    recorderEngine.beginGroup();

    chartRecorder.clearCellsHighlight({
      startIndex: 0,
      endIndex: length - 1,
    });

    chartRecorder.setCellsHighlight({
      startIndex: 0,
      endIndex: i - 1,
      highlightTags: ['sorted'],
    });

    chartRecorder.setCellsHighlight({
      startIndex: i,
      endIndex: i,
      highlightTags: ['active'],
    });

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'انتخاب عنصر بعدی'
          : 'Selecting the next element',
      message:
        language === 'fa'
          ? `عنصر شاخص ${n(
            i,
            language,
          )} انتخاب شده و باید در جای مناسب داخل بخش مرتب‌شده قرار بگیرد.`
          : `The element at index ${i} is selected and will be inserted into the sorted section.`,
      line: 2,
    });

    recorderEngine.endGroup();

    // ----------------------------------------------------------
    // Line 3
    // key = arr[i]
    // ----------------------------------------------------------

    const key = arr[i];

    recorderEngine.beginGroup();

    chartRecorder.clearCellsHighlight({
      startIndex: 0,
      endIndex: length - 1,
    });

    chartRecorder.setCellsHighlight({
      startIndex: 0,
      endIndex: i - 1,
      highlightTags: ['sorted'],
    });

    chartRecorder.setCellsHighlight({
      startIndex: i,
      endIndex: i,
      highlightTags: ['active'],
    });

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'برداشتن کلید'
          : 'Picking up the key',
      message:
        language === 'fa'
          ? `مقدار ${n(
            key,
            language,
          )} در شاخص ${n(
            i,
            language,
          )} به‌عنوان کلید انتخاب شد تا در جای مناسب قرار بگیرد.`
          : `Value ${key} at index ${i} is selected as the key to be inserted into the correct position.`,
      line: 3,
    });

    recorderEngine.endGroup();

    // ----------------------------------------------------------
    // Line 4
    // j = i - 1
    // ----------------------------------------------------------

    let j = i - 1;

    recorderEngine.beginGroup();

    chartRecorder.clearCellsHighlight({
      startIndex: 0,
      endIndex: length - 1,
    });

    chartRecorder.setCellsHighlight({
      startIndex: 0,
      endIndex: i - 1,
      highlightTags: ['sorted'],
    });

    chartRecorder.setCellsHighlight({
      startIndex: i,
      endIndex: i,
      highlightTags: ['active'],
    });

    if (j >= 0) {
      chartRecorder.setCellsHighlight({
        startIndex: j,
        endIndex: j,
        highlightTags: ['compare'],
      });
    }

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'قرار دادن نشانگر'
          : 'Setting the pointer',
      message:
        language === 'fa'
          ? `مقایسه از شاخص ${n(
            j,
            language,
          )} آغاز می‌شود؛ این شاخص آخرین عنصر بخش مرتب‌شده قبل از کلید است.`
          : `Comparison starts at index ${j}, the last element of the sorted section before the key.`,
      line: 4,
    });

    recorderEngine.endGroup();

    // ----------------------------------------------------------
    // Line 5
    // while j >= 0 and arr[j] > key
    // ----------------------------------------------------------

    while (j >= 0) {
      recorderEngine.beginGroup();

      chartRecorder.clearCellsHighlight({
        startIndex: 0,
        endIndex: length - 1,
      });

      chartRecorder.setCellsHighlight({
        startIndex: 0,
        endIndex: i - 1,
        highlightTags: ['sorted'],
      });

      chartRecorder.setCellsHighlight({
        startIndex: i,
        endIndex: i,
        highlightTags: ['active'],
      });

      chartRecorder.setCellsHighlight({
        startIndex: j,
        endIndex: j,
        highlightTags: ['compare'],
      });

      logRecorder.setMessage({
        title:
          language === 'fa'
            ? 'بررسی شرط حلقه'
            : 'Checking the while condition',
        message:
          language === 'fa'
            ? `بررسی می‌شود که آیا مقدار ${n(
              arr[j],
              language,
            )} در شاخص ${n(
              j,
              language,
            )} از کلید ${n(
              key,
              language,
            )} بزرگ‌تر است یا خیر.`
            : `Checking whether value ${arr[j]} at index ${j} is greater than the key ${key}.`,
        line: 5,
      });

      recorderEngine.endGroup();

      if (arr[j] <= key) {
        recorderEngine.beginGroup();

        chartRecorder.setCellsHighlight({
          startIndex: j,
          endIndex: j,
          highlightTags: ['sorted'],
        });

        logRecorder.setMessage({
          title:
            language === 'fa'
              ? 'پایان جابه‌جایی‌ها'
              : 'Stopping the shifts',
          message:
            language === 'fa'
              ? `مقدار ${n(
                arr[j],
                language,
              )} دیگر از کلید ${n(
                key,
                language,
              )} بزرگ‌تر نیست؛ بنابراین حلقه متوقف می‌شود.`
              : `Value ${arr[j]} is not greater than the key ${key}, so the shifting loop stops.`,
          line: 5,
        });

        recorderEngine.endGroup();

        break;
      }

      // --------------------------------------------------------
      // Line 6
      // arr[j + 1] = arr[j]
      // --------------------------------------------------------

      const shiftedValue = arr[j];

      arr[j + 1] = arr[j];

      recorderEngine.beginGroup();

      chartRecorder.clearCellsHighlight({
        startIndex: 0,
        endIndex: length - 1,
      });

      chartRecorder.setCellsHighlight({
        startIndex: 0,
        endIndex: i - 1,
        highlightTags: ['sorted'],
      });

      chartRecorder.setCellsHighlight({
        startIndex: j,
        endIndex: j,
        highlightTags: ['compare'],
      });

      chartRecorder.setCellsHighlight({
        startIndex: j + 1,
        endIndex: j + 1,
        highlightTags: ['shift'],
      });

      chartRecorder.setCells({
        startIndex: j + 1,
        values: [
          {
            value: arr[j + 1],
            label: n(j + 1, language),
          },
        ],
      });

      logRecorder.setMessage({
        title:
          language === 'fa'
            ? 'جابجایی عنصر'
            : 'Shifting an element',
        message:
          language === 'fa'
            ? `مقدار ${n(
              shiftedValue,
              language,
            )} از شاخص ${n(
              j,
              language,
            )} به شاخص ${n(
              j + 1,
              language,
            )} منتقل شد تا برای کلید فضا ایجاد شود.`
            : `Value ${shiftedValue} moves from index ${j} to index ${j + 1} to make room for the key.`,
        line: 6,
      });

      recorderEngine.endGroup();

      // --------------------------------------------------------
      // Line 7
      // j = j - 1
      // --------------------------------------------------------

      j--;

      recorderEngine.beginGroup();

      chartRecorder.clearCellsHighlight({
        startIndex: 0,
        endIndex: length - 1,
      });

      chartRecorder.setCellsHighlight({
        startIndex: 0,
        endIndex: i - 1,
        highlightTags: ['sorted'],
      });

      chartRecorder.setCellsHighlight({
        startIndex: i,
        endIndex: i,
        highlightTags: ['active'],
      });

      if (j >= 0) {
        chartRecorder.setCellsHighlight({
          startIndex: j,
          endIndex: j,
          highlightTags: ['compare'],
        });
      }

      logRecorder.setMessage({
        title:
          language === 'fa'
            ? 'حرکت به سمت چپ'
            : 'Moving left',
        message:
          language === 'fa'
            ? `شاخص بررسی یک واحد کاهش یافت و اکنون روی ${n(
              j,
              language,
            )} قرار دارد.`
            : `The comparison index moves one position left to ${j}.`,
        line: 7,
      });

      recorderEngine.endGroup();
    }

    // ----------------------------------------------------------
    // Line 8
    // arr[j + 1] = key
    // ----------------------------------------------------------

    arr[j + 1] = key;

    recorderEngine.beginGroup();

    chartRecorder.clearCellsHighlight({
      startIndex: 0,
      endIndex: length - 1,
    });

    chartRecorder.setCells({
      startIndex: j + 1,
      values: [
        {
          value: key,
          label: n(j + 1, language),
        },
      ],
    });

    chartRecorder.setCellsHighlight({
      startIndex: 0,
      endIndex: i,
      highlightTags: ['sorted'],
    });

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'قرار دادن کلید'
          : 'Inserting the key',
      message:
        language === 'fa'
          ? `کلید با مقدار ${n(
            key,
            language,
          )} در شاخص ${n(
            j + 1,
            language,
          )} قرار گرفت. بخش تا اینجا مرتب است.`
          : `The key ${key} is inserted at index ${j + 1}. The section is now sorted.`,
      line: 8,
    });

    recorderEngine.endGroup();
  }

  // ------------------------------------------------------------
  // Line 9
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
        ? 'همه عناصر در جایگاه صحیح خود قرار گرفته‌اند و آرایه به‌طور کامل مرتب شده است.'
        : 'Every element has been inserted into its correct position, and the array is fully sorted.',
    line: 9,
  });

  recorderEngine.endGroup();

  return recorderEngine.getRecording();
}