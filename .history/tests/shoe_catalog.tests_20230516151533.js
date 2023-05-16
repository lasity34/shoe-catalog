import { shoe_data } from "../data/shoe_data.js"
import { shoe_factory } from "../js/shoe_catalog._factory.js"

describe("Testing dropdown values", function() {

    it("this should test the items that have been filtered with colors in an array", function() {
    
        const shoe_instance = shoe_factory()

        shoe_instance.filter_shoe_categories(shoe_data, "color")

        assert.deepEqual(['Blue', 'Brown', 'Grey', 'Green', 'Red'], shoe_instance.filter_shoe_categories(shoe_data, "color"))
        [ Array(5) ]
    })

    it("this should test the items that have been filtered with sizes in an array", function() {
    
        const shoe_instance = shoe_factory()

        shoe_instance.filter_shoe_categories(shoe_data, "size")

        assert.deepEqual([ 7, 8, 9 ], shoe_instance.filter_shoe_categories(shoe_data, "size"))
     
    })

    it("this should test the items that have been filtered with sizes in an array", function() {
    
        const shoe_instance = shoe_factory()

        shoe_instance.filter_shoe_categories(shoe_data, "brand")

        assert.deepEqual([ 'Addidas', 'Mike', 'Nike' ], shoe_instance.filter_shoe_categories(shoe_data, "brand"))
     
    })
})