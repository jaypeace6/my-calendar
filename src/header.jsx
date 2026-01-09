import React from "react";

const Header = ({ onSubmitEvent, myCalendarId }) => {
  const handleAddToCalendar = () => {
    if (myCalendarId) {
      window.open(`https://calendar.google.com/calendar/render?cid=${encodeURIComponent(myCalendarId)}`, '_blank');
    }
  };

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

      {/* Right side: Buttons */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleAddToCalendar}
        >
          Add to My Google Calendar
        </button>
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
    </div>
  );
};

export default Header;