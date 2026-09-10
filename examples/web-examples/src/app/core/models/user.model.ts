// The subset of Supabase's auth user object the rest of the app cares
// about. Kept intentionally small so components never depend on the
// Supabase SDK's own User type directly — only AuthService does.
export interface AppUser {
  id: string;
  email: string;
  fullName: string;
  // From user_metadata.is_admin, set manually per person in the
  // Supabase dashboard — see docs/database/schema-questions.sql's
  // "Admin access" section. Gates the /admin/questions panel.
  isAdmin: boolean;
}