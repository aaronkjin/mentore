import React, { useState, useEffect } from "react";

import { database } from "../firebase.js";
import { ref, set } from "firebase/database";

import "../styles/Signup.css";

export default function SignUpPage() {
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");

  // Adds new mentor to our database of mentors
  function handleSubmit(e) {
    e.preventDefault();
    const msg = ref(database, "bios/" + Date.now());
    const obj = {
      name: name,
      title: title,
      bio: bio,
    };
    set(msg, obj)
      .then(() => {
        setName("");
        setTitle("");
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
