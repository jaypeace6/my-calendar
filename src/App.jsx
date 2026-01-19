import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Header from "./header";
import Calendar from "./calendar";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

const API_KEY = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY;

const CALENDAR_IDS = [
  'en.usa#holiday@group.v.calendar.google.com', // US holidays
  'dee75596aea9533d01629c0cfc3c9561723c5d0db26e671aa7370189f83e9aea@group.calendar.google.com' // My new calendar made
];
const MY_CALENDAR_ID = 'dee75596aea9533d01629c0cfc3c9561723c5d0db26e671aa7370189f83e9aea@group.calendar.google.com'; // Your calendar ID

// In Firebase Console (where you see "Hello, [Name] Welcome to your Firebase project!"):
// Click the gear icon in the left sidebar > "Project settings".
// Scroll down to the "Your apps" section.
// If you haven't added a web app yet:
// Click "Add app" > Select the "</>" web icon.
// Enter a nickname (e.g., "My Calendar App").
// Click "Register app".
// In the "SDK setup and configuration" section, you'll see a firebaseConfig obejct with your keys. Copy the values
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("dayGridWeek");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const CALENDAR_ID = "en.usa#holiday@group.v.calendar.google.com";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const allEvents = [];
        for (const id of CALENDAR_IDS) {
          const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(id)}/events?key=${API_KEY}`);
          const data = await response.json();
          if (data.error) {
            continue;
          }
          if (data.items && data.items.length > 0) {
            for (const item of data.items) {
              const event = {
                title: item.summary,
                start: item.start.dateTime || item.start.date,
                end: item.end.dateTime || item.end.date,
                id: item.id,
              };

              // Don't fetch Firestore here - do it on click instead
              allEvents.push(event);
            }
          }
        }
        setEvents(allEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();

    // Listen to Firebase events collection for changes (not initial load)
    const eventsRef = collection(db, 'events');
    const unsubscribe = onSnapshot(eventsRef, (snapshot) => {
      // Skip the initial snapshot load
      if (isInitialLoad) {
        setIsInitialLoad(false);
        return;
      }
      // Update lastUpdated only when events actually change
      setLastUpdated(new Date());
    }, (error) => {
      console.log('Firebase listener error:', error);
    });

    return () => unsubscribe();
  }, [isInitialLoad]);

  const handleSubmitEvent = () => {
    // Add logic for submitting an event
    alert("Submit Event clicked!");
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  // This is the main render
  // For playing w color: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/named-color
  return (
    <div style={{ padding: "20px", backgroundColor: "#02008f", minHeight: "100vh" }}>
      <Header onSubmitEvent={handleSubmitEvent} myCalendarId={MY_CALENDAR_ID} /> {/* Pass the calendar ID */}

      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <Calendar events={events} view={view} onViewChange={handleViewChange} myCalendarId={MY_CALENDAR_ID} />
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center', fontFamily: 'Arial, sans-serif', color: '#ffd675' }}>
        <h2>STL Afro-Latin Dance Calendar – for dancers, by dancers. The most accurate latin dance calendar in St. Louis MO</h2>
        <p>We're a community of passionate dancers, updating the calendar every week with all the deets you need to find public classes, socials, and other events across the St. Louis Afro‑Latin dance scene. Check out what's happening and be part of the rhythm!</p>

        <p>To learn more or request to add your event, explore our subpages.</p>
        <p>Est. 2026</p>
        {lastUpdated && (
          <p style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>
            Last updated: {lastUpdated.toLocaleString()}
          </p>
        )} 
      </div>
    </div>
  );
}

export default App;