function calculateSubtotal() {
    let subtotal = 0;
    for (let i = 0; i < cartItems.length; i++) {
      subtotal += cartItems[i].price * (cartItems[i].count || 1);
    }
    return subtotal;
  }

  function openConfirmModal() {
    document.getElementById("confirmModal").style.display = "block";
  }

  function closeConfirmModal() {
    document.getElementById("confirmModal").style.display = "none";
  }


  function checkOut() {
    cartItems = [];
    
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    saveCurrentStockLevels()
  
    updateCart();
  
    DisplayShoeTemplate(shoe_data);
  }

  function addToCart(e) {
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

  
  function addToCartButton() {
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
  }


  function updateCart() {
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


  document.querySelector(".checkOut").addEventListener("click", function () {
    openConfirmModal();
  });

  document.addEventListener("click", function (event) {
    if (event.target.matches(".cart_count_inc")) {
      incrementCartCount(event.target.dataset.id);
    } else if (event.target.matches(".cart_count_dec")) {
      decrementCartCount(event.target.dataset.id);
    }
  });

  function incrementCartCount(id) {
    const item = cartItems.find((item) => item.id === parseInt(id));
    if (item && currentStockLevels[item.id] > 0) {
      currentStockLevels[item.id]--;
      item.count = (item.count || 0) + 1;
      updateCartCountDisplay(id, item.count);
      saveCurrentStockLevels()
      updateCart();
    }
  }

  function decrementCartCount(id) {
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
      saveCurrentStockLevels()
      updateCart();
    }
  }

  function updateCartCountDisplay(id, count) {
    document.querySelector(`.cart_count_num[data-id="${id}"]`).textContent =
      count;
  }

  document.addEventListener("click", addToCart);
  cartLink.addEventListener("click", openCart);