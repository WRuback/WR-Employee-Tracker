const mysql = require("mysql2");

// Creates the connection to the database.
const connection = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'RootRoot1234.',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

// Checks to see if it works.
connection.connect(function (err) {
    if (err) throw err;
});

// Exports to be used in the index.
module.exports = connection;
