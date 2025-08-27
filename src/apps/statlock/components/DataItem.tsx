// components/DataItem.tsx

import React from 'react';
import type { StatItem } from '../types';

interface DataItemProps {
  item: StatItem;
  onClick: () => void;
}

const DataItem: React.FC<DataItemProps> = ({ item, onClick }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPreview = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div
      onClick={onClick}
      className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition-all duration-150 group"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
          {item.name}
        </h3>
        <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
          {formatDate(item.updatedAt)}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
        {getPreview(item.input)}
      </p>
      
      {item.input.length > 100 && (
        <div className="mt-2">
          <span className="text-xs text-blue-600 group-hover:text-blue-700">
            Click to view full content →
          </span>
        </div>
      )}
    </div>
  );
};

export default DataItem;