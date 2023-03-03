
// Sélectionner le div avec la classe "one"
const divOne = document.querySelector(".one");
const cart = document.querySelector('.data-cart');
const total = document.querySelector('.total');

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

displayCart();


function displayProducts(products){
  products.forEach(product => {

   
    // Créer les éléments HTML avec les données du produit
    const productElement = document.createElement("div");
    productElement.className = "row";
    productElement.innerHTML = `

      <p class="tags" itemprop="label">${product.tag}</p>
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
      <p><i class="fa-solid fa-circle-check"></i>  ${product.name} Successfully added to your Cart</p>
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

    const addToCartBtn = cardElement.querySelector('.add');
   //const icon = document.querySelector('.card');
   // const modal = document.querySelector('.modal-container')
   const modal = document.querySelector('.modal-container')
      addToCartBtn.addEventListener('click', () => {
      modal.style.display = 'block'
      const obj = {
        name : product.name,
        price : product.price,
        qte : 1,
        image : product.image
      }

      localStorage.setItem(product.id,JSON.stringify(obj))
      displayCart()

    
      
  });
 
 
   /*localStorage.removeItem(1)
    localStorage.removeItem(2)
    localStorage.removeItem(3)
    localStorage.removeItem(4)*/
    const btnClose = document.querySelector('.close');
    btnClose.addEventListener('click',() =>{
      modal.style.display = 'none';
    })

  });
  
}


// Faire une requête fetch pour récupérer les données JSON des produits
fetch('./produits.json')
  .then(response => response.json())
  .then(data => {
    // Pour chaque produit dans les données, créer un élément HTML et l'ajouter au div avec la classe "one"
    
    displayProducts(data)

    var searchInput = document.getElementById("search");
    searchInput.addEventListener("input", function(event) {
        var searchTerm = event.target.value.toLowerCase();
        var filteredProducts = data.filter(function(product) {
            return product.name.toLowerCase().includes(searchTerm);
        });
        //console.log(filteredProducts);
          divOne.innerHTML = "";
      displayProducts(filteredProducts)
    
    
    });
   
   
  })
  .catch(error => {
    console.error(error);
  });



 