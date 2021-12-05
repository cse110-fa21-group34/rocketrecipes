/**
 * Takes a time in minutes and turns it into a string with hours and minutes
 * @param {Integer} number of minutes to be converted
 * @returns {String} string of the time to be shown on the recipe card
 */
function minutesToTimeString(timeInMinutes) {
  const numHours = Math.floor(timeInMinutes / 60);
  const numMins = timeInMinutes % 60;

  let resultString = '';
  resultString += numHours > 0 ? `${numHours} hours ` : '';
  resultString += numMins > 0 ? `${numMins} minutes` : '';

  return resultString;
}

class RecipeCard extends HTMLElement {
  constructor() {
    super(); // Inheret everything from HTMLElement

    // Attach the shadow DOM and append this markup / stlying inside
    // The shadow root will help us keep everything separated
    this.attachShadow({ mode: 'open' });
  }

  set data(data) {
    if (!data) return;

    this.json = data;

    const style = document.createElement('style');

    const card = document.createElement('article');
    card.classList.add('recipe-card');

    card.innerHTML = `
        <span class="clickable-card">
          <img src="../media/teamLogo.png" class="recipe-card-image">
          <div class="card-body">
            <h3></h3>
            <p></p>
            <span class="tag-container" />
          </div>
        <span>
    `;

    style.innerHTML = `
    @media only screen and (min-width: 100px) {
      .recipe-card {
        position: relative;
        width: 140px;
        height: 200px;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
        border-radius: 20px;
        margin: 10px;
        overflow: hidden;
        cursor: pointer;
      }
      .recipe-card:after {
        content  : "";
        position : absolute;
        z-index  : 1;
        bottom   : 0;
        left     : 0;
        pointer-events   : none;
        background-image : linear-gradient(to bottom, 
                          rgba(255,255,255, 0), 
                          rgba(255,255,255, 1) 90%);
        width    : 100%;
        height   : 15px;
      }
      .recipe-card-image {
        width: 100%;
        height: 90px;
        object-fit: cover;
      }
      .card-body {
        margin: 0px 10px;
        height: 126px;
        overflow-y: scroll;
      }
      .recipe-card h3{
        text-decoration: underline;
        margin-bottom: 4px;
        margin-top: 10px;
        font-size: 16px;
      }
      .recipe-card p{
        font-size: 12px;
        margin-top: 0;
        margin-bottom: 6px;
      }
      .tag-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-bottom: 20px;
      }
      .tag {
        border-radius: 12px;
        height: 20px;
        display: flex;
        width: unset;
        margin-right: 5px;
        margin-bottom: 5px;
      }
    }
    @media only screen and (min-width: 700px) {
      .recipe-card {
        position: relative;
        width: 200px;
        height: 250px;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
        border-radius: 20px;
        margin: 20px;
        overflow: hidden;
        cursor: pointer;
      }
      .recipe-card:after {
        content  : "";
        position : absolute;
        z-index  : 1;
        bottom   : 0;
        left     : 0;
        pointer-events   : none;
        background-image : linear-gradient(to bottom, 
                          rgba(255,255,255, 0), 
                          rgba(255,255,255, 1) 90%);
        width    : 100%;
        height   : 15px;
      }
      .recipe-card-image {
        width: 100%;
        height: 120px;
        object-fit: cover;
      }
      .card-body {
        margin: 0px 10px;
        height: 126px;
        overflow-y: scroll;
      }
      .recipe-card h3{
        text-decoration: underline;
        margin-bottom: 4px;
        margin-top: 10px;
        font-size: 16px;
      }
      .recipe-card p{
        font-size: 12px;
        margin-top: 0;
        margin-bottom: 6px;
      }
      .tag-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-bottom: 20px;
      }
      .tag {
        border-radius: 12px;
        height: 20px;
        display: flex;
        width: unset;
        margin-right: 5px;
        margin-bottom: 5px;
      }
    }
    `;
    const titleElement = card.querySelector('h3');
    titleElement.innerText = data.title || '';

    const timeElement = card.querySelector('p');
    timeElement.innerText = `${minutesToTimeString(data.readyInMinutes)}`;

    const imageElement = card.querySelector('img');
    imageElement.src = data.image || '';

    // Create tag buttons based on these tag properties
    const tagProperties = [
      { id: 'cheap', name: 'Cheap' },
      { id: 'dairyFree', name: 'Dairy Free' },
      { id: 'fiveIngredientsOrLess', name: 'Easy' },
      { id: 'glutenFree', name: 'Gluten Free' },
      { id: 'quickEat', name: 'Quick Eat' },
      { id: 'vegan', name: 'Vegan' },
      { id: 'vegetarian', name: 'Vegetarian' },
    ];
    const tagContainerElement = card.querySelector('.tag-container');
    tagProperties.forEach((tag) => {
      if (data[tag.id] === true) {
        const tagButton = document.createElement('button');
        tagButton.classList.add('tag');
        tagButton.innerText = tag.name;
        tagContainerElement.appendChild(tagButton);
      }
    });
    this.shadowRoot.append(style, card);
    card.querySelector('.clickable-card').addEventListener('click', () => {
      const currentUrl = window.location;
      window.location = `${currentUrl.origin}/root/html/RecipePage.html?id=${data.id}`;
    });
  }

  get data() {
    // Stored in .json to avoid calling set data() recursively in a loop.
    // .json is also exposed so you can technically use that as well
    return this.json;
  }
}

// Define the Class so you can use it as a custom element
customElements.define('recipe-card', RecipeCard);
