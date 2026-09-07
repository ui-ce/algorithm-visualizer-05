import { Component, Input } from '@angular/core';
import type { ButtonSize, ButtonVariant } from './button.types';

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

  // 'large' only changes padding/font-size/hover-lift (see button.scss);
  // color tokens still come from `variant`, so a large primary button
  // and a default primary button always stay the same brand color.
  @Input()
  public size: ButtonSize = 'default';

  /**
   * Keeps a Navigation button visually selected/pressed
   * after the click has finished.
   */
  @Input()
  public selected = false;

  // Opt-in background override for the Navigation variant, which is
  // transparent by default everywhere (Practice's Prev/Next/Again row).
  // Some pages need it to pick up a surface color instead (Learn's own
  // Prev/Next row, so the buttons read against the page rather than
  // the drawer) without changing the variant's default anywhere else.
  // Bound as an inline style rather than left to a CSS class override,
  // since a plain class-selector override from outside this component
  // has to out-specificity button.scss's own `.algo-button--navigation`
  // rule — which is fragile and exactly what wasn't working before;
  // an inline style always wins regardless of any class specificity.
  @Input()
  public backgroundColorVar: string | null = null;

  // Primary and Outline use Label/Medium/Medium. Navigation uses the
  // lighter Label/Medium/Regular. Both classes already exist in the
  // typography tokens file. 'large' buttons override font-size directly
  // in button.scss, so the base typography class still applies for
  // line-height/letter-spacing but font-size is bumped there.
  protected get typographyClass(): string {
    return this.variant === 'navigation' ? 'text-label-medium-regular' : 'text-label-medium';
  }
}
