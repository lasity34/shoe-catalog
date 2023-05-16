import { shoe_data } from "../data/shoe_data.js"
import { shoe_factory } from "../js/shoe_catalog._factory.js"

describe("Testing dropdown values", function() {

    it("this should test the items that have been filtered with colors in an array", function() {
    
        const shoe_instance = shoe_factory()

        shoe_instance.filter_shoe_categories(shoe_data, "color")

        assert.deepEqual(['Black', 'Blue', 'Green', 'Grey', 'Red'], shoe_instance.filter_shoe_categories(shoe_data, "color"))
       
    })

    it("this should test the items that have been filtered with sizes in an array", function() {
    
        const shoe_instance = shoe_factory()

        shoe_instance.filter_shoe_categories(shoe_data, "size")

        assert.deepEqual([ 5, 8, 9, 10 ], shoe_instance.filter_shoe_categories(shoe_data, "size"))
     
    })

    it("this should test the items that have been filtered with prices in an array", function() {
    
        const shoe_instance = shoe_factory()

        shoe_instance.filter_shoe_categories(shoe_data, "brand")

        assert.deepEqual([ 'Adidas', 'Jordan', 'Nike', 'Yeezy' ], shoe_instance.filter_shoe_categories(shoe_data, "brand"))
     
    })

    it("this should test the items that have been filtered with prices in an array", function() {
    
        const shoe_instance = shoe_factory()

        shoe_instance.filter_shoe_categories(shoe_data, "price")

        assert.deepEqual([ 'Adidas', 'Jordan', 'Nike', 'Yeezy' ], shoe_instance.filter_shoe_categories(shoe_data, "price"))
     
    })
})