import React, { useState } from "react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import { auth } from "../firebase.js";
import Modal from "./Modal";
import logo from "../images/logo-white.png";

import "../styles/Modal.css";

const AuthModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const toggleIsLogin = () => setIsLogin(!isLogin);

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Handle login success
        console.log(userCredential.user);
        setMessage(`Welcome back, ${userCredential.user.email}.`);
        onClose();
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
      sendEmailVerification(userCredential.user).then(() => {
        setMessage(
          `Welcome, ${userCredential.user.email}. Check your email to verify.`
        );
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
        <p className="font-modal-header">
          {isLogin ? "Welcome Back" : "Welcome"}
        </p>
      </header>
      <form
        onSubmit={isLogin ? handleLogin : handleSignUp}
        className="modal-form"
      >
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
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        <div>{message}</div>
      </form>
      <div style={{ paddingTop: "36px" }}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <span onClick={toggleIsLogin} className="login-prompt">
          {isLogin ? "Sign Up" : "Login"}
        </span>
      </div>
    </Modal>
  );
};

export default AuthModal;
