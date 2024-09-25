import { useState, useRef } from "react";
import PropTypes from "prop-types"; // Importa o PropTypes para validação de props

// styles
import "./Game.css";

const Game = ({
  verifyLetter,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (letter.match(/[a-z]/i)) { // Verifica se a letra é válida
      verifyLetter(letter);
      setLetter("");
    }

    letterInputRef.current.focus();
  };

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação</span>: {score}
      </p>
      <h1>Advinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativa(s).</p>
      <div className="wordContainer">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span className="letter" key={i}>
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            onChange={(e) => setLetter(e.target.value)}
            required
            value={letter}
            ref={letterInputRef}
          />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}, </span>
        ))}
      </div>
    </div>
  );
};

// Definindo os tipos e requisitos das props com PropTypes
Game.propTypes = {
  verifyLetter: PropTypes.func.isRequired, // Função obrigatória
  pickedCategory: PropTypes.string.isRequired, // String obrigatória
  pickedWord: PropTypes.string.isRequired, // String obrigatória
  letters: PropTypes.arrayOf(PropTypes.string).isRequired, // Array de strings obrigatório
  guessedLetters: PropTypes.arrayOf(PropTypes.string).isRequired, // Array de strings obrigatório
  wrongLetters: PropTypes.arrayOf(PropTypes.string).isRequired, // Array de strings obrigatório
  guesses: PropTypes.number.isRequired, // Número obrigatório
  score: PropTypes.number.isRequired, // Número obrigatório
};

export default Game;
