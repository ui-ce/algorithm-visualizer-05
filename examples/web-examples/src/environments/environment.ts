
// Supabase connection info.
//
// The anon/public key below is NOT a secret the way an API password
// would be — Supabase is designed so this key ships to the browser.
// Real protection comes from Row Level Security (RLS) policies defined
// on the database side (see docs/database/schema.sql), which restrict
// every row to its own owner (auth.uid() = user_id) regardless of what
// the client asks for. Never add the "service_role" key here — that one
// bypasses RLS entirely and must only ever live on a trusted server.

export const environment = {
  supabaseUrl: 'https://bzkyltrvfegwlugzsuhf.supabase.co',
  supabaseAnonKey: 'sb_publishable_eKp0QXj8G4TySsIVsT-bqw_Y0DXb_pp',
};
