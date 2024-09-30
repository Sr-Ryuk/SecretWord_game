import { useCallback, useEffect, useState } from "react";

// components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

// styles
import "./App.css";


// API
import API_URL from "./components/config";

// Função para buscar os dados da API e transformá-los no formato desejado
async function getWordsList() {
  try {
    const response = await fetch(API_URL); // Substitua pela URL da sua MockAPI
    const data = await response.json();

    // Converte o JSON recebido para o formato desejado
    const wordsList = data.reduce((acc, item) => {
      acc[item.category] = item.words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      });
      return acc;
    }, {});

    return wordsList;
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
  }
}

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words, setWords] = useState(null); // Inicialmente null para indicar que os dados ainda não foram carregados
  
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  // Busca os dados da API quando o componente é montado
  useEffect(() => {
    const fetchWords = async () => {
      const wordData = await getWordsList();
      setWords(wordData);
    };

    fetchWords();
  }, []);

  // Função para escolher uma palavra e categoria aleatória
  const pickWordAndCategory = useCallback(() => {
    if (!words) return; // Se `words` for null, não faz nada

    const categories = Object.keys(words);
    if (categories.length === 0) return; // Verificação adicional para garantir que as categorias existam

    const category =
      categories[Math.floor(Math.random() * categories.length)];

    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { category, word };
  }, [words]);

  // Iniciar o jogo
  const startGame = useCallback(() => {
    if (!words) return; // Garante que o jogo só inicie se as palavras estiverem disponíveis

    clearLettersStates();

    // Escolher uma palavra e categoria
    const result = pickWordAndCategory();
    if (!result) return; // Caso não haja palavra disponível, encerra a função

    const { category, word } = result;

    let wordLetters = word.split("").map((l) => l.toLowerCase());

    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory, words]);

  // Verificar se a letra está correta
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    // Verifica se a letra já foi usada
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // Adiciona letra acertada ou decrementa uma chance
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  // Reiniciar o jogo
  const retry = () => {
    setScore(0);
    setGuesses(3);
    setGameStage(stages[0].name);
  };

  // Limpar estados de letras
  const clearLettersStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  // Verifica se o jogo acabou
  useEffect(() => {
    if (guesses === 0) {
      clearLettersStates();
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // Verifica condição de vitória
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    if (guessedLetters.length === uniqueLetters.length && letters.length > 0) {
      setScore((actualScore) => actualScore + 100);

      // Inicia um novo jogo
      startGame();
    }
  }, [guessedLetters, letters, startGame]);

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && words && ( // Certifica-se de que `words` tenha sido carregado
        <Game
          verifyLetter={verifyLetter}
          pickedCategory={pickedCategory}
          pickedWord={pickedWord}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
