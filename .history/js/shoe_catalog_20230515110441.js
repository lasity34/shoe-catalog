const color_value = document.querySelector("#color_select");
const size_value = document.querySelector("#size_select");
const brand_value = document.querySelector();

function updateCategoryTemplate(selectedValue) {
  const templateSource = document.querySelector("#categoryTemplate").innerHTML;
  const shoeTemplate = Handlebars.compile(templateSource);

  const shoeData = {
    differentCategories: [
      { name: "color" },
      {  name: "size" },
      {
        name: "brand"},
    ],
  };

  const userDataHTML = shoeTemplate(shoeData);

  townDataElemTemp.innerHTML = userDataHTML;
  townDataElemTemp.value = selectedValue;
}
