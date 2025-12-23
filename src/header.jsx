import React from "react";

const Header = ({ onSubmitEvent }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      {/* Left side: Calendar Name */}
      <h1 style={{ margin: 0 }}>My Calendar</h1>

      {/* Right side: Submit Event Button */}
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={onSubmitEvent}
      >
        Submit an Event
      </button>
    </div>
  );
};

export default Header;