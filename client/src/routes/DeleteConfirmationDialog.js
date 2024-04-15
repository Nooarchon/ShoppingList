// DeleteConfirmationDialog.js
import React from 'react';

const DeleteConfirmationDialog = ({ onDelete }) => {
  const handleDelete = () => {
    onDelete();
  };

  return (
    <div className="modal">
      <p>Are you sure you want to delete this shopping list?</p>
      <button onClick={handleDelete}>Yes</button>
      <button>No</button>
    </div>
  );
};

export default DeleteConfirmationDialog;
