import React, { useState } from 'react';
import '../../styles/playButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Cookie from 'js-cookie';

function PlayButton() {
  const [showInput, setShowInput] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [gameId, setGameId] = useState('');

  const createCookie = () => {
    //const existingCookie = Cookie.get('gameId');
    const game = Math.random().toString(36).substring(7);
    Cookie.set('gameId', game, { expires: 1 });
    const user = Math.random().toString(36).substring(7);
    Cookie.set('userId', user, { expires: 1 });
  };

  const setCookie = (event) => {
    const inputValue = event.target.value;
    setGameId(inputValue); // Actualiza el estado gameId con el valor ingresado
    Cookie.set('gameId', inputValue, { expires: 1 }); // Establece la cookie con el valor ingresado
    const user = Math.random().toString(36).substring(7);
    Cookie.set('userId', user, { expires: 1 });
  };
  

  const handleRedirect = () => {
    // Redirige a la URL especificada cuando se presiona el botón
    window.location.href = './game-board';
  };

  const toggleInput = () => {
    setShowInput(!showInput);
    setShowCreate(false);
  };

  const toggleCreate = () => {
    setShowCreate(!showCreate);
    setShowInput(false);
  };

  const joinToGame = () => {
    if (showInput) {
      return (
        <div className="input">
          <input placeholder="Enter Game ID" value={gameId} onChange={setCookie} />
          <button onClick={handleRedirect}>Join</button>
        </div>
      );
    }
  };

  const createGame = () => {
    createCookie();
    if (showCreate) {
      return (
        <div className="show">
          <p>This is your game id: {Cookie.get('gameId')}</p>
          <button onClick={handleRedirect}>Join</button>
        </div>
      );
    }
  };

  return (
    <div className="playButtonPanel">
      {showInput ? (
        joinToGame()
      ) : showCreate ? (
        createGame()
      ) : (
        <>
          <button onClick={toggleInput} className="playButton">
            <FontAwesomeIcon icon={faPlay} /> JOIN TO GAME
          </button>
          <button onClick={toggleCreate} className="playButton">
            <FontAwesomeIcon icon={faPlay} /> CREATE GAME
          </button>
        </>
      )}
    </div>
  );
}

export default PlayButton;
