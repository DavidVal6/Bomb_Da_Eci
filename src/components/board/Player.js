import '../../styles/Player.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Player({ identifier }){
    return(<div id={identifier} className="player">
        <FontAwesomeIcon icon={faUser} /> {identifier}</div>);
}

export default Player;