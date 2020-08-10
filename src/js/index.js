// GLOBAL APP CONTROLLER
import Search from './models/Search';


// GLOBAL STATE OF THE APP
// Contains:
// 1. Search Object
const state = {};

// SEARCH CONTROLLER

async function controlSearch() {
    // state.search = new Search('spiders');

    try {
        await state.search.getResults();
        console.log(state.search.result);
    }
    catch(error) {
        alert('Error processing search request.');
    }

}

controlSearch();

