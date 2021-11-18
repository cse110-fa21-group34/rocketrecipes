
// custom-navbar.js

class Navbar extends HTMLElement {
  constructor() {
    super(); // Inheret everything from HTMLElement

    // Attach the shadow DOM and append this markup / stlying inside
    // The shadow root will help us keep everything separated
    this.attachShadow({ mode: 'open' });
    
    // create styles for navbar
    const style = document.createElement('style');
    style.innerHTML = `
        .topBar {
            display: block;
            height: 100%;
            margin-top: 20px;
            text-align: right;
        }
        .topBar button {
            margin-right: 40px;
            border-radius: 12px;
            border-width: 1px;
            width: 115px;
            height: 40px;
            background-color: pink;
            font-size: 20px;
        }
        .topBar a {
            font-size: 20px;
            margin-right: 40px;
            height: 60px;
        }
        .topBar a > image {
            margin-left: 20px;
        }
    `;

    // create html for navbar
    const navbarContainer = document.createElement('div');
    navbarContainer.innerHTML = `
        <a href="./homepage.html" style="text-decoration: none; float: left;">
            <img src="../media/teamLogo.png" width="60" height="60" > 
        </a>
        <a>Search</a>
        <a>My Account</a>
    `;
    navbarContainer.classList.add('topBar');

    

    this.shadowRoot.append(style, navbarContainer);
  }
}

// Define the Class so you can use it as a custom element
customElements.define('custom-navbar', Navbar);
