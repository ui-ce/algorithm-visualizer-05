import { Component, Input } from '@angular/core';
import { LanguageService } from '../../../../core/services/language.service';
import { translate } from '../../../../core/i18n/translations';
import { toLocaleDigitsForLanguage } from '../../../../core/i18n/locale-digits.pipe';

@Component({
  selector: 'algo-test-progress',
  imports: [],
  templateUrl: './test-progress.html',
  styleUrl: './test-progress.scss',
})
export class TestProgress {
  public constructor(private readonly _languageService: LanguageService) {}

  @Input()
  public current = 1;

  @Input()
  public total = 1;

  protected get percent(): number {
    if (this.total <= 0) return 0;
    return Math.min(100, Math.round((this.current / this.total) * 100));
  }

  protected get title(): string {
    return translate('test.progress.title', this._languageService.currentLanguage());
  }

  protected get countText(): string {
    const language = this._languageService.currentLanguage();
    return `${toLocaleDigitsForLanguage(this.current, language)}/${toLocaleDigitsForLanguage(this.total, language)}`;
  }
}
