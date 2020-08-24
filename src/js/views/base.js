// REUSABLE ELEMENTS ALREADY IN DOM FOR PROJECT
export const elements = {

    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResults: document.querySelector('.results'),
    searchResultsList: document.querySelector('.results__list'),
    searchResArrowLeft: document.querySelector('.results__arrow--left'),
    searchResArrowRight: document.querySelector('.results__arrow--right'),
    adviceElement: document.querySelector('.advice'),
    adviceElementButtons: document.querySelector('.advice__buttons'),
    likes: document.querySelector('.likes'),
    likesButton: document.querySelector('.likes__icon'),
    likesPanel: document.querySelector('.likes__panel'),
    likesList: document.querySelector('.likes__list')
};

// REUSABLE ELEMENTS NOT ALREADY IN DOM
export const elementStrings = {
    loader: 'loader',
    searchResButton: 'results__arrow--button',
    adviceResult: 'results__link',
    adviceResultTag: 'results__link--tag',
    adviceParagraph: 'advice__paragraph',
    adviceButton: 'advice--btns',
    adviceHeartIcon: 'advice__button--heart',
    adviceHeartImg: 'advice__img--heart',
    adviceCopyIcon: 'advice__button--copy',
    adviceExportIcon: 'advice__button--export',
    likeLink: 'likes__link--li',
    likeLinkTag: 'likes__link'
};


// RENDERING THE LOADER IMAGE FOR WAITING FOR RESULTS
export const renderLoader = parent => {
    const loader = `<div class="${elementStrings.loader}">
                        <img src="img/reload-outline.png">
                    </div>`;
    parent.insertAdjacentHTML('afterbegin', loader);

};

// REMOVING LOADER IMAGE
export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};

export const highlightSelected = (listElement, aTag, id) => {
  // Removing highlight which existed previously in the DOM elements
  removeExistingHighlight(listElement);
   // Adding highlight to the correct item if found in the list above the advice div
  highlightCorrespondingItem(aTag, id);
}

const removeExistingHighlight = itemClass => {
    // Getting an array of advice elements from results with corresponding class
    const resultsArray = Array.from(
    document.querySelectorAll(`.${itemClass}`)
    );
    // Removing active class from advice elements i.e. highlight
    resultsArray.forEach(el => {
    el.classList.remove("results__link--active");
    });
};

const highlightCorrespondingItem = (itemClass, id) => {
    // Finding advice element result with corresponding id
  const linkElements = Array.from(document.querySelectorAll(`.${itemClass}`));
  const element = linkElements.filter(el => el.getAttribute("href").replace('#', '') === id)[0];
  if (element) {
    const parent = element.parentElement;
      // Highlighting parent element if found in results list of advices
    if (parent) {
      parent.classList.add("results__link--active");
    }
    
  }
};