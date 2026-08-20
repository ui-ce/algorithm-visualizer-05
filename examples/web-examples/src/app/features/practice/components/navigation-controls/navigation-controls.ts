import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlgoButton } from '../../../../design-system/button/button';
import { AlgoPlayPauseButton } from '../../../../design-system/play-pause-button/play-pause-button';
// Icon names below follow Solar's naming convention but haven't been
// checked against the installed package's export list.
import { SolarSkipPreviousLinear, SolarSkipNextLinear, SolarRestartLinear } from '@solar-icons/angular';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';

@Component({
  selector: 'algo-navigation-controls',
  imports: [AlgoButton, AlgoPlayPauseButton, SolarSkipPreviousLinear, SolarSkipNextLinear, SolarRestartLinear, TranslatePipe],
  templateUrl: './navigation-controls.html',
  styleUrl: './navigation-controls.scss',
})
export class NavigationControls {
  @Input()
  public isPlaying = false;

  @Output()
  public readonly previous = new EventEmitter<void>();

  @Output()
  public readonly playToggle = new EventEmitter<void>();

  @Output()
  public readonly next = new EventEmitter<void>();

  @Output()
  public readonly again = new EventEmitter<void>();
}
