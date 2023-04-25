import { getState, setState } from "./state";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getState") {
    sendResponse(getState());
  } else if (request.action === "setState") {
    setState(request.newState);
    sendResponse(getState());
  }
});
