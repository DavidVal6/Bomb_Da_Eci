import './styles/App.css';
import GameMenu from './GameMenu';
import GameBoard from './GameBoard';
import { BrowserRouter as Router, Route, Routes}
    from 'react-router-dom';
import Main from './Main.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/game-menu' element={<GameMenu />} />
        <Route path='/game-board' element={<GameBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
