import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationControls } from '../navigation-controls/navigation-controls';
import { InputControls } from '../input-controls/input-controls';
import { CompareControl } from '../compare-control/compare-control';
import type { PatternOption } from '../data-pattern-controls/data-pattern-controls.types';
import { DEFAULT_ARRAY_PATTERN_OPTIONS } from '../data-pattern-controls/data-pattern-controls.types';

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

  // string | null (not DataPattern | null) so the exact same event
  // carries either an array pattern id or a graph pattern id — see
  // InputControls' identical comment.
  @Output()
  public readonly patternChange = new EventEmitter<string | null>();

  @Output()
  public readonly compareClick = new EventEmitter<void>();

  @Input()
  public selectedPattern: string | null = null;

  // Passed straight through to InputControls — see its own comment for
  // why this stays true for both array and graph algorithms now.
  @Input()
  public showPatternControls = true;

  // Passed straight through to InputControls — see its own comment.
  @Input()
  public patternOptions: PatternOption[] = DEFAULT_ARRAY_PATTERN_OPTIONS;
}
