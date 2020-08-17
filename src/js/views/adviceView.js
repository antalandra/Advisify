// ADVICE BOX INTERFACE LINK

// Imports
import { elements, elementStrings } from "./base";
import { limitAdviceText } from "./searchView";

// CLEARING THE ADVICE TEXT IN THE ADVICE ELEMENT BOX
const clearAdviceText = adviceTextP => {
  elements.adviceElement.removeChild(adviceTextP);
};

// CLEARING THE ICON BUTTONS IN THE ADVICE ELEMENT BOX
const clearAdviceButtons = () => {
  elements.adviceElementButtons.innerHTML = "";
};

// CLEARING THE TOP BORDER FROM THE ADVICE ELEMENT BOX
export const removeAdviceTopBorder = () => {
  elements.adviceElement.style.borderTopStyle = "none";
}

// CLEARING THE ELEMENTS OF THE ADVICE ELEMENT BOX AT BOTTOM OF CONTAINER
export const clearAdviceElement = adviceTextP => {
  clearAdviceText(adviceTextP);
  clearAdviceButtons();
  // Removing extra padding that might have been added due to letter count in advice text
  elements.adviceElement.style.paddingTop = "0px";
  // Removing top border in case it has been added
  elements.adviceElement.style.borderTopStyle = "none";
};

const addAdviceBottomBorder = () => {
  elements.adviceElement.style.borderBottomStyle = "solid";
};

export const addAdviceTopBorder = () => {
  elements.adviceElement.style.borderTopStyle = "solid";
};

const addExtraPadding = adviceText => {
  if (adviceText.length <= 50) {
    elements.adviceElement.style.paddingTop = "37px";
  }
};

// CREATING P ELEMENT WITH THE TEXT OF THE ADVICE
const createAdviceText = (adviceText) =>
  `<p class=${elementStrings.adviceParagraph}>${limitAdviceText(adviceText,100)}<p>`;

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

  addExtraPadding(adviceText);

  const buttons = createAdviceButtons();
  elements.adviceElementButtons.insertAdjacentHTML("afterbegin", buttons);

  addAdviceBottomBorder();
};
