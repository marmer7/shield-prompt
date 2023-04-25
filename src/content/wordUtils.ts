function getWords(textValue: string): string[] {
  return textValue
    .trim()
    .split(" ")
    .filter((word) => word);
}

function isInWordList(
  word: string,
  wordList: string[]
): { isMatch: boolean; rule?: string } {
  const sanitizedWord = word.toLowerCase().trim(); // Sanitize the word
  const isMatch = wordList.includes(sanitizedWord);
  return {
    isMatch,
    rule: isMatch ? "Custom Word List" : undefined,
  };
}

function getMatchedWords(
  words: string[],
  matchFunction: (
    word: string,
    ...args: any[]
  ) => { isMatch: boolean; rule?: string },
  contextLength = 1,
  maxNgram = 4,
  ...matchFunctionArgs: any[]
) {
  const checkedIndexes = new Set<number>();
  const matches = [];

  for (let n = maxNgram; n >= 1; n--) {
    for (let i = 0; i <= words.length - n; i++) {
      if (checkedIndexes.has(i)) {
        continue; // Skip the iteration if the index has already been matched in a larger n-gram
      }

      const ngramWords = words.slice(i, i + n);
      const ngram = ngramWords.join(" ");
      const matchResult = matchFunction(ngram, ...matchFunctionArgs);
      if (matchResult.isMatch) {
        const contextStart = Math.max(0, i - contextLength);
        const contextEnd = Math.min(words.length, i + n + contextLength);
        const context = words.slice(contextStart, contextEnd).join(" ");
        matches.push({
          word: ngram,
          context,
          rule: matchResult.rule,
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

function matchedWordsList(
  matchedWords: { word: string; context: string; rule: string }[]
) {
  return matchedWords
    .map(
      (item, index) =>
        `<div class="item">
            <div class="context">- ${item.context.replace(
              item.word,
              `<span class="matched-word">${item.word} (${item.rule})</span>`
            )}... </div>
            <div class="actions">
              <span id="good-${index}" class="action good">Looks Good.</span>
              <span id="bad-${index}" class="action bad">Mask.</span>
            </div>
          </div>`
    )
    .join("");
}

export { isInWordList, getWords, getMatchedWords, matchedWordsList };
