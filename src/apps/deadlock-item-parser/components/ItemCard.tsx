// src/apps/deadlock-item-parser/components/ItemCard.tsx

import { Trash2 } from 'lucide-react';
import React from 'react';
import type { ParsedItem } from '../types';

interface ItemCardProps {
  item: ParsedItem;
  onRemove: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onRemove }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-900">{item.name}</h3>
        <button
          onClick={onRemove}
          className="text-red-600 hover:text-red-800 p-1"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="text-sm text-gray-600 space-y-1">
        <p><strong>Cost:</strong> {item.cost.toLocaleString()} souls</p>
        <p><strong>Tier:</strong> {item.tier}</p>
        
        {item.stats.length > 0 && (
          <div>
            <strong>Stats:</strong>
            <ul className="list-disc list-inside ml-2">
              {item.stats.map((stat, i) => <li key={i}>{stat}</li>)}
            </ul>
          </div>
        )}
        
        {item.activeAbility && (
          <div>
            <strong>Active Ability:</strong> {item.activeAbility.cooldown}s cooldown
          </div>
        )}
        
        {item.passiveAbility && (
          <div>
            <strong>Passive Ability:</strong> {item.passiveAbility.cooldown ? `${item.passiveAbility.cooldown}s cooldown` : 'Always active'}
          </div>
        )}
        
        {item.upgradesFrom.length > 0 && (
          <p><strong>Upgrades From:</strong> {item.upgradesFrom.join(', ')}</p>
        )}
        
        {item.upgradesTo.length > 0 && (
          <p><strong>Upgrades To:</strong> {item.upgradesTo.join(', ')}</p>
        )}

        {item.codename && (
          <p><strong>Codename:</strong> {item.codename}</p>
        )}
      </div>
    </div>
  );
};

export default ItemCard;