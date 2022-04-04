//cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
// Open Cart
cartIcon.onclick = () => {
cart.classList.add("active");
};

// CLose Car
closeCart.onclick = () => {
cart.classList.remove("active");
};

//cart working js
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
    } 
    else {
    ready();
}

// Making Function
function ready() {
    // Reomve Items From Cart
    var reomveCartButtons = document.getElementsByClassName("cart-remove");
    for (var i = 0; i < reomveCartButtons.length; i++) {
     var button = reomveCartButtons[i];
     console.log(button);
     button.addEventListener("click" ,removeCartItem);
    }

    var quantityInput = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i];
        console.log(button);
        input.addEventListener("change" ,quantityChanged);
       }

}


// Add To Cart
var addCart = document.getElementsByClassName("price-bd");
//console.dir(addCart);
for (var i = 0; i < addCart.length; i++) {
var button = addCart[i];
button.addEventListener("click", addCartClicked);
}

//adding items to cart
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement; 
    let price = shopProducts.getElementsByClassName("price")[0].innerText;
    let title = shopProducts.parentElement.getElementsByClassName("product-title")[0].innerText;
    let productImg = shopProducts.parentElement.parentElement.getElementsByClassName("card-img-top")[0].src;

    addProductToCart(price,title,productImg);
    updatetotal();
    ready();
}

//adding product to cart(display)
function addProductToCart(price,title,productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName ("cart-product-title");
for (var i = 0; i < cartItemsNames.length; i++) {
    console.log(cartItemsNames[i].innerText+" "+title);
 if(cartItemsNames[i].innerText==title){
  alert("You have already add this item to cart");
  return;
 }
}
cart.classList.add("active");
var cartBoxContent =`
<img src="${productImg}" alt="" class="cart-img">
<div class="detail-box">
<div class="cart-product-title">${title}</div>
<div class="cart-price">${price}</div>
<input type="number" value="1" class="cart-quantity">
</div>
<!-- Remove Cart -->
<i class="fa-solid fa-trash cart-remove"></i>`;
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
}

//buy button
let buy = document.getElementsByClassName("btn-buy")[0];
buy.addEventListener("click",buyButtonClicked);

function buyButtonClicked(){
    alert("Ordered is placed");
    let cartcont = document.getElementsByClassName("cart-content")[0];
    console.log(cartcont);
    while(cartcont.hasChildNodes()){
        cartcont.removeChild(cartcont.childNodes[0]);
    }
    updatetotal();
}

// Reomve Items From Cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    //console.log(buttonClicked);
    buttonClicked.parentElement.remove();
    updatetotal();
}

//quantity change function call


//function quantity change
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value<=0){
        input.value = 1;
    }

    updatetotal();
}

// Update Total
function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName ("cart-box");
    //console.log(cardBoxes);
    var total = 0;
    //console.log(cartBoxes.length);
    for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
   // console.log(priceElement.innerHTML);
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("৳",""));
    var quantity = quantityElement.value;
    console.log(price," ",quantity);
    total = total + price * quantity;
    }   

    document.getElementsByClassName ("total-price")[0].innerText = "$" + total;
}