import React, { useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

// MIS COMPONENTES
import {
  Navbar,
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
} from "../";
import { localizer, getMessagesES } from "../../helpers";
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks";

// INICIO
export const CalendarPage = () => {
  // HOOKS
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  // STATE
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );
  // EFFECT
  useEffect(() => {
    startLoadingEvents();
  }, []);

  // FUNCIONES
  const eventStyleGetter = (event, start, end, isSelected) => {
    const isMyEvent =
      user.uid === event.user._id || user.uid === event.user.uid;
    const style = {
      backgroundColor: isMyEvent ? "#347cf7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };
    return {
      style,
    };
  };
  const onDoubleClick = (event) => {
    console.log("CalendarPage LINE 32 =>");
    openDateModal();
  };
  const onSelect = (event) => {
    setActiveEvent(event);
    openDateModal();
  };
  const onViewChanged = (event) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  };
  // RENDER
  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        // onDoubleClickEvent={(event) => onDoubleClick(event)}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
