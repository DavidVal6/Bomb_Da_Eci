import React from 'react';
import '../../styles/playButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

function PlayButton(){
    const handleRedirect = () => {
        // Redirige a la URL especificada cuando se presiona el botón
        window.location.href = './game-board';
    };
    return(
        <div className="playButtonPanel">
            <button onClick={handleRedirect} className="playButton">
                <FontAwesomeIcon icon={faPlay} /> PLAY</button>
        </div>
    );
}

export default PlayButton;