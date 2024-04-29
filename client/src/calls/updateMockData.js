import { mockShoppingLists } from './mockData';

// Mock function for updating data
export const updateMockData = async (id, data) => {
  try {
    const index = mockShoppingLists.findIndex((item) => item.id === id);
    if (index !== -1) {
      // Update the list with the new data
      mockShoppingLists[index] = { ...mockShoppingLists[index], ...data };
      return mockShoppingLists[index];
    } else {
      // If the list is not found, add it as a new list
      mockShoppingLists.push({ id, ...data });
      return mockShoppingLists[mockShoppingLists.length - 1];
    }
  } catch (error) {
    console.error('Failed to update data:', error);
    throw new Error('Failed to update data');
  }
};
