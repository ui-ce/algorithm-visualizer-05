import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlgoButton } from '../../design-system/button/button';
import { supabase } from '../../core/services/supabase-client';

// SQL console for /admin — runs SELECT-only queries through the
// admin_run_sql RPC (see docs/database/schema-admin-sql.sql). That
// function is the actual safety boundary (admin-only, SELECT-only,
// runs with the caller's own RLS), not this component — this is just
// a text box and a results table over it.
@Component({
  selector: 'algo-admin-sql',
  imports: [AlgoButton, FormsModule, CommonModule],
  templateUrl: './admin-sql.html',
  styleUrl: './admin-sql.scss',
})
export class AdminSqlPage {
  protected query = 'select algorithm_id, difficulty, set_number, count(*)\nfrom test_questions\ngroup by 1, 2, 3\norder by 1, 2, 3;';
  protected rows: Record<string, unknown>[] = [];
  protected columns: string[] = [];
  protected isRunning = false;
  protected error: string | null = null;
  protected ranAt: Date | null = null;

  protected async run(): Promise<void> {
    this.error = null;
    this.isRunning = true;

    const { data, error } = await supabase.rpc('admin_run_sql', { query: this.query });

    this.isRunning = false;
    this.ranAt = new Date();

    if (error) {
      this.error = error.message;
      this.rows = [];
      this.columns = [];
      return;
    }

    this.rows = (data ?? []) as Record<string, unknown>[];
    this.columns = this.rows.length > 0 ? Object.keys(this.rows[0]) : [];
  }

  protected cell(row: Record<string, unknown>, column: string): string {
    const value = row[column];
    if (value === null || value === undefined) return '∅';
    return typeof value === 'object' ? JSON.stringify(value) : String(value);
  }
}
