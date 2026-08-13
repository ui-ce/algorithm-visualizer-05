import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AlgoButton } from '../../../../design-system/button/button';
import { DataPatternControls } from '../data-pattern-controls/data-pattern-controls';
import type { DataPattern } from '../data-pattern-controls/data-pattern-controls.types';

@Component({
  selector: 'algo-input-controls',
  imports: [AlgoButton, DataPatternControls],
  templateUrl: './input-controls.html',
  styleUrl: './input-controls.scss',
})
export class InputControls {
  @Input()
  public isDrawerOpen = false;

  @Input()
  public selectedPattern: DataPattern | null = null;

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