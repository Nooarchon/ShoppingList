const mongoose = require('mongoose');

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
