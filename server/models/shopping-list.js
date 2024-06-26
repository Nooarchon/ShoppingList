// models/shopping-list.js

const mongoose = require('mongoose');

const shoppingListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Shopping list must have name"],
    },
    owner: {
        type: String,
        required: [true, "Shopping list must have owner"],
    },
    members: {
        type: [String],
        required: false
    },
    archived: {
        type: Boolean,
        required: false,
        default: false
    },
    items: {
        type: [{  
            _id: false, // Turn off generating MongoDB Id for object of item 
            item: String,
            amount: Number,
            unit: {
                type: String,
                required: false,
                default: "piece"
            },
            completed: {
                type: Boolean,
                required: false,
                default: false
            },    
        }],
        required: false
    },
});

const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema);

module.exports = ShoppingList;
