import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// MIS COMPONENTES
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";

// INICIO
export const AppRouter = () => {
  // HOOKS
  const { status, checkAuthToken } = useAuthStore();
  // const authStatus = "not-authenticated";
  // EFFECT
  useEffect(() => {
    checkAuthToken();
  }, []);

  // RENDER
  if (status === "checking") {
    return <h3>Cargando...</h3>;
  }
  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};
