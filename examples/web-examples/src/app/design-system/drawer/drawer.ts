import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

import { SolarArrowLeftLinear } from '@solar-icons/angular';
import { LanguageService } from '../../core/services/language.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

// This component only owns layout and open/close mechanics: the icon
// button column and the panel's content are both projected in by
// whatever page uses the Drawer, since those differ per page (which
// icons exist, what each panel shows) while the shell around them
// doesn't. Which section is currently active is the consumer's state to
// track — the Drawer just needs to know open or closed.
@Component({
  selector: 'algo-drawer',
  imports: [SolarArrowLeftLinear, TranslatePipe],
  templateUrl: './drawer.html',
  styleUrl: './drawer.scss',
})
export class AlgoDrawer {
  protected readonly languageService = inject(LanguageService);

  @Input()
  public isOpen = false;

  @Input()
  public title = '';

  @Output()
  public readonly closed = new EventEmitter<void>();
}
