import React, { useState } from 'react';
import './modal.css';
import Modal from './Modal';
import addIcon from '../images/add_icon.png';
import backIcon from '../images/back_icon.png';

function CreateShoppingList({ addNewShoppingList, user }) {
  const [showModal, setShowModal] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setNewListName(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newListName.trim() === '') {
      setError('Please enter a valid shopping list name.');
      return;
    }
    const newList = {
      name: newListName,
      owner: user ? user.username : 'Guest',
      members: user ? [user.username] : [], // Automatically add the owner as a member
      items: [],
      archived: false,
    };
    
    try {
      // Send POST request to the server to add the new shopping list
      const response = await fetch('/api/shopping-lists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newList),
      });

      if (!response.ok) {
        throw new Error('Failed to create shopping list');
      }

      // Get the created shopping list from the response
      const data = await response.json();
      addNewShoppingList(data); // Add the new shopping list to the state
      setNewListName('');
      setShowModal(false);
    } catch (error) {
      setError('Failed to create shopping list');
      console.error(error);
    }
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
