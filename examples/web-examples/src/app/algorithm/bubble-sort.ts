import {
  ChartInitParams,
  ChartRecorder,
  LogInitParams,
  LogRecorder,
  RecorderEngine,
  Recording,
} from '@algorithm-visualizer/typescript-recorder';

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
      logRecorder.setMessage({ message: `Looking at cells at index ${j} and ${j + 1}` });
      chartRecorder.setCellsHighlight({
        startIndex: j,
        endIndex: j + 1,
        highlightTags: ['active'],
      });
      recorderEngine.endGroup();

      // Comparing them.
      recorderEngine.beginGroup();
      logRecorder.setMessage({ message: `Comparing cells at index ${j} and ${j + 1}` });
      chartRecorder.setCellsHighlight({
        startIndex: j,
        endIndex: j + 1,
        highlightTags: ['compare'],
      });
      recorderEngine.endGroup();

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        recorderEngine.beginGroup();
        logRecorder.setMessage({ message: `Swapping cells at index ${j} and ${j + 1}` });
        // Only 'swap' here (not 'compare' + 'swap' together) — stacking
        // both tags drew as a compare-colored ring around a swap-colored
        // center; the whole cell should just read as swap color.
        chartRecorder.setCellsHighlight({
          startIndex: j,
          endIndex: j + 1,
          highlightTags: ['swap'],
        });
        chartRecorder.setCells({
          startIndex: j,
          values: [
            { value: arr[j], label: j.toString() },
            { value: arr[j + 1], label: (j + 1).toString() },
          ],
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
    logRecorder.setMessage({ message: `Cell at index ${n - i - 1} is now in its final sorted position` });
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
  logRecorder.setMessage({ message: 'Array is fully sorted' });
  chartRecorder.setCellsHighlight({ startIndex: 0, endIndex: n - 1, highlightTags: ['sorted'] });
  recorderEngine.endGroup();

  return recorderEngine.getRecording();
}
