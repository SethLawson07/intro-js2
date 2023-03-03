const panierBtn = document.querySelector('.panier-btn');
const modalOverlay = document.querySelector('.modal-overlay');
const closeBtn = document.querySelector('.close-btn');

panierBtn.addEventListener('click', () => {
  modalOverlay.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  modalOverlay.style.display = 'none';
});


/*

const data = []
for (let i = 0; i < localStorage.length; i++) {
  
  let key = localStorage.key(i);
  const obj = localStorage.getItem(key)
  const value = JSON.parse(obj)
  data.push(value)
}

const cart = document.querySelector('.data-cart');
const total = document.querySelector('.total');

var totalPrice = 0;
data.forEach((product) => {
  const { name, image, price } = product;
  totalPrice+=price
  
  const productElement = `
    <div class="product">
      <img class="product__img" src="${image}">
      <h2 class="product__name">${name} ${price}$</h2>
     
    </div>

  `;

  cart.innerHTML += productElement;
});

const totalElement = `
    <span>Subtotal: $ ${totalPrice}</span>
`;

total.innerHTML +=totalElement;

*/