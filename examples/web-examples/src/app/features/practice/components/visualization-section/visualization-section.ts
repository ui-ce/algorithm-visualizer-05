import { Component, EventEmitter, Input, OnDestroy, Output, inject } from '@angular/core';
import { Subscription } from 'rxjs';

import type {
  Animation,
  RendererMetadata,
} from '@algorithm-visualizer/typescript-angular-renderer';
import {
  GRAPH_LAYOUT_OPTIONS,
  GraphLayoutService,
  type GraphLayoutOption,
} from '@algorithm-visualizer/typescript-angular-renderer';

import { AlgoSpeedButton } from '../../../../design-system/speed-button/speed-button';
import { AlgoButton } from '../../../../design-system/button/button';
import { AlgoPlayPauseButton } from '../../../../design-system/play-pause-button/play-pause-button';

import { VisualizationArea } from '../visualization-area/visualization-area';
import { VisualizationLegend } from '../visualization-legend/visualization-legend';
import type { LegendItem } from '../visualization-legend/visualization-legend.types';

import { SolarFullScreenLinear } from '@solar-icons/angular';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { translate } from '../../../../core/i18n/translations';
import { LanguageService } from '../../../../core/services/language.service';
import { LocaleDigitsPipe } from '../../../../core/i18n/locale-digits.pipe';

@Component({
  selector: 'algo-visualization-section',
  standalone: true,
  imports: [
    AlgoSpeedButton,
    AlgoButton,
    AlgoPlayPauseButton,
    VisualizationArea,
    VisualizationLegend,
    SolarFullScreenLinear,
    TranslatePipe,
    LocaleDigitsPipe,
  ],
  templateUrl: './visualization-section.html',
  styleUrl: './visualization-section.scss',
})
export class VisualizationSection implements OnDestroy {
  private readonly languageService = inject(LanguageService);


  @Input()
  public currentStep = 0;

  @Input()
  public totalSteps = 0;

  @Input()
  public speed = 1;

  @Output()
  public readonly speedChange = new EventEmitter<number>();

  @Input()
  public animation: Animation | null = null;

  @Input()
  public rendererMetadata: RendererMetadata | null = null;

  @Input()
  public frameIndex = 0;

  @Input()
  public legendItems: LegendItem[] = [];

  @Input()
  public searchTarget: number | null = null;

  /**
   * Types rendered in the main visualization.
   *
   * Examples:
   * ['Graph']
   * ['Array2D']
   * ['Chart']
   */
  @Input()
  public includeTypes: string[] | null = null;

  /**
   * Additional data structures rendered beside
   * the main visualization for graph algorithms.
   *
   * Example:
   * ['Array2D', 'Chart']
   */
  @Input()
  public dataStructureTypes: string[] | null = null;

  @Output()
  public readonly fullscreenToggle = new EventEmitter<void>();

  @Input()
  public showHint = false;

  @Output()
  public readonly hintPlayClick = new EventEmitter<void>();

  @Output()
  public readonly hintGenerateClick = new EventEmitter<void>();

  @Input()
  public isGraphAlgorithm = false;

  @Input()
  public algorithmId = '';


  // Drives graph-renderer's Cytoscape layout from up here instead of
  // from a toggle rendered inside graph-renderer itself — see the
  // comment on this control in visualization-section.html for why.
  private readonly graphLayoutService = inject(GraphLayoutService);

  protected readonly graphLayoutOptions: GraphLayoutOption[] = GRAPH_LAYOUT_OPTIONS;

  // GRAPH_LAYOUT_OPTIONS' own `label` field is plain hardcoded English
  // from the renderer library (graph-layout.service.ts has no language
  // awareness) — resolved here by `value` instead of used directly, so
  // this toggle follows the UI language without editing the library.
  private readonly GRAPH_LAYOUT_LABEL_KEYS: Record<string, string> = {
    circle: 'practice.graphLayout.circle',
    concentric: 'practice.graphLayout.concentric',
    breadthfirst: 'practice.graphLayout.breadthfirst',
  };

  protected graphLayoutLabel(option: GraphLayoutOption): string {
    const key = this.GRAPH_LAYOUT_LABEL_KEYS[option.value];
    return key ? translate(key, this.languageService.currentLanguage()) : option.label;
  }

  protected selectedGraphLayoutIndex = 0;

  private readonly graphLayoutSubscription: Subscription = this.graphLayoutService.layout$.subscribe(
    (layout) => {
      this.selectedGraphLayoutIndex = this.graphLayoutOptions.findIndex(
        (option) => option.value === layout,
      );
    },
  );

  protected get graphLayoutThumbTransform(): string {
    // Matches .algo-visualization-section__graph-layout-thumb's
    // `width: calc((100% - 8px) / 3)` in visualization-section.scss
    // exactly (4px gap between segments — the same pattern
    // algo-segmented-button and graph-renderer's old internal toggle
    // both use), so the thumb lines up with whichever segment is
    // selected.
    const direction = document.documentElement.getAttribute('dir') === 'rtl' ? -1 : 1;
    return `translateX(calc(${direction * this.selectedGraphLayoutIndex} * (100% + 4px)))`;
  }

  protected onGraphLayoutSelect(index: number): void {
    const option = this.graphLayoutOptions[index];
    if (option) {
      this.graphLayoutService.setLayout(option.value);
    }
  }

  public ngOnDestroy(): void {
    this.graphLayoutSubscription.unsubscribe();
  }

  private readonly DATA_STRUCTURE_LEGENDS: Record<string, { key: string; colorToken: string }[]> = {
    dijkstra: [
      { key: 'practice.legend.dataStructure.sorting', colorToken: 'viz-comparing' },
      { key: 'practice.legend.dataStructure.removing', colorToken: 'viz-swapping' },
      { key: 'practice.legend.dataStructure.new', colorToken: 'viz-active' },
      { key: 'practice.legend.dataStructure.updated', colorToken: 'viz-updated' },
    ],

    'a-star': [
      { key: 'practice.legend.dataStructure.sorting', colorToken: 'viz-comparing' },
      { key: 'practice.legend.dataStructure.removing', colorToken: 'viz-swapping' },
      { key: 'practice.legend.dataStructure.new', colorToken: 'viz-active' },
      { key: 'practice.legend.dataStructure.updated', colorToken: 'viz-updated' },
    ],

    bfs: [
      { key: 'practice.legend.dataStructure.sorting', colorToken: 'viz-comparing' },
      { key: 'practice.legend.dataStructure.removing', colorToken: 'viz-swapping' },
      { key: 'practice.legend.dataStructure.new', colorToken: 'viz-active' },
    ],

    dfs: [
      { key: 'practice.legend.dataStructure.removing', colorToken: 'viz-swapping' },
      { key: 'practice.legend.dataStructure.new', colorToken: 'viz-active' },
    ],
  };

  protected get dataStructureLegendItems(): LegendItem[] {
    const language = this.languageService.currentLanguage();
    const keys = this.DATA_STRUCTURE_LEGENDS[this.algorithmId] ?? [];
    return keys.map(({ key, colorToken }) => ({ label: translate(key, language), colorToken }));
  }
}