import { Component, Input, inject } from '@angular/core';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'algo-explanation-panel',
  imports: [],
  templateUrl: './explanation-panel.html',
  styleUrl: './explanation-panel.scss',
})
export class ExplanationPanel {
  private readonly _languageService = inject(LanguageService);

  @Input()
  public title = '';

  @Input()
  public description = '';

  // This panel shows the current step's Log message, which is now
  // language-aware for algorithms whose recorder accepts a language
  // arg (see algorithm/bubble-sort.ts and practice.ts's
  // buildArraySortRecording) — so, unlike the pseudocode panel next to
  // it (which is source code and must always stay English/LTR), this
  // one should follow the UI language instead of being pinned.
  protected get isRtl(): boolean {
    return this._languageService.currentLanguage() === 'fa';
  }
}
