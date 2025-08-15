import React, { useState, useEffect, useCallback } from 'react';
import { GameState, Age, Style, GameSettings, Position, Direction, VisitedCellData } from './types';
import { generateImage } from './services/geminiService';
import SetupScreen from './components/SetupScreen';
import GameScreen from './components/GameScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Setup);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Game state
  const [settings, setSettings] = useState<GameSettings>({ age: Age.Adult, style: Style.Realistic, terrain: '' });
  const [currentPosition, setCurrentPosition] = useState<Position>({ x: 0, y: 0 });
  const [visitedCells, setVisitedCells] = useState<Map<string, VisitedCellData>>(new Map());
  const [currentCell, setCurrentCell] = useState<VisitedCellData | null>(null);

  const posToString = (pos: Position) => `${pos.x},${pos.y}`;

  useEffect(() => {
    try {
      const savedData = localStorage.getItem('painWalkerSave');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setSettings(parsed.settings);
        setCurrentPosition(parsed.currentPosition);
        const newVisitedCells = new Map<string, VisitedCellData>(parsed.visitedCells);
        setVisitedCells(newVisitedCells);
        setCurrentCell(newVisitedCells.get(posToString(parsed.currentPosition)) ?? null);
        setGameState(GameState.Playing);
      }
    } catch (error) {
      console.error("Failed to load saved game:", error);
      localStorage.removeItem('painWalkerSave');
    }
  }, []);
  
  const saveGame = useCallback(() => {
      if (visitedCells.size === 0) return;
      try {
        const dataToSave = {
          settings,
          currentPosition,
          visitedCells: Array.from(visitedCells.entries()),
        };
        localStorage.setItem('painWalkerSave', JSON.stringify(dataToSave));
      } catch (error) {
        console.error("Failed to save game:", error);
      }
  }, [settings, currentPosition, visitedCells]);

  useEffect(() => {
    window.addEventListener('beforeunload', saveGame);
    return () => {
        window.removeEventListener('beforeunload', saveGame);
    };
  }, [saveGame]);

  const generateAndSetImage = async (prompt: string, position: Position) => {
    try {
      setErrorMessage(null);
      setGameState(GameState.Loading);
      const imageBase64 = await generateImage(prompt);
      const newCellData = { imageBase64, prompt };
      
      setVisitedCells(prev => new Map(prev).set(posToString(position), newCellData));
      setCurrentPosition(position);
      setCurrentCell(newCellData);
      
      setGameState(GameState.Playing);
      return newCellData;
    } catch (error) {
      console.error("Error during image generation:", error);
      const message = error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định.";
      setErrorMessage(`Không thể tạo cảnh tiếp theo. ${message}`);
      setGameState(GameState.Error);
      return null;
    }
  };

  const handleStartGame = async (newSettings: GameSettings) => {
    setSettings(newSettings);
    const initialPosition = { x: 0, y: 0 };
    const prompt = `A first-person view image in the art style of ${newSettings.style}. The scene is: ${newSettings.terrain}. The atmosphere is appropriate for ${newSettings.age}.`;
    
    const cellData = await generateAndSetImage(prompt, initialPosition);
    if(cellData){
        setVisitedCells(new Map([[posToString(initialPosition), cellData]]));
    }
  };
  
  const translateDirection = (dir: Direction): string => {
    return dir;
  }

  const handleMove = async (direction: Direction) => {
    if (gameState === GameState.Loading) return;

    let { x, y } = currentPosition;
    switch (direction) {
      case 'forward': y -= 1; break;
      case 'backward': y += 1; break;
      case 'left': x -= 1; break;
      case 'right': x += 1; break;
    }
    const newPosition = { x, y };
    const newPosStr = posToString(newPosition);

    if (visitedCells.has(newPosStr)) {
      setCurrentPosition(newPosition);
      setCurrentCell(visitedCells.get(newPosStr)!);
    } else {
      const prevPrompt = currentCell?.prompt ?? `a scene of ${settings.terrain}`;
      const translatedDirection = translateDirection(direction);
      const prompt = `Continuing from the previous scene described as "${prevPrompt}", now move ${translatedDirection}. Maintain the art style of ${settings.style} appropriate for ${settings.age}. Create a seamless and logical scene from a first-person perspective based on this movement.`;
      await generateAndSetImage(prompt, newPosition);
    }
  };

  const handleReset = () => {
    localStorage.removeItem('painWalkerSave');
    setGameState(GameState.Setup);
    setErrorMessage(null);
    setSettings({ age: Age.Adult, style: Style.Realistic, terrain: '' });
    setCurrentPosition({ x: 0, y: 0 });
    setVisitedCells(new Map());
    setCurrentCell(null);
  };
  
  const handleTryAgain = () => {
    if (currentCell) {
       const prompt = currentCell.prompt;
       generateAndSetImage(prompt, currentPosition);
    }
  };


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4 font-mono">
      <h1 className="text-4xl font-bold text-teal-400 tracking-wider mb-4 shadow-lg">HÀNH TRÌNH KỲ ẢO</h1>
      {gameState === GameState.Setup && <SetupScreen onStart={handleStartGame} />}
      {(gameState === GameState.Playing || gameState === GameState.Loading || gameState === GameState.Error) && currentCell && (
        <GameScreen
          isLoading={gameState === GameState.Loading}
          currentImage={`data:image/jpeg;base64,${currentCell.imageBase64}`}
          stepCount={visitedCells.size}
          onMove={handleMove}
          onReset={handleReset}
          visitedCells={visitedCells}
          currentPosition={currentPosition}
          errorMessage={errorMessage}
          onTryAgain={handleTryAgain}
        />
      )}
    </div>
  );
};

export default App;