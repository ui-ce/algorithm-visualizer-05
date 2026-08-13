import { Component, Input } from '@angular/core';
import type { ButtonVariant } from './button.types';

@Component({
  selector: 'algo-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class AlgoButton {
  @Input()
  public variant: ButtonVariant = 'primary';

  @Input()
  public text = '';

  @Input()
  public disabled = false;

  // Icons are supplied by the consumer through content projection (see
  // the left-icon / right-icon slots in the template) rather than an
  // icon-name input, since the actual icon is picked per instance from
  // the Solar set and Angular has no clean way to look up a component by
  // string name without extra registry machinery. These two flags only
  // control whether the icon slot renders and gets its spacing — the
  // icon itself is whatever the consumer projects into it.
  @Input()
  public hasLeftIcon = false;

  @Input()
  public hasRightIcon = false;

  // When true, the button stretches to fill whatever width its parent
  // gives it (e.g. three equal-width buttons in a row) instead of
  // hugging its text content.
  @Input()
  public fullWidth = false;

  /**
   * Keeps a Navigation button visually selected/pressed
   * after the click has finished.
   */
  @Input()
  public selected = false;

  // Primary and Outline use Label/Medium/Medium. Navigation uses the
  // lighter Label/Medium/Regular. Both classes already exist in the
  // typography tokens file.
  protected get typographyClass(): string {
    return this.variant === 'navigation' ? 'text-label-medium-regular' : 'text-label-medium';
  }
}
