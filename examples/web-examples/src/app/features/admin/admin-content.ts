import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlgoButton } from '../../design-system/button/button';
import {
  AlgorithmContentService,
  type AdminContentRow,
} from '../practice/data/algorithm-content.service';
import type { AlgorithmContent, ApplicationItem, CodeImplementation, FaqItem } from '../practice/data/algorithm-content.types';
import { LANDING_ALGORITHMS } from '../landing/landing';

function emptyContent(): AlgorithmContent {
  return {
    overview: '',
    intuition: '',
    howItWorks: [''],
    keyCharacteristic: '',
    overviewFaq: [{ question: '', answer: '' }],
    complexity: { bestTime: '', averageTime: '', worstTime: '', space: '', stable: '', inPlace: '', note: '' },
    pros: [''],
    cons: [''],
    whenToUse: [''],
    whenNotToUse: [''],
    applications: [{ title: '', description: '' }],
    implementations: [{ language: '', code: '' }],
  };
}

// Admin panel for public.algorithm_content (see docs/database/schema-content.sql)
// — the Learn/Practice/Compare prose (definition, intuition, pros/cons,
// complexity, etc.) for each algorithm. Uses the same
// AlgorithmContentService the app-start loader
// (initDynamicAlgorithmContent) does; this form is just a UI over its
// existing fetchContent/listContent/saveContent/deleteContent methods.
@Component({
  selector: 'algo-admin-content',
  imports: [AlgoButton, FormsModule, CommonModule],
  templateUrl: './admin-content.html',
  styleUrl: './admin-content.scss',
})
export class AdminContentPage implements OnInit {
  protected readonly algorithmOptions = LANDING_ALGORITHMS.map((a) => a.route);

  protected algorithmId = this.algorithmOptions[0] ?? '';
  protected language: 'en' | 'fa' = 'en';
  protected content: AlgorithmContent = emptyContent();

  // Set when the algorithm+language currently in the form already has
  // a row — lets the form (and the "Delete this content" button) know
  // whether Save is creating or replacing, same upsert-on-conflict
  // behavior AlgorithmContentService.saveContent already has.
  protected editingRowId: string | null = null;

  protected allRows: AdminContentRow[] = [];
  protected isLoadingList = false;
  protected isSubmitting = false;
  protected formError: string | null = null;
  protected formSuccess: string | null = null;

  public constructor(private readonly _contentService: AlgorithmContentService) {}

  public ngOnInit(): void {
    void this.refreshList();
    void this.loadIntoForm();
  }

  // Every algorithm+language pair that currently has a row, regardless
  // of which one the form is editing right now — this is the "browse
  // what's already there" list on the right.
  protected get groupedRows(): { algorithmId: string; language: 'en' | 'fa'; row: AdminContentRow }[] {
    return this.allRows
      .map((row) => ({ algorithmId: row.algorithmId, language: row.language, row }))
      .sort((a, b) => (a.algorithmId === b.algorithmId ? a.language.localeCompare(b.language) : a.algorithmId.localeCompare(b.algorithmId)));
  }

  private async refreshList(): Promise<void> {
    this.isLoadingList = true;
    this.allRows = await this._contentService.listContent();
    this.isLoadingList = false;
  }

  protected async onAlgorithmOrLanguageChange(): Promise<void> {
    await this.loadIntoForm();
  }

  // Loads whatever's already saved for the current algorithm+language
  // into the form (or a blank template if nothing's there yet) — so
  // picking an algorithm/language always shows you what you'd be
  // overwriting, if anything.
  private async loadIntoForm(): Promise<void> {
    this.formError = null;
    this.formSuccess = null;
    const existing = this.allRows.find((r) => r.algorithmId === this.algorithmId && r.language === this.language);
    if (existing) {
      this.editingRowId = existing.id;
      this.content = structuredClone(existing.content);
    } else {
      this.editingRowId = null;
      this.content = emptyContent();
    }
  }

  protected async onSelectRow(row: AdminContentRow): Promise<void> {
    this.algorithmId = row.algorithmId;
    this.language = row.language;
    this.editingRowId = row.id;
    this.content = structuredClone(row.content);
    this.formError = null;
    this.formSuccess = null;
  }

  // ---- generic list-field helpers, reused across howItWorks / pros /
  // cons / whenToUse / whenNotToUse (all plain string[] fields) ----
  protected addStringItem(list: string[]): string[] {
    return [...list, ''];
  }
  protected removeStringItem(list: string[], index: number): string[] {
    return list.length <= 1 ? list : list.filter((_, i) => i !== index);
  }
  protected updateStringItem(list: string[], index: number, value: string): string[] {
    return list.map((v, i) => (i === index ? value : v));
  }

  // ---- generic helpers for the {question,answer}/{title,description}
  // pair-list fields (overviewFaq, applications) ----
  protected addFaqItem(list: FaqItem[]): FaqItem[] {
    return [...list, { question: '', answer: '' }];
  }
  protected removeFaqItem(list: FaqItem[], index: number): FaqItem[] {
    return list.length <= 1 ? list : list.filter((_, i) => i !== index);
  }
  protected updateFaqItem(list: FaqItem[], index: number, field: keyof FaqItem, value: string): FaqItem[] {
    return list.map((item, i) => (i === index ? { ...item, [field]: value } : item));
  }

  protected addApplicationItem(list: ApplicationItem[]): ApplicationItem[] {
    return [...list, { title: '', description: '' }];
  }
  protected removeApplicationItem(list: ApplicationItem[], index: number): ApplicationItem[] {
    return list.length <= 1 ? list : list.filter((_, i) => i !== index);
  }
  protected updateApplicationItem(list: ApplicationItem[], index: number, field: keyof ApplicationItem, value: string): ApplicationItem[] {
    return list.map((item, i) => (i === index ? { ...item, [field]: value } : item));
  }

  protected addImplementationItem(list: CodeImplementation[]): CodeImplementation[] {
    return [...list, { language: '', code: '' }];
  }
  protected removeImplementationItem(list: CodeImplementation[], index: number): CodeImplementation[] {
    return list.length <= 1 ? list : list.filter((_, i) => i !== index);
  }
  protected updateImplementationItem(
    list: CodeImplementation[],
    index: number,
    field: keyof CodeImplementation,
    value: string,
  ): CodeImplementation[] {
    return list.map((item, i) => (i === index ? { ...item, [field]: value } : item));
  }

  protected updateComplexity<K extends keyof AlgorithmContent['complexity']>(field: K, value: string): void {
    this.content = { ...this.content, complexity: { ...this.content.complexity, [field]: value } };
  }

  private validate(): string | null {
    if (!this.content.overview.trim()) return 'Overview is required.';
    if (!this.content.intuition.trim()) return 'Intuition is required.';
    if (this.content.howItWorks.every((s) => !s.trim())) return 'How it works needs at least one step.';
    if (!this.content.keyCharacteristic.trim()) return 'Key characteristic is required.';
    return null;
  }

  protected async onSave(): Promise<void> {
    this.formError = null;
    this.formSuccess = null;

    const error = this.validate();
    if (error) {
      this.formError = error;
      return;
    }

    // Drop fully-empty rows from list fields before saving, rather
    // than storing blank placeholder strings/pairs.
    const cleaned: AlgorithmContent = {
      ...this.content,
      howItWorks: this.content.howItWorks.filter((s) => s.trim()),
      pros: this.content.pros.filter((s) => s.trim()),
      cons: this.content.cons.filter((s) => s.trim()),
      whenToUse: this.content.whenToUse.filter((s) => s.trim()),
      whenNotToUse: this.content.whenNotToUse.filter((s) => s.trim()),
      overviewFaq: this.content.overviewFaq.filter((f) => f.question.trim() || f.answer.trim()),
      applications: this.content.applications.filter((a) => a.title.trim() || a.description.trim()),
      implementations: this.content.implementations.filter((i) => i.language.trim() || i.code.trim()),
    };

    this.isSubmitting = true;
    const result = await this._contentService.saveContent({
      algorithmId: this.algorithmId,
      language: this.language,
      content: cleaned,
    });
    this.isSubmitting = false;

    if (!result.success) {
      this.formError = result.error ?? 'Could not save.';
      return;
    }

    this.formSuccess = 'Saved.';
    await this.refreshList();
    await this.loadIntoForm();
  }

  protected async onDelete(): Promise<void> {
    if (!this.editingRowId) return;
    const result = await this._contentService.deleteContent(this.editingRowId);
    if (!result.success) {
      this.formError = result.error ?? 'Could not delete.';
      return;
    }
    this.formSuccess = 'Deleted.';
    this.editingRowId = null;
    this.content = emptyContent();
    await this.refreshList();
  }
}
