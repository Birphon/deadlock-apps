// hooks/useStatData.tsx

import { useCallback, useState } from 'react';
import type { StatData, StatItem } from '../types';
import { useLocalStorage } from './useLocalStorage';

const STORAGE_KEY = 'deadlock-statlock-data';

export const useStatData = () => {
  const [storedData, setStoredData] = useLocalStorage<StatData>(STORAGE_KEY, {});
  const [statData, setStatData] = useState<StatData>(storedData);

  const addOrUpdateStat = useCallback((id: string, name: string, input: string) => {
    const now = new Date();
    const existingItem = statData[id];
    
    const newItem: StatItem = {
      id,
      name,
      input,
      createdAt: existingItem?.createdAt || now,
      updatedAt: now,
    };

    const updatedData = {
      ...statData,
      [id]: newItem,
    };

    setStatData(updatedData);
    setStoredData(updatedData);
  }, [statData, setStoredData]);

  const deleteStat = useCallback((id: string) => {
    const { [id]: deleted, ...remainingData } = statData;
    setStatData(remainingData);
    setStoredData(remainingData);
  }, [statData, setStoredData]);

  const clearAllStats = useCallback(() => {
    const emptyData = {};
    setStatData(emptyData);
    setStoredData(emptyData);
  }, [setStoredData]);

  const getStatById = useCallback((id: string): StatItem | undefined => {
    return statData[id];
  }, [statData]);

  const getAllStats = useCallback((): StatItem[] => {
    return Object.values(statData);
  }, [statData]);

  return {
    statData,
    addOrUpdateStat,
    deleteStat,
    clearAllStats,
    getStatById,
    getAllStats,
  };
};