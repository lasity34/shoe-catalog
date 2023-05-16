import { shoe_data } from "../data/shoe_data.js"
import { shoe_factory } from "../js/shoe_catalog._factory.js"

describe("Testing dropdown values", function() {

    it("this should test the items that have been filtered with colors", function() {
    
        const shoe_instance = shoe_factory()

        shoe_instance.filter_shoe_categories(shoe_data, "color")

        assert.equal("", shoe_instance.filter_shoe_categories(shoe_data, "color"))
     
    })
})