import React, { useState, useEffect } from "react";
import { database } from "./firebase.js";
import { ref, set } from "firebase/database";
export default function SignUpPage() {
    const [bio, setBio] = useState("");
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        const msg = ref(database, 'bios/' + Date.now());
        const obj = {
            name:name,
            title:title,
            bio:bio
        }
        set(msg, obj).then(() => {
            setName("");
            setTitle("");
            setBio("");
            alert("Profile sent successfully!");
        }).catch((error) => {
            alert("Failed to send message: " + error.message);
          });
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div><input 
                type ="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name..."
                /></div>
                <div><input 
                type ="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title..."
                /></div>
                <div><input 
                type ="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Enter bio..."
                /></div>
                <button type = "submit">Send Profile</button>
            </form>
        </div>
        
    )
}