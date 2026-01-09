import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Header from "./header";
import Calendar from "./calendar";

const API_KEY = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY;

const CALENDAR_IDS = [
  'en.usa#holiday@group.v.calendar.google.com', // US holidays
  'dee75596aea9533d01629c0cfc3c9561723c5d0db26e671aa7370189f83e9aea@group.calendar.google.com' // My new calendar made
];

const MY_CALENDAR_ID = 'dee75596aea9533d01629c0cfc3c9561723c5d0db26e671aa7370189f83e9aea@group.calendar.google.com'; // Your calendar ID

function App() {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("dayGridWeek");
  const CALENDAR_ID = "en.usa#holiday@group.v.calendar.google.com";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const allEvents = [];
        for (const id of CALENDAR_IDS) {
          const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(id)}/events?key=${API_KEY}`);
          const data = await response.json();
          if (data.items) {
            allEvents.push(...data.items.map(event => ({
              title: event.summary,
              start: event.start.dateTime || event.start.date,
              end: event.end.dateTime || event.end.date,
            })));
          }
        }
        setEvents(allEvents);
        console.log('Events loaded!');
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleSubmitEvent = () => {
    // Add logic for submitting an event
    alert("Submit Event clicked!");
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Header onSubmitEvent={handleSubmitEvent} myCalendarId={MY_CALENDAR_ID} /> {/* Pass the calendar ID */}

      <Calendar events={events} view={view} onViewChange={handleViewChange} />
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
