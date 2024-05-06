const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const ShoppingList = require('../../models/shoppingList'); // Import your ShoppingList model

module.exports = { request, app, mongoose, ShoppingList };


beforeAll(async () => {
  // Connect to the test database
  await mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Close the database connection after all tests have completed
  await mongoose.connection.close();
});

module.exports = mongoose; // Export Mongoose for use in your tests
