import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';

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
  private readonly _languageService = inject(LanguageService);

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

    // Do NOT set this.selectedIndex here. This component only ever
    // reflects the @Input the parent gives it — the parent is the
    // single source of truth and may reject the change (e.g.
    // practice.ts's onTabChange leaves selectedTabIndex untouched and
    // shows a modal instead, when a Test tab has no questions yet).
    // Mutating the @Input locally used to make the thumb slide
    // immediately, but since Angular only re-writes a property binding
    // when its *source expression's* value changes, an unaccepted
    // change here got permanently stuck: the parent's bound value never
    // changed, so Angular never got a reason to overwrite this local
    // mutation, and the thumb stayed on the rejected tab forever.
    this.selectedIndexChange.emit(index);
  }

  // The thumb sits at inset-inline-start: 0 (logical - the visual left
  // edge in LTR, the visual right edge in RTL), and needs to slide
  // toward each segment from there. translateX itself always moves
  // along the physical axis (positive = visually right) no matter what
  // `direction` says, so a positive step in RTL would push the thumb
  // off the *wrong* edge of the control entirely instead of under
  // segment 1. Flipping the sign for RTL keeps "move `selectedIndex`
  // segments forward" pointed at the physical side the segments
  // actually render on.
  protected get thumbTransform(): string {
    const direction = this._languageService.currentLanguage() === 'fa' ? -1 : 1;
    return `translateX(calc(${direction * this.selectedIndex} * (100% + 4px)))`;
  }
}
