import React, { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider.tsx";
import { Navigate } from "react-router-dom";// Importa tu instancia de MSAL configurada
import msalInstance from "../auth/msal";

export default function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();

  const handleCreateUser = async () => {
    try {
      // Crear un usuario en Azure Active Directory utilizando la API de Microsoft Graph
      const graphResponse = await createUserInAzureAD(name, username, password);

      if (graphResponse.ok) {
        console.log("User created successfully");
        // Después de crear el usuario, puedes llamar a la función de inicio de sesión para iniciar sesión automáticamente
        await auth.login();
      } else {
        console.log("Something went wrong while creating the user");
      }
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  };

  if (auth.isAuthenticated) {
    return (
      <div>
        {/* Muestra un mensaje de bienvenida si el usuario está autenticado */}
        <p>Welcome, {auth.user.name}!</p>
        <Navigate to={"/dashboard"} />
      </div>
    );
  }

  return (
    <DefaultLayout>
      <form className="form">
        <h1>Signup</h1>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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

        {/* Llama a handleCreateUser cuando se hace clic en "Create User" */}
        <button onClick={handleCreateUser}>Create User</button>
      </form>
    </DefaultLayout>
  );
}

async function createUserInAzureAD(name:string, username:string, password:string) {
  try {
    // Realiza una solicitud para crear un usuario en Azure Active Directory utilizando la API de Microsoft Graph
    const graphEndpoint = "https://graph.microsoft.com/v1.0/users";

    const graphResponse = await fetch(graphEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getAccessTokenForGraph()}`, // Obtiene un token de acceso para Microsoft Graph
      },
      body: JSON.stringify({
        displayName: name,
        userPrincipalName: username,
        passwordProfile: {
          password,
          forceChangePasswordNextSignIn: false,
        },
      }),
    });

    return graphResponse;
  } catch (error) {
    throw error;
  }
}

async function getAccessTokenForGraph() {
  try {
    // Obtén un token de acceso para Microsoft Graph utilizando MSAL
    const authResponse = await msalInstance.acquireTokenSilent({
      scopes: ["https://graph.microsoft.com/.default"],
    });

    return authResponse.accessToken;
  } catch (error) {
    throw error;
  }
}
