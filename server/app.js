
const express = require("express");
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();
const cors = require("cors");
const port = process.env.APP_PORT;
const shoppingListRouter = require("./controller/shopping-list-controller");
const morgan = require('morgan');

if (process.env.NODE_ENV === "DEVELOPMENT"){
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/shoppingList", shoppingListRouter);

const DB_CONN = process.env.DB_CONN.replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose.connect(DB_CONN).then(() => {
    console.log("Database successfully connected!");
});

app.get("/", (request, response) => {
    response.status(200).json({
        message: "Testing endpoint! [app.js]",
        method: request.method
    });
});

app.listen(port, () => {
    console.log(`Server is started on port ${port}!`);
});

module.exports = app;
