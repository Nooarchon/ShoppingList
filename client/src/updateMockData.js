// updateMockData.js
import { mockShoppingLists } from './mockData';

// Function to update shopping list properties
export const updateMockData = async (id, data) => {
  try {
    // Find the index of the shopping list in the mock data array
    const index = mockShoppingLists.findIndex(list => list.id === id);

    // If the list is found, update its properties
    if (index !== -1) {
      // Update shopping list properties based on the data provided
      const updatedList = { ...mockShoppingLists[index], ...data };

      // Update shopping list properties
      mockShoppingLists[index] = updatedList;
      
      return updatedList;
    } else {
      throw new Error('List not found');
    }
  } catch (error) {
    console.error('Failed to update data:', error);
    throw new Error('Failed to update data');
  }
};


