import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, HashRouter } from "react-router-dom";
// MIS COMPONENTES
import { AppRouter } from "./router";
import { store } from "./store";
// INICIO
export const CalendarApp = () => {
  // RENDER
  return (
    <Provider store={store}>
      {/* <BrowserRouter> */}
      <HashRouter>
        <AppRouter />
      </HashRouter>
      {/* </BrowserRouter> */}
    </Provider>
  );
};
