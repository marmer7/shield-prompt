import "./styles.css";
import { updateAnalysis } from "./analysis";
import { getStateFromBackground } from "../content/state";

function handleInput(textareaElement: HTMLTextAreaElement) {
  const textValue = textareaElement.value;
  updateAnalysis(textValue);
}

async function initialize() {
  const currentState = await getStateFromBackground();
  const textareaElement = document.querySelector("textarea");
  const form = textareaElement?.closest("form");

  const divElement = document.createElement("div");
  divElement.setAttribute("id", "shield-prompt-modal");

  if (textareaElement) {
    textareaElement.addEventListener("input", () =>
      handleInput(textareaElement)
    );

    const targetDiv = document.querySelector("div.absolute.bottom-0");
    // form?.appendChild(divElement);
    targetDiv?.appendChild(divElement);

    updateAnalysis(textareaElement.value);
  }
}

initialize();
