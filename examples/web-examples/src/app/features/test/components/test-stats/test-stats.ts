import { Component, Input } from '@angular/core';
import { LanguageService } from '../../../../core/services/language.service';
import { translate } from '../../../../core/i18n/translations';
import { toLocaleDigitsForLanguage } from '../../../../core/i18n/locale-digits.pipe';
import type { TestSummary } from '../../test.types';

interface StatBox {
  key: string;
  label: string;
  value: string;
  colorVar: string;
}

@Component({
  selector: 'algo-test-stats',
  imports: [],
  templateUrl: './test-stats.html',
  styleUrl: './test-stats.scss',
})
export class TestStats {
  public constructor(private readonly _languageService: LanguageService) {}

  @Input()
  public summary: TestSummary = { xp: 0, correct: 0, incorrect: 0, skipped: 0, streak: 0 };

  protected get boxes(): StatBox[] {
    const language = this._languageService.currentLanguage();
    const t = (key: string) => translate(key, language);
    const n = (value: number) => toLocaleDigitsForLanguage(value, language);
    return [
      { key: 'xp', label: t('test.stats.xp'), value: n(this.summary.xp), colorVar: 'var(--color-test-summary-xp)' },
      {
        key: 'correct',
        label: t('test.stats.correct'),
        value: n(this.summary.correct),
        colorVar: 'var(--color-test-summary-correct)',
      },
      {
        key: 'incorrect',
        label: t('test.stats.incorrect'),
        value: n(this.summary.incorrect),
        colorVar: 'var(--color-test-summary-incorrect)',
      },
      {
        key: 'skipped',
        label: t('test.stats.skipped'),
        value: n(this.summary.skipped),
        colorVar: 'var(--color-test-summary-skipped)',
      },
      {
        key: 'streak',
        label: t('test.stats.streak'),
        value: n(this.summary.streak),
        colorVar: 'var(--color-test-summary-streak)',
      },
    ];
  }
}
