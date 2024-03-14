import React, { useState } from "react";

import Modal from "./Modal";
import logo from "../images/logo.png";
import "../styles/Modal.css";

const CareerModal = ({ isOpen, onClose, setInput, input}) => {
  const [career, setCareer] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    let tmp = input + " The career I hope to eventually go into is " + career + "."
    setInput(tmp)
    setCareer("")
    onClose()
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
          value={career}
          onChange={(e) => setCareer(e.target.value)}
          placeholder="Which career do you want to go into and want mentoring in..."
        />
        <button type="submit">
          Confirm
        </button>
      </form>
    </Modal>
  );
};

export default CareerModal;
