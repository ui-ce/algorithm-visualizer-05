import type { AlgorithmContent } from './algorithm-content.types';

export const BFS_CONTENT: AlgorithmContent = {
  overview:
    "Breadth-First Search (BFS) is a graph traversal algorithm that explores nodes level by level. Starting from a chosen node, it first visits all of its immediate neighbors, then all nodes one edge farther away, and continues outward until every reachable node has been explored. Because it processes nodes in increasing order of their distance from the start, BFS can also find the shortest path in an unweighted graph.",

  intuition:
    "Imagine dropping a stone into a pond and watching the ripples spread outward. The first ring contains the nodes directly connected to the starting node, the next ring contains nodes two steps away, and so on. BFS works in exactly this way: it finishes the current level before moving to the next one.",

  howItWorks: [
    "Start at the chosen node and mark it as visited.",
    "Put the starting node into a queue.",
    "Remove the first node from the queue and examine its neighbors.",
    "For each unvisited neighbor, mark it as visited and add it to the back of the queue.",
    "Continue removing nodes from the front of the queue and adding their unvisited neighbors.",
    "Stop when the queue is empty, meaning every node reachable from the start has been visited.",
  ],

  keyCharacteristic:
    "BFS explores a graph level by level and uses a queue to preserve that order. In an unweighted graph, the first time BFS reaches a node, it has found the shortest path to that node in terms of the number of edges.",

  overviewFaq: [
    {
      question: "How is BFS different from DFS?",
      answer:
        "BFS explores the graph level by level using a queue, while DFS explores as deeply as possible along one branch using a stack or recursion. BFS is generally preferred when the shortest path in an unweighted graph is required, while DFS is useful for deep exploration, backtracking, cycle detection, and topological sorting.",
    },
    {
      question: "Why does BFS use a queue?",
      answer:
        "A queue follows first-in, first-out order. This means nodes discovered earlier are processed before nodes discovered later, which naturally makes BFS complete one distance level before moving to the next.",
    },
    {
      question: "Does BFS always find the shortest path?",
      answer:
        "BFS finds a shortest path when every edge has the same cost, such as an unweighted graph. For weighted graphs, algorithms such as Dijkstra are generally required when edge weights are non-negative.",
    },
    {
      question: "Why does BFS need a visited set?",
      answer:
        "Without a visited set, BFS could repeatedly add the same nodes to the queue when cycles or multiple connections exist. Marking nodes as visited prevents duplicate exploration and guarantees that each reachable node is processed only once.",
    },
    {
      question: "What is the time complexity of BFS?",
      answer:
        "With an adjacency-list representation, BFS runs in O(V + E), where V is the number of vertices and E is the number of edges. Every reachable vertex is visited and every relevant edge is examined.",
    },
    {
      question: "What data structure does BFS use?",
      answer:
        "BFS uses a queue. Nodes are added to the back of the queue when discovered and removed from the front when they are ready to be explored.",
    },
  ],

  complexity: {
    bestTime: "O(V + E)",
    averageTime: "O(V + E)",
    worstTime: "O(V + E)",
    space: "O(V)",
    stable: "N/A — not a sorting algorithm",
    inPlace: "N/A — not a sorting algorithm",
    note:
      "With an adjacency list, BFS visits each reachable vertex and examines each relevant edge once, giving O(V + E) time complexity. The queue and visited set require O(V) additional space in the worst case.",
  },

  pros: [
    "Finds the shortest path in an unweighted graph.",
    "Explores graphs in a predictable level-by-level order.",
    "Works well for finding nodes within a given number of edges from a starting node.",
    "Simple to implement using a queue and a visited set.",
  ],

  cons: [
    "Can require significant memory because the queue may contain many nodes from the current frontier.",
    "Does not directly solve shortest-path problems with different edge weights.",
    "Can explore many unnecessary nodes when the target is very deep or located in a specific branch.",
    "Usually requires more memory than DFS on very wide graphs.",
  ],

  whenToUse: [
    "Finding the shortest path in an unweighted graph.",
    "Finding all nodes within a certain number of edges from a starting node.",
    "Searching a graph level by level.",
    "Solving problems where the minimum number of moves or transitions is required.",
  ],

  whenNotToUse: [
    "Finding shortest paths in graphs with different edge weights; use Dijkstra or another weighted shortest-path algorithm.",
    "Very deep graphs where the BFS frontier can become extremely large.",
    "Problems where deep path exploration and backtracking are more appropriate; DFS may be a better choice.",
  ],

  applications: [
    {
      title: "Shortest path in unweighted graphs",
      description:
        "BFS can find the path with the minimum number of edges between two nodes when every edge has the same cost.",
    },
    {
      title: "Social network connections",
      description:
        "BFS can find people who are one, two, or more connection levels away from a particular person.",
    },
    {
      title: "Web crawling",
      description:
        "A crawler can use BFS to process pages by their distance from a starting page, visiting directly linked pages before deeper links.",
    },
    {
      title: "Minimum number of moves",
      description:
        "BFS is useful for puzzles and state-space problems where every move has equal cost and the goal is to minimize the number of moves.",
    },
    {
      title: "Network broadcasting",
      description:
        "BFS models how information can spread through a network level by level from an initial node.",
    },
  ],

  implementations: [
    {
      language: "Python",
      code: `from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])

    while queue:
        node = queue.popleft()
        print(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return visited`,
    },
    {
      language: "JavaScript",
      code: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];

  while (queue.length > 0) {
    const node = queue.shift();
    console.log(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return visited;
}`,
    },
    {
      language: "Java",
      code: `public static Set<Integer> bfs(
    Map<Integer, List<Integer>> graph,
    int start
) {
    Set<Integer> visited = new HashSet<>();
    Queue<Integer> queue = new LinkedList<>();

    visited.add(start);
    queue.add(start);

    while (!queue.isEmpty()) {
        int node = queue.poll();
        System.out.println(node);

        for (int neighbor : graph.getOrDefault(
            node,
            new ArrayList<>()
        )) {
            if (!visited.contains(neighbor)) {
                visited.add(neighbor);
                queue.add(neighbor);
            }
        }
    }

    return visited;
}`,
    },
    {
      language: "C++",
      code: `std::unordered_set<int> bfs(
    std::unordered_map<int, std::vector<int>>& graph,
    int start
) {
    std::unordered_set<int> visited;
    std::queue<int> queue;

    visited.insert(start);
    queue.push(start);

    while (!queue.empty()) {
        int node = queue.front();
        queue.pop();

        std::cout << node << std::endl;

        for (int neighbor : graph[node]) {
            if (visited.find(neighbor) == visited.end()) {
                visited.insert(neighbor);
                queue.push(neighbor);
            }
        }
    }

    return visited;
}`,
    },
  ],
};