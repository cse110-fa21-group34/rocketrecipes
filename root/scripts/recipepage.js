// eslint-disable-next-line import/extensions
import { readRecipe } from './utils.js';

function fillRecipePage(currentRecipe) {
  console.log(currentRecipe);
}

async function init() {
  const queryString = window.location.search;
  
  const searchParams = new URLSearchParams(queryString);
  const recipeId = searchParams.get('id');
 
  if (recipeId === null) {
    // handle bad request
    // show empty page with note that we can't find that id
    console.log('null');
  } else {
    const currentRecipe = await readRecipe(recipeId);
    fillRecipePage(currentRecipe);
  }
}

window.addEventListener('DOMContentLoaded', init);
