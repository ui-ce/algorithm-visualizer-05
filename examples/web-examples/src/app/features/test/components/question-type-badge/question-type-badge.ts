import { Component, Input } from '@angular/core';
import { LanguageService } from '../../../../core/services/language.service';
import { translate } from '../../../../core/i18n/translations';
import type { QuestionType } from '../../test.types';

const LABEL_KEY: Record<QuestionType, string> = {
  conceptual: 'test.type.conceptual',
  execution: 'test.type.execution',
  code: 'test.type.code',
};

@Component({
  selector: 'algo-question-type-badge',
  imports: [],
  templateUrl: './question-type-badge.html',
  styleUrl: './question-type-badge.scss',
})
export class QuestionTypeBadge {
  public constructor(private readonly _languageService: LanguageService) {}

  @Input()
  public type: QuestionType = 'conceptual';

  protected get label(): string {
    return translate(LABEL_KEY[this.type], this._languageService.currentLanguage());
  }

  // Only 'conceptual' has a real value (#A68FE8) — execution/code are
  // TODO placeholders in _colors.scss (--color-question-type-execution/
  // -code), see the comment there.
  protected get colorVar(): string {
    return `var(--color-question-type-${this.type})`;
  }
}
