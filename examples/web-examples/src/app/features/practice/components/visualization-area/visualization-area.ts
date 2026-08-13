import { Component, Input } from '@angular/core';
import { WebRenderer } from '@algorithm-visualizer/typescript-angular-renderer';
import type { Animation } from '@algorithm-visualizer/typescript-angular-renderer';
import type { RendererMetadata } from '@algorithm-visualizer/typescript-angular-renderer';

// Thin wrapper around the existing renderer library rather than a new
// visualization implementation. hasPlayer is fixed to false because this
// page provides its own playback controls (Row 1 of the Control
// Section) — leaving the library's built-in player enabled would put
// two sets of play/pause/speed controls on screen at once.
@Component({
  selector: 'algo-visualization-area',
  imports: [WebRenderer],
  templateUrl: './visualization-area.html',
  styleUrl: './visualization-area.scss',
})
export class VisualizationArea {
  @Input()
  public animation: Animation | null = null;

  @Input()
  public rendererMetadata: RendererMetadata | null = null;

  @Input()
  public frameIndex = 0;

  // The recording includes a 'Log' frame per step (used to drive the
  // Explanation panel next to the pseudocode instead — see practice.ts),
  // so it's filtered out here to keep this area chart-only.
  protected get chartOnlyAnimation(): Animation | null {
    return this.animation?.map((frame) => frame.filter((frameState) => frameState.type !== 'Log')) ?? null;
  }
}
