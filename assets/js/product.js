import { fetchProducts } from "./services.js";

const divOne = document.querySelector(".one");


displayCart();


/**
 * Creates a card element.
 * @returns {Element} The card element created.
 */
function displayCard(){
    const cardElement =  document.createElement("div");
    cardElement.className = "card";
    cardElement.innerHTML = `
    <div class="icon--search">
      <i class="fa-solid fa-magnifying-glass"></i>
    </div>
    <div class="add open-modal">
      <span>ADD TO CART</span>
    </div>
    <div class="icon--shuffle">
      <i class="fa-solid fa-shuffle"></i>
    </div>
    `;
  return cardElement;
}

/**
 * Creates and returns a new HTML element for displaying a modal.
 * @returns {Element} The new modal element.
 */
function displayModal(){

    const modalElement = document.createElement('div');
    modalElement.className = "modal-container";
    modalElement.innerHTML = `
      <div class="modal">
      <div class="modal-header">
        <span class="close">&times;</span>
      </div>
      <div class="modal-content">

      Heart's Desire
      <p><i class="fa-solid fa-circle-check"></i> Successfully added to your Cart</p>
      <button class="btn-cart">VIEW CART</button> 
      <hr>
      We want to give you 10% discount for your first order,
      Use (fiama10) discount code at checkout <br>
      <i class="fa-brands fa-cc-visa"></i>
      <i class="fa-brands fa-cc-mastercard"></i>
      <i class="fa-brands fa-cc-amex"></i>
      </div>
      </div>  
    `;

  return modalElement;
 
}

/**
 * Adds a product to the cart when the 'add' button is clicked.
 * @param {Element} cardElement - The card element that contains the product information.
 * @param {Object} product - The product information to be added to the cart.
 */
function addProduct(cardElement,product){
    
    const addToCartBtn = cardElement.querySelector(".add");
    
    addToCartBtn.addEventListener('click', () => {
    const modalElement = displayModal(); 
    cardElement.appendChild(modalElement); 
    const modal = cardElement.querySelector(".modal-container"); 
    modal.classList.add("show");

    const obj = {
      name : product.name,
      price : product.price,
      qte : 1,
      image : product.image
    }

    localStorage.setItem(product.id,JSON.stringify(obj))
    displayCart();
    displayNbCart();
    
    const btnClose = cardElement.querySelector('.close');
    btnClose.addEventListener('click',() =>{
    modal.classList.remove("show")
    modal.classList.add("hidden")

    })
    
  });
        
}

/**
 * Displays the given array of products by creating HTML elements for each product and appending them to the DOM.
 * @param {Array} products - An array of product objects to be displayed.
 * @returns {undefined}
 */
function displayProducts(products) {
    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.className = "row";
        productElement.innerHTML = `
        ${product.tag=="Hot" ? 
        `<p class="tags tags__two" itemprop="label">${product.tag}</p>` : 
        `<p class="tags tags__one" itemprop="label">${product.tag}</p> `}
        <img src="${product.image}" alt="${product.name}" >
        <h5 class="name">${product.name}</h5>
        <span class="price">$${product.price}</span>
      `;      
      
      let cardElement = displayCard();
      productElement.appendChild(cardElement);
      divOne.appendChild(productElement);
      addProduct(cardElement,product)
      
  });
}

/**
 * Searches for products based on user input.
 * @param {Array} data - An array of products to search through.
 */
function search(name){
  var searchInput = document.getElementById("search");
  searchInput.addEventListener("input", function(event) {
      var searchTerm = event.target.value.toLowerCase(); 
      var filteredProducts = name.filter(function(product) {
          return product.name.toLowerCase().includes(searchTerm);
      });
        divOne.innerHTML = "";
        displayProducts(filteredProducts);
  
  });  
}





/**
 * Processes the given products.
 * Clears the content of 'divOne', displays the products, updates the number of products in the cart,
 * and performs a search on the products.
 * @param {Array} data - The products to be processed.
 */
 function processProducts(products) {
  divOne.innerHTML = "";
  displayProducts(products);
  displayNbCart();
  search(products);
}

/**
 * Retrieves products using the fetchProducts() function and processes it using the processProducts() function.
 * @function
 */
fetchProducts()
.then(products => {
  processProducts(products);
});