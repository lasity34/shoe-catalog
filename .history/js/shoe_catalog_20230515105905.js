
const color_value = document.querySelector("#color_select");
const size_value = document.querySelector("#size_select");
const brand_select = document.querySelector()





function updateCategoryTemplate(selectedValue) {
    const templateSource = document.querySelector("#categoryTemplate").innerHTML;
    const categoryTemplate = Handlebars.compile(templateSource);

    
    const userDataHTML = townTemplate(townData);

    townDataElemTemp.innerHTML = userDataHTML;
    townDataElemTemp.value = selectedValue;
  }