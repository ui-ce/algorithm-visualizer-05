import { Component, Input } from '@angular/core';
import { toLocaleDigits } from '../../../../utils/locale-digits.util';

@Component({
  selector: 'array-2d-highlight-layer',
  imports: [],
  templateUrl: './array-2d-highlight-layer.html',
  styleUrl: './array-2d-highlight-layer.scss',
})
export class Array2DHighlightLayer {
  @Input()
  public colors: string[];

  @Input()
  public value: string;

  protected formatDigits(value: string): string {
    return toLocaleDigits(value);
  }
}
