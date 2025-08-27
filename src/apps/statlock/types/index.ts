// types/index.ts

export interface StatItem {
  id: string;
  name: string;
  input: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StatData {
  [key: string]: StatItem;
}

// Example data structure based on provided examples
export interface WeaponStats {
  damagePerSecond: number;
  bulletDamage: string;
  ammo: number;
  bulletsPerSec: number;
  reloadTime: string;
  bulletVelocity: string;
  lightMelee: string;
  heavyMelee: string;
  falloffRange: string;
}

export interface VitalityStats {
  health: string;
  healthRegen: number;
  moveSpeed: string;
  sprintSpeed: string;
  dashSpeed: string;
  stamina: number;
}

export interface AbilityUpgrade {
  description: string;
}

export interface Ability {
  name: string;
  description: string;
  cooldown?: string;
  duration?: string;
  damage?: number;
  radius?: string;
  spiritPowerScaling?: string;
  abilityPoint1?: AbilityUpgrade;
  abilityPoint2?: AbilityUpgrade;
  abilityPoint5?: AbilityUpgrade;
  [key: string]: any; // For flexible additional properties
}