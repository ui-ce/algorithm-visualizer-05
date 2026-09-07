import { Component, Input, inject } from '@angular/core';
import { SolarPauseLinear, SolarPlayLinear } from '@solar-icons/angular';
import type { PlayPauseType } from './play-pause-button.types';
import { LanguageService } from '../../core/services/language.service';
import { translate } from '../../core/i18n/translations';

@Component({
  selector: 'algo-play-pause-button',
  imports: [SolarPauseLinear, SolarPlayLinear],
  templateUrl: './play-pause-button.html',
  styleUrl: './play-pause-button.scss',
})
export class AlgoPlayPauseButton {
  private readonly _languageService = inject(LanguageService);

  // Text and icon are fixed by type rather than left open to the
  // consumer, matching the spec: unlike the other buttons, this one
  // doesn't take a custom label or a projected icon.
  @Input()
  public type: PlayPauseType = 'play';

  // Was a hardcoded 'Play'/'Pause' string, so this button never
  // followed the language toggle. Routed through the same translate()
  // helper the TranslatePipe uses, keyed off LanguageService directly
  // (rather than the pipe) since the label also needs to react to
  // `type` changing, not just the language.
  protected get label(): string {
    const key = this.type === 'play' ? 'practice.viz.play' : 'practice.viz.pause';
    return translate(key, this._languageService.currentLanguage());
  }
}
