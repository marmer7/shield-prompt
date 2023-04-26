import { getStateFromBackground, setStateInBackground } from "./state";

export async function addButtonListeners(
  matchedWords: MatchedItem[],
  textareaElement: HTMLTextAreaElement,
  updateCallback: UpdateAnalysisFunction
) {
  const currentState = await getStateFromBackground();
  const wordList = currentState.customList || [];
  const ignoredWords = currentState.ignoredWords || [];

  matchedWords.forEach((item, index) => {
    const goodButton = document.getElementById(`good-${index}`);
    const badButton = document.getElementById(`bad-${index}`);

    if (goodButton) {
      goodButton.addEventListener("click", async () => {
        ignoredWords.push(item.word);
        await setStateInBackground({ ignoredWords });
        updateCallback(textareaElement, wordList, ignoredWords);
      });
    }

    if (badButton) {
      badButton.addEventListener("click", () => {
        const maskedText = item.maskingRule
          ? item.maskingRule.mask(item.word)
          : item.word.replace(/./g, "*");
        textareaElement.value = textareaElement.value.replace(
          item.word,
          maskedText
        );
        updateCallback(textareaElement, wordList, ignoredWords);
      });
    }
  });
}
