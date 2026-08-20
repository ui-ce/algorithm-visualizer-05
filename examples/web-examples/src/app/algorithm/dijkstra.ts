import {
  Array2dRecorder,
  ChartRecorder,
  GraphRecorder,
  LogRecorder,
  RecorderEngine,
  Recording,
} from '@algorithm-visualizer/typescript-recorder';

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
): Recording {
  const recorderEngine = new RecorderEngine();

  recorderEngine.beginGroup();

  const logRecorder = new LogRecorder(recorderEngine, {
    name: 'Log',
    message: 'Initial state',
    title: 'Getting started',
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

  const openRecorder = new Array2dRecorder(recorderEngine, { name: 'Open Set', values: [[start]] });
  const closedRecorder = new Array2dRecorder(recorderEngine, { name: 'Closed Set', values: [[]] });
  const costChart = new ChartRecorder(recorderEngine, {
    name: 'Node Costs',
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
      title: 'Picking the next node',
      message: 'Sorting the open set so the lowest-cost node comes first.',
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
      title: 'Picking the next node',
      message: 'Grabbing the lowest-cost node from the open set.',
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
      title: 'Visiting a node',
      message: `Visiting node ${current} and moving it to the closed set.`,
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
        title: 'Destination reached!',
        message: `Reached the destination ${end} — tracing back the shortest path.`,
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
        title: 'Checking a neighbor',
        message: `Looking at neighbor ${neighbor} — is going through ${current} cheaper than what we already know?`,
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
            title: 'Discovering a new node',
            message: `Neighbor ${neighbor} hasn't been seen yet — adding it to the open set.`,
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
          title: 'Updating the shortest known cost',
          message: `Found a cheaper path to ${neighbor} through ${current} — updating its cost to ${tentativeCost}.`,
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
    title: 'Done!',
    message: "Dijkstra's algorithm has finished exploring the graph.",
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
