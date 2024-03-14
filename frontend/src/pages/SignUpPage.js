import React, { useState, useEffect, useRef } from "react";

import { db } from "../firebase.js";
import { ref, set } from "firebase/database";
import { collection, addDoc } from "firebase/firestore";


import "../styles/Signup.css";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const bioRef = useRef(null);

  useEffect(() => {
    const adjustHeight = () => {
      if (bioRef && bioRef.current) {
        bioRef.current.style.height = "auto";
        bioRef.current.style.height = `${bioRef.current.scrollHeight}px`;
      }
    };

    adjustHeight();
  }, [bio]);

  // Adds new mentor to our database of mentors
  async function handleSubmit(e) {
    e.preventDefault();

    // Edge case: Invalid input values
    if (!name.trim() || !title.trim() || !email.trim() || !bio.trim()) {
      alert("Please fill in valid input values.");
      return;
    }

    const collectionRef = collection(db, 'bios');
    const newItem = {name, title, email, bio}

    const docRef = await addDoc(collectionRef, newItem);
    
    setName("")
    setTitle("")
    setEmail("")
    setBio("")
  }

  return (
    <>
      <header className="Signup-header">
        <p className="font-signup-header">Empower the Future, Guide Today</p>
      </header>
      <form
        onSubmit={handleSubmit}
        className="mentor-container"
        autocomplete="off"
      >
        {/* Name */}
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="inputID"
            placeholder="Gavin Belson"
            className="mentor-input"
            style={{ outlineColor: "#999" }}
          />
        </div>

        {/* Title */}
        <div className="form-group">
          <label className="form-label">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="inputID"
            placeholder="CEO of Hooli"
            className="mentor-input"
            style={{ outlineColor: "#999" }}
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="inputID"
            placeholder="gavin@hooli.xyz"
            className="mentor-input"
            style={{ outlineColor: "#999" }}
          />
        </div>

        {/* Bio */}
        <div className="form-group">
          <label className="form-label">Bio:</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            id="inputID"
            placeholder="As Hooli's visionary CEO, I tackle Silicon Valley's challenges..."
            className="mentor-bio"
            style={{ outlineColor: "#999" }}
            ref={bioRef}
          />
        </div>

        {/* Button */}
        <button type="submit" className="mentor-button">
          Send Profile
        </button>
      </form>
    </>
  );
}
