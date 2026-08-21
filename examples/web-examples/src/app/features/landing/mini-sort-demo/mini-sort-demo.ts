import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { AlgoPlayPauseButton } from '../../../design-system/play-pause-button/play-pause-button';
import { AlgoButton } from '../../../design-system/button/button';
import { SolarRestartLinear, SolarSkipPreviousLinear, SolarSkipNextLinear } from '@solar-icons/angular';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';

type BarState = 'default' | 'comparing' | 'swapping' | 'sorted';

interface Bar {
  readonly value: number;
  readonly color: string;
  state: BarState;
}

// One entry per comparison the real bubble-sort pass would make.
// `swap` tells the player whether the two values traded places at that
// step; `sortedIndex` (only set on the last comparison of a pass) tells
// the player which index is now permanently in its final place, so the
// bar can flip to the "sorted" color early instead of waiting for the
// whole array to finish.
interface Step {
  readonly i: number;
  readonly j: number;
  readonly swap: boolean;
  readonly sortedIndex?: number;
}

// Fixed, hand-picked values (not random) so every visitor sees the same
// — deliberately unsorted — demo, and so the animation is reproducible
// while testing. Ten bars: wide enough to feel like a real dataset.
const INITIAL_VALUES: readonly number[] = [62, 28, 95, 47, 73, 15, 88, 34, 56, 8];

// Each bar keeps its own color as it moves through swaps (the color
// travels with the value, like a real element being tracked through the
// sort), cycling through this palette by starting index. Deliberately
// avoids orange/red/green — those are reserved for the
// comparing/swapping/sorted highlight states below, so a bar's "resting"
// color never gets confused with what the algorithm is doing to it.
const BAR_PALETTE: readonly string[] = ['#6A45D8', '#886AE0', '#A68FE8', '#3B82F6', '#638CE2', '#F1C21B'];

const STEP_DURATION_MS = 700;
const AUTOPLAY_DELAY_MS = 500;
const MAX_TILT_DEG = 8;

function buildSteps(values: readonly number[]): Step[] {
  const arr = [...values];
  const steps: Step[] = [];
  const n = arr.length;

  for (let pass = 0; pass < n - 1; pass++) {
    const passEnd = n - 1 - pass;
    for (let j = 0; j < passEnd; j++) {
      const swap = arr[j] > arr[j + 1];
      const isLastOfPass = j === passEnd - 1;
      steps.push({ i: j, j: j + 1, swap, sortedIndex: isLastOfPass ? passEnd : undefined });
      if (swap) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return steps;
}

@Component({
  selector: 'algo-mini-sort-demo',
  imports: [AlgoPlayPauseButton, AlgoButton, SolarRestartLinear, SolarSkipPreviousLinear, SolarSkipNextLinear, TranslatePipe],
  templateUrl: './mini-sort-demo.html',
  styleUrl: './mini-sort-demo.scss',
})
export class MiniSortDemo implements OnInit, OnDestroy {
  protected readonly bars = signal<Bar[]>(MiniSortDemo._freshBars());
  protected readonly isPlaying = signal(false);
  protected readonly isSorted = signal(false);

  // Subtle "tilt toward the cursor" effect on the card, driven by
  // pointermove — computed in TS rather than CSS since the rotation
  // depends on where inside the card the pointer currently is.
  protected readonly tiltX = signal(0);
  protected readonly tiltY = signal(0);

  private readonly _steps = buildSteps(INITIAL_VALUES);
  // Pointer into _steps: the number of steps already applied to the
  // currently-rendered `bars`. Both autoplay and the manual Next/Prev
  // buttons move this pointer — autoplay just moves it automatically on
  // an interval.
  private _stepIndex = 0;
  private _intervalId?: ReturnType<typeof setInterval>;
  private _autoplayTimeoutId?: ReturnType<typeof setTimeout>;

  private static _freshBars(): Bar[] {
    return INITIAL_VALUES.map((value, i) => ({
      value,
      color: BAR_PALETTE[i % BAR_PALETTE.length],
      state: 'default' as BarState,
    }));
  }

  public ngOnInit(): void {
    // Starts itself shortly after the hero mounts, so a first-time
    // visitor sees the product actually working before they've touched
    // anything — the whole point of leading with this demo.
    this._autoplayTimeoutId = setTimeout(() => this.play(), AUTOPLAY_DELAY_MS);
  }

  protected togglePlay(): void {
    if (this.isSorted()) {
      this.reset();
    }
    this.isPlaying() ? this.pause() : this.play();
  }

  protected play(): void {
    if (this.isPlaying() || this.isSorted()) {
      return;
    }
    this.isPlaying.set(true);
    this._intervalId = setInterval(() => this._advance(), STEP_DURATION_MS);
  }

  protected pause(): void {
    this.isPlaying.set(false);
    if (this._intervalId !== undefined) {
      clearInterval(this._intervalId);
      this._intervalId = undefined;
    }
  }

  protected reset(): void {
    this.pause();
    this._stepIndex = 0;
    this.isSorted.set(false);
    this.bars.set(MiniSortDemo._freshBars());
  }

  // Manual "Next" — pauses autoplay (stepping through by hand and
  // having the timer also fire at the same time would race) and applies
  // exactly one comparison.
  protected next(): void {
    this.pause();
    this._advance();
  }

  // Manual "Previous" — swaps aren't trivially reversible in place (the
  // two bars' full state, including which one is which, changes), so
  // rather than track an undo stack this just replays the deterministic
  // step list from the start up to one step earlier. Ten elements means
  // at most ~45 steps, so replaying is effectively free.
  protected previous(): void {
    this.pause();
    if (this._stepIndex === 0) {
      return;
    }
    this._stepIndex--;
    this._renderAtStep(this._stepIndex);
    this.isSorted.set(false);
  }

  protected onPointerMove(event: PointerEvent, card: HTMLElement): void {
    const rect = card.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width; // 0..1
    const relativeY = (event.clientY - rect.top) / rect.height; // 0..1
    this.tiltY.set((relativeX - 0.5) * MAX_TILT_DEG * 2);
    this.tiltX.set(-(relativeY - 0.5) * MAX_TILT_DEG * 2);
  }

  protected onPointerLeave(): void {
    this.tiltX.set(0);
    this.tiltY.set(0);
  }

  protected get tiltTransform(): string {
    return `perspective(900px) rotateX(${this.tiltX()}deg) rotateY(${this.tiltY()}deg)`;
  }

  // Autoplay tick: applies the next step, or finishes if none are left.
  private _advance(): void {
    if (this._stepIndex >= this._steps.length) {
      this.pause();
      this.isSorted.set(true);
      this.bars.update((bars) => bars.map((bar) => ({ ...bar, state: 'sorted' })));
      return;
    }

    this._applyStep(this._steps[this._stepIndex]);
    this._stepIndex++;

    if (this._stepIndex >= this._steps.length) {
      this.pause();
      this.isSorted.set(true);
      this.bars.update((bars) => bars.map((bar) => ({ ...bar, state: 'sorted' })));
    }
  }

  // Applies one comparison (and its swap, if any) to the currently
  // rendered bars in place — used by both autoplay and manual Next,
  // since both are simple forward steps from whatever's on screen.
  private _applyStep(step: Step): void {
    this.bars.update((current) => {
      const next = current.map((bar) => (bar.state === 'sorted' ? bar : { ...bar, state: 'default' as BarState }));

      if (step.swap) {
        const tmp = next[step.i];
        next[step.i] = { ...next[step.j], state: 'swapping' };
        next[step.j] = { ...tmp, state: 'swapping' };
      } else {
        next[step.i] = { ...next[step.i], state: 'comparing' };
        next[step.j] = { ...next[step.j], state: 'comparing' };
      }

      if (step.sortedIndex !== undefined) {
        next[step.sortedIndex] = { ...next[step.sortedIndex], state: 'sorted' };
      }

      return next;
    });
  }

  // Rebuilds `bars` from the original values by replaying steps
  // 0..targetIndex-1 (this is what makes "Previous" correct even though
  // swaps aren't undone in place) and then highlights whichever
  // comparison sits at targetIndex, matching what _applyStep would show
  // if played forward to that point.
  private _renderAtStep(targetIndex: number): void {
    const arr = INITIAL_VALUES.map((value, i) => ({ value, color: BAR_PALETTE[i % BAR_PALETTE.length] }));
    const sortedIndices = new Set<number>();

    for (let s = 0; s < targetIndex; s++) {
      const step = this._steps[s];
      if (step.swap) {
        const tmp = arr[step.i];
        arr[step.i] = arr[step.j];
        arr[step.j] = tmp;
      }
      if (step.sortedIndex !== undefined) {
        sortedIndices.add(step.sortedIndex);
      }
    }

    const states: BarState[] = arr.map((_, i) => (sortedIndices.has(i) ? 'sorted' : 'default'));

    if (targetIndex < this._steps.length) {
      const current = this._steps[targetIndex];
      if (!sortedIndices.has(current.i)) {
        states[current.i] = current.swap ? 'swapping' : 'comparing';
      }
      if (!sortedIndices.has(current.j)) {
        states[current.j] = current.swap ? 'swapping' : 'comparing';
      }
    }

    this.bars.set(arr.map((bar, i) => ({ value: bar.value, color: bar.color, state: states[i] })));
  }

  public ngOnDestroy(): void {
    if (this._intervalId !== undefined) {
      clearInterval(this._intervalId);
    }
    if (this._autoplayTimeoutId !== undefined) {
      clearTimeout(this._autoplayTimeoutId);
    }
  }
}
