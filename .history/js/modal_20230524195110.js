
export function openModal(event) {
    event.stopPropagation();
    event.preventDefault();
  
    var myModal = document.querySelector("#myModal");
    var overlay = document.querySelector(".overlay");
    var shoeFormModal = document.querySelector(".shoe-form-tab");
    
    myModal.style.display = "block"; //display the outer modal
    overlay.style.display = "block";
    shoeFormModal.classList.add("visible"); // Show the form
  }