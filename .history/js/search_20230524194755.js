export function shoe_search() {
    const search_button = document.getElementById("search_button");
    const search_bar = document.getElementById("search_bar");

    function searchFunction() {
      const search_query = search_bar.value;
      const search_results = shoeInstance.search_shoes(shoe_data, search_query);
      DisplayShoeTemplate(search_results);
    }

    search_button.addEventListener("click", searchFunction);

    search_bar.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        searchFunction();
      }
    });
  }