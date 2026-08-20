import {
  ChartInitParams,
  ChartRecorder,
  LogInitParams,
  LogRecorder,
  RecorderEngine,
  Recording,
} from '@algorithm-visualizer/typescript-recorder';

// Pseudocode line numbers referenced by title/line below correspond to:
//   1  function bubbleSort(arr):
//   2    for i = 0 to n - 2:
//   3      for j = 0 to n - i - 2:
//   4        if arr[j] > arr[j + 1]:
//   5          swap(arr[j], arr[j + 1])
//   6    return arr
export function bubbleSortVisualization(arr: number[]): Recording {
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

  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Selecting the two cells we're about to look at.
      recorderEngine.beginGroup();
      logRecorder.setMessage({
        title: 'Selecting a pair',
        message: `Looking at the elements at index ${j} and ${j + 1} to compare next.`,
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
        title: 'Comparing elements',
        message: `Checking whether the element at index ${j} is greater than the one at index ${j + 1} — that's the only thing that decides if they swap.`,
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
          title: 'Swapping elements',
          message: `The element at index ${j} is greater than the one at index ${j + 1}, so they trade places.`,
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
          title: 'No swap needed',
          message: `The element at index ${j} is already smaller than or equal to the one at index ${j + 1}, so they stay put.`,
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
      title: 'Locking in a sorted element',
      message: `The element at index ${n - i - 1} is now in its final position and won't be touched again.`,
      line: 2,
    });
    chartRecorder.setCellsHighlight({
      startIndex: n - i - 1,
      endIndex: n - i - 1,
      highlightTags: ['sorted'],
    });
    recorderEngine.endGroup();
  }

  // One pass never explicitly touches index 0 (nothing left to compare it
  // against), so mark the whole array sorted as the final "done" frame.
  recorderEngine.beginGroup();
  logRecorder.setMessage({
    title: 'Done!',
    message: 'Every element has been compared and placed — the array is fully sorted.',
    line: 6,
  });
  chartRecorder.setCellsHighlight({ startIndex: 0, endIndex: n - 1, highlightTags: ['sorted'] });
  recorderEngine.endGroup();

  return recorderEngine.getRecording();
}
