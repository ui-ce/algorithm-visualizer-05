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
//   1  function dfs(graph, start):
//   2    stack = [start], visited = {}
//   3    while stack is not empty:
//   4      node = stack.pop()
//   5      if node not in visited:
//   6        mark node visited
//   7        push node neighbors onto stack
//   8    return visited
export function dfsVisualization(graph: Graph) {
  const recorderEngine = new RecorderEngine();

  recorderEngine.beginGroup();

  const logInitParam: LogInitParams = {
    name: 'Log',
    message: 'Initial State',
    title: 'Getting started',
    line: 2,
  };
  const logRecorder = new LogRecorder(recorderEngine, logInitParam);

  const graphInitParam: GraphInitParams = {
    name: 'Graph',
    nodes: Object.keys(graph).map((key) => ({ id: key, label: key })),
    edges: Object.entries(graph).flatMap(([key, value]) =>
      value.map((v) => ({ id: `${key}${v}`, source: key, target: v })),
    ),
    isDirected: false,
  };
  const graphRecorder = new GraphRecorder(recorderEngine, graphInitParam);

  const visited = new Set<string>();
  // Tracks which node discovered each neighbor first, so the edge that
  // was actually used to reach a node can be highlighted — plain DFS
  // over a stack doesn't otherwise know which edge led to a node.
  const cameFrom: Record<string, string> = {};
  const stack: string[] = ['A'];

  const array2DInitParam: Array2DInitParams = {
    name: 'Stack',
    values: [stack],
  };
  const stackRecorder = new Array2dRecorder(recorderEngine, array2DInitParam);

  // Both directions are highlighted together since the graph is built
  // undirected (each edge exists as two GraphRecorder edges, "AB" and
  // "BA" — see graphInitParam above), and only one of the two ids
  // corresponds to however cytoscape actually drew it.
  const highlightEdgeBothDirections = (a: string, b: string, tags: string[]): void => {
    graphRecorder.setEdgeHighlight({ id: `${a}${b}`, highlightTags: tags });
    graphRecorder.setEdgeHighlight({ id: `${b}${a}`, highlightTags: tags });
  };

  while (stack.length > 0) {
    logRecorder.setMessage({
      title: 'Popping the stack',
      message: 'Popping the last node pushed onto the stack.',
      line: 4,
    });
    stackRecorder.clearAllRowsHighlight({});
    stackRecorder.setCellsHighlight({
      rowIndex: 0,
      startIndex: stack.length - 1,
      endIndex: stack.length - 1,
      highlightTags: ['remove'],
    });

    recorderEngine.endGroup();

    recorderEngine.beginGroup();

    const node = stack.pop()!;
    stackRecorder.popCells({ rowIndex: 0, count: 1 });
    graphRecorder.setNodeHighlight({ id: node, highlightTags: ['current'] });
    if (cameFrom[node]) {
      highlightEdgeBothDirections(cameFrom[node], node, ['traversing']);
    }

    if (!visited.has(node)) {
      visited.add(node);
      logRecorder.setMessage({
        title: 'Visiting a node',
        message: `Node ${node} hasn't been visited yet — marking it visited now.`,
        line: 6,
      });

      recorderEngine.endGroup();

      const neighbors = [...(graph[node] || [])].reverse();
      for (const neighbor of neighbors) {
        if (!(neighbor in cameFrom) && !visited.has(neighbor)) {
          cameFrom[neighbor] = node;
        }
      }
      stack.push(...neighbors);

      recorderEngine.beginGroup();

      logRecorder.setMessage({
        title: 'Queueing neighbors',
        message: `Pushing node ${node}'s neighbors onto the stack to visit next.`,
        line: 7,
      });
      stackRecorder.pushCells({ rowIndex: 0, values: neighbors });
      stackRecorder.setCellsHighlight({
        rowIndex: 0,
        startIndex: stack.length - neighbors.length,
        endIndex: stack.length - 1,
        highlightTags: ['new'],
      });
    } else {
      logRecorder.setMessage({
        title: 'Already visited',
        message: `Node ${node} was already visited — skipping it.`,
        line: 5,
      });
    }

    recorderEngine.endGroup();

    recorderEngine.beginGroup();

    // 'visited' persists here (unlike the old version, which cleared
    // the node's highlight entirely right after processing it) so
    // already-explored nodes stay visually distinct for the rest of
    // the run instead of reverting to the unvisited color.
    graphRecorder.setNodeHighlight({ id: node, highlightTags: ['visited'] });
    if (cameFrom[node]) {
      highlightEdgeBothDirections(cameFrom[node], node, ['traversed']);
    }
  }

  logRecorder.setMessage({
    title: 'Done!',
    message: 'Every reachable node has been visited.',
    line: 8,
  });

  return recorderEngine.getRecording();
}
