import { Component, EventEmitter, Input, Output } from '@angular/core';

// The "Speed:" label is deliberately not part of this component — the
// spec calls it out as a separate text element the consumer places next
// to the button, so this only renders the button itself.
const SPEED_CYCLE: readonly number[] = [1, 1.5, 2, 0.5];

@Component({
  selector: 'algo-speed-button',
  imports: [],
  templateUrl: './speed-button.html',
  styleUrl: './speed-button.scss',
})
export class AlgoSpeedButton {
  @Input()
  public speed = 1;

  @Output()
  public readonly speedChange = new EventEmitter<number>();

  // Pressed here means "this value is the active one", not "the mouse is
  // currently down" — it has to survive after the click ends, unlike a
  // normal button's pressed state. Before the first click there's
  // nothing selected yet, so the button sits in its plain default look.
  protected hasSelection = false;

  protected get label(): string {
    return `${this.speed}x`;
  }

  protected advanceSpeed(): void {
    const currentIndex = SPEED_CYCLE.indexOf(this.speed);
    const nextIndex = (currentIndex + 1) % SPEED_CYCLE.length;
    this.speed = SPEED_CYCLE[nextIndex];
    this.hasSelection = true;
    this.speedChange.emit(this.speed);
  }
}
