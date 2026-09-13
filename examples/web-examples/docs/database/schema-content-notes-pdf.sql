-- ALGO — جزوه (notes) PDF support for public.algorithm_content
-- Run this once in the Supabase project's SQL editor, after
-- schema-content.sql. Two things happen here:
--   1. a nullable notes_pdf_url column on the existing table
--   2. a public Storage bucket the admin panel uploads into and the
--      Learn page's download menu links to
--
-- Existing rows are unaffected — notes_pdf_url is null until an admin
-- uploads a PDF for that algorithm+language from /admin/content.

alter table public.algorithm_content
  add column if not exists notes_pdf_url text;

-- Storage bucket. `public = true` means anyone can read/download a file
-- by URL with no auth check, which matches the table's own "anyone can
-- read" policy above (the جزوه isn't secret, Learn works in Guest Mode).
-- Writing to it is still locked down below to admins only.
insert into storage.buckets (id, name, public)
values ('algorithm-notes', 'algorithm-notes', true)
on conflict (id) do nothing;

-- Public read of the files themselves (separate from the bucket's own
-- `public` flag above — that flag controls unauthenticated GET on the
-- object URL, this policy controls SELECT through the storage API,
-- both are needed).
create policy "public read of algorithm notes"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'algorithm-notes');

-- Admin-only upload/replace/delete — reuses the same is_admin() function
-- schema-questions.sql already created.
create policy "admins upload algorithm notes"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'algorithm-notes' and public.is_admin());

create policy "admins update algorithm notes"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'algorithm-notes' and public.is_admin())
  with check (bucket_id = 'algorithm-notes' and public.is_admin());

create policy "admins delete algorithm notes"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'algorithm-notes' and public.is_admin());
