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

export function quickSortVisualization(
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

  function setLog(
    line: number,
    titleFa: string,
    titleEn: string,
    messageFa: string,
    messageEn: string,
  ): void {
    logRecorder.setMessage({
      title: language === 'fa' ? titleFa : titleEn,
      message: language === 'fa' ? messageFa : messageEn,
      line,
    });
  }

  function highlightSection(
    low: number,
    high: number,
    tag: string,
  ): void {
    chartRecorder.clearCellsHighlight({
      startIndex: 0,
      endIndex: arr.length - 1,
    });

    if (low <= high) {
      chartRecorder.setCellsHighlight({
        startIndex: low,
        endIndex: high,
        highlightTags: [tag],
      });
    }
  }

  function partition(low: number, high: number): number {
    // ------------------------------------------------------------
    // Line 7
    // function partition(...)
    // ------------------------------------------------------------

    recorderEngine.beginGroup();

    highlightSection(low, high, 'section');

    setLog(
      7,
      'تابع افراز',
      'Partition',
      `بخش آرایه از شاخص ${n(low, language)} تا ${n(
        high,
        language,
      )} برای قرار دادن محور در جای درست بررسی می‌شود.`,
      `The section from index ${low} to ${high} is being partitioned around a pivot.`,
    );

    recorderEngine.endGroup();

    // ------------------------------------------------------------
    // Line 8
    // pivot = arr[high]
    // ------------------------------------------------------------

    const pivotValue = arr[high];

    recorderEngine.beginGroup();

    chartRecorder.clearCellsHighlight({
      startIndex: 0,
      endIndex: arr.length - 1,
    });

    chartRecorder.setCellsHighlight({
      startIndex: high,
      endIndex: high,
      highlightTags: ['pivot'],
    });

    setLog(
      8,
      'انتخاب محور',
      'Choosing the pivot',
      `آخرین عنصر بخش، یعنی مقدار ${n(
        pivotValue,
        language,
      )} در شاخص ${n(high, language)}، به‌عنوان محور انتخاب شد.`,
      `The last element, value ${pivotValue} at index ${high}, is selected as the pivot.`,
    );

    recorderEngine.endGroup();

    // ------------------------------------------------------------
    // Line 9
    // i = low - 1
    // ------------------------------------------------------------

    let i = low - 1;

    recorderEngine.beginGroup();

    setLog(
      9,
      'آماده‌سازی ناحیه کوچک‌تر',
      'Preparing the smaller region',
      `شاخص ناحیه عناصر کوچک‌تر روی ${n(
        i,
        language,
      )} قرار می‌گیرد؛ هنوز هیچ عنصری وارد این ناحیه نشده است.`,
      `The boundary of the smaller-than-pivot region starts at ${i}. No element has been placed in that region yet.`,
    );

    recorderEngine.endGroup();

    // ------------------------------------------------------------
    // Lines 10–13
    // for + if + increment + swap
    // ------------------------------------------------------------

    for (let j = low; j < high; j++) {
      // ----------------------------------------------------------
      // Line 10
      // for j = low to high - 1
      // ----------------------------------------------------------

      recorderEngine.beginGroup();

      chartRecorder.clearCellsHighlight({
        startIndex: 0,
        endIndex: arr.length - 1,
      });

      chartRecorder.setCellsHighlight({
        startIndex: low,
        endIndex: high,
        highlightTags: ['section'],
      });

      chartRecorder.setCellsHighlight({
        startIndex: j,
        endIndex: j,
        highlightTags: ['compare'],
      });

      setLog(
        10,
        'حرکت در بخش',
        'Scanning the section',
        `عنصر موجود در شاخص ${n(
          j,
          language,
        )} بررسی می‌شود.`,
        `The element at index ${j} is being examined.`,
      );

      recorderEngine.endGroup();

      // ----------------------------------------------------------
      // Line 11
      // if arr[j] < pivot
      // ----------------------------------------------------------

      recorderEngine.beginGroup();

      chartRecorder.clearCellsHighlight({
        startIndex: j,
        endIndex: j,
      });

      chartRecorder.setCellsHighlight({
        startIndex: j,
        endIndex: j,
        highlightTags: ['compare'],
      });

      setLog(
        11,
        'مقایسه با محور',
        'Comparing with the pivot',
        `آیا مقدار ${n(
          arr[j],
          language,
        )} در شاخص ${n(
          j,
          language,
        )} از محور ${n(pivotValue, language)} کوچک‌تر است؟`,
        `Is the value ${arr[j]} at index ${j} smaller than the pivot ${pivotValue}?`,
      );

      recorderEngine.endGroup();

      if (arr[j] < pivotValue) {
        // --------------------------------------------------------
        // Line 12
        // i = i + 1
        // --------------------------------------------------------

        i++;

        recorderEngine.beginGroup();

        chartRecorder.clearCellsHighlight({
          startIndex: 0,
          endIndex: arr.length - 1,
        });

        chartRecorder.setCellsHighlight({
          startIndex: i,
          endIndex: i,
          highlightTags: ['section'],
        });

        chartRecorder.setCellsHighlight({
          startIndex: j,
          endIndex: j,
          highlightTags: ['compare'],
        });

        setLog(
          12,
          'گسترش ناحیه کوچک‌تر',
          'Expanding the smaller region',
          `چون مقدار ${n(
            arr[j],
            language,
          )} از محور کوچک‌تر است، شاخص ناحیه کوچک‌تر یک واحد افزایش یافت و اکنون روی ${n(
            i,
            language,
          )} قرار دارد.`,
          `Because ${arr[j]} is smaller than the pivot, the smaller-than-pivot region expands to index ${i}.`,
        );

        recorderEngine.endGroup();

        // --------------------------------------------------------
        // Line 13
        // swap(arr[i], arr[j])
        // --------------------------------------------------------

        if (i !== j) {
          const leftValue = arr[i];
          const rightValue = arr[j];

          [arr[i], arr[j]] = [arr[j], arr[i]];

          recorderEngine.beginGroup();

          chartRecorder.clearCellsHighlight({
            startIndex: 0,
            endIndex: arr.length - 1,
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
            startIndex: j,
            values: [
              {
                value: arr[j],
                label: n(j, language),
              },
            ],
          });

          chartRecorder.setCellsHighlight({
            startIndex: i,
            endIndex: i,
            highlightTags: ['swap'],
          });

          chartRecorder.setCellsHighlight({
            startIndex: j,
            endIndex: j,
            highlightTags: ['swap'],
          });

          setLog(
            13,
            'جابجایی',
            'Swapping',
            `مقدار ${n(
              rightValue,
              language,
            )} با مقدار ${n(
              leftValue,
              language,
            )} جابه‌جا شد تا عناصر کوچک‌تر از محور در سمت چپ قرار بگیرند.`,
            `Value ${rightValue} is swapped with value ${leftValue} so that elements smaller than the pivot stay on its left.`,
          );

          recorderEngine.endGroup();
        } else {
          recorderEngine.beginGroup();

          chartRecorder.clearCellsHighlight({
            startIndex: 0,
            endIndex: arr.length - 1,
          });

          chartRecorder.setCellsHighlight({
            startIndex: i,
            endIndex: i,
            highlightTags: ['section'],
          });

          setLog(
            13,
            'بدون جابجایی',
            'No swap needed',
            `عنصر در شاخص ${n(
              j,
              language,
            )} از قبل در جای مناسب قرار دارد و نیازی به جابجایی نیست.`,
            `The element at index ${j} is already in the correct position, so no swap is needed.`,
          );

          recorderEngine.endGroup();
        }
      }
    }

    // ------------------------------------------------------------
    // Line 14
    // swap(arr[i + 1], arr[high])
    // ------------------------------------------------------------

    const pivotTargetIndex = i + 1;

    [arr[pivotTargetIndex], arr[high]] = [
      arr[high],
      arr[pivotTargetIndex],
    ];

    recorderEngine.beginGroup();

    chartRecorder.clearCellsHighlight({
      startIndex: 0,
      endIndex: arr.length - 1,
    });

    chartRecorder.setCells({
      startIndex: pivotTargetIndex,
      values: [
        {
          value: arr[pivotTargetIndex],
          label: n(pivotTargetIndex, language),
        },
      ],
    });

    chartRecorder.setCells({
      startIndex: high,
      values: [
        {
          value: arr[high],
          label: n(high, language),
        },
      ],
    });

    chartRecorder.setCellsHighlight({
      startIndex: pivotTargetIndex,
      endIndex: pivotTargetIndex,
      highlightTags: ['sorted'],
    });

    setLog(
      14,
      'قرار دادن محور',
      'Placing the pivot',
      `محور در شاخص ${n(
        pivotTargetIndex,
        language,
      )} قرار گرفت. این جایگاه نهایی محور در آرایه است.`,
      `The pivot is placed at index ${pivotTargetIndex}. This is its final position in the sorted array.`,
    );

    recorderEngine.endGroup();

    // ------------------------------------------------------------
    // Line 15
    // return i + 1
    // ------------------------------------------------------------

    recorderEngine.beginGroup();

    chartRecorder.setCellsHighlight({
      startIndex: pivotTargetIndex,
      endIndex: pivotTargetIndex,
      highlightTags: ['sorted'],
    });

    setLog(
      15,
      'بازگرداندن جایگاه محور',
      'Returning the pivot position',
      `جایگاه نهایی محور یعنی ${n(
        pivotTargetIndex,
        language,
      )} بازگردانده می‌شود تا دو بخش بعدی مشخص شوند.`,
      `The final pivot position ${pivotTargetIndex} is returned so the two remaining sections can be sorted.`,
    );

    recorderEngine.endGroup();

    return pivotTargetIndex;
  }

  function quickSort(low: number, high: number): void {
    // ------------------------------------------------------------
    // Line 1
    // function quickSort(...)
    // ------------------------------------------------------------

    recorderEngine.beginGroup();

    if (low <= high) {
      highlightSection(low, high, 'section');
    }

    setLog(
      1,
      'شروع Quick Sort',
      'Starting Quick Sort',
      `مرتب‌سازی سریع برای بخش شاخص ${n(
        low,
        language,
      )} تا ${n(high, language)} اجرا می‌شود.`,
      `Quick Sort is running on the section from index ${low} to ${high}.`,
    );

    recorderEngine.endGroup();

    // ------------------------------------------------------------
    // Line 2
    // if low >= high
    // ------------------------------------------------------------

    recorderEngine.beginGroup();

    setLog(
      2,
      'بررسی شرط توقف',
      'Checking the stopping condition',
      `بررسی می‌شود که آیا بخش فقط یک عنصر یا خالی است؛ شاخص ابتدا ${n(
        low,
        language,
      )} و شاخص انتها ${n(high, language)} است.`,
      `Checking whether the section contains zero or one element: low = ${low}, high = ${high}.`,
    );

    recorderEngine.endGroup();

    if (low >= high) {
      // ----------------------------------------------------------
      // Line 3
      // return
      // ----------------------------------------------------------

      if (low === high) {
        recorderEngine.beginGroup();

        chartRecorder.clearCellsHighlight({
          startIndex: 0,
          endIndex: arr.length - 1,
        });

        chartRecorder.setCellsHighlight({
          startIndex: low,
          endIndex: low,
          highlightTags: ['sorted'],
        });

        setLog(
          3,
          'بخش تک‌عنصری',
          'Single-element section',
          `بخش در شاخص ${n(
            low,
            language,
          )} فقط یک عنصر دارد، بنابراین این عنصر در جایگاه نهایی خود قرار دارد.`,
          `The section at index ${low} contains one element, so it is already in its final position.`,
        );

        recorderEngine.endGroup();
      }

      return;
    }

    // ------------------------------------------------------------
    // Line 4
    // pivotIndex = partition(...)
    // ------------------------------------------------------------

    recorderEngine.beginGroup();

    highlightSection(low, high, 'section');

    setLog(
      4,
      'افراز بخش',
      'Partitioning the section',
      `بخش از شاخص ${n(
        low,
        language,
      )} تا ${n(
        high,
        language,
      )} با انتخاب یک محور به دو بخش تقسیم می‌شود.`,
      `The section from index ${low} to ${high} is partitioned around a pivot.`,
    );

    recorderEngine.endGroup();

    const pivotIndex = partition(low, high);

    // ------------------------------------------------------------
    // Line 5
    // quickSort(left)
    // ------------------------------------------------------------

    recorderEngine.beginGroup();

    chartRecorder.clearCellsHighlight({
      startIndex: 0,
      endIndex: arr.length - 1,
    });

    chartRecorder.setCellsHighlight({
      startIndex: pivotIndex,
      endIndex: pivotIndex,
      highlightTags: ['sorted'],
    });

    if (low <= pivotIndex - 1) {
      chartRecorder.setCellsHighlight({
        startIndex: low,
        endIndex: pivotIndex - 1,
        highlightTags: ['section'],
      });
    }

    setLog(
      5,
      'مرتب‌سازی نیمه چپ',
      'Sorting the left section',
      `اکنون بخش سمت چپ محور، یعنی شاخص ${n(
        low,
        language,
      )} تا ${n(
        pivotIndex - 1,
        language,
      )}، به‌صورت بازگشتی مرتب می‌شود.`,
      `The section to the left of the pivot, from index ${low} to ${pivotIndex - 1}, is sorted recursively.`,
    );

    recorderEngine.endGroup();

    quickSort(low, pivotIndex - 1);

    // ------------------------------------------------------------
    // Line 6
    // quickSort(right)
    // ------------------------------------------------------------

    recorderEngine.beginGroup();

    chartRecorder.clearCellsHighlight({
      startIndex: 0,
      endIndex: arr.length - 1,
    });

    chartRecorder.setCellsHighlight({
      startIndex: pivotIndex,
      endIndex: pivotIndex,
      highlightTags: ['sorted'],
    });

    if (pivotIndex + 1 <= high) {
      chartRecorder.setCellsHighlight({
        startIndex: pivotIndex + 1,
        endIndex: high,
        highlightTags: ['section'],
      });
    }

    setLog(
      6,
      'مرتب‌سازی نیمه راست',
      'Sorting the right section',
      `اکنون بخش سمت راست محور، یعنی شاخص ${n(
        pivotIndex + 1,
        language,
      )} تا ${n(
        high,
        language,
      )}، به‌صورت بازگشتی مرتب می‌شود.`,
      `The section to the right of the pivot, from index ${pivotIndex + 1} to ${high}, is sorted recursively.`,
    );

    recorderEngine.endGroup();

    quickSort(pivotIndex + 1, high);
  }

  // Empty array
  if (arr.length === 0) {
    recorderEngine.beginGroup();

    setLog(
      1,
      'آرایه خالی',
      'Empty array',
      'آرایه ورودی خالی است و نیازی به مرتب‌سازی ندارد.',
      'The input array is empty, so no sorting is required.',
    );

    recorderEngine.endGroup();

    return recorderEngine.getRecording();
  }

  quickSort(0, arr.length - 1);

  // --------------------------------------------------------------
  // Final state
  // --------------------------------------------------------------

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

  setLog(
    1,
    'پایان',
    'Done!',
    'همه بخش‌ها بر اساس محورهای خود مرتب شده‌اند و آرایه به‌طور کامل مرتب است.',
    'Every section has been partitioned around its pivots, and the array is fully sorted.',
  );

  recorderEngine.endGroup();

  return recorderEngine.getRecording();
}