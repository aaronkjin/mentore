import React, { useState } from "react";
import "./styles/App.css";
import { auth } from './firebase.js';

import Nav from "./components/Nav";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./pages/MainPage";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";

function App() {
  const [displaySignUp, setDisplaySignUp] = useState(false);
  const [key, setKey] = useState(0);
  const [signUpModal, setSignUpModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpMessage, setSignUpMessage] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [user, setUser] = useState(false);

  const resetChat = () => {
    setKey((prevKey) => prevKey + 1);
    setDisplaySignUp(false);
  };

  const toggleSignUp = () => {
    setDisplaySignUp(!displaySignUp);
  };

  function handleLogin(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      setUser(user);
      setLoginMessage("Yay! You login!")
      setEmail("")
      setPassword("")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      setEmail("")
      setPassword("")
    });
  }

  async function handleSignUp(e) {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setSignUpMessage("Yay! You signed up!")
      setEmail("")
      setPassword("")
    } catch (error) {
      console.error('Error signing up: ', error.message);
      setSignUpMessage(error.message);
    }
  }
  

  return (
    <div className="App">
      <Nav
        displaySignUp={displaySignUp}
        onResetChat={resetChat}
        onToggleSignUp={toggleSignUp}
        setSignUpModal = {setSignUpModal}
        setLoginModal={setLoginModal}
        user={user}
      />
      {signUpModal && 
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type = "submit">Sign Up</button>
        </form>
      }

      {loginModal && 
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type = "submit">Login</button>
        </form>
      }

      <div>{signUpMessage}</div>
      <div>{loginMessage}</div>



      
      {displaySignUp ? (
        <SignUpPage />
      ) : (
        <MainPage key={key} onResetChat={resetChat} />
      )}
    </div>
  );
}

export default App;
