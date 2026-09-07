import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AlgoButton } from '../../../design-system/button/button';
import { TextField } from '../../../design-system/text-field/text-field';
import { PasswordField } from '../../../design-system/password-field/password-field';
import { AuthShell } from '../components/auth-shell/auth-shell';
import { evaluatePassword, passwordsMatch, validateEmail, validateFullName } from '../../../core/utils/validators';

@Component({
  selector: 'algo-register-page',
  imports: [RouterLink, AlgoButton, TextField, PasswordField, AuthShell],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterPage {
  protected fullName = '';
  protected email = '';
  protected password = '';
  protected confirmPassword = '';

  protected fullNameError: string | null = null;
  protected emailError: string | null = null;
  protected confirmPasswordError: string | null = null;
  protected formError: string | null = null;
  protected successMessage: string | null = null;

  // Only shown once the user has actually started typing a password —
  // a wall of red rules before they've typed anything just reads as
  // clutter, not guidance.
  protected passwordTouched = false;

  public constructor(
    protected readonly authService: AuthService,
    private readonly _router: Router,
  ) {}

  protected get passwordRules() {
    return evaluatePassword(this.password).rules;
  }

  protected onFullNameChange(value: string): void {
    this.fullName = value;
    this.fullNameError = null;
    this.formError = null;
  }

  protected onEmailChange(value: string): void {
    this.email = value;
    this.emailError = null;
    this.formError = null;
  }

  protected onPasswordChange(value: string): void {
    this.password = value;
    this.passwordTouched = true;
    this.confirmPasswordError = null;
    this.formError = null;
  }

  protected onConfirmPasswordChange(value: string): void {
    this.confirmPassword = value;
    this.confirmPasswordError = null;
    this.formError = null;
  }

  protected async onSubmit(): Promise<void> {
    if (this.authService.isSubmitting()) {
      return;
    }
    this.successMessage = null;

    const nameCheck = validateFullName(this.fullName);
    this.fullNameError = nameCheck.valid ? null : nameCheck.message;

    const emailCheck = validateEmail(this.email);
    this.emailError = emailCheck.valid ? null : emailCheck.message;

    this.passwordTouched = true;
    const passwordValid = evaluatePassword(this.password).valid;

    const matches = passwordsMatch(this.password, this.confirmPassword);
    this.confirmPasswordError = matches ? null : 'Passwords do not match.';

    if (!nameCheck.valid || !emailCheck.valid || !passwordValid || !matches) {
      return;
    }

    const result = await this.authService.register(this.fullName, this.email, this.password, this.confirmPassword);
    if (!result.success) {
      this.formError = result.error;
      return;
    }

    if (result.requiresEmailConfirmation) {
      this.successMessage = 'Account created — check your inbox to confirm your email before signing in.';
      return;
    }

    this._router.navigateByUrl('/');
  }
}