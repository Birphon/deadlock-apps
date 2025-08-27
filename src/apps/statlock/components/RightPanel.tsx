// components/RightPanel.tsx

import React from 'react';
import type { StatData, StatItem } from '../types';
import DataItem from './DataItem';
import DownloadButton from './DownloadButton';

interface RightPanelProps {
  statData: StatData;
  onSelectItem: (item: StatItem) => void;
  onClearAll: () => void;
}

const RightPanel: React.FC<RightPanelProps> = ({
  statData,
  onSelectItem,
  onClearAll,
}) => {
  const items = Object.values(statData);
  const hasItems = items.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Saved Entries ({items.length})
        </h2>
        
        <div className="flex gap-2">
          <DownloadButton statData={statData} />
          
          {hasItems && (
            <button
              onClick={onClearAll}
              className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {!hasItems ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-4">📋</div>
            <p className="text-lg mb-2">No entries yet</p>
            <p className="text-sm">Add some stats using the form on the left</p>
          </div>
        ) : (
          items
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((item) => (
              <DataItem
                key={item.id}
                item={item}
                onClick={() => onSelectItem(item)}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default RightPanel;