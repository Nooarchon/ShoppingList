const ShoppingList = require("../models/shopping-list"); // Import mongoose shopping list model

const createShoppingList = async (request, response) => {

    // Creating and saving a new shopping list to the database
        try {
            // Declaration of the auxiliary variable in which I will save the Shopping list, which will be saved in the database
            const newShoppingList = await ShoppingList.create(request.body); 
            
            response.status(201).json({     
                result: "Success!",
                method: request.method,
                data: newShoppingList
            });
    
        } catch (error) {
            response.status(400).json({
                result: "Unsuccess!",
                message: error
            })
        }
    }

/*******************************************************************************************/

const getShoppingList = async (request, response) => {

    // Retrieving a specific shopping list from a database
    
    try {

        // Declaration of the auxiliary variable into which I get the Shopping list
        const shoppingList = await ShoppingList.findById(request.params.id);

        if (shoppingList){
            response.status(200).json({     
                result: "Success!",
                method: request.method,
                data: shoppingList
            });
        }

        else {
            response.status(404).json({     
                result: "Unsuccess!",
                method: request.method,
                message: "Asked Shopping list was not found!"
            });
        }
    
        } catch (error) {
            response.status(400).json({
                result: "Unsuccess!",
                message: error
            })
        }
    }

/*******************************************************************************************/

const listShoppingList = async (request, response) => {
    
    // Retrieving all shopping lists from the database.
    
    try {

        const shoppingLists = await ShoppingList.find();
        
        response.status(200).json({     
            result: "Success!",
            method: request.method,
            results: shoppingLists.length,
            data: shoppingLists
        });

    } catch (error) {
        response.status(400).json({
            result: "Unsuccess!",
            message: error.message
        })
    }
}

/*******************************************************************************************/

const updateShoppingList = async (request, response) => {
    
    // Updating a specific shopping list in the database
    
        try {
            // Declaration of the auxiliary variable into which I get the Shopping list
            const shoppingList = await ShoppingList.findById(request.params.id);
    
            if (shoppingList) {
                // Declaration of auxiliary variable into which I get the updated Shopping list from the database
                const updatedShoppingList = await ShoppingList.findByIdAndUpdate(
                    request.params.id, 
                    request.body, 
                    {
                        new: true,
                        runValidators: true
                    }); 
            
                if (updatedShoppingList){
                    response.status(202).json({     
                        result: "Success!",
                        method: request.method,
                        message: "Shopping list was updated!",
                        data: updatedShoppingList
                    });
                }
    
                else {
                    response.status(404).json({     
                        result: "Unsuccess!",
                        method: request.method,
                        message: "Shopping list was not updated!"
                    });
                }
            }
    
            else {
                response.status(404).json({     
                    result: "Unsuccess!",
                    method: request.method,
                    message: "Shopping list was not found!"
                });
            }
    
        } catch (error) {
            response.status(400).json({
                result: "Unsuccess!",
                message: error
            })
        }
    }

/*******************************************************************************************/

const deleteShoppingList = async (request, response) => {

    try {
        // Declaration of the auxiliary variable into which I get the Shopping list
        const shoppingList = await ShoppingList.findById(request.params.id);

        if (shoppingList) {
            // Declaration of auxiliary variable into which I get the updated Shopping list from the database
            const deletedShoppingList = await ShoppingList.findByIdAndDelete(
                request.params.id, 
                request.body
            ); 
        
            if (deletedShoppingList){
                response.status(201).json({     
                    result: "Success!",
                    method: request.method,
                    message: "Shopping list has been deleted!",
                });
            }
        }

        else {
            response.status(404).json({     
                result: "Unsuccess!",
                method: request.method,
                message: "Asked shopping list was not found!"
            });
        }

    } catch (error) {
        response.status(400).json({
            result: "Unsuccess!",
            message: error
        })
    }
}
    
/*******************************************************************************************/

module.exports = {
    createShoppingList,
    getShoppingList,
    listShoppingList,
    updateShoppingList,
    deleteShoppingList
}