import type { AlgorithmContent } from './algorithm-content.types';

export const A_STAR_CONTENT: AlgorithmContent = {
  overview:
    "A* (A-star) is a pathfinding algorithm that finds a low-cost path between a start node and a goal node by combining the cost already spent with an estimate of the remaining distance. It prioritizes nodes using f(n) = g(n) + h(n), where g(n) is the cost from the start and h(n) estimates the cost to the goal.",

  intuition:
    "Imagine finding a route through a city. You do not want to choose a road only because you have already traveled a short distance, and you also do not want to choose a road only because it looks close to your destination. A* considers both: how expensive the journey has been so far and how promising the remaining route looks.",

  howItWorks: [
    "Start with the start node and add it to the open set.",
    "Calculate the cost of reaching each discovered node from the start, called g(n).",
    "Estimate the remaining cost from each node to the goal using a heuristic, called h(n).",
    "Calculate f(n) = g(n) + h(n) for each candidate node.",
    "Select the node with the lowest f(n) from the open set.",
    "If the selected node is the goal, reconstruct the path and finish.",
    "Otherwise, examine its neighbors and update their costs and parents when a cheaper path is found.",
    "Move the current node to the closed set and continue until the goal is reached or no nodes remain.",
  ],

  keyCharacteristic:
    "A* combines the actual cost from the start with a heuristic estimate of the remaining cost. When the heuristic is admissible, A* can guarantee an optimal path while usually exploring fewer nodes than uninformed algorithms such as BFS or Dijkstra.",

  overviewFaq: [
    {
      question: "What does the A* formula mean?",
      answer:
        "A* uses f(n) = g(n) + h(n). g(n) is the actual cost of reaching node n from the start, while h(n) estimates the remaining cost from n to the goal. The algorithm prioritizes nodes with the smallest total estimated cost.",
    },
    {
      question: "What is a heuristic?",
      answer:
        "A heuristic is an estimate of the remaining cost from the current node to the goal. A good heuristic helps A* focus its search toward promising areas instead of exploring the graph uniformly.",
    },
    {
      question: "Is A* guaranteed to find the shortest path?",
      answer:
        "Yes, when the heuristic does not overestimate the true remaining cost and the algorithm is implemented correctly. Such a heuristic is called admissible.",
    },
    {
      question: "How is A* different from Dijkstra?",
      answer:
        "Dijkstra considers only the cost already traveled, while A* considers both the traveled cost and an estimated cost to the goal. This allows A* to direct its search toward the destination.",
    },
    {
      question: "How is A* different from BFS?",
      answer:
        "BFS explores nodes level by level and is suitable for unweighted graphs. A* uses path costs and a heuristic to prioritize nodes that appear more promising, making it much more suitable for weighted pathfinding problems.",
    },
    {
      question: "What happens if the heuristic is zero?",
      answer:
        "If h(n) is zero for every node, f(n) becomes equal to g(n). In that case, A* behaves like Dijkstra's algorithm.",
    },
  ],

  complexity: {
    bestTime: "O(E)",
    averageTime: "Depends on the heuristic",
    worstTime: "O(E)",
    space: "O(V)",
    stable: "N/A — not a sorting algorithm",
    inPlace: "N/A — not a sorting algorithm",
    note:
      "The practical performance of A* depends heavily on the graph structure and the quality of the heuristic. A good heuristic can dramatically reduce the number of explored nodes, while a weak heuristic can make A* behave similarly to Dijkstra's algorithm.",
  },

  pros: [
    "Can find an optimal path when the heuristic is admissible.",
    "Usually explores fewer nodes than uninformed pathfinding algorithms when a good heuristic is available.",
    "Works well for weighted pathfinding problems.",
    "The heuristic can be adapted to the structure of the problem and the type of movement allowed.",
  ],

  cons: [
    "Requires a suitable heuristic to perform efficiently.",
    "Can use significant memory because discovered nodes and their costs must be stored.",
    "A poor heuristic can make it behave similarly to Dijkstra's algorithm.",
    "Designing a good heuristic can be difficult for complex problems.",
  ],

  whenToUse: [
    "Finding paths between two points in a weighted graph.",
    "Grid-based pathfinding in games and simulations.",
    "Navigation systems where an estimate of the remaining distance is available.",
    "Problems where reaching a specific destination matters more than exploring the entire graph.",
  ],

  whenNotToUse: [
    "When there is no useful heuristic available.",
    "When the graph is unweighted and simple BFS is sufficient.",
    "When the goal is to calculate shortest paths to every node rather than one specific destination.",
    "When memory usage is severely constrained.",
  ],

  applications: [
    {
      title: "Video game pathfinding",
      description:
        "A* is widely used by games to find efficient routes for characters, enemies, and other moving entities across maps and grids.",
    },
    {
      title: "Robot navigation",
      description:
        "Robots can use A* to find paths through environments while considering movement costs and estimated distance to a destination.",
    },
    {
      title: "Map and navigation systems",
      description:
        "A* can be used to search for efficient routes when a meaningful estimate of the remaining distance is available.",
    },
    {
      title: "Grid and maze solving",
      description:
        "A* can efficiently navigate grids and mazes by combining the distance already traveled with an estimate of the distance remaining.",
    },
    {
      title: "Network routing",
      description:
        "A* can help find low-cost routes through weighted networks when the destination and a suitable heuristic are known.",
    },
  ],

  implementations: [
    {
      language: "Python",
      code: `import heapq

def a_star(graph, start, goal, heuristic):
    open_set = [(heuristic(start, goal), start)]
    g_cost = {start: 0}
    parent = {}

    while open_set:
        _, current = heapq.heappop(open_set)

        if current == goal:
            return reconstruct_path(parent, current)

        for neighbor, weight in graph[current]:
            new_cost = g_cost[current] + weight

            if new_cost < g_cost.get(neighbor, float('inf')):
                g_cost[neighbor] = new_cost
                parent[neighbor] = current

                f_cost = new_cost + heuristic(neighbor, goal)
                heapq.heappush(open_set, (f_cost, neighbor))

    return None`,
    },
    {
      language: "JavaScript",
      code: `function aStar(graph, start, goal, heuristic) {
  const openSet = [{ node: start, f: heuristic(start, goal) }];
  const gCost = { [start]: 0 };
  const parent = {};

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.f - b.f);
    const current = openSet.shift().node;

    if (current === goal) {
      return reconstructPath(parent, current);
    }

    for (const { node: neighbor, weight } of graph[current]) {
      const newCost = gCost[current] + weight;

      if (newCost < (gCost[neighbor] ?? Infinity)) {
        gCost[neighbor] = newCost;
        parent[neighbor] = current;

        const f = newCost + heuristic(neighbor, goal);

        openSet.push({
          node: neighbor,
          f,
        });
      }
    }
  }

  return null;
}`,
    },
    {
      language: "Java",
      code: `public static List<String> aStar(
        Graph graph,
        String start,
        String goal) {

    PriorityQueue<Node> openSet =
        new PriorityQueue<>(Comparator.comparingDouble(n -> n.f));

    Map<String, Double> gCost = new HashMap<>();
    Map<String, String> parent = new HashMap<>();

    gCost.put(start, 0.0);
    openSet.add(new Node(start, heuristic(start, goal)));

    while (!openSet.isEmpty()) {
        Node current = openSet.poll();

        if (current.id.equals(goal)) {
            return reconstructPath(parent, current.id);
        }

        for (Edge edge : graph.get(current.id)) {
            double newCost = gCost.get(current.id) + edge.weight;

            if (newCost < gCost.getOrDefault(
                    edge.to, Double.POSITIVE_INFINITY)) {

                gCost.put(edge.to, newCost);
                parent.put(edge.to, current.id);

                double f =
                    newCost + heuristic(edge.to, goal);

                openSet.add(new Node(edge.to, f));
            }
        }
    }

    return null;
}`,
    },
    {
      language: "C++",
      code: `std::vector<std::string> aStar(
    const Graph& graph,
    const std::string& start,
    const std::string& goal) {

    std::priority_queue<Node,
        std::vector<Node>,
        Compare> openSet;

    std::unordered_map<std::string, double> gCost;
    std::unordered_map<std::string, std::string> parent;

    gCost[start] = 0;
    openSet.push({start, heuristic(start, goal)});

    while (!openSet.empty()) {
        Node current = openSet.top();
        openSet.pop();

        if (current.id == goal) {
            return reconstructPath(parent, current.id);
        }

        for (const auto& edge : graph.at(current.id)) {
            double newCost =
                gCost[current.id] + edge.weight;

            if (newCost < gCost[edge.to]) {
                gCost[edge.to] = newCost;
                parent[edge.to] = current.id;

                double f =
                    newCost + heuristic(edge.to, goal);

                openSet.push({edge.to, f});
            }
        }
    }

    return {};
}`,
    },
  ],
};