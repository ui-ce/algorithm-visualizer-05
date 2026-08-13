import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationControls } from '../navigation-controls/navigation-controls';
import { InputControls } from '../input-controls/input-controls';
import { CompareControl } from '../compare-control/compare-control';
import type { DataPattern } from '../data-pattern-controls/data-pattern-controls.types';

// Composes the three Control rows and re-emits their events upward
// rather than holding any state itself — the actual playback/input
// state lives one level up, in the page component, since that's what
// coordinates the Visualization Section too.
@Component({
  selector: 'algo-control-section',
  imports: [NavigationControls, InputControls, CompareControl],
  templateUrl: './control-section.html',
  styleUrl: './control-section.scss',
})
export class ControlSection {
  @Input()
  public isPlaying = false;

  @Input()
  public isDrawerOpen = false;

  @Output()
  public readonly previous = new EventEmitter<void>();

  @Output()
  public readonly playToggle = new EventEmitter<void>();

  @Output()
  public readonly next = new EventEmitter<void>();

  @Output()
  public readonly again = new EventEmitter<void>();

  @Output()
  public readonly customInputClick = new EventEmitter<void>();

  @Output()
  public readonly randomInputClick = new EventEmitter<void>();

  @Output()
  public readonly patternChange = new EventEmitter<DataPattern | null>();

  @Output()
  public readonly compareClick = new EventEmitter<void>();

  @Input()
  public selectedPattern: DataPattern | null = null;
}
