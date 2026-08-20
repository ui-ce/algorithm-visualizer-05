import {
  Array2DInitParams,
  Array2dRecorder,
  GraphInitParams,
  GraphRecorder,
  LogInitParams,
  LogRecorder,
  RecorderEngine,
} from '@algorithm-visualizer/typescript-recorder';

type Graph = Record<string, string[]>;

// Pseudocode line numbers referenced below correspond to:
//   1  function bfs(graph, start):
//   2    queue = [start], visited = {}
//   3    while queue is not empty:
//   4      node = queue.shift()
//   5      if node not in visited:
//   6        mark node visited
//   7        enqueue node's unvisited neighbors
//   8    return visited

export function bfsVisualization(graph: Graph) {
  const recorderEngine = new RecorderEngine();

  recorderEngine.beginGroup();

  const logInitParam: LogInitParams = {
    name: 'Log',
    message: 'Initial State',
    title: 'Getting started',
    line: 2,
  };

  const logRecorder = new LogRecorder(
    recorderEngine,
    logInitParam,
  );

  const graphInitParam: GraphInitParams = {
    name: 'Graph',
    nodes: Object.keys(graph).map((key) => ({
      id: key,
      label: key,
    })),
    edges: Object.entries(graph).flatMap(([key, value]) =>
      value.map((v) => ({
        id: `${key}${v}`,
        source: key,
        target: v,
      })),
    ),
    isDirected: false,
  };

  const graphRecorder = new GraphRecorder(
    recorderEngine,
    graphInitParam,
  );

  const visited = new Set<string>();
  const queue: string[] = ['A'];
  // Same discovery-edge tracking as dfs.ts — see its comment.
  const discoveredVia = new Map<string, string>();

  const array2DInitParam: Array2DInitParams = {
    name: 'Queue',
    values: [queue],
  };

  const queueRecorder = new Array2dRecorder(
    recorderEngine,
    array2DInitParam,
  );

  graphRecorder.setNodeHighlight({
    id: 'A',
    highlightTags: ['open'],
  });

  recorderEngine.endGroup();

  while (queue.length > 0) {
    recorderEngine.beginGroup();

    logRecorder.setMessage({
      title: 'Taking the next node',
      message: 'Taking the first node from the queue.',
      line: 4,
    });

    queueRecorder.clearAllRowsHighlight({});

    queueRecorder.setCellsHighlight({
      rowIndex: 0,
      startIndex: 0,
      endIndex: 0,
      highlightTags: ['remove'],
    });

    recorderEngine.endGroup();

    recorderEngine.beginGroup();

    const node = queue.shift()!;

    queueRecorder.shiftCells({
      rowIndex: 0,
      count: 1,
    });

    if (!visited.has(node)) {
      visited.add(node);

      logRecorder.setMessage({
        title: 'Visiting a node',
        message: `Node ${node} has not been visited yet — marking it visited.`,
        line: 6,
      });

      graphRecorder.setNodeHighlight({
        id: node,
        highlightTags: ['visit'],
      });

      // Highlight the edge this node was actually reached through —
      // see dfs.ts's identical comment for why 'final-path'.
      const parent = discoveredVia.get(node);
      if (parent !== undefined) {
        graphRecorder.setEdgeHighlight({ id: `${parent}${node}`, highlightTags: ['final-path'] });
      }

      recorderEngine.endGroup();

      const neighbors = graph[node] ?? [];
      const unvisitedNeighbors = neighbors.filter(
        (neighbor) => !visited.has(neighbor),
      );

      if (unvisitedNeighbors.length > 0) {
        queue.push(...unvisitedNeighbors);
        unvisitedNeighbors.forEach((neighbor) => {
          if (!discoveredVia.has(neighbor)) {
            discoveredVia.set(neighbor, node);
          }
        });

        recorderEngine.beginGroup();

        logRecorder.setMessage({
          title: 'Queueing neighbors',
          message: `Adding ${node}'s unvisited neighbors to the queue.`,
          line: 7,
        });

        queueRecorder.pushCells({
          rowIndex: 0,
          values: unvisitedNeighbors,
        });

        queueRecorder.setCellsHighlight({
          rowIndex: 0,
          startIndex: queue.length - unvisitedNeighbors.length,
          endIndex: queue.length - 1,
          highlightTags: ['new'],
        });

        unvisitedNeighbors.forEach((neighbor) => {
          graphRecorder.setNodeHighlight({
            id: neighbor,
            highlightTags: ['open'],
          });
        });

        recorderEngine.endGroup();
      }

      recorderEngine.beginGroup();

      // Settle into the permanent "finalized" color instead of
      // clearing back to the default — see dfs.ts's identical comment.
      graphRecorder.setNodeHighlight({ id: node, highlightTags: ['closed'] });
    } else {
      logRecorder.setMessage({
        title: 'Already visited',
        message: `Node ${node} was already visited — skipping it.`,
        line: 5,
      });
    }

    recorderEngine.endGroup();
  }

  logRecorder.setMessage({
    title: 'Done!',
    message: 'Every reachable node has been visited.',
    line: 8,
  });

  return recorderEngine.getRecording();
}