import PropTypes from "prop-types"; // Importa o PropTypes para validação de props
import "./GameOver.css";

const GameOver = ({ retry, score }) => {
  return (
    <div className="gameover">
      <h1>Fim de jogo!</h1>
      <h2>
        A sua pontuação foi: <span>{score}</span>
      </h2>
      <button onClick={retry}>Reiniciar</button>
    </div>
  );
};

// Definindo os tipos e requisitos das props com PropTypes
GameOver.propTypes = {
  retry: PropTypes.func.isRequired, // Função obrigatória
  score: PropTypes.number.isRequired, // Número obrigatório
};

export default GameOver;
