import React, { useState, useEffect } from "react";
import "./styles/App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [output, setOutput] = useState("");
  const [chatBegin, setChatBegin] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    document.body.style.overflow = chatBegin ? "auto" : "hidden";
  }, [chatBegin]);

  const resetChat = () => {
    setChatBegin(false);
    setInputValue("");
    setLogs([]);
    setOutput("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const endpoint = "http://54.218.124.218:5000/query";
    const temp = inputValue;
    const payload = { message: temp };

    setLogs([...logs, [temp]]);
    setInputValue("");
    setChatBegin(true);

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
      console.log("Response data:", data);
      const addedBotLogs = [...logs];
      addedBotLogs[addedBotLogs.length - 1] = [
        ...addedBotLogs[addedBotLogs.length - 1],
        data,
      ];
      setLogs(addedBotLogs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <nav>
        <div
          onClick={resetChat}
          style={{
            paddingLeft: "10px",
            cursor: "pointer",
          }}
        >
          <h1>Mentore</h1>
        </div>
        <div style={{ paddingRight: "10px" }}>
          <button className="sign-in-button">Sign In / Sign Up</button>
        </div>
      </nav>

      {!chatBegin ? (
        <header className="App-header">
          <p>Unlock Potential Together</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="textInput"
              placeholder="Let's find your perfect mentor..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
          {/* <p>{output}</p> */}
        </header>
      ) : (
        <>
          <div className="chat-display">
            {logs.map((userMessage, index) => {
              return (
                <div key={index} className="user-message">
                  {userMessage[0]}
                </div>
              );
            })}
          </div>
          <header className="App-bottom">
            <form style={{ width: "800px" }} onSubmit={handleSubmit}>
              <input
                type="text"
                id="textInput"
                placeholder="Ask a follow-up..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>

            {/* <p>{output}</p> */}
          </header>
        </>
      )}
    </div>
  );
}

export default App;
