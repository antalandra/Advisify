// GLOBAL APP CONTROLLER
import Search from "./models/Search";
import Advice from "./models/Advice";
import Likes from "./models/Likes";
import * as searchView from "./views/searchView";
import * as adviceView from "./views/adviceView";
import * as likesView from "./views/likesView";
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
      state.numOfAdviceResPeronPage = searchView.renderResults(state.search.result);

      if(state.numOfAdviceResPeronPage === 5) 
      {
        // Removing top border on advice element when 5 results are shown on page
        adviceView.removeAdviceTopBorder();
        console.log('removing top border for 5 === results');
      }
      else if (state.numOfAdviceResPeronPage < 5)
      {
        // Adding top border on advice element if there are less than 5 elements on page
        adviceView.addAdviceTopBorder();
      }

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
    state.numOfAdviceResPeronPage = searchView.renderResults(state.search.result, goToPage);

    // Getting the ID from the url when it changes in the link
    const id = window.location.hash.replace('#', '');
    // Highlighting the advice result item if present in the list
    if (id) searchView.highlightSelectedAdvice(id);

    if (state.numOfAdviceResPeronPage < 5 && state.advice)
    {
      adviceView.addAdviceTopBorder();
    }
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

        const adviceTextP = document.querySelector(`.${elementStrings.adviceParagraph}`);

        if (adviceTextP)
        {
          // Clearing previous advice content in preparation for new UI Advice element
          adviceView.clearAdviceElement(adviceTextP);
        }

        try {

            // Calling API request by id method to retrieve Advice Slip
            await state.advice.getAdvice();
           
            // Rendering the advice element content
            adviceView.renderAdviceElement(state.advice.text);

            if(state.likes){
              // Toggling heart icon button when rendering advice whether isLiked === true || false
              likesView.toggleHeartIcon(state.likes.isLiked(id));
              // Highlighting selected like element
              likesView.highlightSelectedLike(id);
            }
            
            // Highlighting the advice result item if present in the list
            searchView.highlightSelectedAdvice(id);

            // Checking to see if there are < 5 elements in the search result list
            if (state.numOfAdviceResPeronPage < 5 || state.numOfAdviceResPeronPage === 0) {
              console.log(state.search.result.length);
              adviceView.addAdviceTopBorder();
            }
        }
        // Handling errors
        catch(err){
            console.log('An error has occured while retrieving Advice info. See console.');
            console.log(err);
            adviceView.removeAdviceTopBorder();
            console.log('removing top border when error retrieving advice occured');
        }
    }
    else{
      adviceView.removeAdviceTopBorder();
      console.log('We reached else to remove top border for some weird reason');
    }
    
} 

['load', 'hashchange'].forEach(event => window.addEventListener(event, controlAdvice));

// LIKES PANEL CONTROLLER

const controlLikes = () => {
    // Creating a likes object if no objects in local storage
    if (!state.likes) state.likes = new Likes();

    // Getting the ID of the advice element currently shown in container
    const currentID = state.advice.adviceID;

    // Checking if the advice element currently in container was added to likes list
    if(!state.likes.isLiked(currentID))
    {
      // Adding advice element to liked list when it wasn't liked before
      const newLike = state.likes.addLikedAdvice(currentID, state.advice.text);
      console.log('newLike added: ' + newLike);
      // Toggling the like button
      likesView.toggleHeartIcon(true);
      // Rendering the new advice element in the likes panel
      likesView.renderLikeElement(newLike);
    }
    else{
      // Deleting advice element from liked list if it was already liked
      state.likes.deleteLikedAdvice(currentID);
      // Toggling the like button
      likesView.toggleHeartIcon(false);
      // Removing the like element from the interface likes panel
      likesView.deleteLikeElement(currentID);
    }

    // Toggling like panel based on number of liked advice elements
    likesView.toggleLikePanel(state.likes.getNumLikes());

    // Highlighting selected like element
    likesView.highlightSelectedLike(currentID);

};

// RESTORING LIKED ADVICES ON PAGE LOAD
window.addEventListener('load', () => {
  // Initialising likes object
  state.likes = new Likes();

  // Reading from local storage and and initialising likes array with any existing liked advice elements
  state.likes.readStorage();

  // Toggling the like panel based on whether there are liked advices stored in localStorage
  likesView.toggleLikePanel(state.likes.getNumLikes());
 
  // Rendering every liked advice element in the likes panel if existing
  state.likes.likes.forEach(like => {
    likesView.renderLikeElement(like);
  });
});


// HANDLING ADVICE ELEMENT BUTTON CLICKS USING EVENT DELEGATION
  elements.adviceElement.addEventListener('click', el => {
  
    if (el.target.matches('.advice--btns, .advice__button--heart, .advice__img--heart')){
      controlLikes();
    }
    else if (el.target.matches(`.${elementStrings.adviceCopyIcon}`)){

    } 
    else if (el.target.matches(`.${elementStrings.adviceExportIcon}`)){

    } else{
      return;
    }
});