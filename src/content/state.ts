function getStateFromBackground(): Promise<State> {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: "getState" }, (response) => {
      resolve(response);
    });
  });
}

function setStateInBackground(newState: Partial<State>): Promise<State> {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: "setState", newState }, (response) => {
      resolve(response);
    });
  });
}

export { getStateFromBackground, setStateInBackground };
