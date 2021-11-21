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

//   const recipeTitleElement = document.getElementById('recipe-title');
//   recipeTitleElement.innerText = currentRecipe.title;

//   const recipeImageElement = document.getElementById('recipe-image');
//   recipeImageElement.src = currentRecipe.image;

//   const recipeYieldlement = document.getElementById('yield');
//   recipeYieldlement.innerText = currentRecipe.servings;

//   const recipeTimeElement = document.getElementById('time');
//   recipeTimeElement.innerText = `${currentRecipe.readyInMinutes} minutes`;

//   // add categories
//   // Create tag buttons based on these tag properties
//   const tagProperties = [
//     { id: 'cheap', name: 'Cheap' },
//     { id: 'dairyFree', name: 'Dairy Free' },
//     { id: 'fiveIngredientsOrLess', name: 'Easy' },
//     { id: 'glutenFree', name: 'Gluten Free' },
//     { id: 'quickEat', name: 'Quick Eat' },
//     { id: 'vegan', name: 'Vegan' },
//     { id: 'vegetarian', name: 'Vegetarian' },
//   ];

//   const categoryArray = [];
//   const categoriesElement = document.getElementById('categories');
//   tagProperties.forEach((tag) => {
//     if (currentRecipe[tag.id] === true) {
//       categoryArray.push(tag.name);
//     }
//   });
//   categoriesElement.innerText = `Categories: ${categoryArray.join(', ')}`;

//   const recipeInstructionsElement = document.getElementById('instructions-list');
//   currentRecipe.steps.forEach((step) => {
//     // create new ingredient li
//     const currentIngredientLi = document.createElement('li');
//     currentIngredientLi.innerText = `${step.step}`;
//     recipeInstructionsElement.appendChild(currentIngredientLi);
//   });

//   const recipeIngredientsElement = document.getElementById('ingredients-list');
//   currentRecipe.ingredients.forEach((ingredient) => {
//     // create new ingredient li
//     const currentIngredientLi = document.createElement('li');
//     currentIngredientLi.innerText = `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`;
//     recipeIngredientsElement.appendChild(currentIngredientLi);
//   });

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
