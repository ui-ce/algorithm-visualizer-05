import type { AlgorithmContent } from './algorithm-content.types';

export const DIJKSTRA_CONTENT: AlgorithmContent = {
  overview:
    "Dijkstra's Algorithm finds the shortest path from a single starting node to every other node in a weighted graph, as long as all edge weights are non-negative. It works by repeatedly picking the unvisited node with the smallest known distance from the start, locking in that distance as final, and then updating (relaxing) the distances to its neighbors if a shorter path through it has just been found. This greedy choice, always expanding the closest unvisited node next, is what guarantees a correct shortest-path result.",

  intuition:
    "Picture water spreading outward from the start node through pipes (edges) of different widths (weights), where narrower pipes take longer to fill. The water always reaches the closest not-yet-filled point next, and once a point is filled, that is its final, shortest arrival time; filling other pipes later can never make it arrive sooner. Dijkstra's Algorithm simulates exactly this closest-first expansion using a priority queue instead of physical water.",

  howItWorks: [
    "Set the distance to the start node as 0, and the distance to every other node as infinity; mark all nodes as unvisited.",
    "Repeatedly select the unvisited node with the smallest known distance (using a priority queue / min-heap for efficiency).",
    "Mark the selected node as visited; its distance is now final and will not change.",
    "For each unvisited neighbor of this node, calculate the distance through the current node; if it is smaller than the neighbor's currently known distance, update it (this step is called relaxation).",
    "Repeat steps 2 through 4 until every reachable node has been visited, or the target node has been visited (if searching for a single destination).",
  ],

  keyCharacteristic:
    "Dijkstra always expands the closest unvisited node next and never revisits a node once it is finalized, which is only correct because edge weights are non-negative; a negative edge could otherwise create a shorter path through an already-finalized node, breaking the algorithm's core assumption.",

  overviewFaq: [
    {
      question: "Why does Dijkstra fail with negative edge weights?",
      answer:
        "Dijkstra finalizes a node's distance as soon as it is visited, assuming no future path could ever be shorter. A negative edge discovered later could reduce the distance to an already-finalized node, but the algorithm has no mechanism to revisit and correct it; use the Bellman-Ford algorithm instead when negative weights are possible.",
    },
    {
      question: "How is Dijkstra different from BFS?",
      answer:
        "BFS finds the shortest path in an unweighted graph by treating every edge as equal cost, expanding level by level with a plain queue. Dijkstra generalizes this to weighted graphs by always expanding the node with the smallest cumulative distance next, using a priority queue instead of a plain queue.",
    },
    {
      question: "What is relaxation in Dijkstra's Algorithm?",
      answer:
        "Relaxing an edge means checking whether traveling through the current node offers a shorter path to a neighbor than what is currently recorded, and updating the neighbor's distance if so. This is the step that gradually improves distance estimates as the algorithm progresses.",
    },
    {
      question: "Why is the time complexity O((V + E) log V)?",
      answer:
        "With a binary-heap priority queue, each of the V node extractions costs O(log V), and each of the E edges can trigger a distance update (a heap insertion or decrease-key) costing O(log V), giving O((V + E) log V) overall. A simpler array-based priority queue instead gives O(V squared), which can be faster on very dense graphs.",
    },
    {
      question: "How is Dijkstra different from DFS?",
      answer:
        "DFS explores as deep as possible along one path without regard to edge weights and does not guarantee any kind of shortest path. Dijkstra specifically tracks and compares cumulative distances to guarantee the shortest weighted path to every node.",
    },
    {
      question: "Can Dijkstra be stopped early?",
      answer:
        "Yes; if only the shortest path to a single target node is needed (not to every node), the algorithm can stop as soon as that target node is popped from the priority queue as the current minimum, since its distance is then guaranteed final.",
    },
  ],

  complexity: {
    bestTime: "O((V + E) log V)",
    averageTime: "O((V + E) log V)",
    worstTime: "O((V + E) log V)",
    space: "O(V)",
    stable: "N/A \u2014 not a sorting algorithm",
    inPlace: "N/A \u2014 not a sorting algorithm",
    note:
      "Every node is extracted from the priority queue once (O(V log V) total) and every edge may trigger a priority-queue update (O(E log V) total); because the algorithm always processes the whole graph the same way regardless of edge-weight values, its complexity does not vary between best and worst input the way comparison sorts do. This assumes an adjacency list with a binary-heap priority queue — with a simple array instead of a heap, complexity becomes O(V squared), which can outperform the heap version on dense graphs where E is close to V squared.",
  },

  pros: [
    "Guarantees the correct shortest path from the source to every other node, as long as edge weights are non-negative.",
    "Efficient on sparse graphs when implemented with a priority queue: O((V + E) log V) scales well as graphs grow.",
    "Can be stopped early when only a single target's shortest path is needed, saving unnecessary work.",
    "Straightforward to extend for related problems, such as reconstructing the actual shortest path (not just its length) by tracking predecessors.",
  ],
  cons: [
    "Does not work correctly with negative edge weights; Bellman-Ford or Johnson's algorithm must be used instead.",
    "Slower than BFS for the common case of unweighted graphs, where BFS achieves the same result more simply in O(V + E).",
    "Requires a priority queue for good performance; a naive implementation without one degrades to O(V squared), which is slow on sparse graphs.",
    "Computes shortest paths from a single source; finding shortest paths between all pairs of nodes requires running it V times or using Floyd-Warshall instead.",
  ],
  whenToUse: [
    "Finding the shortest route in a weighted graph with only non-negative weights, such as road networks with distances or times.",
    "Network routing protocols that need the cheapest path between a source and all destinations.",
    "Any single-source shortest-path problem where weights represent real, non-negative costs (distance, time, price).",
  ],
  whenNotToUse: [
    "Graphs that may contain negative edge weights; use Bellman-Ford instead.",
    "Unweighted graphs, where plain BFS achieves the same shortest-path result with a simpler O(V + E) algorithm.",
    "All-pairs shortest path problems on dense graphs; Floyd-Warshall is often simpler and comparably efficient in that case.",
  ],

  applications: [
    {
      title: "GPS and mapping software",
      description:
        "Route planners use Dijkstra (or optimized variants like A*) to find the shortest or fastest route between two locations on a road network.",
    },
    {
      title: "Network routing protocols",
      description:
        "Link-state routing protocols such as OSPF use Dijkstra's Algorithm to compute the shortest path between routers in a network.",
    },
    {
      title: "Flight and transit itinerary planning",
      description:
        "Finding the cheapest or fastest sequence of connections between airports or transit stops is a direct application of shortest-path search.",
    },
    {
      title: "Telecommunications network design",
      description:
        "Determining the most efficient way to route data or signals through a network of nodes with varying link costs.",
    },
    {
      title: "Game AI pathfinding",
      description:
        "Games use Dijkstra or its extensions to compute movement costs and paths for characters navigating a weighted grid or graph.",
    },
  ],

  implementations: [
    {
      language: "Python",
      code: `# Uses a min-heap (heapq) as the priority queue.
import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]

    while pq:
        current_dist, current_node = heapq.heappop(pq)
        if current_dist > distances[current_node]:
            continue

        for neighbor, weight in graph[current_node]:
            distance = current_dist + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))

    return distances`,
    },
    {
      language: "JavaScript",
      code: `// Uses a simple array-based priority queue for clarity; swap for a binary heap in production.
function dijkstra(graph, start) {
  const distances = {};
  for (const node in graph) distances[node] = Infinity;
  distances[start] = 0;

  const pq = [[0, start]];

  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [currentDist, currentNode] = pq.shift();
    if (currentDist > distances[currentNode]) continue;

    for (const [neighbor, weight] of graph[currentNode]) {
      const distance = currentDist + weight;
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        pq.push([distance, neighbor]);
      }
    }
  }
  return distances;
}`,
    },
    {
      language: "Java",
      code: `// Uses PriorityQueue as the min-heap.
public static Map<Integer, Integer> dijkstra(Map<Integer, List<int[]>> graph, int start) {
    Map<Integer, Integer> distances = new HashMap<>();
    for (int node : graph.keySet()) distances.put(node, Integer.MAX_VALUE);
    distances.put(start, 0);

    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.offer(new int[]{0, start});

    while (!pq.isEmpty()) {
        int[] current = pq.poll();
        int currentDist = current[0], currentNode = current[1];
        if (currentDist > distances.get(currentNode)) continue;

        for (int[] edge : graph.getOrDefault(currentNode, new ArrayList<>())) {
            int neighbor = edge[0], weight = edge[1];
            int distance = currentDist + weight;
            if (distance < distances.get(neighbor)) {
                distances.put(neighbor, distance);
                pq.offer(new int[]{distance, neighbor});
            }
        }
    }
    return distances;
}`,
    },
    {
      language: "C++",
      code: `// Uses priority_queue as a min-heap via greater<>.
std::unordered_map<int, int> dijkstra(
    std::unordered_map<int, std::vector<std::pair<int, int>>>& graph, int start) {

    std::unordered_map<int, int> distances;
    for (auto& [node, _] : graph) distances[node] = INT_MAX;
    distances[start] = 0;

    std::priority_queue<std::pair<int, int>, std::vector<std::pair<int, int>>, std::greater<>> pq;
    pq.push({0, start});

    while (!pq.empty()) {
        auto [currentDist, currentNode] = pq.top();
        pq.pop();
        if (currentDist > distances[currentNode]) continue;

        for (auto& [neighbor, weight] : graph[currentNode]) {
            int distance = currentDist + weight;
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                pq.push({distance, neighbor});
            }
        }
    }
    return distances;
}`,
    },
  ],
};
