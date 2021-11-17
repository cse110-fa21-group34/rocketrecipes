import {
  getAuthor,
  convertTime,
  getYield,
  getImage,
  getCategories,
  searchForKey,
  getTitle,
  getInstructions,
  getDescription,
  getIngredients,
} from '../scripts/RecipeCardUtil';

// RecipeExpand.js

class RecipeExpand extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Create styles and root element
    const styles = document.createElement('style');
    const article = document.createElement('article');

    // Fill in styles and root element
    styles.innerHTML = `
      .edit-button{
        margin:2.2vh 4vh 2.2vh 0vh;
        display:inline;
        padding:1vh 2vh 1vh 2vh;
        border-radius:2vh;
        float: right;
        background-color: rgb(255,193,203);
      }
      .header-title span{
        padding: 5px;
        color:gray;
        font-size:30px;
      }
      .header-title h1{
        display:inline;
      }
      .expand-recipe{
        display: grid;
        grid-template-columns: [first] minmax(10px,60px) [line1] auto [line2] 300px [end];
        gap: 1rem;
      }
      .main-info{
        grid-column: line1 / line2;
      }
      .sidebar{
        grid-column: first/line1;
        font-size:30px;
        color:rgb(255,193,203);
        text-align: center;
      }
      .meta--wrapper{
        display: grid;
        grid-template-columns: repeat(auto-fill,minmax(100px,33%));
      }
      .recipe-header{
        display: grid;
        grid-template-columns: [startH] auto [middleH] 150px [endH];
      }
      .meta--categories span{
        margin: 0vh 2vh 0vh 2vh;
        padding: 3px 5px;
        border:1px solid black;
        border-radius: 5px;
        background-color:rgb(255,193,203,0.5);
      }
      .recipe-header>div{
        grid-column: startH / middleH;
      }
      .recipe-header button{
        grid-column: middleH/ endH;
      }
      .categories{
        margin-top:2vh;
      }
      div.rating--wrapper > img {
        height: auto;
        display: inline-block;
        object-fit: scale-down;
        width: 78px;
      }
      .main-info p{
        color: gray;
        font-style: italic;
      }
      .main-image{
        grid-column: line2 / end;
        /*border:1px solid black;*/
        margin:1vh 1vh 1vh 1vh;
      }
      .main-image img{
        aspect-ratio: 1;
        grid-area: img;
        object-fit: cover;
        overflow: hidden;
        width: 100%;
      }
      .main-info main{
        margin-top:5vh;
        display: grid;
        grid-template-columns: [startI] 60% [middleI] 40% [endI];
      }
      .main-info main .section--instructions{
        grid-column: startI / middleI;
        padding-right:5vh;
      }
      .main-info main .section--ingredients{
        grid-column: middleI/ endI;
      }
      ol, ul {
        margin-top: 10px;
        font-size: 15px;
      }
      ol li:not(:first-child) {
        margin-top: 15px;
      }

      ol li::marker {
        padding-right: 5px;
      }

      ul li {
        padding-left: 2px;
      }

      ul li:not(:first-child) {
        margin-top: 8px;
      }
    `;
    article.innerHTML = `
    <div class="expand-recipe">
        <div class="sidebar">
            <span class="top-arrow">&#10224;</span><br />
            <span class="down-arrow">&#10225;</span>
        </div>
        <div class="main-info">
            <header>
                <div class="recipe-header">
                    <div class="header-title">
                        <h1></h1> <span>&#9733;</span>
                    </div>
                    <button class="edit-button">Edit Recipe</button>
                </div>
                <div class="meta--wrapper">
                    <span><b>Uploaded by: </b><span class="meta--user"></span></span>
                    <span><b>Yield: </b><span class="meta--yield"></span></span>
                    <span><b>Total time: </b><time class="meta--total-time"></time></span>     
                </div>
                <div class="categories">Categories: <span class="meta--categories"></span></div>
                <p class="description"></p>
                <div class="rating--wrapper">
                    <span class="rating--value">Ratings:</span>
                    <img src="" alt="" class="rating--star-img" />
                    <span class="rating--total"></span>
                </div>
            </header>
            <main>
                <section class="section--instructions">
                    <h2>Instructions</h2>
                    <ol></ol>
                </section>
                <section class="section--ingredients">
                    <h2>Ingredients</h2>
                    <ul></ul>
                </section>
            </main>
        </div>
        <div class="main-image">
            <img src="" alt="" class="thumbnail" />
        </div>
    </div>
    `;

    // Append elements to the shadow root
    this.shadowRoot.append(styles, article);
  }

  /**
   * Sets the recipe that will be used inside the <recipe-expand> element.
   * Overwrites the previous recipe, fair warning.
   */
  set data(data) {
    this.json = data;

    // Reset HTML
    this.shadowRoot.querySelector('article').innerHTML = `
      <div class="expand-recipe">
          <div class="sidebar">
            <span class="top-arrow">&#10224;</span><br />
            <span class="down-arrow">&#10225;</span>
          </div>
          <div class="main-info">
              <header>
                  <div class="recipe-header">
                      <div class="header-title">
                        <h1></h1> <span>&#9733;</span>
                      </div>
                      <button class="edit-button">Edit Recipe</button>
                  </div>
                  <div class="meta--wrapper">
                    <span><b>Uploaded by: </b><span class="meta--user"></span></span>
                    <span><b>Yield: </b><span class="meta--yield"></span></span>
                    <span><b>Total time: </b><time class="meta--total-time"></time></span>     
                  </div>
                  <div class="categories"><b>Categories: </b><span class="meta--categories"></span></div>
                  <p class="description"></p>
                  <div class="rating--wrapper">
                      <span class="rating--value">Ratings:</span>
                      <img src="" alt="" class="rating--star-img" />
                      <span class="rating--total"></span>
                  </div>
              </header>
              <main>
                  <section class="section--instructions">
                      <h2>Instructions</h2>
                      <ol></ol>
                  </section>
                  <section class="section--ingredients">
                      <h2>Ingredients</h2>
                      <ul></ul>
                  </section>
              </main>
          </div>
          <div class="main-image">
              <img src="" alt="" class="thumbnail" />
          </div>
      </div>
    `;

    // Set Title
    const title = getTitle(data).toUpperCase();
    this.shadowRoot.querySelector('.header-title > h1').innerHTML = title;

    // Set Author
    const author = getAuthor(data);
    this.shadowRoot.querySelector('.meta--user').innerHTML = author;

    // Set the Servings yield
    const servingsYield = getYield(data);
    this.shadowRoot.querySelector('.meta--yield').innerHTML = servingsYield;

    // Set the total time
    const totalTime = convertTime(searchForKey(data, 'totalTime'));
    this.shadowRoot.querySelector('.meta--total-time').innerHTML = totalTime;

    // Set Categories
    const categories = getCategories(data);
    if (categories !== undefined) {
      categories.forEach((category) => {
        const cateItem = document.createElement('span');
        cateItem.innerHTML = category;
        this.shadowRoot.querySelector('.meta--categories').append(cateItem);
      });
    }

    // Set Description
    const description = getDescription(data);
    this.shadowRoot.querySelector('p.description').innerHTML = description;

    // Set Image
    const imgSrc = getImage(data);
    const img = this.shadowRoot.querySelector('img.thumbnail');
    img.setAttribute('src', imgSrc);
    img.setAttribute('alt', title);

    // Set Ratings
    const ratingVal = searchForKey(data, 'ratingValue');
    let ratingTotal = searchForKey(data, 'ratingCount');
    const rating = this.shadowRoot.querySelector('.rating--wrapper');
    const numStars = Math.round(ratingVal);
    if (ratingVal) {
      rating.innerHTML = `
      <img src="root/media/${numStars}-star.svg" alt="${numStars} stars">
      <span>${ratingVal}</span>
      from
      `;
      if (!ratingTotal) {
        ratingTotal = 'some';
      }
      rating.innerHTML += `<span class="rating-total">${ratingTotal} votes</span>`;
    } else {
      rating.innerHTML = `
        <span>No Reviews</span>
      `;
    }

    // Set Ingredients
    const ingredients = getIngredients(data);
    ingredients.forEach((ingredient) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = ingredient;
      this.shadowRoot.querySelector('.section--ingredients > ul').append(listItem);
    });

    // Set Instructions
    const instructions = getInstructions(data);
    instructions.forEach((instruction) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = instruction;
      this.shadowRoot.querySelector('.section--instructions > ol').append(listItem);
    });
  }

  /**
   * Returns the object of the currect recipe being used.
   */
  get data() {
    return this.json;
  }
}

customElements.define('recipe-expand', RecipeExpand);
