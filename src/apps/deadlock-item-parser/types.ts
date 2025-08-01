export interface ParsedItem {
  name: string;
  cost: number;
  tier: number;
  stats: string[];
  activeAbility?: {
    cooldown?: number;
    description: string;
    additionalInfo?: string;
    effects: string[];
  };
  passiveAbility?: {
    cooldown?: number;
    description: string;
    additionalInfo?: string;
    effects: string[];
  };
  upgradesFrom: string[];
  upgradesTo: string[];
  codename?: string;
}