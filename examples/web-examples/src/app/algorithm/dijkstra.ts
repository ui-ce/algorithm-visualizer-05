import {
  Array2dRecorder,
  ChartRecorder,
  GraphRecorder,
  LogRecorder,
  RecorderEngine,
  Recording,
} from '@algorithm-visualizer/typescript-recorder';
import type { Language } from '../core/services/language.service';

// Same tiny local dictionary/digit-helper pattern as bubble-sort.ts —
// see that file's comment for why this doesn't go through
// core/i18n/translations.ts. Node names (A, B, C...) are left
// untranslated on purpose in every message below, same as the graph
// itself never relabels its nodes for Persian.
const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
function n(value: number, language: Language): string {
  const text = String(value);
  return language === 'fa' ? text.replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)]) : text;
}

// Pseudocode line numbers referenced below correspond to:
//   1  function dijkstra(graph, start, end):
//   2    cost[start] = 0, open = [start]
//   3    while open is not empty:
//   4      sort open by cost, current = open.shift()
//   5      if current == end: return path
//   6      for neighbor in graph[current]:
//   7        newCost = cost[current] + weight
//   8        if newCost < cost[neighbor]:
//   9          cost[neighbor] = newCost, open.push(neighbor)
//   10   return no path
export function dijkstraVisualization(
  graph: Record<string, Record<string, number>[]>,
  start: string,
  end: string,
  language: Language = 'en',
): Recording {
  const recorderEngine = new RecorderEngine();

  recorderEngine.beginGroup();

  const logRecorder = new LogRecorder(recorderEngine, {
    name: 'Log',
    message: language === 'fa' ? 'وضعیت اولیه' : 'Initial state',
    title: language === 'fa' ? 'شروع کار' : 'Getting started',
    line: 2,
  });

  const graphRecorder = new GraphRecorder(recorderEngine, {
    name: 'Graph',
    nodes: Object.keys(graph).map((key) => ({ id: key, label: key })),
    edges: Object.entries(graph).flatMap(([node, adjacent]) =>
      adjacent.map((adj) => ({
        id: `${node}${Object.keys(adj)[0]}`,
        source: node,
        target: Object.keys(adj)[0],
        label: Object.entries(adj)[0][1].toString(),
      })),
    ),
    isDirected: true,
  });
  graphRecorder.setNodeHighlight({ id: start, highlightTags: ['open'] });

  const openRecorder = new Array2dRecorder(recorderEngine, {
    name: language === 'fa' ? 'مجموعه‌ی باز' : 'Open Set',
    values: [[start]],
  });
  const closedRecorder = new Array2dRecorder(recorderEngine, {
    name: language === 'fa' ? 'مجموعه‌ی بسته' : 'Closed Set',
    values: [[]],
  });
  const costChart = new ChartRecorder(recorderEngine, {
    name: language === 'fa' ? 'هزینه‌ی گره‌ها' : 'Node Costs',
    values: Object.keys(graph).map((n) => ({ label: n, value: 0 })),
  });

  recorderEngine.endGroup();

  const openList = [start];
  const closedList: string[] = [];
  const parents: Record<string, string> = {};
  const costs: Record<string, number> = Object.keys(graph).reduce((acc, key) => {
    acc[key] = key === start ? 0 : Infinity;
    return acc;
  }, {});

  recorderEngine.beginGroup();

  while (openList.length > 0) {
    openList.sort((x, y) => costs[x] - costs[y]);

    logRecorder.setMessage({
      title: language === 'fa' ? 'انتخاب گره‌ی بعدی' : 'Picking the next node',
      message:
        language === 'fa'
          ? 'مجموعه‌ی باز مرتب می‌شود تا ارزان‌ترین گره اول قرار بگیرد.'
          : 'Sorting the open set so the lowest-cost node comes first.',
      line: 4,
    });
    openRecorder.setCells({
      rowIndex: 0,
      startIndex: 0,
      values: [...openList],
    });
    openRecorder.setCellsHighlight({
      rowIndex: 0,
      startIndex: 0,
      endIndex: openList.length - 1,
      highlightTags: ['sorting'],
    });
    recorderEngine.endGroup();

    recorderEngine.queue(() => openRecorder.clearAllRowsHighlight({}));

    const current = openList.shift()!;
    closedList.push(current);

    recorderEngine.beginGroup();
    logRecorder.setMessage({
      title: language === 'fa' ? 'انتخاب گره‌ی بعدی' : 'Picking the next node',
      message:
        language === 'fa'
          ? 'گره با کمترین هزینه از مجموعه‌ی باز برداشته می‌شود.'
          : 'Grabbing the lowest-cost node from the open set.',
      line: 4,
    });
    openRecorder.setCellsHighlight({
      rowIndex: 0,
      startIndex: 0,
      endIndex: 0,
      highlightTags: ['remove'],
    });
    recorderEngine.endGroup();

    recorderEngine.beginGroup();
    logRecorder.setMessage({
      title: language === 'fa' ? 'بازدید یک گره' : 'Visiting a node',
      message:
        language === 'fa'
          ? `گره ${current} بازدید شده و به مجموعه‌ی بسته منتقل می‌شود.`
          : `Visiting node ${current} and moving it to the closed set.`,
      line: 3,
    });
    graphRecorder.setNodeHighlight({ id: current, highlightTags: ['current'] });
    openRecorder.shiftCells({ rowIndex: 0, count: 1 });
    closedRecorder.pushCells({ rowIndex: 0, values: [current] });
    closedRecorder.setCellsHighlight({
      rowIndex: 0,
      startIndex: closedList.length - 1,
      endIndex: closedList.length - 1,
      highlightTags: ['new'],
    });
    recorderEngine.endGroup();

    recorderEngine.queue(() => closedRecorder.clearAllRowsHighlight({}));

    if (current === end) {
      recorderEngine.beginGroup();
      logRecorder.setMessage({
        title: language === 'fa' ? 'رسیدیم به مقصد!' : 'Destination reached!',
        message:
          language === 'fa'
            ? `به مقصد ${end} رسیدیم — کوتاه‌ترین مسیر بازسازی می‌شود.`
            : `Reached the destination ${end} — tracing back the shortest path.`,
        line: 5,
      });
      const bestPath = getBestPathSoFar(end, parents);
      graphRecorder.clearAllEdgesHighlight({});
      bestPath.forEach((edge) =>
        graphRecorder.setEdgeHighlight({ id: edge, highlightTags: ['final-path'] }),
      );
      recorderEngine.endGroup();
      break;
    }

    const neighbors: Record<string, number>[] = graph[current];

    for (const neighborObj of neighbors) {
      const neighbor = Object.keys(neighborObj)[0];
      const weight = neighborObj[neighbor];
      const tentativeCost = costs[current] + weight;

      recorderEngine.beginGroup();
      logRecorder.setMessage({
        title: language === 'fa' ? 'بررسی یک همسایه' : 'Checking a neighbor',
        message:
          language === 'fa'
            ? `همسایه ${neighbor} بررسی می‌شود — آیا عبور از ${current} ارزان‌تر از چیزیه که تا الان می‌دونیم؟`
            : `Looking at neighbor ${neighbor} — is going through ${current} cheaper than what we already know?`,
        line: 7,
      });
      graphRecorder.setEdgeHighlight({ id: `${current}${neighbor}`, highlightTags: ['compare'] });
      recorderEngine.endGroup();

      recorderEngine.queue(() => graphRecorder.clearEdgeHighlight({ id: `${current}${neighbor}` }));

      if (tentativeCost < (costs[neighbor] ?? Infinity)) {
        costs[neighbor] = tentativeCost;
        parents[neighbor] = current;

        if (!openList.includes(neighbor) && !closedList.includes(neighbor)) {
          openList.push(neighbor);

          recorderEngine.beginGroup();
          logRecorder.setMessage({
            title: language === 'fa' ? 'کشف یک گره جدید' : 'Discovering a new node',
            message:
              language === 'fa'
                ? `همسایه ${neighbor} تا الان دیده نشده بود — به مجموعه‌ی باز اضافه می‌شود.`
                : `Neighbor ${neighbor} hasn't been seen yet — adding it to the open set.`,
            line: 9,
          });
          openRecorder.pushCells({ rowIndex: 0, values: [neighbor] });
          openRecorder.setCellsHighlight({
            rowIndex: 0,
            startIndex: openList.length - 1,
            endIndex: openList.length - 1,
            highlightTags: ['new'],
          });
          graphRecorder.setNodeHighlight({ id: neighbor, highlightTags: ['open'] });
          recorderEngine.endGroup();

          recorderEngine.queue(() => openRecorder.clearAllRowsHighlight({}));
        }

        recorderEngine.beginGroup();
        logRecorder.setMessage({
          title: language === 'fa' ? 'به‌روزرسانی کمترین هزینه‌ی شناخته‌شده' : 'Updating the shortest known cost',
          message:
            language === 'fa'
              ? `مسیر ارزان‌تری به ${neighbor} از طریق ${current} پیدا شد — هزینه‌اش به ${n(tentativeCost, language)} به‌روز می‌شود.`
              : `Found a cheaper path to ${neighbor} through ${current} — updating its cost to ${tentativeCost}.`,
          line: 9,
        });
        costChart.setCells({
          startIndex: Object.keys(graph).indexOf(neighbor),
          values: [{ label: neighbor, value: tentativeCost }],
        });
        costChart.setCellsHighlight({
          startIndex: Object.keys(graph).indexOf(neighbor),
          endIndex: Object.keys(graph).indexOf(neighbor),
          highlightTags: ['changed'],
        });
        graphRecorder.clearAllEdgesHighlight({});
        getBestPathSoFar(neighbor, parents).forEach((edge) =>
          graphRecorder.setEdgeHighlight({ id: edge, highlightTags: ['path'] }),
        );
        recorderEngine.endGroup();

        recorderEngine.queue(() => {
          costChart.clearCellsHighlight({
            startIndex: Object.keys(graph).indexOf(neighbor),
            endIndex: Object.keys(graph).indexOf(neighbor),
          });
        });
      }
    }

    recorderEngine.beginGroup();
    graphRecorder.setNodeHighlight({ id: current, highlightTags: ['closed'] });
  }

  logRecorder.setMessage({
    title: language === 'fa' ? 'تمام شد!' : 'Done!',
    message:
      language === 'fa'
        ? 'الگوریتم دایکسترا کاوش گراف را به پایان رساند.'
        : "Dijkstra's algorithm has finished exploring the graph.",
    line: 10,
  });

  return recorderEngine.getRecording();
}

function getBestPathSoFar(targetNode: string, parents: Record<string, string>) {
  const path: string[] = [];
  let node = targetNode;
  while (parents[node]) {
    const parent = parents[node]!;
    path.push(`${parent}${node}`);
    node = parent;
  }
  return path.reverse();
}
