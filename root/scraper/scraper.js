const axios = require('axios');
const crypto = require("crypto");
const { scan } = require('micromatch');
const { parse } = require('path/posix');
const fs = require('fs').promises;

const API_KEY = "f5bb0a9de72f43e9993b776534f13957";
const filename = 'recipes.json';

async function getRecipe() {
    await axios.get('https://api.spoonacular.com/recipes/random', {
        params: {
            apiKey: API_KEY
        }
    })
        .then(response => {
            parseRecipe(response.data);
        })
        .catch(error => {
            console.log(error);
            return (error);
        });
}

async function parseRecipe(scrapedRecipe) {
    // scrapedRecipe = scrapedRecipe["recipes"][0];

    let minutesToPrepare = scrapedRecipe["readyInMinutes"];
    let numIngredients = scrapedRecipe["extendedIngredients"].length;


    let numSteps = scrapedRecipe["analyzedInstructions"][0].steps.length;
    let isEasy = (numSteps <= 5 && numIngredients <= 5 && minutesToPrepare <= 60);

    let parsedRecipe = {};
    parsedRecipe["id"] = crypto.randomBytes(16).toString("hex");
    parsedRecipe["title"] = scrapedRecipe["title"];
    parsedRecipe["readyInMinutes"] = scrapedRecipe["readyInMinutes"];
    parsedRecipe["servings"] = scrapedRecipe["servings"];
    parsedRecipe["image"] = scrapedRecipe["image"];
    parsedRecipe["uploader"] = "From the Internet";
    parsedRecipe["isFromInternet"] = true;
    parsedRecipe["vegetarian"] = scrapedRecipe["vegetarian"];
    parsedRecipe["vegan"] = scrapedRecipe["vegan"];
    parsedRecipe["cheap"] = scrapedRecipe["cheap"];
    parsedRecipe["glutenFree"] = scrapedRecipe["glutenFree"];
    parsedRecipe["dairyFree"] = scrapedRecipe["dairyFree"];
    parsedRecipe["quickEat"] = (minutesToPrepare > 30);
    parsedRecipe["fiveIngredientsOrLess"] = (numIngredients <= 5);
    parsedRecipe["easyCook"] = isEasy;

    parsedRecipe["ingredients"] = [];

    let scrapedIngredients = scrapedRecipe["extendedIngredients"];

    for (let i = 0; i < scrapedIngredients.length; i++) {
        let currIngredient = {};
        currIngredient["name"] = scrapedIngredients[i]["nameClean"];
        currIngredient["amount"] = scrapedIngredients[i]["amount"];
        currIngredient["unit"] = scrapedIngredients[i]["unit"];

        parsedRecipe["ingredients"].push(currIngredient);
    }
    parsedRecipe["summary"] = scrapedRecipe["summary"];
    let scrapedSteps = scrapedRecipe["analyzedInstructions"][0]["steps"];

    parsedRecipe["steps"] = [];

    for(let i = 0 ; i < scrapedSteps.length ; i++) {
        let currStep = {};
        
        currStep["number"] = scrapedSteps[i]["number"];
        currStep["step"] = scrapedSteps[i]["step"];
        
        parsedRecipe["steps"].push(currStep);
    }


    appendToFile(parsedRecipe);
}

async function appendToFile(parsedRecipe) {
    // first read file
    const file = await fs.readFile(filename);
    let arr = JSON.parse(file);
    arr.push(parsedRecipe);
    await fs.writeFile(filename, JSON.stringify(arr));
    console.log("adding recipe #" + arr.length);
}


async function getBigJson() {
    let bigJson = await fs.readFile("recipe.json");
    let arr = JSON.parse(bigJson);
    let index = parseInt(process.argv[2]);
    parseRecipe(arr["recipes"][index]);
}


// getBigJson();

parseRecipe();




////
// open existing json
// append curr object to the array
// save file
