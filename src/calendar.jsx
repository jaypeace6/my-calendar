import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

const Calendar = ({ events, view = "dayGridWeek", onViewChange }) => {
  const calendarRef = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // When parent `view` prop changes, instruct FullCalendar to change view
  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi && view) calendarApi.changeView(view);
  }, [view]);

  const handleEventClick = (info) => {
    if (info.event.extendedProps) {
      setSelectedEvent(info.event.extendedProps);
    }
  };

  const closeModal = () => setSelectedEvent(null);

  return (
    <div className={`fc-wrapper ${view}`}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView={view}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridWeek,dayGridMonth",
        }}
        buttonText={{
          today: "Today",
          week: "Week",
          month: "Month",
        }}
        allDaySlot={false}
        events={events}
        height="auto"
        // removes extra week rows in month view
        showNonCurrentDates={false}
        views={{
          dayGridMonth: { fixedWeekCount: false, showNonCurrentDates: false },
        }}
        datesSet={(dateInfo) => {
          if (onViewChange) onViewChange(dateInfo.view.type);
        }}
        eventClick={handleEventClick}
      />
      {selectedEvent && (
        <div style={{
          position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          background: 'white', padding: '20px', border: '1px solid black', zIndex: 1000
        }}>
          <h2>{selectedEvent.name}</h2>
          <p><strong>Description:</strong> {selectedEvent.description}</p>
          <p><strong>Date:</strong> {selectedEvent.date}</p>
          <p><strong>Time:</strong> {selectedEvent.time}</p>
          <p><strong>Type:</strong> {selectedEvent.type}</p>
          <p><strong>Instagram:</strong> <a href={selectedEvent.instagramLink} target="_blank">Link</a></p>
          <p><strong>Flyer:</strong> <img src={selectedEvent.flyer} alt="Flyer" style={{ maxWidth: '200px' }} /></p>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Calendar;