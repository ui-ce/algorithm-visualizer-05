import { Component, Input } from '@angular/core';
import type { TestSummary } from '../../models/test.types';

interface StatBox {
  label: string;
  value: number;
  colorVar: string;
}

@Component({
  selector: 'algo-test-stats',
  imports: [],
  templateUrl: './test-stats.html',
  styleUrl: './test-stats.scss',
})
export class TestStats {
  @Input()
  public summary: TestSummary = { xp: 0, correct: 0, incorrect: 0, skipped: 0, streak: 0 };

  protected get boxes(): StatBox[] {
    return [
      { label: 'XP', value: this.summary.xp, colorVar: 'var(--color-test-summary-xp)' },
      { label: 'Correct', value: this.summary.correct, colorVar: 'var(--color-test-summary-correct)' },
      { label: 'Incorrect', value: this.summary.incorrect, colorVar: 'var(--color-test-summary-incorrect)' },
      { label: 'Skipped', value: this.summary.skipped, colorVar: 'var(--color-test-summary-skipped)' },
      { label: 'Streak', value: this.summary.streak, colorVar: 'var(--color-test-summary-streak)' },
    ];
  }
}
