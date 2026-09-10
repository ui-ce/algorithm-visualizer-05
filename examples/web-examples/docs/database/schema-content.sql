-- ALGO — algorithm content table (Learn page + Practice drawer)
-- Run this once in the Supabase project's SQL editor, after schema.sql
-- and schema-questions.sql.
--
-- Context: Learn and Practice currently both read the same static
-- object (ALGORITHM_CONTENT / ALGORITHM_CONTENT_FA in
-- features/practice/data/algorithm-content.registry(.fa).ts) — one row
-- per algorithm, containing overview, intuition, how-it-works steps,
-- complexity, pros/cons, applications, and code implementations. This
-- table is that same shape moved server-side, following exactly the
-- same pattern as public.test_questions: public read (no login
-- required, since Learn/Practice work in Guest Mode), admin-only write.
--
-- Row shape mirrors AlgorithmContent (features/practice/data/
-- algorithm-content.types.ts) field-for-field, so
-- AlgorithmContentService can map a row straight to/from that
-- interface with no restructuring.

create table if not exists public.algorithm_content (
  id uuid primary key default gen_random_uuid(),

  -- Free-text on purpose, same reasoning as test_questions.algorithm_id:
  -- it's just the app's existing route slug ('bubble-sort', 'dfs', ...),
  -- so onboarding a new algorithm is a pure data insert, no migration.
  algorithm_id text not null,
  language text not null check (language in ('en', 'fa')),

  overview text not null,
  intuition text not null,
  -- string[] — one sentence per step.
  how_it_works jsonb not null default '[]'::jsonb,
  key_characteristic text not null,
  -- FaqItem[] — { question, answer }.
  overview_faq jsonb not null default '[]'::jsonb,

  -- ComplexityInfo — { bestTime, averageTime, worstTime, space, stable, inPlace, note }.
  complexity jsonb not null,

  pros jsonb not null default '[]'::jsonb,
  cons jsonb not null default '[]'::jsonb,
  when_to_use jsonb not null default '[]'::jsonb,
  when_not_to_use jsonb not null default '[]'::jsonb,
  -- ApplicationItem[] — { title, description }.
  applications jsonb not null default '[]'::jsonb,
  -- CodeImplementation[] — { language, code }.
  implementations jsonb not null default '[]'::jsonb,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users (id) on delete set null,

  -- One row per algorithm+language — re-seeding replaces, never duplicates.
  unique (algorithm_id, language)
);

create index if not exists algorithm_content_lookup_idx
  on public.algorithm_content (algorithm_id, language);

alter table public.algorithm_content enable row level security;

-- Anyone can read — including anonymous/guest visitors, since Learn and
-- Practice both work without login (Guest Mode, FR-26). This is the
-- same key point as the anon key itself: content is not secret data,
-- so a public select policy is correct here, unlike quiz_attempts.
create policy "select algorithm content"
  on public.algorithm_content for select
  to anon, authenticated
  using (true);

-- Reuses the is_admin() function already created in
-- schema-questions.sql (checks user_metadata.is_admin on the JWT).
create policy "admins insert algorithm content"
  on public.algorithm_content for insert
  to authenticated
  with check (public.is_admin());

create policy "admins update algorithm content"
  on public.algorithm_content for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "admins delete algorithm content"
  on public.algorithm_content for delete
  to authenticated
  using (public.is_admin());
