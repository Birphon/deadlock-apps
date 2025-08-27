// components/DownloadButton.tsx

import React from 'react';
import type { StatData } from '../types';
import { downloadJSON } from '../utils/jsonDownload';

interface DownloadButtonProps {
  statData: StatData;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ statData }) => {
  const items = Object.values(statData);
  const hasItems = items.length > 0;

  const handleDownload = () => {
    if (!hasItems) return;
    
    const filename = `deadlock-stats-${new Date().toISOString().split('T')[0]}.json`;
    downloadJSON(statData, filename);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={!hasItems}
      title={hasItems ? 'Download all entries as JSON' : 'No entries to download'}
    >
      <svg 
        width="16"
        height="16"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
        />
      </svg>
      Download
    </button>
  );
};

export default DownloadButton;