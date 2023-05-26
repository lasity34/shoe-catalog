

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
