
const color_value = document.querySelector("#color_select");
const size_value = document.querySelector("#size_select");
const brand_select = document.querySelector()





function updateCategoryTemplate(selectedValue) {
    const templateSource = document.querySelector("#categoryTemplate").innerHTML;
    const shoeTemplate = Handlebars.compile(templateSource);

    const shoeData = {
        differentTowns: [
          { name: "Select Town", selected: selectedValue === "Select Town" },
          {
            name: "Cape Town",
            selected: selectedValue === "Cape Town",
          },
          {
            name: "Stellenbosch",
            selected: selectedValue === "Stellenbosch",
          },
          {
            name: "Paarl",
            selected: selectedValue === "Paarl",
          },
        ],
      };
    
    const userDataHTML = shoeTemplate(shoe);

    townDataElemTemp.innerHTML = userDataHTML;
    townDataElemTemp.value = selectedValue;
  }