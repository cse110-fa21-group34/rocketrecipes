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
        `;

    // create html for searchbar
    const searchbarContainer = document.createElement('div');
    const form = document.createElement('form');
    form.id = 'search-bar-form';
    searchbarContainer.appendChild(form);
    searchbarContainer.classList.add('bar');

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
