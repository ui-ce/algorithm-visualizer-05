import { Injectable, signal } from '@angular/core';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './supabase-client';
import type { AppUser } from '../models/user.model';
import { evaluatePassword, passwordsMatch, sanitizeInput, validateEmail, validateFullName } from '../utils/validators';

export interface AuthResult {
  success: boolean;
  error: string | null;
  // True when sign-up succeeded but the project has "confirm email"
  // enabled in Supabase Auth settings — there's no session yet until
  // the user clicks the link in their inbox.
  requiresEmailConfirmation?: boolean;
}

// Real password hashing, session/JWT issuance, and account storage all
// happen inside Supabase (see docs/database/schema.sql for the one bit
// of app-owned data, quiz_attempts). This service never sees or stores
// a plaintext password beyond the single call that hands it to
// supabase-js over HTTPS.
@Injectable({ providedIn: 'root' })
export class AuthService {
  public readonly currentUser = signal<AppUser | null>(null);

  // True until the initial session check resolves, so the header can
  // render nothing (rather than briefly flashing the logged-out state)
  // while a returning user's session is still being read from storage.
  public readonly isInitializing = signal(true);

  public readonly isSubmitting = signal(false);

  public constructor() {
    supabase.auth.getSession().then(({ data }) => {
      this.applySession(data.session);
      this.isInitializing.set(false);
    });

    // Keeps currentUser in sync with token refreshes, sign-outs from
    // another tab, etc. — not just the explicit login()/logout() calls below.
    supabase.auth.onAuthStateChange((_event, session) => {
      this.applySession(session);
    });
  }

  public async register(
    fullNameRaw: string,
    emailRaw: string,
    password: string,
    confirmPassword: string,
  ): Promise<AuthResult> {
    const fullName = sanitizeInput(fullNameRaw);
    const email = sanitizeInput(emailRaw).toLowerCase();

    const nameCheck = validateFullName(fullName);
    if (!nameCheck.valid) {
      return { success: false, error: nameCheck.message };
    }
    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) {
      return { success: false, error: emailCheck.message };
    }
    if (!evaluatePassword(password).valid) {
      return { success: false, error: 'Password does not meet the requirements below.' };
    }
    if (!passwordsMatch(password, confirmPassword)) {
      return { success: false, error: 'Passwords do not match.' };
    }

    this.isSubmitting.set(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });

      if (error) {
        return { success: false, error: this.mapAuthError(error.message) };
      }

      if (data.session) {
        this.applySession(data.session);
        return { success: true, error: null, requiresEmailConfirmation: false };
      }
      return { success: true, error: null, requiresEmailConfirmation: true };
    } finally {
      this.isSubmitting.set(false);
    }
  }

  public async login(emailRaw: string, password: string): Promise<AuthResult> {
    const email = sanitizeInput(emailRaw).toLowerCase();

    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) {
      return { success: false, error: emailCheck.message };
    }
    if (!password) {
      return { success: false, error: 'Password is required.' };
    }

    this.isSubmitting.set(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        return { success: false, error: this.mapAuthError(error.message) };
      }

      this.applySession(data.session);
      return { success: true, error: null };
    } finally {
      this.isSubmitting.set(false);
    }
  }

  public async logout(): Promise<void> {
    await supabase.auth.signOut();
    this.currentUser.set(null);
  }

  private applySession(session: Session | null): void {
    const user = session?.user;
    if (!user) {
      this.currentUser.set(null);
      return;
    }
    this.currentUser.set({
      id: user.id,
      email: user.email ?? '',
      fullName: typeof user.user_metadata?.['full_name'] === 'string' ? user.user_metadata['full_name'] : '',
    });
  }

  // Supabase's raw error strings are meant for developers, not end
  // users, and some phrasings (e.g. confirming an email exists) can aid
  // account enumeration — so only a known-safe subset is passed through
  // in friendlier wording, everything else collapses to one generic message.
  private mapAuthError(message: string): string {
    const lower = message.toLowerCase();

    if (lower.includes('already registered') || lower.includes('already exists')) {
      return 'This email is already registered.';
    }
    if (lower.includes('invalid login credentials')) {
      return 'Incorrect email or password.';
    }
    if (lower.includes('email not confirmed')) {
      return 'Please confirm your email before signing in.';
    }
    if (lower.includes('password should be at least') || lower.includes('password')) {
      return 'Password does not meet the minimum requirements.';
    }
    if (lower.includes('rate limit') || lower.includes('too many')) {
      return 'Too many attempts. Please wait a moment and try again.';
    }
    return 'Something went wrong. Please try again.';
  }
}
