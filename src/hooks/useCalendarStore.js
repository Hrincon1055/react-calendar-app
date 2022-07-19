import { useSelector, useDispatch } from "react-redux";
import {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
} from "../store";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";
export const useCalendarStore = () => {
  // HOOKS
  const dispatch = useDispatch();
  // CONSTANTES
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);
  // FUNCIONES
  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };
  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        // Actualizando
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      // Creando
      const { data } = await calendarApi.post("/events", calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
    } catch (error) {
      console.log({ error });
      Swal.fire("Error al guardar", error.response?.data.msg, "error");
    }
  };
  const startDeleteEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log({ error });
      Swal.fire(
        "Error al eliminar evento",
        "No se pudo eliminar el evento",
        "error"
      );
    }
  };
  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      const events = convertEventsToDateEvents(data.eventos);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log("Error Al cargar los eventos.");
      console.log({ error });
    }
  };
  // RETORNO
  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent,
    startLoadingEvents,
  };
};
