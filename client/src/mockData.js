// mockData.js

import { updateMockData } from './updateMockData'; // Import the updateMockData function

// Mock data
export const mockShoppingLists = [
  {
    id: 1,
    name: 'Food',
    owner: 'John',
    members: ['John', 'Alice', 'Bob'],
    items: [
      { id: 1, name: 'Apples', resolved: false },
      { id: 2, name: 'Bananas', resolved: true },
      { id: 3, name: 'Milk', resolved: false }
    ],
    archived: false
  },
  {
    id: 2,
    name: 'Book',
    owner: 'Alice',
    members: ['Alice', 'Bob', 'John'],
    items: [
      { id: 1, name: 'Harry Potter', resolved: true },
      { id: 2, name: 'Lord of the Rings', resolved: false }
    ],
    archived: false
  }
];

// Function to make GET request
export const getData = async () => {
  try {
    // Simulate API call delay with setTimeout
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockShoppingLists);
      }, 500); // Simulating 0.5 seconds delay
    });
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw new Error('Failed to fetch data');
  }
};

// Function to make POST request
export const postData = async (newList) => {
  try {
    // Mock function to add a shopping list
    const addShoppingList = (list) => {
      // Add your logic to add a new list
      // For mock purposes, just return the list with an ID
      const newListWithId = { ...list, id: mockShoppingLists.length + 1 };
      mockShoppingLists.push(newListWithId);
      return newListWithId;
    };

    // Simulate API call delay with setTimeout
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(addShoppingList(newList));
      }, 500); // Simulating 0.5 seconds delay
    });
  } catch (error) {
    console.error('Failed to add new shopping list:', error);
    throw new Error('Failed to add new shopping list');
  }
};

// Function for deleting data (deleting a list)
export const deleteData = async (listId) => {
  try {
    // Mock function to delete a shopping list
    const deleteShoppingList = (id) => {
      // Add your logic to delete the list
      // For mock purposes, just return a success message
      const index = mockShoppingLists.findIndex((item) => item.id === id);
      if (index !== -1) {
        mockShoppingLists.splice(index, 1);
        return { message: 'List deleted successfully' };
      } else {
        throw new Error('List not found');
      }
    };

    // Simulate API call delay with setTimeout
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(deleteShoppingList(listId));
      }, 500); // Simulating 0.5 seconds delay
    });
  } catch (error) {
    console.error('Failed to delete shopping list:', error);
    throw new Error('Failed to delete shopping list');
  }
};

// Function for updating data
export const updateData = async (id, data) => {
  try {
    // Call the updateMockData function to update the data
    const updatedData = await updateMockData(id, data);
    return updatedData;
  } catch (error) {
    console.error('Failed to update data:', error);
    throw new Error('Failed to update data');
  }
};
