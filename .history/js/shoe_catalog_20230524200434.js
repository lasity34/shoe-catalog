import { shoe_data } from "../data/shoe_data.js";
import { shoe_factory } from "./shoe_catalog._factory.js";
import { initializeDropdowns, dropdownDisplay, dropdownSelection, cancelDropdown, resetButtonValues, resetAllFilters } from './dropdown.js';
import { update_display } from './filter.js';
import { shoe_search } from './search.js';
import { attachHamburgerEventListener } from './hamburger.js';
import { openModal, closingModal } from './modal.js';
import { initializeStockLevels } from './stock.js';
import { addToCart, updateCart, openCart } from './cart.js';


document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".support").addEventListener("click", openModal);

document.querySelector(".modal").addEventListener("click", function (event) { event.stopPropagation(); });
document.querySelectorAll('.cancel_filter').forEach(button => { button.addEventListener('click', cancelDropdown); });
initializeStockLevels();
initializeDropdowns();
shoe_search();
update_display();
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



  // adding shoes
  // opening modal
document
.querySelector(".support")
.addEventListener("click", openModal);



// closing modal
document.querySelector(".shoe_cancel").addEventListener("click", closingModal);



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
  
  
  
  // closing and opening cart modal

  let cartLink = document.querySelector(".cart_container");
  let cartTab = document.querySelector("#cart-tab");
  let overlay = document.querySelector(".overlay");





 
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
