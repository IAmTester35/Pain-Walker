import React from 'react';
import { MINIMAP_SIZE } from '../constants';
import { Position, VisitedCellData } from '../types';

interface MinimapProps {
  visitedCells: Map<string, VisitedCellData>;
  currentPosition: Position;
}

const Minimap: React.FC<MinimapProps> = ({ visitedCells, currentPosition }) => {
  const mapCenterOffset = Math.floor(MINIMAP_SIZE / 2);
  const startX = currentPosition.x - mapCenterOffset;
  const startY = currentPosition.y - mapCenterOffset;

  const cells = Array.from({ length: MINIMAP_SIZE * MINIMAP_SIZE }).map((_, index) => {
    const gridX = index % MINIMAP_SIZE;
    const gridY = Math.floor(index / MINIMAP_SIZE);
    
    const worldX = startX + gridX;
    const worldY = startY + gridY;
    
    const posStr = `${worldX},${worldY}`;
    const isCurrentPos = worldX === currentPosition.x && worldY === currentPosition.y;
    const isVisited = visitedCells.has(posStr);

    let cellClass = 'w-full h-full bg-gray-900';
    if (isVisited) {
      cellClass = 'w-full h-full bg-gray-600';
    }
    if (isCurrentPos) {
      cellClass = 'w-full h-full bg-teal-500 animate-pulse';
    }

    return (
      <div key={posStr} className="aspect-square">
        <div className={cellClass}></div>
      </div>
    );
  });

  return (
    <div 
        className="grid bg-black p-1 gap-0.5"
        style={{ gridTemplateColumns: `repeat(${MINIMAP_SIZE}, minmax(0, 1fr))` }}
    >
      {cells}
    </div>
  );
};

export default Minimap;