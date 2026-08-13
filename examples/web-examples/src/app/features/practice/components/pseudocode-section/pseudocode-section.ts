import { Component, Input } from '@angular/core';
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
}
