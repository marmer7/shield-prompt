const defaultState: State = {
  wordCount: 0,
  tokenCount: 0,
  words: [],
  matchedWords: [],
  customList: ["example"],
  ignoredWords: [],
  settings: {
    autoCorrect: false,
  },
};

let state: State = { ...defaultState };

function setState(newState: Partial<State>) {
  state = { ...state, ...newState };
}

function getState(): State {
  return state;
}

function resetState() {
  state = { ...defaultState };
}

export { setState, getState, resetState };
