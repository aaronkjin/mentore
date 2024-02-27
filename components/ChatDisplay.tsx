import React from "react";

interface ChatDisplayProps {
  message: string;
}

const ChatDisplay: React.FC<ChatDisplayProps> = ({ message }) => {
  return (
    <div
      style={{
        marginTop: "20px",
        padding: "15px",
        backgroundColor: "#333",
        color: "#fff",
        borderRadius: "10px",
        width: "70vw",
        maxWidth: "700px",
        minWidth: "300px",
        border: "1px solid #444",
        overflow: "auto",
        fontFamily: '"Roboto", sans-serif',
      }}
    >
      {message}
    </div>
  );
};

export default ChatDisplay;
