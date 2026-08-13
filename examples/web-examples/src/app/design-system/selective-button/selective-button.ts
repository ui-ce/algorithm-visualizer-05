import { Component, Input } from '@angular/core';

@Component({
  selector: 'algo-selective-button',
  imports: [],
  templateUrl: './selective-button.html',
  styleUrl: './selective-button.scss',
})
export class AlgoSelectiveButton {
  @Input()
  public text = '';

  // Selected is persistent application state — it marks which option in
  // a group is currently chosen — so it's driven by the parent through
  // this input rather than left to a transient CSS :active state. It
  // reuses the visual treatment of the Pressed token set, since the spec
  // defines selection as the pressed appearance made permanent.
  @Input()
  public selected = false;
}
