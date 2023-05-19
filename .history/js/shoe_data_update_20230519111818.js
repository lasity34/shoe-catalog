import { shoe_data } from "../data/shoe_data.js";


console.log(shoe_data)

const shoe_form = document.getElementById("shoeForm")

shoe_form.addEventListener('submit',  function(event) {
    event.preventDefault()

    const shoeName = document.getElementById('shoeName').value;
  const shoeColor = document.getElementById('shoeColor').value;
  const shoeSize = document.getElementById('shoeSize').value;
  const shoeBrand = document.getElementById('shoeBrand').value;
  const shoePrice = document.getElementById('shoePrice').value;
  const shoeStock = document.getElementById('shoeStock').value;

})