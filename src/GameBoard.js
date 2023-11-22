import './styles/GameBoard.css';
import Player from './components/board/Player';
import NavigationBar from './components/menu/navigationBar';
import ExitButton from './components/board/ExitButton';
import Game from './components/board/Game';

function GameBoard(){
  
  return(
    <div className="game-board">
      <NavigationBar />
      <div className="board-down-pannel">
        <Game />
        <div className="players-and-exit">
          <Player identifier={1} />
          <Player identifier={2} />
          <Player identifier={3} />
          <Player identifier={4} />
          <ExitButton />
        </div>
      </div>
    </div>
  );
}

export default GameBoard;