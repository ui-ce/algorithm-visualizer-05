import { Component, Input } from '@angular/core';
import type { LegendItem } from './visualization-legend.types';

// Which states appear varies by algorithm (a sort has Comparing/Swapping,
// a search doesn't) — the parent passes the relevant set in rather than
// this component assuming a fixed list.
@Component({
  selector: 'algo-visualization-legend',
  imports: [],
  templateUrl: './visualization-legend.html',
  styleUrl: './visualization-legend.scss',
})
export class VisualizationLegend {
  @Input()
  public items: LegendItem[] = [];
}
