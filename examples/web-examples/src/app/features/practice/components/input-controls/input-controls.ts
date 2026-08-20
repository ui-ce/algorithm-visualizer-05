import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AlgoButton } from '../../../../design-system/button/button';
import { DataPatternControls } from '../data-pattern-controls/data-pattern-controls';
import type { DataPattern } from '../data-pattern-controls/data-pattern-controls.types';
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
  public selectedPattern: DataPattern | null = null;

  // Graph algorithms (Dijkstra/DFS/BFS/A*) have no array to reshape, so
  // Best/Worst/Nearly-Sorted/Reversed-style buttons have nothing to do
  // for them — the page component passes false here for those so the
  // row doesn't sit on screen doing nothing when clicked.
  @Input()
  public showPatternControls = true;

  @Output()
  public readonly customInputClick = new EventEmitter<void>();

  @Output()
  public readonly randomInputClick = new EventEmitter<void>();

  @Output()
  public readonly patternChange = new EventEmitter<DataPattern>();


  protected onPatternChange(pattern: DataPattern): void {
    this.patternChange.emit(pattern);
  }
}