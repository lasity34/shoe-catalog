


const color_display = document.querySelector("#color_select");
const size_display = document.querySelector("#size_select");
const brand_display = document.querySelector("#brand_select");

function updateCategoryTemplate(selectedValue) {
  const templateSource = document.querySelector("#categoryTemplate").innerHTML;
  const shoeTemplate = Handlebars.compile(templateSource);

  const shoeData = {
    differentCategories: [
      { name: "color" },
      {  name: "size" },
      { name: "brand"},
    ],
  };

  const userDataHTML = shoeTemplate(shoeData);

  color_display.innerHTML = userDataHTML;
  townDataElemTemp.value = selectedValue;
}
