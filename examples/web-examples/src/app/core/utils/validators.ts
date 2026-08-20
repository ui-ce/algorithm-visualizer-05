// Validation lives here, not inline in the Login/Register components, so
// both forms (and any future one, e.g. "change password") check the
// exact same rules instead of drifting apart over time.
//
// Note on what this file is and isn't responsible for: none of this is
// what stops SQL injection or credential stuffing — Supabase's client
// library never builds raw SQL from these strings (it calls a
// parameterized REST/RPC API), and password hashing happens server-side.
// What this file *does* do is reject obviously-malformed input early
// (bad emails, weak passwords, control characters that have no business
// in a name field) so the user gets fast feedback and the backend never
// sees garbage.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Letters (Latin + Persian), spaces, and a couple of common name
// punctuation marks. No angle brackets, quotes, semicolons, or other
// characters that have no legitimate place in a person's name.
const FULL_NAME_PATTERN = /^[A-Za-z\u0600-\u06FF\s'.-]+$/;

export interface FieldValidationResult {
  valid: boolean;
  message: string | null;
}

export function validateEmail(rawEmail: string): FieldValidationResult {
  const email = rawEmail.trim();

  if (!email) {
    return { valid: false, message: 'Email is required.' };
  }
  if (email.length > 254) {
    return { valid: false, message: 'Email is too long.' };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { valid: false, message: 'Enter a valid email address.' };
  }
  return { valid: true, message: null };
}

export function validateFullName(rawName: string): FieldValidationResult {
  const name = rawName.trim();

  if (!name) {
    return { valid: false, message: 'Name is required.' };
  }
  if (name.length < 2 || name.length > 60) {
    return { valid: false, message: 'Name must be between 2 and 60 characters.' };
  }
  if (!FULL_NAME_PATTERN.test(name)) {
    return { valid: false, message: 'Name can only contain letters and spaces.' };
  }
  return { valid: true, message: null };
}

// Returns every unmet rule so the UI can render a checklist, plus an
// overall verdict. 8–72 chars: 72 is bcrypt's own input limit, so
// anything past that is silently truncated by the hashing step —
// better to reject it up front than to let a user set a password that
// doesn't do what they think it does.
export function evaluatePassword(password: string): {
  valid: boolean;
  rules: { label: string; met: boolean }[];
} {
  const rules = [
    { label: 'At least 8 characters', met: password.length >= 8 && password.length <= 72 },
    { label: 'At least one uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'At least one lowercase letter', met: /[a-z]/.test(password) },
    { label: 'At least one number', met: /[0-9]/.test(password) },
    { label: 'No leading or trailing spaces', met: password === password.trim() && password.length > 0 },
  ];
  return { valid: rules.every((rule) => rule.met), rules };
}

export function passwordsMatch(password: string, confirmPassword: string): boolean {
  return password.length > 0 && password === confirmPassword;
}

// Trims whitespace only — never strips characters here, since doing
// that silently can change what the user typed without them noticing.
// Rejection (via the validators above) is preferred over silent rewriting.
export function sanitizeInput(raw: string): string {
  return raw.trim();
}
