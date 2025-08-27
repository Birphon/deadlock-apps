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
    <div>
      <div>
        <h2>
          Saved Entries ({items.length})
        </h2>
        
        <div>
          <DownloadButton statData={statData} />
          
          {hasItems && (
            <button
              onClick={onClearAll}
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      <div>
        {!hasItems ? (
          <div>
            <div>📋</div>
            <p>No entries yet</p>
            <p>Add some stats using the form on the left</p>
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