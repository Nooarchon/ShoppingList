// Modal.js

import React from 'react';
import './modal.css';

const Modal = ({ onClose, children }) => {
  return (
    <div className="modal-container">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-dialog">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
