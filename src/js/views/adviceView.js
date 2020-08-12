// ADVICE BOX INTERFACE LINK

// Imports
import { elements, elementStrings } from "./base";
import { limitAdviceText } from "./searchView";

// Clearing the advice text in the advice element box
const clearAdviceText = () => {
  if (elementStrings.adviceParagraph) {
    elements.adviceElement.removeChild(elementStrings.adviceParagraph);
  }
};

// Clearing the icon buttons in the advice element box
const clearAdviceButtons = () => {
  elements.adviceElementButtons.innerHTML = "";
};

// Clearing the elements of the advice element box at bottom of container
export const clearAdviceElement = () => {
  //clearAdviceText();
  clearAdviceButtons();
};

const addBottomBorder = () => {
  elements.adviceElement.style.borderBottomStyle = "solid";
};

// CREATING P ELEMENT WITH THE TEXT OF THE ADVICE
const createAdviceText = (adviceText) =>
  `<p class=${elementStrings.adviceParagraph}>${limitAdviceText(adviceText,92)}<p>`;

// CREATING THE ADVICE BUTTONS SHOWN IN THE ADVICE ELEMENT
const createAdviceButtons = () =>
  `<button class="advice--btns ${elementStrings.adviceHeartIcon}">
        <img src="img/heart-outline.png"/>
        </button>
        <button class="advice--btns ${elementStrings.adviceCopyIcon}">
            <img src="img/copy-outline.png"/>
        </button>
        <button class="advice--btns ${elementStrings.adviceExportIcon}">
            <img src="img/download-outline.png"/>
        </button>`;

// RENDERING ADVICE ELEMENT
export const renderAdviceElement = (adviceText) => {
  const pElement = createAdviceText(adviceText);
  elements.adviceElement.insertAdjacentHTML("afterbegin", pElement);

  const buttons = createAdviceButtons();
  elements.adviceElementButtons.insertAdjacentHTML("afterbegin", buttons);

  addBottomBorder();
};
