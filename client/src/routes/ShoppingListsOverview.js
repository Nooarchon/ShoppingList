import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import addIcon from '../images/add_icon.png';
import removeIcon from '../images/remove_icon.png';
import logoutIcon from '../images/logout_icon.png';
import archiveIcon from '../images/archive_icon.png';
import ShoppingListTile from '../utils/ShoppingListTile';
import Modal from '../modules/Modal';
import DeleteConfirmationDialog from './DeleteConfirmationDialog'; // Import the DeleteConfirmationDialog component here

function ShoppingListsOverview({ shoppingLists, setShoppingLists, removeShoppingList, user, setUser, updateShoppingList }) {
  const [newListName, setNewListName] = useState('');
  const [error, setError] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'tiles'
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State to control the visibility of the delete confirmation dialog
  const [deleteListId, setDeleteListId] = useState(null); // State to store the ID of the list to be deleted

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
    setShowModal(false);
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

  const handleArchiveList = (listId) => {
    const updatedList = shoppingLists.find(list => list.id === listId);
    if (!updatedList || updatedList.owner !== user.username) {
      return;
    }
    updateShoppingList({ ...updatedList, archived: true });
  };

  const handleRemoveList = (listId) => {
    // Display the delete confirmation dialog
    setDeleteListId(listId);
    setShowDeleteConfirmation(true);
  };

  const handleToggleViewMode = () => {
    setViewMode(viewMode === 'list' ? 'tiles' : 'list');
  };

  const confirmDeleteList = () => {
    // Remove the list from the state
    setShoppingLists(shoppingLists.filter(list => list.id !== deleteListId));
    // Close the delete confirmation dialog
    setShowDeleteConfirmation(false);
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
      <div>
        <label>
          Show Archived Lists
          <input
            type="checkbox"
            checked={showArchived}
            onChange={() => setShowArchived(!showArchived)}
          />
        </label>
      </div>
      <div>
        <button onClick={handleToggleViewMode}>
          {viewMode === 'list' ? 'Show as Tiles' : 'Show as List'}
        </button>
      </div>
      {viewMode === 'tiles' ? (
        <div className="tile-container">
          {shoppingLists.map(list => (
            (showArchived || !list.archived) && (
              <ShoppingListTile
                key={list.id}
                item={list}
                onArchive={() => (user ? handleArchiveList(list.id) : null)}
                onRemove={() => handleRemoveList(list.id)}
                isOwner={user && list.owner === user.username}
              />
            )
          ))}
        </div>
      ) : (
        <ul>
          {shoppingLists.map(list => (
            (showArchived || !list.archived) && (
              <li key={list.id}>
                <Link to={`/shopping-list/${list.id}`}>{list.name}</Link>
                {user && list.owner === user.username && (
                  <button onClick={() => handleRemoveList(list.id)}>
                    <img src={removeIcon} alt="Remove Shopping List" width="20" height="20" />
                  </button>
                )}
                {user && (
                  <button onClick={() => handleArchiveList(list.id)}>
                    <img src={archiveIcon} alt="Archive List" width="20" height="20" />
                  </button>
                )}
              </li>
            )
          ))}
        </ul>
      )}
      <div>
        <div style={{ textAlign: 'center' }}>
          <div>
            <button onClick={() => setShowModal(true)}>
              <img src={addIcon} alt="Create New Shopping List" width="20" height="20" />
            </button>
          </div>
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
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div>
            <h3>Create New Shopping List</h3>
            <input
              type="text"
              placeholder="Enter shopping list name"
              value={newListName}
              onChange={handleInputChange}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div style={{ textAlign: 'center' }}>
              <button onClick={addNewShoppingList} style={{ border: 'none', backgroundColor: 'transparent' }}>
                <img src={addIcon} alt="Create New Shopping List" width="20" height="20" />
              </button>
            </div>
          </div>
        </Modal>
      )}
      {/* Render the DeleteConfirmationDialog if showDeleteConfirmation is true */}
      {showDeleteConfirmation && (
        <DeleteConfirmationDialog
          onDelete={confirmDeleteList}
          onClose={() => setShowDeleteConfirmation(false)}
        />
      )}
    </div>
  );
}

export default ShoppingListsOverview;
