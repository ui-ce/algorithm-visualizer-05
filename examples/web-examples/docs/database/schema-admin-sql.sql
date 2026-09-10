-- ALGO — admin SQL console support function
-- Run this once in the Supabase SQL editor, after schema.sql,
-- schema-questions.sql, and schema-content.sql.
--
-- Backs the "SQL" tab in the admin panel (/admin/sql). supabase-js has
-- no generic "run arbitrary SQL" call by design (PostgREST only knows
-- how to do table operations) — this function is the one deliberate
-- exception, and it's built to stay safe even if called directly
-- (bypassing the Angular UI entirely, e.g. from the browser console):
--
--   * security invoker (not definer): runs as the calling user, with
--     their own role and every RLS policy already in place — NOT with
--     elevated privileges. A non-admin calling this can only ever see
--     rows their own SELECT policies already allow, and any write
--     statement is still blocked by the "admins insert/update/delete"
--     policies from schema-questions.sql / schema-content.sql. This
--     function adds zero new privileges beyond what the caller's own
--     Postgres role + RLS already grants them.
--   * SELECT-only, enforced here in addition to relying on RLS: the
--     query text must start with "select" (after stripping comments
--     and whitespace) or it's rejected before ever reaching Postgres.
--
-- Still: only the admin-gated /admin/sql page calls this from the app.
-- Treat it like a real database console, because it is one.

create or replace function public.admin_run_sql(query text)
returns setof json
language plpgsql
security invoker
as $$
declare
  normalized text;
begin
  -- Explicit admin check, on top of security invoker (see the big
  -- comment above) — this function is meant for the admin panel only,
  -- not "any signed-in user, but it happens to be harmless via RLS".
  -- Reuses the same is_admin() helper schema-questions.sql defines.
  if not public.is_admin() then
    raise exception 'Admins only.';
  end if;

  -- Strip -- line comments and /* */ block comments, then leading
  -- whitespace, before checking the statement keyword.
  normalized := regexp_replace(query, '--[^\n]*', '', 'g');
  normalized := regexp_replace(normalized, '/\*.*?\*/', '', 'g');
  normalized := lower(trim(normalized));

  if normalized !~ '^select\b' then
    raise exception 'Only SELECT statements are allowed here.';
  end if;

  return query execute format('select to_json(t) from (%s) t', query);
end;
$$;

-- Callable by any signed-in user at the Postgres-grant level — the
-- is_admin() check inside the function body is the real gate, kept in
-- SQL (not just the Angular route guard) so it holds even if someone
-- calls this RPC directly, bypassing the UI entirely.
grant execute on function public.admin_run_sql(text) to authenticated;
