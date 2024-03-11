// pages/MainPage.js
import React, { useState } from "react";
import { IconDots } from "@tabler/icons-react";
import "../styles/App.css";

function MainPage({ onResetChat }) {
  const [inputValue, setInputValue] = useState("");
  const [logs, setLogs] = useState([]);
  const [chatBegin, setChatBegin] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // User message
    const newLogEntry = { user: inputValue, bot: "", loading: true };
    setLogs((logs) => [...logs, newLogEntry]);

    setInputValue("");
    setChatBegin(true);

    const payload = {
      user_id: "1",
      message: newLogEntry.user,
    };

    try {
      const response = await fetch("http://34.222.45.193:5000/query", {
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

      // Bot message
      setLogs((currentLogs) =>
        currentLogs.map((log, index) => {
          if (index === currentLogs.length - 1) {
            const responseMessage =
              currentLogs.length === 1
                ? data.initial_message
                : data.assistant_response;
            return { ...log, bot: responseMessage, loading: false };
          }
          return log;
        })
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      // Update last log entry to remove loading state and keep user message
      setLogs((currentLogs) =>
        currentLogs.map((log, index) => {
          if (index === currentLogs.length - 1) {
            return { ...log, loading: false };
          }
          return log;
        })
      );
    }
  };

  return (
    <>
      {!chatBegin ? (
        <header className="App-header">
          <p style={{ fontWeight: "medium" }}>Unlock Potential Together</p>
          <form
            style={{ width: "80%", maxWidth: "1000px" }}
            onSubmit={handleSubmit}
          >
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
            {logs.map((logEntry, index) => (
              <React.Fragment key={index}>
                <div
                  className="user-message"
                  style={{ letterSpacing: "0.25px", wordSpacing: "1.25px" }}
                >
                  {logEntry.user}
                </div>
                {logEntry.loading ? (
                  <p className="bot-message">
                    <IconDots className="animate-pulse" />
                  </p>
                ) : (
                  <div
                    className="bot-message"
                    style={{
                      letterSpacing: "0.25px",
                      wordSpacing: "1.25px",
                    }}
                  >
                    {logEntry.bot}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          <header className="App-bottom">
            <form
              style={{ width: "80%", maxWidth: "1000px" }}
              onSubmit={handleSubmit}
            >
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
    </>
  );
}

export default MainPage;
