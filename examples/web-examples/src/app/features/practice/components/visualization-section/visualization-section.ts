import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { Animation, RendererMetadata } from '@algorithm-visualizer/typescript-angular-renderer';
import { AlgoSpeedButton } from '../../../../design-system/speed-button/speed-button';
import { AlgoButton } from '../../../../design-system/button/button';
import { VisualizationArea } from '../visualization-area/visualization-area';
import { VisualizationLegend } from '../visualization-legend/visualization-legend';
import type { LegendItem } from '../visualization-legend/visualization-legend.types';
// Same unverified-name caveat as the other Solar icons in this project.
import { SolarFullScreenLinear } from '@solar-icons/angular';

@Component({
  selector: 'algo-visualization-section',
  imports: [AlgoSpeedButton, VisualizationArea, VisualizationLegend, SolarFullScreenLinear],
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

  @Output()
  public readonly fullscreenToggle = new EventEmitter<void>();

  @Input()
  public showHint = false;

  @Output()
  public readonly hintPlayClick = new EventEmitter<void>();

  @Output()
  public readonly hintGenerateClick = new EventEmitter<void>();
}
