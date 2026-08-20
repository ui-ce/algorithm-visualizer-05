import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'algo-auth-shell',
  imports: [RouterLink],
  templateUrl: './auth-shell.html',
  styleUrl: './auth-shell.scss',
})
export class AuthShell {
  @Input()
  public title = '';

  @Input()
  public subtitle: string | null = null;
}
