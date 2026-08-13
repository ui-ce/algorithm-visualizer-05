import { Component, Input } from '@angular/core';
import { SolarPauseLinear, SolarPlayLinear } from '@solar-icons/angular';
import type { PlayPauseType } from './play-pause-button.types';

@Component({
  selector: 'algo-play-pause-button',
  imports: [SolarPauseLinear, SolarPlayLinear],
  templateUrl: './play-pause-button.html',
  styleUrl: './play-pause-button.scss',
})
export class AlgoPlayPauseButton {
  // Text and icon are fixed by type rather than left open to the
  // consumer, matching the spec: unlike the other buttons, this one
  // doesn't take a custom label or a projected icon.
  @Input()
  public type: PlayPauseType = 'play';

  protected get label(): string {
    return this.type === 'play' ? 'Play' : 'Pause';
  }
}
