import { useState } from "react";

const Player = ({ InitialName, symbol, isActive, onChangeName }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [playerName, setPlayerName] = useState(InitialName);
  //for editing button
  const handleEditClick = () => {
    setIsEdit((editing) => !editing);
    if (isEdit) {
      onChangeName(symbol, playerName);
    }
  };

  // changing player name
  const hanleChange = (event) => {
    setPlayerName(event.target.value);
  };

  return (
    <>
      <li className={isActive ? "active" : undefined}>
        <span className="player">
          {!isEdit ? (
            <span className="player-name">{playerName}</span>
          ) : (
            <input
              type="text"
              required
              value={playerName}
              onChange={hanleChange}
            />
          )}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{isEdit ? "Save" : "Edit"}</button>
      </li>
    </>
  );
};

export default Player;
