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