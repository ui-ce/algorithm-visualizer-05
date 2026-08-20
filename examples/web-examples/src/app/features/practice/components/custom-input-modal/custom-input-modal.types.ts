export type GraphEdgeInput = {
  from: string;
  to: string;
  // Present for dijkstra (weighted), absent for dfs (unweighted).
  weight?: number;
};

// What the modal emits from `applied` — shape depends on which
// algorithm's page opened it, since bubble/merge sort, binary search,
// and the graph algorithms all need genuinely different inputs.
export type CustomInputResult =
  | { kind: 'array'; values: number[] }
  | { kind: 'array-with-target'; values: number[]; target: number }
  | { kind: 'graph'; edges: GraphEdgeInput[]; start: string; end?: string };
