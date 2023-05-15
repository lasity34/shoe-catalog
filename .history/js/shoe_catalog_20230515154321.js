import { shoe_data } from "../data/shoe_data.js";
import { shoe_factory } from "./shoe_catalog._factory.js";



const category_display = document.querySelector(".category_display")
const shoe_display = document.querySelector(".display_container")



const shoeInstance = shoe_factory()

function updateCategoryTemplate() {
  const templateSource = document.querySelector("#categoryTemplate").innerHTML;
  const shoeTemplate = Handlebars.compile(templateSource);

  const shoeData = {
    colors: shoeInstance.filter_shoe_categories(shoe_data, "color"),
    sizes: shoeInstance.filter_shoe_categories(shoe_data, "size"),
    brands: shoeInstance.filter_shoe_categories(shoe_data, "brand")

  }
  

  const userDataHTML = shoeTemplate(shoeData);

  category_display.innerHTML = userDataHTML;

  const color_select = document.querySelectorAll(".colors")
const size_select = document.querySelector(".sizes");
const brand_select = document.querySelector(".brands");
console.log(color_select.value)
}

function DisplayShoeTemplate() {
  const templateSource = document.querySelector("#shoeDisplayTemplate").innerHTML;
  const shoeTemplate = Handlebars.compile(templateSource);

  const shoeData = {
   
  }
  

  const userDataHTML = shoeTemplate(shoeData);

  shoe_display.innerHTML = userDataHTML;
 
}



document.addEventListener("DOMContentLoaded", function () {
  updateCategoryTemplate()
  DisplayShoeTemplate()
})



