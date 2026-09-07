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
  public fullWidth = false;

  // Practice and Test want the icon column and panel sitting inside a
  // visibly darker surface "field" (the default look). Learn doesn't —
  // its drawer should read as part of the page itself, not a boxed
  // control — so this strips the background/border from the outer
  // shell while leaving everything else (icon column, panel styling)
  // unchanged.
  @Input()
  public plain = false;

  @Input()
  public isOpen = false;

  @Input()
  public title = '';

  // Set by pages where the drawer is always showing something (never
  // fully closed) — e.g. the Learn page — so there's no dangling close
  // affordance for a state the page can't actually enter. Practice
  // keeps its real close button (hideCloseButton stays false there).
  @Input()
  public hideCloseButton = false;

  // Shown in the close button's spot when hideCloseButton is true —
  // e.g. "1 of 3" on the Learn page, so a person paging through
  // sections still has a sense of place even without a close action.
  @Input()
  public pageIndicator: string | null = null;

  @Output()
  public readonly closed = new EventEmitter<void>();
}