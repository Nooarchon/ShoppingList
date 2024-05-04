// ShoppingListsOverview.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell } from 'recharts';
import addIcon from '../images/add_icon.png';
import removeIcon from '../images/remove_icon.png';
import logoutIcon from '../images/logout_icon.png';
import archiveIcon from '../images/archive_icon.png';
import ShoppingListTile from '../utils/ShoppingListTile';
import Modal from '../modules/Modal';
import DeleteConfirmationDialog from './DeleteConfirmationDialog'; // Import the DeleteConfirmationDialog component here
import { changeLanguage } from '../i18n'; // Import the changeLanguage function
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

function ShoppingListsOverview({ shoppingLists, setShoppingLists, removeShoppingList, user, setUser, language, updateShoppingList }) {
  const { t } = useTranslation(); // Initialize useTranslation hook

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

  const totalSolvedCount = shoppingLists.reduce((acc, list) => {
    return acc + list.items.filter(item => item.resolved).length;
  }, 0);
  const totalUnsolvedCount = shoppingLists.reduce((acc, list) => {
    return acc + (list.items.length - list.items.filter(item => item.resolved).length);
  }, 0);

  // Data for the pie chart
  const data = [
    { name: t('solved'), value: totalSolvedCount },
    { name: t('unsolved'), value: totalUnsolvedCount }
  ];

  // Colors for the pie chart
  const COLORS = ['#00fffc', '#00ffcf'];

  const handleInputChange = (e) => {
    console.log('New List Name:', e.target.value);
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
    console.log('New Shopping List Name:', newListName);
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
    console.log('Login Submit:', username, password);
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
    console.log('Leaving App');
    setUser(null);
  };

  const handleArchiveList = async (id) => {
    try {
      // Set archived to true for the list with the given ID
      const updatedList = { ...shoppingLists.find(list => list.id === id), archived: true };
      await updateShoppingList(updatedList); // Update the list on the server
      console.log('Archiving List ID:', id);
    } catch (error) {
      console.error('Failed to archive shopping list:', error.message);
    }
  };

  const handleRemoveList = (listId) => {
    console.log('Removing List ID:', listId);
    // Display the delete confirmation dialog
    setDeleteListId(listId);
    setShowDeleteConfirmation(true);
  };

  const handleToggleViewMode = () => {
    console.log('Toggling View Mode');
    setViewMode(viewMode === 'list' ? 'tiles' : 'list');
  };

  const confirmDeleteList = () => {
    console.log('Confirming Delete List:', deleteListId);
    // Remove the list from the state
    setShoppingLists(shoppingLists.filter(list => list.id !== deleteListId));
    // Close the delete confirmation dialog
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="shopping-lists-container">
      <h2>{t('appTitle')}</h2>
      <div>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('cz')}>Czech</button>
      </div>

      <p>      </p>

      {user ? (
        <>
          <p>
            {t('loggedInAs')} {user.username} ({user.email})
          </p>
          <button onClick={handleLeaveApp}>
            <img src={logoutIcon} alt="Leave App" width="20" height="20" />
          </button>
        </>
      ) : (
        <button onClick={handleLogin} >{t('login')}</button>
      )}
      <div>
        <label>
          {t('showArchivedLists')}
          <input
            type="checkbox"
            checked={showArchived}
            onChange={() => setShowArchived(!showArchived)}
          />
        </label>
      </div>
      <div>
        <button onClick={handleToggleViewMode}>
          {viewMode === 'list' ? t('showAsTiles') : t('showAsList')}
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
              <li key={list.id} className="list-item">
                {list && (
                  <Link to={`/shopping-list/${list.id}`}>{list.name}</Link>
                )}

                <div className="action-buttons">
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
                </div>
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
              placeholder={t('username')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder={t('password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button className="centered" onClick={handleLogin}>{t('login')}</button>
          </form>
        </div>
      )}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div>
            <h3>{t('createNewShoppingList')}</h3>
            <input
              type="text"
              placeholder={t('enterShoppingListName')}
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

      <h3>{t('itemStatus')}</h3>
      <div className="pie-chart-container">
        <PieChart width={500} height={500}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>


    </div>
  );
}

export default ShoppingListsOverview;
