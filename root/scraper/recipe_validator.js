/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const fs = require('fs').promises;
const axios = require('axios');

const filename = 'recipes.json';

async function readJSON() {
  const file = await fs.readFile(filename);
  const arr = JSON.parse(file);
  return arr;
}

async function checkImage(url) {
  if (url == null) {
    return false;
  }
  let imageExists = false;
  await axios.get(url, {
  })
    .then(() => {
      imageExists = true;
    })
    .catch(() => {
      imageExists = false;
    });

  return imageExists;
}

async function validateRecipes() {
  const recipes = await readJSON();
  console.log(`original length: ${recipes.length}`);
  // delete duplicate recipes
  const set = new Set();

  for (let i = 0; i < recipes.length; i += 1) {
    // check for duplicates
    if (set.has(recipes[i].title)) {
      // remove current
      recipes.splice(i, 1);
      i -= 1;
    } else {
      set.add(recipes[i].title);
    }
  }

  console.log(`length after removing duplicates: ${recipes.length}`);

  // for (let i = 0; i < recipes.length; i += 1) {
  //   const imageExists = await checkImage(recipes[i].image);
  //   if (!imageExists) {
  //     recipes.splice(i, 1);
  //   }
  // }

  console.log(`length after removing invalid images: ${recipes.length}`);
  await fs.writeFile(filename, JSON.stringify(recipes));
}

validateRecipes();
