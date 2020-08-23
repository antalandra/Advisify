// SEARCH INTERFACE LINK

// Imports
import { elements, elementStrings, removeExistingHighlight, highlightCorrespondingItem } from "./base";

// ACCESSING INPUT FROM THE SEARCH BOX INPUT
export const getInput = () => elements.searchInput.value;

// CLEARING INPUT IN THE SEARCH BOX
export const clearInput = () => {
  elements.searchInput.value = "";
};

// CLEARING RESULTS FROM PREVIOUS SEARCHES
export const clearResults = () => {
  elements.searchResultsList.innerHTML = '';
  elements.searchResArrowLeft.innerHTML = '';
  elements.searchResArrowRight.innerHTML = '';
};

// HIGHLIGHTING SELECTED ELEMENT IN THE RESULTS LIST OF ADVICES
export const highlightSelectedAdvice = (id) => {

  // Removing highlight which existed previously in the DOM elements
  removeExistingHighlight(elementStrings.adviceResult);
  
  // Adding highlight to the correct item if found in the list above the advice div
  highlightCorrespondingItem(elementStrings.adviceResultTag, id);
  
};

// LIMITING ADVICE TEXT TO 88 CHARACTERS IN THE RESULTS LIST
export const limitAdviceText = (text, limit = 92) => {
  const newAdviceText = [];
  if (text.length > limit) {
    text.split(" ").reduce((acc, curr) => {
      if (acc + curr.length <= limit) {
        newAdviceText.push(curr);
      }
      return acc + curr.length;
    }, 0);
    newAdviceText[newAdviceText.length-1] = newAdviceText[newAdviceText.length-1].replace('.', '');
    return `${newAdviceText.join(" ")}...`;
  }
  return text;
};

// CREATING AND INJECTING THE ADVICE ELEMENT IN THE LIST
const renderAdvice = (advice) => {
  const markup = `<li class="results__link">
                        <a href="#${advice.id}" class="results__link--tag">
                            <div class="results__data">
                                <h2 class="advice__string">${limitAdviceText(
                                  advice.advice
                                )}</h2>
                            </div>
                        </a>   
                    </li>`;
  elements.searchResultsList.insertAdjacentHTML("beforeend", markup);
};

// CREATING BUTTONS BASED ON THE PAGE NUMBER AND TYPE
const createButton = (pageNum, type) =>
  `
    <button class="${elementStrings.searchResButton}" 
    data-goto="${type === "left" ? pageNum - 1 : pageNum + 1}">
        <img src="img/icons8-arrow-${type === "left" ? "left" : "right"}.png">
    </button> 
`;

// RENDERING BUTTONS ACCORDING TO PAGE NUMBER
const renderButtons = (page, numResults, resPerPage) => {
  const numOfPages = Math.ceil(numResults / resPerPage);


  let button1, button2;
  // On first page of many

  if (numOfPages > 1) {
    if (page === 1) {
      // Button should go to next page
      button1 = createButton(page, "right");
      elements.searchResArrowRight.insertAdjacentHTML("afterbegin", button1);
    }
    // In between the pages
    else if (page < numOfPages) {
      // Show both buttons
      button2 = `${createButton(page, "left")}`;
      button1 = `${createButton(page, "right")}`;
      elements.searchResArrowRight.insertAdjacentHTML("afterbegin", button1);
      elements.searchResArrowLeft.insertAdjacentHTML("afterbegin", button2);
    }
    // On last page
    else {
      // Show only left button
      button2 = `${createButton(page, "left")}`;
      elements.searchResArrowLeft.insertAdjacentHTML("afterbegin", button2);
    }
  }
};

// Removing any possible duplicates within the advices returned
const removeDuplicates = advices => {
  let adviceMap = new Map();
  advices.forEach(advice => adviceMap.set(advice.advice, advice.id));
  let newAdviceArray = [];
  adviceMap.forEach((value, key) => {
    const adviceObject = {
      ['id']: parseInt(value, 10),
      ['advice']: key
    };
    newAdviceArray.push(adviceObject);
  });
  return newAdviceArray;
};


// RENDERING 5 ADVICES PER PAGE, ACCORDING TO THE PAGE WE'RE ON
export const renderResults = (advices, page = 1, resPerPage = 5) => {
  // Rendering the results of the current page
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  let advicesOnPage = advices.slice(start, end);

  advicesOnPage = removeDuplicates(advicesOnPage);

  advicesOnPage.forEach(renderAdvice);
  console.log(advicesOnPage);

  // Rendering page buttons
  renderButtons(page, advices.length, resPerPage);

  return advicesOnPage.length;
};
