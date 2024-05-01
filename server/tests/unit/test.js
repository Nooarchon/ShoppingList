const request = require('supertest');
const app = require('../../app'); 
const mongoose = require('mongoose');
const ShoppingList = require('../../models/shopping-list');
const { app: testApp, mongoose: testMongoose, ShoppingList: testShoppingList } = require('./testSetup');


beforeAll(async () => {
  // Connect to a test database
  await testMongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  // Clear the database after each test
  await testShoppingList.deleteMany({});
});

afterAll(async () => {
  // Close the database connection after all tests are done
  await testMongoose.connection.close();
});

// POST /shoppingList/create test cases
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
    const invalidShoppingListData = {};

    const response = await request(app)
      .post('/shoppingList/create')
      .send(invalidShoppingListData)
      .expect(400);

    expect(response.body.result).toBe('Unsuccess!');
    expect(response.body.message).toBeDefined();
  });
});

// GET /shoppingList/get/:id test cases
describe('GET /shoppingList/get/:id', () => {
  test('Should return a single shopping list', async () => {
    // Add logic to create a shopping list in the test database
    const shoppingList = await testShoppingList.create({ /* shopping list data */ });

    const response = await request(app)
      .get(`/shoppingList/get/${shoppingList._id}`)
      .expect(200);

    // Add assertions to verify the response body
    expect(response.body.result).toBe('Success!');
    expect(response.body.data).toEqual(expect.objectContaining({
      /* expected shopping list data */
    }));
  });

  test('Should return 404 if shopping list not found', async () => {
    const invalidId = 'invalid_id';

    const response = await request(app)
      .get(`/shoppingList/get/${invalidId}`)
      .expect(404);

    // Add assertions to verify the response body
    expect(response.body.result).toBe('Unsuccess!');
    expect(response.body.message).toBe('Shopping list was not found!');
  });
});

// GET /shoppingList/list test cases
describe('GET /shoppingList/list', () => {
  test('Should return a list of shopping lists', async () => {
    // Add logic to create multiple shopping lists in the test database
    const shoppingLists = await testShoppingList.createMany([{ /* shopping list data */ }, { /* another shopping list data */ }]);

    const response = await request(app)
      .get('/shoppingList/list')
      .expect(200);

    // Add assertions to verify the response body
    expect(response.body.result).toBe('Success!');
    expect(response.body.data).toHaveLength(shoppingLists.length);
  });
});
// DELETE /shoppingList/delete/:id test cases
describe('DELETE /shoppingList/delete/:id', () => {
  test('Should delete a shopping list', async () => {
    // Create a shopping list to delete
    const shoppingList = await testShoppingList.create({ /* shopping list data */ });

    // Send DELETE request to delete the shopping list
    const response = await request(app)
      .delete(`/shoppingList/delete/${shoppingList._id}`)
      .expect(201);

    // Verify response
    expect(response.body.result).toBe('Success!');
    expect(response.body.message).toBe('Shopping list has been deleted!');
  });

  test('Should return 404 if shopping list not found', async () => {
    // Send DELETE request with invalid ID
    const invalidId = 'invalid_id';
    const response = await request(app)
      .delete(`/shoppingList/delete/${invalidId}`)
      .expect(404);

    // Verify response
    expect(response.body.result).toBe('Unsuccess!');
    expect(response.body.message).toBe('Asked shopping list was not found!');
  });
});

// PATCH /shoppingList/update/:id test cases
describe('PATCH /shoppingList/update/:id', () => {
  test('Should update a shopping list', async () => {
    // Create a shopping list to update
    const shoppingList = await testShoppingList.create({ /* shopping list data */ });

    // Updated data
    const updatedData = { /* updated shopping list data */ };

    // Send PATCH request to update the shopping list
    const response = await request(app)
      .patch(`/shoppingList/update/${shoppingList._id}`)
      .send(updatedData)
      .expect(202);

    // Verify response
    expect(response.body.result).toBe('Success!');
    expect(response.body.message).toBe('Shopping list was updated!');
    expect(response.body.data).toEqual(expect.objectContaining(updatedData));
  });

  test('Should return 404 if shopping list not found', async () => {
    // Send PATCH request with invalid ID
    const invalidId = 'invalid_id';
    const response = await request(app)
      .patch(`/shoppingList/update/${invalidId}`)
      .send({ /* updated shopping list data */ })
      .expect(404);

    // Verify response
    expect(response.body.result).toBe('Unsuccess!');
    expect(response.body.message).toBe('Shopping list was not found!');
  });

  test('Should return 400 if update data is invalid', async () => {
    // Create a shopping list
    const shoppingList = await testShoppingList.create({ /* shopping list data */ });

    // Invalid update data
    const invalidData = { /* invalid shopping list data */ };

    // Send PATCH request with invalid update data
    const response = await request(app)
      .patch(`/shoppingList/update/${shoppingList._id}`)
      .send(invalidData)
      .expect(400);

    // Verify response
    expect(response.body.result).toBe('Unsuccess!');
    expect(response.body.message).toBeDefined();
  });
});
