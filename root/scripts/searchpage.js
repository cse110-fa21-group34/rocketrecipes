// eslint-disable-next-line import/extensions
import { search } from './utils.js';

// takes the current recipe object and fills the html of the page with
// the information within it
function fillSearchPage(searchResults) {
  if (searchResults.length === 0) {
    // no results
  } else {
    const searchResultsContainer = document.getElementById('search-results-container');
    searchResultsContainer.style.display = 'flex';
    searchResultsContainer.style.maxWidth = '100%';
    searchResultsContainer.style.justifyContent = 'center';
    searchResultsContainer.style.flexWrap = 'wrap';

    searchResults.forEach((recipe) => {
      const recipeCard = document.createElement('recipe-card');
      recipeCard.data = recipe;

      searchResultsContainer.appendChild(recipeCard);
    });
  }
}

async function init() {
  const queryString = window.location.search;

  const searchParams = new URLSearchParams(queryString);
  const searchQuery = searchParams.get('searchQuery');

  if (searchQuery === null) {
    // handle bad request
    // show empty page with note that we can't find that id
  } else {
    const searchedRecipes = await search(searchQuery, []);
    fillSearchPage(searchedRecipes);
  }
}

window.addEventListener('DOMContentLoaded', init);
