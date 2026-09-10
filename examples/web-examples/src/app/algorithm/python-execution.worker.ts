import { loadPyodide, version as pyodideVersion } from 'pyodide';

interface RunRequest {
    type: 'run';
    code: string;
    maxTraceSteps: number;
    language: 'fa' | 'en';
}

interface TraceFrame {
    line: number | null;
    variables: Record<string, unknown>;
    array: number[];
}

interface WorkerResult {
    type: 'result' | 'error';
    frames?: TraceFrame[];
    error?: {
        message: string;
        line: number | null;
    };
}

const FILENAME = 'custom_algorithm.py';

const pyodideReady = loadPyodide({
    indexURL: `https://cdn.jsdelivr.net/pyodide/v${pyodideVersion}/full/`,
});

const ctx = self as unknown as {
    onmessage: ((event: MessageEvent<RunRequest>) => void) | null;
    postMessage: (message: WorkerResult) => void;
};

function extractLine(message: string): number | null {
    const matches = [...message.matchAll(/line (\d+)/g)];
    return matches.length > 0 ? Number(matches[matches.length - 1][1]) : null;
}

function normalizeError(error: unknown, language: 'fa' | 'en'): { message: string; line: number | null } {
    const raw = error instanceof Error ? error.message : String(error);
    const line = extractLine(raw);

    return {
        message:
            language === 'fa'
                ? /SyntaxError/.test(raw)
                    ? `خطای نحوی Python: ${raw}`
                    : `خطا در اجرای Python: ${raw}`
                : /SyntaxError/.test(raw)
                    ? `Python syntax error: ${raw}`
                    : `Python execution error: ${raw}`,
        line,
    };
}

const executionScript = `
import sys
import json
import math
import copy
import traceback
import re

FILENAME = "custom_algorithm.py"
frames = []
frame_state = {}
trace_steps = 0
tracked_array = None


def safe_value(value, depth=0):
    if depth > 3:
        return repr(value)

    if value is None or isinstance(value, (str, bool, int)):
        return value

    if isinstance(value, float):
        return value if math.isfinite(value) else repr(value)

    if isinstance(value, (list, tuple)):
        return [safe_value(x, depth + 1) for x in list(value)[:50]]

    if isinstance(value, dict):
        return {
            str(k): safe_value(v, depth + 1)
            for k, v in list(value.items())[:50]
        }

    if isinstance(value, (set, frozenset)):
        return [safe_value(x, depth + 1) for x in list(value)[:50]]

    return repr(value)


def is_number_list(value):
    return isinstance(value, list) and all(
        isinstance(x, (int, float)) and not isinstance(x, bool) for x in value
    )


# Name-independent by design: every frame scans the CURRENT frame's own
# locals (falling back to globals, so top-level-only scripts with no
# functions still work) for list-of-numbers variables, and picks
# whichever one most plausibly continues the array from the previous
# frame - same length preferred, then fewest differing positions from
# last time. There used to be a reserved "input_array" name here (the
# seed value injected from outside); now that the person's code is the
# only source of data, that reservation is gone too - a variable
# literally named input_array is just a normal candidate like any
# other name now.
def find_array_candidates(frame):
    candidates = {}
    for source in (frame.f_locals, frame.f_globals):
        for name, value in source.items():
            if name.startswith('__'):
                continue
            if is_number_list(value):
                candidates[name] = value
    return candidates


def pick_array(frame, previous):
    candidates = find_array_candidates(frame)
    if not candidates:
        return previous if previous is not None else []

    if previous is None:
        # Nothing to compare against yet - just take the first
        # candidate alphabetically so the very first frame is
        # deterministic rather than dict-iteration-order-dependent.
        best_name = sorted(candidates.keys())[0]
        return list(candidates[best_name])

    target_length = len(previous)
    same_length = {n: v for n, v in candidates.items() if len(v) == target_length}
    pool = same_length if same_length else candidates

    def diff_score(value):
        mismatches = sum(1 for a, b in zip(value, previous) if a != b)
        return mismatches + abs(len(value) - len(previous))

    best_name = min(pool, key=lambda n: diff_score(pool[n]))
    return list(pool[best_name])


def snapshot_variables(frame):
    values = {}

    for name, value in frame.f_locals.items():
        if name.startswith('__'):
            continue

        try:
            values[name] = safe_value(copy.deepcopy(value))
        except Exception:
            try:
                values[name] = repr(value)
            except Exception:
                values[name] = '<unavailable>'

    return values


def append_frame(frame, line):
    global trace_steps, tracked_array

    trace_steps += 1

    if trace_steps > MAX_TRACE_STEPS:
        raise RuntimeError(
            f'Execution exceeded the maximum of {MAX_TRACE_STEPS} traced steps. '
            'This usually means there is an infinite loop.'
        )

    variables = snapshot_variables(frame)
    tracked_array = pick_array(frame, tracked_array)

    frames.append({
        'line': line,
        'variables': variables,
        'array': safe_value(tracked_array),
    })


def trace(frame, event, arg):
    if frame.f_code.co_filename != FILENAME:
        return None

    key = id(frame)

    if event == 'call':
        frame_state[key] = None
        return trace

    if event == 'line':
        previous_line = frame_state.get(key)

        if previous_line is not None:
            append_frame(frame, previous_line)

        frame_state[key] = frame.f_lineno
        return trace

    if event == 'return':
        previous_line = frame_state.get(key)

        if previous_line is not None:
            append_frame(frame, previous_line)

        frame_state.pop(key, None)
        return trace

    return trace


def traceback_line(exc):
    text = ''.join(traceback.format_exception(type(exc), exc, exc.__traceback__))
    matches = re.findall(r'File "' + re.escape(FILENAME) + r'", line (\\d+)', text)
    return int(matches[-1]) if matches else None


# No required function name, no required entry-point name (no "main"
# has to exist), and - as of this version - no reserved input variable
# either: this just runs the person's script exactly the way
# "python their_file.py" would. Top-level code executes immediately, in
# order, and any function they define can be called however and
# whenever they like (including the standard
# "if __name__ == '__main__':" idiom, since __name__ is set below).
# Whatever data they want to visualize, they declare themselves, under
# whatever name they like (arr, stack, queue, data, ...).
namespace = {
    '__name__': '__main__',
}

try:
    compiled = compile(USER_CODE, FILENAME, 'exec')

    sys.settrace(trace)
    try:
        exec(compiled, namespace, namespace)
    finally:
        sys.settrace(None)

    print(json.dumps({
        'frames': frames,
    }, ensure_ascii=False, allow_nan=False))

except Exception as exc:
    sys.settrace(None)

    print(json.dumps({
        'error': str(exc),
        'line': traceback_line(exc),
    }, ensure_ascii=False))
`;

ctx.onmessage = async (event: MessageEvent<RunRequest>): Promise<void> => {
    if (event.data.type !== 'run') {
        return;
    }

    try {
        const pyodide = await pyodideReady;

        // Python imports are resolved by Pyodide before the traced execution starts.
        await pyodide.loadPackagesFromImports(event.data.code);

        const globals = pyodide.globals as any;

        globals.set('USER_CODE', event.data.code);
        globals.set('MAX_TRACE_STEPS', event.data.maxTraceSteps);

        let capturedOutput = '';

        pyodide.setStdout({
            batched: (text: string) => {
                capturedOutput += text;
            },
        });

        try {
            await pyodide.runPythonAsync(executionScript, {
                filename: FILENAME,
            });
        } finally {
            pyodide.setStdout();
        }

        const outputLines = capturedOutput.trim().split('\n').map((line) => line.trim()).filter(Boolean);
        const output = outputLines[outputLines.length - 1] ?? '';

        if (!output) {
            throw new Error(
                event.data.language === 'fa'
                    ? 'Python runtime هیچ نتیجه‌ای برنگرداند.'
                    : 'The Python runtime returned no execution data.',
            );
        }

        const result = JSON.parse(output) as {
            frames?: TraceFrame[];
            error?: string;
            line?: number | null;
        };

        if (result.error) {
            ctx.postMessage({
                type: 'error',
                error: {
                    message:
                        event.data.language === 'fa'
                            ? `خطا در اجرای Python: ${result.error}`
                            : `Python execution error: ${result.error}`,
                    line: result.line ?? null,
                },
            });
            return;
        }

        ctx.postMessage({
            type: 'result',
            frames: result.frames ?? [],
        });
    } catch (error) {
        ctx.postMessage({
            type: 'error',
            error: normalizeError(error, event.data.language),
        });
    }
};