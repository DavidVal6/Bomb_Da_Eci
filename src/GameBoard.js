import './styles/GameBoard.css';
import Player from './components/board/Player';
import NavigationBar from './components/menu/navigationBar';
import ExitButton from './components/board/ExitButton';
import Game from './components/board/Game';
import { useState, useEffect } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

function GameBoard({ userID }) {
  const [playersList, setPlayers] = useState([]);
  useEffect(() => {

    const socket = new SockJS('http://localhost:8080/stompendpoint');
    const client = Stomp.over(socket);

    client.connect({}, () => {
      // Obtiene la instancia de los jugadores
      client.subscribe('/user/queue/get-player-instance.' + localStorage.getItem('token').token, (response) => {
        //console.log("Entre");
        const players = JSON.parse(response.body);
        setPlayers(players);
      });
      // Activa un trigger en el back para que este retorne la instancia de los jugadores
      client.send('/app/get-player-instance.' + localStorage.getItem('token').token, {}, 'Loud And Clear');
    });
  }, []);
  
  return (
    <div className="game-board">
      <NavigationBar />
      <div className="board-down-pannel">
        <Game userID={userID}/>
        <div className="players-and-exit">
            <Player identifier={playersList.name} />
          <ExitButton />
        </div>
      </div>
    </div>
  );
}

export default GameBoard;
