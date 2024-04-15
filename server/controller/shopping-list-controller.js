const express = require("express");

const router = express.Router();

const {createShoppingList, getShoppingList, listShoppingList, deleteShoppingList, updateShoppingList} = require("../abl/shopping-list-abl");

/******************************************************************************************************/

router.post("/create", createShoppingList);

router.get("/get/:id", getShoppingList);

router.get("/list", listShoppingList);

router.patch("/update/:id", updateShoppingList);

router.delete("/delete/:id", deleteShoppingList);

/******************************************************************************************************/

module.exports = router;