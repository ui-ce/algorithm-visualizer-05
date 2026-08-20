import {
  ChartInitParams,
  ChartRecorder,
  LogInitParams,
  LogRecorder,
  RecorderEngine,
  Recording,
} from '@algorithm-visualizer/typescript-recorder';

// Pseudocode line numbers referenced by title/line below correspond to:
//   1  function insertionSort(arr):
//   2    for i = 1 to n - 1:
//   3      key = arr[i]
//   4      j = i - 1
//   5      while j >= 0 and arr[j] > key:
//   6        arr[j + 1] = arr[j]
//   7        j = j - 1
//   8      arr[j + 1] = key
//   9    return arr
export function insertionSortVisualization(arr: number[]): Recording {
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

  // Index 0 has nothing to its left to compare against, so it's
  // trivially part of the sorted region from the very first frame.
  if (n > 0) {
    recorderEngine.beginGroup();
    chartRecorder.setCellsHighlight({ startIndex: 0, endIndex: 0, highlightTags: ['sorted'] });
    recorderEngine.endGroup();
  }

  for (let i = 1; i < n; i++) {
    const key = arr[i];

    recorderEngine.beginGroup();
    logRecorder.setMessage({
      title: 'Picking up the next key',
      message: `Holding the value at index ${i} (${key}) aside to insert it into the already-sorted section before it.`,
      line: 3,
    });
    chartRecorder.clearCellsHighlight({ startIndex: i, endIndex: i });
    chartRecorder.setCellsHighlight({ startIndex: i, endIndex: i, highlightTags: ['active'] });
    recorderEngine.endGroup();

    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      recorderEngine.beginGroup();
      logRecorder.setMessage({
        title: 'Shifting a larger element right',
        message: `The element at index ${j} (${arr[j]}) is greater than the key, so it shifts one position right to make room.`,
        line: 6,
      });
      chartRecorder.setCellsHighlight({ startIndex: j, endIndex: j, highlightTags: ['compare'] });
      recorderEngine.endGroup();

      arr[j + 1] = arr[j];

      recorderEngine.beginGroup();
      chartRecorder.clearCellsHighlight({ startIndex: j, endIndex: j });
      chartRecorder.setCellsHighlight({ startIndex: j + 1, endIndex: j + 1, highlightTags: ['shift'] });
      // Overwrites index j+1 with the value that used to sit at j — the
      // key itself (held in the `key` variable, not in the array right
      // now) gets written back to its final slot once the while loop
      // below stops.
      chartRecorder.setCells({ startIndex: j + 1, values: [{ value: arr[j + 1], label: (j + 1).toString() }] });
      recorderEngine.endGroup();

      j--;
    }

    arr[j + 1] = key;

    recorderEngine.beginGroup();
    logRecorder.setMessage({
      title: 'Inserting the key',
      message: `No remaining element to the left is greater than the key, so it's placed at index ${j + 1}.`,
      line: 8,
    });
    // Clearing the whole 0..i range (rather than just j+1) also removes
    // the previous 'shift'/'active' tags left over from this pass —
    // simpler than tracking exactly which indices still need clearing.
    chartRecorder.clearCellsHighlight({ startIndex: 0, endIndex: i });
    chartRecorder.setCells({ startIndex: j + 1, values: [{ value: arr[j + 1], label: (j + 1).toString() }] });
    chartRecorder.setCellsHighlight({ startIndex: 0, endIndex: i, highlightTags: ['sorted'] });
    recorderEngine.endGroup();
  }

  recorderEngine.beginGroup();
  logRecorder.setMessage({
    title: 'Done!',
    message: 'Every element has been inserted into its correct position — the array is fully sorted.',
    line: 9,
  });
  if (n > 0) {
    chartRecorder.setCellsHighlight({ startIndex: 0, endIndex: n - 1, highlightTags: ['sorted'] });
  }
  recorderEngine.endGroup();

  return recorderEngine.getRecording();
}