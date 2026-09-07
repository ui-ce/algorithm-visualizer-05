import type { TestQuestion } from '../../test.types';
import { DIJKSTRA_TEST_GRAPH } from './dijkstra-graph.data';

// Set 3 / Hard for Dijkstra. Order: 4 conceptual, 3 execution, 3 code.
//
// The three code questions (q8, q9, q10) share one snippet with three
// blanks — line 1's end parameter, line 5's full termination check,
// and line 10's final fallback return — all shown at once, same
// consistency rule as the other two Hard sets' code groups. Together
// these three blanks are everything the algorithm needs to know when
// and how to stop.
const CODE_GROUP_3_LINES = (): TestQuestion['codeLines'] => [
  {
    lineNumber: 1,
    indentLevel: 0,
    tokens: [
      { text: 'function dijkstra(graph, start, ', kind: 'plain' },
      { text: '____', kind: 'blank' },
      { text: '):', kind: 'plain' },
    ],
  },
  { lineNumber: 2, indentLevel: 1, tokens: [{ text: 'cost[start] = 0, open = [start]', kind: 'plain' }] },
  { lineNumber: 3, indentLevel: 1, tokens: [{ text: 'while open is not empty:', kind: 'plain' }] },
  { lineNumber: 4, indentLevel: 2, tokens: [{ text: 'sort open by cost, current = open.shift()', kind: 'plain' }] },
  {
    lineNumber: 5,
    indentLevel: 2,
    tokens: [
      { text: 'if ', kind: 'plain' },
      { text: '____', kind: 'blank' },
      { text: ': return path', kind: 'plain' },
    ],
  },
  { lineNumber: 6, indentLevel: 2, tokens: [{ text: 'for neighbor in graph[current]:', kind: 'plain' }] },
  { lineNumber: 7, indentLevel: 3, tokens: [{ text: 'newCost = cost[current] + weight', kind: 'plain' }] },
  { lineNumber: 8, indentLevel: 3, tokens: [{ text: 'if newCost < cost[neighbor]:', kind: 'plain' }] },
  { lineNumber: 9, indentLevel: 4, tokens: [{ text: 'cost[neighbor] = newCost, open.push(neighbor)', kind: 'plain' }] },
  {
    lineNumber: 10,
    indentLevel: 1,
    tokens: [
      { text: 'return ', kind: 'plain' },
      { text: '____', kind: 'blank' },
    ],
  },
];

export const DIJKSTRA_HARD_SET_3: TestQuestion[] = [
  {
    id: 'dijkstra-hard-s3-q1',
    type: 'conceptual',
    prompt: 'If start and end were the exact same node, what would this implementation do?',
    options: [
      { id: 'a', text: "On the very first iteration, current would be popped as that same node — and since current == end immediately, line 5's check would succeed right away, returning a trivial path with a total cost of 0" },
      { id: 'b', text: 'It would loop forever, since the start and end are the same' },
      { id: 'c', text: "It would raise an error, since a node cannot be its own destination" },
      { id: 'd', text: 'It would return "no path", since a node has no path to itself' },
    ],
    correctOptionId: 'a',
    explanation:
      "There's nothing in the logic that special-cases start == end — it falls out naturally from the existing checks. The open set starts as [start], the very first pop makes current equal to start (and therefore to end too), and line 5 fires on the first possible iteration.",
  },
  {
    id: 'dijkstra-hard-s3-q2',
    type: 'conceptual',
    prompt: 'Under what circumstance would this implementation actually reach line 10 and return "no path"?',
    options: [
      { id: 'a', text: "When the open set becomes completely empty before current ever equals end — meaning the destination is unreachable from the start, most likely because they're in different, disconnected parts of the graph" },
      { id: 'b', text: "It can never actually happen, since every graph has a path between any two nodes" },
      { id: 'c', text: 'It happens whenever the graph contains any edge with a weight of exactly 0' },
      { id: 'd', text: 'It happens if the start node has more than three neighbors' },
    ],
    correctOptionId: 'a',
    explanation:
      "The main loop only continues while there's still something in the open set to process. If it empties out without current ever matching end, that means every node reachable from start has been exhausted and end simply isn't among them — the two nodes live in different connected components.",
  },
  {
    id: 'dijkstra-hard-s3-q3',
    type: 'conceptual',
    prompt: "How does Dijkstra's core strategy differ from Bellman-Ford's, and why does that difference matter for negative weights?",
    options: [
      { id: 'a', text: "Dijkstra greedily commits to the cheapest known node and never revisits a closed one; Bellman-Ford instead relaxes every edge repeatedly (V - 1 times), which lets it correct earlier decisions and correctly handle negative weights, at the cost of being slower overall" },
      { id: 'b', text: 'Dijkstra and Bellman-Ford use exactly the same algorithm, just with different variable names' },
      { id: 'c', text: 'Bellman-Ford only works on trees, while Dijkstra works on any graph' },
      { id: 'd', text: 'Dijkstra is a special case of Bellman-Ford that only runs on directed graphs' },
    ],
    correctOptionId: 'a',
    explanation:
      "Dijkstra's speed comes precisely from trusting a closed node's cost forever, which relies on non-negative weights. Bellman-Ford gives up that shortcut — repeatedly re-checking every edge lets it revise costs that a negative edge might improve later, making it correct on a wider class of graphs but with a higher time complexity (O(V \u00d7 E) versus Dijkstra's much better bound).",
  },
  {
    id: 'dijkstra-hard-s3-q4',
    type: 'conceptual',
    prompt: 'Dijkstra is classified as a greedy algorithm. What does that mean here, and why does it still produce a globally correct answer (unlike some other greedy algorithms)?',
    options: [
      { id: 'a', text: "A greedy algorithm makes the locally best choice at each step without reconsidering it — Dijkstra always closes the cheapest remaining node — and this happens to be provably globally optimal specifically because non-negative weights guarantee no future discovery can ever undercut an already-closed node's cost" },
      { id: 'b', text: 'Greedy algorithms are always guaranteed to produce the globally optimal answer to any problem' },
      { id: 'c', text: "Dijkstra isn't actually a greedy algorithm, despite commonly being described as one" },
      { id: 'd', text: 'The term "greedy" here just refers to how much memory the algorithm uses' },
    ],
    correctOptionId: 'a',
    explanation:
      "Greedy algorithms in general can absolutely get stuck on a locally-good-but-globally-wrong choice — Dijkstra is a rare case where the greedy strategy is provably safe, and that safety hinges entirely on the non-negative-weight assumption discussed elsewhere in this quiz.",
  },
  {
    id: 'dijkstra-hard-s3-q5',
    type: 'execution',
    prompt: 'B has just been added to the open set (discovered), one step before its cost is visually drawn on the Node Costs chart. Has B\'s actual cost value already been calculated at this point, even though the chart still shows 0?',
    visualization: { graph: DIJKSTRA_TEST_GRAPH, start: 'A', end: 'F', frameIndex: 5 },
    options: [
      { id: 'a', text: "Yes — the algorithm's internal cost value for B is already set to 4 at this exact moment; the visible Node Costs chart simply hasn't been redrawn yet, since that happens in a separate step immediately afterward" },
      { id: 'b', text: 'No — B\'s cost genuinely doesn\'t exist yet until the chart updates in the next frame' },
      { id: 'c', text: "The chart and the internal cost value are always updated in the exact same step, with no lag between them" },
      { id: 'd', text: "B's cost is permanently stuck at 0 because it hasn't been visited yet" },
    ],
    correctOptionId: 'a',
    explanation:
      "The underlying algorithm computes and stores tentativeCost the moment it passes line 8's check — before either the \"discovering a new node\" or \"updating shortest known cost\" steps are even logged. What you're seeing here is a one-frame visual lag: the number is already correct internally, it just hasn't been drawn on screen yet.",
  },
  {
    id: 'dijkstra-hard-s3-q6',
    type: 'execution',
    prompt: "A has just been visited, and the algorithm is checking neighbor C (the second of A's two neighbors). What distinguishes this check from the one made for B just before it?",
    visualization: { graph: DIJKSTRA_TEST_GRAPH, start: 'A', end: 'F', frameIndex: 7 },
    options: [
      { id: 'a', text: "Nothing structural — it's the same comparison logic applied to a different neighbor and a different edge weight (2, instead of B's 4), which is why C ends up with a lower cost than B" },
      { id: 'b', text: "This check is skipped entirely, since B was already checked" },
      { id: 'c', text: 'C is compared against B\'s cost instead of against its own current cost' },
      { id: 'd', text: 'This is the last neighbor check the algorithm will ever perform' },
    ],
    correctOptionId: 'a',
    explanation:
      "Every neighbor of a newly visited node goes through the identical check (lines 7-9) — it's purely the specific edge weight that differs between them. A's edge to C weighs 2 versus its edge to B weighing 4, which is exactly why C ends up cheaper to reach and gets processed before B.",
  },
  {
    id: 'dijkstra-hard-s3-q7',
    type: 'execution',
    prompt: "By this final frame, A, B, C, D, E, and F have all been closed. Looking at the final highlighted path (A-C-E-F), which closed nodes ended up NOT being part of the shortest path, and why were they still processed?",
    visualization: { graph: DIJKSTRA_TEST_GRAPH, start: 'A', end: 'F', frameIndex: 39 },
    options: [
      { id: 'a', text: "B and D — both were cheaper to reach than F at the time they were processed, so the algorithm closed them along the way even though neither turned out to lie on the final shortest route" },
      { id: 'b', text: 'Every closed node is always part of the final shortest path, by definition' },
      { id: 'c', text: 'Only A was not part of the final path, since it is the start node' },
      { id: 'd', text: "C and E were not part of the final path, despite being highlighted" },
    ],
    correctOptionId: 'a',
    explanation:
      "Dijkstra closes nodes in increasing order of cost, not in the order they'll turn out to matter for the final answer. B (cost 4) and D (cost 9) both got closed before F (cost 13) simply because they were cheaper to reach at the time — being closed only means \"this node's own shortest cost is settled,\" not \"this node is on the path to the destination.\"",
  },
  {
    id: 'dijkstra-hard-s3-q8',
    type: 'code',
    prompt: "Fill in the blank on line 1 — what parameter tells the algorithm where the search should stop?",
    codeLines: CODE_GROUP_3_LINES(),
    options: [
      { id: 'a', text: 'end' },
      { id: 'b', text: 'target' },
      { id: 'c', text: 'goal' },
      { id: 'd', text: 'stop' },
    ],
    correctOptionId: 'a',
    explanation:
      "The function's signature needs a destination to check against on line 5 — that parameter is named end, and it's used by that exact name later in the pseudocode. The other two blanks in this snippet (lines 5 and 10) are covered by the next two questions.",
  },
  {
    id: 'dijkstra-hard-s3-q9',
    type: 'code',
    prompt: 'Fill in the blank on line 5 — what condition should trigger an early return of the completed path?',
    codeLines: CODE_GROUP_3_LINES(),
    options: [
      { id: 'a', text: 'current == end' },
      { id: 'b', text: 'current == start' },
      { id: 'c', text: 'open is empty' },
      { id: 'd', text: 'cost[current] == 0' },
    ],
    correctOptionId: 'a',
    explanation:
      "The algorithm should stop the moment the node it just picked as the cheapest remaining candidate is the destination itself — checking current against end is exactly that condition. The remaining blank in this snippet (line 10) is covered by the next question.",
  },
  {
    id: 'dijkstra-hard-s3-q10',
    type: 'code',
    prompt: 'Fill in the blank on line 10 — what should the function return if the loop finishes without ever reaching the destination?',
    codeLines: CODE_GROUP_3_LINES(),
    options: [
      { id: 'a', text: 'no path' },
      { id: 'b', text: 'the full cost table' },
      { id: 'c', text: 'the start node' },
      { id: 'd', text: 'an empty graph' },
    ],
    correctOptionId: 'a',
    explanation:
      "If the open set empties out and the loop ends on its own (rather than through line 5's early return), that means the destination was never reached — the only honest thing left to report is that no path exists between the two nodes.",
  },
];
