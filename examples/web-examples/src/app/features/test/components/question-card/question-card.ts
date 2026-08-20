import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { Animation, RendererMetadata } from '@algorithm-visualizer/typescript-angular-renderer';
import { QuestionTypeBadge } from '../question-type-badge/question-type-badge';
import { OptionItem } from '../option-item/option-item';
import { VisualizationArea } from '../../../practice/components/visualization-area/visualization-area';
import { PseudocodePanel } from '../../../practice/components/pseudocode-panel/pseudocode-panel';
import { VisualizationLegend } from '../../../practice/components/visualization-legend/visualization-legend';
import type { LegendItem } from '../../../practice/components/visualization-legend/visualization-legend.types';
import type { OptionVisualState } from '../option-item/option-item.types';
import type { TestQuestion } from '../../models/test.types';

// Same four states Practice shows next to its own visualization — see
// practice.ts's legendItems. Without this, a person landing on an
// execution question here (no surrounding Practice page for context)
// had no way to know what "Comparing" vs "Swapping" colors meant, only
// what they look like.
const EXECUTION_LEGEND_ITEMS: LegendItem[] = [
  { label: 'Default', colorToken: 'viz-default' },
  { label: 'Active', colorToken: 'viz-active' },
  { label: 'Comparing', colorToken: 'viz-comparing' },
  { label: 'Swapping', colorToken: 'viz-swapping' },
  { label: 'Sorted', colorToken: 'viz-sorted' },
];

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
  protected readonly legendItems = EXECUTION_LEGEND_ITEMS;

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
    return this.question.options.find((o) => o.id === this.selectedOptionId)?.text ?? null;
  }

  // Display tag is purely positional (A, B, C, D by render order), not
  // derived from option.id — ids stay stable so correctOptionId matching
  // still works after shuffling, but the letters shown to the person
  // always read A→D top-to-bottom regardless of which option landed
  // where.
  protected optionTag(index: number): string {
    return String.fromCharCode(65 + index);
  }
}
