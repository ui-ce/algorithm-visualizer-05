import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuestionStatusItem } from '../question-status-item/question-status-item';
import { LanguageService } from '../../../../core/services/language.service';
import { translate } from '../../../../core/i18n/translations';
import { toLocaleDigitsForLanguage } from '../../../../core/i18n/locale-digits.pipe';
import type { QuestionSidebarState, TestDifficulty } from '../../test.types';

export interface QuestionSidebarEntry {
  questionNumber: number;
  state: QuestionSidebarState;
}

const DIFFICULTY_LABEL_KEY: Record<TestDifficulty, string> = {
  easy: 'test.difficulty.easy',
  medium: 'test.difficulty.medium',
  hard: 'test.difficulty.hard',
};

// "Set 2 · Easy" title + the Question 1..N list. Difficulty word color
// comes from --color-quiz-easy / -medium / -hard (see _colors.scss TODO —
// medium/hard were mentioned as already existing from an earlier session
// but aren't in this export, so all three are placeholders for now).
@Component({
  selector: 'algo-question-sidebar',
  imports: [QuestionStatusItem],
  templateUrl: './question-sidebar.html',
  styleUrl: './question-sidebar.scss',
})
export class QuestionSidebar {
  public constructor(private readonly _languageService: LanguageService) {}

  @Input()
  public setNumber = 1;

  @Input()
  public difficulty: TestDifficulty = 'easy';

  @Input()
  public entries: QuestionSidebarEntry[] = [];

  @Output()
  public readonly questionSelect = new EventEmitter<number>();

  protected get difficultyLabel(): string {
    return translate(DIFFICULTY_LABEL_KEY[this.difficulty], this._languageService.currentLanguage());
  }

  protected get difficultyColorVar(): string {
    return `var(--color-quiz-${this.difficulty})`;
  }

  protected get setTitleText(): string {
    const language = this._languageService.currentLanguage();
    return translate('test.sidebar.setTitle', language).replaceAll(
      '{number}',
      toLocaleDigitsForLanguage(this.setNumber, language),
    );
  }

  protected questionLabel(questionNumber: number): string {
    const language = this._languageService.currentLanguage();
    return translate('test.sidebar.question', language).replaceAll(
      '{number}',
      toLocaleDigitsForLanguage(questionNumber, language),
    );
  }

  protected onSelect(questionNumber: number): void {
    this.questionSelect.emit(questionNumber);
  }
}
