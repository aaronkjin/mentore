import React, { useState, useEffect } from "react";

import { auth } from "./firebase.js";

import "./styles/App.css";

import Nav from "./components/Nav";
import AuthModal from "./components/AuthModal";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./pages/MainPage";

function App() {
  const [displaySignUp, setDisplaySignUp] = useState(false);
  const [key, setKey] = useState(0);
  const [identity, setIdentity] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

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
        setIdentity={setIdentity}
        user={user}
      />
      <AuthModal isOpen={identity} onClose={() => setIdentity(false)} />
      {displaySignUp ? (
        <SignUpPage />
      ) : (
        <MainPage key={key} onResetChat={resetChat} />
      )}
    </div>
  );
}

export default App;
