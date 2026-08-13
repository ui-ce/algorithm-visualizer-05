import { Component, EventEmitter, Input, Output } from '@angular/core';

// One component, instantiated five times by whatever places the Drawer's
// icon column — the icon itself is projected in per instance the same
// way AlgoButton's left/right icons work, so this component never needs
// to know which five icons exist.
@Component({
  selector: 'algo-drawer-icon-button',
  imports: [],
  templateUrl: './drawer-icon-button.html',
  styleUrl: './drawer-icon-button.scss',
})
export class AlgoDrawerIconButton {
  // Pressed and selected are the same thing here, same as the Selective
  // button — persistent state owned by whichever parent is tracking
  // "which section is open right now", not a hover/press transient.
  @Input()
  public selected = false;

  @Output()
  public readonly toggle = new EventEmitter<void>();
}
