import React from "react";
import { useCalendarStore } from "../../hooks";
// INICIO
export const FabDelete = () => {
  // HOOKS

  const { startDeleteEvent, hasEventSelected } = useCalendarStore();
  // FUNCIONES
  const handleDelete = () => {
    startDeleteEvent();
  };
  // RENDER
  return (
    <>
      <button
        className="btn btn-danger fab-danger"
        onClick={handleDelete}
        style={{ display: hasEventSelected ? "" : "none" }}
      >
        <i className="fas fa-trash-alt"></i>
      </button>
    </>
  );
};
