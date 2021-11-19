// eslint-disable-next-line import/extensions
import { createRecipe } from './utils.js';
/* eslint-disable prefer-destructuring */
const crypto = require('crypto');

// const createRecipe = document.querySelector(document.getElementById('Create'));
// const deleteRecipe = document.querySelector(document.getElementById('Delete'));
let i = 6; // instructions counter
let ingCount = 1; // Ingredient Counter

function addStep() {
  const instructions = document.querySelector('.instructions');
  const steps = document.createElement('input');
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
  // console.log('working');
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

function init() {
  const button = document.getElementById('plus');
  button.addEventListener('click', addStep);

  const deleteButton = document.getElementById('Delete');
  deleteButton.addEventListener('click', deleteStep);

  const addIngredient = document.getElementById('addIngredient');
  addIngredient.addEventListener('click', addIng);

  const deleteIngredient = document.getElementById('deleteIngredient');
  deleteIngredient.addEventListener('click', deleteIng);
}
window.addEventListener('DOMContentLoaded', init);

document.getElementById('Create').addEventListener('click', () => {
  const userGenRecipe = {};
  userGenRecipe.id = crypto.randomBytes(16).toString('hex');
  userGenRecipe.title = document.getElementsByClassName('recipeName')[0];
  userGenRecipe.readyInMinutes = 0;
  userGenRecipe.servings = document.getElementsByClassName('amount')[0];
  userGenRecipe.image = document.getElementsByClassName('amount')[1];
  userGenRecipe.uploader = 'From the User';
  userGenRecipe.isFromInternet = false;
  userGenRecipe.vegetarian = false;
  userGenRecipe.vegan = false;
  userGenRecipe.cheap = false;
  userGenRecipe.glutenFree = false;
  userGenRecipe.dairyFree = false;
  userGenRecipe.quickEat = false;

  userGenRecipe.ingredients = {};
  let numIngredients = 0;
  for (let j = 0; j < document.getElementsByClassName('Ingre').length; j += 1) {
    const ingredientInfo = {};
    ingredientInfo.name = document.getElementsByClassName('Ingredient')[j];
    ingredientInfo.amount = document.getElementsByClassName('Ingre')[j];
    ingredientInfo.unit = document.getElementsByClassName('unit')[j];
    userGenRecipe.ingredients.push(ingredientInfo);
    numIngredients += 1;
  }

  userGenRecipe.fiveIngredientsOrLess = (numIngredients <= 5);
  userGenRecipe.description = document.getElementsByClassName('descrip')[0];

  userGenRecipe.steps = {};
  for (let k = 0; i < document.getElementsByClassName('instructions')[0].childNodes.length; k += 1) {
    const currStep = {};
    currStep.number = k;
    currStep.step = document.getElementsByClassName('instructions')[0].childNodes[k];
    userGenRecipe.steps.push(currStep);
  }

  createRecipe(userGenRecipe);
});
