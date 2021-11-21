// creates form with all checkboxes for filtering search
function createCheckboxes() {
  const tagProperties = [
    { id: 'cheap', name: 'Cheap' },
    { id: 'dairyFree', name: 'Dairy Free' },
    { id: 'fiveIngredientsOrLess', name: 'Easy' },
    { id: 'glutenFree', name: 'Gluten Free' },
    { id: 'quickEat', name: 'Quick Eat' },
    { id: 'vegan', name: 'Vegan' },
    { id: 'vegetarian', name: 'Vegetarian' },
  ];

  const checkboxContainer = document.createElement('form');
  checkboxContainer.id = 'checkboxes';
  checkboxContainer.classList.add('checkboxes');

  tagProperties.forEach((tag) => {
    const tagCheckbox = document.createElement('label');
    tagCheckbox.classList.add('container');
    tagCheckbox.innerText = tag.name;

    const inp = document.createElement('input');
    inp.id = tag.id;
    inp.name = tag.name;
    inp.type = 'checkbox';

    const inpspan = document.createElement('span');
    inpspan.classList.add('checkmark');

    tagCheckbox.appendChild(inp);
    tagCheckbox.appendChild(inpspan);
    checkboxContainer.appendChild(tagCheckbox);
  });

  return checkboxContainer;
}

// creates checkbox container with show and hide buttons
function createCheckboxContainer() {
  const filterContainer = document.createElement('div');
  const checkboxFormContainer = createCheckboxes();
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
  return filterContainer;
}

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

    const checkboxContainer = createCheckboxContainer();
    searchbarContainer.appendChild(checkboxContainer);

    this.shadowRoot.append(style, searchbarContainer);

    function handleSearch() {
      const searchInputValue = searchInput.value; // serach query

      // get tags
      const tags = [];
      const checkboxes = checkboxContainer.querySelectorAll('input');
      checkboxes.forEach((c) => {
        if (c.checked) {
          tags.push(c.id);
        }
      });

      const currentUrl = window.location;
      window.location = `${currentUrl.origin}/root/html/searchpage.html?searchQuery=${searchInputValue}${tags.length > 0 ? `&tags=${tags.join(',')}` : ''}`;
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
