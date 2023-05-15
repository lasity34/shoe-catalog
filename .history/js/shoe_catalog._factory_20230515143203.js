

export function shoe_factory() {

  function filter_shoe_categories(shoe_data, category) {
    
  const unique_category = Array.from(new Set(shoe_data.map(shoe => shoe[category])))

  const numbers = unique_category.filter(a => !NaN(a))
  const string = unique_category.filter(b => NaN(b))



   

  }



  return {
    filter_shoe_categories,
  };
}


