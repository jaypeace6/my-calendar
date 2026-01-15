import React from "react";
import danceLogo from "../dance_logo.png";

const Header = ({ onSubmitEvent, myCalendarId }) => {
  const handleAddToCalendar = () => {
    if (myCalendarId) {
      window.open(`https://calendar.google.com/calendar/render?cid=${encodeURIComponent(myCalendarId)}`, '_blank');
    }
  };

  const handleAbout = () => {
    alert('This is a sample React app using FullCalendar to display events from public Google Calendars. We are working to add full basic functionality soon!');
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
      {/* Left side: Logo */}
      <img src={danceLogo} alt="Dance Calendar Logo" style={{ height: "120px", margin: 0 }} />

      {/* Right side: Buttons */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleAbout}
        >
          About
        </button>
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