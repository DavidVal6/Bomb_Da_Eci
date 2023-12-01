import React, { useEffect, useState } from 'react';
import '../../styles/Game.css';
import Cell from './Cell';
import Sprite from './Sprite';
import Bushes from "../../assets/images/Bush.png";
import Tombstones from "../../assets/images/Tombstone.png";
import Street from "../../assets/images/Carretera.png";
import Bomb from './Bomb';
import Box from "../../assets/models/Box.png";
import Coliseo from "../../assets/images/Coliseo.png";
import Harveys from "../../assets/images/Harveys.png";
import Security from "../../assets/images/Security.png";
import Dog from "../../assets/images/Dog.png";
import Restaurante from "../../assets/images/Restaurante.png";
import A from "../../assets/images/A.png";
import C from "../../assets/images/C.png";
import D from "../../assets/images/D.png";
import F from "../../assets/images/F.png";
import G from "../../assets/images/G.png";
import H from "../../assets/images/H.png";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

var poblated = false;
let isAnimating = true;
let currentCells = [];
let xSprite = [0, 135, 135, 405];
let ySprite = [0, 0, 180, 0];
const Ducks = [5, 6];
var player = <Sprite spriteX={xSprite[0]} spriteY={ySprite[0]} />;
var flagBomb = false;
var bombPosX = '0';
var bombPosY = '0';
var positionX = 1;
var positionY = 1;
const validKeys = ['a', 'w', 's', 'd', ' '];

var buildings = {"H":[2,2],
                "Harveys":[2,9],
                "G":[9,9],
                "D":[9,2],
                "Coliseo1":[3,5],
                "Coliseo2":[3,6],
                "Security":[8,5],
                "Dog":[8,6],
                "Restaurante":[4,3],
                "F":[4,8],
                "A":[7,3],
                "C":[7,8]};

var buildingsName = {"H":H,
                "Harveys":Harveys,
                "G":G,
                "D":D,
                "Coliseo1":Coliseo,
                "Coliseo2":Coliseo,
                "Security":Security,
                "Dog":Dog,
                "Restaurante":Restaurante,
                "F":F,
                "A":A,
                "C":C};

var entities = [];
var gamer = [];
var gamers = [];
var chosenChar = 0;

const socket = new SockJS('http://localhost:8080/stompendpoint');
const client = Stomp.over(socket);

class Interaction {
  constructor(key, player) {
      this.player = player;
      this.key = key;
  }
}


function Game() {
  const [prevX, setPrevX] = useState(positionX);
  const [prevY, setPrevY] = useState(positionY);
  const [count, setCount] = useState(-1);
  const [cells, setCellsContent] = useState([]);

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem('msal.token.keys.ae28ab40-d26b-42fe-845f-1aa60f9f0099'));
    let idToken = JSON.parse(sessionStorage.getItem(user.idToken));
    console.log(idToken.homeAccountId);
    
    client.connect({}, () => {

      // Obtiene la instancia del  tabler
      client.subscribe('/user/queue/get-board-instance.' + idToken.homeAccountId, (response) => {
        const board = JSON.parse(response.body);
        entities = board;
        renderTable();
      });
      // Activa un trigger en el back para que este retorne la instancia de los jugadores
      client.send('/app/get-board-instance.' + idToken.homeAccountId, {}, 'Loud And Clear');

      // Obtiene la instancia de los jugadores
      client.subscribe('/user/queue/get-player-instance.' + idToken.homeAccountId, (response) => {
        //console.log("Entre");
        const player = JSON.parse(response.body);
        gamer = player;
      });
      

      client.subscribe('/user/queue/get-players-instance.' + idToken.homeAccountId, (response) => {
        //console.log("Entre");
        const players = JSON.parse(response.body);
        gamers = players;
      });
      

      client.subscribe('/user/queue/get-board-instance-in-game.' + idToken.homeAccountId, (response) => {
        const board = JSON.parse(response.body);
        entities = board;
        renderTable();
      });

      client.subscribe('/user/queue/get-chosen-character.' + idToken.homeAccountId, (response) => {
        chosenChar = parseInt(response.body, 10);
      });

      client.send('/app/get-chosen-character.' + idToken.homeAccountId, {}, 'Loud And Clear');
      
      setTimeout(() => {
        // Activa un trigger en el back para que este retorne la instancia de los jugadores
        client.send('/app/get-player-instance.' + idToken.homeAccountId, {}, 'Loud And Clear');
        client.send('/app/get-players-instance.' + idToken.homeAccountId, {}, 'Loud And Clear');
      }, 500);
    });

    let animationX = 0;
    let animationY = 0;

    const renderTable = () => {
      // Si el tablero ya esta poblado, no se vuelven a generar las celdas si no que se trabaja sobre las ya existentes
      if (!poblated){
        // Mapeo y asignacion de celdas
        let content = null;
        for (let i = 0; i < 12; i++) {
          currentCells[i] = [];
          for (let j = 0; j < 12; j++) {
            content = 
            i === 1 && j === 1 ? player :
            entities[i][j] === '2' ? <img src={Box} className="mapImages" alt="box"/> :
            Ducks.includes(j) && Ducks.includes(i) ? <div className={`duck-${j}-${i}`}/> :
            i === 11 ? <img src={Street} className="mapImages" alt="street"/> :
            j === 11 ? <img src={Tombstones} className="mapImages" alt="tombstones"/> :
            j === 0 || i === 0 ? <img src={Bushes} className="mapImages" alt="bushes"/> :
            null;
            
            currentCells[i][j] = <Cell row={i} column={j} content={content} />;
          }
        }

        let row = 0;
        let column = 0;
        // Con esto se incluyen las imagenes de los edificios
        Object.keys(buildings).forEach(function(key) {
          row = buildings[key][0];
          column = buildings[key][1];
          content = key.includes("Coliseo") ? 
                    <div className={key} />:
                    <img src={buildingsName[key]} className="mapImages" alt={"" + key}/>;
          currentCells[row][column] = <Cell row={row} column={column} content={content} />;
        });

        setCellsContent([...currentCells]);
        poblated = true;
      }
    };

    // Esta función se utiliza para escuchar las teclas y actualizar la posicion y animacion
    const animate = (key) => {
      // Solo teclas validas son leidas
      if (validKeys.includes(key)) {
        // Con este if el jugador debe presionar de forma pausada las teclas para interacturar
        if (isAnimating){
          isAnimating = false;

          if (key === ' '){
            // Llamado al back para poner una bomba
            bombPosX = gamer.xPosition;
            bombPosY = gamer.yPosition;
            flagBomb = true;
          }

          // Esto se asegura que el ciclo del sprite sea correcto
          setCount((prevCount) => (prevCount < 0 ? prevCount + 1 : -2));
          console.log("Aqui?");
          // Esto se hace para redibujar el sprite en cada celda a la que se mueve
          currentCells[prevX][prevY] = <Cell row={prevX} column={prevY} />;

          // Animacion del sprite
          animationY =
            key === 's'
              ? ySprite[chosenChar]
              : key === 'a'
              ? 45 + ySprite[chosenChar]
              : key === 'd'
              ? 90 + ySprite[chosenChar]
              : 135 + ySprite[chosenChar];
          animationX = 90 + 45 * count + xSprite[chosenChar];
          player = <Sprite spriteX={animationX} spriteY={animationY} />;

          currentCells[gamer.xPosition][gamer.yPosition] = <Cell row={gamer.xPosition} column={gamer.xPosition} content={player} />;
          console.log(bombPosX !== gamer.xPosition || bombPosY !== gamer.xPosition);
          if (flagBomb && (bombPosX !== gamer.xPosition || bombPosY !== gamer.xPosition)){
            currentCells[bombPosX][bombPosY] = <Cell row={bombPosX} column={bombPosY} content={<Bomb />} />;
            flagBomb = false;
          }

          setCellsContent([...currentCells]); // Actualiza el estado de las celdas
          setPrevX(gamer.xPosition);
          setPrevY(gamer.yPosition);
        }
      }
    };

    const handleKeyDown = (e) => {
      var ans = new Interaction(e.key, gamer.name);
      client.send('/app/player-interaction.' + idToken.homeAccountId, {}, JSON.stringify(ans));
      setTimeout(() => {
        animate(e.key);
      }, 50);
    };

    // const fps = setInterval(() => {
    //   client.send('/app/get-players-instance.' + idToken.homeAccountId, {}, 'Loud And Clear');
    //   client.send('/app/get-board-instance-in-game.' + idToken.homeAccountId, {}, 'Test');
    // }, 500);

    const handleKeyUp = () => {
      isAnimating = true;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      //clearInterval(fps);
    };
  }, [count, prevX, prevY]);


  return (
    <div className="map">
      {cells.length !== 0 ? (
        cells.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="row">
            {row.map((cell, colIndex) => (
              <React.Fragment key={`cell-${rowIndex}-${colIndex}`}>{cell}</React.Fragment>
            ))}
          </div>
        ))
      ) : (
        <div>Loading, if nothing happens please refresh your page</div>
      )}
    </div>
  );
}

export default Game;

// {idPlayer: 213123, action: right}