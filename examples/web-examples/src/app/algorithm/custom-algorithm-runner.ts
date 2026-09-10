import {
  Array2DInitParams,
  Array2dRecorder,
  ChartInitParams,
  ChartRecorder,
  RecorderEngine,
  Recording,
} from '@algorithm-visualizer/typescript-recorder';
import type { Language } from '../core/services/language.service';

export type VisualizationKind = 'chart' | 'array2d';

export interface PythonExecutionFrame {
  line: number | null;
  variables: Record<string, unknown>;
  array: number[];
  changedIndices: number[];
  changeType: 'none' | 'active' | 'swap' | 'sorted';
}

export interface CustomRunError {
  message: string;
  line: number | null;
}

export interface CustomRunResult {
  recording: Recording | null;
  execution: PythonExecutionFrame[];
  visualizationKind: VisualizationKind;
  error: CustomRunError | null;
}

interface WorkerFrame {
  line: number | null;
  variables: Record<string, unknown>;
  array: number[];
}

interface WorkerResponse {
  type: 'ready' | 'result' | 'error';
  frames?: WorkerFrame[];
  error?: {
    message: string;
    line: number | null;
  };
}

const MAX_TRACE_STEPS = 4000;
const MAX_VISIBLE_CELLS = 30;

// 'compare' is deliberately NOT in here (and not in the legend either,
// see page.ts's legendItems): this runner only ever sees *values*
// after each traced line, never the expressions the person's code
// evaluated to get there, so there is no honest way to know a line was
// a comparison rather than, say, a read for printing. 'sorted' IS
// derivable (see isNonDecreasing below) because it's a fact about the
// final values, not a guess about intent.
const CHART_METADATA_ENTRY = {
  type: 'Chart' as const,
  metadata: {
    defaultColor: 'var(--color-viz-default)',
    highlightTags: [
      { tag: 'active', color: 'var(--color-viz-active)' },
      { tag: 'swap', color: 'var(--color-viz-swapping)' },
      { tag: 'sorted', color: 'var(--color-viz-sorted)' },
    ],
  },
};

// Same tag vocabulary/colors as the Chart above (see the comment on
// CHART_METADATA_ENTRY) so the legend and behavior read consistently
// regardless of which visualization a given run ends up using — see
// detectVisualizationKind() for how that choice is made. No `compact`
// flag here (unlike practice.ts's own ARRAY_2D_METADATA_ENTRY, which
// deliberately IS compact because there it's a side panel under a
// Graph) — on this page Array2D is the main visualization, so it gets
// full size.
const ARRAY2D_METADATA_ENTRY = {
  type: 'Array2D' as const,
  metadata: {
    defaultColor: 'var(--color-viz-default)',
    highlightTags: [
      { tag: 'active', color: 'var(--color-viz-active)' },
      { tag: 'sorted', color: 'var(--color-viz-sorted)' },
    ],
  },
};

let sharedWorker: Worker | null = null;

function getPythonWorker(): Worker {
  if (sharedWorker) {
    return sharedWorker;
  }

  sharedWorker = new Worker(
    new URL('./python-execution.worker', import.meta.url),
    { type: 'module' },
  );

  return sharedWorker;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function changedIndices(previous: number[], current: number[]): number[] {
  const result: number[] = [];
  const length = Math.max(previous.length, current.length);

  for (let i = 0; i < length; i += 1) {
    if (previous[i] !== current[i]) {
      result.push(i);
    }
  }

  return result;
}

function isSimpleSwap(previous: number[], current: number[], indices: number[]): boolean {
  if (indices.length !== 2 || previous.length !== current.length) {
    return false;
  }

  const [a, b] = indices;
  return previous[a] === current[b] && previous[b] === current[a];
}

function isNonDecreasing(values: number[]): boolean {
  for (let i = 1; i < values.length; i += 1) {
    if (values[i] < values[i - 1]) {
      return false;
    }
  }
  return true;
}

// Whether a run gets shown as bars (Chart) or as a single-row grid of
// boxes (Array2D — the same recorder DFS/BFS/Dijkstra already use for
// their call stack / queue panel, see algorithm/dfs.ts's
// `stackRecorder`) is decided by ONE thing: did the tracked array's
// LENGTH ever change during the whole run? Classic in-place sorting
// and searching never resizes the array — every step is a value
// swap/compare at fixed positions — so those stay as Chart bars. A
// stack/queue built with append()/pop()/pop(0) necessarily grows and
// shrinks, which is exactly what a plain bar chart can't represent
// meaningfully — so those switch to Array2D automatically. This is a
// property of what the code actually did, checked after the fact,
// not something the person has to declare up front.
export function detectVisualizationKind(workerFrames: WorkerFrame[]): VisualizationKind {
  let firstLength: number | null = null;

  for (const frame of workerFrames) {
    const length = Array.isArray(frame.array) ? frame.array.length : 0;

    if (firstLength === null) {
      firstLength = length;
      continue;
    }

    if (length !== firstLength) {
      return 'array2d';
    }
  }

  return 'chart';
}

type LengthChangeOp =
  | { kind: 'none' }
  | { kind: 'append'; values: number[] }
  | { kind: 'prepend'; values: number[] }
  | { kind: 'truncateEnd'; count: number }
  | { kind: 'truncateStart'; count: number }
  | { kind: 'rebuild' };

// Generalizes what the previous version of this function only handled
// for a length change of exactly ±1 (which is what crashed the moment
// someone wrote `arr = [42, 17, ...]` in a single line — going from
// length 0 straight to length 8 didn't match any of the ±1 cases, fell
// through to a plain setCells, and setCells has nothing to set because
// the chart still had zero cells at that point). This instead compares
// the actual values: if the shorter array is a prefix or suffix of the
// longer one, the change is a pure append/prepend/truncate of any
// size — including the very first frame, where "previous" is `[]` and
// is trivially a prefix of anything, so an initial
// `arr = [42, 17, 31, 8, 25, 14, 39, 5]` now becomes one `append` of
// all 8 values instead of crashing.
function detectLengthChange(previous: number[], current: number[]): LengthChangeOp {
  if (current.length > previous.length) {
    const grew = current.length - previous.length;
    if (previous.every((value, index) => value === current[index])) {
      return { kind: 'append', values: current.slice(previous.length) };
    }
    if (previous.every((value, index) => value === current[index + grew])) {
      return { kind: 'prepend', values: current.slice(0, grew) };
    }
  } else if (current.length < previous.length) {
    const shrank = previous.length - current.length;
    if (current.every((value, index) => value === previous[index])) {
      return { kind: 'truncateEnd', count: shrank };
    }
    if (current.every((value, index) => value === previous[index + shrank])) {
      return { kind: 'truncateStart', count: shrank };
    }
  }
  return current.length === previous.length ? { kind: 'none' } : { kind: 'rebuild' };
}

function toEntry(value: number, index: number): { value: number; label: string } {
  return { value, label: index.toString() };
}

// No separate "array input" is threaded in from the outside — the
// person's own code is the only source of data (they write
// `arr = [...]` or `stack = []` themselves, right in the editor). Both
// builders below therefore start from a genuinely empty structure and
// build up frame by frame from whatever the trace actually observed.

function buildChartRecording(workerFrames: WorkerFrame[]): {
  recording: Recording;
  execution: PythonExecutionFrame[];
} {
  const recorderEngine = new RecorderEngine();

  recorderEngine.beginGroup();
  const chartInitParams: ChartInitParams = { name: 'Array', values: [] };
  const chartRecorder = new ChartRecorder(recorderEngine, chartInitParams, 'Array');
  recorderEngine.endGroup();

  const execution: PythonExecutionFrame[] = [
    { line: null, variables: {}, array: [], changedIndices: [], changeType: 'none' },
  ];

  let previousArray: number[] = [];

  for (const workerFrame of workerFrames) {
    const currentArray = Array.isArray(workerFrame.array)
      ? workerFrame.array.filter(isFiniteNumber).slice(0, MAX_VISIBLE_CELLS)
      : [...previousArray];

    recorderEngine.beginGroup();
    if (previousArray.length > 0) {
      chartRecorder.clearCellsHighlight({ startIndex: 0, endIndex: previousArray.length - 1 });
    }

    let indices: number[] = [];
    let changeType: PythonExecutionFrame['changeType'] = 'none';

    if (currentArray.length === previousArray.length) {
      indices = changedIndices(previousArray, currentArray);
      changeType = isSimpleSwap(previousArray, currentArray, indices)
        ? 'swap'
        : indices.length > 0
          ? 'active'
          : 'none';

      chartRecorder.setCells({ startIndex: 0, values: currentArray.map(toEntry) });
    } else {
      const change = detectLengthChange(previousArray, currentArray);
      switch (change.kind) {
        case 'append':
          chartRecorder.pushCells({
            values: change.values.map((value, i) => toEntry(value, previousArray.length + i)),
          });
          indices = change.values.map((_, i) => previousArray.length + i);
          changeType = 'active';
          break;
        case 'prepend':
          chartRecorder.unshiftCells({ values: change.values.map(toEntry) });
          indices = change.values.map((_, i) => i);
          changeType = 'active';
          break;
        case 'truncateEnd':
          chartRecorder.popCells({ count: change.count });
          break;
        case 'truncateStart':
          chartRecorder.shiftCells({ count: change.count });
          break;
        case 'rebuild':
        default:
          // Arbitrary shape (insert/remove in the middle, or several
          // things changing in one traced line) — still show
          // *something* correct instead of dropping the step or
          // crashing: tear the row down and rebuild it wholesale.
          if (previousArray.length > 0) {
            chartRecorder.popCells({ count: previousArray.length });
          }
          if (currentArray.length > 0) {
            chartRecorder.pushCells({ values: currentArray.map(toEntry) });
          }
          break;
      }
    }

    if (indices.length > 0) {
      const tag = changeType === 'swap' ? 'swap' : 'active';
      for (const index of indices) {
        chartRecorder.setCellsHighlight({ startIndex: index, endIndex: index, highlightTags: [tag] });
      }
    }

    recorderEngine.endGroup();

    execution.push({
      line: workerFrame.line,
      variables: workerFrame.variables ?? {},
      array: [...currentArray],
      changedIndices: indices,
      changeType,
    });

    previousArray = [...currentArray];
  }

  // Only ever claim "sorted" when the final values genuinely are, in
  // ascending order, and the array's size never changed (a stack/queue
  // being emptied out isn't "sorted", it's just empty).
  if (previousArray.length > 1 && isNonDecreasing(previousArray)) {
    recorderEngine.beginGroup();
    chartRecorder.setCellsHighlight({ startIndex: 0, endIndex: previousArray.length - 1, highlightTags: ['sorted'] });
    recorderEngine.endGroup();

    execution.push({
      line: execution[execution.length - 1].line,
      variables: execution[execution.length - 1].variables,
      array: [...previousArray],
      changedIndices: previousArray.map((_, index) => index),
      changeType: 'sorted',
    });
  }

  return { recording: recorderEngine.getRecording(), execution };
}

// Mirrors algorithm/dfs.ts's `stackRecorder` usage exactly (single row
// at rowIndex 0, string-valued cells) — this is the same recorder DFS
// uses for its call stack and BFS/Dijkstra use for their queue, just
// driven generically by whatever list the person's own code grows and
// shrinks, instead of a hand-written traversal.
function buildArray2dRecording(workerFrames: WorkerFrame[]): {
  recording: Recording;
  execution: PythonExecutionFrame[];
} {
  const recorderEngine = new RecorderEngine();

  recorderEngine.beginGroup();
  const array2DInitParam: Array2DInitParams = { name: 'Stack', values: [[]] };
  const stackRecorder = new Array2dRecorder(recorderEngine, array2DInitParam, 'Array');
  recorderEngine.endGroup();

  const execution: PythonExecutionFrame[] = [
    { line: null, variables: {}, array: [], changedIndices: [], changeType: 'none' },
  ];

  const toCell = (value: number): string => String(value);

  let previousArray: number[] = [];

  for (const workerFrame of workerFrames) {
    const currentArray = Array.isArray(workerFrame.array)
      ? workerFrame.array.filter(isFiniteNumber).slice(0, MAX_VISIBLE_CELLS)
      : [...previousArray];

    recorderEngine.beginGroup();
    if (previousArray.length > 0) {
      stackRecorder.clearCellsHighlight({ rowIndex: 0, startIndex: 0, endIndex: previousArray.length - 1 });
    }

    let indices: number[] = [];
    let changeType: PythonExecutionFrame['changeType'] = 'none';

    if (currentArray.length === previousArray.length) {
      indices = changedIndices(previousArray, currentArray);
      changeType = indices.length > 0 ? 'active' : 'none';
      stackRecorder.setCells({ rowIndex: 0, startIndex: 0, values: currentArray.map(toCell) });
    } else {
      const change = detectLengthChange(previousArray, currentArray);
      switch (change.kind) {
        case 'append':
          stackRecorder.pushCells({ rowIndex: 0, values: change.values.map(toCell) });
          indices = change.values.map((_, i) => previousArray.length + i);
          changeType = 'active';
          break;
        case 'prepend':
          stackRecorder.unshiftCells({ rowIndex: 0, values: change.values.map(toCell) });
          indices = change.values.map((_, i) => i);
          changeType = 'active';
          break;
        case 'truncateEnd':
          stackRecorder.popCells({ rowIndex: 0, count: change.count });
          break;
        case 'truncateStart':
          stackRecorder.shiftCells({ rowIndex: 0, count: change.count });
          break;
        case 'rebuild':
        default:
          if (previousArray.length > 0) {
            stackRecorder.popCells({ rowIndex: 0, count: previousArray.length });
          }
          if (currentArray.length > 0) {
            stackRecorder.pushCells({ rowIndex: 0, values: currentArray.map(toCell) });
          }
          break;
      }
    }

    if (indices.length > 0) {
      const tag = 'active';
      for (const index of indices) {
        stackRecorder.setCellsHighlight({ rowIndex: 0, startIndex: index, endIndex: index, highlightTags: [tag] });
      }
    }

    recorderEngine.endGroup();

    execution.push({
      line: workerFrame.line,
      variables: workerFrame.variables ?? {},
      array: [...currentArray],
      changedIndices: indices,
      changeType,
    });

    previousArray = [...currentArray];
  }

  return { recording: recorderEngine.getRecording(), execution };
}

export async function runCustomArrayAlgorithm(
  userCode: string,
  language: Language = 'en',
): Promise<CustomRunResult> {
  const code = userCode.replace(/\r\n/g, '\n');

  if (!code.trim()) {
    return {
      recording: null,
      execution: [],
      visualizationKind: 'chart',
      error: {
        message: language === 'fa' ? 'کد Python نمی‌تواند خالی باشد.' : 'Python code cannot be empty.',
        line: null,
      },
    };
  }

  const worker = getPythonWorker();

  return new Promise<CustomRunResult>((resolve) => {
    let settled = false;

    const finish = (result: CustomRunResult): void => {
      if (settled) {
        return;
      }
      settled = true;
      worker.removeEventListener('message', onMessage);
      worker.removeEventListener('error', onError);
      resolve(result);
    };

    const onMessage = (event: MessageEvent<WorkerResponse>): void => {
      const response = event.data;

      if (response.type === 'result') {
        try {
          const frames = response.frames ?? [];
          const kind = detectVisualizationKind(frames);
          const built = kind === 'array2d' ? buildArray2dRecording(frames) : buildChartRecording(frames);

          finish({
            recording: built.recording,
            execution: built.execution,
            visualizationKind: kind,
            error: null,
          });
        } catch (error) {
          finish({
            recording: null,
            execution: [],
            visualizationKind: 'chart',
            error: {
              message:
                language === 'fa'
                  ? `خطا هنگام ساخت اجرای تصویری: ${error instanceof Error ? error.message : String(error)}`
                  : `Could not build the visualization: ${error instanceof Error ? error.message : String(error)}`,
              line: null,
            },
          });
        }
        return;
      }

      if (response.type === 'error') {
        finish({
          recording: null,
          execution: [],
          visualizationKind: 'chart',
          error: {
            message:
              response.error?.message ??
              (language === 'fa' ? 'اجرای Python با خطا متوقف شد.' : 'Python execution failed.'),
            line: response.error?.line ?? null,
          },
        });
      }
    };

    const onError = (): void => {
      finish({
        recording: null,
        execution: [],
        visualizationKind: 'chart',
        error: {
          message: language === 'fa' ? 'ارتباط با Python runtime برقرار نشد.' : 'Could not communicate with the Python runtime.',
          line: null,
        },
      });
    };

    worker.addEventListener('message', onMessage);
    worker.addEventListener('error', onError);

    worker.postMessage({
      type: 'run',
      code,
      maxTraceSteps: MAX_TRACE_STEPS,
      language,
    });
  });
}

export { CHART_METADATA_ENTRY, ARRAY2D_METADATA_ENTRY };