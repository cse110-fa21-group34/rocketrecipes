describe('create recipe page', () => {
      beforeAll(async () => {
        await page.goto('http://127.0.0.1:5501/root/html/createRecipe.html');
      });

      it('should be titled Create Recipe', async () => {
        await expect(page.title()).resolves.toMatch('Create Recipe');
      });

      
})