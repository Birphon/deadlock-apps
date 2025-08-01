// src/apps/deadlock-item-parser/components/ItemList.tsx

import { Copy, Download } from 'lucide-react';
import React from 'react';
import type { ParsedItem } from '../types';
import ItemCard from './ItemCard';

interface ItemListProps {
  items: ParsedItem[];
  onRemoveItem: (index: number) => void;
  onClearAll: () => void;
  onExportJSON: () => void;
  onCopyToClipboard: () => void;
}

const ItemList: React.FC<ItemListProps> = ({
  items,
  onRemoveItem,
  onClearAll,
  onExportJSON,
  onCopyToClipboard
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Parsed Items ({items.length})</h2>
        <div className="flex gap-2">
          <button
            onClick={onCopyToClipboard}
            className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
            disabled={items.length === 0}
          >
            <Copy size={16} />
            Copy JSON
          </button>
          <button
            onClick={onExportJSON}
            className="flex items-center gap-1 bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors"
            disabled={items.length === 0}
          >
            <Download size={16} />
            Export
          </button>
          <button
            onClick={onClearAll}
            className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
            disabled={items.length === 0}
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto space-y-3">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No items parsed yet</p>
        ) : (
          items.map((item, index) => (
            <ItemCard
              key={index}
              item={item}
              onRemove={() => onRemoveItem(index)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ItemList;