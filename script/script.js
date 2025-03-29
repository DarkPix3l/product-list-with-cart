const container = document.getElementById("container");
let product = document.getElementById("product");
const add2cart = document.getElementsByClassName("add2Cart");

fetch("./script/data.json")
  .then((response) => response.json())
  .then((data) => {

    console.log(data);
    console.log(data.image);

data.forEach(element => {
    container.innerHTML += 
                        `<div class="product">
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
                                <p class = "price">$ ${element.price}</p>
                            </div>
                        </div>`;
});

  }) 
  .catch((error) => {
    console.error("Error:", error);
  });

add2cart.addEventListener("click", function(){  //NOT WORKING. probably because it's running when the products are not still created?
     alert("Hello World!"); 
    });
