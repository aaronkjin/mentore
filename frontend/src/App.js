import React, { useState } from "react";
import "./styles/App.css";

import Nav from "./components/Nav";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./pages/MainPage";

function App() {
  const [displaySignUp, setDisplaySignUp] = useState(false);
  const [key, setKey] = useState(0);

  const resetChat = () => {
    setKey((prevKey) => prevKey + 1);
    setDisplaySignUp(false);
  };

  const toggleSignUp = () => {
    setDisplaySignUp(!displaySignUp);
  };

  return (
    <div className="App">
      <Nav
        displaySignUp={displaySignUp}
        onResetChat={resetChat}
        onToggleSignUp={toggleSignUp}
      />
      {displaySignUp ? (
        <SignUpPage />
      ) : (
        <MainPage key={key} onResetChat={resetChat} />
      )}
    </div>
  );
}

export default App;
