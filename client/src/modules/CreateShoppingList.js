// CreateShoppingList.js

import React, { useState } from 'react';
import './modal.css';
import addIcon from '../images/add_icon.png';
import backIcon from '../images/back_icon.png';

function CreateShoppingList({ addNewShoppingList, user, Modal }) {
  const [showModal, setShowModal] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setNewListName(e.target.value);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newListName.trim() === '') {
      setError('Please enter a valid shopping list name.');
      return;
    }
    const newList = {
      id: Date.now(),
      name: newListName,
      owner: user ? user.username : 'Guest',
      members: user ? [user.username] : [], // Automatically add the owner as a member
      items: [],
      archived: false,
    };
    addNewShoppingList(newList);
    setNewListName('');
    setShowModal(false);
  };

  const handleBackNavigation = () => {
    // Implement navigation logic here
  };

  return (
    <div>
      <div className="create-list-header">
        <button onClick={() => setShowModal(true)}>
          <img src={addIcon} alt="Create New Shopping List" width="20" height="20" />
        </button>
        <button onClick={handleBackNavigation}>
          <img src={backIcon} alt="Back to Overview" width="20" height="20" />
        </button>
      </div>
      <button onClick={() => setShowModal(true)}>Create New Shopping List</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2>Create New Shopping List</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter shopping list name"
              value={newListName}
              onChange={handleInputChange}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Create</button>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default CreateShoppingList;