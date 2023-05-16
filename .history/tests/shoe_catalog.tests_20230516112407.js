import { shoe_data } from "../data/shoe_data.js"
import { shoe_factory } from "../js/shoe_catalog._factory.js"

describe("Testing dropdown values", function() {

    it("this should test the items that have been filtered with colors in an array", function() {
    
        const shoe_instance = shoe_factory()

        shoe_instance.filter_shoe_categories(shoe_data, "color")

        assert.deepEqual([ 'blue', 'Blue', 'Brown', 'Grey' ], shoe_instance.filter_shoe_categories(shoe_data, "color"))
     
    })

    it("this should test the items that have been filtered with sizes in an array", function() {
    
        const shoe_instance = shoe_factory()

        shoe_instance.filter_shoe_categories(shoe_data, "size")

        assert.deepEqual([ 'blue', 'Blue', 'Brown', 'Grey' ], shoe_instance.filter_shoe_categories(shoe_data, "size"))
     
    })
})