import { shoe_data } from "../data/shoe_data.js"
import { shoe_factory } from "../js/shoe_catalog._factory.js"

describe("Testing dropdown values", function() {

    it("this should test the items that have been filtered with colors in an array", function() {
    
        const shoe_instance = shoe_factory()

        shoe_instance.filter_shoe_categories(shoe_data, "color")

        assert.deepEqual(7, shoe_instance.filter_shoe_categories(shoe_data, "color").length)
       
    })

    it("this should test the items that have been filtered with sizes in an array", function() {
    
        const shoe_instance = shoe_factory()

        shoe_instance.filter_shoe_categories(shoe_data, "size")

        assert.deepEqual(7, shoe_instance.filter_shoe_categories(shoe_data, "size").length)
     
    })

    it("this should test the items that have been filtered with prices in an array", function() {
    
        const shoe_instance = shoe_factory()

        shoe_instance.filter_shoe_categories(shoe_data, "brand")

        assert.deepEqual(8, shoe_instance.filter_shoe_categories(shoe_data, "brand").length)
     
    })

    it("this should test the items that have been filtered with prices in an array", function() {
    
        const shoe_instance = shoe_factory()

        shoe_instance.filter_shoe_categories(shoe_data, "price")

        assert.deepEqual(12, shoe_instance.filter_shoe_categories(shoe_data, "price").length)
     
    })
})


describe("Testing if categories are filtered", function() {

    it("It should filter out all items that have a specific color", function() {

        const shoe_instance = shoe_factory()

        shoe_instance.filter_color(shoe_data, "Black").length

        assert.deepEqual(3, shoe_instance.filter_color(shoe_data, "Black").length)
    })

    it("It should filter out all items that have a specific size", function() {

        const shoe_instance = shoe_factory()
        
        shoe_instance.filter_size(shoe_data, 5).length
       
        assert.deepEqual(1, shoe_instance.filter_size(shoe_data, 5).length)
    })


    it("It should filter out all items that have a specific brand", function() {

        const shoe_instance = shoe_factory()
        
        shoe_instance.filter_brand(shoe_data, "Nike")
       
        assert.deepEqual(2, shoe_instance.filter_brand(shoe_data, "Nike").length)
    })

    it("It should filter out all items that have a specific price", function() {

        const shoe_instance = shoe_factory()
        
        shoe_instance.filter_price(shoe_data, "5999.00")
      
        assert.deepEqual(5, shoe_instance.filter_price(shoe_data, "5999.00").length)
    })




    it("It should filter out all items that have a specific color and price", function() {

        const shoe_instance = shoe_factory()

       
      
        assert.deepEqual(1, shoe_instance.filter_display(shoe_data, "Black", "", "", "7999.00").length)
    })

    it("It should filter out all items that have a specific brand and size", function() {

        const shoe_instance = shoe_factory()

       
      
        assert.deepEqual(1, shoe_instance.filter_display(shoe_data, "", "9", "Adidas", "").length)
    })

    it("It should filter out all items that have a specific color and size", function() {

        const shoe_instance = shoe_factory()

       
      
        assert.deepEqual(2, shoe_instance.filter_display(shoe_data, "Black", "10", "", "").length)
    })

    it("It should filter out all items that have a specific size and price", function() {

        const shoe_instance = shoe_factory()

       
      
        assert.deepEqual(1, shoe_instance.filter_display(shoe_data, "", "10", "", "5999").length)
    })

} )