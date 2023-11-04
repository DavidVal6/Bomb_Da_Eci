import React, { useEffect, useState } from 'react';
import '../../styles/Map.css';
import Cell from './Cell';
import Sprite from './Sprite';
import Bushes from "../../assets/images/Arbusto.png";
import Tombstones from "../../assets/images/Lapida.png";
import Street from "../../assets/images/Carretera.png";

var poblated = false;
let isAnimating = true;
let currentCells = [];
let positionX = 1;
let positionY = 1;
let prevAnimationX = 1;
let prevAnimationY = 1;
let xSprite = [0, 165, 165, 495];
let ySprite = [0, 0, 220, 0];
let rowDucks = [4, 5, 6];
let columnDucks = [6, 7, 8];
var player = <Sprite spriteX={xSprite[1]} spriteY={ySprite[1]} />;

function Map() {
  const [cells, setCellsContent] = useState([]);
  const [count, setCount] = useState(-1);
  useEffect(() => {
    let animationX = 0;
    let animationY = 0;
    // Si el tablero ya esta poblado, no se vuelven a generar las celdas si no que se trabaja sobre las ya existentes
    if (!poblated){
      // Mapeo y asignacion de celdas
      let content = null;
      for (let i = 0; i < 15; i++) {
        currentCells[i] = [];
        for (let j = 0; j < 11; j++) {
          content = 
          i === 1 && j === 1 ? player :
          rowDucks.includes(j) && columnDucks.includes(i) ? <div className={`duck-${j}-${i}`}/> :
          j === 10 ? <img src={Street} className="mapImages" alt="street"/> :
          i === 14 ? <img src={Tombstones} className="mapImages" alt="tombstones"/> :
          i === 0 || j === 0 ? <img src={Bushes} className="mapImages" alt="bushes"/> :
          null;
          
          currentCells[i][j] = <Cell row={i} column={j} content={content} />;
        }
      }
      setCellsContent([...currentCells]);
      poblated = true;
    }

    // Esta función se utiliza para escuchar las teclas y actualizar la posicion y animacion
    const handleKeyDown = (e) => {
      // Con este if el jugador debe presionar de forma pausada las teclas para moverse
      if (isAnimating) {
        isAnimating = false;
        // Esto se asegura que el ciclo del sprite sea correcto
        setCount((prevCount) => (prevCount < 0 ? prevCount + 1 : -2));

        // Esto se hace para redibujar el sprite en cada celda a la que se mueve
        currentCells[positionX][positionY] = <Cell row={positionX} column={positionY} />;
        prevAnimationY = positionY;
        positionY =
          e.key === 'ArrowDown'
          ? (positionY < 9 ? positionY + 1 : positionY)
          : e.key === 'ArrowUp'
          ? (positionY > 1 ? positionY - 1 : positionY)
          : positionY;
        prevAnimationX = positionX;
        positionX =
          e.key === 'ArrowRight'
          ? (positionX < 13  ? positionX + 1 : positionX)
          : e.key === 'ArrowLeft'
          ? (positionX > 1  ? positionX - 1 : positionX)
          : positionX;
        
        // Animacion del sprite
        animationY =
          e.key === 'ArrowDown'
            ? ySprite[1]
            : e.key === 'ArrowLeft'
            ? 55 + ySprite[1]
            : e.key === 'ArrowRight'
            ? 110 + ySprite[1]
            : 165 + ySprite[1];
        animationX = 110 + 55 * count + xSprite[1];
        player = <Sprite spriteX={animationX} spriteY={animationY} />;

        // Esta condición previene que el jugador atraviese el estanque de patos
        if (rowDucks.includes(positionY) && columnDucks.includes(positionX)){
          positionX = prevAnimationX;
          positionY = prevAnimationY;
        }
          currentCells[positionX][positionY] = <Cell row={positionX} column={positionY} content={player} />;
        setCellsContent([...currentCells]); // Actualiza el estado de las celdas
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

export default Map;