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
        <img src="../media/teamLogo.png" class="recipe-card-image">
        <div class="card-body">
          <h3>
            <button>Edit Recipe</button>
            <button>Delete Recipe</button>
          </h3>
          <p></p>
          <span class="tag-container" />
        </div>
    `;

    style.innerHTML = `
      .recipe-card {
        width: 200px;
        height: 250px;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
        border-radius: 20px;
        margin: 20px;
        overflow: hidden;
        cursor: pointer;
      }
      .recipe-card-image {
        width: 100%;
        height: 120px;
        object-fit: cover;
      }
      .card-body {
        margin: 0px 10px;
        height: 115px;
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
      }
      .tag {
        border-radius: 12px;
        height: 20px;
        display: flex;
        width: unset;
        margin-right: 5px;
        margin-bottom: 5px;
      }
    `;
    const titleElement = card.querySelector('h3');
    titleElement.innerText = data.title || '';

    const timeElement = card.querySelector('p');
    timeElement.innerText = `${data.readyInMinutes} minutes` || '';

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
    this.addEventListener('click', () => {
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
