// utils/jsonDownload.ts

import type { StatData } from '../types';

export const downloadJSON = (data: StatData, filename: string): void => {
  try {
    // Create a formatted JSON string with proper indentation
    const jsonString = JSON.stringify(data, null, 2);
    
    // Create a Blob with the JSON data
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    // Create a temporary URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor element and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    URL.revokeObjectURL(url);
    
    console.log(`Downloaded ${filename} successfully`);
  } catch (error) {
    console.error('Error downloading JSON file:', error);
    alert('Failed to download file. Please try again.');
  }
};

export const downloadFormattedJSON = (data: StatData, filename: string): void => {
  try {
    // Create a more user-friendly format for export
    const formattedData = {
      exportInfo: {
        application: 'StatLock - Deadlock Stats Manager',
        exportedAt: new Date().toISOString(),
        totalEntries: Object.keys(data).length,
      },
      entries: Object.values(data).map(item => ({
        name: item.name,
        data: item.input,
        metadata: {
          id: item.id,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }
      }))
    };
    
    const jsonString = JSON.stringify(formattedData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    console.log(`Downloaded formatted ${filename} successfully`);
  } catch (error) {
    console.error('Error downloading formatted JSON file:', error);
    alert('Failed to download file. Please try again.');
  }
};