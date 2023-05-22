document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const cartElement = document.getElementById('cart');
    
    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name}: R${item.price}`;
      cartElement.appendChild(li);
    });
  });