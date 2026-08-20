import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

// Shared footer, same layer as AlgoHeader (layout/, not a feature).
@Component({
  selector: 'algo-footer',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class AlgoFooter {
  protected readonly year = new Date().getFullYear();
}
