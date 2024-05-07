const request = require('supertest');
const app = require('../../app'); // Adjust the path based on your file structure

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

describe('GET /shoppingList/get/:id', () => {
  test('Should return a single shopping list', async () => {
    // Mock data for a shopping list
    const mockShoppingList = {
      _id: 'mock_id',
      title: 'Test Shopping List',
      owner: 'testuser',
      items: [{ item: 'Milk', amount: 2 }, { item: 'Bread', amount: 1 }]
    };

    // Mock the findOne method of the ShoppingList model
    jest.mock('../../models/shopping-list');
    const ShoppingList = require('../../models/shopping-list');
    ShoppingList.findById.mockResolvedValueOnce(mockShoppingList);

    // Make a request to get the created shopping list
    const response = await request(app)
      .get('/shoppingList/get/mock_id')
      .expect(200);

    // Assert that the response contains the correct data
    expect(response.body.result).toBe('Success!');
    expect(response.body.data).toMatchObject(mockShoppingList);
  });

  test('Should return 404 if shopping list not found', async () => {
    // Mock the findOne method of the ShoppingList model to return null
    jest.mock('../../models/shopping-list');
    const ShoppingList = require('../../models/shopping-list');
    ShoppingList.findById.mockResolvedValueOnce(null);

    // Make a request to get a shopping list with an invalid ID
    const response = await request(app)
      .get('/shoppingList/get/invalid_id')
      .expect(404);

    // Assert that the response indicates failure
    expect(response.body.result).toBe('Unsuccess!');
    expect(response.body.message).toBe('Shopping list was not found!');
  });
});

describe('GET /shoppingList/list', () => {
  test('Should return a list of shopping lists', async () => {
    // Make a request to get the list of shopping lists
    const response = await request(app)
      .get('/shoppingList/list')
      .expect(200);

    // Assert that the response contains the correct data
    expect(response.body.result).toBe('Success!');
    expect(response.body.data).toHaveLength(2); // Assuming there are 2 created shopping lists
  });
});

describe('PATCH /shoppingList/update/:id', () => {
  test('Should update a shopping list', async () => {
    // Mock data for a shopping list
    const shoppingListId = 'mock_id';
    const updatedData = {
      title: 'Updated Shopping List',
      owner: 'updated_user',
      items: [{ item: 'Cheese', amount: 3 }]
    };

    // Mock the findByIdAndUpdate method of the ShoppingList model
    jest.mock('../../models/shopping-list');
    const ShoppingList = require('../../models/shopping-list');
    ShoppingList.findByIdAndUpdate.mockResolvedValueOnce(updatedData);

    // Make a request to update the shopping list
    const response = await request(app)
      .patch(`/shoppingList/update/${shoppingListId}`)
      .send(updatedData)
      .expect(202);

    // Assert that the response indicates success and contains the updated data
    expect(response.body.result).toBe('Success!');
    expect(response.body.message).toBe('Shopping list was updated!');
    expect(response.body.data).toMatchObject(updatedData);
  });

  test('Should return 404 if shopping list not found', async () => {
    // Mock the findById method of the ShoppingList model to return null
    jest.mock('../../models/shopping-list');
    const ShoppingList = require('../../models/shopping-list');
    ShoppingList.findById.mockResolvedValueOnce(null);

    // Make a request to update a shopping list with an invalid ID
    const response = await request(app)
      .patch('/shoppingList/update/invalid_id')
      .send({ /* updated shopping list data */ })
      .expect(404);

    // Assert that the response indicates failure
    expect(response.body.result).toBe('Unsuccess!');
    expect(response.body.message).toBe('Shopping list was not found!');
  });
});

describe('DELETE /shoppingList/delete/:id', () => {
  test('Should delete a shopping list', async () => {
    // Mock data for a shopping list
    const shoppingListId = 'mock_id';

    // Mock the findByIdAndDelete method of the ShoppingList model
    jest.mock('../../models/shopping-list');
    const ShoppingList = require('../../models/shopping-list');
    ShoppingList.findByIdAndDelete.mockResolvedValueOnce({});

    // Make a request to delete the shopping list
    const response = await request(app)
      .delete(`/shoppingList/delete/${shoppingListId}`)
      .expect(201);

    // Assert that the response indicates success
    expect(response.body.result).toBe('Success!');
    expect(response.body.message).toBe('Shopping list has been deleted!');
  });

  test('Should return 404 if shopping list not found', async () => {
    // Mock the findByIdAndDelete method of the ShoppingList model to return null
    jest.mock('../../models/shopping-list');
    const ShoppingList = require('../../models/shopping-list');
    ShoppingList.findByIdAndDelete.mockResolvedValueOnce(null);

    // Make a request to delete a shopping list with an invalid ID
    const response = await request(app)
      .delete('/shoppingList/delete/invalid_id')
      .expect(404);

    // Assert that the response indicates failure
    expect(response.body.result).toBe('Unsuccess!');
    expect(response.body.message).toBe('Asked shopping list was not found!');
  });
});
