const container = document.getElementById("container");
const cartItemsHtmlContent = document.getElementById("cart-items");
const add2cart = document.getElementsByClassName("add2Cart");

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
                  <div class="minusIcon"></div>
                  <p>1</p>
                  <div class="plusIcon"></div>
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

// Function to add item to cart
function addItemToCart(dessert) {
  if (cartQuantities[dessert.id]) {
    cartQuantities[dessert.id]++;
  } else {
    cartQuantities[dessert.id] = 1;
    addedCartItems.push(dessert);
  }

  const quantity = cartQuantities[dessert.id];

  document.querySelector(`#${dessert.id} .quantityBTN p`).innerHTML = quantity;
  const cartItem = document.querySelector(
    `#cart-items #${dessert.id} .quantity`
  );

  if (cartItem) {
    cartItem.innerHTML = `${quantity}x`;
  } else {
    cartItemsHtmlContent.innerHTML += `
      <div id="${dessert.id}">
        <div class="added-product">
          <div class="text">
            <p>${dessert.name}</p>
            <p>
              <span class="quantity">${quantity}x</span>
              <span class="unique-price">@ $${dessert.price.toFixed(2)}</span>
              $<span class="total-price">${(dessert.price * quantity).toFixed(
                2
              )}</span>
            </p>
          </div>
          <div class="remove-item-btn">x</div>
        </div>
      </div>
    `;
  }
}

function removeItemToCart(dessert) {
  if (!cartQuantities[dessert.id]) return;

  cartQuantities[dessert.id]--;
  const quantity = cartQuantities[dessert.id];

  if (quantity === 0) {
    delete cartQuantities[dessert.id];
    document.querySelector(`#cart-items #${dessert.id}`).remove();
    hideBtnStyle(dessert.id);
  } else {
    document.querySelector(`#${dessert.id} .quantityBTN p`).innerHTML =
      quantity;
    document.querySelector(
      `#cart-items #${dessert.id} .quantity`
    ).innerHTML = `${quantity}x`;
  }
}

//DELETE BUTTON   -- NOT WORKING
function deleteBTN(dessert) {
  const prova = document.querySelectorAll(
    `#cart-items #${dessert.id} .added-product .remove-item-btn`
  );

  prova.forEach((button, index) => {
    button.addEventListener("click", function () {
      const dessert = data[index];
      delete cartQuantities[dessert.id];
      document.querySelector(`#cart-items #${dessert.id}`).remove();
      hideBtnStyle(dessert.id);
    });
  });
}
