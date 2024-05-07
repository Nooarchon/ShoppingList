const app = require("./app");
const mongoose = require('mongoose');

const port = process.env.APP_PORT;

// Connect to the database
const DB_CONN = process.env.DB_CONN.replace("<PASSWORD>", process.env.DB_PASSWORD);
mongoose.connect(DB_CONN).then(() => {
    console.log("Database successfully connected!");
}).catch(err => {
    console.error("Error connecting to database:", err);
    process.exit(1); // Exit the process if unable to connect to the database
});

// Start the server
app.listen(port, () => {
    console.log(`Server is started on port ${port}!`);
});
