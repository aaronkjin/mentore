import React from "react";
import "./../styles/Modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <div className={`${isOpen ? "open modal-backdrop" : ""}`} onClick={onClose}>
      {isOpen && (
        <div
          className={`modal-content ${isOpen ? "open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
      )}
    </div>
  );
};

export default Modal;
