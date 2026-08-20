import { Component, EventEmitter, Output } from '@angular/core';
import { AlgoButton } from '../../../../design-system/button/button';
import { SolarArrowRightUpLinear } from '@solar-icons/angular';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';

@Component({
  selector: 'algo-compare-control',
  imports: [AlgoButton, SolarArrowRightUpLinear, TranslatePipe],
  templateUrl: './compare-control.html',
  styleUrl: './compare-control.scss',
})
export class CompareControl {
  @Output()
  public readonly compareClick = new EventEmitter<void>();
}
