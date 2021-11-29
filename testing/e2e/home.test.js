const rootUrl = '127.0.0.1:5501';

beforeAll(async () => {
    const result = /refs\/pull\/(\d+)\/merge/g.exec(process.env.GITHUB_PR_NUMBER);

    if(process.env.GITHUB_PR_NUMBER) {
      console.log("PR: " + process.env.GITHUB_PR_NUMBER);
      rootUrl = `deploy-preview-${pullRequestId}--rocketrecipes.netlify.app`;
    }
    else {
      console.log('not in pr');
    }

});

      describe('home page', () => {
        beforeAll(async () => {
        await page.goto(`http://${rootUrl}/root/html/homepage.html`);
      });

      it('should be titled Home page', async () => {
        await expect(page.title()).resolves.toMatch('Home page');
      });

      it('headline should be rocket recipes', async () => {
        await page.waitForSelector('body > main > div > h1');
        const headline = await page.evaluate( () => document.querySelector('body > main > div > h1').textContent);
        expect(headline).toBe('Rocket Recipes');
      });

      it('should have 4 recommended recipes', async () => {
        await page.waitForSelector('recipe-card');
        const recipes = await page.$$('recipe-card');
        expect(recipes.length).toBe(4);
      });
})