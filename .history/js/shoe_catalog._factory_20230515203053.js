


export function shoe_factory() {

 
  function filter_shoe_categories(shoe_data, category) {
    
  const unique_category = Array.from(new Set(shoe_data.map(shoe => shoe[category])))

  const numbers = unique_category.filter(a => !isNaN(a))
  const strings = unique_category.filter(b => isNaN(b))

  // sort alphabetically
  numbers.sort((a,b) => a - b)

  strings.sort((a, b) => {
    const aStartsWithS = a[0].toLowerCase() === "s";
    const bStartWithS = b[0].toLowerCase() === "s";

    if (aStartsWithS && !bStartWithS) return -1
      if (!aStartsWithS && bStartWithS) return 1
      return a.localeCompare(b)
  })

  return [...strings, ...numbers]
  }

  function filter_color(shoe_data ,color) {
   return shoe_data.filter(shoe => shoe.color === color)
  }

  function filter_size(shoe_data ,size) {
    return shoe_data.filter(shoe => shoe.size === Number(size))
   }

  function filter_brand(shoe_data ,brand) {
    return shoe_data.filter(shoe => shoe.brand === brand)
   }



  return {
    filter_shoe_categories,
    filter_color,
    filter_size,
    filter_brand,
  
  };
}


