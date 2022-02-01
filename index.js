const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

const loopQuestions = require("./questions.js");

const db = mysql.createConnection(
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

async function getTable(tableName) {
    return await new Promise(function(resolve, Reject){
        db.query("SELECT * FROM ??", tableName, (err, results) => {
            resolve(results);
        });
    });
}

async function questionLoop(database) {
    while (true) {
        const action = await inquirer.prompt(loopQuestions)
            .then(({ userChoice }) => {
                return userChoice;
            });
        let output = "";
        switch (action) {
            case "view all departments":
                output = await getTable('department');
                console.log("\ndepartments\n");
                console.table(output);
                break;
            case "view all roles":
                output = await getTable("role");
                console.log("\nroles\n");
                console.table(output);
                break;
            case "view all employees":
                output = await getTable("employee");
                console.log("\nemployees\n");
                console.table(output);
                break;
            case "end this program.":
                console.log("Ending program now.");
                return;
            default:
                console.log(action);
        };
    }
}

async function init() {
    questionLoop(db);
}

init();