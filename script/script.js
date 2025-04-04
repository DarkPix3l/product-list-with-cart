const container = document.getElementById("container");
const cartItemsHtmlContent = document.getElementById("cart-items");
const add2cart = document.getElementsByClassName("add2Cart");
const emptyCart = document.getElementById("empty-cart");

const addedCartItems = []; //Storing cart products
const cartQuantities = {}; // Storing product quantities

fetch("./script/data.json")
  .then((response) => response.json())
  .then((data) => {
    // adding products dynamically
    data.forEach((dessert) => {
      container.innerHTML += `
        <div class="product-list-item" id="${dessert.id}">
          <div class="actionContainer">
              <img src="${dessert.image.desktop}">
              
              <div class="add2Cart">
                  <img src="./assets/images/icon-add-to-cart.svg" alt="icon-add-to-cart">
                  <p>Add to Cart</p>
              </div>

              <div class="quantityBTN" style="display: none;">
                  <div class="minusIcon"><span>-</span></div>
                  <p>1</p>
                  <div class="plusIcon"><span>+</span></div>
              </div>
          </div>
          
          <div class="description">
              <p class="category">${dessert.category}</p>
              <p class="name">${dessert.name}</p>
              <p class="price">$${dessert.price.toFixed(2)}</p>
          </div>
      </div>
      `;
    });

    // Attach event listeners after products are loaded
    Array.from(add2cart).forEach((button, index) => {
      button.addEventListener("click", () => {
        addItemToCart(data[index]);
        showBtnStyle(data[index].id);
      });
    });

    //INCREMENT BUTTON
    document.querySelectorAll(".plusIcon").forEach((button, index) => {
      button.addEventListener("click", () => addItemToCart(data[index]));
    });

    //DECREMENT BUTTON
    document.querySelectorAll(".minusIcon").forEach((button, index) => {
      button.addEventListener("click", () => removeItemToCart(data[index]));
    });
  })
  .catch((error) => console.error("Error:", error));

///---------------------------------------------

// Show quantity btn
function showBtnStyle(id) {
  document.querySelector(`#${id} .quantityBTN`).style.display = "flex";
}

// hide quantity btn
function hideBtnStyle(id) {
  document.querySelector(`#${id} .quantityBTN`).style.display = "none";
}

// Function add item to cart
function addItemToCart(dessert) {
  if (cartQuantities[dessert.id]) {
    cartQuantities[dessert.id]++;
  } else {
    cartQuantities[dessert.id] = 1;
    addedCartItems.push(dessert);
  }
  const quantity = cartQuantities[dessert.id];

  document.querySelector(`#${dessert.id} .quantityBTN p`).innerHTML = quantity;
  const cartItem = document.querySelector(`#cart-items #${dessert.id} .quantity`);

  if (cartItem) {
    cartItem.innerHTML = `${quantity}x`;
    const totalPriceElement = document.querySelector(`#cart-items #${dessert.id} .total-price`);

    if (totalPriceElement) {
      totalPriceElement.innerHTML = `$${(dessert.price * quantity).toFixed(2)}`;
    }
  } else {
    cartItemsHtmlContent.innerHTML += `
      <div id="${dessert.id}">
        <div class="added-product">
          <div class="text">
            <p>${dessert.name}</p>
            <p>
              <span class="quantity">${quantity}x</span>
              <span class="unique-price">@ $${dessert.price.toFixed(2)}</span>
              <span class="total-price">$${(dessert.price * quantity).toFixed(2)}</span>
            </p>
          </div>
          <div class="remove-item-btn">x</div>
        </div>
      </div>
    `;
    const removeBtn = document.querySelector(`#cart-items #${dessert.id} .remove-item-btn`);
    removeBtn.addEventListener("click", () => deleteItem(dessert));
  }
  calculateCartTotals();
  cartVisibility();
}

function removeItemToCart(dessert) {
  if (!cartQuantities[dessert.id]) return;

  cartQuantities[dessert.id]--;
  const quantity = cartQuantities[dessert.id];

  if (quantity === 0) {
    //delete the item if no items in the array are left
    document.querySelector(`#cart-items #${dessert.id}`).remove();
    hideBtnStyle(dessert.id); //go back to the previous button
    
  } else {
    //increase the quantity in the red quantity btn
    document.querySelector(`#${dessert.id} .quantityBTN p`).innerHTML = quantity;
    //increase the quantity in the item cart
    document.querySelector(`#cart-items #${dessert.id} .quantity`).innerHTML = `${quantity}x`;
  }
  calculateCartTotals();
  cartVisibility();
}

// Calculate totals
function calculateCartTotals() {
  let totalCost = 0;
  let totalItems = 0;

  addedCartItems.forEach((item) => {
    const quantity = cartQuantities[item.id] || 0;
    totalCost += item.price * quantity;
    totalItems += quantity;
  });

  const prova = document.querySelector("#cart h2 span");
  prova.textContent = totalItems;

  const totalCostEl = document.querySelector("#order-total p span");
  if (totalCostEl) {
    totalCostEl.textContent = `$${totalCost.toFixed(2)}`;
  }
}

function deleteItem(dessert) {
  // Remove item from cartQuantities
  delete cartQuantities[dessert.id];
  // Remove item from addedCartItems
  document.querySelector(`#cart-items #${dessert.id}`)?.remove();
  hideBtnStyle(dessert.id);
  calculateCartTotals();
}


function cartVisibility(){  //it's NOT Working
if (addedCartItems.length === 0) {
  document.getElementById("confirm-order").classList.add("display-none");
  emptyCart.classList.remove("display-none");
} else {
  emptyCart.classList.add("display-none");
  document.getElementById("confirm-order").classList.remove("display-none");
}
}