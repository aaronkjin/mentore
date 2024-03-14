import React, { useState, useEffect, useRef } from "react";

import { IconDots } from "@tabler/icons-react";

import AuthModal from "../components/AuthModal";
import ResearchModal from "../components/ResearchModal";
import IndustryModal from "../components/IndustryModal";
import CareerModal from "../components/CareerModal";
import LocationModal from "../components/LocationModal";

import "../styles/App.css";

function MainPage({ onResetChat, user }) {
  const [inputValue, setInputValue] = useState("");
  const [logs, setLogs] = useState([]);
  const [chatBegin, setChatBegin] = useState(false);
  const [showIndustry, setShowIndustry] = useState(false);
  const [showResearch, setShowResearch] = useState(false);
  const [showCareer, setShowCareer] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const textAreaRef = useRef(null);

  useEffect(() => {
    const textArea = textAreaRef.current;
    const adjustHeight = () => {
      textArea.style.height = "auto";
      textArea.style.height = `${textArea.scrollHeight}px`;
    };
    adjustHeight();
  }, [inputValue]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      handleDisconnect();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleDisconnect();
    }, 5000); // Adjust timeout duration later

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleDisconnect = async () => {
    if (user) {
      const payload = {
        user_id: user.metadata.createdAt,
      };
      console.log("Disconnecting...");

      try {
        await fetch("http://34.222.45.193:5000/disconnect", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } catch (error) {
        console.error("Error calling /disconnect:", error);
      }
    }
  };

  const handleSubmit = async (event) => {
    // Edge case: Empty input value
    if (!inputValue.trim()) {
      alert("Please fill in a valid input value.");
      return;
    }

    // Edge case: User is not logged in, show the AuthModal
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    // User message
    const newLogEntry = { user: inputValue, bot: "", loading: true };
    setLogs((logs) => [...logs, newLogEntry]);

    setInputValue("");
    setChatBegin(true);

    const payload = {
      user_id: user.metadata.createdAt,
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
      {/* Home Page */}
      {!chatBegin ? (
        <>
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
          />
          <header className="App-header">
            <p style={{ fontWeight: "medium" }}>Unlock Potential Together</p>
            <form
              className="search-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              autocomplete="off"
            >
              <textarea
                id="textInput"
                placeholder="Let's find your perfect mentor..."
                ref={textAreaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="autoresize-textarea"
              />
              <button type="submit">Search</button>
            </form>
          </header>

          {/* User Search Help */}
          <div className="user-search-help">
            <p>Need mentorship? Explore: </p>
            <span onClick={() => setShowIndustry(true)}>industry,</span>
            <IndustryModal
              isOpen={showIndustry}
              onClose={() => setShowIndustry(false)}
              input={inputValue}
              setInput={setInputValue}
            />
            <span onClick={() => setShowResearch(true)}>research,</span>
            <ResearchModal
              isOpen={showResearch}
              onClose={() => setShowResearch(false)}
              input={inputValue}
              setInput={setInputValue}
            />
            <span onClick={() => setShowCareer(true)}>career,</span>
            <CareerModal
              isOpen={showCareer}
              onClose={() => setShowCareer(false)}
              input={inputValue}
              setInput={setInputValue}
            />
            <span onClick={() => setShowLocation(true)}>location.</span>
            <LocationModal
              isOpen={showLocation}
              onClose={() => setShowLocation(false)}
              input={inputValue}
              setInput={setInputValue}
            />
          </div>
        </>
      ) : (
        <>
          {/* Chat Page */}
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
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              autocomplete="off"
            >
              <textarea
                id="textInput"
                placeholder="Ask a follow-up..."
                ref={textAreaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="autoresize-textarea"
              />
              <button type="submit">Search</button>
            </form>
          </header>
        </>
      )}
    </>
  );
}

export default MainPage;
