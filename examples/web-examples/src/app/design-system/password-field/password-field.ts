import { Component, EventEmitter, Input, Output } from '@angular/core';
// Confirmed against the installed package (grep of dist/icons/index.d.ts).
import { SolarEyeLinear, SolarEyeClosedLinear } from '@solar-icons/angular';

@Component({
  selector: 'algo-password-field',
  imports: [SolarEyeLinear, SolarEyeClosedLinear],
  templateUrl: './password-field.html',
  styleUrl: './password-field.scss',
})
export class PasswordField {
  @Input()
  public label = 'Password';

  @Input()
  public placeholder = '';

  @Input()
  public value = '';

  @Input()
  public errorMessage: string | null = null;

  // 'new-password' stops browsers from suggesting/autofilling an old
  // saved password into the confirm-password field on Register.
  @Input()
  public autocomplete: 'current-password' | 'new-password' = 'current-password';

  @Output()
  public readonly valueChange = new EventEmitter<string>();

  @Output()
  public readonly enterPressed = new EventEmitter<void>();

  protected isVisible = false;

  protected onInput(raw: string): void {
    this.valueChange.emit(raw);
  }

  protected toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }
}
