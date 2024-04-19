const express = require('express');
const router = express.Router();

// Mock data (for development)
let shoppingLists = [
    {
        _id: '1',
        name: 'Groceries',
        owner: 'user1',
        members: ['user1', 'user2'],
        archived: false,
        items: [
            { name: 'Milk', quantity: 1, unit: 'liter', completed: false },
            { name: 'Bread', quantity: 1, unit: 'loaf', completed: true }
        ]
    },
    // Add more mock data as needed
];

// Route to list all shopping lists
router.get('/shopping-lists', (req, res) => {
    res.json(shoppingLists);
});

// Route to get a specific shopping list
router.get('/shopping-lists/:id', (req, res) => {
    const id = req.params.id;
    const shoppingList = shoppingLists.find(list => list._id === id);
    if (!shoppingList) {
        return res.status(404).json({ message: 'Shopping list not found' });
    }
    res.json(shoppingList);
});

// Route to create a new shopping list
router.post('/shopping-lists', (req, res) => {
    const newList = req.body;
    newList._id = (shoppingLists.length + 1).toString(); // Mock ID generation
    shoppingLists.push(newList);
    res.status(201).json(newList);
});

// Route to update an existing shopping list
router.patch('/shopping-lists/:id', (req, res) => {
    const id = req.params.id;
    const updatedList = req.body;
    const index = shoppingLists.findIndex(list => list._id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Shopping list not found' });
    }
    shoppingLists[index] = { ...shoppingLists[index], ...updatedList };
    res.json(shoppingLists[index]);
});

// Route to delete a shopping list
router.delete('/shopping-lists/:id', (req, res) => {
    const id = req.params.id;
    const index = shoppingLists.findIndex(list => list._id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Shopping list not found' });
    }
    shoppingLists.splice(index, 1);
    res.json({ message: 'Shopping list deleted successfully' });
});

module.exports = router;
