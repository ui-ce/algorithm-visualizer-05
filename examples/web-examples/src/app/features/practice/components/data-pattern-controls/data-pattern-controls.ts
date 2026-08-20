import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AlgoSelectiveButton } from '../../../../design-system/selective-button/selective-button';
import { SolarRestartLinear } from '@solar-icons/angular';
import { LanguageService } from '../../../../core/services/language.service';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { translate } from '../../../../core/i18n/translations';

import type { DataPattern } from './data-pattern-controls.types';

@Component({
  selector: 'algo-data-pattern-controls',
  imports: [AlgoSelectiveButton, SolarRestartLinear, TranslatePipe],
  templateUrl: './data-pattern-controls.html',
  styleUrl: './data-pattern-controls.scss',
})
export class DataPatternControls {
  @Input()
  public selectedPattern: DataPattern | null = null;

  @Input()
  public compact = false;

  @Output()
  public readonly selectedPatternChange = new EventEmitter<DataPattern | null>();

  public constructor(private readonly _languageService: LanguageService) {}

  // "No Pattern" (id: null) is listed first and is the default — it's a
  // real, selectable option here, not just the absence of a choice, so
  // it needs its own entry rather than being implied. labelKey resolves
  // through the translate pipe in the template; compactLabel (below)
  // needs the resolved string directly since it isn't rendered via a
  // template interpolation.
  protected readonly patterns: { id: DataPattern | null; labelKey: string }[] = [
    { id: null, labelKey: 'practice.pattern.none' },
    { id: 'nearly-sorted', labelKey: 'practice.pattern.nearlySorted' },
    { id: 'reversed', labelKey: 'practice.pattern.reversed' },
    { id: 'many-duplicates', labelKey: 'practice.pattern.manyDuplicates' },
  ];

  protected get compactLabel(): string {
    const labelKey =
      this.patterns.find((pattern) => pattern.id === this.selectedPattern)?.labelKey ?? 'practice.pattern.none';
    return translate(labelKey, this._languageService.currentLanguage());
  }

  protected cyclePattern(): void {
    const currentIndex = this.patterns.findIndex((pattern) => pattern.id === this.selectedPattern);
    const nextIndex = (currentIndex + 1) % this.patterns.length;
    this.selectedPatternChange.emit(this.patterns[nextIndex].id);
  }
}
