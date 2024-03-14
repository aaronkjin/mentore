import React from "react";

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
            {user ? (
              <div className="user-initial">{getEmailInitial(user.email)}</div>
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
