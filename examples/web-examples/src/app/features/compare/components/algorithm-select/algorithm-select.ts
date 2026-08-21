import { Component, ElementRef, EventEmitter, HostListener, Input, Output, inject } from '@angular/core';
// AltArrowDown hasn't been checked against the installed @solar-icons
// package yet (no dropdown/select component existed anywhere else in
// the codebase to confirm the name against) — flagged the same way the
// project already flags unconfirmed Solar icon names elsewhere.
import { SolarAltArrowDownLinear } from '@solar-icons/angular';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import type { CompareAlgorithmMeta } from '../../data/compare-catalog';

// A small custom dropdown built specifically for this page — nothing
// under design-system/ offers a select-style trigger + option list yet
// (see the design-system folder listing), so this isn't meant to be a
// general-purpose replacement for one, just this page's own field.
@Component({
  selector: 'algo-algorithm-select',
  imports: [SolarAltArrowDownLinear, TranslatePipe],
  templateUrl: './algorithm-select.html',
  styleUrl: './algorithm-select.scss',
})
export class AlgorithmSelect {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  // 'accent' is the Algorithm-2 slot's field — its border stays
  // brand-accent (orange) whether or not a value has been picked yet,
  // per spec. 'default' (Algorithm-1's slot) uses the ordinary field
  // border like every other input in the app.
  @Input()
  public variant: 'default' | 'accent' = 'default';

  @Input()
  public labelKey = '';

  @Input()
  public placeholderKey = '';

  @Input()
  public options: CompareAlgorithmMeta[] = [];

  @Input()
  public value: string | null = null;

  @Input()
  public valueNameKey: string | null = null;

  @Output()
  public readonly valueChange = new EventEmitter<string>();

  protected isOpen = false;

  protected toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }

  protected selectOption(option: CompareAlgorithmMeta): void {
    this.isOpen = false;
    if (option.id !== this.value) {
      this.valueChange.emit(option.id);
    }
  }

  // Closes the list when a click lands anywhere outside this component
  // — there's no overlay/backdrop element here (this page doesn't use
  // Angular CDK), so the host itself has to notice the outside click.
  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target as Node)) {
      this.isOpen = false;
    }
  }
}
