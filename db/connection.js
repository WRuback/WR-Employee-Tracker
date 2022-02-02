const mysql = require("mysql2");

// async function connection() {
//     return await new Promise(function (resolve, Reject) {
//         const output = mysql.createConnection(
//             {
//                 host: 'localhost',
//                 // MySQL username,
//                 user: 'root',
//                 // MySQL password
//                 password: 'RootRoot1234.',
//                 database: 'employees_db'
//             },
//             console.log(`Connected to the employees_db database.`)
//         );

//         output.connect(function (err) {
//             if (err) throw err;
//             console.log("Connected!");
//         });
//         resolve(output);
//     });
// };

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

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = connection;
