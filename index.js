const inquirer = require("inquirer");
const cTable = require("console.table");

const loopQuestions = require("./questions.js");
const employeeDB = require("./db/dbFunctions.js");
const connection = require("./db/connection.js");

async function questionLoop() {
    while (true) {
        const action = await inquirer.prompt(loopQuestions)
            .then(({ userChoice }) => {
                return userChoice;
            });
        let output = "";
        switch (action) {
            case "view all departments":
                output = await employeeDB.viewDepartments(connection);
                console.log("\ndepartments");
                console.table(output);
                break;
            case "view all roles":
                output = await employeeDB.viewRoles(connection);
                console.log("\nroles");
                console.table(output);
                break;
            case "view all employees":
                output = await employeeDB.viewEmployees(connection);
                console.log("\nemployees");
                console.table(output);
                break;
            case "add a department":
                output = await employeeDB.addDepartment(connection);
                console.log(`Congrats! a new department named ${output} has be added!`);
                break;
            case "add a role":
                output = await employeeDB.addRole(connection);
                console.log(`Congrats! a new role named ${output} has be added!`);
                break;
            case "add an employee":
                output = await employeeDB.addEmployee(connection);
                console.log(`Congrats! a new Employee is named ${output} has be added!`);
                break;
            case "end this program.":
                console.log("Ending program now.");
                process.exit();
            default:
                console.log(action);
        };
    }
}

async function init() {
    questionLoop();
}

init();