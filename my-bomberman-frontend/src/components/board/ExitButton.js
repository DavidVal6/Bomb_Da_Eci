import React from 'react';
import '../../styles/ExitButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function ExitButton(){
    const handleRedirect = () => {
        // Redirige a la URL especificada cuando se presiona el botón
        window.location.href = './';
    };
    return(
        <div className="exit-button-panel">
            <button onClick={handleRedirect} className="exit-button">
                <FontAwesomeIcon icon={faTimes} /> LEAVE MATCH</button>
        </div>
    );
}

export default ExitButton;