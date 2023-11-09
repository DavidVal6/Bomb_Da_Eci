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

var poblated = false;
let isAnimating = true;
let currentCells = [];
let positionX = 1;
let positionY = 1;
let prevAnimationX = 1;
let prevAnimationY = 1;
let xSprite = [0, 135, 135, 405];
let ySprite = [0, 0, 180, 0];
const Ducks = [5, 6];
var player = <Sprite spriteX={xSprite[0]} spriteY={ySprite[0]} />;
var flagBomb = false;
var bombPosX = 0;
var bombPosY = 0;
const validKeys = ['a', 'w', 's', 'd', ' '];
const entitys = [[1,1,1,1,1,1,1,1,1,1,1,1],
                 [1,0,0,2,0,2,0,2,2,0,0,1],
                 [1,0,1,0,0,2,2,0,0,1,0,1],
                 [1,2,0,2,2,1,1,2,2,0,2,1],
                 [1,2,0,1,0,2,2,0,1,0,0,1],
                 [1,0,2,0,2,1,1,2,0,2,2,1],
                 [1,2,2,0,2,1,1,2,0,2,0,1],
                 [1,0,0,1,0,2,2,0,1,0,2,1],
                 [1,2,0,2,2,1,1,2,2,0,2,1],
                 [1,0,1,0,0,2,2,0,0,1,0,1],
                 [1,0,0,2,2,0,2,0,2,0,0,1],
                 [1,1,1,1,1,1,1,1,1,1,1,1]];
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

function Game() {
  const [cells, setCellsContent] = useState([]);
  const [count, setCount] = useState(-1);
  useEffect(() => {
    let animationX = 0;
    let animationY = 0;
    // Si el tablero ya esta poblado, no se vuelven a generar las celdas si no que se trabaja sobre las ya existentes
    if (!poblated){
      // Mapeo y asignacion de celdas
      let content = null;
      for (let i = 0; i < 12; i++) {
        currentCells[i] = [];
        for (let j = 0; j < 12; j++) {
          content = 
          i === 1 && j === 1 ? player :
          entitys[i][j] === 2 ? <img src={Box} className="mapImages" alt="box"/> :
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

    // Esta función se utiliza para escuchar las teclas y actualizar la posicion y animacion
    const handleKeyDown = (e) => {
      // Solo teclas validas son leidas
      if (validKeys.includes(e.key)) {
        // Con este if el jugador debe presionar de forma pausada las teclas para interacturar
        if (isAnimating){
          isAnimating = false;

          if (e.key === ' '){
            flagBomb = true;
            bombPosX = positionX;
            bombPosY = positionY;
          }

          // Esto se asegura que el ciclo del sprite sea correcto
          setCount((prevCount) => (prevCount < 0 ? prevCount + 1 : -2));

          // Esto se hace para redibujar el sprite en cada celda a la que se mueve
          currentCells[positionX][positionY] = <Cell row={positionX} column={positionY} />;
          prevAnimationX = positionX;
          positionX =
            e.key === 's'
            ? (positionX + 1)
            : e.key === 'w'
            ? (positionX - 1)
            : positionX;
          prevAnimationY = positionY;
          positionY =
            e.key === 'd'
            ? (positionY + 1)
            : e.key === 'a'
            ? (positionY - 1)
            : positionY;
          
          // Animacion del sprite
          animationY =
            e.key === 's'
              ? ySprite[0]
              : e.key === 'a'
              ? 45 + ySprite[0]
              : e.key === 'd'
              ? 90 + ySprite[0]
              : 135 + ySprite[0];
          animationX = 90 + 45 * count + xSprite[0];
          player = <Sprite spriteX={animationX} spriteY={animationY} />;

          // Esta condición previene que el jugador atraviese entidades del mapa
          if (entitys[positionX][positionY] === 1){
            positionX = prevAnimationX;
            positionY = prevAnimationY;
          }

          currentCells[positionX][positionY] = <Cell row={positionX} column={positionY} content={player} />;

          if (flagBomb && (bombPosX !== positionX || bombPosY !== positionY)){
            currentCells[bombPosX][bombPosY] = <Cell row={bombPosX} column={bombPosY} content={<Bomb />} />;
            flagBomb = false;
          }

          setCellsContent([...currentCells]); // Actualiza el estado de las celdas
        }
      }
    };

    const handleKeyUp = () => {
      isAnimating = true;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [count]);

  return (
    <div className="map">
      {cells.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="row">
          {row.map((cell, colIndex) => (
            <React.Fragment key={`cell-${rowIndex}-${colIndex}`}>{cell}</React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Game;