const request = require('supertest');
const app = require('../../app');
const ShoppingList = require('../../models/shoppingList'); // Import your ShoppingList model

describe('GET /shoppingList/get/:id', () => {
  test('Should return a single shopping list', async () => {
    // First, create a shopping list to retrieve
    const createResponse = await request(app)
      .post('/shoppingList/create')
      .send({
        title: 'Test Shopping List',
        owner: 'testuser',
        items: [{ item: 'Milk', amount: 2 }, { item: 'Bread', amount: 1 }]
      });

    // Extract the ID of the created shopping list
    const shoppingListId = createResponse.body.data._id;

    // Now, make a request to get the created shopping list
    const getResponse = await request(app)
      .get(`/shoppingList/get/${shoppingListId}`)
      .expect(200);

    // Assert that the response contains the correct data
    expect(getResponse.body.result).toBe('Success!');
    expect(getResponse.body.data).toMatchObject({
      title: 'Test Shopping List',
      owner: 'testuser',
      items: [{ item: 'Milk', amount: 2 }, { item: 'Bread', amount: 1 }]
    });
  });

  test('Should return 404 if shopping list not found', async () => {
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
