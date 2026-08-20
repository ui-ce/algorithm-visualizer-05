import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { Animation, RendererMetadata } from '@algorithm-visualizer/typescript-angular-renderer';
import { AlgoSpeedButton } from '../../../../design-system/speed-button/speed-button';
import { AlgoButton } from '../../../../design-system/button/button';
import { AlgoPlayPauseButton } from '../../../../design-system/play-pause-button/play-pause-button';
import { VisualizationArea } from '../visualization-area/visualization-area';
import { VisualizationLegend } from '../visualization-legend/visualization-legend';
import type { LegendItem } from '../visualization-legend/visualization-legend.types';
// Same unverified-name caveat as the other Solar icons in this project.
import { SolarFullScreenLinear } from '@solar-icons/angular';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';

@Component({
  selector: 'algo-visualization-section',
  imports: [AlgoSpeedButton, AlgoButton, AlgoPlayPauseButton, VisualizationArea, VisualizationLegend, SolarFullScreenLinear, TranslatePipe],
  templateUrl: './visualization-section.html',
  styleUrl: './visualization-section.scss',
})
export class VisualizationSection {
  @Input()
  public currentStep = 0;

  @Input()
  public totalSteps = 0;

  @Input()
  public speed = 1;

  @Output()
  public readonly speedChange = new EventEmitter<number>();

  @Input()
  public animation: Animation | null = null;

  @Input()
  public rendererMetadata: RendererMetadata | null = null;

  @Input()
  public frameIndex = 0;

  @Input()
  public legendItems: LegendItem[] = [];

  // Only set for Binary/Linear Search — see practice.ts's searchTarget
  // field. Rendered next to the step counter so it's visible the whole
  // time a search is playing, not just in a Log message that scrolls
  // past.
  @Input()
  public searchTarget: number | null = null;

  @Output()
  public readonly fullscreenToggle = new EventEmitter<void>();

  @Input()
  public showHint = false;

  @Output()
  public readonly hintPlayClick = new EventEmitter<void>();

  @Output()
  public readonly hintGenerateClick = new EventEmitter<void>();

  // Passed straight through to VisualizationArea — restricts which
  // object types render in this box. Used to keep the main graph box
  // showing only the Graph itself on DFS/Dijkstra pages (their Array2D
  // side panels render separately — see practice.html).
  @Input()
  public includeTypes: string[] | null = null;
}
