import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AlgoSelectiveButton } from '../../../../design-system/selective-button/selective-button';
import { SolarRestartLinear } from '@solar-icons/angular';
import { LanguageService } from '../../../../core/services/language.service';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { translate } from '../../../../core/i18n/translations';

import type { PatternOption } from './data-pattern-controls.types';
import { DEFAULT_ARRAY_PATTERN_OPTIONS } from './data-pattern-controls.types';

@Component({
  selector: 'algo-data-pattern-controls',
  imports: [AlgoSelectiveButton, SolarRestartLinear, TranslatePipe],
  templateUrl: './data-pattern-controls.html',
  styleUrl: './data-pattern-controls.scss',
})
export class DataPatternControls {
  @Input()
  public selectedPattern: string | null = null;

  @Input()
  public compact = false;

  // Which buttons to render — defaults to the array-sorting patterns
  // (Nearly Sorted / Reversed / Many Duplicates), so every existing
  // usage of this component keeps working exactly as before. Graph
  // pages pass a different list (chain / dense / disconnected — see
  // practice.ts's graphPatternOptions) through this same input instead
  // of a second, separately-styled component being built for them:
  // same markup, same CSS classes, same design-system button
  // underneath, just a different button set — which is also why a
  // graph page's pattern row now looks identical to a sort page's.
  @Input()
  public options: PatternOption[] = DEFAULT_ARRAY_PATTERN_OPTIONS;

  @Output()
  public readonly selectedPatternChange = new EventEmitter<string | null>();

  public constructor(private readonly _languageService: LanguageService) {}

  protected get compactLabel(): string {
    const labelKey =
      this.options.find((pattern) => pattern.id === this.selectedPattern)?.labelKey ??
      this.options[0]?.labelKey ??
      'practice.pattern.none';
    return translate(labelKey, this._languageService.currentLanguage());
  }

  protected cyclePattern(): void {
    if (this.options.length === 0) {
      return;
    }
    const currentIndex = this.options.findIndex((pattern) => pattern.id === this.selectedPattern);
    const nextIndex = (currentIndex + 1) % this.options.length;
    this.selectedPatternChange.emit(this.options[nextIndex].id);
  }
}
