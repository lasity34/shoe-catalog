
import { shoe_data } from "../data/shoe_data.js";
import { shoe_factory } from "./shoe_catalog._factory.js";

document.addEventListener("DOMContentLoaded", function () {

 


const category_display = document.querySelector(".category_display")
const shoe_display = document.querySelector(".display_container")



const shoeInstance = shoe_factory()

updateCategoryTemplate()
DisplayShoeTemplate()
const color_select = document.querySelector("#color_select")
const size_select = document.querySelector("#size_select");
const brand_select = document.querySelector("#brand_select");



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

}

function DisplayShoeTemplate(shoes) {
  const templateSource = document.querySelector("#shoeDisplayTemplate").innerHTML;
  const shoeTemplate = Handlebars.compile(templateSource);

  const shoeData = {shoes: shoes}
  

  const userDataHTML = shoeTemplate(shoeData);

  shoe_display.innerHTML = userDataHTML;
 
}

function color_display() {
  const selected_color = this.value
  const filtered_shoes = shoeInstance.filter_color(shoe_data, selected_color)
  DisplayShoeTemplate(filtered_shoes)
}

function size_display() {
  const selected_size = this.value
  const filtered_size = shoeInstance.filter_size(shoe_data, selected_size)
  DisplayShoeTemplate(filtered_size)
}

function brand_display() {
  const selected_brand = this.value
  const filtered_brand = shoeInstance.filter_brand(shoe_data, selected_brand)
  DisplayShoeTemplate(filtered_brand)
}

color_select.addEventListener("change", color_display)
size_select.addEventListener("change", size_display)
brand_select.addEventListener("chnage", brand_display)



    
 
})



