import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { OptionVisualState } from './option-item.types';

@Component({
  selector: 'algo-option-item',
  imports: [],
  templateUrl: './option-item.html',
  styleUrl: './option-item.scss',
})
export class OptionItem {
  @Input()
  public tag = 'A';

  @Input()
  public text = '';

  @Input()
  public state: OptionVisualState = 'idle';

  // Only shown on the option that is state === 'correct', once the
  // question has been answered (matches the Figma screenshot, where the
  // explanation opens inside the green option field itself).
  @Input()
  public explanation: string | null = null;

  @Input()
  public disabled = false;

  @Output()
  public readonly select = new EventEmitter<void>();

  protected onClick(): void {
    if (this.disabled) return;
    this.select.emit();
  }
}
