// const createRecipe = document.querySelector(document.getElementById('Create'));
// const deleteRecipe = document.querySelector(document.getElementById('Delete'));

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
  if (i < 1) {
    i = 1;
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

  ingredSteps.appendChild(amount);
  ingredSteps.appendChild(units);
  ingredSteps.appendChild(steps);
  
  ingCount += 1;
}

function deleteIng() {
  //console.log('working');
  ingCount -= 1;
  if (ingCount < 1) {
    ingCount = 1;
  }
  const ingStep = document.getElementById(`ing${ingCount.toString()}`);
  const amountStep = document.getElementById(`amount${ingCount.toString()}`);
  const unitStep = document.getElementById(`units${ingCount.toString()}`);
  unitStep.remove();
  ingStep.remove();
  amountStep.remove();
}

let i = 6; // instructions counter
let ingCount = 1; // Ingredient Counter
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
