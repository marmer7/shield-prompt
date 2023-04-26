interface OffenseStats {
  [key: string]: number;
}

interface State {
  wordCount: number;
  tokenCount: number;
  words: string[];
  matchedWords: MatchedItem[];
  customList: string[];
  ignoredWords: string[];
  settings: {
    autoCorrect: boolean;
  };
}

type SensitiveDataType =
  | "btcAddress"
  | "custom"
  | "creditCard"
  | "currency"
  | "email"
  | "ethereumAddress"
  | "hash"
  | "iban"
  | "ip"
  | "issn"
  | "passportNumber"
  | "postcode"
  | "phone"
  | "ssn"
  | "usBankRoutingNumber"
  | "usDriversLicense";

type MaskingFunction = (value: string) => string;

interface MaskingRule {
  ruleType: SensitiveDataType;
  displayName: string;
  unicode: string;
  validator_func: (value: string) => boolean;
  mask: MaskingFunction;
}

interface isMatchedItem {
  isMatch: boolean;
  maskingRule?: MaskingRule;
}

interface MatchedItem {
  startIndex: number;
  ngramLength: number;
  word: string;
  context: string;
  maskingRule?: MaskingRule;
}

type MatchFunction = (word: string) => isMatchedItem;

type UpdateAnalysisFunction = (
  element: HTMLTextAreaElement,
  wordList: string[],
  ignoredWords: string[]
) => void;

interface AnalysisResult {
  wordCount: number;
  tokenCount: number;
  words: string[];
  matchedWords: MatchedItem[];
}
