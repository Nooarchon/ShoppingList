const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const ShoppingList = require('../../models/shopping-list');

beforeAll(async () => {
  // Connect to a test database
  await mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  // Clear the database after each test
  await ShoppingList.deleteMany({});
});

afterAll(async () => {
  // Close the database connection after all tests are done
  await mongoose.connection.close();
});

module.exports = { request, app, mongoose, ShoppingList };
