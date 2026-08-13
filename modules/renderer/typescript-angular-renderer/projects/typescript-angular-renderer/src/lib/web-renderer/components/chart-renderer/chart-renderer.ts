import { Component, Input } from '@angular/core';
import { ChartState } from '../../models/framer/chart/chart-state.type';
import { ChartMetaData } from '../../models/renderer/chart/chart-metadata.type';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ChartHighlightLayer } from './chart-highlight-layer/chart-highlight-layer';

@Component({
  selector: 'chart-renderer',
  imports: [CommonModule, FormsModule, TableModule, ChartHighlightLayer],
  templateUrl: './chart-renderer.html',
  styleUrl: './chart-renderer.scss',
})
export class ChartRenderer {
  @Input()
  public state: ChartState;

  @Input()
  public metadata: ChartMetaData;

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
}
