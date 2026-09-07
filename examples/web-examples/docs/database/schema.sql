-- ALGO — database schema
-- Run this once in the Supabase project's SQL editor (Dashboard → SQL Editor → New query).
--
-- Auth (login/register) needs no table here: Supabase's built-in
-- `auth.users` already stores the account (email, hashed password via
-- bcrypt, session/JWT handling) and we attach the display name to it as
-- `user_metadata.full_name` at sign-up time — see AuthService.register().
--
-- The one piece of app-specific data so far is quiz results: which
-- algorithm, which difficulty, which question set, the score, and a
-- per-question breakdown (for reviewing wrong answers later and for the
-- line chart the Test feature will eventually plot). This table exists
-- now, ready to be filled in the moment the Test feature is wired up —
-- nothing about auth or the UI needs to change when that happens.

create extension if not exists "pgcrypto"; -- provides gen_random_uuid()

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,

  algorithm_id text not null, -- e.g. 'bubble-sort', matches the app's route id
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  question_set_id integer not null check (question_set_id > 0), -- which of the 3 sets per difficulty

  total_questions integer not null check (total_questions > 0),
  correct_count integer not null check (correct_count >= 0 and correct_count <= total_questions),
  score_percent numeric(5, 2) not null check (score_percent >= 0 and score_percent <= 100),
  passed boolean not null,

  -- One entry per question: { questionId, selectedAnswer, correctAnswer, isCorrect }.
  -- Stored as JSON rather than a second table since the shape is small,
  -- fixed-size (5/7/10 items), and only ever read back as a whole per attempt.
  answers jsonb not null default '[]'::jsonb,

  attempted_at timestamptz not null default now()
);

create index if not exists quiz_attempts_user_id_idx on public.quiz_attempts (user_id);
create index if not exists quiz_attempts_algorithm_idx on public.quiz_attempts (algorithm_id, difficulty);

-- Row Level Security: without this, the anon key could read or write
-- every user's rows. With it, Postgres itself enforces "only your own
-- data" no matter what the client sends — this is the real security
-- boundary, not anything in the Angular code.
alter table public.quiz_attempts enable row level security;

create policy "select own attempts"
  on public.quiz_attempts for select
  using (auth.uid() = user_id);

create policy "insert own attempts"
  on public.quiz_attempts for insert
  with check (auth.uid() = user_id);

-- Deliberately no update/delete policy: a recorded attempt is an
-- immutable history entry (needed for an honest progress chart), so
-- nobody — including the row's own owner — can edit or erase it via the API.
