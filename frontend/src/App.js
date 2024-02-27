import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const endpoint = "http://54.218.124.218:5000/query";
    const payload = { message: inputValue };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOutput(data.message);
      console.log("Response data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="textInput">Search for mentor:</label>
        <input
          type="text"
          id="textInput"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <p>output</p>
    </div>
  );
}

export default App;
