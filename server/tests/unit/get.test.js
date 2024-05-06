const request = require('supertest');
const app = require('../../app');
const ShoppingList = require('../../models/shopping-list'); // Import your ShoppingList model

// Mock ShoppingList model methods
jest.mock('../../models/shopping-list');

describe('GET /shoppingList/get/:id', () => {
  test('Should return a single shopping list', async () => {
    // Create a mock shopping list document
    const mockShoppingList = {
      _id: 'mock_id',
      title: 'Test Shopping List',
      owner: 'testuser',
      items: [{ item: 'Milk', amount: 2 }, { item: 'Bread', amount: 1 }]
    };

    // Mock the findOne method of the ShoppingList model
    ShoppingList.findOne.mockResolvedValueOnce(mockShoppingList);

    // Make a request to get the created shopping list
    const response = await request(app)
      .get(`/shoppingList/get/${mockShoppingList._id}`)
      .expect(200);

    // Assert that the response contains the correct data
    expect(response.body.result).toBe('Success!');
    expect(response.body.data).toMatchObject(mockShoppingList);
  });

  test('Should return 404 if shopping list not found', async () => {
    // Mock the findOne method of the ShoppingList model to return null
    ShoppingList.findOne.mockResolvedValueOnce(null);

    const invalidId = 'invalid_id';

    // Make a request to get a shopping list with an invalid ID
    const response = await request(app)
      .get(`/shoppingList/get/${invalidId}`)
      .expect(404);

    // Assert that the response indicates failure
    expect(response.body.result).toBe('Unsuccess!');
    expect(response.body.message).toBe('Shopping list was not found!');
  });
});
