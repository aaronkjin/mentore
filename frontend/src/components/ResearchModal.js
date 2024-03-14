import React, { useState } from "react";

import Modal from "./Modal";
import logo from "../images/logo.png";
import "../styles/Modal.css";

const ResearchModal = ({ isOpen, onClose, setInput, input }) => {
  const [research, setResearch] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    let tmp =
      input +
      " The research specialty I want my mentor to specialize in is " +
      research +
      ".";
    setInput(tmp);
    setResearch("");
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
          value={research}
          onChange={(e) => setResearch(e.target.value)}
          placeholder="Which research specialty do you want your mentor in..."
        />
        <button type="submit">Confirm</button>
      </form>
    </Modal>
  );
};

export default ResearchModal;
