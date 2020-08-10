// SEARCH INTERFACE LINK

// Imports
import { elements, elementStrings } from './base';

// ACCESSING INPUT FROM THE SEARCH BOX INPUT
export const getInput = () => elements.searchInput.value;

// CLEARING INPUT IN THE SEARCH BOX
export const clearInput = () => {
    elements.searchInput.value = '';
}

// CLEARING RESULTS FROM PREVIOUS SEARCHES
export const clearResults = () => {
    elements.searchResultsList.innerHTML = '';
}

// HIGHLIGHTING SELECTED ELEMENT IN THE RESULTS LIST OF ADVICES
export const highlightSelected = id => {
    // Getting an array of advice elements from results with corresponding class
    const adviceResultsArray = Array.from(document.querySelectorAll(`.${elementStrings.adviceResult}`));
    // Removing active class from advice elements i.e. highlight
    adviceResultsArray.forEach( el => {
        el.classList.remove('results__link--active');
    });
    // Finding advice element result with corresponding id
    const adviceElement = document.querySelector(`.${elementStrings.adviceResult}[href="#${id}]`);
    // Highlighting advice element if found in results list of advices
    if (adviceElement) adviceElement.classList.add('results__link--active');
;}


// LIMITING ADVICE TEXT TO 88 CHARACTERS IN THE RESULTS LIST
export const limitAdviceText = (text, limit = 88) => {
    const newAdviceText = [];
    if (text.length > limit){
        text.split(' ').reduce((acc, curr) => {
            if (acc + curr.length <= limit) {
                newAdviceText.push(curr);
            }
            return acc + curr.length;
        }, 0);

        return `${newAdviceText.join(' ')} ...`;
    }
    return text;
};

// CREATING AND INJECTING THE ADVICE ELEMENT IN THE LIST
const renderAdvice = advice => {
    const markup =  `<li class="results__link">
                        <a href="#${advice.id}">
                            <div class="results__data">
                                <h2 class="advice__string">${limitAdviceText(advice.advice)}</h2>
                            </div>
                        </a>   
                    </li>`;
    elements.searchResultsList.insertAdjacentHTML('beforeend', markup);
};

// CREATING BUTTONS BASED ON THE PAGE NUMBER AND TYPE
const createButton = (pageNum, type) => 
`<div class="${elements.searchResArrows} results__arrow--${type}">
    <button class="${elements.searchResButton}" 
    data-goto${type === 'left' ? pageNum - 1 : pageNum + 1}>
        <img src="img/icons8-arrow-${type === 'left' ? 'left' : 'right'}.png">
    </button> 
</div>
`;

// RENDERING BUTTONS ACCORDING TO PAGE NUMBER
const renderButtons = (page, numResults, resPerPage) => {
    const numOfPages = Math.ceil(numResults / resPerPage);

    let button1, button2, flag;
    // On first page of many
    if ( page === 1 && pages > 1) {
        // Button should go to next page
        button1 = createButton(page, 'right');
        flag = 1;
    } 
    // In between the pages
    else if (page < pages ) { 
        // Show both buttons
        button1 = `${createButton(page, 'left')}`;
        button2 = `${createButton(page, 'right')}`;
        flag = 2;
    } 
    // On last page
    else {
        // Show only left button
        button1 = `${createButton(page, 'left')}`;
        flag = 1;
    }

    if (flag === 1)
    {
        elements.searchResults.insertAdjacentHTML('afterbegin', button1)
    } else {
        elements.searchResults.insertAdjacentHTML('afterbegin', button2)
        elements.searchResults.insertAdjacentHTML('afterbegin', button1)
    }

}

// RENDERING 5 ADVICES PER PAGE, ACCORDING TO THE PAGE WE'RE ON
export const renderResults = (advices, page = 1, resPerPage = 5) => {
    // Rendering the results of the current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    advices.slice(start, end).forEach(renderAdvice);

    // Rendering page buttons
    renderButtons(page, advices.length, resPerPage);
};