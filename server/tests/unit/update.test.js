const request = require('supertest');
const app = require('../../app'); // Adjust the path based on the file structure
const { request, app, mongoose, ShoppingList } = require('./testSetup');

describe('PATCH /shoppingList/update/:id', () => {
  test('Should update a shopping list', async () => {
    // First, create a shopping list to update
    const createResponse = await request(app)
      .post('/shoppingList/create')
      .send({
        title: 'Test Shopping List',
        owner: 'testuser',
        items: [{ item: 'Milk', amount: 2 }, { item: 'Bread', amount: 1 }]
      });

    // Extract the ID of the created shopping list
    const shoppingListId = createResponse.body.data._id;

    // Define the updated data
    const updatedData = {
      title: 'Updated Shopping List',
      owner: 'updated_user',
      items: [{ item: 'Cheese', amount: 3 }]
    };

    // Make a request to update the shopping list
    const updateResponse = await request(app)
      .patch(`/shoppingList/update/${shoppingListId}`)
      .send(updatedData)
      .expect(202);

    // Assert that the response indicates success and contains the updated data
    expect(updateResponse.body.result).toBe('Success!');
    expect(updateResponse.body.message).toBe('Shopping list was updated!');
    expect(updateResponse.body.data).toMatchObject(updatedData);
  });

  test('Should return 404 if shopping list not found', async () => {
    const invalidId = 'invalid_id';

    // Make a request to update a shopping list with an invalid ID
    const response = await request(app)
      .patch(`/shoppingList/update/${invalidId}`)
      .send({ /* updated shopping list data */ })
      .expect(404);

    // Assert that the response indicates failure
    expect(response.body.result).toBe('Unsuccess!');
    expect(response.body.message).toBe('Shopping list was not found!');
  });
});
