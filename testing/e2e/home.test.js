describe('home page', () => {
      beforeAll(async () => {
        await page.goto('http://localhost:5501/root/html/homepage.html');
      });

      it('should be titled Home page', async () => {
        await expect(page.title()).resolves.toMatch('Home page');
      });

      it('headline should be rocket recipes', async () => {
        await page.waitForSelector('body > main > div > h1');
        const headline = await page.evaluate( () => document.querySelector('body > main > div > h1').textContent);
        console.log(headline);
        expect(headline).toBe('Rocket Recipes');
      });

      it('should have 4 recommended recipes', async () => {
        await page.waitForSelector('recipe-card');
        const recipes = await page.$$('recipe-card');
        expect(recipes.length).toBe(4);
      });
})