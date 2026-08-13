import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AlgoSelectiveButton } from '../../../../design-system/selective-button/selective-button';
import { SolarRestartLinear } from '@solar-icons/angular';

import type { DataPattern } from './data-pattern-controls.types';

@Component({
  selector: 'algo-data-pattern-controls',
  imports: [AlgoSelectiveButton, SolarRestartLinear],
  templateUrl: './data-pattern-controls.html',
  styleUrl: './data-pattern-controls.scss',
})
export class DataPatternControls {
  @Input()
  public selectedPattern: DataPattern | null = null;

  @Input()
  public compact = false;

  @Output()
  public readonly selectedPatternChange = new EventEmitter<DataPattern | null>();

  // "No Pattern" (id: null) is listed first and is the default — it's a
  // real, selectable option here, not just the absence of a choice, so
  // it needs its own entry rather than being implied.
  protected readonly patterns: { id: DataPattern | null; label: string }[] = [
    { id: null, label: 'No Pattern' },
    { id: 'sorted', label: 'Sorted' },
    { id: 'nearly-sorted', label: 'Nearly Sorted' },
    { id: 'reversed', label: 'Reversed' },
    { id: 'many-duplicates', label: 'Many Duplicates' },
  ];

  protected get compactLabel(): string {
    return this.patterns.find((pattern) => pattern.id === this.selectedPattern)?.label ?? 'No Pattern';
  }

  protected cyclePattern(): void {
    const currentIndex = this.patterns.findIndex((pattern) => pattern.id === this.selectedPattern);
    const nextIndex = (currentIndex + 1) % this.patterns.length;
    this.selectedPatternChange.emit(this.patterns[nextIndex].id);
  }
}
