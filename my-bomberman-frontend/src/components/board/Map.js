import React from 'react';
import '../../styles/Map.css';
import Cell from './Cell';

function Map(){
  const rows = 15;
  const columns = 15;

    return(
    <div className="map">
        {Array.from({ length: rows }).map((_, rowIndex) => (
        <div id={rowIndex} className="row">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Cell identifier={colIndex} content={`Cell ${rowIndex}-${colIndex}`} />
          ))}
        </div>
      ))}
    </div>);
}

export default Map;