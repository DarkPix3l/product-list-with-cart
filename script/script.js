const container = document.getElementById("container");
const cartItemsHtmlContent = document.getElementById("cart-items");
const add2cart = document.getElementsByClassName("add2Cart");
const emptyCart = document.getElementById("empty-cart");

let addedCartItems = []; //Storing cart products
const cartQuantities = {}; // Storing product quantities

fetch("./script/data.json")
  .then((response) => response.json())
  .then((data) => {
    // adding products dynamically
    data.forEach((dessert) => {
      container.innerHTML += `
        <div class="product-list-item w-full h-full" id="${dessert.id}">
          <div class="actionContainer relative">
              <img class="w-full aspect-square rounded-md" src="${dessert.image.desktop}">
              
              <div class="add2Cart bg-white justify-center">
                  <img class="w-6" src="./assets/images/icon-add-to-cart.svg" alt="icon-add-to-cart">
                  <p class="ml-1 font-medium">Add to Cart</p>
              </div>

              <div class="quantityBTN justify-around bg-primary text-white hidden" style="display: none;">
                  <div class="minusIcon"><span>-</span></div>
                  <p>1</p>
                  <div class="plusIcon pt-[2px]"><span>+</span></div>
              </div>
          </div>
          
          <div class="description mt-9">
              <p class="category text-gray-700">${dessert.category}</p>
              <p class="name font-semibold">${dessert.name}</p>
              <p class="price text-[var(--Red)] font-semibold">$${dessert.price.toFixed(2)}</p>
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
        <div class="added-product flex items-center justify-between py-3 border-b border-solid border-gray-300">
          <div class="text">
            <p class="font-semibold mb-3">${dessert.name}</p>
            <p>
              <span class="quantity mr-7 text-[var(--Red)] font-semibold">${quantity}x</span>
              <span class="unique-price mr-2 text-rose2-400">@ $${dessert.price.toFixed(2)}</span>
              <span class="total-price text-rose2-500 font-semibold">$${(dessert.price * quantity).toFixed(2)}</span>
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

  console.log("Removing item:", dessert.name, "Quantity left:", quantity);

  if (quantity === 0) {
    //delete the item from the UI if no items in the array are left
    document.querySelector(`#cart-items #${dessert.id}`).remove();
    hideBtnStyle(dessert.id); //go back to the previous button

    /* delete from state */
    addedCartItems = addedCartItems.filter(item => item.id !== dessert.id);
    delete cartQuantities[dessert.id];
    
  } else {
     // Update the UI with new quantity
    document.querySelector(`#${dessert.id} .quantityBTN p`).innerHTML = quantity;
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

  //updating total items UI
  const prova = document.querySelector("#cart h2 span");
  prova.textContent = totalItems;

  //updating the sum of same tipe of items
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
