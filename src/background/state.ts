const defaultState: State = {
  wordCount: 0,
  offenseStats: {},
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

function updateOffenseStats(offenseKey: string, value: number) {
  state.offenseStats = {
    ...state.offenseStats,
    [offenseKey]: value,
  };
}

function resetOffenseStats() {
  state.offenseStats = {};
}

export {
  setState,
  getState,
  resetState,
  updateOffenseStats,
  resetOffenseStats,
};
