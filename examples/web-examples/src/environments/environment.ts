// Supabase connection info.
//
// The anon/public key below is NOT a secret the way an API password
// would be — Supabase is designed so this key ships to the browser.
// Real protection comes from Row Level Security (RLS) policies defined
// on the database side (see docs/database/schema.sql), which restrict
// every row to its own owner (auth.uid() = user_id) regardless of what
// the client asks for. Never add the "service_role" key here — that one
// bypasses RLS entirely and must only ever live on a trusted server.
//
// Fill these two values in after creating the Supabase project
// (Project Settings → API in the Supabase dashboard).
export const environment = {
  production: false,
  supabaseUrl: 'https://YOUR-PROJECT-REF.supabase.co',
  supabaseAnonKey: 'YOUR-ANON-PUBLIC-KEY',
};
