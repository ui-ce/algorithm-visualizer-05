export interface CodeImplementation {
  language: string;
  code: string;
}

export interface ComplexityInfo {
  bestTime: string;
  averageTime: string;
  worstTime: string;
  space: string;
  // Short note on what condition produces the best/worst case, since a
  // bare Big-O notation doesn't explain why it changes.
  note: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface AlgorithmContent {
  overview: string;
  overviewFaq: FaqItem[];
  complexity: ComplexityInfo;
  pros: string[];
  cons: string[];
  applications: string[];
  implementations: CodeImplementation[];
}
