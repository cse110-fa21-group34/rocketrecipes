import { getAllRecipes } from './utils.js';

let favoriteRecipes = {};
let myRecipes = {};

function createFavoriteRecipes(){
    const Favorite = document.getElementById('Favorite');
    Favorite.style.display = 'flex';
    Favorite.style.maxWidth = '100%';
    Favorite.style.flexWrap = 'wrap';

    for (let i = 0; i < 4; i += 1) {
        const recipeCard = document.createElement('recipe-card');
        recipeCard.data = favoriteRecipes[i];
        Favorite.appendChild(recipeCard);
    }
}

function createMyRecipes(){
    const foodList = document.getElementById('foodList');
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
    myRecipes = await getFavoriteRecipes();
    favoriteRecipes = await getMyRecipes();
    createRecommendedRecipes();
  }
  
window.addEventListener('DOMContentLoaded', init);
  