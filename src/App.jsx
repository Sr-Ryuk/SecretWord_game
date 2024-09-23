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

  console.log(words);

  return (
    <>
      {gameStage === 'start' && <StartScreen/>}
      {gameStage === 'game' && <Game/>}
      {gameStage === 'end' && <GameOver/>}
    </>
  )
}

export default App
