// import { shoe_data } from "../data/shoe_data";

function shoe_factory() {
  function filter_shoe_categories(shoe_data, category) {
    const unique_category = new Set()
    shoe_data.forEach(shoe => unique_category.add(shoe[category]))

    return Array.from(unique_category)
  }

  return {
    filter_shoe_categories,
  };
}


// function filter_shoe_categories(showData, category) {
//     const unique_category = new Set();
//     showData.forEach((shoe) => unique_category.add(shoe[category]));
//     return Array.from(unique_category);
//   }