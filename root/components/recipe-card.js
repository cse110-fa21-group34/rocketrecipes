// import {
//   getOrganization,
//   convertTime,
//   getUrl,
//   getImage,
//   getCategories,
//   searchForKey,
//   getTitle,
// } from '../scripts/RecipeCardUtil';

// RecipeCard.js

class RecipeCard extends HTMLElement {
  constructor() {
    super(); // Inheret everything from HTMLElement

    // Attach the shadow DOM and append this markup / stlying inside
    // The shadow root will help us keep everything separated
    this.attachShadow({ mode: 'open' });
  }

  set data(data) {
    if (!data) return;

    // Used to access the actual data object
    this.json = data;

    const style = document.createElement('style');

    const card = document.createElement('article');
    card.classList.add('recipe-card');

    card.innerHTML = `
        <img src="../media/teamLogo.png" class="recipe-card-image">
        <div class="card-body">
          <h3>Recipe Title</h3>
          <p>45 mins</p>
          <span class="tag-container">
            <button id="button1" class="tag">Vegan</button>
            <button id="button2" class="tag">Vegan</button>
            <button id="button3" class="tag">long tag super</button>
          </span>
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
        align-items: flex-end;
        flex-wrap: wrap;
      }
      .tag {
        border-radius: 12px;
        height: 20px;
        display: flex;
        width: unset;
        margin-left: 5px;
        margin-bottom: 5px;
      }
      
    
    `;
    // .foodList span{
    //   display:block;
    //   margin-top: 4%;
    //   margin-bottom: 4%;
    // }
    // .foodList p{
    //   margin-bottom:1px;
    //   display:inline;
    // }
    // .foodList h4{
    //   display: inline;
    //   margin-left: 20%;
    // }
    // .foodList button{
    //   border-radius: 12px;
    //   margin-bottom:3px;
    // }

    // Grab the title
    // const titleText = getTitle(data);
    // const title = document.createElement('p');
    // title.classList.add('title');

    // // Grab the recipe link
    // const href = getUrl(data);
    // const link = document.createElement('a');
    // link.setAttribute('href', href);
    // link.innerText = titleText;
    // title.appendChild(link); // Make the title a link

    // // Grab the thumbnail
    // const imageUrl = getImage(data);
    // const image = document.createElement('img');
    // image.setAttribute('src', imageUrl);
    // image.setAttribute('alt', titleText);

    // // Grab the organization name
    // const organizationText = getOrganization(data);
    // const organization = document.createElement('p');
    // organization.classList.add('organization');
    // organization.innerText = organizationText;

    // // Grab the reviews
    // const ratingVal = searchForKey(data, 'ratingValue');
    // const ratingTotal = searchForKey(data, 'ratingCount');
    // const rating = document.createElement('div');
    // rating.classList.add('rating');
    // const numStars = Math.round(ratingVal);
    // if (ratingVal) {
    //   rating.innerHTML = `
    //     <span>${ratingVal}</span>
    //     <img src="root/media/${numStars}-star.svg" alt="${numStars} stars">
    //   `;
    //   if (ratingTotal) {
    //     rating.innerHTML += `<span>(${ratingTotal})</span>`;
    //   }
    // } else {
    //   rating.innerHTML = `
    //     <span>No Reviews</span>
    //   `;
    // }

    // // Grab the total time
    // const totalTime = searchForKey(data, 'totalTime');
    // const time = document.createElement('time');
    // time.innerText = convertTime(totalTime);

    // // Grab the categories
    // const categoriesArr = getCategories(data);
    // const categories = document.createElement('div');
    // categories.classList.add('meta--categories');
    // if (categoriesArr !== undefined) {
    //   categoriesArr.forEach((category) => {
    //     const cateItem = document.createElement('span');
    //     cateItem.innerHTML = category;
    //     categories.append(cateItem);
    //   });
    // }

    // // Add all of the elements to the card
    // card.appendChild(image);
    // card.appendChild(title);
    // card.appendChild(organization);
    // card.appendChild(rating);
    // card.appendChild(time);
    // card.appendChild(categories);

    this.shadowRoot.append(style, card);
  }

  get data() {
    // Stored in .json to avoid calling set data() recursively in a loop.
    // .json is also exposed so you can technically use that as well
    return this.json;
  }
}

// Define the Class so you can use it as a custom element
customElements.define('recipe-card', RecipeCard);
