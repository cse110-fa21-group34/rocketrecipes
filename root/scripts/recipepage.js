// eslint-disable-next-line import/extensions
import { readRecipe } from './utils.js';
import { deleteRecipe } from './utils.js';

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

async function init() {
  const queryString = window.location.search;

  const searchParams = new URLSearchParams(queryString);
  const recipeId = searchParams.get('id');

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
}

window.addEventListener('DOMContentLoaded', init);
