// index.tsx

import React, { useState } from 'react';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import { useStatData } from './hooks/useStatData';
import type { StatItem } from './types';

const StatLock: React.FC = () => {
  const { 
    statData, 
    addOrUpdateStat, 
    deleteStat, 
    clearAllStats 
  } = useStatData();
  
  const [selectedItem, setSelectedItem] = useState<StatItem | null>(null);

  const handleSelectItem = (item: StatItem) => {
    setSelectedItem(item);
  };

  const handleSave = (name: string, input: string) => {
    if (selectedItem) {
      // Update existing item
      addOrUpdateStat(selectedItem.id, name, input);
    } else {
      // Create new item - use crypto.randomUUID() if available, fallback to timestamp + random
      const id = typeof crypto !== 'undefined' && crypto.randomUUID 
        ? crypto.randomUUID() 
        : `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      addOrUpdateStat(id, name, input);
    }
    setSelectedItem(null);
  };

  const handleDelete = () => {
    if (selectedItem) {
      deleteStat(selectedItem.id);
      setSelectedItem(null);
    }
  };

  const handleClear = () => {
    setSelectedItem(null);
  };

  return (
    <div>
      <div>
        <h1>
          StatLock - Deadlock Stats Manager
        </h1>
        
        <div>
          <LeftPanel
            selectedItem={selectedItem}
            onSave={handleSave}
            onDelete={handleDelete}
            onClear={handleClear}
          />
          
          <RightPanel
            statData={statData}
            onSelectItem={handleSelectItem}
            onClearAll={clearAllStats}
          />
        </div>
      </div>
    </div>
  );
};

export default StatLock;