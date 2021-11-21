import {
  getMyRecipes, getFavoriteRecipes, readRecipe,
} from './utils.js';

let favoriteRecipes = [];
let myRecipes = [];

async function createFavoriteRecipes() {
  const Favorite = document.getElementsByClassName('FavoriteFood')[0];
  Favorite.style.display = 'flex';
  Favorite.style.maxWidth = '100%';
  Favorite.style.flexWrap = 'wrap';
  for (let i = 0; i < favoriteRecipes.length; i += 1) {
    const recipeCard = document.createElement('recipe-card');
    const rec = await readRecipe(favoriteRecipes[i]);
    recipeCard.data = rec;
    Favorite.appendChild(recipeCard);
  }
}

async function createMyRecipes() {
  const foodList = document.getElementsByClassName('foodList')[0];
  foodList.style.display = 'flex';
  foodList.style.maxWidth = '100%';
  foodList.style.flexWrap = 'wrap';

  for (let i = 0; i < 4; i += 1) {
    const recipeCard = document.createElement('recipe-card');
    recipeCard.data = myRecipes[i];
    foodList.appendChild(recipeCard);
  }
}

async function init() {
  // addFavoriteRecipe("bd23bca6a5f969c0718bef3d778b1a48");
  // addFavoriteRecipe("b1ffbdfcc516588601f4ee651b5ed684");
  favoriteRecipes = await getFavoriteRecipes();
  myRecipes = await getMyRecipes();

  createMyRecipes();
  createFavoriteRecipes();
}

window.addEventListener('DOMContentLoaded', init);
