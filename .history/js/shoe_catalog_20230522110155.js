import { shoe_data } from "../data/shoe_data.js";
import { shoe_factory } from "./shoe_catalog._factory.js";

document.addEventListener("DOMContentLoaded", function () {
  const category_display = document.querySelector(".category_display");
  const shoe_display = document.querySelector(".display_container");



  const shoeInstance = shoe_factory();
  initializeApp();

  // main function
  function initializeApp() {
    updateCategoryTemplate();
    attachHamburgerEventListener();
    shoe_search();
    DisplayShoeTemplate(shoe_data);
    resetButtonValues();
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

    const resetButton = document.getElementById("reset_button");
    resetButton.addEventListener("click", resetAllFilters);

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
    shoe_display.innerHTML = shoeTemplate({ shoes: shoes });
  }

  // helper functions
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
    const dropdownContent = event.target.parentNode
      .querySelector(".dropdown-content")
      .cloneNode(true);

    const dropdownDisplayArea = document.getElementById(
      "dropdown-display-area"
    );

    dropdownDisplayArea.innerHTML = "";
    dropdownDisplayArea.appendChild(dropdownContent);
    dropdownDisplayArea.style.display = "block";
    dropdownContent.addEventListener("click", dropdownSelection);
  }

  function dropdownSelection(event) {
    const dropdownContent = event.target.parentElement;
    const dropdownId = dropdownContent.getAttribute("data-parent");
    const dropdownButton = document
      .getElementById(dropdownId)
      .querySelector(".dropdown-button");

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

  function resetButtonValues() {
    const dropdownButtons = document.querySelectorAll(".dropdown-button");

    dropdownButtons.forEach((button) => {
      // Set default button texts
      if (button.parentNode.id === "color_dropdown") {
        button.textContent = "Color";
      } else if (button.parentNode.id === "size_dropdown") {
        button.textContent = "Size";
      } else if (button.parentNode.id === "brand_dropdown") {
        button.textContent = "Brand";
      } else if (button.parentNode.id === "price_dropdown") {
        button.textContent = "Price";
      }

      // Remove all data attributes
      button.removeAttribute("data-color");
      button.removeAttribute("data-size");
      button.removeAttribute("data-brand");
      button.removeAttribute("data-price");
    });
  }

  function resetAllFilters() {
    resetButtonValues();
    DisplayShoeTemplate(shoe_data);
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

  // cart
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  let cartItems = [];

 let cartTemplate = Handlebars.compile(document.getElementById('cart-template').innerHTML)

  function addToCart(e) {
    if(e.target && e.target.className == 'add-to-cart-button') {

      let product = shoe_data.find(shoe => shoe.id === parseInt(e.target.dataset.id));
    
      cartItems.push(product)

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
     
      updateCart()
    }
  }


  let cartLink = document.querySelector('.cart_container');
  let cartTab = document.querySelector('#cart-tab');

  let openCart = function(e) {
    e.preventDefault();
    cartTab.style.right = "0";
  }

  cartLink.addEventListener('click', openCart);


  document.addEventListener('click', function(e) {
    if (!cartLink.contains(e.target) &&  !cartTab.contains(e.target)) {
      cartTab.style.right = "-100%";
    }
});

function updateCart() {
  let html = cartTemplate({cartItems: cartItems})
  document.getElementById('cart-list').innerHTML = html
}

document.addEventListener('click',addToCart)

});


