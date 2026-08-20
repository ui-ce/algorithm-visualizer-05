import { Component, HostBinding, Input } from '@angular/core';
import { PseudocodePanel } from '../pseudocode-panel/pseudocode-panel';
import { ExplanationPanel } from '../explanation-panel/explanation-panel';
import type { PseudocodeLine } from '../pseudocode-panel/pseudocode-panel.types';

@Component({
  selector: 'algo-pseudocode-section',
  imports: [PseudocodePanel, ExplanationPanel],
  templateUrl: './pseudocode-section.html',
  styleUrl: './pseudocode-section.scss',
})
export class PseudocodeSection {
  @Input()
  public lines: PseudocodeLine[] = [];

  @Input()
  public activeLineNumber: number | null = null;

  @Input()
  public explanationTitle = '';

  @Input()
  public explanationDescription = '';

  // 'row' (default) is the existing sorting-algorithm layout: fixed
  // 220px-tall strip, pseudocode and explanation side by side. 'column'
  // is the graph-algorithm layout: a fixed-width column that fills the
  // full row height, pseudocode on top (scrolls internally if it
  // overflows), explanation pinned below it.
  @Input()
  public orientation: 'row' | 'column' = 'row';

  // Unknown custom elements default to display:inline, which won't
  // reliably stretch to fill a flex parent's height — only needed for
  // 'column' mode; 'row' mode keeps its own fixed 220px height defined
  // on the inner .algo-pseudocode-section div instead.
  @HostBinding('style.display')
  protected get hostDisplay(): string | null {
    return this.orientation === 'column' ? 'block' : null;
  }

  @HostBinding('style.height')
  protected get hostHeight(): string | null {
    return this.orientation === 'column' ? '100%' : null;
  }
}
