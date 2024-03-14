import React, { useState } from "react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "firebase/auth";

import { auth } from "../firebase.js";
import Modal from "./Modal";
import logo from "../images/logo.png";

import "../styles/Modal.css";

const AuthModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Handle login success
        console.log(userCredential.user);
        if(userCredential.user.emailVerified) {
          setMessage("Yay! You're logged in!");
          onClose();
        }
        else {
          throw new Error("Your email is not yet verified.")
        }
        
      })
      .catch((error) => {
        // Handle errors
        console.error(error.code, error.message);
        setMessage(error.message);
      });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      sendEmailVerification(userCredential.user)
      .then(() => {
        setMessage("Yay! You signed up! Check your email to verify");
      });
      
      onClose();
    } catch (error) {
      console.error("Error signing up: ", error.message);
      setMessage(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <img src={logo} width={200} height={200} />
      <header className="Modal-header">
        <p className="font-modal-header">Welcome</p>
      </header>
      <form onSubmit={handleLogin} className="modal-form">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
        <div>{message}</div>
      </form>
      <div style={{ paddingTop: "36px" }}>Already have an account? Login</div>
    </Modal>
  );
};

export default AuthModal;
