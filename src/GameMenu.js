import AchivementsBar from './components/menu/achivementsBar';
import CharSelection from './components/menu/charSelection';
import Navbar from './components/menu/navigationBar';
import PlayButton from './components/menu/playButton';
import './styles/GameMenu.css';

function GameMenu({ userID }) {
  
  return (
    <div className="GameMenu">
      <Navbar />

      <div className="bottomPanel">
        <CharSelection userID={userID}/>

        <div className="rightPanel">
          <AchivementsBar />
          <PlayButton />
        </div>
      </div>
    </div>
  );
}

export default GameMenu;
