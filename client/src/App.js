// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getData, postData, deleteData, updateData } from './calls/Call'; // Import the HTTP request functions
import CreateShoppingList from './modules/CreateShoppingList';
import ShoppingListsOverview from './routes/ShoppingListsOverview';
import ShoppingListDetail from './routes/ShoppingListDetail';
import { changeLanguage } from './i18n'; // Import the changeLanguage function 
import { I18nextProvider, useTranslation } from 'react-i18next'; // Import useTranslation hook
import './App.css';
import styles from "./styles/styles.css";
// In terminal write npm install recharts and  npm install react-i18next

function App() {
  const { t } = useTranslation(); // Initialize useTranslation hook

  const [shoppingLists, setShoppingLists] = useState([]);
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en'); // Add language state

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  useEffect(() => {
    // Fetch initial data when component mounts
    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const fetchData = async () => {
    try {
      const data = await getData('/api/shopping-lists'); // Fetch shopping lists from the server
      setShoppingLists(data); // Update state with fetched data
    } catch (error) {
      console.error('Failed to fetch data:', error.message);
    }
  };

  const addNewShoppingList = async (newList) => {
    try {
      const response = await postData('/api/shopping-lists', newList); // Post new shopping list to the server
      setShoppingLists([...shoppingLists, response]); // Update state with the new list returned from the server
    } catch (error) {
      console.error('Failed to add new shopping list:', error.message);
    }
  };

  const updateShoppingList = async (updatedList) => {
    try {
      const response = await updateData(updatedList.id, updatedList); // Update shopping list on the server
      const updatedLists = shoppingLists.map(list => (list.id === updatedList.id ? response : list));
      setShoppingLists(updatedLists); // Update state with the updated list returned from the server
    } catch (error) {
      console.error('Failed to update shopping list:', error.message);
    }
  };

  const removeShoppingList = async (id) => {
    try {
      await deleteData(`/api/shopping-lists/${id}`); // Delete shopping list from the server
      const updatedLists = shoppingLists.filter(list => list.id !== id);
      setShoppingLists(updatedLists); // Update state by removing the deleted list
    } catch (error) {
      console.error('Failed to remove shopping list:', error.message);
    }
  };

  const handleLanguageChange = (language) => {
    setLanguage(language); // Update language state
    changeLanguage(language); // Call changeLanguage function
  };

  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      <button className="mode-toggle" onClick={toggleDarkMode}>
        {isDarkMode ? t('switchToLightMode') : t('switchToDarkMode')}
      </button>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<ShoppingListsOverview
              shoppingLists={shoppingLists}
              setShoppingLists={setShoppingLists}
              removeShoppingList={removeShoppingList}
              user={user}
              setUser={setUser}
              updateShoppingList={updateShoppingList}
              onLanguageChange={handleLanguageChange} // Pass handleLanguageChange function
            />}
          />

          <Route
            path="/create-shopping-list"
            element={<CreateShoppingList addNewShoppingList={addNewShoppingList} />}
          />
          <Route
            path="/shopping-list/:id"
            element={<ShoppingListDetail
              shoppingLists={shoppingLists}
              updateShoppingList={updateShoppingList}
              user={user}
              setUser={setUser}
              language={language} // Pass language state
              onLanguageChange={handleLanguageChange} // Pass onLanguageChange function
            />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
