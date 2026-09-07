import {
  ChartInitParams,
  ChartRecorder,
  LogInitParams,
  LogRecorder,
  RecorderEngine,
  Recording,
} from '@algorithm-visualizer/typescript-recorder';
import type { Language } from '../core/services/language.service';

// Small local dictionary just for this recorder's Log messages —
// deliberately NOT going through core/i18n/translations.ts's
// TRANSLATIONS map, because these strings have numbers baked into the
// middle of a sentence at record time (not a template binding), so a
// static translate(key) lookup doesn't fit; a %-style template per
// language does. `n()` below converts each interpolated number to
// Persian digits when language is 'fa', exactly like the rest of the
// app's toLocaleDigitsForLanguage — kept as a tiny local copy instead
// of importing that (app-layer) module from this algorithm-layer file,
// to avoid a dependency pointing the "wrong" direction.
const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
function n(value: number, language: Language): string {
  const text = String(value);
  return language === 'fa' ? text.replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)]) : text;
}

// Pseudocode line numbers referenced by title/line below correspond to:
//   1  function bubbleSort(arr):
//   2    for i = 0 to n - 2:
//   3      for j = 0 to n - i - 2:
//   4        if arr[j] > arr[j + 1]:
//   5          swap(arr[j], arr[j + 1])
//   6    return arr
export function bubbleSortVisualization(arr: number[], language: Language = 'en'): Recording {
  const recorderEngine = new RecorderEngine();

  recorderEngine.beginGroup();
  const logInitParam: LogInitParams = { name: 'Log' };
  const logRecorder = new LogRecorder(recorderEngine, logInitParam, 'Log');

  const chartInitParams: ChartInitParams = {
    name: 'Chart',
    values: arr.map((v, index) => ({ value: v, label: index.toString() })),
  };
  const chartRecorder = new ChartRecorder(recorderEngine, chartInitParams, 'Array');
  recorderEngine.endGroup();

  const n_ = arr.length;

  for (let i = 0; i < n_ - 1; i++) {
    for (let j = 0; j < n_ - i - 1; j++) {
      // Selecting the two cells we're about to look at.
      recorderEngine.beginGroup();
      logRecorder.setMessage({
        title: language === 'fa' ? 'انتخاب یک زوج' : 'Selecting a pair',
        message:
          language === 'fa'
            ? `عناصر ایندکس ${n(j, language)} و ${n(j + 1, language)} برای مقایسه بعدی بررسی می‌شوند.`
            : `Looking at the elements at index ${j} and ${j + 1} to compare next.`,
        line: 3,
      });
      chartRecorder.setCellsHighlight({
        startIndex: j,
        endIndex: j + 1,
        highlightTags: ['active'],
      });
      recorderEngine.endGroup();

      // Comparing them.
      recorderEngine.beginGroup();
      logRecorder.setMessage({
        title: language === 'fa' ? 'مقایسه عناصر' : 'Comparing elements',
        message:
          language === 'fa'
            ? `بررسی می‌شود که آیا عنصر ایندکس ${n(j, language)} از عنصر ایندکس ${n(j + 1, language)} بزرگ‌تر است — همین موضوع تعیین می‌کند که جابجا می‌شوند یا نه.`
            : `Checking whether the element at index ${j} is greater than the one at index ${j + 1} — that's the only thing that decides if they swap.`,
        line: 4,
      });
      chartRecorder.setCellsHighlight({
        startIndex: j,
        endIndex: j + 1,
        highlightTags: ['compare'],
      });
      recorderEngine.endGroup();

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        recorderEngine.beginGroup();
        logRecorder.setMessage({
          title: language === 'fa' ? 'جابجایی عناصر' : 'Swapping elements',
          message:
            language === 'fa'
              ? `عنصر ایندکس ${n(j, language)} از عنصر ایندکس ${n(j + 1, language)} بزرگ‌تر است، پس جای خود را عوض می‌کنند.`
              : `The element at index ${j} is greater than the one at index ${j + 1}, so they trade places.`,
          line: 5,
        });
        // Only 'swap' here (not 'compare' + 'swap' together) — stacking
        // both tags drew as a compare-colored ring around a swap-colored
        // center; the whole cell should just read as swap color.
        chartRecorder.setCellsHighlight({
          startIndex: j,
          endIndex: j + 1,
          highlightTags: ['swap'],
        });
        // Using setCells here instead of swapCells — same approach as
        // merge sort. This just overwrites the two positions with their
        // new (already-swapped) values directly, no "flying past each
        // other" swap animation. Labels stay as the index (j, j + 1)
        // since here they track array position, not the value passing
        // through that position.
        chartRecorder.setCells({
          startIndex: j,
          values: [
            { value: arr[j], label: j.toString() },
            { value: arr[j + 1], label: (j + 1).toString() },
          ],
        });
        recorderEngine.endGroup();
      } else {
        recorderEngine.beginGroup();
        logRecorder.setMessage({
          title: language === 'fa' ? 'نیازی به جابجایی نیست' : 'No swap needed',
          message:
            language === 'fa'
              ? `عنصر ایندکس ${n(j, language)} از قبل کوچک‌تر یا مساوی عنصر ایندکس ${n(j + 1, language)} است، پس در جای خود می‌مانند.`
              : `The element at index ${j} is already smaller than or equal to the one at index ${j + 1}, so they stay put.`,
          line: 4,
        });
        recorderEngine.endGroup();
      }

      // Done looking at this pair — clear only these two cells, not the
      // whole array, so 'sorted' highlights from earlier passes survive.
      recorderEngine.beginGroup();
      chartRecorder.clearCellsHighlight({ startIndex: j, endIndex: j + 1 });
      recorderEngine.endGroup();
    }

    // Bubble sort's invariant: after pass i, the cell at n-i-1 holds its
    // final, correctly-sorted value and is never touched again.
    recorderEngine.beginGroup();
    logRecorder.setMessage({
      title: language === 'fa' ? 'قرار گرفتن عنصر مرتب‌شده' : 'Locking in a sorted element',
      message:
        language === 'fa'
          ? `عنصر ایندکس ${n(n_ - i - 1, language)} اکنون در جایگاه نهایی خود قرار گرفته و دیگر دست نمی‌خورد.`
          : `The element at index ${n_ - i - 1} is now in its final position and won't be touched again.`,
      line: 2,
    });
    chartRecorder.setCellsHighlight({
      startIndex: n_ - i - 1,
      endIndex: n_ - i - 1,
      highlightTags: ['sorted'],
    });
    recorderEngine.endGroup();
  }

  // One pass never explicitly touches index 0 (nothing left to compare it
  // against), so mark the whole array sorted as the final "done" frame.
  recorderEngine.beginGroup();
  logRecorder.setMessage({
    title: language === 'fa' ? 'تمام شد!' : 'Done!',
    message:
      language === 'fa'
        ? 'تمام عناصر مقایسه و در جای خود قرار گرفتند — آرایه به‌طور کامل مرتب شده است.'
        : 'Every element has been compared and placed — the array is fully sorted.',
    line: 6,
  });
  chartRecorder.setCellsHighlight({ startIndex: 0, endIndex: n_ - 1, highlightTags: ['sorted'] });
  recorderEngine.endGroup();

  return recorderEngine.getRecording();
}
