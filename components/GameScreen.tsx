import React from 'react';
import { Direction, VisitedCellData, Position } from '../types';
import Minimap from './Minimap';

interface GameScreenProps {
  isLoading: boolean;
  currentImage: string;
  stepCount: number;
  onMove: (direction: Direction) => void;
  onReset: () => void;
  visitedCells: Map<string, VisitedCellData>;
  currentPosition: Position;
  errorMessage: string | null;
  onTryAgain: () => void;
}

const LoadingOverlay: React.FC = () => (
    <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-20">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-teal-500"></div>
        <p className="mt-4 text-lg text-gray-300">AI đang kiến tạo thế giới của bạn...</p>
    </div>
);

const ErrorDisplay: React.FC<{ message: string; onTryAgain: () => void }> = ({ message, onTryAgain }) => (
    <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-20 p-4 text-center">
        <h3 className="text-2xl font-bold text-red-500 mb-4">Đã Xảy Ra Lỗi</h3>
        <p className="text-gray-300 mb-6">{message}</p>
        <button onClick={onTryAgain} className="px-6 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-white font-semibold transition-colors">
            Thử Lại
        </button>
    </div>
);


const GameScreen: React.FC<GameScreenProps> = ({
  isLoading, currentImage, stepCount, onMove, onReset, visitedCells, currentPosition, errorMessage, onTryAgain
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-4">
      <div className="flex-grow w-full lg:w-3/4 relative aspect-video bg-black border-2 border-gray-700 rounded-lg overflow-hidden shadow-2xl shadow-teal-900/20 group">
        {isLoading && <LoadingOverlay />}
        {errorMessage && <ErrorDisplay message={errorMessage} onTryAgain={onTryAgain} />}
        <img src={currentImage} alt="AI Generated Scene" className="w-full h-full object-cover" />

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-36 opacity-0 group-hover:opacity-80 focus-within:opacity-80 transition-opacity duration-300 z-10">
            <div className="grid grid-cols-3 grid-rows-3 gap-2">
                <div className="col-start-2 row-start-1">
                <button onClick={() => onMove('forward')} disabled={isLoading} className="w-full h-full py-3 bg-gray-900/80 text-white text-xl font-bold hover:bg-gray-700/80 disabled:bg-gray-900/50 disabled:text-gray-600 rounded-lg transition-colors">↑</button>
                </div>
                <div className="col-start-1 row-start-2">
                <button onClick={() => onMove('left')} disabled={isLoading} className="w-full h-full py-3 bg-gray-900/80 text-white text-xl font-bold hover:bg-gray-700/80 disabled:bg-gray-900/50 disabled:text-gray-600 rounded-lg transition-colors">←</button>
                </div>
                <div className="col-start-3 row-start-2">
                <button onClick={() => onMove('right')} disabled={isLoading} className="w-full h-full py-3 bg-gray-900/80 text-white text-xl font-bold hover:bg-gray-700/80 disabled:bg-gray-900/50 disabled:text-gray-600 rounded-lg transition-colors">→</button>
                </div>
                <div className="col-start-2 row-start-3">
                <button onClick={() => onMove('backward')} disabled={isLoading} className="w-full h-full py-3 bg-gray-900/80 text-white text-xl font-bold hover:bg-gray-700/80 disabled:bg-gray-900/50 disabled:text-gray-600 rounded-lg transition-colors">↓</button>
                </div>
            </div>
        </div>
      </div>

      <div className="w-full lg:w-1/4 flex flex-col gap-4">
        <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-teal-400">Trạng Thái</h3>
            <p className="text-gray-300">Số Cảnh Đã Tạo: <span className="font-bold text-white">{stepCount}</span></p>
        </div>

        <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-teal-400">Bản Đồ Mini</h3>
            <Minimap visitedCells={visitedCells} currentPosition={currentPosition} />
        </div>
        
        <button onClick={onReset} className="w-full py-2 bg-teal-800 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors">
            Bắt Đầu Trò Chơi Mới
        </button>
      </div>
    </div>
  );
};

export default GameScreen;