import {
  getData as getMockData,
  postData as postMockData,
  deleteData as deleteMockData,
  updateData as updateMockData,
} from './mockData';

// Function to make GET request
export const getData = async (url) => {
  try {
    // Call your mock data function for getting data
    const data = await getMockData();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error.message);
    throw new Error('Failed to fetch data');
  }
};

// Function to make POST request
export const postData = async (url, data) => {
  try {
    // Call your mock data function for posting data
    const response = await postMockData(data);
    return response;
  } catch (error) {
    console.error('Failed to post data:', error);
    throw new Error('Failed to post data');
  }
};

// Function to make DELETE request
export const deleteData = async (url, id) => {
  try {
    // Call your mock data function for deleting data
    const response = await deleteMockData(id);
    return response;
  } catch (error) {
    console.error('Failed to delete data:', error);
    throw new Error('Failed to delete data');
  }
};

// Function to make PUT request
export const updateData = async (url, id, data) => {
  try {
    // Call your mock data function for updating data
    const response = await updateMockData(id, data);
    return response;
  } catch (error) {
    console.error('Failed to update data:', error);
    throw new Error('Failed to update data');
  }
};
