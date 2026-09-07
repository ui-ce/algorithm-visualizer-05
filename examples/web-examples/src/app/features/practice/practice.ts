import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import type { Animation, RendererMetadata } from '@algorithm-visualizer/typescript-angular-renderer';
import { FramerEngine } from '@algorithm-visualizer/typescript-framer';
import type { Recording } from '@algorithm-visualizer/typescript-recorder';
import { bubbleSortVisualization } from '../../algorithm/bubble-sort';
import { mergeSortVisualization } from '../../algorithm/merge-sort';
import { quickSortVisualization } from '../../algorithm/quick-sort';
import { selectionSortVisualization } from '../../algorithm/selection-sort';
import { insertionSortVisualization } from '../../algorithm/insertion-sort';
import { binarySearchVisualization } from '../../algorithm/binary-search';
import { dijkstraVisualization } from '../../algorithm/dijkstra';
import { dfsVisualization } from '../../algorithm/dfs';
import { bfsVisualization } from '../../algorithm/bfs';
import { aStarVisualization } from '../../algorithm/a-start';
import { linearSearchVisualization } from '../../algorithm/LinearSearch';
import { AlgoHeader } from '../../layout/header/header';
import { ThemeService } from '../../core/services/theme.service';
import { LanguageService } from '../../core/services/language.service';
import { translate } from '../../core/i18n/translations';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { TranslateVarPipe } from '../../core/i18n/translate-var.pipe';
import type { BreadcrumbItem } from '../../layout/header/header-breadcrumb.type';
import { AlgoDrawer } from '../../design-system/drawer/drawer';
import { AlgoDrawerIconButton } from '../../design-system/drawer-icon-button/drawer-icon-button';
import { AlgoSegmentedButton } from '../../design-system/segmented-button/segmented-button';
import { AlgoButton } from '../../design-system/button/button';
import { buildLatexDocument, downloadTextFile } from '../../core/utils/latex-export.util';
import { VisualizationSection } from './components/visualization-section/visualization-section';
import { VisualizationArea } from './components/visualization-area/visualization-area';
import { NavigationControls } from './components/navigation-controls/navigation-controls';
import { ControlSection } from './components/control-section/control-section';
import { PseudocodeSection } from './components/pseudocode-section/pseudocode-section';
import { CustomInputModal } from './components/custom-input-modal/custom-input-modal';
import type { CustomInputResult, GraphEdgeInput } from './components/custom-input-modal/custom-input-modal.types';
import type { LegendItem } from './components/visualization-legend/visualization-legend.types';
import type { DataPattern, PatternOption } from './components/data-pattern-controls/data-pattern-controls.types';
import { DEFAULT_ARRAY_PATTERN_OPTIONS } from './components/data-pattern-controls/data-pattern-controls.types';
import type { PseudocodeLine } from './components/pseudocode-panel/pseudocode-panel.types';
import { ALGORITHM_CONTENT } from '../practice/data/algorithm-content.registry';
import { ALGORITHM_CONTENT_FA } from '../practice/data/algorithm-content.registry.fa';
import type { AlgorithmContent } from '../practice/data/algorithm-content.types';
import { PSEUDOCODE_REGISTRY } from './data/pseudocode.registry';
import { isTestAvailable, buildLevelPlan, countEarnedStars } from '../test/data/test-question-bank';
import { TestProgressService } from '../../core/services/test-progress.service';



import {
  SAMPLE_DFS_GRAPH,
  SAMPLE_DIJKSTRA_GRAPHS,
  SAMPLE_BFS_GRAPH,
  SAMPLE_ASTAR_GRAPHS,
  randomBfsGraph,
  randomAStarSample,
  patternedDfsGraph,
  patternedBfsGraph,
  patternedWeightedGraphSample,
  patternedAStarSample,
  type DijkstraSample,
  type GraphPattern,
} from './data/sample-graphs';
// Confirmed against the installed package.
import {
  SolarChartLinear,
  SolarCodeSquareLinear,
  SolarCloseCircleLinear,
  SolarCopyLinear,
  SolarDownloadLinear,
  SolarStarLinear,
  SolarStarBold,
  SolarLockKeyholeMinimalisticLinear,
} from '@solar-icons/angular';
import type { DrawerSectionId } from './practice.types';

// Reuses the same translation keys already defined for the algorithm
// name on the home page cards (core/i18n/home.translations.ts), so the
// name isn't translated twice in two different places.
const ALGORITHM_NAME_KEYS: Record<string, string> = {
  'bubble-sort': 'home.algorithm.bubbleSort.name',
  'merge-sort': 'home.algorithm.mergeSort.name',
  'quick-sort': 'home.algorithm.quickSort.name',
  'selection-sort': 'home.algorithm.selectionSort.name',
  'insertion-sort': 'home.algorithm.insertionSort.name',
  'binary-search': 'home.algorithm.binarySearch.name',
  'linear-search': 'home.algorithm.linearSearch.name',
  dijkstra: 'home.algorithm.dijkstra.name',
  dfs: 'home.algorithm.dfs.name',
  bfs: 'home.algorithm.bfs.name',
  'a-star': 'home.algorithm.aStar.name',
};

// Array-based algorithms get the array input grid, Random button, and
// data-pattern buttons. Linear Search belongs here alongside Binary
// Search — it runs on a plain array like every sort, it just doesn't
// require the array to be sorted first (see setLinearSearchData).
const ARRAY_ALGORITHM_IDS = new Set([
  'bubble-sort',
  'merge-sort',
  'quick-sort',
  'selection-sort',
  'insertion-sort',
  'binary-search',
  'linear-search',
]);

// Graph-based algorithms get the Graph-canvas layout (see
// isGraphAlgorithm below) instead of the array Chart layout, and pull
// their data from sample-graphs.ts instead of a generated array.
const GRAPH_ALGORITHM_IDS = new Set(['dijkstra', 'dfs', 'bfs', 'a-star']);

// The two array-based *search* algorithms — used to pick the search
// legend (Search Range / Checking / Eliminated / Found) instead of the
// sort legend (Active / Comparing / Swapping / Sorted), since neither
// one ever emits a 'swap' or 'sorted' tag (see CHART_METADATA_ENTRY).
const SEARCH_ALGORITHM_IDS = new Set(['binary-search', 'linear-search']);

// Was 400ms — felt too fast at the default 1x speed. Every speed level
// (0.5x / 1x / 1.5x / 2x, see speed-button.ts) divides this same base,
// so bumping it slows all of them proportionally instead of just one.
const PLAYBACK_BASE_INTERVAL_MS = 550;

// Matches the segmented button's own transform transition duration
// (segmented-button.scss) — see onTabChange's comment below.
const TAB_SLIDE_DELAY_MS = 250;

// Shared highlight-tag → color mappings, reused across every algorithm's
// renderer metadata. Algorithms only ever apply a subset of these tags
// to their own data, so handing every algorithm the full set is
// harmless — unused tags just never get looked up.
const CHART_METADATA_ENTRY = {
  type: 'Chart' as const,
  metadata: {
    defaultColor: 'var(--color-viz-default)',
    highlightTags: [
      { tag: 'active', color: 'var(--color-viz-active)' },
      { tag: 'compare', color: 'var(--color-viz-comparing)' },
      { tag: 'swap', color: 'var(--color-viz-swapping)' },
      { tag: 'sorted', color: 'var(--color-viz-sorted)' },
      { tag: 'section', color: 'var(--color-viz-active)' },
      { tag: 'sorting', color: 'var(--color-viz-comparing)' },
      // The element currently being checked (Binary Search's mid
      // element) — was mapped to the red "swapping" color, which reads
      // as an error/removal rather than "this is being examined now".
      // Comparing (orange) matches every other "currently checking"
      // tag below ('compare', 'sorting').
      { tag: 'middle', color: 'var(--color-viz-comparing)' },
      { tag: 'target', color: 'var(--color-viz-sorted)' },
      // Binary Search's out-of-range half and Linear Search's
      // already-checked-and-rejected elements. This tag is applied by
      // both recorders (see algorithm/binary-search.ts and
      // algorithm/LinearSearch.ts) but previously had no color entry
      // here at all, so eliminated cells silently rendered with the
      // default color instead of a distinct one.
      { tag: 'eliminated', color: 'var(--color-viz-swapping)' },
      // "This cost just got cheaper" (Dijkstra/A* relaxing an edge).
      // --color-viz-updated exists specifically for this ("Momentary
      // flash for 'this value just changed for the better'" — see
      // styles/tokens/_colors.scss) but was never actually wired up;
      // 'changed' was falling back to the orange "comparing" color,
      // which is indistinguishable from an in-progress comparison.
      { tag: 'changed', color: 'var(--color-viz-updated)' },
      // Quick Sort's pivot element for the current section.
      { tag: 'pivot', color: 'var(--color-viz-active)' },
      // Selection Sort's current best (smallest) candidate this pass.
      { tag: 'min', color: 'var(--color-viz-swapping)' },
      // Insertion Sort's element being shifted right to make room.
      { tag: 'shift', color: 'var(--color-viz-swapping)' },
    ],
  },
};

const GRAPH_METADATA_ENTRY = {
  type: 'Graph' as const,
  metadata: {
    defaultNodeColor: 'var(--color-viz-default)',
    defaultEdgeColor: 'var(--color-viz-default)',
    nodeHighlightTags: [
      { tag: 'open', color: 'var(--color-viz-active)' },
      { tag: 'current', color: 'var(--color-viz-comparing)' },
      { tag: 'closed', color: 'var(--color-viz-sorted)' },
      // Momentarily flashed when DFS/BFS mark a node visited (see
      // dfs.ts / bfs.ts). --color-viz-explored was defined specifically
      // for this ("DFS visited nodes ... deliberately distinct from
      // --color-viz-sorted" — styles/tokens/_colors.scss) but was
      // never referenced anywhere; this tag was using the red
      // "swapping" color instead, which reads as an error rather than
      // "this node has been visited".
      { tag: 'visit', color: 'var(--color-viz-explored)' },
    ],
    edgeHighlightTags: [
      { tag: 'compare', color: 'var(--color-viz-comparing)' },
      { tag: 'path', color: 'var(--color-viz-active)' },
      { tag: 'final-path', color: 'var(--color-viz-sorted)' },
    ],
  },
};

// compact: true — this panel (DFS's call stack, Dijkstra's priority
// queue) sits underneath the main Graph visualization rather than
// being the main visualization, per the requirement that it stay a
// small strip and never take over the Graph's space.
const ARRAY_2D_METADATA_ENTRY = {
  type: 'Array2D' as const,
  metadata: {
    compact: true,
    defaultColor: 'var(--color-viz-default)',
    highlightTags: [
      { tag: 'sorting', color: 'var(--color-viz-comparing)' },
      { tag: 'remove', color: 'var(--color-viz-swapping)' },
      { tag: 'new', color: 'var(--color-viz-active)' },
      // Dijkstra's priority queue: node about to be popped, and an
      // existing entry whose distance just got a cheaper update.
      { tag: 'selected', color: 'var(--color-viz-comparing)' },
      // Same "cheaper cost just found" moment as the Chart's 'changed'
      // tag above — uses the same dedicated --color-viz-updated token
      // instead of the red "swapping" color it had before.
      { tag: 'updated', color: 'var(--color-viz-updated)' },
    ],
  },
};

@Component({
  selector: 'algo-practice-page',
  imports: [
    AlgoHeader,
    AlgoDrawer,
    AlgoDrawerIconButton,
    AlgoSegmentedButton,
    // AlgoButton, // not currently used in this template
    VisualizationSection,
    VisualizationArea,
    NavigationControls,
    ControlSection,
    PseudocodeSection,
    CustomInputModal,
    SolarChartLinear,
    SolarCodeSquareLinear,
    SolarCloseCircleLinear,
    SolarCopyLinear,
    SolarDownloadLinear,
    SolarStarLinear,
    SolarStarBold,
    TranslatePipe,
    TranslateVarPipe,
    SolarLockKeyholeMinimalisticLinear,
  ],
  templateUrl: './practice.html',
  styleUrl: './practice.scss',
})
export class PracticePage implements OnDestroy {
  protected readonly algorithmId: string;
  // Bubble/Merge/Binary Search accept array input and the Best/Worst/
  // Nearly-Sorted/Reverse pattern controls make sense for them; DFS and
  // Dijkstra run on graphs, where those buttons have nothing to do —
  // used to hide that row instead of leaving dead controls on screen
  // just to keep every algorithm page visually identical.
  protected readonly isArrayAlgorithm: boolean;
  protected readonly isGraphAlgorithm: boolean;

  // Name/breadcrumbs/tabs/legend/content are getters (not fields set once
  // in the constructor) because they must re-resolve when the language
  // toggle fires — there's no page reload, so a field frozen at
  // construction time would keep showing the old language.
  protected get algorithmDisplayName(): string {
    const nameKey = ALGORITHM_NAME_KEYS[this.algorithmId];
    return nameKey ? translate(nameKey, this.languageService.currentLanguage()) : this.algorithmId;
  }

  protected get breadcrumbs(): BreadcrumbItem[] {
    const language = this.languageService.currentLanguage();
    return [
      { label: translate('practice.breadcrumb.home', language), route: '/' },
      { label: translate('practice.breadcrumb.algorithms', language), route: '/', fragment: 'landing-picker' },
      { label: this.algorithmDisplayName, route: '' },
    ];
  }

  protected get content(): AlgorithmContent | null {
    const language = this.languageService.currentLanguage();
    if (language === 'fa') {
      return ALGORITHM_CONTENT_FA[this.algorithmId] ?? ALGORITHM_CONTENT[this.algorithmId] ?? null;
    }
    return ALGORITHM_CONTENT[this.algorithmId] ?? null;
  }

  protected get tabs(): string[] {
    const language = this.languageService.currentLanguage();
    return [
      translate('practice.tabs.learn', language),
      translate('practice.tabs.practice', language),
      translate('practice.tabs.test', language),
    ];
  }

  // Badges are chosen per algorithm family from the actual highlight
  // tags that family's recorder emits (see CHART_METADATA_ENTRY /
  // GRAPH_METADATA_ENTRY above) instead of always showing the same
  // five sort-only labels — Dijkstra/DFS/BFS/A* never emit 'swap' or
  // 'sorted', and Binary/Linear Search never emit 'active' or 'swap',
  // so showing those labels there was always description of a state
  // that could never actually appear on screen.
  protected get legendItems(): LegendItem[] {
    const language = this.languageService.currentLanguage();
    const t = (key: string) => translate(key, language);

    if (this.isGraphAlgorithm) {
      return [
        { label: t('practice.legend.default'), colorToken: 'viz-default' },
        { label: t('practice.legend.graph.frontier'), colorToken: 'viz-active' },
        { label: t('practice.legend.graph.current'), colorToken: 'viz-comparing' },
        { label: t('practice.legend.graph.visited'), colorToken: 'viz-explored' },
        { label: t('practice.legend.graph.finalPath'), colorToken: 'viz-sorted' },
      ];
    }

    if (SEARCH_ALGORITHM_IDS.has(this.algorithmId)) {
      return [
        { label: t('practice.legend.default'), colorToken: 'viz-default' },
        { label: t('practice.legend.search.range'), colorToken: 'viz-active' },
        { label: t('practice.legend.search.comparing'), colorToken: 'viz-comparing' },
        { label: t('practice.legend.search.eliminated'), colorToken: 'viz-swapping' },
        { label: t('practice.legend.search.found'), colorToken: 'viz-sorted' },
      ];
    }

    return [
      { label: t('practice.legend.default'), colorToken: 'viz-default' },
      { label: t('practice.legend.active'), colorToken: 'viz-active' },
      { label: t('practice.legend.comparing'), colorToken: 'viz-comparing' },
      { label: t('practice.legend.swapping'), colorToken: 'viz-swapping' },
      { label: t('practice.legend.sorted'), colorToken: 'viz-sorted' },
    ];
  }

  protected selectedTabIndex = 1;
  // Default closed — same as before the redesign. Only the *number*
  // of panels changed (Complexity + Code now, instead of five);
  // open/close behavior is back to exactly what it was.
  protected activeDrawerSection: DrawerSectionId | null = null;
  protected isTestUnavailableModalOpen = false;

  // Same star-progress logic as test-plan.ts (TestPlan) — kept as a
  // literal copy rather than a shared service call site, since both
  // pages need the exact same three numbers (starSlots/earnedStars/
  // levels-for-tooltip-labels) and duplicating four lines here is
  // simpler than threading a new shared abstraction through both.
  protected readonly starSlots = Array.from({ length: 3 }, (_, i) => i + 1);
  protected earnedStars = 0;
  private readonly levelsForStars: { difficulty: string }[];

  private static readonly DRAWER_SECTION_TITLE_KEYS: Record<DrawerSectionId, string> = {
    overview: 'practice.drawer.overview',
    complexity: 'practice.drawer.complexity',
    'pros-cons': 'practice.drawer.prosCons',
    implementation: 'practice.drawer.implementation',
    usage: 'practice.drawer.usage',
  };

  protected get drawerPanelTitle(): string {
    if (!this.activeDrawerSection) {
      return '';
    }
    return translate(
      PracticePage.DRAWER_SECTION_TITLE_KEYS[this.activeDrawerSection],
      this.languageService.currentLanguage(),
    );
  }

  protected animation: Animation | null = null;
  protected rendererMetadata: RendererMetadata | null = null;
  // Whether the LaTeX export dropdown (.tex / PDF / .aux) is open.
  protected isExportMenuOpen = false;
  protected frameIndex = 0;
  protected currentStep = 0;
  protected totalSteps = 0;
  protected speed = 1;
  protected isPlaying = false;
  protected selectedPattern: DataPattern | null = null;
  protected isCustomInputModalOpen = false;

  // Which value the current search run is looking for — Binary Search
  // and Linear Search both need this visible on screen (not just
  // buried in the Log messages), so a person can tell at a glance
  // whether a given run's "not found" result is actually correct. Null
  // for every non-search algorithm.
  protected searchTarget: number | null = null;

  // Same idea as selectedPattern, for the graph-algorithm pattern row
  // (Chain / Dense / Disconnected) — see onGraphPatternChange and
  // graphPatternOptions below.
  protected selectedGraphPattern: GraphPattern | null = null;

  // Passed to ControlSection's patternOptions input for every graph
  // algorithm — Chain/Dense/Disconnected instead of the array-sorting
  // Nearly Sorted/Reversed/Many Duplicates, rendered through the exact
  // same DataPatternControls component so the row looks identical to a
  // sort page's, just with different buttons.
  protected readonly graphPatternOptions: PatternOption<GraphPattern | null>[] = [
    { id: null, labelKey: 'practice.pattern.none' },
    { id: 'chain', labelKey: 'practice.pattern.graph.chain' },
    { id: 'tree', labelKey: 'practice.pattern.graph.tree' },
    { id: 'dense', labelKey: 'practice.pattern.graph.dense' },
    { id: 'disconnected', labelKey: 'practice.pattern.graph.disconnected' },
  ];

  // Sourced from the per-algorithm registry instead of being hardcoded
  // to Bubble Sort's shape, so every algorithm gets its own pseudocode
  // and — since each algorithm's Log messages carry a matching `line`
  // number — the active line actually tracks the step being played.
  protected readonly pseudocodeLines: PseudocodeLine[];

  protected activeLineNumber: number | null = null;
  protected explanationTitle = '';
  protected explanationDescription = '';

  private playbackIntervalId: ReturnType<typeof setInterval> | null = null;

  public constructor(
    private readonly router: Router,
    protected readonly themeService: ThemeService,
    protected readonly languageService: LanguageService,
    private readonly testProgressService: TestProgressService,
    route: ActivatedRoute,
  ) {
    this.algorithmId = route.snapshot.paramMap.get('id') ?? 'bubble-sort';
    this.isArrayAlgorithm = ARRAY_ALGORITHM_IDS.has(this.algorithmId);
    this.isGraphAlgorithm = GRAPH_ALGORITHM_IDS.has(this.algorithmId);
    this.pseudocodeLines = PSEUDOCODE_REGISTRY[this.algorithmId] ?? [];

    this.levelsForStars = buildLevelPlan(this.algorithmId, (difficulty, setNumber) =>
      this.testProgressService.isSetPassed(this.algorithmId, difficulty, setNumber),
    );
    this.earnedStars = countEarnedStars(this.algorithmId, (difficulty, setNumber) =>
      this.testProgressService.isSetPassed(this.algorithmId, difficulty, setNumber),
    );

    this.generateInitialData();
  }

  protected starTooltip(starIndex: number): string {
    const requiredLevel = this.levelsForStars[starIndex - 1];
    if (!requiredLevel) return '';
    const levelLabel = requiredLevel.difficulty.charAt(0).toUpperCase() + requiredLevel.difficulty.slice(1);
    return starIndex <= this.earnedStars
      ? `Earned — you completed the ${levelLabel} level`
      : `Complete the ${levelLabel} level to earn this star`;
  }

  public ngOnDestroy(): void {
    this.stopPlayback();
  }

  // Back to the original toggle-to-close behavior — clicking the
  // already-active icon closes the drawer.
  protected toggleDrawerSection(section: DrawerSectionId): void {
    this.activeDrawerSection = this.activeDrawerSection === section ? null : section;
  }

  protected closeDrawer(): void {
    this.activeDrawerSection = null;
  }

  // The segmented button's thumb animates on its own (0.25s CSS
  // transition) whenever selectedTabIndex changes, but Learn/Practice/
  // Test are three separate routes/component instances — navigating
  // immediately tears the whole page (and that thumb) down before the
  // slide can ever play. Setting the index first and only navigating
  // after the transition's duration lets the thumb visibly slide to
  // the clicked tab before the page underneath it changes, instead of
  // jumping straight to a brand-new page with no transition at all.
  protected onTabChange(index: number): void {
    if (index === 2 && !isTestAvailable(this.algorithmId)) {
      this.isTestUnavailableModalOpen = true;
      return;
    }

    this.selectedTabIndex = index;

    setTimeout(() => {
      if (index === 0) {
        this.router.navigate(['/algorithms', this.algorithmId, 'learn']);
      } else if (index === 2) {
        this.router.navigate(['/algorithms', this.algorithmId, 'test']);
      }
    }, TAB_SLIDE_DELAY_MS);
  }

  protected closeTestUnavailableModal(): void {
    this.isTestUnavailableModalOpen = false;
  }

  protected onSpeedChange(speed: number): void {
    this.speed = speed;
    if (this.isPlaying) {
      this.startPlayback();
    }
  }

  protected onPrevious(): void {
    this.hasInteracted = true;
    this.stepTo(this.frameIndex - 1);
  }

  protected onPlayToggle(): void {
    this.hasInteracted = true;
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.startPlayback();
    } else {
      this.stopPlayback();
    }
  }

  protected onNext(): void {
    this.hasInteracted = true;
    this.stepTo(this.frameIndex + 1);
  }

  protected onAgain(): void {
    this.stopPlayback();
    this.hasInteracted = true;
    this.stepTo(0);
    this.isPlaying = true;
    this.startPlayback();
  }

  protected onCustomInputClick(): void {
    this.hasInteracted = true;
    this.isCustomInputModalOpen = true;
  }

  protected onCustomInputModalClosed(): void {
    this.isCustomInputModalOpen = false;
  }

  // What this does now depends on which fields the modal actually
  // showed, which in turn depends on algorithmId (passed into the
  // modal as an @Input) — see CustomInputModal for the field logic
  // itself.
  protected onCustomInputApplied(result: CustomInputResult): void {
    if (result.kind === 'array') {
      this.setArrayData(result.values, true);
      return;
    }

    if (result.kind === 'array-with-target') {
      if (this.algorithmId === 'linear-search') {
        // Unlike binary search, linear search doesn't require (or
        // want) the array sorted first.
        const recording = linearSearchVisualization([...result.values], result.target);
        this.applyRecording(
          recording,
          [CHART_METADATA_ENTRY],
          true,
        );
        this.searchTarget = result.target;
        return;
      }

      // Binary search requires a sorted array; the target the person
      // typed is used as-is, including the "not found" case where it
      // isn't actually one of the array's values.
      const sortedArray = [...result.values].sort((a, b) => a - b);
      const recording = binarySearchVisualization(sortedArray, result.target);
      this.applyRecording(
        recording,
        [CHART_METADATA_ENTRY],
        true,
      );
      this.searchTarget = result.target;
      return;
    }

    // result.kind === 'graph'
    if (this.algorithmId === 'dijkstra') {
      const graph = this.buildDijkstraGraph(result.edges);
      this.setDijkstraData(
        { graph, start: result.start, end: result.end ?? result.start },
        true,
      );
      return;
    }

    if (this.algorithmId === 'a-star') {
      // Same weighted-edge shape as Dijkstra — see buildDijkstraGraph.
      const graph = this.buildDijkstraGraph(result.edges);
      this.setAStarData(
        { graph, start: result.start, end: result.end ?? result.start },
        true,
      );
      return;
    }

    if (this.algorithmId === 'dfs') {
      const graph = this.buildDfsGraph(result.edges);
      this.setDfsData(graph, true);
      return;
    }

    if (this.algorithmId === 'bfs') {
      // Same undirected-edge shape as DFS — see buildDfsGraph. BFS's
      // recorder hardcodes its start to 'A' exactly like DFS's does
      // (see algorithm/bfs.ts), which is also why the modal fixes the
      // start field for both instead of making it editable.
      const graph = this.buildDfsGraph(result.edges);
      this.setBfsData(graph, true);
    }
  }

  // Dijkstra's recorder wants Record<string, Record<string, number>[]> —
  // every node reachable from an edge needs its own (possibly empty)
  // entry, since the node list and initial cost table are both built
  // from Object.keys(graph). Edges are treated as directed, matching
  // how they're typed into the modal ("from to weight").
  private buildDijkstraGraph(edges: GraphEdgeInput[]): Record<string, Record<string, number>[]> {
    const graph: Record<string, Record<string, number>[]> = {};
    for (const edge of edges) {
      graph[edge.from] ??= [];
      graph[edge.to] ??= [];
      graph[edge.from].push({ [edge.to]: edge.weight ?? 0 });
    }
    return graph;
  }

  // DFS's recorder wants Record<string, string[]> and treats the graph
  // as undirected (see sample-graphs.ts), so each typed edge is added
  // to both endpoints' adjacency lists.
  private buildDfsGraph(edges: GraphEdgeInput[]): Record<string, string[]> {
    const graph: Record<string, string[]> = {};
    for (const edge of edges) {
      graph[edge.from] ??= [];
      graph[edge.to] ??= [];
      if (!graph[edge.from].includes(edge.to)) {
        graph[edge.from].push(edge.to);
      }
      if (!graph[edge.to].includes(edge.from)) {
        graph[edge.to].push(edge.from);
      }
    }
    return graph;
  }

  protected onRandomInputClick(): void {
    if (this.algorithmId === 'dijkstra') {
      this.selectedGraphPattern = null;
      const sample = SAMPLE_DIJKSTRA_GRAPHS[Math.floor(Math.random() * SAMPLE_DIJKSTRA_GRAPHS.length)];
      this.setDijkstraData(sample, true);
      return;
    }

    if (this.algorithmId === 'a-star') {
      this.selectedGraphPattern = null;
      this.setAStarData(randomAStarSample(), true);
      return;
    }

    if (this.algorithmId === 'dfs') {
      this.selectedGraphPattern = null;
      this.setDfsData(randomBfsGraph(), true);
      return;
    }

    if (this.algorithmId === 'bfs') {
      this.selectedGraphPattern = null;
      this.setBfsData(randomBfsGraph(), true);
      return;
    }

    if (!ARRAY_ALGORITHM_IDS.has(this.algorithmId)) {
      return;
    }

    const count = Math.floor(Math.random() * 15) + 10;

    if (this.algorithmId === 'binary-search') {
      this.setBinarySearchData(this.sortedRandomArray(count), true);
      return;
    }

    if (this.algorithmId === 'linear-search') {
      this.setLinearSearchData(this.randomArray(count), true);
      return;
    }

    this.setArrayData(this.randomArray(count), true);
  }

  // Takes string | null (not DataPattern | null) because it's now bound
  // to the same generic patternChange event graph pages use too — see
  // onGraphPatternChange below and ControlSection's identical comment.
  // The cast is safe because DataPatternControls only ever emits one of
  // the ids from whichever options list this page handed it.
  protected onPatternChange(pattern: string | null): void {
    this.hasInteracted = true;
    const typedPattern = pattern as DataPattern | null;
    this.selectedPattern = typedPattern;

    if (!ARRAY_ALGORITHM_IDS.has(this.algorithmId)) {
      return;
    }

    const array = typedPattern === null ? this.randomArray(20) : this.patternedArray(typedPattern, 20);

    if (this.algorithmId === 'binary-search') {
      // Whatever pattern was picked, binary search still needs the
      // result sorted to behave correctly.
      this.setBinarySearchData([...array].sort((a, b) => a - b), true);
      return;
    }

    if (this.algorithmId === 'linear-search') {
      // Unlike binary search, linear search doesn't need the pattern
      // sorted — 'reversed' and 'nearly-sorted' are still perfectly
      // valid, meaningful arrays to scan linearly; forcing a sort here
      // would make every pattern look identical to binary search's.
      this.setLinearSearchData(array, true);
      return;
    }

    this.setArrayData(array, true);
  }

  // Graph counterpart of onPatternChange — same idea (pick a pattern,
  // regenerate data from it), but for Chain/Dense/Disconnected instead
  // of Nearly Sorted/Reversed/Many Duplicates. Every graph algorithm
  // uses one of these two branches: DFS/BFS take a plain adjacency
  // list, Dijkstra/A* take the weighted graph + start/end shape.
  protected onGraphPatternChange(pattern: string | null): void {
    this.hasInteracted = true;
    const typedPattern = pattern as GraphPattern | null;
    this.selectedGraphPattern = typedPattern;

    if (this.algorithmId === 'dfs') {
      this.setDfsData(
        typedPattern === null
          ? randomBfsGraph()
          : patternedDfsGraph(typedPattern),
        true,
      );
      return;
    }

    if (this.algorithmId === 'bfs') {
      this.setBfsData(
        typedPattern === null
          ? randomBfsGraph()
          : patternedBfsGraph(typedPattern),
        true,
      );
      return;
    }

    if (this.algorithmId === 'dijkstra') {
      const sample =
        typedPattern === null
          ? SAMPLE_DIJKSTRA_GRAPHS[
          Math.floor(Math.random() * SAMPLE_DIJKSTRA_GRAPHS.length)
          ]
          : patternedWeightedGraphSample(typedPattern);

      this.setDijkstraData(sample, true);
      return;
    }

    if (this.algorithmId === 'a-star') {
      this.setAStarData(
        typedPattern === null
          ? randomAStarSample()
          : patternedAStarSample(typedPattern),
        true,
      );
    }
  }

  protected onCompareClick(): void {
    // Algorithm-1 on the Compare page is whichever algorithm this button
    // was clicked from — Compare reads it back out of the same ':id'
    // route param Practice itself uses (see compare.ts's constructor).
    this.router.navigate(['/compare', this.algorithmId]);
  }

  protected hasInteracted = false;

  protected isVisualizationMaximized = false;

  protected copiedLanguage: string | null = null;

  protected onCopyCode(code: string, language: string): void {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        this.copiedLanguage = language;
        setTimeout(() => {
          if (this.copiedLanguage === language) {
            this.copiedLanguage = null;
          }
        }, 1500);
      })
      .catch(() => {
        // Clipboard access can be denied by the browser — silently
        // ignored since there's no good recovery beyond letting the
        // person select and copy the text manually.
      });
  }

  protected onFullscreenToggle(): void {
    this.isVisualizationMaximized = !this.isVisualizationMaximized;
  }

  private stepTo(index: number): void {
    const clamped = Math.max(0, Math.min(index, this.totalSteps - 1));
    this.frameIndex = clamped;
    this.currentStep = clamped;
    this.updateExplanationFromLog(clamped);
  }

  // Every algorithm's recorder now tags each Log entry with a short
  // `title`, the human-readable `message`, and the pseudocode `line`
  // it corresponds to (see bubble-sort.ts / merge-sort.ts / etc.) —
  // this just surfaces that same per-step data in the Explanation
  // panel and the pseudocode panel's active-line highlight, instead of
  // the two staying hardcoded to whatever the last placeholder was.
  private updateExplanationFromLog(index: number): void {
    // Frame 0 always carries a real log entry (the first recorded
    // operation's message), so without this guard it would render in
    // the Explanation panel the instant the page loads — before the
    // person has pressed Play/Next/Previous and before anything has
    // actually happened on screen. The panel should stay empty until
    // there's a real step to explain.
    if (!this.hasInteracted) {
      return;
    }

    const frame = this.animation?.[index];
    const logState = frame?.find((frameState) => frameState.type === 'Log')?.state as
      | { message?: string; title?: string; line?: number }
      | undefined;

    if (!logState) {
      return;
    }

    this.explanationDescription = logState.message ?? this.explanationDescription;
    this.explanationTitle = logState.title ?? this.explanationTitle;
    this.activeLineNumber = logState.line ?? this.activeLineNumber;
  }

  private startPlayback(): void {
    this.stopPlayback();
    this.playbackIntervalId = setInterval(() => {
      if (this.frameIndex >= this.totalSteps - 1) {
        this.stopPlayback();
        this.isPlaying = false;
        return;
      }
      this.stepTo(this.frameIndex + 1);
    }, PLAYBACK_BASE_INTERVAL_MS / this.speed);
  }

  private stopPlayback(): void {
    if (this.playbackIntervalId !== null) {
      clearInterval(this.playbackIntervalId);
      this.playbackIntervalId = null;
    }
  }

  private generateInitialData(): void {
    switch (this.algorithmId) {
      case 'binary-search':
        this.setBinarySearchData(this.sortedRandomArray(20));
        break;

      case 'linear-search':
        // Unlike Binary Search, Linear Search doesn't need (or want)
        // a sorted array — sortedness isn't part of what it's
        // demonstrating, and always sorting it would make every run
        // look identical to Binary Search's input.
        this.setLinearSearchData(this.randomArray(20));
        break;

      case 'dijkstra':
        this.setDijkstraData(SAMPLE_DIJKSTRA_GRAPHS[0]);
        break;

      case 'dfs':
        this.setDfsData(SAMPLE_DFS_GRAPH);
        break;

      case 'bfs':
        this.setBfsData(SAMPLE_BFS_GRAPH);
        break;

      case 'a-star':
        this.setAStarData(SAMPLE_ASTAR_GRAPHS[0]);
        break;

      case 'bubble-sort':
      case 'merge-sort':
      case 'quick-sort':
      case 'selection-sort':
      case 'insertion-sort':
      default:
        // setArrayData itself picks the right recorder based on
        // algorithmId, so every array-sorting algorithm lands here.
        this.setArrayData(this.randomArray(20));
        break;
    }
  }

  private setArrayData(array: number[], autoPlay = false): void {
    // Every recorder sorts its input array in place, so each call gets
    // its own copy rather than sharing the caller's array reference.
    const recording = this.buildArraySortRecording([...array]);
    this.applyRecording(recording, [CHART_METADATA_ENTRY], autoPlay);
  }

  private buildArraySortRecording(array: number[]): Recording {
    switch (this.algorithmId) {
      case 'merge-sort':
        return mergeSortVisualization(
          array,
          this.languageService.currentLanguage(),
        );
      case 'quick-sort':
        return quickSortVisualization(array, this.languageService.currentLanguage(),);
      case 'selection-sort':
        return selectionSortVisualization(array, this.languageService.currentLanguage(),);
      case 'insertion-sort':
        return insertionSortVisualization(array, this.languageService.currentLanguage(),);
      case 'bubble-sort':
      default:
        return bubbleSortVisualization(array, this.languageService.currentLanguage());
    }
  }

  private setBinarySearchData(sortedArray: number[], autoPlay = false,): void {
    const target = this.pickSearchTarget(sortedArray);
    const recording = binarySearchVisualization(
      [...sortedArray],
      target,
      this.languageService.currentLanguage(),
    );
    this.applyRecording(recording, [CHART_METADATA_ENTRY], autoPlay);
    this.searchTarget = target;
  }

  // Linear Search never sorts its input — that's the whole point of
  // the contrast with Binary Search — so this intentionally skips the
  // sort step setBinarySearchData does.
  private setLinearSearchData(array: number[], autoPlay = false): void {
    const target = this.pickSearchTarget(array);
    const recording = linearSearchVisualization(
      [...array],
      target,
      this.languageService.currentLanguage(),
    );
    this.applyRecording(recording, [CHART_METADATA_ENTRY], autoPlay);
    this.searchTarget = target;
  }

  private setDijkstraData(sample: DijkstraSample, autoPlay = false): void {
    const recording = dijkstraVisualization(sample.graph, sample.start, sample.end, this.languageService.currentLanguage());
    // dijkstra.ts still records three panels: the Graph, the Open/
    // Closed Set (Array2D), and the Node Costs chart. The comment that
    // used to be here said the chart had been removed — it hadn't —
    // and CHART_METADATA_ENTRY was missing from this list as a result,
    // so the Node Costs panel's 'changed' highlight had no color
    // metadata to resolve against.
    this.applyRecording(recording, [GRAPH_METADATA_ENTRY, ARRAY_2D_METADATA_ENTRY, CHART_METADATA_ENTRY], autoPlay);
  }

  private setDfsData(graph: Record<string, string[]>, autoPlay = false,): void {
    const recording = dfsVisualization(graph, this.languageService.currentLanguage());
    this.applyRecording(recording, [GRAPH_METADATA_ENTRY, ARRAY_2D_METADATA_ENTRY], autoPlay);
  }

  // Same recorder shape as DFS (Graph + one Array2D queue panel), just
  // a queue instead of a stack — see algorithm/bfs.ts.
  private setBfsData(graph: Record<string, string[]>, autoPlay = false): void {
    const recording = bfsVisualization(
      graph,
      'A',
      this.languageService.currentLanguage(),
    );
    this.applyRecording(recording, [GRAPH_METADATA_ENTRY, ARRAY_2D_METADATA_ENTRY], autoPlay);
  }

  // Same recorder shape as Dijkstra (Graph + Open/Closed Set + Node
  // Costs chart) — see algorithm/a-start.ts.
  private setAStarData(sample: DijkstraSample, autoPlay = false): void {
    const recording = aStarVisualization(
      sample.graph,
      sample.start,
      sample.end,
      this.languageService.currentLanguage(),
    );
    this.applyRecording(recording, [GRAPH_METADATA_ENTRY, ARRAY_2D_METADATA_ENTRY, CHART_METADATA_ENTRY], autoPlay);
  }

  private applyRecording(recording: Recording, objectMetaData: RendererMetadata['objectMetaData'], autoPlay = false,): void {
    // Reset here, not just at construction — every setXData method
    // (setArrayData, setDfsData, ...) funnels through this method, so
    // this is the one place guaranteed to run on every data change.
    // setBinarySearchData/setLinearSearchData re-set it right after
    // calling this.
    this.searchTarget = null;
    this.animation = new FramerEngine().getAnimation(recording);
    this.totalSteps = this.animation.length;
    this.rendererMetadata = {
      documentName: this.algorithmDisplayName,
      objectMetaData,
    };
    this.stopPlayback();
    this.isPlaying = false;
    this.stepTo(0);

    if (autoPlay) {
      this.isPlaying = true;
      this.startPlayback();
    }
  }

  protected toggleExportMenu(): void {
    this.isExportMenuOpen = !this.isExportMenuOpen;
  }

  // Renders whatever is currently loaded (this.animation /
  // this.rendererMetadata) — not a fresh, separate run — so the
  // exported file always matches whatever array/graph is on screen
  // right now, random or custom or pattern-generated.
  protected exportLatexSource(): void {
    if (!this.animation || !this.rendererMetadata) {
      return;
    }
    const tex = buildLatexDocument(this.animation, this.rendererMetadata, this.themeService.themeMode());
    downloadTextFile(`${this.algorithmId}.tex`, tex, 'application/x-tex');
    this.isExportMenuOpen = false;
  }

  // Picks a value to search for. Most of the time it's one already in
  // the array, so playback actually reaches the "found" step; roughly
  // one search in five targets a value just past the array's range so
  // the "not found" ending is reachable too.
  private pickSearchTarget(sortedArray: number[]): number {
    if (sortedArray.length > 0 && Math.random() < 0.8) {
      return sortedArray[Math.floor(Math.random() * sortedArray.length)];
    }
    const max = Math.max(...sortedArray, 0);
    return max + Math.floor(Math.random() * 10) + 1;
  }

  private randomArray(count: number): number[] {
    return Array.from({ length: count }, () => Math.floor(Math.random() * 70) + 10);
  }

  private sortedRandomArray(count: number): number[] {
    return this.randomArray(count).sort((a, b) => a - b);
  }

  // Builds an array that actually matches the chosen pattern, rather
  // than just relabeling a random one. "nearly-sorted" and
  // "many-duplicates" still shuffle in a bit of randomness each call so
  // picking the same pattern twice in a row doesn't produce an
  // identical array.
  private patternedArray(pattern: DataPattern, count: number): number[] {
    const base = Array.from({ length: count }, (_, i) => (i + 1) * 4);

    switch (pattern) {
      case 'reversed':
        return [...base].reverse();

      case 'nearly-sorted': {
        const arr = [...base];
        const swaps = Math.max(1, Math.floor(count / 10));
        for (let i = 0; i < swaps; i++) {
          const a = Math.floor(Math.random() * count);
          const b = Math.floor(Math.random() * count);
          [arr[a], arr[b]] = [arr[b], arr[a]];
        }
        return arr;
      }

      case 'many-duplicates': {
        const distinctValues = [10, 20, 30, 40];
        return Array.from(
          { length: count },
          () => distinctValues[Math.floor(Math.random() * distinctValues.length)],
        );
      }
    }
  }
}