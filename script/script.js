const container = document.getElementById("container");
const product = document.getElementById("product");
const cart = document.getElementById("cart");
const cartItemsHtmlContent = document.getElementById("cart-items");
const add2cart = document.getElementsByClassName("add2Cart");

fetch("./script/data.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((dessert) => {
      container.innerHTML += `
        <div class="product-list-item" id="${dessert.id}">
          <div class="actionContainer">
              <img src="${dessert.image["desktop"]}">
              
              <div class="add2Cart">
                  <img src="./assets/images/icon-add-to-cart.svg" alt="icon-add-to-cart" srcset="">
                  <p>Add to Cart</p>
              </div>

              <div class="quantityBTN">
                  <div class="minusIcon"></div>
                  <p>1</p>
                  <div class="plusIcon"></div>
              </div>
          </div>
          
          <div class="description">
              <p class = "category">${dessert.category}</p>
              <p class = "name">${dessert.name}</p>
              <p class = "price">$ ${dessert.price.toFixed(2)}</p>
          </div>
      </div>
    `;
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

const addedCartItems = [];
const cartItemsResume = [];

let response = await fetch("./script/data.json");
let data = await response.json();
let add2CartArray = Array.from(add2cart);

function resolveBtnStyle(id) {
  const cartItemBtn = document.querySelector(
    `#${id}.product-list-item .actionContainer .quantityBTN`
  );
  cartItemBtn.style.display = "flex";
}

function addItemToCart(dessert) {
  const items = addedCartItems.filter(
    (cartItem) => cartItem.name == dessert.name
  );
  addedCartItems.push(dessert);

  resolveBtnStyle(dessert.id);

  if (items.length) {
    const itemsQuantity = items.length + 1;
    const totalPrice = items[0].price * itemsQuantity;

    const addedProductQuantity = document.querySelector(
      `#${dessert.id} .added-product .quantity`
    );
    addedProductQuantity.innerHTML = itemsQuantity + "x";

    const addedProductTotalPrice = document.querySelector(
      `#${dessert.id} .added-product .total-price`
    );
    addedProductTotalPrice.innerHTML = totalPrice.toFixed(2);
  } else {
    cartItemsHtmlContent.innerHTML += `
      <div id="${dessert.id}">
        <div class="added-product">
          <div class="text">
            <p style="color: rgb(10, 10, 10); margin-bottom: 8px;">
              ${dessert.name}
            </p>
            <p>
              <span class="quantity" style="margin-right: 12px;">1x</span>
              <span class="unique-price" style="margin-right: 12px; color: grey;">
              @ $${dessert.price.toFixed(2)}
              </span>
              $<span class="total-price">${dessert.price.toFixed(2)}</span>
            </p>
          </div>
          <div class="remove-item-btn">x</div>
        </div>
      </div>
    `;
  }
}

add2CartArray.forEach((button, index) => {
  button.addEventListener("click", function () {
    const dessert = data[index];
    addItemToCart(dessert);
  });
});
