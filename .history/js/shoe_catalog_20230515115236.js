


const color_display = document.querySelector("#color_select");
const size_display = document.querySelector("#size_select");
const brand_display = document.querySelector("#brand_select");
const category_display = document.querySelector(".category_value")

function updateCategoryTemplate(selectedValue) {
  const templateSource = document.querySelector("#categoryTemplate").innerHTML;
  const shoeTemplate = Handlebars.compile(templateSource);

  const shoeData = [
    
   
  ]

  const userDataHTML = shoeTemplate(shoeData);

  color_display.innerHTML = userDataHTML;
  townDataElemTemp.value = selectedValue;
}
