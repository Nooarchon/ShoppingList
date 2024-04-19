// DeleteConfirmationDialog.jsx

import React from 'react';

function DeleteConfirmationDialog({ onDelete, onClose }) {
  return (
    <div className="modal-container">
      <div className="modal-background" onClick={onClose} />
      <div className="modal-dialog">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Delete Confirmation</h2>
          <p>Are you sure you want to delete this shopping list?</p>
          <div style={{ textAlign: 'center' }}>
            <button onClick={onDelete}>Yes</button>
            <button onClick={onClose}>No</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationDialog;
