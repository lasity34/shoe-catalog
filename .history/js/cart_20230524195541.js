

export function addToCart(e) {
  if (e.target && e.target.className == "add-to-cart-button") {
    let product = shoe_data.find(
      (shoe) => shoe.id === parseInt(e.target.dataset.id)
    );

    const productInCart = cartItems.find((item) => item.id === product.id);

    if (currentStockLevels[product.id] > 0 && !productInCart) {
      product.count = 1;
      cartItems.push(product);
      currentStockLevels[product.id]--;

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      saveCurrentStockLevels()      
      updateCart();
      DisplayShoeTemplate(shoe_data);
      addToCartButton();
    } else {
      ("Item is out of stock");
    }
  }
}


export function updateCart() {
    const cartItemsWithCurrentStock = cartItems.map((item) => ({
        ...item,
        in_stock: currentStockLevels[item.id] || 0,
    }));
    let html = cartTemplate({ cartItems: cartItemsWithCurrentStock });
    document.getElementById("cart-list").innerHTML = html;
    document.querySelector(".subtotal").textContent =
        "R" + calculateSubtotal() + ".00";

    document.querySelector(".cart_added_number").textContent = cartItems.reduce(
        (total, item) => total + (item.count || 0),
        0
    );

    cartItems.forEach((item) =>
        updateCartCountDisplay(item.id, item.count || 0)
    );
}

export let openCart = function (e) {
    e.preventDefault();
    e.stopPropagation();
    cartTab.style.right = "0";
    overlay.style.display = "block";
  };
