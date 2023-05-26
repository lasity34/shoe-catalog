

export function update_display() {
    const selected_color = document
      .querySelector("#color_dropdown .dropdown-button")
      .getAttribute("data-color");

    const selected_size = document
      .querySelector("#size_dropdown .dropdown-button")
      .getAttribute("data-size");
    const selected_brand = document
      .querySelector("#brand_dropdown .dropdown-button")
      .getAttribute("data-brand");
    const selected_price = document
      .querySelector("#price_dropdown .dropdown-button")
      .getAttribute("data-price");

    const filtered_shoes = shoeInstance.filter_display(
      shoe_data,
      selected_color,
      selected_size,
      selected_brand,
      selected_price
    );

    DisplayShoeTemplate(filtered_shoes);

    if (filtered_shoes.length === 0) {
      shoe_display.innerHTML =
        '<div class="no_shoes_container"> <img class="error_img" src="images/no_shoes.png" /> <p class="no-shoes">Sorry, no shoes found matching your selection.</p></div>';
    }
  }