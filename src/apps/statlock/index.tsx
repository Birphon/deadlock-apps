// index.tsx

import React, { useState } from 'react';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import { useStatData } from './hooks/useStatData';
import { StatItem } from './types';

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
      // Create new item
      addOrUpdateStat(crypto.randomUUID(), name, input);
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
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          StatLock - Deadlock Stats Manager
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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