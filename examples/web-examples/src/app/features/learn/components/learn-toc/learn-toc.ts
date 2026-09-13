import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlgoSelectiveButton } from '../../../../design-system/selective-button/selective-button';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import type { LearnTocEntry } from '../../learn.types';

// Word's own table-of-contents pattern, applied to Learn: a fixed list
// of headline labels (not sub-headings — see learn.ts's `tocEntries`
// getter for why it's exactly the three former drawer sections and
// nothing finer-grained) that jump-scroll the reader to that heading in
// the document column instead of switching which content is visible.
// Rows reuse AlgoSelectiveButton (the same component Practice's Data
// Pattern controls use) rather than one-off buttons, so selection state
// looks identical to every other "pick one of these" control in the app.
@Component({
  selector: 'algo-learn-toc',
  imports: [AlgoSelectiveButton, TranslatePipe],
  templateUrl: './learn-toc.html',
  styleUrl: './learn-toc.scss',
})
export class AlgoLearnToc {
  @Input()
  public entries: LearnTocEntry[] = [];

  @Input()
  public activeId: string | null = null;

  @Output()
  public readonly select = new EventEmitter<string>();

  protected onSelect(id: string): void {
    this.select.emit(id);
  }
}
