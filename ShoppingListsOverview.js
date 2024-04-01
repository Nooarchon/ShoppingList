import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import addIcon from '../images/add_icon.png';
import removeIcon from '../images/remove_icon.png';
import logoutIcon from '../images/logout_icon.png';

function ShoppingListsOverview({ shoppingLists, setShoppingLists, removeShoppingList, user, setUser, updateShoppingList }) {
  const [newListName, setNewListName] = useState('');
  const [error, setError] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (e) => {
    setNewListName(e.target.value);
    setError('');
  };

  const addNewShoppingList = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    if (newListName.trim() === '') {
      setError('Please enter a valid shopping list name.');
      return;
    }
    const newList = {
      id: Date.now(),
      name: newListName,
      owner: user ? user.username : 'Guest',
      members: [],
      items: [],
      archived: false
    };
    setShoppingLists([...shoppingLists, newList]);
    setNewListName('');
  };

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Perform authentication logic here
    const authenticatedUser = {
      username: username,
      email: 'example@example.com' // Assuming a default email for demonstration
    };
    setUser(authenticatedUser);
    setUsername('');
    setPassword('');
    setShowLoginModal(false);
  };

  const handleLeaveApp = () => {
    setUser(null);
  };

  const handleLeaveList = (listId) => {
    const updatedList = shoppingLists.find(list => list.id === listId);
    if (!updatedList || !updatedList.members.includes(user.username)) {
      return;
    }
    const updatedMembers = updatedList.members.filter(member => member !== user.username);
    updateShoppingList({ ...updatedList, members: updatedMembers });
    setUser(null);
  };

  return (
    <div className="shopping-lists-container">
      <h2>Shopping Lists Overview</h2>
      {user ? (
        <>
          <p>
            Logged in as: {user.username} ({user.email})
          </p>
          <button onClick={handleLeaveApp}>
            <img src={logoutIcon} alt="Leave App" width="20" height="20" />
          </button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
      <ul>
        {shoppingLists.map(list => (
          <li key={list.id} className="shopping-list-item">
            <Link to={`/shopping-list/${list.id}`} className="shopping-list-link">
              {list.name} (Owner: {list.owner}) {list.archived ? '(Archived)' : ''}
            </Link>
            <button onClick={() => removeShoppingList(list.id)}>
              <img src={removeIcon} alt="Remove Shopping List" width="20" height="20" />
            </button>
            {user && (
              <button onClick={() => handleLeaveList(list.id)}>
                <img src={logoutIcon} alt="Leave List" width="20" height="20" />
              </button>
            )}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Enter shopping list name"
          value={newListName}
          onChange={handleInputChange}
        />
        <div style={{ textAlign: 'center' }}>
          <button onClick={addNewShoppingList}>
            <img src={addIcon} alt="Create New Shopping List" width="20" height="20" />
          </button>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      {showLoginModal && (
        <div className="modal">
          <form onSubmit={handleLoginSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button className="centered" onClick={handleLogin}>Login</button>

          </form>
        </div>
      )}
    </div>
  );
}

export default ShoppingListsOverview;
