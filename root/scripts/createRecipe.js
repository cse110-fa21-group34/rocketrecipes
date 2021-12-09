/* eslint-disable import/extensions */
import { getAllRecipes, createRecipe, createId } from './utils.js';
/* eslint-disable prefer-destructuring */
// const crypto = require('crypto');

/**
 * A helper function to check if a string is a valid link
 * @param {String} link
 * @returns {Boolean} true if the string is a link
 */
function validURL(str) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' // protocol
      + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
      + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
      + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
      + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
      + '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(str);
}

/**
 * A helper function to validate form contents
 * @param {Object} recipe recipe object to validate
 * @returns {Object} object containing values for if the form is valid, and error messages otherwise
 */
function validateForm(recipe) {
  if (recipe.title === '' || recipe.summary === '') {
    return { valid: false, errorMessage: 'Title is empty' };
  }
  if (recipe.summary === '') {
    return { valid: false, errorMessage: 'Summary is empty' };
  }
  if (recipe.servings === '') {
    return { valid: false, errorMessage: 'Servings field is empty' };
  }
  if (recipe.readyInMinutes === '') {
    return { valid: false, errorMessage: 'Time field is empty' };
  }
  if (recipe.image !== '' && !validURL(recipe.image)) {
    return { valid: false, errorMessage: 'Image is not a valid link' };
  }

  return { valid: true, errorMessage: '' };
}

/**
 * A helper function to prune empty ingredients and steps from a recipe
 * @param {Object} recipe recipe object to prune
 * @returns {Object} recipe object without unneeded steps and ingredients
 */
function trimRecipe(recipe) {
  const adjustedRecipe = recipe;

  const recipeIngredients = recipe.ingredients.filter(
    (ing) => ing.name !== '' && ing.amount !== '',
  );
  const recipeSteps = recipe.steps.filter((s) => s !== '');

  adjustedRecipe.ingredients = recipeIngredients;
  adjustedRecipe.steps = recipeSteps;

  // add default image if field is blank
  if (adjustedRecipe.image === '') {
    adjustedRecipe.image = 'https://ss1.4sqi.net/img/categories/food/default_256.png';
  }
  return adjustedRecipe;
}

let i = 6; // instructions counter
let ingCount = 1; // Ingredient Counter

function addStep() {
  const instructions = document.querySelector('.instructions');
  const steps = document.createElement('input');
  steps.setAttribute('class', 'step');
  steps.setAttribute('type', 'text');
  steps.setAttribute('placeholder', `Step ${i.toString()}`);
  steps.setAttribute('id', `Step${i.toString()}`);
  instructions.appendChild(steps);
  i += 1;
}

function deleteStep() {
  i -= 1;
  if (i < 2) {
    i = 2;
  }
  const stepStr = `Step${i.toString()}`;
  const lastStep = document.getElementById(stepStr);
  lastStep.remove();
}

function addIng() {
  const ingredSteps = document.querySelector('.ingredSteps');
  const amount = document.createElement('input');
  amount.setAttribute('type', 'text');
  amount.setAttribute('class', 'Ingre');
  amount.setAttribute('placeholder', 'Amount');
  amount.setAttribute('id', `amount${ingCount.toString()}`);

  const units = document.createElement('input');
  units.setAttribute('type', 'text');
  units.setAttribute('class', 'unit');
  units.setAttribute('placeholder', 'Units');
  units.setAttribute('id', `units${ingCount.toString()}`);

  const steps = document.createElement('input');
  steps.setAttribute('type', 'text');
  steps.setAttribute('class', 'Ingredient');
  steps.setAttribute('placeholder', `Ingredient ${ingCount.toString()}`);
  steps.setAttribute('id', `ing${ingCount.toString()}`);

  // const breakline = document.createElement('br');

  ingredSteps.appendChild(amount);
  ingredSteps.appendChild(units);
  ingredSteps.appendChild(steps);
  // ingredSteps.appendChild(breakline);
  ingCount += 1;
}

function deleteIng() {
  ingCount -= 1;
  if (ingCount < 2) {
    ingCount = 2;
  }
  const ingStep = document.getElementById(`ing${ingCount.toString()}`);
  const amountStep = document.getElementById(`amount${ingCount.toString()}`);
  const unitStep = document.getElementById(`units${ingCount.toString()}`);
  unitStep.remove();
  ingStep.remove();
  amountStep.remove();
}

async function init() {
  const addIngredient = document.getElementById('addIngredient');
  addIngredient.addEventListener('click', addIng);

  const deleteIngredient = document.getElementById('deleteIngredient');
  deleteIngredient.addEventListener('click', deleteIng);

  const button = document.getElementById('plus');
  button.addEventListener('click', addStep);

  const deleteButton = document.getElementById('Delete');
  deleteButton.addEventListener('click', deleteStep);

  await getAllRecipes();
  document.getElementById('Create').addEventListener('click', async () => {
    const userGenRecipe = {};
    userGenRecipe.id = createId(); // crypto.randomBytes(16).toString('hex');
    userGenRecipe.title = document.getElementById('name').value;
    userGenRecipe.readyInMinutes = document.getElementsByClassName('amount')[1].value;
    userGenRecipe.servings = document.getElementsByClassName('amount')[0].value;
    userGenRecipe.image = document.getElementById('image').value;
    userGenRecipe.uploader = 'From the User';

    // Need to add tags to CreateRecipe.html so that the user can manually select which tags
    // associate with their recipe.
    userGenRecipe.isFromInternet = false;
    userGenRecipe.vegetarian = document.getElementById('vegetarian').checked;
    userGenRecipe.vegan = document.getElementById('vegan').checked;
    userGenRecipe.cheap = document.getElementById('cheap').checked;
    userGenRecipe.glutenFree = document.getElementById('glutenFree').checked;
    userGenRecipe.dairyFree = document.getElementById('dairyFree').checked;
    userGenRecipe.quickEat = document.getElementById('quickEat').checked;
    userGenRecipe.easyCook = document.getElementById('easy').checked;

    userGenRecipe.ingredients = [];
    let numIngredients = 0;
    for (let j = 0; j < document.getElementsByClassName('Ingre').length; j += 1) {
      const ingredientInfo = {};
      ingredientInfo.name = document.getElementsByClassName('Ingredient')[j].value;
      ingredientInfo.amount = document.getElementsByClassName('Ingre')[j].value;
      ingredientInfo.unit = document.getElementsByClassName('unit')[j].value;
      userGenRecipe.ingredients.push(ingredientInfo);
      numIngredients += 1;
    }

    userGenRecipe.fiveIngredientsOrLess = numIngredients <= 5;
    userGenRecipe.summary = document.getElementsByClassName('descrip')[0].value;

    userGenRecipe.steps = [];
    for (let k = 0; k < document.getElementsByClassName('step').length; k += 1) {
      const currStep = {};
      currStep.number = k;
      currStep.step = document.getElementsByClassName('step')[k].value;
      userGenRecipe.steps.push(currStep);
    }
    // validate form, if it is valid then create recipe
    const formValidateObject = validateForm(userGenRecipe);
    if (formValidateObject.valid) {
      const trimmedRecipe = trimRecipe(userGenRecipe);
      await createRecipe(trimmedRecipe);
      window.location = `${window.location.origin}/root/html/RecipePage.html?id=${trimmedRecipe.id}`;
    } else {
      // eslint-disable-next-line no-alert
      alert(
        `Your recipe was not created due to invalid inputs. \n\nError message: ${formValidateObject.errorMessage}`,
      );
    }
  });
}

window.addEventListener('DOMContentLoaded', init);
