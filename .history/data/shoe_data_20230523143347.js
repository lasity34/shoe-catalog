




let shoe_data = getShoeData();

function getShoeData() {
  return JSON.parse(localStorage.getItem("shoeData")) || [];
}

// ...

function addShoeToData() {
  const shoeName = document.getElementById("shoeName").value;
  const shoeColor = document.getElementById("shoeColor").value;
  const shoeSize = document.getElementById("shoeSize").value;
  const shoeBrand = document.getElementById("shoeBrand").value;
  const shoePrice = document.getElementById("shoePrice").value;
  const shoeStock = document.getElementById("shoeStock").value;
  const shoeImage = document.getElementById("shoeImage").value;

  const existingShoe = shoe_data.find((shoe) => shoe.name === shoeName);

  if (existingShoe) {
    existingShoe.in_stock += parseInt(shoeStock);
  } else {
    const newShoe = {
      id: shoe_data.length + 1,
      name: shoeName,
      color: shoeColor,
      size: parseInt(shoeSize),
      brand: shoeBrand,
      price: parseInt(shoePrice),
      in_stock: parseInt(shoeStock),
      img: shoeImage,
    };

    shoe_data.push(newShoe);
  }

  localStorage.setItem("shoeData", JSON.stringify(shoe_data));
}




const shoe_form = document.getElementById("shoeForm");

if (shoe_form) {
  shoe_form.addEventListener("submit", function (event) {
    event.preventDefault();

    shoe_data.unshift(newShoe);

    addShoeToData();
  });
}



console.log(shoe_data);

export { shoe_data };
