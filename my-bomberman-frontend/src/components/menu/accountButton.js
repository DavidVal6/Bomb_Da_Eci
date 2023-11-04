import { faChartBar, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import '../../styles/accountButton.css';


function AccountButton() {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleButton = () => {
    setMenuVisible(!menuVisible);
    };

    return (
        <div className="accountButton">
        <button className="aButton"onClick={toggleButton}></button>
        {menuVisible && (
            <ul className="menu">
                <li>
                    <button className="menuButton">
                        <FontAwesomeIcon icon={faCog} /> Account</button>
                </li>
                <li>
                    <button className="menuButton">
                        <FontAwesomeIcon icon={faChartBar} /> Stats</button>
                </li>
                <li>
                    <button className="menuButton">
                        <FontAwesomeIcon icon={faSignOutAlt} /> Logout</button>
                </li>
            </ul>
        )}
        </div>
    );
}

export default AccountButton;