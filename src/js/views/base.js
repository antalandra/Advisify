// REUSABLE ELEMENTS ALREADY IN DOM FOR PROJECT
export const elements = {

    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResults: document.querySelector('.results'),
    searchResultsList: document.querySelector('.results__list'),
    searchResArrowLeft: document.querySelector('.results__arrow--left'),
    searchResArrowRight: document.querySelector('.results__arrow--right')
    
    
};

// REUSABLE ELEMENTS NOT ALREADY IN DOM
export const elementStrings = {
    loader: 'loader',
    searchResButton: 'results__arrow--button',
    adviceResult: 'results__link'
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

