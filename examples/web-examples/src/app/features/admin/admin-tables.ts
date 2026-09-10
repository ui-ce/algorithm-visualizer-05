import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlgoButton } from '../../design-system/button/button';
import { supabase } from '../../core/services/supabase-client';

interface FilterDraft {
  column: string;
  value: string;
}

// Generic table browser for /admin — not hardcoded to test_questions
// or algorithm_content specifically, so it works for any table RLS
// lets the signed-in admin SELECT from (including ones this project
// adds later without this page needing a code change): pick a table
// name, optionally filter equality on any column, page through rows.
//
// Deliberately simple (equality filters, offset paging) — for
// anything more (joins, aggregates, sorting by an arbitrary
// expression), that's exactly what the SQL tab is for.
@Component({
  selector: 'algo-admin-tables',
  imports: [AlgoButton, FormsModule, CommonModule],
  templateUrl: './admin-tables.html',
  styleUrl: './admin-tables.scss',
})
export class AdminTablesPage implements OnInit {
  // Known tables from this project's own schema files (docs/database/)
  // — shown as quick picks. The input below still accepts any table
  // name, known or not, since this isn't meant to be an exhaustive
  // list that needs updating every time a table's added.
  protected readonly knownTables = ['test_questions', 'algorithm_content', 'quiz_attempts', 'profiles'];

  protected tableName = this.knownTables[0];
  protected filters: FilterDraft[] = [{ column: '', value: '' }];
  protected pageSize = 25;
  protected pageIndex = 0;

  protected rows: Record<string, unknown>[] = [];
  protected columns: string[] = [];
  protected totalCount: number | null = null;
  protected isLoading = false;
  protected error: string | null = null;

  public ngOnInit(): void {
    void this.load();
  }

  protected addFilter(): void {
    this.filters = [...this.filters, { column: '', value: '' }];
  }

  protected removeFilter(index: number): void {
    this.filters = this.filters.filter((_, i) => i !== index);
  }

  protected onTableChange(): void {
    this.pageIndex = 0;
    void this.load();
  }

  protected async load(): Promise<void> {
    if (!this.tableName.trim()) return;
    this.isLoading = true;
    this.error = null;

    let query = supabase.from(this.tableName.trim()).select('*', { count: 'exact' });
    for (const filter of this.filters) {
      if (filter.column.trim() && filter.value.trim()) {
        query = query.eq(filter.column.trim(), filter.value.trim());
      }
    }

    const from = this.pageIndex * this.pageSize;
    const { data, error, count } = await query.range(from, from + this.pageSize - 1);

    this.isLoading = false;
    if (error) {
      this.error = error.message;
      this.rows = [];
      this.columns = [];
      this.totalCount = null;
      return;
    }

    this.rows = (data ?? []) as Record<string, unknown>[];
    this.columns = this.rows.length > 0 ? Object.keys(this.rows[0]) : [];
    this.totalCount = count ?? null;
  }

  protected async prevPage(): Promise<void> {
    if (this.pageIndex === 0) return;
    this.pageIndex -= 1;
    await this.load();
  }

  protected async nextPage(): Promise<void> {
    if (this.totalCount !== null && (this.pageIndex + 1) * this.pageSize >= this.totalCount) return;
    this.pageIndex += 1;
    await this.load();
  }

  protected cell(row: Record<string, unknown>, column: string): string {
    const value = row[column];
    if (value === null || value === undefined) return '∅';
    return typeof value === 'object' ? JSON.stringify(value) : String(value);
  }
}
