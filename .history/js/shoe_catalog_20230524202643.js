import { shoe_data } from "../data/shoe_data.js";
import { shoe_factory } from "./shoe_catalog._factory.js";


document.addEventListener("DOMContentLoaded", function () {
  const category_display = document.querySelector(".category_display");
  const shoe_display = document.querySelector(".display_container");

  let cartTemplate = Handlebars.compile(
    document.getElementById("cart-template").innerHTML
  );
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const add_shoe_submit = document.querySelector(".add_shoe_submit")
  let currentStockLevels = {};
  const shoeInstance = shoe_factory();
  initializeApp();

  add_shoe_submit.addEventListener('click', function() {
    
    localStorage.setItem("shoeItem", JSON.stringify(shoe_data));
    initializeApp()
    shoe_data = JSON.parse(localStorage.getItem("shoeItem"))
  })

  // main function
  function initializeApp() {
    initializeStockLevels();
    updateCategoryTemplate();
    attachHamburgerEventListener();
    shoe_search();
    resetButtonValues();
    updateCart();
  }

  // templates
  function updateCategoryTemplate() {
    const templateSource =
      document.querySelector("#categoryTemplate").innerHTML;
    const shoeTemplate = Handlebars.compile(templateSource);

    const shoeData = {
      colors: shoeInstance.filter_shoe_categories(shoe_data, "color"),
      sizes: shoeInstance.filter_shoe_categories(shoe_data, "size"),
      brands: shoeInstance.filter_shoe_categories(shoe_data, "brand"),
      prices: shoeInstance.filter_shoe_categories(shoe_data, "price"),
    };

    category_display.innerHTML = shoeTemplate(shoeData);

    const resetButton = document.querySelector(".reset_button");
    const reset_button_title = document.querySelector(".reset-button-title")
    resetButton.addEventListener("click", resetAllFilters);
    reset_button_title.addEventListener("click", resetAllFilters)

    const dropdownButtons = document.querySelectorAll(".dropdown-button");
    dropdownButtons.forEach((button) => {
      button.addEventListener("click", dropdownDisplay);
    });
  }

  function DisplayShoeTemplate(shoes) {
    const templateSource = document.querySelector(
      "#shoeDisplayTemplate"
    ).innerHTML;
    const shoeTemplate = Handlebars.compile(templateSource);
    const shoesWithCurrentStock = shoes.map((shoe) => ({
      ...shoe,
      in_stock: currentStockLevels[shoe.id]
    }));
    shoe_display.innerHTML = shoeTemplate({ shoes: shoesWithCurrentStock });
  }

  // menu items
  window.onclick = function (event) {
    if (!event.target.matches(".dropdown-button")) {
      const dropdowns = document.getElementsByClassName("dropdown-content");

      for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.style.display === "block") {
          openDropdown.style.display = "none";
        }
      }
    }
  };

  function dropdownDisplay(event) {
    const dropdownContent = event.target.parentNode.querySelector(".dropdown-content").cloneNode(true);
    const dropdownDisplayArea = document.getElementById("dropdown-display-area");

    dropdownContent.style.display = "flex"; // Ensure dropdownContent is visible
    dropdownDisplayArea.innerHTML = "";
    dropdownDisplayArea.appendChild(dropdownContent);
    dropdownDisplayArea.style.display = "flex";
    dropdownContent.addEventListener("click", dropdownSelection);
}

function dropdownSelection(event) {
    const dropdownContent = event.target.parentElement;
    const dropdownId = dropdownContent.getAttribute("data-parent");
    const dropdownButton = document
        .getElementById(dropdownId)
        .querySelector(".dropdown-button");
    const cancelButton = document.getElementById(dropdownId).querySelector(".cancel_filter");

    cancelButton.style.display = "flex"; 

    dropdownButton.textContent = event.target.textContent;

    ["color", "size", "brand", "price"].forEach((type) => {
        const data = event.target.getAttribute(`data-${type}`);
        if (data) dropdownButton.setAttribute(`data-${type}`, data);
    });

    const originalDropdown = document.getElementById(dropdownId);
    originalDropdown.appendChild(dropdownContent);
    dropdownContent.style.display = "none";
    document.getElementById("dropdown-display-area").style.display = "none";

    update_display();
}

  function cancelDropdown(event) {
    // Stop the click event from bubbling up to the parent elements
    event.stopPropagation();
  
    // Select the parent of the cancel_filter button
    const parent = event.target.parentNode;
    
    // From the parent, select the dropdown-content and cancel_filter button
    const dropdownContent = parent.querySelector(".dropdown-content");
    const cancelButton = event.target;

    // Hide both the dropdown-content and the cancel_filter button
    dropdownContent.style.display = "none";
    cancelButton.style.display = "none"; // Hide the cancel_filter button when it is clicked

    // Reset dropdown value
    resetButtonValues(parent.id);

    const dropdownDisplayAreaContent = document.querySelector("#dropdown-display-area .dropdown-content");
    if (dropdownDisplayAreaContent) {
      dropdownDisplayAreaContent.style.display = "none";
    }

    // Update the display according to the new filter settings
    update_display();
  }

  document.querySelectorAll('.cancel_filter').forEach(button => {
    button.addEventListener('click', cancelDropdown);
  });

  
function resetButtonValues(dropdownId) {
  // Find the specific dropdown button
  const dropdownButton = document.querySelector(`#${dropdownId} .dropdown-button`);

  // Set the default button text
  if (dropdownButton) {
    if (dropdownId === "color_dropdown") {
      dropdownButton.textContent = "Color";
    } else if (dropdownId === "size_dropdown") {
      dropdownButton.textContent = "Size";
    } else if (dropdownId === "brand_dropdown") {
      dropdownButton.textContent = "Brand";
    } else if (dropdownId === "price_dropdown") {
      dropdownButton.textContent = "Price";
    }

    // Remove all data attributes
    dropdownButton.removeAttribute("data-color");
    dropdownButton.removeAttribute("data-size");
    dropdownButton.removeAttribute("data-brand");
    dropdownButton.removeAttribute("data-price");
  }
}

  function resetAllFilters() {
    resetButtonValues();
    DisplayShoeTemplate(shoe_data);
  }

  function update_display() {
    const selected_color = document
      .querySelector("#color_dropdown .dropdown-button")
      .getAttribute("data-color");

    const selected_size = document
      .querySelector("#size_dropdown .dropdown-button")
      .getAttribute("data-size");
    const selected_brand = document
      .querySelector("#brand_dropdown .dropdown-button")
      .getAttribute("data-brand");
    const selected_price = document
      .querySelector("#price_dropdown .dropdown-button")
      .getAttribute("data-price");

    const filtered_shoes = shoeInstance.filter_display(
      shoe_data,
      selected_color,
      selected_size,
      selected_brand,
      selected_price
    );

    DisplayShoeTemplate(filtered_shoes);

    if (filtered_shoes.length === 0) {
      shoe_display.innerHTML =
        '<div class="no_shoes_container"> <img class="error_img" src="images/no_shoes.png" /> <p class="no-shoes">Sorry, no shoes found matching your selection.</p></div>';
    }
  }


  // search function
  function shoe_search() {
    const search_button = document.getElementById("search_button");
    const search_bar = document.getElementById("search_bar");

    function searchFunction() {
      const search_query = search_bar.value;
      const search_results = shoeInstance.search_shoes(shoe_data, search_query);
      DisplayShoeTemplate(search_results);
    }

    search_button.addEventListener("click", searchFunction);

    search_bar.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        searchFunction();
      }
    });
  }

  function attachHamburgerEventListener() {
    const hamburger = document.querySelector(".hamburger-menu");
    const select_options = document.querySelector(".category_value");

    hamburger.addEventListener("click", function () {
      select_options.classList.toggle("nav-open");
    });
  }

  // adding shoes
  // opening modal
document
.querySelector(".support")
.addEventListener("click", openModal);

function openModal(event) {
  event.stopPropagation();
  event.preventDefault();

  var myModal = document.querySelector("#myModal");
  var overlay = document.querySelector(".overlay");
  var shoeFormModal = document.querySelector(".shoe-form-tab");
  
  myModal.style.display = "block"; //display the outer modal
  overlay.style.display = "block";
  shoeFormModal.classList.add("visible"); // Show the form
}

// closing modal
document.querySelector(".shoe_cancel").addEventListener("click", closingModal);

function closingModal(event) {
  event.stopPropagation();
  event.preventDefault();
  
  var myModal = document.querySelector("#myModal");
  var overlay = document.querySelector(".overlay");
  var shoeFormModal = document.querySelector(".shoe-form-tab");
  
  myModal.style.display = "none"; //hide the outer modal
  overlay.style.display = "none";
  shoeFormModal.classList.remove("visible"); // Hide the form
}

document.querySelector(".overlay").addEventListener("click", function () {
var myModal = document.querySelector("#myModal");
var shoeFormModal = document.querySelector(".shoe-form-tab");
if (shoeFormModal.classList.contains("visible")) {
  myModal.style.display = "none"; // Hide the outer modal
  this.style.display = "none";
  shoeFormModal.classList.remove("visible"); // Hide the form
}
});


  document.querySelector(".modal").addEventListener("click", function (event) {
    event.stopPropagation();
  });

  // stock levels
  function saveCurrentStockLevels() {
    localStorage.setItem("currentStockLevels", JSON.stringify(currentStockLevels));
  }
  
  function initializeStockLevels() {
    const currentStockLevelsLocalStorage = localStorage.getItem("currentStockLevels");
  
    let shouldSave = false;
  
    // Loop over all shoes
    shoe_data.forEach((shoe) => {
      let storedStockLevel = currentStockLevelsLocalStorage ? JSON.parse(currentStockLevelsLocalStorage)[shoe.id] : null;
  
      // If there's no stored value, or the stored value is different from the current value, update it
      if (storedStockLevel === null || storedStockLevel !== shoe.in_stock) {
        console.log(`stock level for shoe id ${shoe.id} changed`)
        currentStockLevels[shoe.id] = shoe.in_stock;
        shouldSave = true;
      } else {
        // Else, load the saved value from local storage
        currentStockLevels[shoe.id] = storedStockLevel;
      }
    });
  
    if (shouldSave) {
      saveCurrentStockLevels();
    }
  
    // Now display the shoes, ensuring that we're using the correct stock levels
    DisplayShoeTemplate(shoe_data);
  }
  
  // closing and opening cart modal

  let cartLink = document.querySelector(".cart_container");
  let cartTab = document.querySelector("#cart-tab");
  let overlay = document.querySelector(".overlay");


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

  let openCart = function (e) {
    e.preventDefault();
    e.stopPropagation();
    cartTab.style.right = "0";
    overlay.style.display = "block";
  };

  document.addEventListener("click", function (e) {
    var overlay = document.querySelector(".overlay");
    if (!cartLink.contains(e.target) && !cartTab.contains(e.target)) {
      cartTab.style.right = "-100%";
      overlay.style.display = "none";
    }
  });

  document.querySelector(".cart-close").addEventListener("click", function () {
    cartTab.style.right = "-100%";
    overlay.style.display = "none";
  });

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

  document.getElementById("yesBtn").addEventListener("click", function () {
    checkOut();
    closeConfirmModal();
  });

  document.getElementById("noBtn").addEventListener("click", function () {
    closeConfirmModal();
  });

  function checkOut() {
    cartItems = [];
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    saveCurrentStockLevels()
    updateCart();
    DisplayShoeTemplate(shoe_data);
  }


  document.querySelector(".checkOut").addEventListener("click", openConfirmModal);

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
});
