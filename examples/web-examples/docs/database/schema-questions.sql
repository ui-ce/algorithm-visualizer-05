-- ALGO — test questions table + admin access control
-- Run this once in the Supabase project's SQL editor, after schema.sql.
--
-- Context: the capstone defense asked whether the "the system is
-- extensible/dynamic" claim was actually tested — specifically, can
-- questions/complexity/descriptions be added through a database rather
-- than hardcoded in the Angular source, and is there an admin panel for
-- it. This table + the admin panel at /admin/questions is that answer,
-- starting with the Test feature's question bank (Search algorithms —
-- DFS and Dijkstra — first; the other nine stay on their existing
-- static .data.ts files for now and migrate the same way later).
--
-- Row shape mirrors TestQuestion (features/test/test.types.ts) almost
-- field-for-field, so TestQuestionsService can map a row straight to/
-- from that interface with no restructuring.

create table if not exists public.test_questions (
  id uuid primary key default gen_random_uuid(),

  -- Not a foreign key on purpose: algorithm ids are just the app's
  -- existing route slugs ('dfs', 'dijkstra', 'bubble-sort', ...), and
  -- keeping this a free-text column is what makes onboarding a new
  -- algorithm later a pure data change — no migration needed to widen
  -- an enum or add a row to some separate `algorithms` table.
  algorithm_id text not null,
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  set_number integer not null check (set_number > 0),
  language text not null check (language in ('en', 'fa')),

  -- Order questions appear within their set — admin-controlled instead
  -- of relying on insertion order, so reordering later doesn't need a
  -- delete+reinsert.
  position integer not null default 0,

  type text not null check (type in ('conceptual', 'execution', 'code')),
  prompt text not null,

  -- One entry per option: { id, text }. Matches TestOption minus the
  -- optional textFa field — language forking here happens at the ROW
  -- level (the `language` column above), not inline per-field like the
  -- static .data.ts files do, since every row is already single-language.
  options jsonb not null,
  correct_option_id text not null,
  explanation text not null,

  -- Only present when type = 'execution': { inputArray?, frameIndex,
  -- graph?, start?, end? } — see TestQuestion.visualization's comment
  -- for why `graph` stays untyped JSON both there and here.
  visualization jsonb,

  -- Only present when type = 'code': PseudocodeLine[].
  code_lines jsonb,

  created_at timestamptz not null default now(),
  created_by uuid references auth.users (id) on delete set null
);

create index if not exists test_questions_lookup_idx
  on public.test_questions (algorithm_id, language, difficulty, set_number, position);

alter table public.test_questions enable row level security;

-- Any signed-in user can read questions (that's what lets Test load a
-- quiz at all) — nobody but an admin can write.
create policy "select questions"
  on public.test_questions for select
  to authenticated
  using (true);

-- ---- Admin access -------------------------------------------------
-- No separate admin table: the flag lives on the Supabase auth user's
-- own user_metadata, the same place full_name already lives (see
-- AuthService.register()). There's no self-serve "become an admin" UI
-- on purpose — grant it manually per person, once, from the Supabase
-- dashboard:
--   Authentication → Users → (select the user) → User Metadata → add
--   { "is_admin": true }
-- is_admin() reads that flag out of the request's JWT so it can be used
-- directly inside RLS policies below (auth.jwt() is only available
-- inside Postgres during an authenticated request, which is exactly
-- when these policies run).
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce((auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean, false);
$$;

create policy "admins insert questions"
  on public.test_questions for insert
  to authenticated
  with check (public.is_admin());

create policy "admins update questions"
  on public.test_questions for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "admins delete questions"
  on public.test_questions for delete
  to authenticated
  using (public.is_admin());