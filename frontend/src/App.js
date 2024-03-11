import React, { useState } from "react";
import "./styles/App.css";

import SignUpPage from "./pages/SignUpPage";
import MainPage from "./pages/MainPage";

function App() {
  const [displaySignUp, setDisplaySignUp] = useState(false);
  const [key, setKey] = useState(0);

  const resetChat = () => {
    setKey((prevKey) => prevKey + 1);
    setDisplaySignUp(false);
  };

  return (
    <div className="App">
      <nav>
        <div
          onClick={resetChat}
          style={{ paddingLeft: "10px", cursor: "pointer" }}
        >
          <h1 style={{ fontSize: "28px" }}>Mentore</h1>
        </div>
        <div style={{ paddingRight: "10px" }}>
          <button
            onClick={() => setDisplaySignUp(true)}
            className="sign-in-button"
          >
            Become a Mentor!
          </button>
        </div>
      </nav>
      {displaySignUp ? (
        <SignUpPage />
      ) : (
        <MainPage key={key} onResetChat={resetChat} />
      )}
    </div>
  );
}

export default App;
