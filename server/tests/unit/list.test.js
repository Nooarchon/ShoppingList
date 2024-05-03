const request = require('supertest');
const app = require('../../app'); // Adjust the path based on the file structure

describe('GET /shoppingList/list', () => {
  test('Should return a list of shopping lists', async () => {
    // First, create multiple shopping lists for testing
    await request(app)
      .post('/shoppingList/create')
      .send({
        title: 'Shopping List 1',
        owner: 'user1',
        items: [{ item: 'Item 1', amount: 1 }]
      });

    await request(app)
      .post('/shoppingList/create')
      .send({
        title: 'Shopping List 2',
        owner: 'user2',
        items: [{ item: 'Item 2', amount: 2 }]
      });

    // Make a request to get the list of shopping lists
    const response = await request(app)
      .get('/shoppingList/list')
      .expect(200);

    // Assert that the response contains the correct data
    expect(response.body.result).toBe('Success!');
    expect(response.body.data).toHaveLength(2); // Assuming there are 2 created shopping lists
  });
});
