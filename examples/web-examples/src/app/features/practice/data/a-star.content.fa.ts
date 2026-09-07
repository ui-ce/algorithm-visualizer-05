import type { AlgorithmContent } from './algorithm-content.types';

export const A_STAR_CONTENT_FA: AlgorithmContent = {
  overview:
    "الگوریتم A* (ای‌استار) یک الگوریتم مسیریابی است که با ترکیب هزینه طی‌شده از مبدأ و تخمینی از هزینه باقی‌مانده تا مقصد، مسیری با هزینه کم بین یک گره شروع و یک گره هدف پیدا می‌کند. این الگوریتم گره‌ها را با استفاده از رابطه f(n) = g(n) + h(n) اولویت‌بندی می‌کند؛ در این رابطه g(n) هزینه واقعی رسیدن از مبدأ به گره n و h(n) تخمینی از هزینه رسیدن از گره n به مقصد است.",

  intuition:
    "تصور کنید می‌خواهید در یک شهر مسیر مناسبی برای رسیدن به مقصد پیدا کنید. نمی‌خواهید فقط جاده‌ای را انتخاب کنید که تا اینجا هزینه کمی داشته است، و از طرف دیگر نمی‌خواهید فقط جاده‌ای را انتخاب کنید که از نظر ظاهری به مقصد نزدیک‌تر است. الگوریتم A* هر دو مورد را در نظر می‌گیرد: هزینه‌ای که تا اینجا پرداخت کرده‌اید و تخمینی از اینکه ادامه مسیر چقدر می‌تواند مناسب باشد.",

  howItWorks: [
    "با گره شروع آغاز کنید و آن را در مجموعه باز (Open Set) قرار دهید.",
    "هزینه رسیدن از گره شروع به هر گره کشف‌شده را محاسبه کنید که با g(n) نشان داده می‌شود.",
    "هزینه باقی‌مانده از هر گره تا گره هدف را با استفاده از یک تابع تخمین یا ابتکاری (Heuristic) محاسبه کنید که با h(n) نشان داده می‌شود.",
    "برای هر گره مقدار f(n) = g(n) + h(n) را محاسبه کنید.",
    "گره‌ای را که کمترین مقدار f(n) را دارد از مجموعه باز انتخاب کنید.",
    "اگر گره انتخاب‌شده همان گره هدف باشد، مسیر را بازسازی کنید و الگوریتم را به پایان برسانید.",
    "در غیر این صورت، همسایه‌های گره فعلی را بررسی کنید و اگر مسیر ارزان‌تری برای رسیدن به آن‌ها پیدا شد، هزینه و والد آن‌ها را به‌روزرسانی کنید.",
    "گره فعلی را به مجموعه بسته (Closed Set) منتقل کنید و این روند را ادامه دهید تا مقصد پیدا شود یا گره قابل بررسی دیگری باقی نماند.",
  ],

  keyCharacteristic:
    "الگوریتم A* هزینه واقعی طی‌شده از مبدأ را با یک تخمین از هزینه باقی‌مانده تا مقصد ترکیب می‌کند. اگر تابع ابتکاری بیش‌برآورد نکند، A* می‌تواند کوتاه‌ترین مسیر را تضمین کند و در بسیاری از موارد با تمرکز روی گره‌های امیدوارکننده، تعداد گره‌های بررسی‌شده را نسبت به الگوریتم‌های بدون اطلاعاتی مانند BFS و Dijkstra کاهش دهد.",

  overviewFaq: [
    {
      question: "فرمول A* یعنی چه؟",
      answer:
        "الگوریتم A* از رابطه f(n) = g(n) + h(n) استفاده می‌کند. مقدار g(n) هزینه واقعی رسیدن از گره شروع به گره n است و h(n) تخمینی از هزینه باقی‌مانده از گره n تا هدف است. الگوریتم گره‌هایی را در اولویت قرار می‌دهد که کمترین هزینه کل تخمینی را دارند.",
    },
    {
      question: "تابع ابتکاری (Heuristic) چیست؟",
      answer:
        "تابع ابتکاری تخمینی از هزینه باقی‌مانده برای رسیدن از گره فعلی به گره هدف ارائه می‌دهد. یک تابع ابتکاری مناسب به A* کمک می‌کند به جای بررسی یکنواخت کل گراف، جست‌وجوی خود را روی مسیرهای امیدوارکننده‌تر متمرکز کند.",
    },
    {
      question: "آیا A* همیشه کوتاه‌ترین مسیر را پیدا می‌کند؟",
      answer:
        "بله، در صورتی که تابع ابتکاری هزینه واقعی باقی‌مانده را بیش‌برآورد نکند و الگوریتم به شکل صحیح پیاده‌سازی شده باشد. چنین تابع ابتکاری‌ای admissible یا مجاز نامیده می‌شود.",
    },
    {
      question: "تفاوت A* و Dijkstra چیست؟",
      answer:
        "الگوریتم Dijkstra فقط هزینه مسیری را که تاکنون طی شده در نظر می‌گیرد، در حالی که A* علاوه بر هزینه طی‌شده، تخمینی از هزینه باقی‌مانده تا مقصد را نیز در نظر می‌گیرد. به همین دلیل A* می‌تواند جست‌وجوی خود را به سمت مقصد هدایت کند.",
    },
    {
      question: "تفاوت A* و BFS چیست؟",
      answer:
        "BFS گره‌ها را به صورت سطح‌به‌سطح بررسی می‌کند و برای گراف‌های بدون وزن مناسب است. A* از هزینه مسیر و یک تابع ابتکاری برای اولویت‌بندی گره‌های امیدوارکننده‌تر استفاده می‌کند و به همین دلیل برای مسائل مسیریابی وزن‌دار مناسب‌تر است.",
    },
    {
      question: "اگر مقدار تابع ابتکاری صفر باشد چه اتفاقی می‌افتد؟",
      answer:
        "اگر h(n) برای تمام گره‌ها صفر باشد، مقدار f(n) با g(n) برابر می‌شود. در این حالت، الگوریتم A* عملاً مانند الگوریتم Dijkstra عمل می‌کند.",
    },
  ],

  complexity: {
    bestTime: "O(E)",
    averageTime: "وابسته به تابع ابتکاری",
    worstTime: "O(E)",
    space: "O(V)",
    stable: "N/A — الگوریتم مرتب‌سازی نیست",
    inPlace: "N/A — الگوریتم مرتب‌سازی نیست",
    note:
      "عملکرد عملی A* به ساختار گراف و کیفیت تابع ابتکاری وابستگی زیادی دارد. یک تابع ابتکاری مناسب می‌تواند تعداد گره‌های بررسی‌شده را به شکل قابل توجهی کاهش دهد، در حالی که یک تابع ابتکاری ضعیف ممکن است باعث شود A* رفتاری مشابه Dijkstra داشته باشد.",
  },

  pros: [
    "در صورت استفاده از یک تابع ابتکاری مجاز، می‌تواند کوتاه‌ترین مسیر را پیدا کند.",
    "در صورت وجود یک تابع ابتکاری مناسب، معمولاً گره‌های کمتری را نسبت به الگوریتم‌های مسیریابی بدون اطلاعات بررسی می‌کند.",
    "برای مسائل مسیریابی روی گراف‌های وزن‌دار مناسب است.",
    "تابع ابتکاری را می‌توان بر اساس ساختار مسئله و نوع حرکت مجاز تنظیم کرد.",
  ],

  cons: [
    "برای عملکرد مناسب به یک تابع ابتکاری مؤثر نیاز دارد.",
    "به دلیل نگهداری گره‌های کشف‌شده و هزینه‌های مربوط به آن‌ها می‌تواند حافظه قابل توجهی مصرف کند.",
    "یک تابع ابتکاری ضعیف می‌تواند باعث شود عملکرد آن مشابه Dijkstra شود.",
    "طراحی یک تابع ابتکاری مناسب برای مسائل پیچیده می‌تواند دشوار باشد.",
  ],

  whenToUse: [
    "پیدا کردن مسیر بین دو نقطه در یک گراف وزن‌دار.",
    "مسیریابی روی شبکه‌های مربعی (Grid) در بازی‌ها و شبیه‌سازی‌ها.",
    "سیستم‌های مسیریابی که تخمینی از فاصله باقی‌مانده تا مقصد در دسترس است.",
    "مسائلی که رسیدن به یک مقصد مشخص اهمیت بیشتری از بررسی کل گراف دارد.",
  ],

  whenNotToUse: [
    "زمانی که هیچ تابع ابتکاری مناسبی برای مسئله وجود ندارد.",
    "زمانی که گراف بدون وزن است و استفاده از BFS کافی است.",
    "زمانی که هدف، محاسبه کوتاه‌ترین مسیر از یک مبدأ به تمام گره‌هاست، نه فقط یک مقصد مشخص.",
    "زمانی که حافظه به شدت محدود است.",
  ],

  applications: [
    {
      title: "مسیریابی در بازی‌های ویدیویی",
      description:
        "A* به طور گسترده در بازی‌ها برای پیدا کردن مسیرهای مناسب برای شخصیت‌ها، دشمنان و سایر موجودات متحرک روی نقشه‌ها و شبکه‌ها استفاده می‌شود.",
    },
    {
      title: "مسیریابی ربات‌ها",
      description:
        "ربات‌ها می‌توانند از A* برای پیدا کردن مسیر در محیط‌های مختلف استفاده کنند و هم‌زمان هزینه حرکت و فاصله تخمینی تا مقصد را در نظر بگیرند.",
    },
    {
      title: "سیستم‌های نقشه و مسیریابی",
      description:
        "A* می‌تواند برای پیدا کردن مسیرهای کم‌هزینه در سیستم‌های مسیریابی استفاده شود، زمانی که تخمین مناسبی از فاصله باقی‌مانده تا مقصد وجود داشته باشد.",
    },
    {
      title: "حل شبکه‌ها و هزارتوها",
      description:
        "A* می‌تواند در شبکه‌های مربعی و هزارتوها با ترکیب فاصله طی‌شده و تخمین فاصله باقی‌مانده، مسیر مناسب تا مقصد را به شکل کارآمد پیدا کند.",
    },
    {
      title: "مسیریابی در شبکه‌ها",
      description:
        "A* می‌تواند برای پیدا کردن مسیرهای کم‌هزینه در شبکه‌های وزن‌دار استفاده شود، زمانی که مقصد مشخص و یک تابع ابتکاری مناسب در دسترس باشد.",
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