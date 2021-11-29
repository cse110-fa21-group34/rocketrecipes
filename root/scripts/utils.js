/** @module utils */
/* eslint-disable no-mixed-operators */
const COMMUNITY_RECIPE_URL = 'https://raw.githubusercontent.com/cse110-fa21-group34/rocketrecipes/deployment/root/scraper/recipes.json';
const LOCAL_STORAGE_ALL_RECIPES_KEY = 'allRecipes';
const LOCAL_STORAGE_FAVORITED_RECIPES_KEY = 'favoritedRecipes';

/**
 * @async
 * This function gets all recipes from localStorage.
 * @returns {Array} An array of recipe objects, following the given schema
 */
export async function getAllRecipes() {
  if (localStorage.getItem(LOCAL_STORAGE_ALL_RECIPES_KEY) !== null) {
    const localStorageRecipes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ALL_RECIPES_KEY));
    return localStorageRecipes;
  }
  const fetchedRecipes = await fetch(COMMUNITY_RECIPE_URL)
    .then((response) => response.json())
    .then((data) => data);

  localStorage.setItem(LOCAL_STORAGE_ALL_RECIPES_KEY, JSON.stringify(fetchedRecipes));
  return fetchedRecipes;
}

/**
 * @async
 * Gets all recipes a user has favorited from localStorage.
 * @returns {Array} An array of recipe objects, following the given schema
 */
export async function getFavoriteRecipes() {
  if (localStorage.getItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY) !== null) {
    const favoritedRecipes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY));
    return favoritedRecipes;
  }

  const blankFavoritedRecipes = [];
  localStorage.setItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY, JSON.stringify(blankFavoritedRecipes));
  return blankFavoritedRecipes;
}

/**
 * Determines if the given recipe in a user's favorite list
 * @param {recipeId} id - recipeId to check
 * @returns {Boolean}
 */
export async function isFavorite(id) {
  const favoritedRecipes = await getFavoriteRecipes();
  for (let i = 0; i < favoritedRecipes.length; i += 1) {
    if (favoritedRecipes[i] === id) {
      return true;
    }
  }
  return false;
}

/**
 * @async
 * Gets all recipes a user has created
 * @returns {Array} An array of recipe objects, following the given schema
 */
export async function getUserRecipes() {
  const allRecipes = await getAllRecipes();
  const userRecipes = [];
  for (let i = 0; i < allRecipes.length; i += 1) {
    if (!allRecipes[i].isFromInternet) {
      userRecipes.push(allRecipes[i]);
    }
  }
  return userRecipes;
}

/**
 * @async
 * Adds recipe with given id to a user's list of favorite recipes
 * @param {recipeId} id of recipe to add
 * @returns {Boolean} true if the operation was successful, false if it was not
 */
export async function addFavoriteRecipe(id) {
  const allRecipes = await getAllRecipes();
  let recipeExists = false;

  for (let i = 0; i < allRecipes.length; i += 1) {
    if (allRecipes[i].id === id) {
      recipeExists = true;
    }
  }

  if (!recipeExists) {
    return false;
  }

  const favoritedRecipes = await getFavoriteRecipes();

  for (let i = 0; i < favoritedRecipes.length; i += 1) {
    if (favoritedRecipes[i] === id) {
      return false;
    }
  }
  favoritedRecipes.push(id);
  localStorage.setItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY, JSON.stringify(favoritedRecipes));
  return true;
}

/**
 * @async
 * Deletes recipe with given id from the user's list of favorite recipes
 * @param {recipeId} id of the recipe to be deleted
 * @returns {Boolean} true if the operation was successful, false if it was not
 */
export async function deleteFavoriteRecipe(id) {
  const favoritedRecipes = await getFavoriteRecipes();

  for (let i = 0; i < favoritedRecipes.length; i += 1) {
    if (favoritedRecipes[i] === id) {
      favoritedRecipes.splice(i, 1);
      localStorage.setItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY, JSON.stringify(favoritedRecipes));
      return true;
    }
  }
  return false;
}

/**
 * @async
 * A faster method to read multiple recipes at once. Note: this method requires the input
 * to be an object with all desired recipeId's as keys. The function recipeIdArrayToObject()
 * can be used to convert an array of recipeIds into the desired format.
 *
 * @param {recipeIdObj} recipeIds of the form {'id1':true, 'id2':true,...}
 * @returns {Array} An array of recipe objects, following the given schema
 */
export async function getBulkRecipes(recipeIds) {
  const allRecipes = await getAllRecipes();
  const recipes = [];

  for (let i = 0; i < allRecipes.length; i += 1) {
    if (recipeIds[allRecipes[i].id]) {
      recipes.push(allRecipes[i]);
    }
  }
  return recipes;
}

/**
 * @async
 * Reads the recipe with the given id
 * @param {recipeId} id of the recipe to be read
 * @returns {recipeObject} corresponding to the id that was passed in. If the recipe
 * does not exist, returns null
 */
export async function readRecipe(id) {
  const allRecipes = await getAllRecipes();
  for (let i = 0; i < allRecipes.length; i += 1) {
    if (allRecipes[i].id === id) {
      return allRecipes[i];
    }
  }
  // recipe id was not found, return null
  return null;
}

/**
 * @async
 * Deletes the recipe corresponding to the given recipeId.
 * @param {recipeId} id of the recipe to be deleted
 * @returns {Boolean} true if the operation was successful, false otherwise
 */
export async function deleteRecipe(id) {
  const allRecipes = await getAllRecipes();

  for (let i = 0; i < allRecipes.length; i += 1) {
    if (allRecipes[i].id === id) {
      allRecipes.splice(i, 1);
      localStorage.setItem(LOCAL_STORAGE_ALL_RECIPES_KEY, JSON.stringify(allRecipes));
      return true;
    }
  }
  return false;
}

/**
 * Generates a unique id
 * @returns {String} a unique id
 */
export function createId() {
  // eslint-disable-next-line no-bitwise
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
}

/**
 * Updates the contents of the recipe corresponding to the given recipe's id
 * @param {recipeObj} newRecipe - the recipe whose contents will be updated
 * @returns true if this operation is successful, false otherwise
 */
export async function updateRecipe(newRecipe) {
  const allRecipes = await getAllRecipes();

  for (let i = 0; i < allRecipes.length; i += 1) {
    if (allRecipes[i].id === newRecipe.id) {
      allRecipes[i] = newRecipe;
      localStorage.setItem(LOCAL_STORAGE_ALL_RECIPES_KEY, JSON.stringify(allRecipes));
      return true;
    }
  }
  return false;
}

/**
 * Creates the given recipe object
 * @param {recipeObj} newRecipe - the recipe to be created
 * @returns true if the operation was successful, false otherwise
 */
export async function createRecipe(newRecipe) {
  const allRecipes = await getAllRecipes();
  for (let i = 0; i < allRecipes.length; i += 1) {
    if (allRecipes[i].id === newRecipe.id) {
      return false;
    }
  }

  allRecipes.push(newRecipe);
  localStorage.setItem(LOCAL_STORAGE_ALL_RECIPES_KEY, JSON.stringify(allRecipes));
  return true;
}

/**
 * A helper function to convert an array of recipe ids to an object with ids as keys
 * @param {Array} arr array of recipeIds
 * @returns an object with recipeIds as keys
 */
export function recipeIdArrayToObject(arr) {
  const obj = {};
  for (let i = 0; i < arr.length; i += 1) {
    obj[arr[i]] = true;
  }
  return obj;
}

/**
 * Searches all recipes, matches title/ingredients by query and tags
 * @param {String} searchQuery - a text query
 * @param {Array} tags - an array of tags (must correspond to the schema format)
 * @returns An array of recipeObjects that matches the search parameters
 */
export async function search(searchQuery, tags) {
  // match query to title, ingredients
  const searchResults = new Set();
  const allRecipes = await getAllRecipes();
  const query = searchQuery.toLowerCase();

  for (let i = 0; i < allRecipes.length; i += 1) {
    const recipe = allRecipes[i];
    let recipeMatches = true;
    try {
      tags.forEach((tag) => {
        if (!recipe[`${tag}`]) {
          recipeMatches = false;
        }
      });

      const { title } = recipe;
      if (title) {
        if (!title.toLowerCase().includes(query)) {
          recipeMatches = false;
        }
      }

      if (recipeMatches) {
        searchResults.add(recipe);
      }
      // recipe.ingredients.forEach((ingredient) => {
      //   const { name } = ingredient;
      //   if (name) {
      //     if (ingredient.name.toLowerCase().includes(query)) {
      //       searchResults.add(recipe);
      //     }
      //   }
      // });
    } catch (e) {
      if (searchResults.has(recipe)) {
        searchResults.delete(recipe);
      }
    }
  }
  return Array.from(searchResults);
}
