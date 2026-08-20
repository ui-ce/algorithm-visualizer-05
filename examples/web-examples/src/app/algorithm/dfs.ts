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
  const stack: string[] = ['A'];
  // Which edge to highlight once a node is actually visited — the edge
  // it was discovered through, i.e. from whichever node pushed it onto
  // the stack. Kept as a map instead of storing it alongside the stack
  // itself so a node discovered more than once (pushed by two different
  // neighbors before either is popped) still highlights the edge that
  // was actually used to visit it, not just the first push.
  const discoveredVia = new Map<string, string>();

  const array2DInitParam: Array2DInitParams = {
    name: 'Stack',
    values: [stack],
  };
  const stackRecorder = new Array2dRecorder(recorderEngine, array2DInitParam);

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

    if (!visited.has(node)) {
      visited.add(node);
      logRecorder.setMessage({
        title: 'Visiting a node',
        message: `Node ${node} hasn't been visited yet — marking it visited now.`,
        line: 6,
      });
      graphRecorder.setNodeHighlight({ id: node, highlightTags: ['visit'] });

      // Highlight the edge this node was actually reached through, so
      // the traversal tree is visible on the graph itself instead of
      // only in the Stack panel — 'final-path' reuses the same green
      // used for Dijkstra/A*'s finalized shortest path, since for DFS
      // this edge is equally final once the node has been visited.
      const parent = discoveredVia.get(node);
      if (parent !== undefined) {
        graphRecorder.setEdgeHighlight({ id: `${parent}${node}`, highlightTags: ['final-path'] });
      }

      recorderEngine.endGroup();

      const neighbors = [...(graph[node] || [])].reverse();
      stack.push(...neighbors);
      neighbors.forEach((neighbor) => {
        if (!discoveredVia.has(neighbor)) {
          discoveredVia.set(neighbor, node);
        }
      });

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
      // Mirrors bfs.ts marking freshly-discovered neighbors 'open' on
      // the graph itself, not just in the Stack panel.
      neighbors.forEach((neighbor) => {
        if (!visited.has(neighbor)) {
          graphRecorder.setNodeHighlight({ id: neighbor, highlightTags: ['open'] });
        }
      });

      // Settle into the permanent "finalized" color instead of
      // clearing back to the default — previously this cleared right
      // back to no highlight at all, so a visited node's color never
      // actually stuck around long enough to see. Stays in the same
      // group as the neighbor-push above (closed by the shared
      // endGroup() below) rather than opening a new one, since this is
      // still "what happened when this node was visited".
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
