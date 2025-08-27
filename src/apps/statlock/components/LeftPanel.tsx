// components/LeftPanel.tsx

import React, { useEffect, useState } from 'react';
import type { StatItem } from '../types';

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
    <div>
      <h2>
        {isEditing ? 'Edit Entry' : 'Add New Entry'}
      </h2>
      
      <div>
        <div>
          <label htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name (e.g., Character, Ability 1, etc.)"
          />
        </div>

        <div>
          <label htmlFor="input">
            Input
          </label>
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your stats here..."
            rows={12}
          />
        </div>

        <div>
          <button
            onClick={handleSave}
            disabled={!name.trim() || !input.trim()}
          >
            {isEditing ? 'Update' : 'Add'}
          </button>
          
          <button
            onClick={handleClear}
          >
            Clear
          </button>
          
          {isEditing && (
            <button
              onClick={onDelete}
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