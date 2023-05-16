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
   
    const color_select = document.querySelector("#color_select");
    const size_select = document.querySelector("#size_select");
    const brand_select = document.querySelector("#brand_select");
    const price_select = document.querySelector("#price_select");


    color_select.addEventListener("change", color_display);
    size_select.addEventListener("change", size_display);
    brand_select.addEventListener("change", brand_display);
    price_select.addEventListener("change", price_display);
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
      prices: shoeInstance.filter_shoe_categories(shoe_data, "price")
    };
    const userDataHTML = shoeTemplate(shoeData);

    category_display.innerHTML = userDataHTML;
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
  function update_display() {
    const selected_color = document.querySelector("#color_select").value;
    const selected_size = document.querySelector("#size_select").value;
    const selected_brand = document.querySelector("#brand_select").value;
    const selected_price = document.querySelector("#price_select").value;

    let filtered_shoes = shoe_data

    if (selected_color) {
      filtered_shoes = shoeInstance.filter_color(filtered_shoes, selected_color)
    } else if (selected_size) {
      filtered_shoes = shoeInstance.filter_size(filtered_shoes, selected_size)
    } else if (selected_brand) {
      filtered_shoes = shoeInstance.filter_brand(filtered_shoes, selected_brand)
    } else if (selected_price) {
      filtered_shoes = shoeInstance.filter_price(filtered_shoes, selected_price)
    }

    DisplayShoeTemplate(filtered_shoes)
  }


  function color_display() {
    update_display()
  }

  function size_display() {
    update_display()
  }

  function brand_display() {
    update_display()
  }

  function price_display() {
    update_display()
  }
});
