export let shoe_data = [
  {
    id: 1,
    color: "Black",
    name: "Jordan Retro Thunder",
    brand: "Jordan",
    size: 10,
    price: 7999,
    img: "./images/jordan_retro_thunder.jpg",
    in_stock: 4,
  },

  {
    id: 2,
    color: "Grey",
    name: "Nike Dunk Low Mica Green",
    brand: "Nike",
    size: 8,
    price: 7999,
    img: "./images/nike_dunk_low.jpg",
    in_stock: 3,
  },
  {
    id: 3,
    color: "Red",
    name: "Nike Dunk Low Satin",
    brand: "Nike",
    size: 5,
    price: 5999,
    img: "./images/nike_dunk_low_satin.jpg",
    in_stock: 6,
  },
  {
    id: 4,
    color: "Green",
    name: "Adidas Superstar Bape ABC",
    brand: "Adidas",
    size: 9,
    price: 4999,
    img: "./images/adidas_superstar_bape.jpg",
    in_stock: 8,
  },
  {
    id: 5,
    color: "Blue",
    name: "Yeezy Boost 700 MNVN Cyan",
    brand: "Yeezy",
    size: 10,
    price: 5999,
    img: "./images/yeezy_boost_700.jpg",
    in_stock: 5,
  },
  {
    id: 6,
    color: "Blue",
    name: "Puma Blaze Of Glory Blue",
    brand: "Puma",
    size: 9,
    price: 5999,
    img: "./images/puma_blaze_of_glory.jpg",
    in_stock: 9,
  },
  {
    id: 7,
    color: "Grey",
    name: "Puma Blaze Of Glory Grey",
    brand: "Puma",
    size: 9,
    price: 5999,
    img: "./images/blaze_of_glory_grey.jpg",
    in_stock: 10,
  },
  {
    id: 8,
    color: "Green",
    name: "Puma x Vaughn Bode",
    brand: "Puma",
    size: 7,
    price: 1899,
    img: "./images/puma_vaughn_bode.jpg",
    in_stock: 4,
  },
  {
    id: 9,
    color: "Black",
    name: "Puma x Shelflife Suede Low ",
    brand: "Puma",
    size: 10,
    price: 1999,
    img: "./images/puma_shelflife.jpg",
    in_stock: 5,
  },
  {
    id: 10,
    color: "Black",
    name: "Converse Chuck Taylor Black ",
    brand: "Converse",
    size: 9,
    price: 3799,
    img: "./images/converse_chuck_taylor.jpg",
    in_stock: 6,
  },
  {
    id: 11,
    color: "Brown",
    name: "Converse Chuck Taylor Brown",
    brand: "Converse",
    size: 6,
    price: 3799,
    img: "./images/converse_chuck_brown.jpg",
    in_stock: 7,
  },
  {
    id: 12,
    color: "Blue",
    name: "Converse Chuck Taylor 8-ball",
    brand: "Converse",
    size: 8,
    price: 3599,
    img: "./images/converse_chuck_blue.jpg",
    in_stock: 6,
  },
  {
    id: 13,
    color: "Red",
    name: "Converse Chuck Taylor Chicago",
    brand: "Converse",
    size: 10,
    price: 3899,
    img: "./images/converse_chuck_chigago.jpg",
    in_stock: 3,
  },
  {
    id: 14,
    color: "White",
    name: "New Balance 550",
    brand: "New Balance",
    size: 11,
    price: 5999,
    img: "./images/new_balance_550.jpg",
    in_stock: 9,
  },
  {
    id: 15,
    color: "Grey",
    name: "New Balance 2002R Grey",
    brand: "New Balance",
    size: 7,
    price: 3999,
    img: "./images/new_balane_2002.jpg",
    in_stock: 2,
  },
  {
    id: 16,
    color: "Blue",
    name: "New Balance 2002R Blue",
    brand: "New Balance",
    size: 9,
    price: 6999,
    img: "./images/new_balance_2002_blue.jpg",
    in_stock: 12,
  },
  {
    id: 17,
    color: "Brown",
    name: "New Balance 550 Canyon",
    brand: "New Balance",
    size: 8,
    price: 4999,
    img: "./images/new_balance_tobacco.jpg",
    in_stock: 12,
  },
  {
    id: 18,
    color: "Brown",
    name: "Reebok Classic X Brain Dead",
    brand: "Reebok",
    size: 7,
    price: 3299,
    img: "./images/reebok_classic_brain.jpg",
    in_stock: 10,
  },
  {
    id: 19,
    color: "Brown",
    name: "Reebok Club C END",
    brand: "Reebok",
    size: 9,
    price: 3999,
    img: "./images/reebok_club.jpg",
    in_stock: 7,
  },
  {
    id: 20,
    color: "Brown",
    name: "Reebok Daytona DMX",
    brand: "Reebok",
    size: 9,
    price: 899,
    img: "./images/reebok_daytona.jpg",
    in_stock: 13,
  },
];

const shoe_form = document.getElementById("shoeForm");

if (shoe_form) {
  shoe_form.addEventListener("submit", function (event) {
    event.preventDefault();

    const shoeName = document.getElementById("shoeName").value;
    const shoeColor = document.getElementById("shoeColor").value;
    const shoeSize = document.getElementById("shoeSize").value;
    const shoeBrand = document.getElementById("shoeBrand").value;
    const shoePrice = document.getElementById("shoePrice").value;
    const shoeStock = document.getElementById("shoeStock").value;
    const shoeImage = document.getElementById("shoeImage").value

  
    const existingShoe = shoe_data.find(shoe => shoe.name)

    if (existingShoe) {
      existingShoe.in_stock += parseInt(shoeStock)
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

    localStorage.setItem("shoeData", JSON.stringify(shoe_data));
    }

   

    
  });
}
if (localStorage.getItem("shoeData")) {
  shoe_data = JSON.parse(localStorage.getItem("shoeData"));
}

const clearButton = document.getElementById("clearLocalStorage");

if (clearButton) {
  clearButton.addEventListener("click", function() {
    localStorage.clear();
    console.log('Local storage cleared');
  });
}


