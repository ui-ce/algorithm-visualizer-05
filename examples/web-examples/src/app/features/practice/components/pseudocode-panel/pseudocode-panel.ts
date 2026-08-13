import { Component, Input } from '@angular/core';
import type { PseudocodeLine } from './pseudocode-panel.types';

// Lines arrive pre-tokenized (plain / keyword / number) rather than as
// raw text this component parses itself. Keeping the highlighting rules
// in the data that describes each algorithm's pseudocode, instead of a
// parser living here, keeps this component's job limited to layout and
// coloring — it never has to guess what counts as a keyword.
@Component({
  selector: 'algo-pseudocode-panel',
  imports: [],
  templateUrl: './pseudocode-panel.html',
  styleUrl: './pseudocode-panel.scss',
})
export class PseudocodePanel {
  @Input()
  public lines: PseudocodeLine[] = [];

  @Input()
  public activeLineNumber: number | null = null;

  protected indentGuides(level: number): unknown[] {
    return Array.from({ length: level });
  }
}
