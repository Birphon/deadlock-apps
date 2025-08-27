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
    <div onClick={onClick}>
      <div>
        <h3>
          {item.name}
        </h3>
        <span>
          {formatDate(item.updatedAt)}
        </span>
      </div>
      
      <p>
        {getPreview(item.input)}
      </p>
      
      {item.input.length > 100 && (
        <div>
          <span>
            Click to view full content →
          </span>
        </div>
      )}
    </div>
  );
};

export default DataItem;