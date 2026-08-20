import type { AlgorithmContent } from './algorithm-content.types';

export const DFS_CONTENT: AlgorithmContent = {
  overview:
    "Depth-First Search (DFS) is a graph traversal algorithm that explores as far as possible along each branch before backtracking. Starting from a chosen node, it visits an unvisited neighbor, then immediately dives into that neighbor's unvisited neighbors, and so on, only backing up to try a different branch once it hits a dead end. This 'go deep first' behavior gives DFS its name and shapes both its typical implementations (recursion or an explicit stack) and its use cases.",

  intuition:
    "Imagine exploring a maze by always taking the first unexplored path you see and following it as far as it goes, marking your trail as you walk. When you hit a dead end, you retrace your steps to the last junction with an unexplored path and try that one instead. You never revisit a hallway you have already fully explored. That is exactly how DFS moves through a graph.",

  howItWorks: [
    "Start at a chosen node and mark it as visited.",
    "Pick an unvisited neighbor of the current node and move to it, marking it visited.",
    "Repeat step 2 from the new node, going as deep as possible along this branch.",
    "When a node has no unvisited neighbors, backtrack to the previous node (via recursion return or popping the stack).",
    "From the node backtracked to, try its next unvisited neighbor and continue; if none remain, backtrack further.",
    "Continue until every node reachable from the start has been visited.",
  ],

  keyCharacteristic:
    "DFS commits fully to one path before trying alternatives, using either the call stack (recursive version) or an explicit stack (iterative version) to remember where to backtrack to. This makes it naturally suited to problems about paths, structure, and connectivity, rather than finding the shortest path.",

  overviewFaq: [
    {
      question: "How is DFS different from BFS?",
      answer:
        "DFS dives as deep as possible down one branch before backtracking, using a stack (or recursion); BFS explores all neighbors at the current depth before moving deeper, using a queue. DFS tends to use less memory on wide graphs, while BFS guarantees the shortest path in an unweighted graph.",
    },
    {
      question: "Why does DFS need a visited set?",
      answer:
        "Without tracking visited nodes, DFS could loop forever on a graph with cycles, repeatedly revisiting the same nodes; marking a node visited as soon as it is reached prevents this and ensures every node is processed exactly once.",
    },
    {
      question: "Recursive DFS vs iterative DFS with an explicit stack, what is the difference?",
      answer:
        "Both explore the graph in the same depth-first order. The recursive version relies on the call stack to remember where to backtrack to, which is concise but can hit a stack overflow on very deep graphs; the iterative version manages its own stack data structure explicitly, avoiding that limit at the cost of slightly more code.",
    },
    {
      question: "What is the time complexity of DFS and why?",
      answer:
        "O(V + E): every vertex is visited once (O(V)) and every edge is examined once when checking a node's neighbors (O(E)), regardless of whether the graph is represented as an adjacency list or matrix (though a matrix representation changes the constant factor).",
    },
    {
      question: "What problems is DFS commonly used to solve?",
      answer:
        "Detecting cycles in a graph, finding connected components, topological sorting of a DAG, solving maze and puzzle problems with backtracking, and exploring tree or graph structures such as file systems.",
    },
    {
      question: "Does DFS find the shortest path?",
      answer:
        "Not in general. DFS finds a path, not necessarily the shortest one, because it commits to the first available neighbor rather than exploring breadth-first. For shortest paths in unweighted graphs use BFS; for weighted graphs use Dijkstra.",
    },
  ],

  complexity: {
    bestTime: "O(V + E)",
    averageTime: "O(V + E)",
    worstTime: "O(V + E)",
    space: "O(V)",
    stable: "N/A \u2014 not a sorting algorithm",
    inPlace: "N/A \u2014 not a sorting algorithm",
    note:
      "DFS always visits every reachable vertex exactly once and examines every edge exactly once, so its time complexity does not vary with the graph's shape the way sorting algorithms vary with input order; V and E themselves are what change between graphs. This assumes an adjacency list — with an adjacency matrix, traversal becomes O(V squared) since checking all possible neighbors of a node takes O(V) instead of O(degree).",
  },

  pros: [
    "Memory-efficient on graphs that are deep but not wide, since it only needs to remember the current path, not every node at the current level.",
    "A natural fit for problems that require exploring full paths or backtracking, such as maze solving or puzzle generation.",
    "Simple to implement recursively, which keeps the code close to the conceptual algorithm.",
    "Directly supports useful byproducts like cycle detection and topological sorting with small modifications.",
  ],
  cons: [
    "Does not guarantee the shortest path in an unweighted graph; BFS is needed for that guarantee.",
    "Recursive implementations can overflow the call stack on very deep graphs unless converted to an iterative version.",
    "Can be less intuitive to trace by hand than BFS on graphs that are wide, since backtracking jumps around visually.",
    "On graphs with many equally-valid branches, DFS offers no guidance toward a better branch; it explores in whatever order neighbors are listed.",
  ],
  whenToUse: [
    "Detecting cycles in a graph, or checking whether a graph is connected.",
    "Topologically sorting the nodes of a directed acyclic graph (DAG), such as resolving task or build dependencies.",
    "Solving maze, puzzle, or constraint-satisfaction problems where full paths need to be explored and backtracked.",
    "Traversing tree-like or hierarchical structures, such as file systems or nested UI components.",
  ],
  whenNotToUse: [
    "Finding the shortest path in an unweighted graph; use BFS, which explores level by level.",
    "Finding the shortest path in a weighted graph; use Dijkstra (or Bellman-Ford for negative weights).",
    "Very deep graphs where a recursive implementation risks a stack overflow, unless an iterative version is used instead.",
  ],

  applications: [
    {
      title: "Cycle detection",
      description:
        "DFS can detect a cycle in a graph by noticing when it reaches a node that is already on the current recursion path.",
    },
    {
      title: "Topological sorting",
      description:
        "Running DFS on a DAG and recording finish times produces a valid topological order, used for scheduling and dependency resolution.",
    },
    {
      title: "Maze and puzzle solving",
      description:
        "DFS with backtracking is the standard approach for exploring all possible moves in mazes, Sudoku solvers, and similar constraint problems.",
    },
    {
      title: "Finding connected components",
      description:
        "Running DFS from every unvisited node and grouping the nodes visited in each run identifies the connected components of a graph.",
    },
    {
      title: "File system and directory traversal",
      description:
        "Recursively walking a directory tree to list, search, or process files is structurally identical to a DFS traversal.",
    },
  ],

  implementations: [
    {
      language: "Python",
      code: `# Recursive version using an adjacency list and a visited set.
def dfs(graph, node, visited=None):
    if visited is None:
        visited = set()
    visited.add(node)
    print(node)

    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)

    return visited`,
    },
    {
      language: "JavaScript",
      code: `// Iterative version using an explicit stack.
function dfs(graph, start) {
  const visited = new Set();
  const stack = [start];

  while (stack.length > 0) {
    const node = stack.pop();
    if (visited.has(node)) continue;
    visited.add(node);
    console.log(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) stack.push(neighbor);
    }
  }
  return visited;
}`,
    },
    {
      language: "Java",
      code: `// Recursive version using an adjacency list.
public static void dfs(Map<Integer, List<Integer>> graph, int node, Set<Integer> visited) {
    visited.add(node);
    System.out.println(node);

    for (int neighbor : graph.getOrDefault(node, new ArrayList<>())) {
        if (!visited.contains(neighbor)) {
            dfs(graph, neighbor, visited);
        }
    }
}`,
    },
    {
      language: "C++",
      code: `// Recursive version using an adjacency list.
void dfs(std::unordered_map<int, std::vector<int>>& graph, int node, std::unordered_set<int>& visited) {
    visited.insert(node);
    std::cout << node << std::endl;

    for (int neighbor : graph[node]) {
        if (visited.find(neighbor) == visited.end()) {
            dfs(graph, neighbor, visited);
        }
    }
}`,
    },
  ],
};
