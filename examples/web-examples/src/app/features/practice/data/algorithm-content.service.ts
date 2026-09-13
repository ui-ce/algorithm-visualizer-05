import { Injectable } from '@angular/core';
import { supabase } from '../../../core/services/supabase-client';
import type { AlgorithmContent } from './algorithm-content.types';

// Row shape in public.algorithm_content — see
// docs/database/schema-content.sql. snake_case columns map to the
// camelCase AlgorithmContent fields below.
interface AlgorithmContentRow {
  id: string;
  algorithm_id: string;
  language: 'en' | 'fa';
  overview: string;
  intuition: string;
  how_it_works: string[];
  key_characteristic: string;
  overview_faq: AlgorithmContent['overviewFaq'];
  complexity: AlgorithmContent['complexity'];
  pros: string[];
  cons: string[];
  when_to_use: string[];
  when_not_to_use: string[];
  applications: AlgorithmContent['applications'];
  implementations: AlgorithmContent['implementations'];
  // Nullable — see schema-content-notes-pdf.sql; not every existing row
  // has one yet.
  notes_pdf_url: string | null;
}

// What the admin form submits — same shape minus the generated id, plus
// the routing fields (algorithm/language) an AlgorithmContent object on
// its own doesn't carry.
export interface AdminContentInput {
  algorithmId: string;
  language: 'en' | 'fa';
  content: AlgorithmContent;
}

export interface AdminContentRow extends AdminContentInput {
  id: string;
}

function rowToContent(row: AlgorithmContentRow): AlgorithmContent {
  return {
    overview: row.overview,
    intuition: row.intuition,
    howItWorks: row.how_it_works,
    keyCharacteristic: row.key_characteristic,
    overviewFaq: row.overview_faq,
    complexity: row.complexity,
    pros: row.pros,
    cons: row.cons,
    whenToUse: row.when_to_use,
    whenNotToUse: row.when_not_to_use,
    applications: row.applications,
    implementations: row.implementations,
    notesPdfUrl: row.notes_pdf_url ?? undefined,
  };
}

function rowToAdminRow(row: AlgorithmContentRow): AdminContentRow {
  return {
    id: row.id,
    algorithmId: row.algorithm_id,
    language: row.language,
    content: rowToContent(row),
  };
}

function contentToColumns(content: AlgorithmContent) {
  return {
    overview: content.overview,
    intuition: content.intuition,
    how_it_works: content.howItWorks,
    key_characteristic: content.keyCharacteristic,
    overview_faq: content.overviewFaq,
    complexity: content.complexity,
    pros: content.pros,
    cons: content.cons,
    when_to_use: content.whenToUse,
    when_not_to_use: content.whenNotToUse,
    applications: content.applications,
    implementations: content.implementations,
    notes_pdf_url: content.notesPdfUrl ?? null,
  };
}

@Injectable({ providedIn: 'root' })
export class AlgorithmContentService {
  // Used by the app-start dynamic-registry loader
  // (initDynamicAlgorithmContent) — one algorithm, one language.
  // Returns null (not throw) on any failure so the caller can just
  // keep the existing static content instead.
  public async fetchContent(algorithmId: string, language: 'en' | 'fa'): Promise<AlgorithmContent | null> {
    const { data, error } = await supabase
      .from('algorithm_content')
      .select('*')
      .eq('algorithm_id', algorithmId)
      .eq('language', language)
      .maybeSingle();

    if (error || !data) {
      if (error) console.error(`algorithm_content fetch failed for ${algorithmId}/${language}:`, error);
      return null;
    }
    return rowToContent(data as AlgorithmContentRow);
  }

  // ---- Admin panel CRUD ---------------------------------------------

  public async listContent(): Promise<AdminContentRow[]> {
    const { data, error } = await supabase
      .from('algorithm_content')
      .select('*')
      .order('algorithm_id', { ascending: true })
      .order('language', { ascending: true });

    if (error || !data) {
      if (error) console.error('algorithm_content list failed:', error);
      return [];
    }
    return (data as AlgorithmContentRow[]).map(rowToAdminRow);
  }

  // Upsert on (algorithm_id, language) — matches the unique constraint
  // in schema-content.sql, so re-saving the same algorithm+language
  // from the admin form or a re-run seed script replaces the row
  // instead of erroring or duplicating it.
  public async saveContent(input: AdminContentInput): Promise<{ success: boolean; error: string | null }> {
    const { data: userData } = await supabase.auth.getUser();

    const { error } = await supabase.from('algorithm_content').upsert(
      {
        algorithm_id: input.algorithmId,
        language: input.language,
        ...contentToColumns(input.content),
        updated_at: new Date().toISOString(),
        created_by: userData.user?.id ?? null,
      },
      { onConflict: 'algorithm_id,language' },
    );

    if (error) {
      console.error('algorithm_content upsert failed:', error);
      return { success: false, error: error.message };
    }
    return { success: true, error: null };
  }

  public async deleteContent(id: string): Promise<{ success: boolean; error: string | null }> {
    const { error } = await supabase.from('algorithm_content').delete().eq('id', id);
    if (error) {
      console.error('algorithm_content delete failed:', error);
      return { success: false, error: error.message };
    }
    return { success: true, error: null };
  }

  // ---- Notes PDF upload (admin panel only) ---------------------------
  //
  // Uploads to the public 'algorithm-notes' Storage bucket (see
  // schema-content-notes-pdf.sql for the bucket + policy setup) and
  // returns its public URL, ready to be stored on the row's
  // notes_pdf_url column via saveContent. Uploading does NOT save the
  // row itself — the admin form still has to call saveContent
  // afterwards, same as every other field in the form.
  public async uploadNotesPdf(
    algorithmId: string,
    language: 'en' | 'fa',
    file: File,
  ): Promise<{ url: string | null; error: string | null }> {
    const path = `${algorithmId}/${language}.pdf`;

    const { error: uploadError } = await supabase.storage.from('algorithm-notes').upload(path, file, {
      upsert: true,
      contentType: 'application/pdf',
    });

    if (uploadError) {
      console.error('algorithm-notes upload failed:', uploadError);
      return { url: null, error: uploadError.message };
    }

    const { data } = supabase.storage.from('algorithm-notes').getPublicUrl(path);
    return { url: data.publicUrl, error: null };
  }
}
