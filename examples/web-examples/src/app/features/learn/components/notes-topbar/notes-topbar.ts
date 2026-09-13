import { Component, ElementRef, HostListener, Input, inject } from '@angular/core';
// SolarDownloadLinear is confirmed elsewhere in the app (practice.ts,
// its own export button) — the same glyph is reused here rather than
// a different download icon. SolarAltArrowDownLinear is reused from
// algorithm-select.ts, which itself flags this name as never
// explicitly confirmed against the installed @solar-icons package —
// carrying that flag forward here rather than asserting it as fact.
import { SolarDownloadLinear, SolarAltArrowDownLinear } from '@solar-icons/angular';
import { AlgoButton } from '../../../../design-system/button/button';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';

// Pull-down menu, closes on outside click — same pattern as
// AlgorithmSelect (features/compare/components/algorithm-select); no
// CDK overlay is used anywhere in this codebase so this follows that
// same precedent rather than introducing a new one.
@Component({
  selector: 'algo-notes-topbar',
  imports: [SolarDownloadLinear, SolarAltArrowDownLinear, AlgoButton, TranslatePipe],
  templateUrl: './notes-topbar.html',
  styleUrl: './notes-topbar.scss',
})
export class AlgoNotesTopbar {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  // Undefined/null → no PDF has been uploaded yet for this
  // algorithm+language (see AlgorithmContent.notesPdfUrl) — the PDF
  // menu item stays visible but disabled rather than being hidden, so
  // it's clear the option exists and just isn't filled in yet.
  @Input()
  public notesPdfUrl: string | null = null;

  protected isOpen = false;

  protected toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }

  protected closeMenu(): void {
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target as Node)) {
      this.isOpen = false;
    }
  }
}
