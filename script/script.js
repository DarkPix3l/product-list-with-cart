const container = document.getElementById("container");
let product = document.getElementById("product");
const add2cart = document.getElementsByClassName("add2Cart");
const cart = document.getElementById("cart");

fetch("./script/data.json")
  .then((response) => response.json())
  .then((data) => {

    data.forEach((element) => {
      container.innerHTML += `<div class="product">
                            <div class="actionContainer">
                                <img src="${element.image["desktop"]}">
                                
                                <a class="add2Cart">
                                    <img src="./assets/images/icon-add-to-cart.svg" alt="" srcset="">
                                    <p>Add to Cart</p>
                                </a>

                                <div class="quantityBTN">
                                    <a href="#"><div class="minusIcon"></div></a>
                                    <p>1</p>
                                    <a href="#"><div class="plusIcon"></div></a>
                                </div>
                            </div>
                            <div class="description">
                                <p class = "category">${element.category}</p>
                                <p class = "name">${element.name}</p>
                                <p class = "price">$ ${element.price.toFixed(2)}</p>
                            </div>
                        </div>`;
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

async function fetchText() {
  let response = await fetch("./script/data.json");
  let data = await response.json();
  let add2CartArray = Array.from(add2cart);
  
  
  
  add2CartArray.forEach((button, index) => {
    button.addEventListener("click", function () {
      add2cart.style.display = "none";
      cart.innerHTML = `
      <div class="addedProduct">
        <div class="text">
          <p>${data[index].name}</p>
          <p><span>xQ</span><span>@ ${data[index].price.toFixed(2)} </span><span>${data[index].price.toFixed(2)}</span></p>
        </div>
        <div class="removeItem"></div>
      </div>
      `
      console.log(`${data[index].price}`);
    });
  });
}
fetchText();
