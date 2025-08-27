// utils/validation.ts

export const validateName = (name: string): { isValid: boolean; error?: string } => {
  const trimmedName = name.trim();
  
  if (!trimmedName) {
    return { isValid: false, error: 'Name is required' };
  }
  
  if (trimmedName.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long' };
  }
  
  if (trimmedName.length > 100) {
    return { isValid: false, error: 'Name must be less than 100 characters' };
  }
  
  // Check for potentially problematic characters
  const invalidChars = /[<>:"\/\\|?*\x00-\x1f]/;
  if (invalidChars.test(trimmedName)) {
    return { isValid: false, error: 'Name contains invalid characters' };
  }
  
  return { isValid: true };
};

export const validateInput = (input: string): { isValid: boolean; error?: string } => {
  const trimmedInput = input.trim();
  
  if (!trimmedInput) {
    return { isValid: false, error: 'Input data is required' };
  }
  
  if (trimmedInput.length < 10) {
    return { isValid: false, error: 'Input data seems too short (minimum 10 characters)' };
  }
  
  if (trimmedInput.length > 50000) {
    return { isValid: false, error: 'Input data is too long (maximum 50,000 characters)' };
  }
  
  return { isValid: true };
};

export const sanitizeInput = (input: string): string => {
  // Trim whitespace
  let sanitized = input.trim();
  
  // Normalize line endings
  sanitized = sanitized.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  
  // Remove excessive empty lines (more than 3 consecutive)
  sanitized = sanitized.replace(/\n{4,}/g, '\n\n\n');
  
  // Remove leading/trailing empty lines
  sanitized = sanitized.replace(/^\n+|\n+$/g, '');
  
  return sanitized;
};

export const isValidJSON = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

export const formatStatText = (input: string): string => {
  // Basic formatting for stat text
  let formatted = sanitizeInput(input);
  
  // Ensure proper spacing around colons and stats
  formatted = formatted.replace(/:\s*/g, ': ');
  formatted = formatted.replace(/\s+/g, ' ');
  
  return formatted;
};