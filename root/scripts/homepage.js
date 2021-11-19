// this is temporary until we figure out how to fetch the data
const COMMUNITY_RECIPE_URL = 'https://raw.githubusercontent.com/cse110-fa21-group34/rocketrecipes/main/root/scraper/recipes.json';
const LOCAL_STORAGE_RECIPE_KEY = 'localRecipes';
let communityRecipes = {};
let localRecipes = {};
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

async function getCommunityRecipes() {
  return fetch(COMMUNITY_RECIPE_URL)
    .then((response) => response.json())
    .then((data) => data);
}

function getLocalRecipes() {
  return localStorage.getItem(LOCAL_STORAGE_RECIPE_KEY);
}

async function init() {
  communityRecipes = await getCommunityRecipes();
  localRecipes = getLocalRecipes();

  if (localRecipes) {
    allRecipes = communityRecipes.concat(JSON.parse(localRecipes));
  } else {
    allRecipes = communityRecipes;
  }
  createRecommendedRecipes();
}

window.addEventListener('DOMContentLoaded', init);
