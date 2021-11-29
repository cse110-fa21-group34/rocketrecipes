/**
 * @jest-environment jsdom
 */
import * as utils from './testutil.js'
import { getAllRecipes } from '../../root/scripts/utils.js'; // eslint-disable-line no-lone-blocks

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
    const recipes = await getAllRecipes();
    expect(recipes.length).toBeGreaterThan(0);
});


// After all tests are done, restore the global fetch function
// back to the original 
afterAll(() => {
  global.fetch = unmockedFetch
})