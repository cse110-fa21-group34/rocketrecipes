describe('Basic Home Function', () => {
    beforeAll(async () => {
      await page.goto('http://127.0.0.1:5500/root/html/homepage.html');
    });
  
    it('Initial Home Page - Check for 4 recipes items', async () => {
      console.log('Checking for 4 recipes items...');
      const recipes = await page.$$('recipe-card');
      expect(recipes.length).toBe(4);
    });

    it('Initial Home Page - Check for expand recipe', async () => {
      console.log('Checking for recipes expanding...');
      const recipes = await page.$('recipe-card');
      const shadow=await recipes.getProperty("shadowRoot");
      const recipe_title=await shadow.$('h3');
      const title= await recipe_title.getProperty('innerText');
      const title_Value = title['_remoteObject'].value;
      console.log(title_Value);
      expect(title_Value!=undefined).toBe(true);
    });

  });