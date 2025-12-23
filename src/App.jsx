import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";

function App() {
  const [events, setEvents] = useState([]);

  const API_KEY = "AIzaSyBRwrVIXSQOoSrLYsBA1h_Fr2nqZunt2Wc";
  const CALENDAR_ID = "en.usa#holiday@group.v.calendar.google.com";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
            CALENDAR_ID
          )}/events?key=${API_KEY}`
        );
        const items = res.data.items.map((item) => ({
          title: item.summary,
          start: item.start.date || item.start.dateTime,
          end: item.end.date || item.end.dateTime,
        }));
        setEvents(items);
        console.log("Events loaded!", items);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
      />
    </div>
  );
}

export default App;


// import React from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import googleCalendarPlugin from "@fullcalendar/google-calendar";

// function App() {
//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>My Calendar</h1>
//       <FullCalendar
//         plugins={[dayGridPlugin, googleCalendarPlugin]}
//         initialView="dayGridMonth"
//         googleCalendarApiKey="AIzaSyBRwrVIXSQOoSrLYsBA1h_Fr2nqZunt2Wc"  // replace with your API key
//         events={{
//           googleCalendarId: "en.usa#holiday@group.v.calendar.google.com"
//         }}
//         height="auto"
//         loading={(isLoading) => {
//           if (isLoading) console.log("Loading events...");
//           else console.log("Events loaded!");
//         }}
//       />
//     </div>
//   );
// }

// export default App;
