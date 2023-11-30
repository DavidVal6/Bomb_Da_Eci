import React, { useState, useEffect } from 'react';
import './styles/App.css';
import GameMenu from './GameMenu';
import GameBoard from './GameBoard';
import { BrowserRouter as Router, Route, Routes, Navigate }
    from 'react-router-dom';
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import Login from './Login.js';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

const socket = new SockJS('http://localhost:8080/stompendpoint');
const client = Stomp.over(socket);
var noMoreTokens = false;

function App({ instance }) {
  //console.log();
  const [userID, setUserID] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (!noMoreTokens) {
      client.connect({}, () => {
        client.subscribe('/user/queue/get-user-id', (response) => {
          if (!noMoreTokens) {
            const receivedToken = JSON.parse(response.body);
            setUserID(receivedToken);
            localStorage.setItem('token', receivedToken);
          }
        });
        // Activa un trigger en el back para que retorne un token de sesión
        client.send('/app/get-user-id', {}, 'Loud');
      });
      setTimeout(() => {
        client.disconnect();
      }, 1000);
    }
  }, []);

  console.log(userID);

  return (
    <MsalProvider instance={instance}>
      <AuthenticatedTemplate>
        <Router>
          <Routes>
            <Route path="*" element={<Navigate to="/game-menu" replace />} />
            <Route path='/game-menu' element={<GameMenu userID={userID.token} />} />
            <Route path='/game-board' element={<GameBoard userID={userID.token} />} />
          </Routes>
        </Router>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Router>
          <Login />
        </Router>
      </UnauthenticatedTemplate>
    </MsalProvider>
  );
}

export default App;
