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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const endpoint = "http://54.218.124.218:5000/query";
    const tmp = inputValue;
    const payload = { message: tmp };
    
    setLogs([...logs, [tmp]])
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
      addedBotLogs[addedBotLogs.length - 1] = [...addedBotLogs[addedBotLogs.length - 1], data]
      setLogs(addedBotLogs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <nav>
        <a
          href="https://github.com/aaronkjin/mentore"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h1>Mentore</h1>
        </a>
        <button className="sign-in-button">Sign In / Sign Up</button>
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
          {logs.map(v => {
            return <div>{v[0]}</div>
          })}
          <header className="App-bottom">
            <form onSubmit={handleSubmit}>
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
