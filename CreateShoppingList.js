import React, { useState } from 'react';
import './Modal.css'; // Import modal styles from the correct path
import Modal from './Modal'; // Import modal component from the correct path

// Import add_icon.png and back_icon.png
import addIcon from '../images/add_icon.png';
import backIcon from '../images/back_icon.png';

function CreateShoppingList({ addNewShoppingList }) {
  const [showModal, setShowModal] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setNewListName(e.target.value);
    setError(''); // Clear error when input changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newListName.trim() === '') {
      setError('Please enter a valid shopping list name.'); // Set error message
      return;
    }
    // Create a new shopping list object
    const newList = {
      id: Date.now(), // Use timestamp as ID for simplicity
      name: newListName,
      owner: 'You', // Assuming the owner is the current user
      members: [], // Initialize with an empty array of members
      items: [], // Initialize with an empty array of items
      archived: false, // Initialize as not archived
    };
    // Call the function from the parent component to add the new shopping list
    addNewShoppingList(newList);
    // Clear the input field after submission
    setNewListName('');
    setShowModal(false); // Close the modal after submission
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
      {/* Add button outside the modal */}
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
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if there's an error */}
            <button type="submit">Create</button>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default CreateShoppingList;
