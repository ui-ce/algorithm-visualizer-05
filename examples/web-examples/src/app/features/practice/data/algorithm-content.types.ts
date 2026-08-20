export interface CodeImplementation {
  language: string;
  code: string;
}

export interface ComplexityInfo {
  bestTime: string;
  averageTime: string;
  worstTime: string;
  space: string;
  // 'N/A — not a sorting algorithm' for non-sorts (search/graph algos),
  // since Stable/In-place are sorting-specific properties.
  stable: string;
  inPlace: string;
  // Short note on what condition produces the best/worst case, since a
  // bare Big-O notation doesn't explain why it changes.
  note: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ApplicationItem {
  title: string;
  description: string;
}

export interface AlgorithmContent {
  overview: string;
  // Plain-language "imagine it like..." explanation, shown right under
  // the Definition (overview) in the Overview panel.
  intuition: string;
  // Ordered list of the algorithm's steps, one sentence each.
  howItWorks: string[];
  // One or two sentences on the single property that most defines the
  // algorithm's behavior/tradeoff (e.g. "only works on sorted data").
  keyCharacteristic: string;
  overviewFaq: FaqItem[];
  complexity: ComplexityInfo;
  pros: string[];
  cons: string[];
  whenToUse: string[];
  whenNotToUse: string[];
  applications: ApplicationItem[];
  implementations: CodeImplementation[];
}
