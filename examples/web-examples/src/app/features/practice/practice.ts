import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import type { Animation, RendererMetadata } from '@algorithm-visualizer/typescript-angular-renderer';
import { FramerEngine } from '@algorithm-visualizer/typescript-framer';
import { bubbleSortVisualization } from '../../algorithm/bubble-sort';
import { AlgoHeader } from '../../layout/header/header';
import { ThemeService } from '../../core/services/theme.service';
import type { BreadcrumbItem } from '../../layout/header/header-breadcrumb.type';
import { AlgoDrawer } from '../../design-system/drawer/drawer';
import { AlgoDrawerIconButton } from '../../design-system/drawer-icon-button/drawer-icon-button';
import { AlgoSegmentedButton } from '../../design-system/segmented-button/segmented-button';
import { VisualizationSection } from './components/visualization-section/visualization-section';
import { VisualizationArea } from './components/visualization-area/visualization-area';
import { NavigationControls } from './components/navigation-controls/navigation-controls';
import { ControlSection } from './components/control-section/control-section';
import { PseudocodeSection } from './components/pseudocode-section/pseudocode-section';
import { CustomInputModal } from './components/custom-input-modal/custom-input-modal';
import type { LegendItem } from './components/visualization-legend/visualization-legend.types';
import type { DataPattern } from './components/data-pattern-controls/data-pattern-controls.types';
import type { PseudocodeLine } from './components/pseudocode-panel/pseudocode-panel.types';
import { ALGORITHM_CONTENT } from './data/algorithm-content.registry';
import type { AlgorithmContent } from './data/algorithm-content.types';
// Confirmed against the installed package.
import {
  SolarInfoCircleLinear,
  SolarMagnifierLinear,
  SolarChartLinear,
  SolarCodeSquareLinear,
  SolarWidget2Linear,
  SolarCloseCircleLinear,
  SolarCopyLinear,
} from '@solar-icons/angular';
import type { DrawerSectionId } from './practice.types';

// Display names for the algorithms reachable from the card list on the
// current entry page. Only Bubble Sort has real recorder/framer data
// wired in below — the others show the page structure with an empty
// Visualization Area until their own recorder functions are connected
// the same way.
const ALGORITHM_DISPLAY_NAMES: Record<string, string> = {
  'bubble-sort': 'Bubble Sort',
  'merge-sort': 'Merge Sort',
  'binary-search': 'Binary Search',
  dijkstra: 'Dijkstra',
  dfs: 'Depth-First Search (DFS)',
};

const PLAYBACK_BASE_INTERVAL_MS = 400;

@Component({
  selector: 'algo-practice-page',
  imports: [
    AlgoHeader,
    AlgoDrawer,
    AlgoDrawerIconButton,
    AlgoSegmentedButton,
    VisualizationSection,
    VisualizationArea,
    NavigationControls,
    ControlSection,
    PseudocodeSection,
    CustomInputModal,
    SolarInfoCircleLinear,
    SolarMagnifierLinear,
    SolarChartLinear,
    SolarCodeSquareLinear,
    SolarWidget2Linear,
    SolarCloseCircleLinear,
    SolarCopyLinear,
  ],
  templateUrl: './practice.html',
  styleUrl: './practice.scss',
})
export class PracticePage implements OnDestroy {
  protected readonly algorithmId: string;
  protected readonly algorithmDisplayName: string;
  protected readonly breadcrumbs: BreadcrumbItem[];
  protected readonly content: AlgorithmContent | null;

  protected readonly tabs = ['Learn', 'Practice', 'Test'];
  protected selectedTabIndex = 1;

  protected activeDrawerSection: DrawerSectionId | null = null;

  private static readonly DRAWER_SECTION_TITLES: Record<DrawerSectionId, string> = {
    overview: 'What is it?',
    complexity: 'Time and space complexity',
    'pros-cons': 'Pros and cons',
    implementation: 'Implementation',
    usage: 'Where is it used?',
  };

  protected get drawerPanelTitle(): string {
    return this.activeDrawerSection ? PracticePage.DRAWER_SECTION_TITLES[this.activeDrawerSection] : '';
  }

  protected animation: Animation | null = null;
  protected rendererMetadata: RendererMetadata | null = null;
  protected frameIndex = 0;
  protected currentStep = 0;
  protected totalSteps = 0;
  protected speed = 1;
  protected isPlaying = false;
  protected selectedPattern: DataPattern | null = null;
  protected isCustomInputModalOpen = false;

  protected readonly legendItems: LegendItem[] = [
    { label: 'Default', colorToken: 'viz-default' },
    { label: 'Active', colorToken: 'viz-active' },
    { label: 'Comparing', colorToken: 'viz-comparing' },
    { label: 'Swapping', colorToken: 'viz-swapping' },
    { label: 'Sorted', colorToken: 'viz-sorted' },
  ];

  // Placeholder pseudocode for Bubble Sort until this reads from the
  // same per-algorithm data source the visualization does.
  protected readonly pseudocodeLines: PseudocodeLine[] = [
    {
      lineNumber: 1,
      indentLevel: 0,
      tokens: [
        { text: 'function', kind: 'keyword' },
        { text: ' bubbleSort(arr):', kind: 'plain' },
      ],
    },
    {
      lineNumber: 2,
      indentLevel: 1,
      tokens: [
        { text: 'for', kind: 'keyword' },
        { text: ' i = 0 ', kind: 'plain' },
        { text: 'to', kind: 'keyword' },
        { text: ' length(arr) - ', kind: 'plain' },
        { text: '1', kind: 'number' },
        { text: ':', kind: 'plain' },
      ],
    },
    {
      lineNumber: 3,
      indentLevel: 2,
      tokens: [
        { text: 'if', kind: 'keyword' },
        { text: ' arr[i] > arr[i + ', kind: 'plain' },
        { text: '1', kind: 'number' },
        { text: ']:', kind: 'plain' },
      ],
    },
    {
      lineNumber: 4,
      indentLevel: 3,
      tokens: [
        { text: 'swap(arr[i], arr[i + ', kind: 'plain' },
        { text: '1', kind: 'number' },
        { text: '])', kind: 'plain' },
      ],
    },
    {
      lineNumber: 5,
      indentLevel: 0,
      tokens: [
        { text: 'return', kind: 'keyword' },
        { text: ' arr', kind: 'plain' },
      ],
    },
  ];

  protected activeLineNumber: number | null = 3;
  protected explanationTitle = 'Comparing elements';
  protected explanationDescription =
    'Placeholder — replaced with real step-by-step explanations once the algorithm is wired in.';

  private playbackIntervalId: ReturnType<typeof setInterval> | null = null;

  public constructor(
    private readonly router: Router,
    protected readonly themeService: ThemeService,
    route: ActivatedRoute,
  ) {
    this.algorithmId = route.snapshot.paramMap.get('id') ?? 'bubble-sort';
    this.algorithmDisplayName = ALGORITHM_DISPLAY_NAMES[this.algorithmId] ?? this.algorithmId;
    this.content = ALGORITHM_CONTENT[this.algorithmId] ?? null;
    this.breadcrumbs = [
      { label: 'Home', route: '/' },
      { label: 'Algorithms', route: '/algorithms' },
      { label: this.algorithmDisplayName, route: '' },
    ];

    if (this.algorithmId === 'bubble-sort') {
      this.setBubbleSortData(this.randomArray(20));
    }
  }

  public ngOnDestroy(): void {
    this.stopPlayback();
  }

  protected toggleDrawerSection(section: DrawerSectionId): void {
    this.activeDrawerSection = this.activeDrawerSection === section ? null : section;
  }

  protected closeDrawer(): void {
    this.activeDrawerSection = null;
  }

  protected onTabChange(index: number): void {
    this.selectedTabIndex = index;
    // Route navigation to the corresponding Learn/Test page for this
    // algorithm is added once those pages exist.
  }

  protected onSpeedChange(speed: number): void {
    this.speed = speed;
    if (this.isPlaying) {
      this.startPlayback();
    }
  }

  protected onPrevious(): void {
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
    this.isPlaying = false;
    this.stepTo(0);
  }

  protected onCustomInputClick(): void {
    this.hasInteracted = true;
    this.isCustomInputModalOpen = true;
  }

  protected onCustomInputModalClosed(): void {
    this.isCustomInputModalOpen = false;
  }

  protected onCustomInputApplied(values: number[]): void {
    if (this.algorithmId === 'bubble-sort') {
      this.setBubbleSortData(values);
    }
  }

  protected onRandomInputClick(): void {
    if (this.algorithmId !== 'bubble-sort') {
      return;
    }
    const count = Math.floor(Math.random() * 15) + 10;
    this.setBubbleSortData(this.randomArray(count));
  }

  protected onPatternChange(pattern: DataPattern | null): void {
    this.selectedPattern = pattern;

    if (this.algorithmId !== 'bubble-sort') {
      return;
    }

    if (pattern === null) {
      this.setBubbleSortData(this.randomArray(20));
      return;
    }

    this.setBubbleSortData(this.patternedArray(pattern, 20));
  }

  protected onCompareClick(): void {
    // Simplified for now — once comparison-page routing is built, this
    // should navigate to /compare?alg=<id> per the user flow document.
    this.router.navigate(['/compare']);
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

  // The recording already carries a human-readable message per step
  // (see LogRecorder.setMessage in bubble-sort.ts) — this just surfaces
  // that same text in the Explanation panel instead of duplicating it
  // with new copy. Title stays generic since the log only has a message,
  // not a short/long split.
  private updateExplanationFromLog(index: number): void {
    const frame = this.animation?.[index];
    const logState = frame?.find((frameState) => frameState.type === 'Log')?.state as
      | { message?: string }
      | undefined;

    this.explanationDescription = logState?.message ?? this.explanationDescription;
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

  private setBubbleSortData(array: number[]): void {
    const recording = bubbleSortVisualization(array);
    this.animation = new FramerEngine().getAnimation(recording);
    this.totalSteps = this.animation.length;
    this.rendererMetadata = {
      documentName: 'Bubble Sort',
      objectMetaData: [
        {
          type: 'Chart',
          metadata: {
            defaultColor: 'var(--color-viz-default)',
            highlightTags: [
              { tag: 'active', color: 'var(--color-viz-active)' },
              { tag: 'compare', color: 'var(--color-viz-comparing)' },
              { tag: 'swap', color: 'var(--color-viz-swapping)' },
              { tag: 'sorted', color: 'var(--color-viz-sorted)' },
            ],
          },
        },
      ],
    };
    this.stopPlayback();
    this.isPlaying = false;
    this.stepTo(0);
  }

  private randomArray(count: number): number[] {
    return Array.from({ length: count }, () => Math.floor(Math.random() * 70) + 10);
  }

  // Builds an array that actually matches the chosen pattern, rather
  // than just relabeling a random one. "nearly-sorted" and
  // "many-duplicates" still shuffle in a bit of randomness each call so
  // picking the same pattern twice in a row doesn't produce an
  // identical array.
  private patternedArray(pattern: DataPattern, count: number): number[] {
    const base = Array.from({ length: count }, (_, i) => (i + 1) * 4);

    switch (pattern) {
      case 'sorted':
        return base;

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
