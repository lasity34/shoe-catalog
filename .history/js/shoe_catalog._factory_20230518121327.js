



export function shoe_factory() {

 
  function filter_shoe_categories(shoe_data, category) {
    
  const unique_category = Array.from(new Set(shoe_data.map(shoe => shoe[category])))

  const numbers = unique_category.filter(a => !isNaN(a))
  const strings = unique_category.filter(b => isNaN(b))

  // sort alphabetically
  numbers.sort((a,b) => a - b)

  strings.sort((a, b) => {
   
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

   function filter_price(shoe_data, price) {
    return shoe_data.filter(shoe => shoe.price === Number(price))
}

  function filter_display(shoeData, selected_color, selected_size, selected_brand, selected_price) {
    let filtered_shoes = shoeData

    if (selected_color) {
      filtered_shoes = filter_color(filtered_shoes, selected_color)
    }
     if (selected_size) {
      filtered_shoes = filter_size(filtered_shoes, selected_size)
    }
     if (selected_brand) {
      filtered_shoes = filter_brand(filtered_shoes, selected_brand)
    }
     if (selected_price) {
      filtered_shoes = filter_price(filtered_shoes, selected_price)
    }
  
    return filtered_shoes
  }

  // search filter
  function search_shoes(shoe_data, query) {
    return shoe_data.filter(shoe => shoe.name.toLowerCase().includes(query.toLowerCase()))
  }

  return {
    filter_shoe_categories,
    filter_color,
    filter_size,
    filter_brand,
    filter_price,
    filter_display,
    search_shoes
  };
}


