import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlgoButton } from '../../../design-system/button/button';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import type { AlgorithmCategory, LandingAlgorithm } from '../landing';

// One card in the algorithm picker (see landing.html's three category
// fields). Pulled out into its own component since the icon markup is
// sizeable and would otherwise be repeated once per category loop.
//
// Design note (this is a full rewrite, not a tweak): the previous
// version gave every algorithm its own icon and its own bespoke hover
// animation. Per direct reference designs (two icon styles: a bar chart
// for Sorting/Searching, a small tree for Graph — muted grey at rest,
// resolving to shades of purple on hover), the icon and the hover
// reveal are keyed off the algorithm's *category* now, not the
// individual algorithm — matching what was actually asked for.
@Component({
  selector: 'algo-picker-card',
  imports: [AlgoButton, TranslatePipe],
  templateUrl: './algo-picker-card.html',
  styleUrl: './algo-picker-card.scss',
})
export class AlgoPickerCard {
  @Input({ required: true })
  public algorithm!: LandingAlgorithm;

  public constructor(private readonly _router: Router) {}

  protected get category(): AlgorithmCategory {
    return this.algorithm.category;
  }

  protected goToAlgorithm(): void {
    this._router.navigateByUrl(`/${this.algorithm.route}`);
  }
}
