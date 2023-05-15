

export function shoe_factory() {

  function filter_shoe_categories(shoe_data, category) {
    
  const unique_category = Array.from(new Set(shoe_data.map(shoe => shoe[category])))

  const numbers = unique_category.filter(a => !NaN(a))
  const strings = unique_category.filter(b => NaN(b))


  numbers.sort((a,b) => a - b)

  strings.sort((a, b) => {
    const aStartsWithS = a[0].toLowerCase() === "s";
    const bStartWithS = b[0].toLowerCase() === "s";

    if (aStartsWithS && !bStartWithS) {
      return -1
    } else if (!aStartsWithS && bStartWithS) {
      return 1
    }
  })

  return [...strings, ...numbers]


  }



  return {
    filter_shoe_categories,
  };
}


