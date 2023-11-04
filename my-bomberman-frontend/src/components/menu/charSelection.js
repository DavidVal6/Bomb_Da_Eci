import '../../styles/charSelection.css';
import red from '../../assets/models/red.png';
import blond from '../../assets/models/blond.png';
import green from '../../assets/models/green.png';
import swat from '../../assets/models/swat.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function CharSelection(){
    const [index, setIndex] = useState(0);
    const characters = [
        red,
        blond,
        green,
        swat
      ];

    const changeCharacter = (direction) => {
        if (direction === 'left') {
            setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : characters.length - 1));
        } else if (direction === 'right') {
            setIndex((prevIndex) => (prevIndex < characters.length - 1 ? prevIndex + 1 : 0));
        }
    };

    return (
    <div className="CharacterSelection">
        <button className="leftButton" onClick={() => changeCharacter('left')}>
            <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        <div className="charImage" style={{ background: `url(${characters[index]}) no-repeat center/80% 80%`}}></div>

        <button className="rightButton" onClick={() => changeCharacter('right')}>
            <FontAwesomeIcon icon={faArrowRight} />
        </button>
    </div>
    );
}

export default CharSelection;
