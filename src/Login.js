import { loginRequest } from "./authConfig.js";
import { useMsal } from '@azure/msal-react';

function Login () {
    const { instance } = useMsal();

    const handleLoginRedirect = () => {
        instance.loginRedirect({
            ...loginRequest,
            redirectUri: '/game-menu',
        }).catch((error) => console.log(error));
    };

    // const handleLogoutRedirect = () => {
    //     instance.logoutRedirect().catch((error) => console.log(error));
    // };

    /**
     * Most applications will need to conditionally render certain components based on whether a user is signed in or not.
     * msal-react provides 2 easy ways to do this. AuthenticatedTemplate and UnauthenticatedTemplate components will
     * only render their children if a user is authenticated or unauthenticated, respectively.
     */
    return (
        <form className="form">
            <h1>Join Us and Bomb Da Eci!!</h1>
            <button onClick={() => handleLoginRedirect()}>Login/Sign Up</button>
        </form>
    );
}

export default Login;