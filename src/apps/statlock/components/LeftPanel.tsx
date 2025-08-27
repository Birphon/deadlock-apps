// components/LeftPanel.tsx

import React, { useEffect, useState } from 'react';
import { StatItem } from '../types';

interface LeftPanelProps {
  selectedItem: StatItem | null;
  onSave: (name: string, input: string) => void;
  onDelete: () => void;
  onClear: () => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({
  selectedItem,
  onSave,
  onDelete,
  onClear,
}) => {
  const [name, setName] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    if (selectedItem) {
      setName(selectedItem.name);
      setInput(selectedItem.input);
    }
  }, [selectedItem]);

  const handleSave = () => {
    if (name.trim() && input.trim()) {
      onSave(name.trim(), input.trim());
      if (!selectedItem) {
        // Clear form only if creating new item
        setName('');
        setInput('');
      }
    }
  };

  const handleClear = () => {
    setName('');
    setInput('');
    onClear();
  };

  const isEditing = selectedItem !== null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {isEditing ? 'Edit Entry' : 'Add New Entry'}
      </h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name (e.g., Character, Ability 1, etc.)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
            Input
          </label>
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your stats here..."
            rows={12}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleSave}
            disabled={!name.trim() || !input.trim()}
            className="flex-1 min-w-[120px] px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isEditing ? 'Update' : 'Add'}
          </button>
          
          <button
            onClick={handleClear}
            className="flex-1 min-w-[120px] px-4 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700 transition-colors"
          >
            Clear
          </button>
          
          {isEditing && (
            <button
              onClick={onDelete}
              className="flex-1 min-w-[120px] px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;