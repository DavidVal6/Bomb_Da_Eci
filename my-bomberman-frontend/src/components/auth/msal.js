const { PublicClientApplication } = require("@azure/msal-browser");

// Configuración de MSAL
const msalConfig = {
  auth: {
    clientId: "230f4427-5bf9-4bc8-a56b-a3baef5ff8c0", // Reemplaza con el ID de cliente de tu aplicación registrada en Azure AD
    authority: "https://login.microsoftonline.com/f8cdef31-a31e-4b4a-93e4-5f571e91255a", // Reemplaza con la URL de autoridad de tu inquilino de Azure AD
    redirectUri: "http://localhost:3000", // Reemplaza con la URL de redirección de tu aplicación
  },
  cache: {
    cacheLocation: "sessionStorage", // Ubicación de almacenamiento en caché de tokens (sessionStorage o localStorage)
    storeAuthStateInCookie: false, // Configura esto según tus necesidades
  },
};

// Crea una instancia de MSAL
const msalInstance = new PublicClientApplication(msalConfig);

module.exports = msalInstance;
