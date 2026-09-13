import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SolarArrowRightLinear, SolarLockKeyholeMinimalisticLinear, SolarStarBold } from '@solar-icons/angular';
import { SetRow } from '../set-row/set-row';
import { LanguageService } from '../../../../core/services/language.service';
import { translate } from '../../../../core/i18n/translations';
import { toLocaleDigitsForLanguage } from '../../../../core/i18n/locale-digits.pipe';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { TranslateVarPipe } from '../../../../core/i18n/translate-var.pipe';
import type { LevelCardData } from './level-card.types';
import type { TestDifficulty } from '../../test.types';

const FACE_IMAGE: Record<TestDifficulty, string> = {
  easy: '/quiz/quiz-easy-face.webp',
  medium: '/quiz/quiz-medium-face.webp',
  hard: '/quiz/quiz-hard-face.webp',
};

// Translation keys, not display strings — the actual word is resolved
// through translate() below so it follows the language toggle.
const LABEL_KEY: Record<TestDifficulty, string> = {
  easy: 'test.difficulty.easy',
  medium: 'test.difficulty.medium',
  hard: 'test.difficulty.hard',
};

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
  public constructor(private readonly _languageService: LanguageService) { }

  @Input()
  public data!: LevelCardData;

  // Real counts per set now live on data.sets[].questionCount (see
  // buildLevelPlan in test-question-bank.ts) instead of a single
  // difficulty-wide constant — this reads whatever's actually there, so
  // it stays correct if a DB-backed algorithm's sets end up different
  // sizes instead of assuming every set matches QUESTIONS_PER_SET.
  protected get questionsPerSet(): string {
    const counts = [...new Set(this.data.sets.map((set) => set.questionCount))];
    const language = this._languageService.currentLanguage();
    if (counts.length <= 1) {
      return toLocaleDigitsForLanguage(counts[0] ?? 0, language);
    }
    const min = Math.min(...counts);
    const max = Math.max(...counts);
    return `${toLocaleDigitsForLanguage(min, language)}–${toLocaleDigitsForLanguage(max, language)}`;
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
    return translate(LABEL_KEY[this.data.difficulty], this._languageService.currentLanguage());
  }

  protected get lockedCtaLabel(): string {
    return translate(
      'test.level.cta.locked',
      this._languageService.currentLanguage()
    );
  }

  protected get startCtaLabel(): string {
    const language = this._languageService.currentLanguage();

    return translate('test.level.cta.start', language)
      .replaceAll('{level}', this.label);
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

  protected get lockedText(): string {
    return translate('test.level.locked', this._languageService.currentLanguage());

  }
  protected get unlocksAfterLabel(): string {
    return this.data.unlocksAfter ? translate(LABEL_KEY[this.data.unlocksAfter], this._languageService.currentLanguage()) : '';
  }

  // Kept out of the template's `[attr.title]` string-concat so this
  // reads through the same translate()+substitution path as everything
  // else, instead of always being English regardless of language.
  protected get starWorthTitle(): string {
    const language = this._languageService.currentLanguage();
    return translate('test.level.starWorthTitle', language)
      .replaceAll('{level}', this.label)
      .replaceAll('{count}', toLocaleDigitsForLanguage(this.starWorth, language))
      .replaceAll('{plural}', this.starWorth > 1 ? 's' : '');
  }

  // {sets}/{questions} are raw numbers, not translated words — resolved
  // here (with digit localization) instead of via the translateVar pipe
  // in the template, since object-literal pipe chaining in an Angular
  // template expression is fragile to get right.
  protected get setsSubtitle(): string {
    const language = this._languageService.currentLanguage();
    return translate('test.level.setsSubtitle', language)
      .replaceAll('{sets}', toLocaleDigitsForLanguage(this.data.sets.length, language))
      .replaceAll('{questions}', this.questionsPerSet);
  }

  protected onStart(): void {
    if (this.isLocked) return;
    this.startLevel.emit();
  }
}