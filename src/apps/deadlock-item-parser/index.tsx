// src/apps/deadlock-item-parser/index.tsx

import React, { useState } from 'react';
import ItemInput from './components/ItemInput.tsx';
import ItemList from './components/ItemList.tsx';
import { parseItemData } from './parseUtils';
import type { ParsedItem } from './types';

const DeadlockItemParser: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [parsedItems, setParsedItems] = useState<ParsedItem[]>([]);
  const [parseError, setParseError] = useState('');

  const handleParse = () => {
    setParseError('');
    
    if (!inputText.trim()) {
      setParseError('Please enter item data to parse');
      return;
    }

    const parsed = parseItemData(inputText);
    
    if (!parsed) {
      setParseError('Failed to parse item data. Please check the format.');
      return;
    }

    // Check if item already exists
    if (parsedItems.some(item => item.name === parsed.name)) {
      setParseError(`Item "${parsed.name}" already exists in the list`);
      return;
    }

    setParsedItems(prev => [...prev, parsed]);
    setInputText(''); // Clear input after successful parse
  };

  const removeItem = (index: number) => {
    setParsedItems(prev => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setParsedItems([]);
  };

  const exportAsJSON = () => {
    const dataStr = JSON.stringify(parsedItems, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'deadlock-items.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(parsedItems, null, 2));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Deadlock Item Parser</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ItemInput
            inputText={inputText}
            setInputText={setInputText}
            onParse={handleParse}
            parseError={parseError}
          />

          <ItemList
            items={parsedItems}
            onRemoveItem={removeItem}
            onClearAll={clearAll}
            onExportJSON={exportAsJSON}
            onCopyToClipboard={copyToClipboard}
          />
        </div>
      </div>
    </div>
  );
};

export default DeadlockItemParser;