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
            font-size: 20px;
            margin: 10px;
        }
        .navbar-image {
            text-decoration: none;
            width: 60px;
            height 60px;
        }
        .navbar-image > image {
            width: 60px;
            height 60px;
        }
        .navbar-links-container {
            display: flex;
            align-items: center;
            margin-right: 40px;
        }
        .navbar-text-link {
            margin-left: 30px;
            color: black;
        }
        .navbar-button-link {
            margin-left: 40px;
            border-radius: 12px;
            border-width: 1px;
            height: 40px;
            background-color: pink;
            font-size: 20px;
        }
        .navbar-button-link-create-recipe {
            margin-left: 40px;
            border-radius: 12px;
            border-width: 1px;
            height: 40px;
            background-color: pink;
            font-size: 20px;
        }
        .navbar-button-link:hover {
            cursor: pointer;
        }
    `;

    // create html for navbar
    const navbarContainer = document.createElement('div');
    navbarContainer.innerHTML = `
        <a class="navbar-image" href="./homepage.html"> 
            <img src="../media/teamLogo.png" width="60" height="60" > 
        </a>
        <div class="navbar-links-container"> 
            <a class="navbar-text-link" href="./searchpage.html">Search</a>
            <form action="./CreateRecipe.html">
                <button class="navbar-button-link-create-recipe">Create Recipe</button>
            </form>
            <form action="./generalAccount.html">
                <button class="navbar-button-link">My Account</button>
            </form>
        </div>
    `;
    navbarContainer.classList.add('navbar-container');

    this.shadowRoot.append(style, navbarContainer);
  }
}

// Define the Class so you can use it as a custom element
customElements.define('custom-navbar', Navbar);
