//CSS
import './App.css'

//REACT IMPORTS
import { useCallback, useEffect, useState } from 'react'

//DATA
import { wordsList } from './data/word'

//COMPONENTS
import StartScreen from './components/StartScreen'
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id:1, name:'start'},
  {id:2, name:'game'},
  {id:3, name:'end'}
];

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = () => {

    // categoria aleatoria
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // palavra aleatoria dentro da categoria
    const word = words[category][Math.floor(Math.random() * words[category].length)];


    return {word,category}
  }

  // Iniciando game
  const startGame = () => {
    // Pegando palavra e categoria
    const {word, category} = pickWordAndCategory();

    // Pegando as letras da palavras
    let wordLetters = word.split("");
    // Tratando letras maiusculas
    wordLetters = wordLetters.map((i) => i.toLowerCase());

    console.log(word, category);
    console.log(wordLetters);

    // setando stados
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  };

  // processando letra do input
  const verifyLetter = (letter) => {
    console.log(letter);
  };

  // reinciando jogo
  const retry = () => {
    setGameStage(stages[0].name);
  };

  return (
    <>
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && (
        <Game 
        verifyLetter={verifyLetter} 
        pickedWord={pickedWord} 
        pickedCategory={pickedCategory} 
        letters={letters} 
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters} 
        guesses={guesses} 
        score={score}/>)}
      {gameStage === 'end' && <GameOver retry={retry} />}
    </>
  )
}

export default App
