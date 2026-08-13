import { Component, Input } from '@angular/core';

@Component({
  selector: 'algo-explanation-panel',
  imports: [],
  templateUrl: './explanation-panel.html',
  styleUrl: './explanation-panel.scss',
})
export class ExplanationPanel {
  @Input()
  public title = '';

  @Input()
  public description = '';
}
