// GLOBAL APP CONTROLLER
import Search from "./models/Search";
import Advice from "./models/Advice";
import * as searchView from "./views/searchView";
import * as adviceView from "./views/adviceView";
import {
  renderLoader,
  elements,
  clearLoader,
  elementStrings,
} from "./views/base";

// GLOBAL STATE OF THE APP
// Contains:
// 1. Search Object
const state = {};

// SEARCH CONTROLLER

const controlSearch = async () => {
  // Getting input query from interface i.e. searchView
  const query = searchView.getInput();

  if (query) {
    // Creating a new Search object
    state.search = new Search(query);

    // Preparing UI for results
    searchView.clearInput();
    searchView.clearResults();

    // Rendering loading spinner
    renderLoader(elements.searchResults);

    try {
      // Requesting the advice results based on the query
      await state.search.getResults();

      // Removing loading spinner
      clearLoader();

      // Rendering results on the UI
      searchView.renderResults(state.search.result);
    } catch (error) {
      // Clearing the loader
      clearLoader();
      console.log("Error processing search request.");
      console.log(error);
    }
  }
}

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

const renderPaginationResults = (el) => {
  // Using Event Delegation to get the button
  const btn = el.target.closest(`.${elementStrings.searchResButton}`);
  if (btn) {
    // Getting the page button points to
    const goToPage = parseInt(btn.dataset.goto, 10);
    // Clearing the result items currently in the container and any extra buttons
    searchView.clearResults();
    // Rendering the results on the page the button points to
    searchView.renderResults(state.search.result, goToPage);
  }
};

elements.searchResArrowRight.addEventListener("click", renderPaginationResults);
elements.searchResArrowLeft.addEventListener("click", renderPaginationResults);


// ADVICE ELEMENT CONTROLLER

const controlAdvice = async () => {
    // Getting the ID from the url when it changes in the link
    const id = window.location.hash.replace('#', '');
    if (id) {
        // Creating an Advice Object
        state.advice = new Advice(id);

        // Clearing previous advice content in preparation for new UI Advice element
         adviceView.clearAdviceElement();

        try {

            // Calling API request by id method to retrieve Advice Slip
            await state.advice.getAdvice();
           
            // Rendering the advice element content
            adviceView.renderAdviceElement(state.advice.text);
            // Highlighting the advice result item if present in the list
            searchView.highlightSelected(id);
        }
        // Handling errors
        catch(err){
            console.log('An error has occured while retrieving Advice info. See console.');
            console.log(err);
        }
    }
    
} 

// , 'load'
['hashchange'].forEach(event => window.addEventListener(event, controlAdvice));