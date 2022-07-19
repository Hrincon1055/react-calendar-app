import React from "react";
import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";
// INICIO
export const FabAddNew = () => {
  // HOOKS
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();
  // FUNCIONES
  const handleClickNew = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        _id: "123456789",
        name: "Henry Rincon",
      },
    });
    openDateModal();
  };
  // RENDER
  return (
    <>
      <button className="btn btn-primary fab" onClick={handleClickNew}>
        <i className="fas fa-plus"></i>
      </button>
    </>
  );
};
