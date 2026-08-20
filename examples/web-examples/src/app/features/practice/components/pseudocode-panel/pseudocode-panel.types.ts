// 'blank' added for the Test feature's Cloze-style code questions — a
// token the pseudocode-panel renders as a dashed placeholder instead of
// its text, so the same panel used in Practice can also host a
// fill-in-the-blank question without a second implementation.
export type PseudocodeTokenKind = 'plain' | 'keyword' | 'number' | 'blank';

export interface PseudocodeToken {
  text: string;
  kind: PseudocodeTokenKind;
}

export interface PseudocodeLine {
  lineNumber: number;
  // How many nesting levels deep this line sits — drives the vertical
  // guide marks before the line's own content, one per level.
  indentLevel: number;
  tokens: PseudocodeToken[];
}
