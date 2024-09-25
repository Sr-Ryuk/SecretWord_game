import { useState, useRef } from 'react';
import './Game.css';
import PropTypes from 'prop-types';

const Game = ({verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score}) => {

  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
      e.preventDefault();

      verifyLetter(letter);

      setLetter("");

      letterInputRef.current.focus();
    }


  return (

    <div className='game'>
      <h3>{pickedWord}</h3>
        <p className="points">
          <span>Pontuação: {score}</span>
        </p>
        <h1>Adivinhe a palavra:</h1>
        <h3 className='tip'>
          Dica sobre a palavra: <span>{pickedCategory}</span>
        </h3>
        <p>Você ainda tem {guesses} tentativas.</p>
        <div className="wordContainer">
          {letters.map((letter, i) => (
                guessedLetters.includes(guessedLetters) ? (
                  <span key={i} className="letter">{letter}</span>
                ): (
                  <span key={i} className="blankSquare"></span>
                )
          ))}
 
        </div>
        <div className="letterContainer">
          <p>Tente adivinha uma letra da palavras</p>
          <form onSubmit={handleSubmit}>
            <input type="text" name="letter" maxLength="1" required onChange={(e) => setLetter(e.target.value)} value={letter} ref={letterInputRef}/>
            <button>Jogar!</button>
          </form>
        </div>
        <div className="wrongLettersContainer">
          <p>Letras ja utilizadas</p>
            {wrongLetters.map((letter, i) => (
              <span key={i}>{letter}</span>
            ))}
        </div>
    </div>
  );
};

Game.propTypes = {
  verifyLetter: PropTypes.func.isRequired,
  pickedWord: PropTypes.func.isRequired,
  pickedCategory: PropTypes.func.isRequired,
  letters: PropTypes.func.isRequired,
  guessedLetters: PropTypes.func.isRequired,
  wrongLetters: PropTypes.func.isRequired,
  guesses: PropTypes.func.isRequired,
  score: PropTypes.func.isRequired, // exemplo para uma prop do tipo função
};

export default Game;