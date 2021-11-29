/**
 * @jest-environment jsdom
 */
import * as utils from './testutil.js'
import * as utilFunctions from '../../root/scripts/utils.js'; // eslint-disable-line no-lone-blocks
import { util } from 'prettier';

// unmockedFetch stores the original global fetch function
const unmockedFetch = global.fetch

beforeAll(() => {
    // set local storage to be the mocked local storage
    global.localStorage = new utils.LocalStorageMock();

    // set fetch to be this mocked fetch that always returns utils.mockedRecipes
    global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve(utils.mockedRecipes),
    })
});

test('fetches recipes', async () => {
    const recipes = await utilFunctions.getAllRecipes();
    expect(recipes.length).toBeGreaterThan(0);
});

test('read recipe returns 1 recipe', async () => {
    const recipe = await utilFunctions.readRecipe('b1ffbdfcc516588601f4ee651b5ed684');
    expect(recipe.title).toBe('Slow Cooker Chicken and Dumplings');
});

test('read recipe returns correct recipe', async () => {
    const recipe = await utilFunctions.readRecipe('b1ffbdfcc516588601f4ee651b5ed684');
    expect(recipe.id).toBe('b1ffbdfcc516588601f4ee651b5ed684');
});

// After all tests are done, restore the global fetch function
// back to the original 
afterAll(() => {
  global.fetch = unmockedFetch
})