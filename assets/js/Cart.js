const panierBtn = document.querySelector('.panier-btn');
const closeBtn = document.querySelector('.close-btn');
const total = document.querySelector('.total');
const cart = document.querySelector('.data-cart');
const modalOverlay = document.querySelector('.modal-overlay');

panierBtn.addEventListener('click', () => {
    modalOverlay.classList.add("show")
  });
  
closeBtn.addEventListener('click', () => {
    modalOverlay.classList.remove("show")
    modalOverlay.classList.add("hidden")
  });


  const nbCart = document.querySelector('.nb');

/**
* Updates the content of the 'nbCart' element with the number of items in local storage.
*/
function displayNbCart(){
    nbCart.innerHTML = localStorage.length
}


/**
 *  Displays the items in the cart with their corresponding details.
 *   @function
 *   @returns {void}
 */
function displayCart(){
  
    cart.innerHTML="";
    total.innerHTML="";
    const products = []
  
    for (let i = 0; i < localStorage.length; i++) {  
        let key = localStorage.key(i);
        const obj = localStorage.getItem(key)
        const value = JSON.parse(obj)
        products.push(value)
    }
  
    var totalPrice = 0;
    products.forEach((product) => {
    const { name, image, price, qte } = product;
    totalPrice+=price
    
    const productElement = `
      <div class="product">
        <img class="product__img" src="${image}">
        <p class="product__infos">${name}<br>     <span class="product__price">${qte} x $${price}</span> </p>     
      </div>
      <hr class="line">
    `;
  
    cart.innerHTML += productElement;
  
    });
  
    const totalElement = `
        <p>Subtotal: $${totalPrice}</p>
    `;
    total.innerHTML +=totalElement;
  
}
  