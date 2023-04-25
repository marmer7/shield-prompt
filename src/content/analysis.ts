import { getStateFromBackground, setStateInBackground } from "../content/state";
import {
  getWords,
  getMatchedWords,
  isInWordList,
  matchedWordsList,
} from "./wordUtils";
import { isConfidential } from "./confidential";
import { addMaskListeners } from "./eventListeners";

const wordList = ["example", "match", "word"]; // Add words you want to match

export async function updateAnalysis(textValue: string) {
  const words = getWords(textValue);
  const wordCount = words.length;
  const tokenCount = Math.round(textValue.length / 4);
  const matchedWords = getMatchedWords(words, isInWordList, 1, 4, wordList);
  const confidentialMatches = getMatchedWords(words, isConfidential, 1, 4);

  const currentState = await getStateFromBackground();
  //   console.log("Current word count:", currentState.wordCount);
  const newState = await setStateInBackground({ wordCount: wordCount });
  //   console.log("Updated word count:", newState.wordCount);
  // Get div by id shield-prompt-modal
  const divElement = document.getElementById("shield-prompt-modal");
  if (!divElement) return;
  divElement.innerHTML = generateAnalysisHTML(
    wordCount,
    tokenCount,
    matchedWords,
    confidentialMatches
  );

  addMaskListeners(matchedWords);
  addMaskListeners(confidentialMatches);
}

function generateAnalysisHTML(
  wordCount: number,
  tokenCount: number,
  matchedWords: ({
    word: string;
    context: string;
    rule: string | undefined;
  } | null)[],
  confidentialMatches: ({
    word: string;
    context: string;
    rule: string | undefined;
  } | null)[]
) {
  const filteredMatchedWords = matchedWords.filter((item) => item !== null) as {
    word: string;
    context: string;
    rule: string;
  }[];
  const filteredConfidentialMatches = confidentialMatches.filter(
    (item) => item !== null
  ) as { word: string; context: string; rule: string }[];

  return `
      📝 Words: ${wordCount} | 🔢 Tokens: ${tokenCount}<br>
      ${matchedWordsList(filteredMatchedWords)}
      ${filteredMatchedWords.length ? "<hr>" : ""}
      ${matchedWordsList(filteredConfidentialMatches)}
      ${filteredConfidentialMatches.length ? "<hr>" : ""}
    `;
}
