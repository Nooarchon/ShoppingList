const request = require('supertest');
const app = require('../../app'); // Adjust the path based on the file structure

describe('POST /shoppingList/create', () => {
  test('Should create a new shopping list', async () => {
    const shoppingListData = {
      title: 'Test Shopping List',
      owner: 'testuser',
      members: ['member1', 'member2'],
      items: [
        { item: 'Milk', amount: 2 },
        { item: 'Bread', amount: 1 },
      ],
    };

    const response = await request(app)
      .post('/shoppingList/create')
      .send(shoppingListData)
      .expect(201);

    expect(response.body.result).toBe('Success!');
    expect(response.body.data).toMatchObject(shoppingListData);
  });

  test('Should return 400 if required fields are missing', async () => {
    const invalidShoppingListData = {}; // Missing required fields

    const response = await request(app)
      .post('/shoppingList/create')
      .send(invalidShoppingListData)
      .expect(400);

    expect(response.body.result).toBe('Unsuccess!');
    expect(response.body.message).toBeDefined();
  });
});