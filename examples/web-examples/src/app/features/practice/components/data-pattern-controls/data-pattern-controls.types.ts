// null represents "No Pattern" — kept out of the string union so there's
// exactly one way to express that state, instead of both null and a
// separate 'no-pattern' string meaning the same thing.
export type DataPattern = 'sorted' | 'nearly-sorted' | 'reversed' | 'many-duplicates';
