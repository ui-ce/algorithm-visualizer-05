import {
  Array2dRecorder,
  ChartRecorder,
  GraphRecorder,
  LogRecorder,
  RecorderEngine,
  Recording,
} from '@algorithm-visualizer/typescript-recorder';

type Graph = Record<string, Record<string, number>[]>;

interface OpenNode {
  id: string;
  g: number;
  h: number;
  f: number;
}

// Pseudocode line numbers referenced below correspond to:
//   1  function aStar(graph, start, end):
//   2    g[start] = 0, open = [start]
//   3    while open is not empty:
//   4      choose node with lowest f = g + h
//   5      if current == end: return path
//   6      for neighbor in graph[current]:
//   7        newCost = g[current] + weight
//   8        if newCost < g[neighbor]:
//   9          g[neighbor] = newCost, open.push(neighbor)
//   10   return no path
//
// The current recorder uses a simple heuristic of 0 because the graph
// input contains no coordinate information. With h(n) = 0, A* behaves
// like Dijkstra while keeping the same f = g + h structure.

export function aStarVisualization(
  graph: Graph,
  start: string,
  end: string,
): Recording {
  const recorderEngine = new RecorderEngine();

  const nodes = Object.keys(graph);

  const logRecorder = new LogRecorder(recorderEngine, {
    name: 'Log',
    message: 'Initial state',
    title: 'Getting started',
    line: 2,
  });

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

  while (openList.length > 0) {
    openList.sort((a, b) => a.f - b.f);

    recorderEngine.beginGroup();

    logRecorder.setMessage({
      title: 'Choosing the best node',
      message:
        'Selecting the node with the lowest estimated total cost f(n) = g(n) + h(n).',
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

    const current = openList.shift()!;

    recorderEngine.beginGroup();

    logRecorder.setMessage({
      title: 'Taking the best candidate',
      message: `Node ${current.id} has the lowest estimated total cost.`,
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

    graphRecorder.setNodeHighlight({
      id: current.id,
      highlightTags: ['current'],
    });

    openRecorder.shiftCells({
      rowIndex: 0,
      count: 1,
    });

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

    logRecorder.setMessage({
      title: 'Exploring a node',
      message: `Exploring node ${current.id}.`,
      line: 3,
    });

    recorderEngine.endGroup();

    recorderEngine.queue(() => {
      closedRecorder.clearAllRowsHighlight({});
    });

    if (current.id === end) {
      recorderEngine.beginGroup();

      logRecorder.setMessage({
        title: 'Destination reached!',
        message:
          `Reached the destination ${end}. Tracing back the best path found.`,
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

    const neighbors = graph[current.id] ?? [];

    for (const neighborObj of neighbors) {
      const neighbor = Object.keys(neighborObj)[0];
      const weight = neighborObj[neighbor];

      const newCost = gCosts[current.id] + weight;

      recorderEngine.beginGroup();

      logRecorder.setMessage({
        title: 'Checking a neighbor',
        message:
          `Checking whether reaching ${neighbor} through ${current.id} gives a cheaper path.`,
        line: 7,
      });

      graphRecorder.setEdgeHighlight({
        id: `${current.id}${neighbor}`,
        highlightTags: ['compare'],
      });

      recorderEngine.endGroup();

      recorderEngine.queue(() => {
        graphRecorder.clearEdgeHighlight({
          id: `${current.id}${neighbor}`,
        });
      });

      if (newCost < (gCosts[neighbor] ?? Infinity)) {
        gCosts[neighbor] = newCost;
        hCosts[neighbor] = 0;
        fCosts[neighbor] = newCost + hCosts[neighbor];

        parents[neighbor] = current.id;

        const existing = openList.find(
          (node) => node.id === neighbor,
        );

        if (existing) {
          existing.g = newCost;
          existing.h = hCosts[neighbor];
          existing.f = fCosts[neighbor];
        } else {
          openList.push({
            id: neighbor,
            g: newCost,
            h: hCosts[neighbor],
            f: fCosts[neighbor],
          });

          recorderEngine.beginGroup();

          logRecorder.setMessage({
            title: 'Adding a new candidate',
            message:
              `Node ${neighbor} has a promising path, so it is added to the open set.`,
            line: 9,
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

        logRecorder.setMessage({
          title: 'Updating the best known cost',
          message:
            `Found a cheaper path to ${neighbor} through ${current.id}. Its cost is now ${newCost}.`,
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

        graphRecorder.clearAllEdgesHighlight({});

        getBestPath(neighbor, parents).forEach((edge) => {
          graphRecorder.setEdgeHighlight({
            id: edge,
            highlightTags: ['path'],
          });
        });

        recorderEngine.endGroup();

        recorderEngine.queue(() => {
          costChart.clearCellsHighlight({
            startIndex: neighborIndex,
            endIndex: neighborIndex,
          });
        });
      }
    }

    recorderEngine.beginGroup();

    graphRecorder.setNodeHighlight({
      id: current.id,
      highlightTags: ['closed'],
    });

    recorderEngine.endGroup();
  }

  const found = closedList.includes(end);

  recorderEngine.beginGroup();

  logRecorder.setMessage({
    title: found ? 'Done!' : 'No path found',
    message: found
      ? `A* has found a path from ${start} to ${end}.`
      : `A* could not find a path from ${start} to ${end}.`,
    line: 5,
  });

  recorderEngine.endGroup();

  return recorderEngine.getRecording();
}

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