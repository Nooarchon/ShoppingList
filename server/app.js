const express = require("express");
const mongoose = require('mongoose');
require("dotenv").config();
const cors = require("cors");
const port = process.env.APP_PORT || 3001; // Define a default port if not provided in .env
const shoppingListRouter = require("./controller/shopping-list-controller");
const morgan = require('morgan');

const app = express();

// Enable CORS
app.use(cors());

// Enable logging in development mode
if (process.env.NODE_ENV === "DEVELOPMENT") {
    app.use(morgan('dev'));
}

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use("/api/shoppingList", shoppingListRouter);

// Connect to the database
const DB_CONN = process.env.DB_CONN.replace("<PASSWORD>", process.env.DB_PASSWORD);
mongoose.connect(DB_CONN, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database successfully connected!");
    })
    .catch((err) => {
        console.error("Database connection error:", err.message);
    });

// Default route for testing
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is running!",
        method: req.method
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
