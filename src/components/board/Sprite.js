import React from 'react';
import '../../styles/Sprite.css';

function Sprite({ spriteX, spriteY }) {
  return (
    <div className="characterContainer">
      <div className="CharacterSprite" style={{ backgroundPosition: `-${spriteX}px -${spriteY}px` }} />
    </div>
  );
}

export default Sprite;