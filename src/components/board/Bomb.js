import React, { useEffect, useState } from 'react';
import '../../styles/Bomb.css';

const sprite = [0, 45, 90, 135, 450];
const orderList = [0, 1, 2, 1, 2, 3, 4];

function Bomb() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
        if (animating){
            setCurrentIndex((prevIndex) => (prevIndex + 1));
            console.log(currentIndex);
            if (currentIndex === 5) {
              clearInterval(interval);
              setAnimating(false);
            }
        }
    }, 500); // Cambia la imagen cada 0,5 segundos

    return () => {
      clearInterval(interval);
    };
  }, [animating, currentIndex]);

  const currentSprite = sprite[orderList[currentIndex]];

  return (
    <div className="bomb-container">
      <div className="bomb" style={{ backgroundPosition: `-${currentSprite}px 0` }}></div>
    </div>
  );
}

export default Bomb;
