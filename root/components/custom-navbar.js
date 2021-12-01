// custom-navbar.js

class Navbar extends HTMLElement {
  constructor() {
    super(); // Inherit everything from HTMLElement

    // Attach the shadow DOM and append this markup / stlying inside
    // The shadow root will help us keep everything separated
    this.attachShadow({ mode: 'open' });

    // create styles for navbar
    const style = document.createElement('style');
    style.innerHTML = `
        .navbar-container {
            display: flex;
            flex-direciton: row;
            align-items: center;
            justify-content: space-between;
            
            height: 80px;
            width: 100vw;
            font-size: 20px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);

        }
        .navbar-image {
            text-decoration: none;
            width: 75px;
            height 75px;
            padding: 5px 0 0 10px;
        }
        .navbar-links-container {
            display: flex;
            align-items: center;
        }
        .navbar-text-link {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 130px;
            padding: 0 20px;
            height: 80px;
            color: black;
            text-decoration: none;
        }
        .navbar-text-link:hover {
            cursor: pointer;
            background-color: #F0F0F0;
        }
    `;

    // create html for navbar
    const navbarContainer = document.createElement('div');
    navbarContainer.innerHTML = `
        <a class="navbar-image" href="./homepage.html"> 
            <img src="../media/teamLogo.png" width="75" height="75" > 
        </a>
        <div class="navbar-links-container"> 
            <a class="navbar-text-link" id="search" href="./searchpage.html">Search</a>
            <a class="navbar-text-link" id="create" href="./CreateRecipe.html">Create Recipe</a>
            <a class="navbar-text-link" id="account" href="./generalAccount.html">My Account</a>
        </div>
    `;
    navbarContainer.classList.add('navbar-container');

    const page = this.getAttribute('page');
    switch (page) {
      case 'search':
        navbarContainer.querySelector('#search').style.textDecoration = 'underline';
        break;
      case 'create':
        navbarContainer.querySelector('#create').style.textDecoration = 'underline';
        break;
      case 'account':
        navbarContainer.querySelector('#account').style.textDecoration = 'underline';
        break;
      default:
        break;
    }

    this.shadowRoot.append(style, navbarContainer);
  }
}

// Define the Class so you can use it as a custom element
customElements.define('custom-navbar', Navbar);
