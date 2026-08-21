import {
  ChartRecorder,
  LogRecorder,
  RecorderEngine,
  Recording,
} from '@algorithm-visualizer/typescript-recorder';

// Pseudocode line numbers referenced below correspond to:
//   1  function binarySearch(arr, target):
//   2    left = 0, right = length(arr) - 1
//   3    while left <= right:
//   4      mid = (left + right) / 2
//   5      if arr[mid] == target: return mid
//   6      else if arr[mid] < target: left = mid + 1
//   7      else: right = mid - 1
//   8    return not found
export function binarySearchVisualization(array: number[], target: number): Recording {
  const recorderEngine = new RecorderEngine();

  recorderEngine.beginGroup();
  const logRecorder = new LogRecorder(recorderEngine, {
    name: 'Log',
    message: 'Initial state',
    title: 'Getting started',
    line: 2,
  });
  const chartRecorder = new ChartRecorder(recorderEngine, {
    name: 'Array',
    values: array.map((value, index) => ({
      value,
      label: index.toString(),
    })),
  });
  recorderEngine.endGroup();

  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    recorderEngine.beginGroup();
    logRecorder.setMessage({
      title: 'Narrowing the search',
      message: `Still searching between index ${left} and ${right}.`,
      line: 3,
    });
    chartRecorder.clearCellsHighlight({ startIndex: 0, endIndex: array.length - 1 });
    chartRecorder.setCellsHighlight({
      startIndex: left,
      endIndex: right,
      highlightTags: ['section'],
    });
    recorderEngine.endGroup();

    recorderEngine.beginGroup();
    logRecorder.setMessage({
      title: 'Checking the middle element',
      message: `Comparing the middle element of this section (index ${mid}) with the target value ${target}.`,
      line: 4,
    });
    chartRecorder.setCellsHighlight({
      startIndex: mid,
      endIndex: mid,
      highlightTags: ['section', 'middle'],
    });
    recorderEngine.endGroup();

    if (array[mid] === target) {
      recorderEngine.beginGroup();
      logRecorder.setMessage({
        title: 'Found it!',
        message: `The element at index ${mid} equals the target ${target}.`,
        line: 5,
      });
      chartRecorder.setCellsHighlight({
        startIndex: 0,
        endIndex: array.length - 1,
        highlightTags: [],
      });
      chartRecorder.setCellsHighlight({
        startIndex: mid,
        endIndex: mid,
        highlightTags: ['target'],
      });
      recorderEngine.endGroup();

      return recorderEngine.getRecording();
    } else if (array[mid] < target) {
      recorderEngine.beginGroup();
      logRecorder.setMessage({
        title: 'Searching the right half',
        message: `Index ${mid} holds ${array[mid]}, which is less than ${target}, so the target (if present) must be to the right.`,
        line: 6,
      });
      chartRecorder.setCellsHighlight({
        startIndex: left,
        endIndex: mid,
        highlightTags: ['eliminated'],
      });
      recorderEngine.endGroup();
      left = mid + 1;
    } else {
      recorderEngine.beginGroup();
      logRecorder.setMessage({
        title: 'Searching the left half',
        message: `Index ${mid} holds ${array[mid]}, which is greater than ${target}, so the target (if present) must be to the left.`,
        line: 7,
      });
      chartRecorder.setCellsHighlight({
        startIndex: mid,
        endIndex: right,
        highlightTags: ['eliminated'],
      });
      recorderEngine.endGroup();
      right = mid - 1;
    }
  }

  recorderEngine.beginGroup();
  logRecorder.setMessage({
    title: 'Not found',
    message: `${target} does not appear in this array.`,
    line: 8,
  });
  chartRecorder.setCellsHighlight({
    startIndex: 0,
    endIndex: array.length - 1,
    highlightTags: [],
  });
  recorderEngine.endGroup();

  return recorderEngine.getRecording();
}
