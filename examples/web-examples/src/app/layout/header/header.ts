import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
// Same caveat as elsewhere in this project: these three names follow
// Solar's "<IconName><Style>" convention but haven't been checked
// against the installed package's export list yet.
import { SolarMoonLinear, SolarSunLinear, SolarUserCircleLinear } from '@solar-icons/angular';
import type { BreadcrumbItem } from './header-breadcrumb.type';

// Shared across every page (landing, algorithm pages, compare, profile),
// not specific to any one feature — that's why it lives under layout/
// rather than inside a feature folder.
@Component({
  selector: 'algo-header',
  imports: [RouterLink, SolarMoonLinear, SolarSunLinear, SolarUserCircleLinear],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class AlgoHeader {
  // Last item in the list is treated as the current page and renders as
  // plain text; every item before it is a working link.
  @Input()
  public breadcrumbs: BreadcrumbItem[] = [];

  @Input()
  public themeMode: 'light' | 'dark' = 'dark';

  @Input()
  public currentLanguage: 'fa' | 'en' = 'fa';

  @Output()
  public readonly themeToggle = new EventEmitter<void>();

  @Output()
  public readonly languageToggle = new EventEmitter<void>();

  @Output()
  public readonly accountClick = new EventEmitter<void>();
}
