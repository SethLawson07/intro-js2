const panierBtn = document.querySelector('.panier-btn');
const modalOverlay = document.querySelector('.modal-overlay');
const closeBtn = document.querySelector('.close-btn');
const divOne = document.querySelector(".one");
const cart = document.querySelector('.data-cart');
const total = document.querySelector('.total');
const nbCart = document.querySelector('.nb');

panierBtn.addEventListener('click', () => {
  modalOverlay.classList.add("show")
});

closeBtn.addEventListener('click', () => {
  modalOverlay.classList.remove("show")
  modalOverlay.classList.add("hidden")
});


function displayCart(){
  
  cart.innerHTML="";
  total.innerHTML="";
  const data = []

  for (let i = 0; i < localStorage.length; i++) {  
      let key = localStorage.key(i);
      const obj = localStorage.getItem(key)
      const value = JSON.parse(obj)
      data.push(value)
  }



  var totalPrice = 0;
  data.forEach((product) => {
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

function displayNbCart(){
  nbCart.innerHTML = localStorage.length
}
 

displayCart();
function displayProducts(products){

      products.forEach(product => {

        const productElement = document.createElement("div");
        productElement.className = "row";
        productElement.innerHTML = `
        ${product.tag=="Hot" ? 
        `<p class="tags tags__two" itemprop="label">${product.tag}</p>` : 
        `<p class="tags tags__one" itemprop="label">${product.tag}</p> `}
        <img src="${product.image}" alt="${product.name}" class="">
        <h5 class="name">${product.name}</h5>
        <span class="price">$${product.price}</span>
      `;

        const cardElement = document.createElement("div");
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
      productElement.appendChild(cardElement);
      productElement.appendChild(modalElement);
      divOne.appendChild(productElement);

      const modal = document.querySelector('.modal-container');
      const addToCartBtn = cardElement.querySelector('.add');
      
      addToCartBtn.addEventListener('click', () => {
      modal.classList.add("show")
      const obj = {
        name : product.name,
        price : product.price,
        qte : 1,
        image : product.image
      }

      localStorage.setItem(product.id,JSON.stringify(obj))
      displayCart();
      displayNbCart();

    
      
  });

 
    const btnClose = document.querySelector('.close');
    btnClose.addEventListener('click',() =>{
      modal.classList.remove("show")
      modal.classList.add("hidden")
    })

  });
  
}


fetch('./produits.json')
  .then(response => response.json())
  .then(data => {
    divOne.innerHTML = "";
    displayProducts(data)
    displayNbCart();
    var searchInput = document.getElementById("search");
    searchInput.addEventListener("input", function(event) {
      
        var searchTerm = event.target.value.toLowerCase();
        var filteredProducts = data.filter(function(product) {
            return product.name.toLowerCase().includes(searchTerm);
        });
          divOne.innerHTML = "";
      displayProducts(filteredProducts)
    
    });  
  })
  .catch(error => {
    console.error(error);
  });


 