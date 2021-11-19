const COMMUNITY_RECIPE_URL = 'https://raw.githubusercontent.com/cse110-fa21-group34/rocketrecipes/main/root/scraper/recipes.json';
const LOCAL_STORAGE_ALL_RECIPES_KEY = 'allRecipes';
const LOCAL_STORAGE_FAVORITED_RECIPES_KEY = 'favoritedRecipes';

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

export async function getFavoriteRecipes() {
  if (localStorage.getItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY) !== null) {
    const favoritedRecipes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY));
    return favoritedRecipes;
  }

  const blankFavoritedRecipes = [];
  localStorage.setItem(LOCAL_STORAGE_FAVORITED_RECIPES_KEY, JSON.stringify(blankFavoritedRecipes));
  return blankFavoritedRecipes;
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
      return true;
    }
  }
  return false;
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
