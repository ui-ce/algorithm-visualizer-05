import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlgoButton } from '../../../../design-system/button/button';
import { AlgoPlayPauseButton } from '../../../../design-system/play-pause-button/play-pause-button';
import { SolarRestartLinear } from '@solar-icons/angular';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';

// The middle column between the two algorithm columns. Deliberately
// only Play/Pause + Again — no Previous/Next/Speed like Practice's
// NavigationControls has, per spec — because one shared step counter
// drives both columns' charts at once (see compare.ts's currentStep);
// stepping one frame at a time independently doesn't apply here.
@Component({
  selector: 'algo-compare-run-controls',
  imports: [AlgoButton, AlgoPlayPauseButton, SolarRestartLinear, TranslatePipe],
  templateUrl: './compare-run-controls.html',
  styleUrl: './compare-run-controls.scss',
})
export class CompareRunControls {
  @Input()
  public isPlaying = false;

  // Both algorithms need to be selected before there's anything to
  // play — see compare.ts's `bothSelected`.
  @Input()
  public isEnabled = false;

  @Output()
  public readonly playToggle = new EventEmitter<void>();

  @Output()
  public readonly again = new EventEmitter<void>();
}
