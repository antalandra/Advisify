// GLOBAL APP CONTROLLER
import Search from './models/Search';
import Advice from './models/Advice';
import * as searchView from './views/searchView';
import { renderLoader, elements, clearLoader } from './views/base';


// GLOBAL STATE OF THE APP
// Contains:
// 1. Search Object
const state = {};

// SEARCH CONTROLLER

async function controlSearch() {
    // Getting input query from interface i.e. searchView
    const query = searchView.getInput();

    if (query) 
    {
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
            
        }
        catch (error) {
            // Clearing the loader
            clearLoader();
            console.log('Error processing search request.');
            console.log(error);
        }
    }    

}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();

});

