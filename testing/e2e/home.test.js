const rootUrl = '127.0.0.1:5501';

beforeAll(async () => {
    const result = /refs\/pull\/(\d+)\/merge/g.exec(process.env.GITHUB_REF);
    try {
      if (!result) throw new Error("Reference not found.");
      const [, pullRequestId] = result;
      
      if(pullRequestId) {
        rootUrl = `deploy-preview-${pullRequestId}--rocketrecipes.netlify.app`;
      }
      console.log('PULL REQUEST ID: ' + pullRequestId);
    }
    catch(e) {
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