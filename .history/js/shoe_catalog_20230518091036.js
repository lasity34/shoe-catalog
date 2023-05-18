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
    DisplayShoeTemplate(shoe_data);

    // Attach click event listener to each dropdown menu button

   

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
      const userDataHTML = shoeTemplate(shoeData);

      category_display.innerHTML = userDataHTML;

      const dropdownButtons = document.querySelectorAll(".dropdown-button");
      dropdownButtons.forEach((button) => {
        button.addEventListener("click", dropdownDisplay);
      });
    }
  }

  function DisplayShoeTemplate(shoes) {
    const templateSource = document.querySelector(
      "#shoeDisplayTemplate"
    ).innerHTML;
    const shoeTemplate = Handlebars.compile(templateSource);
    const shoeData = { shoes: shoes };
    const userDataHTML = shoeTemplate(shoeData);
    shoe_display.innerHTML = userDataHTML;
  }

  // helper functions
  // loads all dropdowns
  document.addEventListener('click', function(event) {
    if (!event.target.matches(".dropdown-button")) {
      const dropdowns = document.getElementsByClassName("dropdown-content");
      for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.style.display === "block") {
          openDropdown.style.display = "none";
        }
      }
    }
  });

  function dropdownDisplay(event) {
    const dropdownContent = event.target.parentNode.querySelector(".dropdown-content");
    dropdownContent.style.display = "block";
    dropdownContent.addEventListener("click", dropdownSelection);
  }

  function dropdownSelection(event) {
    const dropdownContent = event.target.parentElement;
    const dropdownId = dropdownContent.getAttribute("data-parent");
    const dropdownButton = document.getElementById(dropdownId).querySelector(".dropdown-button");

    dropdownButton.textContent = event.target.textContent;

    const attributes = ["color", "size", "brand", "price"];
    attributes.forEach(attr => {
      const value = event.target.getAttribute(`data-${attr}`);
      if (value) dropdownButton.setAttribute(`data-${attr}`, value);
    });

    dropdownContent.style.display = "none";
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
        '<p class="no-shoes">Sorry, no shoes found matching your selection.</p>';
    }
  }

  function attachHamburgerEventListener() {
    const hamburger = document.querySelector(".hamburger-menu");
    const select_options = document.querySelector(".category_value");

    hamburger.addEventListener("click", function () {
      select_options.classList.toggle("nav-open");
    });
  }
});
