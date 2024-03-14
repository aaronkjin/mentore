import React from "react";

import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";

import logo from "../images/logo-white.png";

function Nav({
  displaySignUp,
  onResetChat,
  onToggleSignUp,
  setIdentity,
  user,
}) {
  const getEmailInitial = (email) => {
    const initial = email.charAt(0).toUpperCase();
    return initial.match(/[A-Z]/) ? initial : "#";
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <nav>
      <div
        onClick={onResetChat}
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img src={logo} width={50} height={50} />
        <h1 style={{ fontSize: "28px" }}>Mentore</h1>
      </div>
      <div style={{ paddingRight: "10px" }}>
        {displaySignUp ? (
          <button onClick={onResetChat} className="sign-in-button">
            Go Back
          </button>
        ) : (
          <>
            {user ? (
              <div className="user-initial" onClick={handleLogout}>
                {getEmailInitial(user.email)}
              </div>
            ) : (
              <>
                <span onClick={onToggleSignUp} className="link-like-text">
                  Become a Mentor
                </span>
                <button
                  onClick={() => setIdentity(true)}
                  className="sign-in-button"
                >
                  Sign Up / Sign In
                </button>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
