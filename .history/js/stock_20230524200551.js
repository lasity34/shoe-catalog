

export function initializeStockLevels() {
    const currentStockLevelsLocalStorage = localStorage.getItem("currentStockLevels");
  
    let shouldSave = false;
  
    // Loop over all shoes
    shoe_data.forEach((shoe) => {
      let storedStockLevel = currentStockLevelsLocalStorage ? JSON.parse(currentStockLevelsLocalStorage)[shoe.id] : null;
  
      // If there's no stored value, or the stored value is different from the current value, update it
      if (storedStockLevel === null || storedStockLevel !== shoe.in_stock) {
        console.log(`stock level for shoe id ${shoe.id} changed`)
        currentStockLevels[shoe.id] = shoe.in_stock;
        shouldSave = true;
      } else {
        // Else, load the saved value from local storage
        currentStockLevels[shoe.id] = storedStockLevel;
      }
    });
  
    if (shouldSave) {
      saveCurrentStockLevels();
    }
  
    // Now display the shoes, ensuring that we're using the correct stock levels
    DisplayShoeTemplate(shoe_data);
  }