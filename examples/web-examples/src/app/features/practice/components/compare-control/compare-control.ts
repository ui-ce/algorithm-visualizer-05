import { Component, EventEmitter, Output } from '@angular/core';
import { AlgoButton } from '../../../../design-system/button/button';
import { SolarArrowRightUpLinear } from '@solar-icons/angular';

@Component({
  selector: 'algo-compare-control',
  imports: [AlgoButton, SolarArrowRightUpLinear],
  templateUrl: './compare-control.html',
  styleUrl: './compare-control.scss',
})
export class CompareControl {
  @Output()
  public readonly compareClick = new EventEmitter<void>();
}
