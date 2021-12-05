// eslint-disable-next-line import/extensions
import { getAllRecipes } from './utils.js';

let allRecipes = {};

function createRecommendedRecipes() {
  // fetch data for recommended recipes
  // manually fetching for now until the backend functions are done
  // fetch div for recommended recipes
  const recommendedRecipeContainer = document.getElementById('recommendedRecipeContainer');

  const randomNumber = Math.floor(Math.random() * (allRecipes.length - 5));

  for (let i = 0; i < 4; i += 1) {
    const recipeCard = document.createElement('recipe-card');
    recipeCard.data = allRecipes[randomNumber + i];

    recommendedRecipeContainer.appendChild(recipeCard);
  }
}

async function init() {
  allRecipes = await getAllRecipes();
  createRecommendedRecipes();
}

window.addEventListener('DOMContentLoaded', init);
