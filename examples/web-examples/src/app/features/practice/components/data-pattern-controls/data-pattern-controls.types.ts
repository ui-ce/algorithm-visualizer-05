// null represents "No Pattern" — kept out of the string union so there's
// exactly one way to express that state, instead of both null and a
// separate 'no-pattern' string meaning the same thing.
export type DataPattern = 'nearly-sorted' | 'reversed' | 'many-duplicates';

// Generic so this same shape (and the component that renders it) works
// for any set of pattern buttons — array patterns (DataPattern) and
// graph patterns (GraphPattern, see sample-graphs.ts) both use it,
// instead of two separate near-identical components existing just
// because the id type differs.
export type PatternOption<T extends string | null = string | null> = { id: T; labelKey: string };

// The default button set for DataPatternControls/InputControls/
// ControlSection alike — defined once, here, and imported by all
// three instead of being copy-pasted at each layer, so a parent that
// doesn't explicitly override patternOptions (every array-algorithm
// page) can never accidentally end up passing an empty list down
// through the chain and blanking the row out.
export const DEFAULT_ARRAY_PATTERN_OPTIONS: PatternOption<DataPattern | null>[] = [
  { id: null, labelKey: 'practice.pattern.none' },
  { id: 'nearly-sorted', labelKey: 'practice.pattern.nearlySorted' },
  { id: 'reversed', labelKey: 'practice.pattern.reversed' },
  { id: 'many-duplicates', labelKey: 'practice.pattern.manyDuplicates' },
];
