// src/apps/deadlock-item-parser/components/ItemInput.tsx

import React from 'react';

interface ItemInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  onParse: () => void;
  parseError: string;
}

const ItemInput: React.FC<ItemInputProps> = ({
  inputText,
  setInputText,
  onParse,
  parseError
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Paste Item Data</h2>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Paste your Deadlock item data here..."
        className="w-full h-64 p-3 border border-gray-300 rounded-md resize-none font-mono text-sm"
      />
      
      {parseError && (
        <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          {parseError}
        </div>
      )}
      
      <button
        onClick={onParse}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Parse Item
      </button>
    </div>
  );
};

export default ItemInput;