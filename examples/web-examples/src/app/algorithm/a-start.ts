import {
  Array2dRecorder,
  ChartRecorder,
  GraphRecorder,
  LogInitParams,
  LogRecorder,
  RecorderEngine,
  Recording,
} from '@algorithm-visualizer/typescript-recorder';
import type { Language } from '../core/services/language.service';

type Graph = Record<string, Record<string, number>[]>;

interface OpenNode {
  id: string;
  g: number;
  h: number;
  f: number;
}

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

function n(value: number, language: Language): string {
  const text = String(value);

  return language === 'fa'
    ? text.replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)])
    : text;
}

/*
 * Pseudocode line numbers used by this visualization:
 *
 *  1  function aStar(graph, start, goal):
 *  2    g[start] = 0, open = [start]
 *  3    while open is not empty:
 *  4      current = node with lowest f(n)
 *  5      if current == goal: return path
 *  6      for neighbor in graph[current]:
 *  7        newG = g[current] + weight
 *  8        if newG < g[neighbor]:
 *  9          g[neighbor] = newG
 * 10          f[neighbor] = g[neighbor] + h(neighbor)
 * 11          open.push(neighbor)
 * 12    return no path
 *
 * Because the graph does not contain coordinates, h(n) = 0.
 * Therefore f(n) = g(n), so this implementation behaves like
 * Dijkstra while preserving the A* structure.
 */

export function aStarVisualization(
  graph: Graph,
  start: string,
  end: string,
  language: Language = 'en',
): Recording {
  const recorderEngine = new RecorderEngine();

  const nodes = Object.keys(graph);

  // ------------------------------------------------------------
  // Initial state
  // ------------------------------------------------------------

  recorderEngine.beginGroup();

  const logInitParams: LogInitParams = {
    name: 'Log',
    message: language === 'fa' ? 'وضعیت اولیه' : 'Initial state',
    title: language === 'fa' ? 'شروع A*' : 'Starting A*',
    line: 2,
  };

  const logRecorder = new LogRecorder(
    recorderEngine,
    logInitParams,
    'Log',
  );

  const graphRecorder = new GraphRecorder(recorderEngine, {
    name: 'Graph',
    nodes: nodes.map((id) => ({
      id,
      label: id,
    })),
    edges: Object.entries(graph).flatMap(([node, adjacent]) =>
      adjacent.map((adj) => {
        const neighbor = Object.keys(adj)[0];

        return {
          id: `${node}${neighbor}`,
          source: node,
          target: neighbor,
          label: String(adj[neighbor]),
        };
      }),
    ),
    isDirected: true,
  });

  graphRecorder.setNodeHighlight({
    id: start,
    highlightTags: ['open'],
  });

  const openRecorder = new Array2dRecorder(recorderEngine, {
    name: 'Open Set',
    values: [[start]],
  });

  const closedRecorder = new Array2dRecorder(recorderEngine, {
    name: 'Closed Set',
    values: [[]],
  });

  const costChart = new ChartRecorder(recorderEngine, {
    name: 'Node Costs',
    values: nodes.map((node) => ({
      label: node,
      value: 0,
    })),
  });

  recorderEngine.endGroup();

  // ------------------------------------------------------------
  // A* state
  // ------------------------------------------------------------

  const openList: OpenNode[] = [
    {
      id: start,
      g: 0,
      h: 0,
      f: 0,
    },
  ];

  const closedList: string[] = [];
  const parents: Record<string, string> = {};

  const gCosts: Record<string, number> = {};
  const hCosts: Record<string, number> = {};
  const fCosts: Record<string, number> = {};

  for (const node of nodes) {
    gCosts[node] = node === start ? 0 : Infinity;
    hCosts[node] = 0;
    fCosts[node] = node === start ? 0 : Infinity;
  }

  // ------------------------------------------------------------
  // Main A* loop
  // ------------------------------------------------------------

  while (openList.length > 0) {
    // ----------------------------------------------------------
    // Line 3 — while open is not empty
    // ----------------------------------------------------------

    recorderEngine.beginGroup();

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'ادامه جست‌وجو'
          : 'Continuing the search',
      message:
        language === 'fa'
          ? `مجموعه باز خالی نیست و ${n(
              openList.length,
              language,
            )} گره در آن قرار دارد.`
          : `The open set is not empty and contains ${openList.length} node(s).`,
      line: 3,
    });

    openRecorder.setCells({
      rowIndex: 0,
      startIndex: 0,
      values: openList.map((node) => node.id),
    });

    recorderEngine.endGroup();

    // ----------------------------------------------------------
    // Line 4 — choose node with lowest f
    // ----------------------------------------------------------

    openList.sort((a, b) => a.f - b.f);

    recorderEngine.beginGroup();

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'انتخاب بهترین گره'
          : 'Choosing the best node',
      message:
        language === 'fa'
          ? 'گرهی که کمترین هزینه تخمینی f(n) را دارد برای بررسی بعدی انتخاب می‌شود.'
          : 'The node with the lowest estimated total cost f(n) is selected next.',
      line: 4,
    });

    openRecorder.setCells({
      rowIndex: 0,
      startIndex: 0,
      values: openList.map((node) => node.id),
    });

    openRecorder.setCellsHighlight({
      rowIndex: 0,
      startIndex: 0,
      endIndex: openList.length - 1,
      highlightTags: ['sorting'],
    });

    recorderEngine.endGroup();

    recorderEngine.queue(() => {
      openRecorder.clearAllRowsHighlight({});
    });

    // ----------------------------------------------------------
    // Take the selected node out of Open
    // ----------------------------------------------------------

    const current = openList.shift()!;

    recorderEngine.beginGroup();

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'برداشتن گره انتخاب‌شده'
          : 'Taking the selected node',
      message:
        language === 'fa'
          ? `گره ${current.id} کمترین هزینه تخمینی را دارد و برای بررسی از مجموعه باز برداشته می‌شود.`
          : `Node ${current.id} has the lowest estimated total cost and is removed from the open set for exploration.`,
      line: 4,
    });

    openRecorder.setCells({
      rowIndex: 0,
      startIndex: 0,
      values: openList.map((node) => node.id),
    });

    graphRecorder.setNodeHighlight({
      id: current.id,
      highlightTags: ['current'],
    });

    recorderEngine.endGroup();

    // ----------------------------------------------------------
    // Line 5 — check whether current is the goal
    // ----------------------------------------------------------

    recorderEngine.beginGroup();

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'بررسی رسیدن به مقصد'
          : 'Checking the destination',
      message:
        language === 'fa'
          ? `بررسی می‌شود که آیا گره فعلی ${current.id} همان مقصد ${end} است یا خیر.`
          : `Checking whether the current node ${current.id} is the destination ${end}.`,
      line: 5,
    });

    recorderEngine.endGroup();

    if (current.id === end) {
      closedList.push(current.id);

      recorderEngine.beginGroup();

      closedRecorder.pushCells({
        rowIndex: 0,
        values: [current.id],
      });

      closedRecorder.setCellsHighlight({
        rowIndex: 0,
        startIndex: closedList.length - 1,
        endIndex: closedList.length - 1,
        highlightTags: ['new'],
      });

      logRecorder.setMessage({
        title:
          language === 'fa'
            ? 'مقصد پیدا شد'
            : 'Destination reached',
        message:
          language === 'fa'
            ? `گره ${end} پیدا شد. مسیر بهینه پیدا‌شده از والدهای ثبت‌شده بازسازی می‌شود.`
            : `The destination ${end} has been reached. The best path found is reconstructed from the recorded parents.`,
        line: 5,
      });

      const bestPath = getBestPath(end, parents);

      graphRecorder.clearAllEdgesHighlight({});

      bestPath.forEach((edge) => {
        graphRecorder.setEdgeHighlight({
          id: edge,
          highlightTags: ['final-path'],
        });
      });

      recorderEngine.endGroup();

      break;
    }

    // ----------------------------------------------------------
    // Current node becomes closed
    // ----------------------------------------------------------

    recorderEngine.beginGroup();

    closedList.push(current.id);

    closedRecorder.pushCells({
      rowIndex: 0,
      values: [current.id],
    });

    closedRecorder.setCellsHighlight({
      rowIndex: 0,
      startIndex: closedList.length - 1,
      endIndex: closedList.length - 1,
      highlightTags: ['new'],
    });

    graphRecorder.setNodeHighlight({
      id: current.id,
      highlightTags: ['current'],
    });

    logRecorder.setMessage({
      title:
        language === 'fa'
          ? 'بررسی گره فعلی'
          : 'Exploring the current node',
      message:
        language === 'fa'
          ? `گره ${current.id} به‌عنوان گره فعلی بررسی می‌شود.`
          : `Node ${current.id} is now being explored.`,
      line: 5,
    });

    recorderEngine.endGroup();

    recorderEngine.queue(() => {
      closedRecorder.clearAllRowsHighlight({});
    });

    // ----------------------------------------------------------
    // Line 6 — visit neighbors
    // ----------------------------------------------------------

    const neighbors = graph[current.id] ?? [];

    for (const neighborObj of neighbors) {
      const neighbor = Object.keys(neighborObj)[0];
      const weight = neighborObj[neighbor];

      recorderEngine.beginGroup();

      logRecorder.setMessage({
        title:
          language === 'fa'
            ? 'بررسی همسایه'
            : 'Checking a neighbor',
        message:
          language === 'fa'
            ? `همسایه ${neighbor} از گره ${current.id} بررسی می‌شود.`
            : `Neighbor ${neighbor} of node ${current.id} is being examined.`,
        line: 6,
      });

      graphRecorder.setEdgeHighlight({
        id: `${current.id}${neighbor}`,
        highlightTags: ['compare'],
      });

      recorderEngine.endGroup();

      // --------------------------------------------------------
      // Line 7 — calculate new cost
      // --------------------------------------------------------

      const newCost = gCosts[current.id] + weight;

      recorderEngine.beginGroup();

      logRecorder.setMessage({
        title:
          language === 'fa'
            ? 'محاسبه هزینه جدید'
            : 'Calculating the new cost',
        message:
          language === 'fa'
            ? `هزینه رسیدن به ${neighbor} از مسیر ${current.id} برابر ${n(
                newCost,
                language,
              )} محاسبه شد.`
            : `The cost of reaching ${neighbor} through ${current.id} is ${newCost}.`,
        line: 7,
      });

      recorderEngine.endGroup();

      recorderEngine.queue(() => {
        graphRecorder.clearEdgeHighlight({
          id: `${current.id}${neighbor}`,
        });
      });

      // --------------------------------------------------------
      // Line 8 — compare new cost with known cost
      // --------------------------------------------------------

      const currentNeighborCost = gCosts[neighbor] ?? Infinity;

      recorderEngine.beginGroup();

      logRecorder.setMessage({
        title:
          language === 'fa'
            ? 'مقایسه هزینه‌ها'
            : 'Comparing the costs',
        message:
          language === 'fa'
            ? `بررسی می‌شود که آیا هزینه جدید ${n(
                newCost,
                language,
              )} از هزینه فعلی ${n(
                currentNeighborCost,
                language,
              )} کمتر است یا خیر.`
            : `Checking whether the new cost ${newCost} is lower than the current known cost ${currentNeighborCost}.`,
        line: 8,
      });

      recorderEngine.endGroup();

      // --------------------------------------------------------
      // If new path is better
      // --------------------------------------------------------

      if (newCost < currentNeighborCost) {
        // ------------------------------------------------------
        // Line 9 — update g
        // ------------------------------------------------------

        gCosts[neighbor] = newCost;
        parents[neighbor] = current.id;

        recorderEngine.beginGroup();

        logRecorder.setMessage({
          title:
            language === 'fa'
              ? 'به‌روزرسانی هزینه مسیر'
              : 'Updating the path cost',
          message:
            language === 'fa'
              ? `هزینه بهترین مسیر شناخته‌شده برای ${neighbor} به ${n(
                  newCost,
                  language,
                )} تغییر کرد.`
              : `The best known path cost for ${neighbor} is updated to ${newCost}.`,
          line: 9,
        });

        const neighborIndex = nodes.indexOf(neighbor);

        costChart.setCells({
          startIndex: neighborIndex,
          values: [
            {
              label: neighbor,
              value: newCost,
            },
          ],
        });

        costChart.setCellsHighlight({
          startIndex: neighborIndex,
          endIndex: neighborIndex,
          highlightTags: ['changed'],
        });

        recorderEngine.endGroup();

        // ------------------------------------------------------
        // Line 10 — calculate f
        // ------------------------------------------------------

        hCosts[neighbor] = 0;
        fCosts[neighbor] = gCosts[neighbor] + hCosts[neighbor];

        recorderEngine.beginGroup();

        logRecorder.setMessage({
          title:
            language === 'fa'
              ? 'محاسبه هزینه تخمینی'
              : 'Calculating estimated cost',
          message:
            language === 'fa'
              ? `هزینه تخمینی f(${neighbor}) از مجموع g و h برابر ${n(
                  fCosts[neighbor],
                  language,
                )} شد.`
              : `The estimated cost f(${neighbor}) = g + h is ${fCosts[neighbor]}.`,
          line: 10,
        });

        recorderEngine.endGroup();

        // ------------------------------------------------------
        // Update existing Open node or add a new one
        // ------------------------------------------------------

        const existing = openList.find(
          (node) => node.id === neighbor,
        );

        if (existing) {
          existing.g = gCosts[neighbor];
          existing.h = hCosts[neighbor];
          existing.f = fCosts[neighbor];
        } else {
          // ----------------------------------------------------
          // Line 11 — push into Open
          // ----------------------------------------------------

          openList.push({
            id: neighbor,
            g: gCosts[neighbor],
            h: hCosts[neighbor],
            f: fCosts[neighbor],
          });

          recorderEngine.beginGroup();

          logRecorder.setMessage({
            title:
              language === 'fa'
                ? 'افزودن گره به مجموعه باز'
                : 'Adding node to the open set',
            message:
              language === 'fa'
                ? `گره ${neighbor} مسیر بهتری دارد و برای بررسی‌های بعدی به مجموعه باز اضافه می‌شود.`
                : `Node ${neighbor} has a better path and is added to the open set for further exploration.`,
            line: 11,
          });

          openRecorder.pushCells({
            rowIndex: 0,
            values: [neighbor],
          });

          openRecorder.setCellsHighlight({
            rowIndex: 0,
            startIndex: openList.length - 1,
            endIndex: openList.length - 1,
            highlightTags: ['new'],
          });

          graphRecorder.setNodeHighlight({
            id: neighbor,
            highlightTags: ['open'],
          });

          recorderEngine.endGroup();

          recorderEngine.queue(() => {
            openRecorder.clearAllRowsHighlight({});
          });
        }

        recorderEngine.beginGroup();

        graphRecorder.clearAllEdgesHighlight({});

        getBestPath(neighbor, parents).forEach((edge) => {
          graphRecorder.setEdgeHighlight({
            id: edge,
            highlightTags: ['path'],
          });
        });

        recorderEngine.endGroup();

        recorderEngine.queue(() => {
          const neighborIndex = nodes.indexOf(neighbor);

          costChart.clearCellsHighlight({
            startIndex: neighborIndex,
            endIndex: neighborIndex,
          });
        });
      }
    }

    // ----------------------------------------------------------
    // Finish current node
    // ----------------------------------------------------------

    recorderEngine.beginGroup();

    graphRecorder.setNodeHighlight({
      id: current.id,
      highlightTags: ['closed'],
    });

    recorderEngine.endGroup();
  }

  // ------------------------------------------------------------
  // Final state
  // ------------------------------------------------------------

  const found = closedList.includes(end);

  recorderEngine.beginGroup();

  logRecorder.setMessage({
    title: found
      ? language === 'fa'
        ? 'تمام شد!'
        : 'Done!'
      : language === 'fa'
        ? 'مسیری پیدا نشد'
        : 'No path found',

    message: found
      ? language === 'fa'
        ? `الگوریتم A* مسیری از ${start} به ${end} پیدا کرد.`
        : `A* found a path from ${start} to ${end}.`
      : language === 'fa'
        ? `الگوریتم A* نتوانست مسیری از ${start} به ${end} پیدا کند.`
        : `A* could not find a path from ${start} to ${end}.`,

    line: found ? 5 : 12,
  });

  if (found) {
    graphRecorder.setNodeHighlight({
      id: end,
      highlightTags: ['closed'],
    });
  }

  recorderEngine.endGroup();

  return recorderEngine.getRecording();
}

// --------------------------------------------------------------
// Reconstruct the best path
// --------------------------------------------------------------

function getBestPath(
  targetNode: string,
  parents: Record<string, string>,
): string[] {
  const path: string[] = [];
  let node = targetNode;

  while (parents[node]) {
    const parent = parents[node];

    path.push(`${parent}${node}`);
    node = parent;
  }

  return path.reverse();
}