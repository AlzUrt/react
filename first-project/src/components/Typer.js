import React, { useState, useEffect } from 'react';

function Typer() {
  const loremIpsumText = "Lorem ipsum";

  const [userInput, setUserInput] = useState('');
  const [timerRunning, setTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [textsMatch, setTextsMatch] = useState(false); // Ajout de l'état de correspondance

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setUserInput(inputText);

    if (!timerRunning) {
      setTimerRunning(true);
      setStartTime(Date.now());
    }
  };

  useEffect(() => {
    if (timerRunning) {
      const intervalId = setInterval(() => {
        const currentTime = Date.now();
        setElapsedTime(currentTime - startTime);
      }, 100);

      return () => clearInterval(intervalId);
    }
  }, [timerRunning, startTime]);

  useEffect(() => {
    if (userInput === loremIpsumText) {
      setTimerRunning(false);
      setTextsMatch(true); // Définir l'état de correspondance à true lorsque les textes sont identiques
    } else {
      setTextsMatch(false); // Définir l'état de correspondance à false lorsque les textes sont différents
    }
  }, [userInput]);

  // Ajoutez une classe CSS conditionnelle en fonction de l'état de correspondance
  const timerClassName = textsMatch ? 'typer-timer-finished' : 'typer-timer';

  return (
    <div className="typer">
      <div className="typer-column">
        <p>{loremIpsumText}</p>
      </div>
      <div className="typer-column">
        <textarea
          value={userInput}
          onChange={handleInputChange}
          placeholder="Commencez à taper ici..."
        />
        <p className={timerClassName}>Temps écoulé : {Math.floor(elapsedTime / 1000)} secondes</p>
      </div>
    </div>
  );
}

export default Typer;
