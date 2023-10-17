import './styles/GameBoard.css';
import Sprite from './components/board/Sprite';

function GameBoard(){
  let xSprite = [0, 288, 288, 864];
  let ySprite = [0, 0, 384, 0];
  return(
    <div className="GameBoard">
      {/* <Sprite spriteX={0} spriteY={0}/>
      <Sprite spriteX={288} spriteY={0}/>
      <Sprite spriteX={288} spriteY={384}/>
      <Sprite spriteX={864} spriteY={0}/> */}
      <Sprite spriteX={xSprite[0]} spriteY={ySprite[0]}/>
    </div>
  );
}

export default GameBoard;