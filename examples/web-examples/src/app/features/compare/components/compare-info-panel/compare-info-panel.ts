import { Component, Input } from '@angular/core';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';

// The two boxes below the visualization in each Compare column
// (Complexity, Key Differences) share one identical shell — radius 12,
// surface-container background, default border, 20px inline / 12px
// block padding, fill width + hug height — so that shell lives here
// once instead of being copy-pasted per box.
@Component({
  selector: 'algo-compare-info-panel',
  imports: [TranslatePipe],
  templateUrl: './compare-info-panel.html',
  styleUrl: './compare-info-panel.scss',
})
export class CompareInfoPanel {
  @Input()
  public titleKey = '';
}
