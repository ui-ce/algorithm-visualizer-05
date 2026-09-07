import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { Animation, RendererMetadata } from '@algorithm-visualizer/typescript-angular-renderer';
import { QuestionTypeBadge } from '../question-type-badge/question-type-badge';
import { OptionItem } from '../option-item/option-item';
import { VisualizationArea } from '../../../practice/components/visualization-area/visualization-area';
import { PseudocodePanel } from '../../../practice/components/pseudocode-panel/pseudocode-panel';
import { VisualizationLegend } from '../../../practice/components/visualization-legend/visualization-legend';
import type { LegendItem } from '../../../practice/components/visualization-legend/visualization-legend.types';
import type { OptionVisualState } from '../option-item/option-item.types';
import type { TestQuestion } from '../../test.types';
import { LanguageService } from '../../../../core/services/language.service';
import { translate } from '../../../../core/i18n/translations';
import { toLocaleDigitsForLanguage } from '../../../../core/i18n/locale-digits.pipe';

// Same four states Practice shows next to its own array-based
// (sort/search) visualization — see practice.ts's legendItems. Labels
// are translation keys (matching Practice's own legend keys), not raw
// English strings.
const ARRAY_LEGEND_ITEM_KEYS = [
  { key: 'practice.legend.default', colorToken: 'viz-default' },
  { key: 'practice.legend.active', colorToken: 'viz-active' },
  { key: 'practice.legend.comparing', colorToken: 'viz-comparing' },
  { key: 'practice.legend.swapping', colorToken: 'viz-swapping' },
  { key: 'practice.legend.sorted', colorToken: 'viz-sorted' },
];

// Graph algorithms (DFS/Dijkstra) never emit 'swap' or 'sorted' tags —
// they emit 'open'/'current'/'closed'/'visit' on nodes instead (see
// GRAPH_METADATA_ENTRY in test.ts). Showing the array legend on a graph
// question described colors that could never actually appear on
// screen; this mirrors practice.ts's own graph-branch of legendItems.
const GRAPH_LEGEND_ITEM_KEYS = [
  { key: 'practice.legend.default', colorToken: 'viz-default' },
  { key: 'practice.legend.graph.frontier', colorToken: 'viz-active' },
  { key: 'practice.legend.graph.current', colorToken: 'viz-comparing' },
  { key: 'practice.legend.graph.visited', colorToken: 'viz-explored' },
  { key: 'practice.legend.graph.finalPath', colorToken: 'viz-sorted' },
];

// Graph algorithms additionally show a side panel (DFS's Stack,
// Dijkstra's Open/Closed Set + Node Costs) next to the main graph —
// same split Practice uses via VisualizationSection's includeTypes /
// dataStructureTypes (see practice.html). Always passing both types
// here is harmless for DFS, which never emits a 'Chart' frame state —
// VisualizationArea's filter just yields nothing for that type.
const GRAPH_SIDE_PANEL_TYPES = ['Array2D', 'Chart'];

// Same per-algorithm legend Practice shows under its own data-structure
// panel (visualization-section.ts's DATA_STRUCTURE_LEGENDS) — was
// missing here entirely, so the side panel's own colors (Sorting/
// Removing/New/Updated) had no key at all on the Test page even though
// Practice shows one for the exact same panel. Kept as a literal copy
// rather than importing Practice's version, matching every other
// metadata table in this file (CHART_METADATA_ENTRY etc. in test.ts)
// that duplicates Practice's constants instead of creating a
// cross-feature dependency for a handful of static objects.
const DATA_STRUCTURE_LEGEND_KEYS: Record<string, { key: string; colorToken: string }[]> = {
  dijkstra: [
    { key: 'practice.legend.dataStructure.sorting', colorToken: 'viz-comparing' },
    { key: 'practice.legend.dataStructure.removing', colorToken: 'viz-swapping' },
    { key: 'practice.legend.dataStructure.new', colorToken: 'viz-active' },
    { key: 'practice.legend.dataStructure.updated', colorToken: 'viz-updated' },
  ],
  dfs: [
    { key: 'practice.legend.dataStructure.removing', colorToken: 'viz-swapping' },
    { key: 'practice.legend.dataStructure.new', colorToken: 'viz-active' },
  ],
};

// The question body (visualization / pseudocode) is handed in as
// `animation` + `rendererMetadata`, already produced by the page via
// FramerEngine().getAnimation(recording) — exactly the same call Practice
// makes — rather than this component touching the recorder/framer itself.
// Keeps QuestionCard a pure display component with no algorithm-specific
// logic inside it, so it works the same way for every algorithm later,
// not just Bubble Sort.
@Component({
  selector: 'algo-question-card',
  imports: [QuestionTypeBadge, OptionItem, VisualizationArea, PseudocodePanel, VisualizationLegend],
  templateUrl: './question-card.html',
  styleUrl: './question-card.scss',
})
export class QuestionCard {
  public constructor(private readonly _languageService: LanguageService) {}

  protected readonly graphSidePanelTypes = GRAPH_SIDE_PANEL_TYPES;

  // Needed only to look up DATA_STRUCTURE_LEGEND_KEYS above — the
  // legend differs by algorithm (Dijkstra's Node Costs chart adds a
  // 'Sorting'/'Updated' pair DFS's plain Stack never emits), the same
  // reason Practice's identical legend is keyed off algorithmId too.
  @Input()
  public algorithmId = '';

  @Input()
  public questionNumber = 1;

  @Input()
  public question!: TestQuestion;

  @Input()
  public animation: Animation | null = null; // set when question.type === 'execution'

  @Input()
  public rendererMetadata: RendererMetadata | null = null; // set when question.type === 'execution'

  @Input()
  public selectedOptionId: string | null = null;

  @Input()
  public isAnswered = false;

  @Output()
  public readonly optionSelect = new EventEmitter<string>();

  // Signals whether this execution question replays a graph algorithm
  // (DFS/Dijkstra) rather than an array sort/search — set on the
  // question's own visualization field (see test.types.ts), the same
  // signal test.ts uses to pick between buildExecutionRecording and
  // buildGraphExecutionRecording. Drives both which legend is shown
  // and whether the side data-structure panel renders.
  protected get isGraphQuestion(): boolean {
    return !!this.question?.visualization?.graph;
  }

  protected get legendItems(): LegendItem[] {
    const language = this._languageService.currentLanguage();
    const keys = this.isGraphQuestion ? GRAPH_LEGEND_ITEM_KEYS : ARRAY_LEGEND_ITEM_KEYS;
    return keys.map(({ key, colorToken }) => ({ label: translate(key, language), colorToken }));
  }

  // Legend for the side panel itself (DFS's Stack; Dijkstra's Open/
  // Closed Set + Node Costs bar chart) — a second, separate legend
  // from legendItems above, matching Practice's own
  // dataStructureLegendItems for the identical panel.
  protected get dataStructureLegendItems(): LegendItem[] {
    const language = this._languageService.currentLanguage();
    const keys = DATA_STRUCTURE_LEGEND_KEYS[this.algorithmId] ?? [];
    return keys.map(({ key, colorToken }) => ({ label: translate(key, language), colorToken }));
  }

  protected get questionNumberLabel(): string {
    const language = this._languageService.currentLanguage();
    return translate('test.question.number', language).replaceAll(
      '{number}',
      toLocaleDigitsForLanguage(this.questionNumber, language),
    );
  }

  protected onSelect(optionId: string): void {
    if (this.isAnswered) return;
    this.optionSelect.emit(optionId);
  }

  protected optionState(optionId: string): OptionVisualState {
    if (!this.isAnswered) return 'idle';
    if (optionId === this.question.correctOptionId) return 'correct';
    if (optionId === this.selectedOptionId) return 'incorrect-selected';
    return 'idle';
  }

  protected get blankFillText(): string | null {
    if (!this.isAnswered || !this.selectedOptionId) return null;
    return this.displayOptionText(this.question.options.find((o) => o.id === this.selectedOptionId));
  }

  // Content-translation getters — separate from the UI-chrome
  // translate() calls above (questionNumberLabel/legendItems), since
  // this text lives on the question DATA itself (test-question-bank),
  // not in a translations.ts dictionary. Falls back to the English
  // field whenever a question hasn't been translated yet — see
  // test.types.ts's TestOption.textFa doc comment for the convention,
  // and bubble-sort-easy-set1.data.ts for a fully-translated example
  // question to copy from.
  protected get displayPrompt(): string {
    const language = this._languageService.currentLanguage();
    return (language === 'fa' && this.question.promptFa) || this.question.prompt;
  }

  protected get displayExplanation(): string {
    const language = this._languageService.currentLanguage();
    return (language === 'fa' && this.question.explanationFa) || this.question.explanation;
  }

  protected displayOptionText(option: { text: string; textFa?: string } | undefined): string | null {
    if (!option) return null;
    const language = this._languageService.currentLanguage();
    return (language === 'fa' && option.textFa) || option.text;
  }

  // Display tag is purely positional (A, B, C, D by render order), not
  // derived from option.id — ids stay stable so correctOptionId matching
  // still works after shuffling, but the letters shown to the person
  // always read A→D top-to-bottom regardless of which option landed
  // where. Left as Latin A/B/C/D even in Persian on purpose — these are
  // option tags/identifiers, not reading content or numerals.
  protected optionTag(index: number): string {
    return String.fromCharCode(65 + index);
  }
}
