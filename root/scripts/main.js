async function init() {}

// parses a list of json and gets recipes from those components
async function fetchRecipes() {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < recipes.length; i++) {
      const url = recipes[i];
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          recipeData[i] = data;
        })

        .catch((error) => {
          console.log('Could not retrieve data');
          reject(false);
        });
    }

    setTimeout((c) => {
      if (recipes.length == Object.keys(recipeData).length) {
        resolve(true);
      }
      reject(false);
    }, 1000);
  });
}
