/** @module utils */
/* eslint-disable no-mixed-operators */
const COMMUNITY_RECIPE_URL = 'https://raw.githubusercontent.com/cse110-fa21-group34/rocketrecipes/main/root/scraper/recipes.json';
const LOCAL_STORAGE_ALL_RECIPES_KEY = 'allRecipes';
const LOCAL_STORAGE_FAVORITED_RECIPES_KEY = 'favoritedRecipes';

/**
 * @async
 * This function gets all recipes from localStorage.
 * @returns {Array} recipes - An array of recipe objects, following the given schema
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
 * @returns {Array}
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

export async function isFavorite(id) {
  const favoritedRecipes = await getFavoriteRecipes();
  for (let i = 0; i < favoritedRecipes.length; i += 1) {
    if (favoritedRecipes[i] === id) {
      return true;
    }
  }
  return false;
}

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

// for performance reasons, please pass in recipeIds as a JS object
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

export function createId() {
  // eslint-disable-next-line no-bitwise
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
}

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

export function recipeIdArrayToObject(arr) {
  const obj = {};
  for (let i = 0; i < arr.length; i += 1) {
    obj[arr[i]] = true;
  }
  return obj;
}

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
