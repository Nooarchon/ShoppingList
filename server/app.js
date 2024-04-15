
const express = require("express");	// Express JS package declaration

let app = express(); // Declaration of a new Express JS application/server

const mongoose = require('mongoose'); // Import Mongoose library methods and syntax

require("dotenv").config(); // .env configuration file

const cors = require("cors"); // Declaration of cors

const port = process.env.APP_PORT;

const shoppingListRouter = require("./controller/shopping-list-controller"); // Router declaration

const morgan = require('morgan'); // Import the Morgan package for logging calls to the console  

/******************************************************************************************************/

if (process.env.NODE_ENV === "DEVELOPMENT"){
    app.use(morgan('dev')); // Morgan middleware declaration for console call log
}

app.use(express.json()); // Middleware declaration for using the body converter from request to JSON

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/shoppingList", shoppingListRouter);

/******************************************************************************************************/

const DB_CONN = process.env.DB_CONN.replace("<PASSWORD>", process.env.DB_PASSWORD); // Entering a password

// Database connection
mongoose.connect(DB_CONN).then(() => {
    //console.log(con.connection);
    console.log("Database successfully connected!");
}); // Database connection via the Mongoose library

/*********************************************************************************/

app.get("/", (request, response) => {
    response.status(200).json({
        message: "Testing endpoint! [app.js]",
        method: request.method
    });
})

/******************************************************************************************/

// Specifying the port where I will start the server
app.listen(port, () => {
    console.log(`Server is started on port ${port}!`);
})

/******************************************************************************************/

