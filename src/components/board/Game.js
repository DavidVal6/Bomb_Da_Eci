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
import Cookie from 'js-cookie';

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
    // let user = JSON.parse(sessionStorage.getItem('msal.token.keys.ae28ab40-d26b-42fe-845f-1aa60f9f0099'));
    // let idToken = JSON.parse(sessionStorage.getItem(user.idToken));
    
    client.connect({}, () => {
      // Activa un trigger en el back para que este retorne la instancia de los jugadores
      client.send('/app/create-game.' + Cookie.get('userId'), {}, Cookie.get('gameId'));

      // Conexion pendiente cuando 4 jugadores se unan a una misma partida
      client.subscribe('/user/queue/create-game', (response) => {
        const board = JSON.parse(response.body);
        entities = board;
        renderTable();
      });
      
      // Conexión pendiente cuando el jugador interactue para recibir el tablero actual
      client.subscribe('/user/queue/get-board-instance.' + Cookie.get('userId'), (response) => {
        const board = JSON.parse(response.body);
        entities = board;
        renderTable();
      });

      // Conexion para recibir jugadores cada vez que se necesite
      client.subscribe('/user/queue/get-players.' + Cookie.get('userId'), (response) => {
        const players = JSON.parse(response.body);
        gamers = players;
      });
      
      // Obtiene la instancia de los jugadores
      client.subscribe('/user/queue/get-my-player.' + Cookie.get('userId'), (response) => {
        const player = JSON.parse(response.body);
        gamer = player;
      });
      
    });

    let animationX = 0;
    let animationY = 0;

    const renderTable = () => {
      // Si el tablero ya esta poblado, no se vuelven a generar las celdas si no que se trabaja sobre las ya existentes
      if (!poblated){
        client.send('/app/get-my-player.' + Cookie.get('userId'), {}, Cookie.get('gameId'));
        client.send('/app/get-players.' + Cookie.get('userId'), {}, Cookie.get('gameId'));
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
        gamers.forEach(player => {
          const { xPosition, yPosition, character, isAlive } = player;
      
          // Asegúrate de que el jugador esté vivo antes de renderizarlo
          if (isAlive) {
            currentCells[xPosition][yPosition] = (
              <Cell row={xPosition} column={yPosition} content={<Sprite spriteX={xSprite[character]} spriteY={ySprite[character]}/>}/>
            );
          }
        });

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
      var key = e.key;
      var gameId = Cookie.get('gameId');
      client.send('/app/player-interaction.' + Cookie.get('userId'), {}, JSON.stringify({ key, gameId }));
      setTimeout(() => {
        animate(e.key);
      }, 50);
    };

    const intervalId = setInterval(() => {
    client.send('/app/get-board-instance.' + Cookie.get('userId'), {},Cookie.get('gameId'));
    }, 1000);
    
    setTimeout(() => {
      clearInterval(intervalId);
    }, 1000);

    const handleKeyUp = () => {
      isAnimating = true;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
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