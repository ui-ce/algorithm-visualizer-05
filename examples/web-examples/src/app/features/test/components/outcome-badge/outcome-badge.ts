import { Component, Input } from '@angular/core';
import { LanguageService } from '../../../../core/services/language.service';
import { toLocaleDigitsForLanguage } from '../../../../core/i18n/locale-digits.pipe';
import type { QuestionOutcome } from '../../test.types';

const COLOR_VAR: Record<QuestionOutcome, string> = {
  correct: 'var(--color-test-summary-correct)',
  incorrect: 'var(--color-test-summary-incorrect)',
  skipped: 'var(--color-test-summary-skipped)',
};

// Results page "Question Overview" row — same visual language as
// algo-set-row's number badge, but standalone since it has no click
// behavior and no trailing status icon, just the number colored by
// outcome.
@Component({
  selector: 'algo-outcome-badge',
  imports: [],
  templateUrl: './outcome-badge.html',
  styleUrl: './outcome-badge.scss',
})
export class OutcomeBadge {
  public constructor(private readonly _languageService: LanguageService) {}

  @Input()
  public questionNumber = 1;

  @Input()
  public outcome: QuestionOutcome = 'skipped';

  protected get colorVar(): string {
    return COLOR_VAR[this.outcome];
  }

  protected get displayNumber(): string {
    return toLocaleDigitsForLanguage(this.questionNumber, this._languageService.currentLanguage());
  }
}
