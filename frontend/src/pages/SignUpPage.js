import React, { useState, useEffect } from "react";

import { database } from "../firebase.js";
import { ref, set } from "firebase/database";

import "../styles/Signup.css";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  // Adds new mentor to our database of mentors
  function handleSubmit(e) {
    e.preventDefault();

    // Edge case: Invalid input values
    if (!name.trim() || !title.trim() || !email.trim() || !bio.trim()) {
      alert("Please fill in valid input values.");
      return;
    }

    const msg = ref(database, "bios/" + Date.now());
    const obj = {
      name: name,
      title: title,
      email: email,
      bio: bio,
    };
    set(msg, obj)
      .then(() => {
        setName("");
        setTitle("");
        setEmail("");
        setBio("");
        alert("Profile sent successfully!");
      })
      .catch((error) => {
        alert("Failed to send message: " + error.message);
      });
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
            onChange={(e) => setTitle(e.target.value)}
            id="inputID"
            placeholder="gavin@hooli.xyz"
            className="mentor-input"
            style={{ outlineColor: "#999" }}
          />
        </div>

        {/* Bio */}
        <div className="form-group">
          <label className="form-label">Bio:</label>
          <input
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            id="inputID"
            placeholder="
            As Hooli's visionary CEO, I tackle Silicon Valley's challenges..."
            className="mentor-bio"
            style={{ outlineColor: "#999" }}
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
