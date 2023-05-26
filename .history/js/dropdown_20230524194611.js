export function initializeDropdowns() {
    window.onclick = function (event) {
      if (!event.target.matches(".dropdown-button")) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
          const openDropdown = dropdowns[i];
          if (openDropdown.style.display === "block") { openDropdown.style.display = "none"; }
        }
      }
    };
  }

  
 export function dropdownDisplay(event) {
    const dropdownContent = event.target.parentNode.querySelector(".dropdown-content").cloneNode(true);
    const dropdownDisplayArea = document.getElementById("dropdown-display-area");

    dropdownContent.style.display = "flex"; // Ensure dropdownContent is visible
    dropdownDisplayArea.innerHTML = "";
    dropdownDisplayArea.appendChild(dropdownContent);
    dropdownDisplayArea.style.display = "flex";
    dropdownContent.addEventListener("click", dropdownSelection);
}

export function dropdownSelection(event) {
    const dropdownContent = event.target.parentElement;
    const dropdownId = dropdownContent.getAttribute("data-parent");
    const dropdownButton = document
        .getElementById(dropdownId)
        .querySelector(".dropdown-button");
    const cancelButton = document.getElementById(dropdownId).querySelector(".cancel_filter");

    cancelButton.style.display = "flex"; 

    dropdownButton.textContent = event.target.textContent;

    ["color", "size", "brand", "price"].forEach((type) => {
        const data = event.target.getAttribute(`data-${type}`);
        if (data) dropdownButton.setAttribute(`data-${type}`, data);
    });

    const originalDropdown = document.getElementById(dropdownId);
    originalDropdown.appendChild(dropdownContent);
    dropdownContent.style.display = "none";
    document.getElementById("dropdown-display-area").style.display = "none";

    update_display();
}


export function cancelDropdown(event) {
    // Stop the click event from bubbling up to the parent elements
    event.stopPropagation();
  
    // Select the parent of the cancel_filter button
    const parent = event.target.parentNode;
    
    // From the parent, select the dropdown-content and cancel_filter button
    const dropdownContent = parent.querySelector(".dropdown-content");
    const cancelButton = event.target;

    // Hide both the dropdown-content and the cancel_filter button
    dropdownContent.style.display = "none";
    cancelButton.style.display = "none"; // Hide the cancel_filter button when it is clicked

    // Reset dropdown value
    resetButtonValues(parent.id);

    const dropdownDisplayAreaContent = document.querySelector("#dropdown-display-area .dropdown-content");
    if (dropdownDisplayAreaContent) {
      dropdownDisplayAreaContent.style.display = "none";
    }

    // Update the display according to the new filter settings
    update_display();
  }

 export function resetButtonValues(dropdownId) {
    // Find the specific dropdown button
    const dropdownButton = document.querySelector(`#${dropdownId} .dropdown-button`);
  
    // Set the default button text
    if (dropdownButton) {
      if (dropdownId === "color_dropdown") {
        dropdownButton.textContent = "Color";
      } else if (dropdownId === "size_dropdown") {
        dropdownButton.textContent = "Size";
      } else if (dropdownId === "brand_dropdown") {
        dropdownButton.textContent = "Brand";
      } else if (dropdownId === "price_dropdown") {
        dropdownButton.textContent = "Price";
      }
  
      // Remove all data attributes
      dropdownButton.removeAttribute("data-color");
      dropdownButton.removeAttribute("data-size");
      dropdownButton.removeAttribute("data-brand");
      dropdownButton.removeAttribute("data-price");
    }
  }

  
  export function resetAllFilters() {
    resetButtonValues();
    DisplayShoeTemplate(shoe_data);
  }
