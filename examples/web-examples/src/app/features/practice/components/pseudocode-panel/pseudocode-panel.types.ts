export type PseudocodeTokenKind = 'plain' | 'keyword' | 'number';

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
