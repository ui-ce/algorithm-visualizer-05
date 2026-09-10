import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { ChartState } from '../../models/framer/chart/chart-state.type';
import { ChartMetaData } from '../../models/renderer/chart/chart-metadata.type';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ChartHighlightLayer } from './chart-highlight-layer/chart-highlight-layer';
import { toLocaleDigits } from '../../utils/locale-digits.util';

interface PreviousBarSnapshot {
  value: number;
  label: string | null;
}

@Component({
  selector: 'chart-renderer',
  imports: [CommonModule, FormsModule, TableModule, ChartHighlightLayer],
  templateUrl: './chart-renderer.html',
  styleUrl: './chart-renderer.scss',
})
export class ChartRenderer implements OnChanges, AfterViewChecked {
  @Input()
  public state: ChartState;

  @Input()
  public metadata: ChartMetaData;

  // DOM nodes are kept and reused per array index (see chart-renderer.html's
  // `#barContainer`, `track $index`) — the framer never reorders bars, it
  // only overwrites values in place (see chart-framer.ts's setCells). That
  // means a "swap" is, structurally, just two values trading places inside
  // the same two DOM nodes with no movement at all: nothing to animate.
  // To make it *read* as a physical swap, we detect the value trade between
  // frames here and play a FLIP animation: snap each affected bar back to
  // where it visually was an instant ago (no transition), force layout, then
  // clear that offset so the CSS transition on .bar-container animates it
  // into its real (already-correct) position.
  @ViewChildren('barContainer')
  private barContainers: QueryList<ElementRef<HTMLElement>>;

  private previousBars: PreviousBarSnapshot[] | null = null;
  private pendingSwapOffsets: Map<number, number> = new Map();

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes['state']) {
      return;
    }
    const newBars = this.state?.bars ?? [];
    this.pendingSwapOffsets = this.computeSwapOffsets(this.previousBars, newBars);
    this.previousBars = newBars.map((bar) => ({ value: bar.value, label: bar.label }));
  }

  public ngAfterViewChecked(): void {
    if (this.pendingSwapOffsets.size === 0) {
      return;
    }
    const offsets = this.pendingSwapOffsets;
    this.pendingSwapOffsets = new Map();
    this.playSwapAnimation(offsets);
  }

  private playSwapAnimation(offsetPerIndex: Map<number, number>): void {
    const elements = this.barContainers?.toArray() ?? [];

    // Step 1 (Invert): jump each moved bar back to its previous slot with
    // no transition, so nothing visibly changes yet.
    elements.forEach((elRef, index) => {
      const offset = offsetPerIndex.get(index);
      if (offset === undefined) {
        return;
      }
      const el = elRef.nativeElement;
      el.style.transition = 'none';
      el.style.transform = `translateX(${offset}px)`;
    });

    // Force layout so the browser commits the position set above before we
    // change it again on the next frame — without this the two style writes
    // get batched and there's nothing to animate between.
    const firstOffsetIndex = elements.findIndex((_, index) => offsetPerIndex.has(index));
    if (firstOffsetIndex !== -1) {
      void elements[firstOffsetIndex].nativeElement.offsetWidth;
    }

    // Step 2 (Play): clear the offset on the next frame so the CSS
    // transition (see chart-renderer.scss) animates the bar from its old
    // slot into the new one it's already rendered at.
    requestAnimationFrame(() => {
      elements.forEach((elRef, index) => {
        if (!offsetPerIndex.has(index)) {
          return;
        }
        const el = elRef.nativeElement;
        el.style.transition = '';
        el.style.transform = '';
      });
    });
  }

  // Only recognizes the shape this app's recorders actually produce: two
  // adjacent bars trading values within one frame, tagged 'swap'. Returns
  // how far (in px, along the always-LTR bar axis) each affected index
  // needs to start offset from its new position to visually undo the swap.
  private computeSwapOffsets(
    previous: PreviousBarSnapshot[] | null,
    current: ChartState['bars'],
  ): Map<number, number> {
    const offsets = new Map<number, number>();
    if (!previous || !current || previous.length !== current.length) {
      return offsets;
    }

    const step = this.getBarStepPx();
    for (let i = 0; i < current.length - 1; i++) {
      const a = current[i];
      const b = current[i + 1];
      const prevA = previous[i];
      const prevB = previous[i + 1];
      const tradedValues = !!prevA && !!prevB && a.value === prevB.value && b.value === prevA.value;
      const distinctValues = a.value !== b.value;
      const taggedSwap = !!a.highlightTags?.includes('swap') || !!b.highlightTags?.includes('swap');

      if (tradedValues && distinctValues && taggedSwap) {
        // Bar now at index i used to sit one step to the right (i + 1);
        // start it shifted right by `step` so it animates back left into i.
        offsets.set(i, step);
        // Bar now at index i + 1 used to sit one step to the left; start it
        // shifted left so it animates right into i + 1.
        offsets.set(i + 1, -step);
      }
    }
    return offsets;
  }

  private getBarStepPx(): number {
    const width = parseFloat(this.getBarWidth());
    const gap = parseFloat(this.getBarGap());
    return (Number.isFinite(width) ? width : 40) + (Number.isFinite(gap) ? gap : 10);
  }

  protected getBarColors(highlightTags: string[]): string[] {
    return highlightTags.map((tag) => {
      const highlight = this.metadata?.highlightTags?.find((h) => h.tag === tag);
      return highlight?.color ?? this.metadata?.defaultColor ?? 'white';
    });
  }

  protected getBarHeight(value: number): string {
    const max = Math.max(...this.state.bars.map((bar) => bar.value), 1);
    const percent = (value / max) * 100;
    return `max(2px, calc(${percent}% - 2rem))`;
  }

  protected getDefaultColor(): string {
    return this.metadata?.defaultColor ?? 'white';
  }

  protected getBarWidth(): string {
    return this.metadata?.barWidth ?? '40px';
  }

  protected getBarGap(): string {
    return this.metadata?.barGap ?? '10px';
  }

  protected getChartHeight(): string {
    return this.metadata?.chartHeight ?? '100%';
  }

  protected getShowLabel(): boolean {
    return this.metadata?.showLabel ?? true;
  }

  protected getShowValue(): boolean {
    return this.metadata?.showValue ?? true;
  }

  // Bar order/position stays left-to-right always (see chart-renderer.scss's
  // `direction: ltr` pin) — this only swaps how the digits themselves are
  // drawn (Persian numerals) when the page is in Persian.
  protected formatDigits(value: number | string): string {
    return toLocaleDigits(value);
  }
}