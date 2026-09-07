import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

import type { PseudocodeLine } from './pseudocode-panel.types';

// Lines arrive pre-tokenized (plain / keyword / number) rather than as
// raw text this component parses itself. Keeping the highlighting rules
// in the data that describes each algorithm, instead of a parser living
// here, keeps this component's job limited to layout and coloring.
//
// The panel also keeps the currently active pseudocode line visible.
// Whenever activeLineNumber changes, the corresponding line is scrolled
// into the center of the visible pseudocode area.

@Component({
  selector: 'algo-pseudocode-panel',
  imports: [],
  templateUrl: './pseudocode-panel.html',
  styleUrl: './pseudocode-panel.scss',
})
export class PseudocodePanel implements AfterViewInit {
  @ViewChild('scrollArea')
  private scrollArea?: ElementRef<HTMLElement>;

  @Input()
  public lines: PseudocodeLine[] = [];

  private _activeLineNumber: number | null = null;

  @Input()
  public set activeLineNumber(value: number | null) {
    this._activeLineNumber = value;
    this.scheduleActiveLineScroll();
  }

  public get activeLineNumber(): number | null {
    return this._activeLineNumber;
  }

  // Test feature only: once the person picks an option for a Cloze-style
  // code question, the chosen option's text is passed in here and swapped
  // in for the blank token's placeholder. Left null on the Practice tab,
  // where no line ever contains a 'blank' token to begin with.
  @Input()
  public blankFillText: string | null = null;

  private viewInitialized = false;
  private scrollScheduled = false;

  public ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.scheduleActiveLineScroll();
  }

  protected indentGuides(level: number): unknown[] {
    return Array.from({ length: level });
  }

  /**
   * Schedules the active-line scroll after Angular has finished rendering
   * the new active line.
   *
   * requestAnimationFrame is intentional here: activeLineNumber changes
   * together with the visualization frame, so we wait until the browser
   * has the new DOM position before calculating the scroll position.
   */
  private scheduleActiveLineScroll(): void {
    if (!this.viewInitialized || this.scrollScheduled) {
      return;
    }

    this.scrollScheduled = true;

    requestAnimationFrame(() => {
      this.scrollScheduled = false;
      this.scrollActiveLineIntoView();
    });
  }

  /**
   * Keeps the currently highlighted pseudocode line visible and places it
   * approximately in the vertical center of the scrollable area.
   *
   * `block: 'center'` is used instead of 'nearest' intentionally:
   * the goal is not merely to prevent the active line from disappearing,
   * but to keep the execution focus visually centered while the algorithm
   * is running.
   */
  private scrollActiveLineIntoView(): void {
    const container = this.scrollArea?.nativeElement;

    if (!container || this._activeLineNumber === null) {
      return;
    }

    const activeLine = container.querySelector<HTMLElement>(
      `[data-line-number="${this._activeLineNumber}"]`,
    );

    if (!activeLine) {
      return;
    }

    activeLine.scrollIntoView({
      block: 'center',
      inline: 'nearest',
      behavior: 'auto',
    });
  }
}