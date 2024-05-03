const request = require('supertest');
const app = require('../../app'); // Adjust the path based on the file structure
const { request, app, mongoose, ShoppingList } = require('./testSetup');

describe('DELETE /shoppingList/delete/:id', () => {
  test('Should delete a shopping list', async () => {
    const shoppingList = await ShoppingList.create({ /* shopping list data */ });

    const response = await request(app)
      .delete(`/shoppingList/delete/${shoppingList._id}`)
      .expect(201);

    expect(response.body.result).toBe('Success!');
    expect(response.body.message).toBe('Shopping list has been deleted!');
  });

  test('Should return 404 if shopping list not found', async () => {
    const invalidId = 'invalid_id';
    const response = await request(app)
      .delete(`/shoppingList/delete/${invalidId}`)
      .expect(404);

    expect(response.body.result).toBe('Unsuccess!');
    expect(response.body.message).toBe('Asked shopping list was not found!');
  });
});
