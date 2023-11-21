import React, { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider.tsx";
import { Navigate } from "react-router-dom";
import { PublicClientApplication } from "@azure/msal-browser"; // Importar MSAL

const msalConfig = {
  auth: {
    clientId: "230f4427-5bf9-4bc8-a56b-a3baef5ff8c0",
    authority: "https://login.microsoftonline.com/f8cdef31-a31e-4b4a-93e4-5f571e91255a",
    redirectUri: "http://localhost:3000", // Cambia esto según tu configuración
  },
};

const pca = new PublicClientApplication(msalConfig);

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();

  const login = async () => {
    try {
      const loginResponse = await pca.loginPopup();
      if (loginResponse) {
        // La autenticación fue exitosa, actualiza el estado de autenticación en tu contexto de autenticación
        auth.login(); // Debes implementar una función login en tu AuthProvider para actualizar el estado
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  if (auth.isAuthenticated) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <DefaultLayout>
      <form className="form">
        <h1>Login</h1>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>Login</button>
      </form>
    </DefaultLayout>
  );
}
