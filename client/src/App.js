import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateShoppingList from './modules/CreateShoppingList';
import ShoppingListsOverview from './routes/ShoppingListsOverview';
import ShoppingListDetail from './routes/ShoppingListDetail';
import './App.css';

function App() {
  const [shoppingLists, setShoppingLists] = useState([
    {
      id: 1,
      name: 'Food',
      owner: 'John',
      members: ['John', 'Alice', 'Bob'],
      items: [
        { id: 1, name: 'Apples', resolved: false },
        { id: 2, name: 'Bananas', resolved: true },
        { id: 3, name: 'Milk', resolved: false }
      ],
      archived: false
    },
    {
      id: 2,
      name: 'Book',
      owner: 'Alice',
      members: ['Alice', 'Bob', 'John'],
      items: [
        { id: 1, name: 'Harry Potter', resolved: true },
        { id: 2, name: 'Lord of the Rings', resolved: false }
      ],
      archived: false
    }
  ]);

  const [user, setUser] = useState(null);

  // Define the list of users
  const USERS = [
    { id: "123", name: "James" },
    { id: "234", name: "Amelia" },
    { id: "345", name: "John" },
    { id: "456", name: "Chloe" }
  ];

  const addNewShoppingList = (newList) => {
    setShoppingLists([...shoppingLists, newList]);
  };

  const updateShoppingList = (updatedList) => {
    const updatedLists = shoppingLists.map(list =>
      list.id === updatedList.id ? updatedList : list
    );
    setShoppingLists(updatedLists);
  };

  const removeShoppingList = (id) => {
    const updatedLists = shoppingLists.filter(list => list.id !== id);
    setShoppingLists(updatedLists);
  };

  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<ShoppingListsOverview shoppingLists={shoppingLists} setShoppingLists={setShoppingLists} removeShoppingList={removeShoppingList} user={user} setUser={setUser} updateShoppingList={updateShoppingList} users={USERS} />}
          />
          <Route
            path="/create-shopping-list"
            element={<CreateShoppingList addNewShoppingList={addNewShoppingList} />}
          />
          <Route
            path="/shopping-list/:id"
            element={<ShoppingListDetail shoppingLists={shoppingLists} updateShoppingList={updateShoppingList} user={user} setUser={setUser} users={USERS} />} // Pass setUser as a prop
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
