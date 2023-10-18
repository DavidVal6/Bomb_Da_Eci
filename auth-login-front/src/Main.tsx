import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/Login.tsx";
import Singup from "./routes/Singup.tsx";
import Dashboard from "./routes/Dashboard.tsx";
import Protectedroute from "./routes/Protectedroutes.tsx";
import { AuthProvider } from "./auth/AuthProvider.tsx";

const Main = () => {
  const rootElement = document.getElementById("root");

  if (rootElement) {
    const router = createBrowserRouter([
      {
        path: "/",
        element: React.createElement(Login),
      },
      {
        path: "/signup",
        element: React.createElement(Singup),
      },
      {
        path: "/",
        element: React.createElement(Protectedroute),
        children: [
          {
            path: "/dashboard",
            element: React.createElement(Dashboard),
          },
        ],
      },
    ]);

    const root = ReactDOM.createRoot(rootElement);
    root.render(
      React.createElement(
        React.StrictMode,
        null,
        React.createElement(
          AuthProvider,
          null,
          React.createElement(RouterProvider, { router: router }, null)
        )
      )
    );
  }
};

export default Main;
