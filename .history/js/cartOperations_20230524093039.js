export const cartOperations = {


  cart_template: function () {
    let cartTemplate = Handlebars.compile(
      document.getElementById("cart-template").innerHTML
    );
  },
  calculateSubtotal: function () {
    let subtotal = 0;
    for (let i = 0; i < cartItems.length; i++) {
      subtotal += cartItems[i].price * (cartItems[i].count || 1);
    }
    return subtotal;
  },
  openConfirmModal: function () {
    document.getElementById("confirmModal").style.display = "block";
  },
  closeConfirmModal: function () {
    document.getElementById("confirmModal").style.display = "none";
  },
  checkOut: function () {
    cartItems = [];

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    saveCurrentStockLevels();

    updateCart();

    DisplayShoeTemplate(shoe_data);
  },
  addToCart: function (e) {
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
        saveCurrentStockLevels();

        updateCart();
        DisplayShoeTemplate(shoe_data);
        addToCartButton();
      } else {
        ("Item is out of stock");
      }
    }
  },
  addToCartButton: function () {
    let addToCartButtons = document.querySelectorAll(".add-to-cart-button");

    addToCartButtons.forEach(function (button) {
      button.addEventListener("click", function (event) {
        let itemID = event.target.dataset.id;
        let notification = document.querySelector(
          "#cart-notification-" + itemID
        );
        console.log(notification);
        setTimeout(function () {
          notification.style.display = "block";
        }, 50); // Adjust this delay as needed. This will hide then show the modal quickly
        setTimeout(function () {
          notification.style.display = "none";
        }, 2000); // hide after 2 seconds
      });
    });
  },
  updateCart: function (cartItems, currentStockLevels) {
    const cartItemsWithCurrentStock = cartItems.map((item) => ({
      ...item,
      in_stock: currentStockLevels[item.id] || 0,
    }));
    let html = this.cart_template({ cartItems: cartItemsWithCurrentStock });
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
  },
  incrementCartCount: function (id) {
    const item = cartItems.find((item) => item.id === parseInt(id));
    if (item && currentStockLevels[item.id] > 0) {
      currentStockLevels[item.id]--;
      item.count = (item.count || 0) + 1;
      updateCartCountDisplay(id, item.count);
      saveCurrentStockLevels();
      updateCart();
    }
  },
  decrementCartCount(id) {
    const item = cartItems.find((item) => item.id === parseInt(id));

    if (item && item.count > 0) {
      currentStockLevels[item.id]++;
      item.count--;
      if (item.count === 0) {
        cartItems = cartItems.filter(
          (cartItem) => cartItem.id !== parseInt(id)
        );
      }
      updateCartCountDisplay(id, item.count);
      saveCurrentStockLevels();
      updateCart();
    }
  },
  updateCartCountDisplay(id, count) {
    document.querySelector(`.cart_count_num[data-id="${id}"]`).textContent =
      count;
  },
};
