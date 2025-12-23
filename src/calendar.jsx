import React, { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

const Calendar = ({ events, view = "dayGridMonth", onViewChange }) => {
  const calendarRef = useRef(null);

  // When parent `view` prop changes, instruct FullCalendar to change view
  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi && view) calendarApi.changeView(view);
  }, [view]);

  return (
    <div className={`fc-wrapper ${view}`}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView={view}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek",
        }}
        buttonText={{
          today: "Today",
          month: "Month",
          week: "Week",
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
      />
    </div>
  );
};

export default Calendar;