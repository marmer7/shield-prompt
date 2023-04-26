import { addButtonListeners } from "../eventListeners";
import { unicodeToEmoji } from "../wordUtils";

export function updateAnalysisHTML(
  analysis: AnalysisResult,
  textareaElement: HTMLTextAreaElement,
  updateCallback: UpdateAnalysisFunction
) {
  const divElement = document.getElementById("shield-prompt-modal");
  if (!divElement) return;
  divElement.innerHTML = generateAnalysisHTML(
    analysis.wordCount,
    analysis.tokenCount,
    analysis.matchedWords
  );

  addButtonListeners(analysis.matchedWords, textareaElement, updateCallback);
}

function generateAnalysisHTML(
  wordCount: number,
  tokenCount: number,
  matchedWords: MatchedItem[]
) {
  const filteredMatchedWords = matchedWords.filter(
    (item) => item !== null && item.maskingRule !== undefined
  );

  return `
    <div class="analysis-summary">
      📝 Words: ${wordCount} | 🔢 Tokens: ${tokenCount}
    </div>
    ${filteredMatchedWords.length ? "<hr>" : ""}
    ${matchedWordsList(filteredMatchedWords)}
  `;
}

function matchedWordsList(matchedWords: MatchedItem[]) {
  return matchedWords
    .map((item, index) => {
      const emoji =
        item.maskingRule && item.maskingRule.unicode
          ? unicodeToEmoji(item.maskingRule.unicode)
          : "";

      return `
        <div class="item">
          <div class="context">${emoji} ${item.context.replace(
        item.word,
        `<span class="matched-word">${item.word} (${
          item.maskingRule ? item.maskingRule.displayName : "unknown"
        })</span>`
      )}</div>
          <div class="actions">
            <button id="good-${index}" class="action good">Looks Good</button>
            <button id="bad-${index}" class="action bad">Mask</button>
          </div>
        </div>`;
    })
    .join("");
}
