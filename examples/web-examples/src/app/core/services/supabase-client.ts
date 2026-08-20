import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

// One client for the whole app. supabase-js manages its own session
// storage (localStorage, under a `sb-*` key) and token refresh
// internally — nothing here should attempt to read/write auth tokens
// directly, that's what AuthService's use of supabase.auth is for.
export const supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
