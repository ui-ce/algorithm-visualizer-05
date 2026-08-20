import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AlgoButton } from '../../../../design-system/button/button';
import { DataPatternControls } from '../data-pattern-controls/data-pattern-controls';
import type { PatternOption } from '../data-pattern-controls/data-pattern-controls.types';
import { DEFAULT_ARRAY_PATTERN_OPTIONS } from '../data-pattern-controls/data-pattern-controls.types';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';

@Component({
  selector: 'algo-input-controls',
  imports: [AlgoButton, DataPatternControls, TranslatePipe],
  templateUrl: './input-controls.html',
  styleUrl: './input-controls.scss',
})
export class InputControls {
  @Input()
  public isDrawerOpen = false;

  @Input()
  public selectedPattern: string | null = null;

  // Every algorithm — array or graph — has a meaningful pattern row
  // now (graph algorithms get Chain/Dense/Disconnected instead of
  // Nearly Sorted/Reversed/Many Duplicates — see patternOptions below),
  // so this stays true in practice; kept as an input rather than
  // removed outright in case a future algorithm genuinely has nothing
  // to pattern.
  @Input()
  public showPatternControls = true;

  // Which buttons DataPatternControls should render — defaults to the
  // array-sorting patterns (same shared default DataPatternControls
  // itself falls back to); the page component passes the graph
  // pattern set (see practice.ts's graphPatternOptions) for graph
  // algorithms.
  @Input()
  public patternOptions: PatternOption[] = DEFAULT_ARRAY_PATTERN_OPTIONS;

  @Output()
  public readonly customInputClick = new EventEmitter<void>();

  @Output()
  public readonly randomInputClick = new EventEmitter<void>();

  @Output()
  public readonly patternChange = new EventEmitter<string | null>();

  protected onPatternChange(pattern: string | null): void {
    this.patternChange.emit(pattern);
  }
}