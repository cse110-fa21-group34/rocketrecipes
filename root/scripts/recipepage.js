/* eslint-disable import/named */
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
    currentIngredientLi.setAttribute('class', 'ingred');
    recipeIngredientsElement.appendChild(currentIngredientLi);
  });

  const text = `Check out this recipe for ${document.getElementById('recipe-title').innerText}:`;

  const twitterShare = document.getElementById('twitter-share');
  twitterShare.href += `${window.location.href}&text=${text} `;

  const facebookShare = document.getElementById('facebook-share');
  facebookShare.href += `${window.location.href}&quote=${text}`;

  const redditShare = document.getElementById('reddit-share');
  redditShare.href += `${window.location.href}`;

  const linkedInShare = document.getElementById('linkedin-share');
  linkedInShare.href += `${window.location.href}`;

  const emailShare = document.getElementById('email-share');
  emailShare.href += `${text}&body=${window.location.href}`;
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

async function scaleIngredients() {
  const scale = document.getElementById('servings');

  const recipeIngredientsElement = document.getElementsByClassName('ingred');
  // yield scaled
  const recipeYieldlement = document.getElementById('yield');
  recipeYieldlement.innerText = window.currentRecipe.servings * scale.value;

  const recipeTimeElement = document.getElementById('time');
  recipeTimeElement.innerText = `${window.currentRecipe.readyInMinutes * scale.value} minutes`;

  for (let i = 0; i < recipeIngredientsElement.length; i += 1) {
    const ingre = window.currentRecipe.ingredients[i];
    recipeIngredientsElement[i].innerText = `${ingre.amount * scale.value} ${ingre.unit} ${
      ingre.name
    }`;

    if (scale.value / 1 === 0) {
      recipeIngredientsElement[i].innerText = `${ingre.amount} ${ingre.unit} ${ingre.name}`;
    } else {
      recipeIngredientsElement[i].innerText = `${ingre.amount * scale.value} ${ingre.unit} ${
        ingre.name
      }`;
    }
  }
}

async function init() {
  const queryString = window.location.search;

  const searchParams = new URLSearchParams(queryString);
  recipeId = searchParams.get('id');
  const currentRecipe = await readRecipe(recipeId);

  // check if recipe is null, otherwise fill the recipe page
  if (currentRecipe === null) {
    // handle bad request
    // show empty page with note that we can't find that id
    document.getElementsByClassName('main-info')[0].remove();
    document.querySelector('main').innerHTML = 'The recipe could not be found.';
  } else {
    // fill the recipe page
    fillRecipePage(currentRecipe);
    // delete recipe button
    const deleteButton = document.getElementById('deleteButton');
    deleteButton.addEventListener('click', () => {
      deleteRecipe(recipeId);
      window.location = `${window.location.origin}/root/html/homepage.html`;
    });
    // edit recipe button
    const editRecipeButton = document.getElementById('editButton');
    editRecipeButton.addEventListener('click', () => {
      // document.cookie = `recipe=${recipeId}`;
      // console.log(document.cookie);
      // window.location.href = '../html/CreateRecipe.html';
      const currentUrl = window.location;
      window.location = `${currentUrl.origin}/root/html/createRecipe.html?id=${recipeId}`;
    });
    // favorite recipe functionality
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
    window.location = `${currentUrl.origin}/root/html/editRecipe.html?id=${recipeId}`;
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

  window.currentRecipe = await readRecipe(recipeId);
  const scaleButton = document.getElementById('servings');
  scaleButton.addEventListener('change', scaleIngredients);

  // (function(d, s, id) {
  //   var js, fjs = d.getElementsByTagName(s)[0];
  //   if (d.getElementById(id)) return;
  //   js = d.createElement(s); js.id = id;
  //   js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
  //   fjs.parentNode.insertBefore(js, fjs);
  //   }(document, 'script', 'facebook-jssdk'));
}

window.addEventListener('DOMContentLoaded', init);
