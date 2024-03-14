import React from 'react';
import './styles/ModalStyles.css'; // Make sure to import the CSS styles

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <div className={`modal-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className={`modal-content ${isOpen ? 'open' : ''}`} onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Modal