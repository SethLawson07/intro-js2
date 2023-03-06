const panierBtn = document.querySelector('.panier-btn');
const closeBtn = document.querySelector('.close-btn');

panierBtn.addEventListener('click', () => {
    modalOverlay.classList.add("show")
  });
  
closeBtn.addEventListener('click', () => {
    modalOverlay.classList.remove("show")
    modalOverlay.classList.add("hidden")
  });


  const nbCart = document.querySelector('.nb');

  
function displayNbCart(){
    nbCart.innerHTML = localStorage.length
  }

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
  