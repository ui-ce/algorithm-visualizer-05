import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuestionStatusItem } from '../question-status-item/question-status-item';
import type { QuestionSidebarState, TestDifficulty } from '../../models/test.types';

export interface QuestionSidebarEntry {
  questionNumber: number;
  state: QuestionSidebarState;
}

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
  @Input()
  public setNumber = 1;

  @Input()
  public difficulty: TestDifficulty = 'easy';

  @Input()
  public entries: QuestionSidebarEntry[] = [];

  @Output()
  public readonly questionSelect = new EventEmitter<number>();

  protected get difficultyLabel(): string {
    return this.difficulty.charAt(0).toUpperCase() + this.difficulty.slice(1);
  }

  protected get difficultyColorVar(): string {
    return `var(--color-quiz-${this.difficulty})`;
  }

  protected onSelect(questionNumber: number): void {
    this.questionSelect.emit(questionNumber);
  }
}
