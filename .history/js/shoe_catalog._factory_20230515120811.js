import { shoe_data } from "../data/shoe_data";


const filtered_data_map = {

}

function shoe_factory() {

    
    function filter_shoe_categories(showData, category) {

        const unique_category  = new Set()

       showData.forEach(shoe => unique_category.add(shoe[category]))

        return Array.from(unique_category)
    }
    

}