import { Component, EventEmitter, Input, Output } from '@angular/core';

// Generic three-way switch, driven entirely by the labels array rather
// than being hard-wired to Learn/Practice/Test — that keeps this reusable
// anywhere a segmented control is needed, with the algorithm page tabs
// as one consumer among possibly others.
@Component({
  selector: 'algo-segmented-button',
  imports: [],
  templateUrl: './segmented-button.html',
  styleUrl: './segmented-button.scss',
})
export class AlgoSegmentedButton {
  @Input()
  public options: string[] = [];

  @Input()
  public selectedIndex = 0;

  @Output()
  public readonly selectedIndexChange = new EventEmitter<number>();

  protected selectOption(index: number): void {
    if (index === this.selectedIndex) {
      return;
    }

    this.selectedIndex = index;
    this.selectedIndexChange.emit(index);
  }

  // The sliding thumb moves by its own width plus the segment gap for
  // each step. Using a percentage of the thumb's own box (rather than
  // the container's) means this stays correct regardless of how many
  // options there are or how wide the container ends up.
  protected get thumbTransform(): string {
    return `translateX(calc(${this.selectedIndex} * (100% + 4px)))`;
  }
}
