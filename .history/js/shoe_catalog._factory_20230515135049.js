

export function shoe_factory() {

  function filter_shoe_categories(shoe_data, category) {
   const unique_category = new set()
   shoe_data.forEach(shoe => unique_category.add(category[shoe]))
   return Array.from(unique_category)
  }

  return {
    filter_shoe_categories,
  };
}

