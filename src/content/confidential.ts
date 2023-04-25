import { maskingRules } from "./maskingRules";

export function isConfidential(word: string): {
  isMatch: boolean;
  rule?: string;
} {
  const matchingRule = maskingRules.find((rule) => rule.validator_func(word));
  return {
    isMatch: !!matchingRule,
    rule: matchingRule ? matchingRule.name : undefined,
  };
}

// Deprecated. Replaced by getMatchedWords
export function getConfidentialMatches(
  words: string[],
  contextLength = 2,
  maxNgram = 4
) {
  const checkedIndexes = new Set<number>();
  const matches = [];

  for (let n = maxNgram; n >= 1; n--) {
    for (let i = 0; i <= words.length - n; i++) {
      const ngramWords = words.slice(i, i + n);
      const ngram = ngramWords.join(" ");
      const maskingRule = isConfidential(ngram);
      if (maskingRule) {
        const contextStart = Math.max(0, i - contextLength);
        const contextEnd = Math.min(words.length, i + n + contextLength);
        const context = words.slice(contextStart, contextEnd).join(" ");
        matches.push({
          word: ngram,
          context,
          maskingRule,
        });

        // Remove the matched n-gram indexes to avoid duplicate or partial matches
        for (let j = i; j < i + n; j++) {
          checkedIndexes.add(j);
        }
      }
    }
  }

  return matches;
}
