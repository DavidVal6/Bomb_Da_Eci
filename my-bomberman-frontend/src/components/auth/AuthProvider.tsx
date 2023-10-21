import React, { useContext, createContext, useState, useEffect } from "react";
import { PublicClientApplication, AuthenticationResult } from "@azure/msal-browser";

interface AuthProviderProps {
  children: React.ReactNode;
}

const msalConfig = {
  auth: {
    clientId: "fd2eb0af-1c66-4b37-b8cb-a9972dc20648",
    authority: "https://login.microsoftonline.com/f8cdef31-a31e-4b4a-93e4-5f571e91255a",
    redirectUri: "http://localhost:3100", // Cambia esto según tu configuración
  },
};

const pca = new PublicClientApplication(msalConfig);

const AuthContext = createContext({
  isAuthenticated: false,
  user: null as any, // Aquí puedes almacenar información del usuario si lo necesitas
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null); // Almacena información del usuario si es necesario

  useEffect(() => {
    // Comprobar si el usuario está autenticado al cargar la página
    const accounts = pca.getAllAccounts();
    if (accounts.length > 0) {
      setIsAuthenticated(true);
      setUser(accounts[0]);
    }
  }, []);

  const login = async () => {
    try {
      // Llama a la función de inicio de sesión de MSAL
      const loginResponse: AuthenticationResult = await pca.loginPopup();
      if (loginResponse) {
        setIsAuthenticated(true);
        setUser(loginResponse.account);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const logout = () => {
    pca.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
