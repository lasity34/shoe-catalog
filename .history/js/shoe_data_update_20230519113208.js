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
  const shoeImage = document.getElementById('shoeImage').files[0];

  const newShoe = {
    id: shoe_data.length + 1,
    name: shoeName,
    color: shoeColor,
    size: parseInt(shoeSize),
    brand: shoeBrand,
    price: parseInt(shoePrice),
    in_stock: parseInt(shoeStock)
  }

  shoe_data.push(newShoe)

  localStorage.setItem('shoeData', JSON.stringify(shoe_data))


})



if (localStorage.getItem('shoeData')) {
    shoe_data = JSON.parse(localStorage.getItem("shoeData"))
} else {
    shoe_data
}

console.log(shoe_data)

