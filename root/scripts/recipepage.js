/* eslint-disable import/extensions */
import {
  readRecipe,
  addFavoriteRecipe,
  isFavorite,
  deleteFavoriteRecipe,
  getAllRecipes,
  deleteRecipe,
} from './utils.js';

// holds recipes from localStorage
let allRecipes = {};

// holds recipe ID of currently displayed recipe
let recipeId;

// takes the current recipe object and fills the html of the page with
// the information within it
function fillRecipePage(currentRecipe) {
  const recipeTitleElement = document.getElementById('recipe-title');
  recipeTitleElement.innerText = currentRecipe.title;

  const recipeImageElement = document.getElementById('recipe-image');
  recipeImageElement.src = currentRecipe.image;

  const recipeYieldlement = document.getElementById('yield');
  recipeYieldlement.innerText = currentRecipe.servings;

  const recipeTimeElement = document.getElementById('time');
  recipeTimeElement.innerText = `${currentRecipe.readyInMinutes} minutes`;

  // add categories
  // Create tag buttons based on these tag properties
  const tagProperties = [
    { id: 'cheap', name: 'Cheap' },
    { id: 'dairyFree', name: 'Dairy Free' },
    { id: 'fiveIngredientsOrLess', name: 'Easy' },
    { id: 'glutenFree', name: 'Gluten Free' },
    { id: 'quickEat', name: 'Quick Eat' },
    { id: 'vegan', name: 'Vegan' },
    { id: 'vegetarian', name: 'Vegetarian' },
  ];

  const categoryArray = [];
  const categoriesElement = document.getElementById('categories');
  tagProperties.forEach((tag) => {
    if (currentRecipe[tag.id] === true) {
      categoryArray.push(tag.name);
    }
  });
  categoriesElement.innerText = `Categories: ${categoryArray.join(', ')}`;

  const recipeInstructionsElement = document.getElementById('instructions-list');
  currentRecipe.steps.forEach((step) => {
    // create new ingredient li
    const currentIngredientLi = document.createElement('li');
    currentIngredientLi.innerText = `${step.step}`;
    recipeInstructionsElement.appendChild(currentIngredientLi);
  });

  const recipeIngredientsElement = document.getElementById('ingredients-list');
  currentRecipe.ingredients.forEach((ingredient) => {
    // create new ingredient li
    const currentIngredientLi = document.createElement('li');
    currentIngredientLi.innerText = `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`;
    recipeIngredientsElement.appendChild(currentIngredientLi);
  });
}

// grabs four random recipes from localStorage and displays them at the bottom of the page
function createRecommendedRecipes() {
  const recommendedRecipeContainer = document.getElementById('recommendedRecipeContainer');
  recommendedRecipeContainer.style.display = 'flex';
  recommendedRecipeContainer.style.maxWidth = '100%';
  recommendedRecipeContainer.style.flexWrap = 'wrap';

  let numReccRecipes = 0;
  while (numReccRecipes < 4) {
    const randomNumber = Math.floor(Math.random() * (allRecipes.length - 5));
    const recipe = allRecipes[randomNumber];

    // if current id does not match random recipe id, create recipe card
    if (recipeId !== recipe.id) {
      const recipeCard = document.createElement('recipe-card');
      recipeCard.data = recipe;
      recommendedRecipeContainer.appendChild(recipeCard);
      numReccRecipes += 1;
    }
  }
}

async function init() {
  const queryString = window.location.search;

  const searchParams = new URLSearchParams(queryString);
  recipeId = searchParams.get('id');

  if (recipeId === null) {
    // handle bad request
    // show empty page with note that we can't find that id
  } else {
    const currentRecipe = await readRecipe(recipeId);
    fillRecipePage(currentRecipe);
  }
  const createButton = document.getElementById('deleteButton');
  createButton.addEventListener('click', () => {
    deleteRecipe(recipeId);
    window.location = `${window.location.origin}/root/html/homepage.html`;
  });

  const editRecipeButton = document.getElementById('editButton');
  editRecipeButton.addEventListener('click', () => {
    // document.cookie = `recipe=${recipeId}`;
    // console.log(document.cookie);
    // window.location.href = '../html/CreateRecipe.html';
    const currentUrl = window.location;
    window.location = `${currentUrl.origin}/root/html/createRecipe.html?id=${recipeId}`;
  });

  // fetch four random recipes (except the currently displayed recipe) and
  // display at bottom of page
  try {
    allRecipes = await getAllRecipes();
  } finally {
    createRecommendedRecipes();
  }
  const button = document.querySelector('#fav-icon');
  const isFav = await isFavorite(recipeId);
  button.addEventListener('click', () => {
    if (button.style.color === 'rgb(255, 204, 0)') {
      button.style = 'color:grey';
      deleteFavoriteRecipe(recipeId);
    } else {
      button.style = 'color:rgb(255, 204, 0)';
      addFavoriteRecipe(recipeId);
    }
  });
  // not favorited, user clicks
  if (isFav) {
    button.style = 'color:rgb(255, 204, 0)';
  } else {
    button.style = 'color:grey';
  }
}

window.addEventListener('DOMContentLoaded', init);
