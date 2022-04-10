let rootUrl = 'rocketrecipes.netlify.app';
const pullRequestId = process.env.GITHUB_PR_NUMBER;

beforeAll(async () => {
    if(pullRequestId) {
      console.log("PR: " + pullRequestId);
      rootUrl = `deploy-preview-${pullRequestId}--rocketrecipes.netlify.app`;
    }
    else if(process.env.GITHUB_REF) {
      rootUrl = `rocketrecipes.netlify.app`;
    }
    else {
      console.log('not in pr');
    }

});

describe('test create recipe page functionality', () => {
    beforeAll(async () => {
        await page.goto(`http://${rootUrl}/root/html/CreateRecipe.html`);
    });

    it('headline should be create your recipe', async () => {
        await page.waitForSelector('body > main > div > h2');
        const headline = await page.evaluate( () => document.querySelector('body > main > div > h2').textContent);
        expect(headline).toBe('Create your recipe:');
    });

    it('initial number of ingredients should be 0', async () => {
        await page.waitForSelector('.ingredSteps');
        const amountFields = await page.$$('input.Ingre');
        const unitsFields = await page.$$('input.unit');
        const ingredientFields = await page.$$('input.Ingredient');
        expect(amountFields.length).toBe(0);
        expect(unitsFields.length).toBe(0);
        expect(ingredientFields.length).toBe(0);
    });

    it('initial number of instructions should be 5', async() => {
        await page.waitForSelector('.instructions');
        const instructionFields = await page.$$('input.step');
        expect(instructionFields.length).toBe(5);
    });

    it('remove 2 steps, instructions should now have 3 fields', async () => {
        await page.waitForSelector('.instructions');
        await page.waitForSelector('#Delete');
        const button = await page.$('#Delete');
        for(let i = 0; i < 2; i += 1) {
            await button.click();
        }
        const instructionFields = await page.$$('input.step');
        expect(instructionFields.length).toBe(3);
    });

    it('add 3 steps, instructions should now have 6 fields', async () => {
        await page.waitForSelector('.instructions');
        await page.waitForSelector('#plus');
        const button = await page.$('#plus');
        for(let i = 0; i < 3; i += 1) {
            await button.click();
        }
        const instructionFields = await page.$$('input.step');
        expect(instructionFields.length).toBe(6);
    });
});