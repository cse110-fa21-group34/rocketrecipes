const COMMUNITY_RECIPE_URL = 'https://raw.githubusercontent.com/cse110-fa21-group34/rocketrecipes/main/root/scraper/recipes.json';
const LOCAL_STORAGE_ALL_RECIPES_KEY = 'allRecipes';
let allRecipes = {};

function createRecommendedRecipes() {
  // fetch data for recommended recipes
  // manually fetching for now until the backend functions are done
  // fetch div for recommended recipes
  const recommendedRecipeContainer = document.getElementById('recommendedRecipeContainer');
  recommendedRecipeContainer.style.display = 'flex';
  recommendedRecipeContainer.style.maxWidth = '100%';
  recommendedRecipeContainer.style.flexWrap = 'wrap';

  const randomNumber = Math.floor(Math.random() * (allRecipes.length - 5));

  for (let i = 0; i < 4; i += 1) {
    const recipeCard = document.createElement('recipe-card');
    recipeCard.data = allRecipes[randomNumber + i];

    recommendedRecipeContainer.appendChild(recipeCard);
  }
}

async function getAllRecipes() {
  if (localStorage.getItem(LOCAL_STORAGE_ALL_RECIPES_KEY) !== null) {
    const localStorageRecipes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ALL_RECIPES_KEY));
    return localStorageRecipes;
  }
  const fetchedRecipes = await fetch(COMMUNITY_RECIPE_URL)
    .then((response) => response.json())
    .then((data) => data);

  localStorage.setItem(LOCAL_STORAGE_ALL_RECIPES_KEY, JSON.stringify(fetchedRecipes));
  return fetchedRecipes;
}

async function init() {
  allRecipes = await getAllRecipes();
  createRecommendedRecipes();
}

window.addEventListener('DOMContentLoaded', init);
