import type { QuestionSidebarState } from '../../models/test.types';

export type { QuestionSidebarState };

// One row per state. Every state shares "text and dot use this same
// color"; only 'current' breaks that rule (dot color still follows the
// state color, but the color itself is text-primary instead of
// text-tertiary). 'locked' has no icon and an unfilled dot; the other
// three each pair with one right-aligned Solar icon.
export interface QuestionStatusVisual {
  textColorVar: string;
  dotFilled: boolean;
  iconColorVar: string | null;
}

export const QUESTION_STATUS_VISUALS: Record<QuestionSidebarState, QuestionStatusVisual> = {
  current: { textColorVar: 'var(--color-text-primary)', dotFilled: true, iconColorVar: null },
  locked: { textColorVar: 'var(--color-text-tertiary)', dotFilled: false, iconColorVar: null },
  correct: {
    textColorVar: 'var(--color-text-tertiary)',
    dotFilled: true,
    iconColorVar: 'var(--color-question-status-icon-true)',
  },
  skipped: {
    textColorVar: 'var(--color-text-tertiary)',
    dotFilled: true,
    iconColorVar: 'var(--color-question-status-icon-skipped)',
  },
  incorrect: {
    textColorVar: 'var(--color-text-tertiary)',
    dotFilled: true,
    iconColorVar: 'var(--color-question-status-icon-incorrect)',
  },
};
