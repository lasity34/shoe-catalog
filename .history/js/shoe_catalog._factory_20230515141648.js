

export function shoe_factory() {

  function filter_shoe_categories(shoe_data, category) {
   const unique_category = new Set()
   shoe_data.forEach(shoe => unique_category.add(shoe[category]))
  
   const sorted_unique_category = Array.from(unique_category).sort((a, b) => {

    if (!isNaN(a) && !isNaN(b)) {
      return a - b;
    } else if (isNaN(a) && isNaN(b)) {
      return  a.localeCompare(b)
    } else if (isNaN(a)) {
      return -1
    } else {
      return 1
    }

    
   })


   return sorted_unique_category

  }



  return {
    filter_shoe_categories,
  };
}


