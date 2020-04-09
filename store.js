if(document.readyState= 'loading') {
    document.addEventListener('ODMContentLoaded', ready)
}
else {
    ready();
}

function ready() {
var removeCartItems = document.getElementsByClassName('btn-danger');
for(var i =0; i < removeCartItems.length; i++) {
    var button = removeCartItems[i];
removeCartItems.addEventListener('click', removeCartItem);
updateCartTotal();
}

var queantityInput = document.getElementsByClassName('card-quantity-input');
for(var i =0; i < queantityInput.length; i++) {
    var quantityButton = queantityInput[i];
queantityInput.addEventListener('change', quantityInput);
}

var addToCart = document.getElementsByClassName('shop-item-button');
for(var i =0; i < addToCart.length; i++) {
    var cartButton = addToCart[i];
cardButton.addEventListener('change', updateCartButton);
}

var purchaseButton = document.getElementsByClassName('btn-purchase');
purchaseButton.addEventListener('click', purchaseFunciton);
}


//helper functions for callback

function removeCartItem(event) {
var removeTarget = event.target;
removeTarget.parentElement.parentElement.remove();
}


function quantityInput(event) {
let changeInout = event.value;
 if(isNaN(changeInout.value) || changeInout.value <= 0){
     changeInout =0;
 }
 updateCartTotal();
}


function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-row')[0];
    var cartItemContainers = document.getElementsByClassName('cart-price');
    let total = 0;
    for(var i =0; i < cartItemContainers.length; i++) {
    var cartElement = cartItemContainers[i];
    var elementPrice = document.getElementsByClassName('cart-price')[0];
    var elementQuantity = document.getElementsByClassName('cart-quantity')[0];
var price = parseFloat(elementPrice.innerText.replace($, ''));
var quantity= elementQuantity.value;
total = total + (price * quantity);
}
total = Math.round(total * 100/ 100);
document.getElementsByClassName('cart-total-price')[0].innerText= '$' + total;
}


function updateCartButton(event) {
var updateButton = even.target;
var shopItem = updateButton.parentElement.parentElement;
var itemTitle= shopItem.getElementsByClassName('shop-item-title')[0].innerText;
var itemPrice= shopItem.getElementsByClassName('shop-item-price')[0].innerText;
var itemImage= shopItem.getElementsByClassName('shop-item-image')[0].src;
createNewCart(itemTitle, itemPrice, itemImage);
updateCartTotal();
}


function createNewCart(title, price, imageSrc) {
var rows = document.createElement('div');    
rows.classList.add('cart-row');
var cartRows = document.getElementsByClassName('cart-items')[0];
var cartTitleElement = cartRows.getElementsByClassName('card-item-title');
for(var i =0; i < cartTitleElement.length; i++){
if(cartTitleElement[i].innerText === title) {
    alert('this item has already been added to the cart');
return;
}
}
var cartRowContents = `
<div class="cart-item cart-column">
    <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
    <span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger" type="button">REMOVE</button>
</div>`;

rows.innerHTML = cartRowContents; 
cartRows.append(rows);
rows.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
rows.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', updateCartTotal);

}

function purchaseFunciton() {
alert('thank you fro your purchase');
var allCartRows = document.getElementsByClassName('cart-row');
while(allCartRows.hasChildNodes()){
allCartRows.removeChild(allCartRows.firstChild);
}
updateCartTotal();
}