import React from 'react';
import './modal.css';

const Modal = ({ children, onClose, isDarkMode }) => {
  const modalStyle = isDarkMode ? 'dark-mode' : 'light-mode';

  return (
    <div className={`modal-container ${modalStyle}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-dialog">
        <div className={`modal-content ${modalStyle}`}>
          <span className="close" onClick={onClose}>X</span>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;