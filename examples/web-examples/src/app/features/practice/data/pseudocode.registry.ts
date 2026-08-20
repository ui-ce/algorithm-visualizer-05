import type { PseudocodeLine, PseudocodeToken } from '../components/pseudocode-panel/pseudocode-panel.types';

// Auto-tokenizes a plain pseudocode string into keyword/number/plain
// spans instead of requiring every line to be hand-built token by
// token — the earlier bubble-sort-only pseudocode did that by hand,
// which doesn't scale to five algorithms. Keywords are matched
// whole-word so things like "index" don't get flagged just for
// containing "in".
const KEYWORDS = new Set([
  'function', 'for', 'while', 'if', 'else', 'return', 'to', 'do', 'in', 'not',
  'and', 'or', 'break', 'continue', 'push', 'pop', 'shift',
]);

function tokenize(text: string): PseudocodeToken[] {
  const tokens: PseudocodeToken[] = [];
  const pattern = /([A-Za-z_][A-Za-z0-9_]*)|(-?\d+(?:\.\d+)?)|([^A-Za-z0-9_]+)/g;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    const [full, word, num] = match;
    if (word) {
      tokens.push({ text: word, kind: KEYWORDS.has(word.toLowerCase()) ? 'keyword' : 'plain' });
    } else if (num) {
      tokens.push({ text: num, kind: 'number' });
    } else {
      tokens.push({ text: full, kind: 'plain' });
    }
  }

  return tokens;
}

function line(lineNumber: number, indentLevel: number, text: string): PseudocodeLine {
  return { lineNumber, indentLevel, tokens: tokenize(text) };
}

export const PSEUDOCODE_REGISTRY: Record<string, PseudocodeLine[]> = {
  'bubble-sort': [
    line(1, 0, 'function bubbleSort(arr):'),
    line(2, 1, 'for i = 0 to n - 2:'),
    line(3, 2, 'for j = 0 to n - i - 2:'),
    line(4, 3, 'if arr[j] > arr[j + 1]:'),
    line(5, 4, 'swap(arr[j], arr[j + 1])'),
    line(6, 1, 'return arr'),
  ],

  'merge-sort': [
    line(1, 0, 'function mergeSort(arr, start, end):'),
    line(2, 1, 'if start >= end: return'),
    line(3, 1, 'mid = (start + end) / 2'),
    line(4, 1, 'mergeSort(arr, start, mid)'),
    line(5, 1, 'mergeSort(arr, mid + 1, end)'),
    line(6, 1, 'merge(arr, start, mid, end)'),
    line(7, 1, 'return arr'),
  ],

  'quick-sort': [
    line(1, 0, 'function quickSort(arr, low, high):'),
    line(2, 1, 'if low < high:'),
    line(3, 2, 'pivotIndex = partition(arr, low, high)'),
    line(4, 2, 'quickSort(arr, low, pivotIndex - 1)'),
    line(5, 2, 'quickSort(arr, pivotIndex + 1, high)'),
    line(6, 0, 'function partition(arr, low, high):'),
    line(7, 1, 'pivot = arr[high]'),
    line(8, 1, 'i = low - 1'),
    line(9, 1, 'for j = low to high - 1:'),
    line(10, 2, 'if arr[j] < pivot: i++, swap(arr[i], arr[j])'),
    line(11, 1, 'swap(arr[i + 1], arr[high])'),
    line(12, 1, 'return i + 1'),
  ],

  'selection-sort': [
    line(1, 0, 'function selectionSort(arr):'),
    line(2, 1, 'for i = 0 to n - 2:'),
    line(3, 2, 'minIndex = i'),
    line(4, 2, 'for j = i + 1 to n - 1:'),
    line(5, 3, 'if arr[j] < arr[minIndex]: minIndex = j'),
    line(6, 2, 'swap(arr[i], arr[minIndex])'),
    line(7, 1, 'return arr'),
  ],

  'insertion-sort': [
    line(1, 0, 'function insertionSort(arr):'),
    line(2, 1, 'for i = 1 to n - 1:'),
    line(3, 2, 'key = arr[i]'),
    line(4, 2, 'j = i - 1'),
    line(5, 2, 'while j >= 0 and arr[j] > key:'),
    line(6, 3, 'arr[j + 1] = arr[j]'),
    line(7, 3, 'j = j - 1'),
    line(8, 2, 'arr[j + 1] = key'),
    line(9, 1, 'return arr'),
  ],

  'binary-search': [
    line(1, 0, 'function binarySearch(arr, target):'),
    line(2, 1, 'left = 0, right = length(arr) - 1'),
    line(3, 1, 'while left <= right:'),
    line(4, 2, 'mid = (left + right) / 2'),
    line(5, 2, 'if arr[mid] == target: return mid'),
    line(6, 2, 'else if arr[mid] < target: left = mid + 1'),
    line(7, 2, 'else: right = mid - 1'),
    line(8, 1, 'return not found'),
  ],

  dijkstra: [
    line(1, 0, 'function dijkstra(graph, start, end):'),
    line(2, 1, 'cost[start] = 0, open = [start]'),
    line(3, 1, 'while open is not empty:'),
    line(4, 2, 'sort open by cost, current = open.shift()'),
    line(5, 2, 'if current == end: return path'),
    line(6, 2, 'for neighbor in graph[current]:'),
    line(7, 3, 'newCost = cost[current] + weight'),
    line(8, 3, 'if newCost < cost[neighbor]:'),
    line(9, 4, 'cost[neighbor] = newCost, open.push(neighbor)'),
    line(10, 1, 'return no path'),
  ],

  dfs: [
    line(1, 0, 'function dfs(graph, start):'),
    line(2, 1, 'stack = [start], visited = {}'),
    line(3, 1, 'while stack is not empty:'),
    line(4, 2, 'node = stack.pop()'),
    line(5, 2, 'if node not in visited:'),
    line(6, 3, 'mark node visited'),
    line(7, 3, 'push node neighbors onto stack'),
    line(8, 1, 'return visited'),
  ],

  // Mirrors dfs's pseudocode structure/line numbers exactly (see
  // algorithm/bfs.ts's own line-number comment) — the two only differ
  // in stack vs queue and pop vs shift.
  bfs: [
    line(1, 0, 'function bfs(graph, start):'),
    line(2, 1, 'queue = [start], visited = {}'),
    line(3, 1, 'while queue is not empty:'),
    line(4, 2, 'node = queue.shift()'),
    line(5, 2, 'if node not in visited:'),
    line(6, 3, 'mark node visited'),
    line(7, 3, "enqueue node's unvisited neighbors"),
    line(8, 1, 'return visited'),
  ],

  // Matches the `line` numbers used in algorithm/LinearSearch.ts's Log
  // messages (1 / 3 / 4 / 5) so the active-line highlight tracks the
  // step being played, same as every other algorithm here.
  'linear-search': [
    line(1, 0, 'function linearSearch(arr, target):'),
    line(2, 1, 'for i = 0 to length(arr) - 1:'),
    line(3, 2, 'if arr[i] == target:'),
    line(4, 3, 'return i'),
    line(5, 1, 'return not found'),
  ],

  'a-star': [
  {
    lineNumber: 1,
    indentLevel: 0,
    tokens: [
      { text: 'function', kind: 'keyword' },
      { text: ' aStar(graph, start, goal):', kind: 'plain' },
    ],
  },
  {
    lineNumber: 2,
    indentLevel: 1,
    tokens: [
      { text: 'g[start] = 0, open = [start]', kind: 'plain' },
    ],
  },
  {
    lineNumber: 3,
    indentLevel: 1,
    tokens: [
      { text: 'while open is not empty:', kind: 'keyword' },
    ],
  },
  {
    lineNumber: 4,
    indentLevel: 2,
    tokens: [
      { text: 'current = node with lowest f(n)', kind: 'plain' },
    ],
  },
  {
    lineNumber: 5,
    indentLevel: 2,
    tokens: [
      { text: 'if current == goal: return path', kind: 'keyword' },
    ],
  },
  {
    lineNumber: 6,
    indentLevel: 2,
    tokens: [
      { text: 'for neighbor in graph[current]:', kind: 'keyword' },
    ],
  },
  {
    lineNumber: 7,
    indentLevel: 3,
    tokens: [
      { text: 'newG = g[current] + weight', kind: 'plain' },
    ],
  },
  {
    lineNumber: 8,
    indentLevel: 3,
    tokens: [
      { text: 'if newG < g[neighbor]:', kind: 'keyword' },
    ],
  },
  {
    lineNumber: 9,
    indentLevel: 4,
    tokens: [
      { text: 'g[neighbor] = newG', kind: 'plain' },
    ],
  },
  {
    lineNumber: 10,
    indentLevel: 4,
    tokens: [
      { text: 'f[neighbor] = g[neighbor] + h(neighbor)', kind: 'plain' },
    ],
  },
  {
    lineNumber: 11,
    indentLevel: 4,
    tokens: [
      { text: 'open.push(neighbor)', kind: 'plain' },
    ],
  },
  {
    lineNumber: 12,
    indentLevel: 1,
    tokens: [
      { text: 'return no path', kind: 'keyword' },
    ],
  },
  ],

};