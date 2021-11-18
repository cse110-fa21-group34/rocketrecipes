import {
  getOrganization,
  convertTime,
  getUrl,
  getImage,
  getCategories,
  searchForKey,
  getTitle,
} from '../scripts/RecipeCardUtil';

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
    style.innerHTML = `
      * {
        font-family: sans-serif;
        margin: 0;
        padding: 0;
      }
      
      a {
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
      
      article {
        align-items: center;
        border: 1px solid rgb(223, 225, 229);
        border-radius: 8px;
        display: grid;
        grid-template-rows: 118px 56px 14px 18px 15px 36px;
        height: auto;
        row-gap: 5px;
        padding: 0 16px 16px 16px;
        width: 178px;

        background-color: white;
        transition: all 0.2s ease;
        user-select: none;
      }

      article:hover {
        border-radius: 8px;
        cursor: pointer;
        filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.2));
        transition: all 0.2s ease;
        transform: scale(1.02);
      }

      div.rating {
        align-items: center;
        column-gap: 5px;
        display: flex;
      }
      
      div.rating > img {
        height: auto;
        display: inline-block;
        object-fit: scale-down;
        width: 78px;
      }
      article > img {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        height: 118px;
        object-fit: cover;
        margin-left: -16px;
        width: calc(100% + 32px);
      }
      .meta--categories span{
        margin:2px 4px 2px 0px;
        padding: 3px 5px;
        border:1px solid rgb(211,211,211,0.8);
        border-radius: 5px;
        background-color:rgb(211,211,211,0.3);
        display:inline-block;
      }
      p.ingredients {
        height: 32px;
        line-height: 16px;
        padding-top: 4px;
        overflow: hidden;
      }
      
      p.organization {
        color: black !important;
      }
      p.title {
        display: -webkit-box;
        font-size: 16px;
        height: 36px;
        line-height: 18px;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      p:not(.title), span, time {
        color: #70757A;
        font-size: 12px;
      }
    `;

    // Grab the title
    const titleText = getTitle(data);
    const title = document.createElement('p');
    title.classList.add('title');

    // Grab the recipe link
    const href = getUrl(data);
    const link = document.createElement('a');
    link.setAttribute('href', href);
    link.innerText = titleText;
    title.appendChild(link); // Make the title a link

    // Grab the thumbnail
    const imageUrl = getImage(data);
    const image = document.createElement('img');
    image.setAttribute('src', imageUrl);
    image.setAttribute('alt', titleText);

    // Grab the organization name
    const organizationText = getOrganization(data);
    const organization = document.createElement('p');
    organization.classList.add('organization');
    organization.innerText = organizationText;

    // Grab the reviews
    const ratingVal = searchForKey(data, 'ratingValue');
    const ratingTotal = searchForKey(data, 'ratingCount');
    const rating = document.createElement('div');
    rating.classList.add('rating');
    const numStars = Math.round(ratingVal);
    if (ratingVal) {
      rating.innerHTML = `
        <span>${ratingVal}</span>
        <img src="root/media/${numStars}-star.svg" alt="${numStars} stars">
      `;
      if (ratingTotal) {
        rating.innerHTML += `<span>(${ratingTotal})</span>`;
      }
    } else {
      rating.innerHTML = `
        <span>No Reviews</span>
      `;
    }

    // Grab the total time
    const totalTime = searchForKey(data, 'totalTime');
    const time = document.createElement('time');
    time.innerText = convertTime(totalTime);

    // Grab the categories
    const categoriesArr = getCategories(data);
    const categories = document.createElement('div');
    categories.classList.add('meta--categories');
    if (categoriesArr !== undefined) {
      categoriesArr.forEach((category) => {
        const cateItem = document.createElement('span');
        cateItem.innerHTML = category;
        categories.append(cateItem);
      });
    }

    // Add all of the elements to the card
    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(organization);
    card.appendChild(rating);
    card.appendChild(time);
    card.appendChild(categories);

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
