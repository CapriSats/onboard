
// Mock API utility functions and types

// Generic error handling for API calls
export const handleApiError = (error: unknown): never => {
  console.error('API Error:', error);
  throw new Error(typeof error === 'string' ? error : 'An unexpected error occurred');
};

// Simulate network delay for more realistic API behavior
export const simulateNetworkDelay = (minMs = 300, maxMs = 1200): Promise<void> => {
  const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Mock API response wrapper
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Helper for creating successful API responses
export const createSuccessResponse = <T>(data: T): ApiResponse<T> => ({
  data,
  status: 200,
  message: 'Success'
});

// Define the Prerequisite interface to include the checked property
export interface Prerequisite {
  id: string;
  label: string;
  description?: string;
  required: boolean;
  checked: boolean; // Add the checked property
}
