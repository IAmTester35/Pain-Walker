import React, { useState } from 'react';
import { Age, Style, GameSettings } from '../types';
import { AGE_OPTIONS, STYLE_OPTIONS, RANDOM_TERRAINS } from '../constants';

interface SetupScreenProps {
  onStart: (settings: GameSettings) => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStart }) => {
  const [age, setAge] = useState<Age>(Age.Adult);
  const [style, setStyle] = useState<Style>(Style.Realistic);
  const [terrain, setTerrain] = useState<string>('');

  const handleRandomTerrain = () => {
    const randomTerrain = RANDOM_TERRAINS[Math.floor(Math.random() * RANDOM_TERRAINS.length)];
    setTerrain(randomTerrain);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (terrain.trim()) {
      onStart({ age, style, terrain });
    }
  };

  return (
    <div className="w-full max-w-lg p-8 bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold mb-6 text-center text-teal-400">Kiến Tạo Thế Giới Của Bạn</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-300">Lứa Tuổi</label>
          <select id="age" value={age} onChange={(e) => setAge(e.target.value as Age)} className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-teal-500 focus:border-teal-500">
            {AGE_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="style" className="block mb-2 text-sm font-medium text-gray-300">Phong Cách Hình Ảnh</label>
          <select id="style" value={style} onChange={(e) => setStyle(e.target.value as Style)} className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-teal-500 focus:border-teal-500">
            {STYLE_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="terrain" className="block mb-2 text-sm font-medium text-gray-300">Địa Hình Khởi Đầu</label>
          <div className="flex space-x-2">
            <textarea id="terrain" value={terrain} onChange={(e) => setTerrain(e.target.value)} placeholder="ví dụ: một khu rừng tre" required rows={3} className="flex-grow p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-teal-500 focus:border-teal-500 resize-y" />
            <button type="button" onClick={handleRandomTerrain} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white font-semibold transition-colors self-start">Ngẫu Nhiên</button>
          </div>
        </div>
        <button type="submit" disabled={!terrain.trim()} className="w-full py-3 px-5 text-white font-bold bg-teal-600 rounded-lg hover:bg-teal-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-4 focus:ring-teal-800">
          Bắt Đầu
        </button>
      </form>
    </div>
  );
};

export default SetupScreen;