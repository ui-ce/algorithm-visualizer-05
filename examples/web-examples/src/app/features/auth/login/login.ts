import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AlgoButton } from '../../../design-system/button/button';
import { TextField } from '../../../design-system/text-field/text-field';
import { PasswordField } from '../../../design-system/password-field/password-field';
import { AuthShell } from '../components/auth-shell/auth-shell';
import { validateEmail } from '../../../core/utils/validators';

@Component({
  selector: 'algo-login-page',
  imports: [RouterLink, AlgoButton, TextField, PasswordField, AuthShell],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginPage {
  protected email = '';
  protected password = '';

  protected emailError: string | null = null;
  protected formError: string | null = null;

  public constructor(
    protected readonly authService: AuthService,
    private readonly _router: Router,
  ) {}

  protected onEmailChange(value: string): void {
    this.email = value;
    this.emailError = null;
    this.formError = null;
  }

  protected onPasswordChange(value: string): void {
    this.password = value;
    this.formError = null;
  }

  protected async onSubmit(): Promise<void> {
    if (this.authService.isSubmitting()) {
      return;
    }

    const emailCheck = validateEmail(this.email);
    this.emailError = emailCheck.valid ? null : emailCheck.message;
    if (!emailCheck.valid) {
      return;
    }

    const result = await this.authService.login(this.email, this.password);
    if (!result.success) {
      this.formError = result.error;
      return;
    }

    this._router.navigateByUrl('/home');
  }
}
