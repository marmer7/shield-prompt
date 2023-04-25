interface OffenseStats {
  [key: string]: number;
}

interface State {
  wordCount: number;
  offenseStats: OffenseStats;
  settings: {
    autoCorrect: boolean;
  };
}

type SensitiveDataType =
  | "btcAddress"
  | "creditCard"
  | "currency"
  | "email"
  | "ethereumAddress"
  | "hash"
  | "ip"
  | "isbn"
  | "issn"
  | "passportNumber"
  | "postcode"
  | "phone"
  | "ssn";

type MaskingFunction = (value: string) => string;

interface MaskingRule {
  name: SensitiveDataType;
  validator_func: (value: string) => boolean;
  mask: MaskingFunction;
}

interface MatchedItem {
  word: string;
  context: string;
  rule: string;
}
