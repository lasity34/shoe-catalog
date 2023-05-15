

export function shoe_factory() {

  function filter_shoe_categories(shoe_data, category) {
   const unique_category = new Set()
   shoe_data.forEach(shoe => unique_category.add(shoe[category]))
  
   const sorted_unique_category = Array.from(unique_category).sort((a, b) => {

    if (!isNaN(a) && !isNaN(b)) {
      return a - b;
    } else if (isNaN(a) && isNaN(b)) {
      if (a[0].toLowerCase() === 's' && b[0].toLowerCase() === 's') {
        return a.localeCompare(b);
    }
    // If a starts with 's' and b does not, a should come first
    else if (a[0].toLowerCase() === 's') {
        return -1;
    }
    // If b starts with 's' and a does not, b should come first
    else if (b[0].toLowerCase() === 's') {
        return 1;
    }
    // If neither start with 's', sort alphabetically
    else {
        return a.localeCompare(b);
    }
    } 
     else if (isNaN(a)) {
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


