import type { ParsedItem } from './types';

export const parseItemData = (text: string): ParsedItem | null => {
  try {
    const lines = text.trim().split('\n').map(line => line.trim()).filter(line => line);
    
    if (lines.length === 0) return null;

    const item: ParsedItem = {
      name: '',
      cost: 0,
      tier: 0,
      stats: [],
      upgradesFrom: [],
      upgradesTo: [],
    };

    let currentSection = 'basic';
    let abilityType: 'active' | 'passive' | null = null;
    let abilityEffects: string[] = [];
    let abilityDescription = '';
    let abilityAdditionalInfo = '';
    let abilityCooldown: number | undefined;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Parse name (first line)
      if (i === 0) {
        item.name = line;
        continue;
      }

      // Parse cost
      if (line.startsWith('Cost') && line.includes('Souls')) {
        const match = line.match(/Souls\s+([\d,]+)/);
        if (match) {
          item.cost = parseInt(match[1].replace(/,/g, ''));
        }
        continue;
      }

      // Parse tier
      if (line.startsWith('Tier')) {
        const match = line.match(/Tier\s+(\d+)/);
        if (match) {
          item.tier = parseInt(match[1]);
        }
        continue;
      }

      // Check for ability sections
      if (line.startsWith('Active')) {
        abilityType = 'active';
        const match = line.match(/Active\s+(\d+)s/);
        if (match) {
          abilityCooldown = parseInt(match[1]);
        }
        currentSection = 'ability';
        continue;
      }

      if (line.startsWith('Passive')) {
        abilityType = 'passive';
        const match = line.match(/Passive\s+(\d+)s/);
        if (match) {
          abilityCooldown = parseInt(match[1]);
        }
        currentSection = 'ability';
        continue;
      }

      // Check for upgrade sections
      if (line.startsWith('Upgrades From:')) {
        currentSection = 'upgradesFrom';
        continue;
      }

      if (line.startsWith('Upgrades To:')) {
        currentSection = 'upgradesTo';
        continue;
      }

      // Parse codename
      if (line.startsWith('Codename:')) {
        item.codename = line.replace('Codename:', '').trim();
        continue;
      }

      // Parse based on current section
      if (currentSection === 'basic') {
        // This is a stat line
        if (line.startsWith('+') || line.startsWith('-')) {
          item.stats.push(line);
        }
      } else if (currentSection === 'ability') {
        // Handle ability description and effects
        if (line.includes('Damage') || line.includes('Duration') || line.includes('Radius') || 
            line.includes('Threshold') || line.includes('Healing') || line.includes('Move Speed') ||
            line.includes('HP') || line.includes('Buff') || line.includes('m/s')) {
          abilityEffects.push(line);
        } else if (line.startsWith('Cannot') || line.startsWith('Deals half-damage')) {
          abilityAdditionalInfo = line;
        } else {
          if (abilityDescription) {
            abilityDescription += ' ' + line;
          } else {
            abilityDescription = line;
          }
        }
      } else if (currentSection === 'upgradesFrom') {
        if (!line.startsWith('Upgrades') && !line.startsWith('Codename')) {
          item.upgradesFrom.push(line);
        }
      } else if (currentSection === 'upgradesTo') {
        if (!line.startsWith('Upgrades') && !line.startsWith('Codename')) {
          item.upgradesTo.push(line);
        }
      }
    }

    // Add ability to item if it exists
    if (abilityType && abilityDescription) {
      const abilityData = {
        cooldown: abilityCooldown,
        description: abilityDescription,
        additionalInfo: abilityAdditionalInfo || undefined,
        effects: abilityEffects,
      };

      if (abilityType === 'active') {
        item.activeAbility = abilityData;
      } else {
        item.passiveAbility = abilityData;
      }
    }

    return item;
  } catch (error) {
    console.error('Parse error:', error);
    return null;
  }
};