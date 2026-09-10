-- ALGO — allow guests to read test questions
-- Run this once in the Supabase project's SQL editor, after schema.sql
-- and schema-questions.sql.
--
-- Context: schema-questions.sql originally granted select on
-- public.test_questions "to authenticated" only. That was fine while
-- dfs/dijkstra were the only DB-backed algorithms and every other
-- algorithm still had a local *.data.ts fallback that worked for guests
-- too. Now that Learn/Practice/Test content and questions for ALL five
-- current algorithms (bubble-sort, insertion-sort, selection-sort, dfs,
-- dijkstra) are DB-backed with no local fallback left, an
-- "authenticated only" read policy means a guest visitor gets an empty
-- result from every fetchBank() call — Test looks unavailable/locked
-- for a guest even though FR-26 (Scope §3.4 / MoSCoW Must-Have list)
-- explicitly requires "Guest Mode: progress only in session", i.e.
-- guests must be able to use the system, questions included, without
-- registering.
--
-- This migration brings test_questions' read policy in line with
-- algorithm_content's (see schema-content.sql's "select algorithm
-- content" policy) — public read, admin-only write. Nothing about the
-- insert/update/delete policies changes: those stay authenticated +
-- is_admin() only, exactly as they already are.

drop policy if exists "select questions" on public.test_questions;

create policy "select questions"
  on public.test_questions for select
  to anon, authenticated
  using (true);