import React from "react";
// INICIO
export const CalendarEvent = ({ event }) => {
  const { title, user } = event;

  // RENDER
  return (
    <div>
      <strong>{title}</strong>
      <span> - {user.name}</span>
    </div>
  );
};
