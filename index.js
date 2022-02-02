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

async function viewDepartments() {
    return await new Promise(function(resolve, Reject){
        db.query("SELECT * FROM department", (err, results) => {
            resolve(results);
        });
    });
}
async function viewRoles() {
    return await new Promise(function(resolve, Reject){
        db.query("SELECT role.id, role.title, role.salary, department.name AS department_name FROM role INNER JOIN department ON role.department_id = department.id ORDER BY role.id;", (err, results) => {
            resolve(results);
        });
    });
}
async function viewEmployees() {
    return await new Promise(function(resolve, Reject){
        db.query(`SELECT e.id, 
        e.first_name, 
        e.last_name, 
        ROLE.title AS role, 
        ROLE.salary AS salary, 
        department.name AS department,
        m.last_name AS Manager
        FROM employee e
        INNER JOIN ROLE ON e.role_id = ROLE.id 
        INNER JOIN department ON ROLE.department_id = department.id
        LEFT JOIN employee m ON e.manager_id  = m.id 
        ORDER BY e.id; `, (err, results) => {
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
                output = await viewDepartments();
                console.log("\ndepartments");
                console.table(output);
                break;
            case "view all roles":
                output = await viewRoles();
                console.log("\nroles");
                console.table(output);
                break;
            case "view all employees":
                output = await viewEmployees();
                console.log("\nemployees");
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