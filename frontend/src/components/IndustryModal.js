import React, { useState } from "react";

import Modal from "./Modal";
import logo from "../images/logo.png";
import "../styles/Modal.css";

const IndustryModal = ({ isOpen, onClose, setInput, input }) => {
  const [industry, setIndustry] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    let tmp =
      input + " The industry I want my mentor to be in is " + industry + ".";
    setInput(tmp);
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
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          placeholder="Which industry are you looking for a mentor in..."
        />
        <button type="submit">Confirm</button>
      </form>
    </Modal>
  );
};

export default IndustryModal;
