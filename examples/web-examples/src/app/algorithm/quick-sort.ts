import {
  ChartInitParams,
  ChartRecorder,
  LogInitParams,
  LogRecorder,
  RecorderEngine,
  Recording,
} from '@algorithm-visualizer/typescript-recorder';

// Pseudocode line numbers referenced by title/line below correspond to:
//   1  function quickSort(arr, low, high):
//   2    if low < high:
//   3      pivotIndex = partition(arr, low, high)
//   4      quickSort(arr, low, pivotIndex - 1)
//   5      quickSort(arr, pivotIndex + 1, high)
//   6  function partition(arr, low, high):
//   7    pivot = arr[high]
//   8    i = low - 1
//   9    for j = low to high - 1:
//   10     if arr[j] < pivot: i++, swap(arr[i], arr[j])
//   11   swap(arr[i + 1], arr[high])
//   12   return i + 1
export function quickSortVisualization(arr: number[]): Recording {
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

  // Lomuto partition scheme — always picks the last element of the
  // current section as the pivot, which keeps the partition loop (and
  // its visualization) a single clean left-to-right sweep instead of
  // needing two inward-moving pointers.
  function partition(low: number, high: number): number {
    const pivotValue = arr[high];

    recorderEngine.beginGroup();
    logRecorder.setMessage({
      title: 'Choosing a pivot',
      message: `Using the last element of this section, value ${pivotValue} at index ${high}, as the pivot.`,
      line: 7,
    });
    chartRecorder.setCellsHighlight({ startIndex: high, endIndex: high, highlightTags: ['pivot'] });
    recorderEngine.endGroup();

    // i tracks the right-most index of the "known smaller than pivot"
    // region — it starts one before the section so an empty region is
    // representable without a separate flag.
    let i = low - 1;

    for (let j = low; j < high; j++) {
      recorderEngine.beginGroup();
      logRecorder.setMessage({
        title: 'Comparing against the pivot',
        message: `Checking whether the element at index ${j} is smaller than the pivot (${pivotValue}).`,
        line: 10,
      });
      chartRecorder.setCellsHighlight({ startIndex: j, endIndex: j, highlightTags: ['compare'] });
      recorderEngine.endGroup();

      if (arr[j] < pivotValue) {
        i++;

        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];

          recorderEngine.beginGroup();
          logRecorder.setMessage({
            title: 'Swapping into the smaller-than-pivot region',
            message: `Element at index ${j} is smaller than the pivot, so it swaps with index ${i} to extend the region of values known to be less than the pivot.`,
            line: 10,
          });
          chartRecorder.setCellsHighlight({ startIndex: i, endIndex: i, highlightTags: ['swap'] });
          // Using setCells here instead of swapCells — same approach as
          // bubble/merge sort. Two single-cell writes since i and j
          // aren't necessarily adjacent, unlike bubble sort's j/j+1.
          chartRecorder.setCells({ startIndex: i, values: [{ value: arr[i], label: i.toString() }] });
          chartRecorder.setCells({ startIndex: j, values: [{ value: arr[j], label: j.toString() }] });
          recorderEngine.endGroup();
        } else {
          recorderEngine.beginGroup();
          logRecorder.setMessage({
            title: 'Already in place',
            message: `Element at index ${j} is smaller than the pivot and already sits right after the smaller-than-pivot region, so no swap is needed.`,
            line: 10,
          });
          recorderEngine.endGroup();
        }
      }

      recorderEngine.beginGroup();
      // Only clears index j's 'compare' tag — if j also just became i
      // above, its cell is already showing 'swap', and clearing here
      // is what removes that once we move on to the next j.
      chartRecorder.clearCellsHighlight({ startIndex: j, endIndex: j });
      recorderEngine.endGroup();
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    recorderEngine.beginGroup();
    logRecorder.setMessage({
      title: 'Placing the pivot',
      message: `Swapping the pivot into index ${i + 1} — every element before it is now smaller, every element from there on is greater than or equal to it.`,
      line: 11,
    });
    chartRecorder.clearCellsHighlight({ startIndex: high, endIndex: high });
    chartRecorder.setCells({ startIndex: i + 1, values: [{ value: arr[i + 1], label: (i + 1).toString() }] });
    chartRecorder.setCells({ startIndex: high, values: [{ value: arr[high], label: high.toString() }] });
    // The pivot's new position is its final, correct sorted index —
    // Lomuto partition never moves it again after this point.
    chartRecorder.setCellsHighlight({ startIndex: i + 1, endIndex: i + 1, highlightTags: ['sorted'] });
    recorderEngine.endGroup();

    return i + 1;
  }

  // low > high happens whenever a partition puts the pivot right at
  // one edge of its section (e.g. the section was already increasing),
  // leaving an empty subsection on that side — guarded here rather than
  // relying on the caller, since Quick Sort (unlike Merge Sort's always
  // start <= end split) doesn't guarantee that on its own.
  function quickSort(low: number, high: number): void {
    if (low > high) {
      return;
    }

    if (low === high) {
      recorderEngine.beginGroup();
      logRecorder.setMessage({
        title: 'Single-element section',
        message: `The section at index ${low} contains only one element, so it's already in its final position.`,
        line: 2,
      });
      chartRecorder.setCellsHighlight({ startIndex: low, endIndex: low, highlightTags: ['sorted'] });
      recorderEngine.endGroup();
      return;
    }

    recorderEngine.beginGroup();
    chartRecorder.setCellsHighlight({ startIndex: low, endIndex: high, highlightTags: ['section'] });
    logRecorder.setMessage({
      title: 'Sorting a section',
      message: `Partitioning and recursively sorting the section from index ${low} to ${high}.`,
      line: 2,
    });
    recorderEngine.endGroup();

    const pivotIndex = partition(low, high);

    recorderEngine.beginGroup();
    chartRecorder.clearCellsHighlight({ startIndex: low, endIndex: high });
    // partition() already marked pivotIndex 'sorted' — re-apply it here
    // since the clearCellsHighlight above just wiped it out too.
    chartRecorder.setCellsHighlight({ startIndex: pivotIndex, endIndex: pivotIndex, highlightTags: ['sorted'] });
    recorderEngine.endGroup();

    quickSort(low, pivotIndex - 1);
    quickSort(pivotIndex + 1, high);
  }

  quickSort(0, arr.length - 1);

  recorderEngine.beginGroup();
  logRecorder.setMessage({
    title: 'Done!',
    message: 'Every section has been partitioned around its pivot — the array is fully sorted.',
    line: 1,
  });
  chartRecorder.setCellsHighlight({ startIndex: 0, endIndex: arr.length - 1, highlightTags: ['sorted'] });
  recorderEngine.endGroup();

  return recorderEngine.getRecording();
}