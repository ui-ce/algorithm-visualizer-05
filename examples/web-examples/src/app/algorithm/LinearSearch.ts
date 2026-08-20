import {
  ChartRecorder,
  LogRecorder,
  RecorderEngine,
  Recording,
} from '@algorithm-visualizer/typescript-recorder';

// Pseudocode line numbers referenced below correspond to:
//   1  function linearSearch(arr, target):
//   2    for i = 0 to length(arr) - 1:
//   3      if arr[i] == target:
//   4        return i
//   5    return not found

export function linearSearchVisualization(
  array: number[],
  target: number,
): Recording {
  const recorderEngine = new RecorderEngine();

  recorderEngine.beginGroup();

  const logRecorder = new LogRecorder(recorderEngine, {
    name: 'Log',
    message: 'Initial state',
    title: 'Getting started',
    line: 1,
  });

  const chartRecorder = new ChartRecorder(recorderEngine, {
    name: 'Array',
    values: array.map((value) => ({
      value,
    })),
  });

  recorderEngine.endGroup();

  for (let i = 0; i < array.length; i++) {
    recorderEngine.beginGroup();

    logRecorder.setMessage({
      title: 'Checking an element',
      message: `Comparing the element at index ${i} with the target value ${target}.`,
      line: 3,
    });

    chartRecorder.clearCellsHighlight({
      startIndex: 0,
      endIndex: array.length - 1,
    });

    chartRecorder.setCellsHighlight({
      startIndex: i,
      endIndex: i,
      highlightTags: ['compare'],
    });

    recorderEngine.endGroup();

    if (array[i] === target) {
      recorderEngine.beginGroup();

      logRecorder.setMessage({
        title: 'Found it!',
        message: `The target ${target} was found at index ${i}.`,
        line: 4,
      });

      chartRecorder.clearCellsHighlight({
        startIndex: 0,
        endIndex: array.length - 1,
      });

      chartRecorder.setCellsHighlight({
        startIndex: i,
        endIndex: i,
        highlightTags: ['target'],
      });

      recorderEngine.endGroup();

      return recorderEngine.getRecording();
    }

    recorderEngine.beginGroup();

    logRecorder.setMessage({
      title: 'Not a match',
      message: `Index ${i} contains ${array[i]}, so the search continues.`,
      line: 3,
    });

    chartRecorder.setCellsHighlight({
      startIndex: i,
      endIndex: i,
      highlightTags: ['eliminated'],
    });

    recorderEngine.endGroup();
  }

  recorderEngine.beginGroup();

  logRecorder.setMessage({
    title: 'Not found',
    message: `${target} does not appear in this array.`,
    line: 5,
  });

  chartRecorder.clearCellsHighlight({
    startIndex: 0,
    endIndex: array.length - 1,
  });

  recorderEngine.endGroup();

  return recorderEngine.getRecording();
}