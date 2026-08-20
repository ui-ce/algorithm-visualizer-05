import { Component, EventEmitter, Input, Output } from '@angular/core';

// Plain [(ngModel)]-free input: the component owns no state of its own
// beyond what's passed in, matching Custom Input Modal's manual
// value/valueChange pattern elsewhere in the codebase rather than
// introducing ReactiveFormsModule for a single field.
@Component({
  selector: 'algo-text-field',
  imports: [],
  templateUrl: './text-field.html',
  styleUrl: './text-field.scss',
})
export class TextField {
  @Input()
  public label = '';

  @Input()
  public placeholder = '';

  @Input()
  public value = '';

  @Input()
  public type: 'text' | 'email' = 'text';

  @Input()
  public autocomplete = 'off';

  @Input()
  public errorMessage: string | null = null;

  @Output()
  public readonly valueChange = new EventEmitter<string>();

  @Output()
  public readonly enterPressed = new EventEmitter<void>();

  protected onInput(raw: string): void {
    this.valueChange.emit(raw);
  }
}
