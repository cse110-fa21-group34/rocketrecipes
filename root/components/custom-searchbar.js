class Searchbar extends HTMLElement {
  constructor() {
    super(); // Inheret everything from HTMLElement

    // Attach the shadow DOM and append this markup / stlying inside
    this.attachShadow({ mode: 'open' });

    // create styles for searchbar
    const style = document.createElement('style');
    style.innerHTML = ` 
            .bar{
                margin:0 auto;
                width:700px;
                border-radius:30px;
                border:1px solid #dcdcdc;
                
            }
            .bar:hover{
                box-shadow: 1px 1px 8px 1px #dcdcdc;
            }
            .bar:focus-within{
                box-shadow: 1px 1px 8px 1px #dcdcdc;
                outline:none;
            }
            .searchbar{
                height:16px;
                border:none;
                
                width:575px;
                font-size:16px;
                outline: none;
                padding-bottom:20px;
            }
            .search{
                padding-top:10px;
                height:16px;
                position:relative;
                display:inline-block;
                top:5px;
                left:10px;
            }
            .bar button{
                padding-top:10px;
                border:none;
                outline: none;
                background-color: #ffffff;
            }

            .checkboxes {
                display: none;
                position: relative;
                padding-left: 35px;
                margin-bottom: 12px;
                margin: auto;
                width: 50%;
                cursor: pointer;
                font-size: 22px;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }

            .container {
                display: block;
                position: relative;
                padding-left: 35px;
                margin-bottom: 12px;
                margin: auto;
                width: 50%;
                cursor: pointer;
                font-size: 22px;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }

            .container input {
                position: absolute;
                opacity: 0;
                cursor: pointer;
                height: 0;
                width: 0;
            }

            .checkmark {
                position: absolute;
                top: 0;
                left: 0;
                height: 25px;
                width: 25px;
                background-color: #eee;
            }

            .container:hover input ~ .checkmark {
                background-color: #ccc;
            }

            .container input:checked ~ .checkmark {
                background-color: #2196F3;
            }

            .checkmark:after {
                content: "";
                position: absolute;
                display: none;
            }

            .container input:checked ~ .checkmark:after {
                display: block;
            }

            .container .checkmark:after {
                left: 9px;
                top: 5px;
                width: 5px;
                height: 10px;
                border: solid white;
                border-width: 0 3px 3px 0;
                -webkit-transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                transform: rotate(45deg);
            }
        `;

    // create html for searchbar
    const searchbarContainer = document.createElement('div');
    const form = document.createElement('form');
    form.id = 'search-bar-form';
    searchbarContainer.appendChild(form);
    form.classList.add('bar');

    const searchInput = document.createElement('input');
    searchInput.classList.add('searchbar');
    searchInput.type = 'text';
    searchInput.id = 'ss';
    searchInput.name = 's';
    searchInput.placeholder = 'Start typing...';
    searchInput.ariaLabel = 'Search through site content';

    const searchButton = document.createElement('button');
    searchButton.innerHTML = `
        <a href="#"> 
            <img class="search" src="../media/search.png" alt="Search"/>
        </a>
    `;

    form.appendChild(searchInput);
    form.appendChild(searchButton);

    const filterContainer = document.createElement('div');
    const checkboxFormContainer = document.createElement('form');
    checkboxFormContainer.id = 'checkboxes';
    checkboxFormContainer.classList.add('checkboxes');

    // create checkboxes
    checkboxFormContainer.innerHTML = `
        <label class="container">Vegan
            <input type="checkbox" id="Vegan" name="Vegan">
            <span class="checkmark"></span>
        </label>
        <label class="container">Vegetarian
            <input type="checkbox" id="Vegetarian" name="Vegetarian">
            <span class="checkmark"></span>
        </label>
        <label class="container">Quick Cook
            <input type="checkbox" id="Quick Cook" name="Quick Cook">
            <span class="checkmark"></span>
        </label>
        <label class="container">Highly Rated
            <input type="checkbox" id="Highly Rated" name="Highly Rated">
            <span class="checkmark"></span>
        </label>
        <label class="container">Easy
            <input type="checkbox" id="Easy" name="Easy">
            <span class="checkmark"></span>
        </label>
        <label class="container">Medium
            <input type="checkbox" id="Medium" name="Medium">
            <span class="checkmark"></span>
        </label>
        <label class="container">Hard
            <input type="checkbox" id="Hard" name="Hard">
            <span class="checkmark"></span>
        </label>
        <label class="container">Keto
            <input type="checkbox" id="Keto" name="Keto">
            <span class="checkmark"></span>
        </label>
        <label class="container">5 ingredients
            <input type="checkbox" id="5 ingredients" name="5 ingredients">
            <span class="checkmark"></span>
        </label>
    `;

    // create show and hide checkbox buttons and their logic
    const showCheckboxesButton = document.createElement('button');
    showCheckboxesButton.innerText = 'Show';

    const hideCheckboxesButton = document.createElement('button');
    hideCheckboxesButton.style.display = 'none';
    hideCheckboxesButton.innerText = 'Hide';

    showCheckboxesButton.onclick = () => {
      checkboxFormContainer.style.display = 'unset';
      showCheckboxesButton.style.display = 'none';
      hideCheckboxesButton.style.display = 'unset';
    };

    hideCheckboxesButton.onclick = () => {
      checkboxFormContainer.style.display = 'none';
      showCheckboxesButton.style.display = 'unset';
      hideCheckboxesButton.style.display = 'none';
    };

    // add all checkbox containers and elements to the container
    filterContainer.appendChild(showCheckboxesButton);
    filterContainer.appendChild(hideCheckboxesButton);
    filterContainer.appendChild(checkboxFormContainer);

    searchbarContainer.appendChild(filterContainer);

    this.shadowRoot.append(style, searchbarContainer);

    function handleSearch() {
      const searchInputValue = searchInput.value;

      const currentUrl = window.location;
      window.location = `${currentUrl.origin}/root/html/searchpage.html?searchQuery=${searchInputValue}`;
    }

    form.addEventListener('submit',
      (e) => {
        e.preventDefault();
        handleSearch(e);
      });
  }
}

// Define the Class so you can use it as a custom element
customElements.define('custom-searchbar', Searchbar);
