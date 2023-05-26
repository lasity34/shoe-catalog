

export function attachHamburgerEventListener() {
    const hamburger = document.querySelector(".hamburger-menu");
    const select_options = document.querySelector(".category_value");

    hamburger.addEventListener("click", function () {
      select_options.classList.toggle("nav-open");
    });
  }