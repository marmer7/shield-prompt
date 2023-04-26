import { getStateFromBackground, setStateInBackground } from "../state";
import {
  getWords,
  getMatchedWords,
  isConfidential,
  createIsInWordListFunction,
} from "../wordUtils";
import { updateAnalysisHTML } from "./analysisUi";

function getAnalysis(
  textValue: string,
  wordList: string[],
  ignoredWords: string[]
): AnalysisResult {
  const words = getWords(textValue);
  const wordCount = words.length;
  const tokenCount = Math.round(textValue.length / 4);
  const matchFunctions = [createIsInWordListFunction(wordList), isConfidential];
  const matchedWords = getMatchedWords(
    words,
    matchFunctions,
    1,
    4,
    ignoredWords
  );

  return {
    wordCount,
    tokenCount,
    words,
    matchedWords,
  };
}

export async function updateAnalysis(textareaElement: HTMLTextAreaElement) {
  const currentState = await getStateFromBackground();
  const wordList = currentState.customList || [];
  const ignoredWords = currentState.ignoredWords || [];

  const textValue = textareaElement.value;
  const analysis = getAnalysis(textValue, wordList, ignoredWords);

  updateAnalysisHTML(analysis, textareaElement, () =>
    updateAnalysis(textareaElement)
  );

  setStateInBackground({ ...currentState, ...analysis });
}

export async function resetAnalysisState(textareaElement: HTMLTextAreaElement) {
  const currentState = await getStateFromBackground();
  const wordList = currentState.customList || [];
  const ignoredWords = currentState.ignoredWords || [];

  const analysis = getAnalysis("", wordList, ignoredWords);
  if (textareaElement) {
    textareaElement.value = "";
    updateAnalysisHTML(analysis, textareaElement, () =>
      updateAnalysis(textareaElement)
    );
  }
  setStateInBackground({ ...currentState, ...analysis });
}
