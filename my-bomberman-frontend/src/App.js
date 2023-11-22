import './styles/App.css';
import GameMenu from './GameMenu';
import GameBoard from './GameBoard';
import { BrowserRouter as Router, Route, Routes, Navigate}
    from 'react-router-dom';
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import Login from './Login.js';

function App ({ instance }) {
  return (
    <MsalProvider instance={instance}>
      <AuthenticatedTemplate>
        <Router>
          <Routes>
            <Route path="*" element={<Navigate to="/game-menu" replace />} />
            <Route path='/game-menu' element={<GameMenu />} />
            <Route path='/game-board' element={<GameBoard />} />
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
