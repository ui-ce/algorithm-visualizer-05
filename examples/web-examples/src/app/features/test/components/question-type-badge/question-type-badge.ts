import { Component, Input } from '@angular/core';
import type { QuestionType } from '../../models/test.types';

const LABELS: Record<QuestionType, string> = {
  conceptual: 'Conceptual',
  execution: 'Execution',
  code: 'Code',
};

@Component({
  selector: 'algo-question-type-badge',
  imports: [],
  templateUrl: './question-type-badge.html',
  styleUrl: './question-type-badge.scss',
})
export class QuestionTypeBadge {
  @Input()
  public type: QuestionType = 'conceptual';

  protected get label(): string {
    return LABELS[this.type];
  }

  // Only 'conceptual' has a real value (#A68FE8) — execution/code are
  // TODO placeholders in _colors.scss (--color-question-type-execution/
  // -code), see the comment there.
  protected get colorVar(): string {
    return `var(--color-question-type-${this.type})`;
  }
}
