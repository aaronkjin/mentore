import React, { useState } from "react";

import Modal from "./Modal";
import logo from "../images/logo.png";
import "../styles/Modal.css";

const LocationModal = ({ isOpen, onClose, setInput, input }) => {
  const [location, setLocation] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    let tmp =
      input + " The place I want my mentor to be in is " + location + ".";
    setInput(tmp);
    setLocation("");
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <img src={logo} width={200} height={200} />
      <header className="Modal-header">
        <p className="font-modal-header">Welcome</p>
      </header>
      <form onSubmit={onSubmit} className="modal-form">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Where do you want your mentor to be located..."
        />
        <button type="submit">Confirm</button>
      </form>
    </Modal>
  );
};

export default LocationModal;
