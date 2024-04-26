// updateMockData.js

import { mockShoppingLists } from './mockData';

// Mock function for updating data
export const updateMockData = async (id, data) => {
  try {
    const index = mockShoppingLists.findIndex((item) => item.id === id);
    if (index !== -1) {
      mockShoppingLists[index] = data; // Update the list with the new data
      return data;
    } else {
      throw new Error('List not found'); // Throw an error if the list is not found
    }
  } catch (error) {
    console.error('Failed to update data:', error);
    throw new Error('Failed to update data');
  }
};
