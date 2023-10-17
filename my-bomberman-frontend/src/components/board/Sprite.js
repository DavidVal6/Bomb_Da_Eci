import React, { useEffect, useState } from 'react';
import '../../styles/Sprite.css';

function Sprite({ spriteX, spriteY }){
    const [spritePosition, setSpritePosition] = useState({ x : spriteX, y : spriteY });
    const [position, setPosition] = useState({ x : 0, y : 0 });
    let count = -1;
    let animationX = 0;
    let animationY = 0;
    let moveX = 0;
    let moveY = 0;

    const handleKeyDown = (e) => {
        // Animacion del sprite
        // Detecta las flechas en el teclado para realizar la animación de movimiento
        animationY = e.key === 'ArrowDown' ? spriteY : e.key === 'ArrowLeft' ? 96 + spriteY : e.key === 'ArrowRight' ? 192 + spriteY : 288 + spriteY;
        animationX = 192 + 96*count + spriteX;
        // Esto se asegura que el ciclo del sprite sea correcto
        count = count < 0 ? count + 1 : -2;
        // Se asigna la nueva imagen
        setSpritePosition((prevPos) => ({ ...prevPos, y: animationY, x: animationX}));

        // Movimiento del sprite
        // Detecta las flechas en el teclado para mover el personaje a traves de la pantalla
        moveY = e.key === 'ArrowDown' ? 32 : e.key === 'ArrowUp' ? -32 : 0;
        moveX = e.key === 'ArrowLeft' ? -32 : e.key === 'ArrowRight' ? 32 : 0;
        // Se asigna la nueva posición al sprite en pantalla
        setPosition((prevPos) => ({ ...prevPos, y: prevPos.y + moveY, x: prevPos.x + moveX}));
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return(
        <div className="characterContainer" style={{ left: position.x, top: position.y }}>
            <div className="CharacterSprite" style={{ backgroundPosition: `-${spritePosition.x}px -${spritePosition.y}px`,  }} />
        </div>
    );
}

export default Sprite;