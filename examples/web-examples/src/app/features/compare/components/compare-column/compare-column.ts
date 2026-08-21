import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { AlgorithmSelect } from '../algorithm-select/algorithm-select';
import { CompareVisualization } from '../compare-visualization/compare-visualization';
import { CompareInfoPanel } from '../compare-info-panel/compare-info-panel';
import type { CompareAlgorithmMeta } from '../../data/compare-catalog';
import type { CompareRun } from '../../utils/build-recording.util';
import type { AlgorithmContent } from '../../../practice/data/algorithm-content.types';
import type { CompareSide, ComplexityVerdicts } from '../../compare.types';

// One full column: the dropdown, the chart, and the two info boxes
// (Complexity / Key Differences) underneath it — everything inside the
// single large bordered container described in the spec. Algorithm-1's
// column (side="left") and Algorithm-2's column (side="right") render
// through this exact same component; only `side` (which flips the
// container's border color and the dropdown's variant) differs.
@Component({
  selector: 'algo-compare-column',
  imports: [TranslatePipe, AlgorithmSelect, CompareVisualization, CompareInfoPanel],
  templateUrl: './compare-column.html',
  styleUrl: './compare-column.scss',
})
export class CompareColumn {
  @Input()
  public side: CompareSide = 'left';

  @Input()
  public labelKey = '';

  @Input()
  public placeholderKey = '';

  @Input()
  public options: CompareAlgorithmMeta[] = [];

  @Input()
  public selectedId: string | null = null;

  @Input()
  public selectedNameKey: string | null = null;

  @Input()
  public content: AlgorithmContent | null = null;

  @Input()
  public run: CompareRun | null = null;

  @Input()
  public frameIndex = 0;

  @Input()
  public verdicts: ComplexityVerdicts | null = null;

  @Output()
  public readonly algorithmChange = new EventEmitter<string>();

  // Fixed order, always the same across every algorithm — the four
  // Complexity rows a person compares line-for-line between columns.
  protected readonly complexityRows: Array<{ key: keyof ComplexityVerdicts; labelKey: string }> = [
    { key: 'bestTime', labelKey: 'compare.complexity.bestTime' },
    { key: 'averageTime', labelKey: 'compare.complexity.averageTime' },
    { key: 'worstTime', labelKey: 'compare.complexity.worstTime' },
    { key: 'space', labelKey: 'compare.complexity.space' },
  ];

  // The five "Key Differences" translation keys for whichever algorithm
  // is currently selected in this column — empty until one is picked,
  // which the template renders as five "?" placeholder rows instead.
  protected get keyDifferenceKeys(): string[] {
    if (!this.selectedId) {
      return [];
    }
    return [0, 1, 2, 3, 4].map((index) => `compare.highlight.${this.selectedId}.${index}`);
  }

  protected complexityValue(metricKey: keyof ComplexityVerdicts): string {
    return this.content?.complexity[metricKey] ?? '?';
  }

  // 'better' → green, 'worse' → red/orange, null → default text color.
  // Only ever resolves to a color once both sides are selected and the
  // two values were rankable (see complexity-rank.util.ts) — otherwise
  // this always falls through to null and both sides look identical.
  protected verdictFor(metricKey: keyof ComplexityVerdicts): 'better' | 'worse' | null {
    const winningSide = this.verdicts?.[metricKey] ?? null;
    if (!winningSide) {
      return null;
    }
    return winningSide === this.side ? 'better' : 'worse';
  }
}
