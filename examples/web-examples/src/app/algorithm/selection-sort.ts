import {
  ChartInitParams,
  ChartRecorder,
  LogInitParams,
  LogRecorder,
  RecorderEngine,
  Recording,
} from '@algorithm-visualizer/typescript-recorder';

// Pseudocode line numbers referenced by title/line below correspond to:
//   1  function selectionSort(arr):
//   2    for i = 0 to n - 2:
//   3      minIndex = i
//   4      for j = i + 1 to n - 1:
//   5        if arr[j] < arr[minIndex]: minIndex = j
//   6      swap(arr[i], arr[minIndex])
//   7    return arr
export function selectionSortVisualization(arr: number[]): Recording {
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
    let minIndex = i;

    recorderEngine.beginGroup();
    logRecorder.setMessage({
      title: 'Starting a new pass',
      message: `Looking for the smallest remaining value to place at index ${i}.`,
      line: 3,
    });
    chartRecorder.setCellsHighlight({ startIndex: i, endIndex: i, highlightTags: ['min'] });
    recorderEngine.endGroup();

    for (let j = i + 1; j < n; j++) {
      recorderEngine.beginGroup();
      logRecorder.setMessage({
        title: 'Checking the next candidate',
        message: `Comparing the element at index ${j} against the smallest value found so far (index ${minIndex}, value ${arr[minIndex]}).`,
        line: 5,
      });
      chartRecorder.setCellsHighlight({ startIndex: j, endIndex: j, highlightTags: ['compare'] });
      recorderEngine.endGroup();

      if (arr[j] < arr[minIndex]) {
        const previousMinIndex = minIndex;
        minIndex = j;

        recorderEngine.beginGroup();
        logRecorder.setMessage({
          title: 'New minimum found',
          message: `Element at index ${j} is smaller than the previous minimum — it becomes the new smallest value found this pass.`,
          line: 5,
        });
        // The old minimum goes back to its default look; index j keeps
        // a highlight but switches from 'compare' to 'min' — setting it
        // directly is enough since setCellsHighlight replaces a cell's
        // tags outright rather than adding to them.
        chartRecorder.clearCellsHighlight({ startIndex: previousMinIndex, endIndex: previousMinIndex });
        chartRecorder.setCellsHighlight({ startIndex: minIndex, endIndex: minIndex, highlightTags: ['min'] });
        recorderEngine.endGroup();
      } else {
        recorderEngine.beginGroup();
        chartRecorder.clearCellsHighlight({ startIndex: j, endIndex: j });
        recorderEngine.endGroup();
      }
    }

    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];

      recorderEngine.beginGroup();
      logRecorder.setMessage({
        title: 'Swapping into place',
        message: `The smallest remaining value was found at index ${minIndex} — swapping it into index ${i}.`,
        line: 6,
      });
      chartRecorder.clearCellsHighlight({ startIndex: minIndex, endIndex: minIndex });
      chartRecorder.setCellsHighlight({ startIndex: i, endIndex: i, highlightTags: ['swap'] });
      chartRecorder.setCellsHighlight({ startIndex: minIndex, endIndex: minIndex, highlightTags: ['swap'] });
      chartRecorder.setCells({ startIndex: i, values: [{ value: arr[i], label: i.toString() }] });
      chartRecorder.setCells({ startIndex: minIndex, values: [{ value: arr[minIndex], label: minIndex.toString() }] });
      recorderEngine.endGroup();
    } else {
      recorderEngine.beginGroup();
      logRecorder.setMessage({
        title: 'Already in place',
        message: `Index ${i} already holds the smallest remaining value, so no swap is needed.`,
        line: 6,
      });
      chartRecorder.clearCellsHighlight({ startIndex: i, endIndex: i });
      recorderEngine.endGroup();
    }

    recorderEngine.beginGroup();
    logRecorder.setMessage({
      title: 'Locking in a sorted element',
      message: `The element at index ${i} is now in its final position and won't be touched again.`,
      line: 2,
    });
    chartRecorder.clearCellsHighlight({ startIndex: i, endIndex: i });
    chartRecorder.setCellsHighlight({ startIndex: i, endIndex: i, highlightTags: ['sorted'] });
    recorderEngine.endGroup();
  }

  // The outer loop never explicitly touches index n-1 (nothing left to
  // compare it against once every earlier index is placed), so mark
  // the whole array sorted as the final "done" frame.
  recorderEngine.beginGroup();
  logRecorder.setMessage({
    title: 'Done!',
    message: 'Every element has been selected and placed — the array is fully sorted.',
    line: 7,
  });
  chartRecorder.setCellsHighlight({ startIndex: 0, endIndex: n - 1, highlightTags: ['sorted'] });
  recorderEngine.endGroup();

  return recorderEngine.getRecording();
}