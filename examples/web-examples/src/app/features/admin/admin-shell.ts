import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AlgoHeader } from '../../layout/header/header';
import { ThemeService } from '../../core/services/theme.service';
import { LanguageService } from '../../core/services/language.service';
import type { BreadcrumbItem } from '../../layout/header/header-breadcrumb.type';

interface AdminNavItem {
  label: string;
  icon: string;
  route: string;
}

// Top-level shell for everything under /admin (see app.routes.ts —
// adminGuard sits on this parent route, so every child route below it
// is already gated). Sidebar + router-outlet, the same "pick a section
// on the left, work in it on the right" layout a code host's repo
// settings page uses — each section (Questions, Content, Tables, SQL)
// is its own routed child component, not a tab switch, so every one of
// them is a real bookmarkable/shareable URL.
@Component({
  selector: 'algo-admin-shell',
  imports: [AlgoHeader, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin-shell.html',
  styleUrl: './admin-shell.scss',
})
export class AdminShell {
  protected readonly navItems: AdminNavItem[] = [
    { label: 'Questions', icon: '❓', route: '/admin/questions' },
    { label: 'Content', icon: '📄', route: '/admin/content' },
    { label: 'Tables', icon: '🗂️', route: '/admin/tables' },
    { label: 'SQL', icon: '⌘', route: '/admin/sql' },
  ];

  public constructor(
    protected readonly themeService: ThemeService,
    protected readonly languageService: LanguageService,
  ) {}

  protected get breadcrumbs(): BreadcrumbItem[] {
    return [
      { label: 'Home', route: '/' },
      { label: 'Admin', route: '' },
    ];
  }
}
