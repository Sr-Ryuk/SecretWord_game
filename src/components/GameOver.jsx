import './GameOver.css';
import PropTypes from 'prop-types';


const GameOver = ({ retry }) => {
  return (
    <div>
      <h2>Game Over</h2>
      <button onClick={retry} >Resetar jogo</button>
    </div>
  );
};

GameOver.propTypes = {
  retry: PropTypes.func.isRequired, // exemplo para uma prop do tipo função
};

export default GameOver;