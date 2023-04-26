import "./styles.css";
import { updateAnalysis } from "./analysis/analysis";
import { getStateFromBackground, setStateInBackground } from "../content/state";
import { resetAnalysisState } from "./analysis/analysis";

const wordList = ["custom", "word", "example", "list"];

async function handleInput(textareaElement: HTMLTextAreaElement) {
  updateAnalysis(textareaElement);
}

function insertMainDiv() {
  const divElement = document.createElement("div");
  divElement.setAttribute("id", "shield-prompt-modal");
  const targetDiv = document.querySelector("div.absolute.bottom-0");
  targetDiv?.appendChild(divElement);
}
async function initialize() {
  //   const currentState = await getStateFromBackground();
  const textareaElement = document.querySelector("textarea");
  const formElement = textareaElement?.closest("form");

  const divElement = document.createElement("div");
  divElement.setAttribute("id", "shield-prompt-modal");

  if (textareaElement && formElement) {
    textareaElement.addEventListener("input", () =>
      handleInput(textareaElement)
    );

    formElement.addEventListener("submit", async (e: Event) => {
      e.preventDefault(); // prevent default form submission behavior
      await resetAnalysisState(textareaElement);
    });

    textareaElement.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); // prevent default behavior of inserting newline character
        formElement?.dispatchEvent(new Event("submit")); // submit the form programmatically
      }
    });

    const targetDiv = document.querySelector("div.absolute.bottom-0");
    targetDiv?.appendChild(divElement);

    updateAnalysis(textareaElement);
  }
}

initialize();
