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
        searchbarContainer.innerHTML = `
        <form id="form">
            <input class="searchbar"type="text" id="ss" name="s"
            placeholder="Start typing..."
            aria-label="Search through site content"/>
            <button>
                <a href="#"> 
                    <img class="search" src="../media/search.png" alt="Search"/>
                </a>
            </button>
        </form>
        `;
        searchbarContainer.classList.add('bar');

        this.shadowRoot.append(style, searchbarContainer);
    }
}

// Define the Class so you can use it as a custom element
customElements.define('custom-searchbar', Searchbar);