import React from "react";

function Nav({ displaySignUp, onResetChat, onToggleSignUp, setIdentity, user}) {
  return (
    <nav>
      <div
        onClick={onResetChat}
        style={{ paddingLeft: "10px", cursor: "pointer" }}
      >
        <h1 style={{ fontSize: "28px" }}>Mentore</h1>
      </div>
      <div style={{ paddingRight: "10px" }}>
        {displaySignUp ? (
          <button onClick={onResetChat} className="sign-in-button">
            Go Back
          </button>
        ) : (
          <>
            {user && <button>{user.email}</button>}
            <button onClick={() => setIdentity(true)}>Sign up / Sign in</button>
            <button onClick={onToggleSignUp} className="sign-in-button">
              Become a Mentor
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
