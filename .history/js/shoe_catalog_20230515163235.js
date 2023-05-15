
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

function DisplayShoeTemplate() {
  const templateSource = document.querySelector("#shoeDisplayTemplate").innerHTML;
  const shoeTemplate = Handlebars.compile(templateSource);

  const shoeData = {
   color: color_display()
  }
  
  const userDataHTML = shoeTemplate(shoeData);

  shoe_display.innerHTML = userDataHTML;
 
}

function color_display() {
  const selected_color = this.value

  shoeInstance.filter_color(selected_color)
}

color_select.addEventListener("change", color_display)



    
 
})



