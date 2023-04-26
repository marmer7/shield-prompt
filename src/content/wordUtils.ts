import { getMaskingRule, maskingRules } from "./maskingRules";

function getWords(textValue: string): string[] {
  return textValue
    .trim()
    .split(" ")
    .filter((word) => word);
}

function isInWordList(word: string, wordList: string[]): isMatchedItem {
  const sanitizedWord = word.toLowerCase().trim(); // Sanitize the word
  const isMatch = wordList.includes(sanitizedWord);
  const maskingRule = getMaskingRule("custom") as MaskingRule;
  return {
    isMatch,
    maskingRule,
  };
}

export function isConfidential(word: string): isMatchedItem {
  const maskingRule = maskingRules.find((rule) =>
    rule.validator_func(word)
  ) as MaskingRule;
  return {
    isMatch: !!maskingRule,
    maskingRule: maskingRule,
  };
}

function getMatchedWords(
  words: string[],
  matchFunctions: MatchFunction[],
  contextLength = 1,
  maxNgram = 4,
  ignoredWords: string[] = []
): MatchedItem[] {
  const checkedIndexes = new Set<number>();
  const matches = [];
  const ignoredWordsSet = new Set(ignoredWords);

  for (let n = maxNgram; n >= 1; n--) {
    for (let i = 0; i <= words.length - n; i++) {
      if (checkedIndexes.has(i)) {
        continue; // Skip the iteration if the index has already been matched in a larger n-gram
      }

      const ngramWords = words.slice(i, i + n);
      const ngram = ngramWords.join(" ");

      for (const matchFunction of matchFunctions) {
        if (ignoredWordsSet.has(ngram)) {
          continue; // Skip the iteration if the word is in the ignored words list
        }
        const matchResult = matchFunction(ngram);
        if (matchResult.isMatch) {
          const contextStart = Math.max(0, i - contextLength);
          const contextEnd = Math.min(words.length, i + n + contextLength);
          const context = words.slice(contextStart, contextEnd).join(" ");
          matches.push({
            startIndex: i,
            ngramLength: n,
            word: ngram,
            context,
            maskingRule: matchResult.maskingRule,
          });

          // Remove the matched n-gram indexes to avoid duplicate or partial matches
          for (let j = i; j < i + n; j++) {
            checkedIndexes.add(j);
          }

          // Break out of the loop once a match is found, to prevent duplicate matches from different functions
          break;
        }
      }
    }
  }

  return matches;
}

function createIsInWordListFunction(wordList: string[]): MatchFunction {
  return (word: string) => isInWordList(word, wordList);
}

function unicodeToEmoji(unicode: string): string {
  const codePointHex = unicode.replace("U+", "");
  const codePointDecimal = parseInt(codePointHex, 16);
  return String.fromCodePoint(codePointDecimal);
}

export {
  createIsInWordListFunction,
  isInWordList,
  getWords,
  getMatchedWords,
  unicodeToEmoji,
};
