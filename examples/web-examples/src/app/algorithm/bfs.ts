import {
  Array2DInitParams,
  Array2dRecorder,
  GraphInitParams,
  GraphRecorder,
  LogInitParams,
  LogRecorder,
  RecorderEngine,
  Recording,
} from '@algorithm-visualizer/typescript-recorder';

import type { Language } from '../core/services/language.service';

type Graph = Record<string, string[]>;

const PERSIAN_DIGITS = [
  '۰',
  '۱',
  '۲',
  '۳',
  '۴',
  '۵',
  '۶',
  '۷',
  '۸',
  '۹',
];

function n(value: number, language: Language): string {
  const text = String(value);

  return language === 'fa'
    ? text.replace(
        /[0-9]/g,
        (digit) => PERSIAN_DIGITS[Number(digit)],
      )
    : text;
}

// Pseudocode line numbers:
//
// 1  function bfs(graph, start):
// 2    queue = [start], visited = {}
// 3    while queue is not empty:
// 4      node = queue.shift()
// 5      if node not in visited:
// 6        mark node visited
// 7        for neighbor in graph[node]:
// 8          if neighbor not in visited and neighbor not in queue:
// 9            queue.push(neighbor)
// 10   return visited

export function bfsVisualization(
  graph: Graph,
  start: string,
  language: Language = 'en',
): Recording {
  const recorderEngine = new RecorderEngine();

  const nodes = Object.keys(graph);

  // ------------------------------------------------------------
  // INITIAL STATE
  // ------------------------------------------------------------

  recorderEngine.beginGroup();

  const logInitParam: LogInitParams = {
    name: 'Log',
    message:
      language === 'fa'
        ? 'حالت اولیه'
        : 'Initial State',
    title:
      language === 'fa'
        ? 'شروع پیمایش BFS'
        : 'Starting BFS traversal',
    line: 2,
  };

  const logRecorder = new LogRecorder(
    recorderEngine,
    logInitParam,
  );

  const graphInitParam: GraphInitParams = {
    name: 'Graph',

    nodes: nodes.map((id) => ({
      id,
      label: id,
    })),

    edges: Object.entries(graph).flatMap(
      ([node, neighbors]) =>
        neighbors.map((neighbor) => ({
          id: `${node}-${neighbor}`,
          source: node,
          target: neighbor,
        })),
    ),

    isDirected: false,
  };

  const graphRecorder = new GraphRecorder(
    recorderEngine,
    graphInitParam,
  );

  const queue: string[] = [start];
  const visited = new Set<string>();

  // Stores the edge through which a node was first discovered.
  const discoveredVia = new Map<string, string>();

  const queueInitParam: Array2DInitParams = {
    name: 'Queue',
    values: [queue],
  };

  const queueRecorder = new Array2dRecorder(
    recorderEngine,
    queueInitParam,
  );

  // Highlight starting node.
  if (nodes.includes(start)) {
    graphRecorder.setNodeHighlight({
      id: start,
      highlightTags: ['open'],
    });
  }

  recorderEngine.endGroup();

  // ------------------------------------------------------------
  // BFS MAIN LOOP
  // ------------------------------------------------------------

  while (queue.length > 0) {
    // ----------------------------------------------------------
    // Line 3
    // ----------------------------------------------------------

    recorderEngine.beginGroup();

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'بررسی صف'
          : 'Checking the queue',

      message:
        language === 'fa'
          ? 'صف خالی نیست؛ پیمایش ادامه پیدا می‌کند.'
          : 'The queue is not empty, so the traversal continues.',

      line: 3,
    });

    queueRecorder.setCellsHighlight({
      rowIndex: 0,
      startIndex: 0,
      endIndex: queue.length - 1,
      highlightTags: ['sorting'],
    });

    recorderEngine.endGroup();

    // ----------------------------------------------------------
    // Line 4
    // ----------------------------------------------------------

    recorderEngine.beginGroup();

    const node = queue[0];

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'برداشتن گره بعدی'
          : 'Taking the next node',

      message:
        language === 'fa'
          ? `گره ${node} از ابتدای صف برداشته می‌شود.`
          : `Node ${node} is removed from the front of the queue.`,

      line: 4,
    });

    queueRecorder.setCellsHighlight({
      rowIndex: 0,
      startIndex: 0,
      endIndex: 0,
      highlightTags: ['remove'],
    });

    recorderEngine.endGroup();

    // Actually remove from the real queue.
    queue.shift();

    // Keep the visual queue synchronized.
    recorderEngine.beginGroup();

    queueRecorder.shiftCells({
      rowIndex: 0,
      count: 1,
    });

    recorderEngine.endGroup();

    // ----------------------------------------------------------
    // Line 5
    // ----------------------------------------------------------

    recorderEngine.beginGroup();

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'بررسی بازدید شدن گره'
          : 'Checking whether the node was visited',

      message:
        language === 'fa'
          ? `بررسی می‌شود که آیا گره ${node} قبلاً بازدید شده است یا نه.`
          : `Checking whether node ${node} has already been visited.`,

      line: 5,
    });

    graphRecorder.setNodeHighlight({
      id: node,
      highlightTags: ['current'],
    });

    recorderEngine.endGroup();

    // ----------------------------------------------------------
    // Already visited
    // ----------------------------------------------------------

    if (visited.has(node)) {
      recorderEngine.beginGroup();

      logRecorder.setMessage({
        title:
          language === 'fa'
            ? 'گره قبلاً بازدید شده است'
            : 'Node already visited',

        message:
          language === 'fa'
            ? `گره ${node} قبلاً بازدید شده است؛ بنابراین از آن عبور می‌کنیم.`
            : `Node ${node} was already visited, so it is skipped.`,

        line: 5,
      });

      graphRecorder.setNodeHighlight({
        id: node,
        highlightTags: ['closed'],
      });

      recorderEngine.endGroup();

      continue;
    }

    // ----------------------------------------------------------
    // Line 6
    // ----------------------------------------------------------

    recorderEngine.beginGroup();

    visited.add(node);

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'بازدید از گره'
          : 'Visiting the node',

      message:
        language === 'fa'
          ? `گره ${node} هنوز بازدید نشده است؛ اکنون بازدیدشده علامت‌گذاری می‌شود.`
          : `Node ${node} has not been visited yet, so it is marked as visited.`,

      line: 6,
    });

    graphRecorder.setNodeHighlight({
      id: node,
      highlightTags: ['visit'],
    });

    const parent = discoveredVia.get(node);

    if (parent !== undefined) {
      graphRecorder.setEdgeHighlight({
        id: `${parent}-${node}`,
        highlightTags: ['final-path'],
      });
    }

    recorderEngine.endGroup();

    // ----------------------------------------------------------
    // Line 7 — iterate through neighbors
    // ----------------------------------------------------------

    const neighbors = graph[node] ?? [];

    for (const neighbor of neighbors) {
      recorderEngine.beginGroup();

      logRecorder.setMessage({
        title:
          language === 'fa'
            ? 'بررسی همسایه'
            : 'Checking a neighbor',

        message:
          language === 'fa'
            ? `همسایه ${neighbor} از گره ${node} بررسی می‌شود.`
            : `Checking neighbor ${neighbor} of node ${node}.`,

        line: 7,
      });

      graphRecorder.setEdgeHighlight({
        id: `${node}-${neighbor}`,
        highlightTags: ['compare'],
      });

      graphRecorder.setNodeHighlight({
        id: neighbor,
        highlightTags: ['current'],
      });

      recorderEngine.endGroup();

      // --------------------------------------------------------
      // Line 8
      // --------------------------------------------------------

      recorderEngine.beginGroup();

      const alreadyVisited = visited.has(neighbor);
      const alreadyQueued = queue.includes(neighbor);

      logRecorder.setMessage({
        title:
          language === 'fa'
            ? 'بررسی وضعیت همسایه'
            : 'Checking neighbor status',

        message:
          language === 'fa'
            ? alreadyVisited
              ? `گره ${neighbor} قبلاً بازدید شده است.`
              : alreadyQueued
                ? `گره ${neighbor} قبلاً در صف قرار گرفته است.`
                : `گره ${neighbor} هنوز بازدید نشده و در صف نیست.`
            : alreadyVisited
              ? `Node ${neighbor} has already been visited.`
              : alreadyQueued
                ? `Node ${neighbor} is already in the queue.`
                : `Node ${neighbor} has not been visited and is not in the queue.`,

        line: 8,
      });

      recorderEngine.endGroup();

      // --------------------------------------------------------
      // Do not enqueue visited / already queued nodes.
      // --------------------------------------------------------

      if (alreadyVisited || alreadyQueued) {
        recorderEngine.beginGroup();

        if (alreadyVisited) {
          graphRecorder.setNodeHighlight({
            id: neighbor,
            highlightTags: ['closed'],
          });
        } else {
          graphRecorder.setNodeHighlight({
            id: neighbor,
            highlightTags: ['open'],
          });
        }

        graphRecorder.clearEdgeHighlight({
          id: `${node}-${neighbor}`,
        });

        recorderEngine.endGroup();

        continue;
      }

      // --------------------------------------------------------
      // Line 9 — enqueue neighbor
      // --------------------------------------------------------

      discoveredVia.set(neighbor, node);
      queue.push(neighbor);

      recorderEngine.beginGroup();

      logRecorder.setMessage({
        title:
          language === 'fa'
            ? 'افزودن به صف'
            : 'Adding to the queue',

        message:
          language === 'fa'
            ? `گره ${neighbor} به انتهای صف اضافه می‌شود.`
            : `Node ${neighbor} is added to the end of the queue.`,

        line: 9,
      });

      queueRecorder.pushCells({
        rowIndex: 0,
        values: [neighbor],
      });

      queueRecorder.setCellsHighlight({
        rowIndex: 0,
        startIndex: queue.length - 1,
        endIndex: queue.length - 1,
        highlightTags: ['new'],
      });

      graphRecorder.setNodeHighlight({
        id: neighbor,
        highlightTags: ['open'],
      });

      graphRecorder.clearEdgeHighlight({
        id: `${node}-${neighbor}`,
      });

      recorderEngine.endGroup();
    }

    // ----------------------------------------------------------
    // Current node finished
    // ----------------------------------------------------------

    recorderEngine.beginGroup();

    graphRecorder.setNodeHighlight({
      id: node,
      highlightTags: ['closed'],
    });

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'پایان پردازش گره'
          : 'Finished processing the node',

      message:
        language === 'fa'
          ? `تمام همسایه‌های گره ${node} بررسی شدند.`
          : `All neighbors of node ${node} have been checked.`,

      line: 7,
    });

    recorderEngine.endGroup();
  }

  // ------------------------------------------------------------
  // Line 10 — traversal finished
  // ------------------------------------------------------------

  recorderEngine.beginGroup();

  logRecorder.setMessage({
    title:
      language === 'fa'
        ? 'پایان پیمایش'
        : 'Traversal complete',

    message:
      language === 'fa'
        ? 'تمام گره‌های قابل دسترس از گره شروع بازدید شده‌اند.'
        : 'Every reachable node from the starting node has been visited.',

    line: 10,
  });

  recorderEngine.endGroup();

  return recorderEngine.getRecording();
}