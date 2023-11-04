import React from "react";
import ReactDOM from "react-dom";
import "./styles/Main.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/routes/Login.tsx";
import Singup from "./components/routes/Singup.tsx";
import Dashboard from "./components/routes/Dashboard.tsx";
import Protectedroute from "./components/routes/Protectedroutes.tsx";
import { AuthProvider } from "./components/auth/AuthProvider.tsx";

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
