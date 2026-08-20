import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SolarArrowRightLinear, SolarLockKeyholeMinimalisticLinear, SolarStarBold } from '@solar-icons/angular';
import { SetRow } from '../set-row/set-row';
import { QUESTIONS_PER_SET } from '../../data/test-question-bank';
import type { LevelCardData } from './level-card.types';
import type { TestDifficulty } from '../../models/test.types';

const FACE_IMAGE: Record<TestDifficulty, string> = {
  easy: '/quiz/quiz-easy-face.png',
  medium: '/quiz/quiz-medium-face.png',
  hard: '/quiz/quiz-hard-face.png',
};

const LABEL: Record<TestDifficulty, string> = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };

// How many of the 3 title-row stars a person has once THIS level is
// done — Easy alone is worth 1, finishing Medium (which needs Easy
// already done) brings the running total to 2, Hard to 3. Shown as a
// small star row next to each card's title so the payoff of finishing
// a level is visible without leaving this page.
const STAR_WORTH: Record<TestDifficulty, number> = { easy: 1, medium: 2, hard: 3 };

@Component({
  selector: 'algo-level-card',
  imports: [SetRow, SolarArrowRightLinear, SolarLockKeyholeMinimalisticLinear, SolarStarBold],
  templateUrl: './level-card.html',
  styleUrl: './level-card.scss',
})
export class LevelCard {
  @Input()
  public data!: LevelCardData;

  // No longer an @Input the caller has to remember to pass — that's
  // exactly how this ended up hardcoded to 5 for every difficulty. It's
  // now derived straight from the difficulty on `data`, so Easy/Medium/
  // Hard automatically show 5/7/10 without the parent template having
  // to know that mapping at all.
  protected get questionsPerSet(): number {
    return QUESTIONS_PER_SET[this.data.difficulty];
  }

  protected get starWorth(): number {
    return STAR_WORTH[this.data.difficulty];
  }

  // Array of that length purely so the template can @for over it —
  // there's no per-star data, just a repeat count.
  protected get starWorthSlots(): number[] {
    return Array.from({ length: this.starWorth }, (_, i) => i + 1);
  }

  @Output()
  public readonly startLevel = new EventEmitter<void>();

  @Output()
  public readonly setSelect = new EventEmitter<number>();

  protected get faceImage(): string {
    return FACE_IMAGE[this.data.difficulty];
  }

  protected get label(): string {
    return LABEL[this.data.difficulty];
  }

  protected get accentColorVar(): string {
    return `var(--color-quiz-${this.data.difficulty})`;
  }

  protected get badgeColorVar(): string {
    return `var(--color-quiz-${this.data.difficulty}-badge)`;
  }

  protected get isLocked(): boolean {
    return !!this.data.unlocksAfter;
  }

  protected get unlocksAfterLabel(): string {
    return this.data.unlocksAfter ? LABEL[this.data.unlocksAfter] : '';
  }

  protected onStart(): void {
    if (this.isLocked) return;
    this.startLevel.emit();
  }
}
