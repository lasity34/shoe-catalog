import { shoe_data } from "../data/shoe_data.js";
import { shoe_factory } from "./shoe_catalog._factory.js";


const color_select = document.querySelector("#color_select");
const size_select = document.querySelector("#size_select");
const brand_select = document.querySelector("#brand_select");
const category_display = document.querySelector(".category_display")



const shoeInstance = shoe_factory()

function updateCategoryTemplate() {
  const templateSource = document.querySelector("#categoryTemplate").innerHTML;
  const shoeTemplate = Handlebars.compile(templateSource);

  const shoeData = {
    colors: shoeInstance.filter_shoe_categories(shoe_data, "color") || "Select Color",
    sizes: shoeInstance.filter_shoe_categories(shoe_data, "size"),
    brands: shoeInstance.filter_shoe_categories(shoe_data, "brand")

  }

  const userDataHTML = shoeTemplate(shoeData);

  category_display.innerHTML = userDataHTML;
 
}

document.addEventListener("DOMContentLoaded", function () {
  updateCategoryTemplate()
})


color_select.addEventListener("change", updateCategoryTemplate)
size_select.addEventListener("change", updateCategoryTemplate)
brand_select.addEventListener("change", updateCategoryTemplate)
