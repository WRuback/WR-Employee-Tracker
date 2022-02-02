const inquirer = require("inquirer");
class Database {

    async viewDepartments(connection) {
        return await new Promise(function (resolve, Reject) {
            connection.query("SELECT * FROM department", (err, results) => {
                resolve(results);
            });
        });
    }
    async viewRoles(connection) {
        return await new Promise(function (resolve, Reject) {
            connection.query("SELECT role.id, role.title, role.salary, department.name AS department_name FROM role INNER JOIN department ON role.department_id = department.id ORDER BY role.id;", (err, results) => {
                resolve(results);
            });
        });
    }
    async viewEmployees(connection) {
        return await new Promise(function (resolve, Reject) {
            connection.query(`SELECT e.id, 
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
    async addDepartment(connection) {
        const words = await inquirer.prompt([
            {
                type: "input",
                message: "What is the new Department's name?",
                name: "departmentName",
            }
        ]);
        return await new Promise(function (resolve, Reject) {
            connection.query(`INSERT INTO department (name)
            VALUES (?)`, [words.departmentName], (err, results) => {
                resolve(words.departmentName);
            });
        });
    }
    async addRole(connection) {
        const departments = await new Promise(function (resolve, Reject) {
            connection.query("SELECT * FROM department", (err, results) => {
                let outputArray = [];
                results.forEach(element => {
                    outputArray.push({
                        name: element.name,
                        value: element.id
                    });
                });
                resolve(outputArray);
            });
        }); 
        const words = await inquirer.prompt([
            {
                type: "input",
                message: "What is the new Roles's name?",
                name: "roleName",
            },
            {
                type: "input",
                message: "What is the new Roles's salary?",
                name: "roleSalary",
            },
            {
                type: "list",
                message: "What is the new Roles's department?",
                choices: departments,
                name: "roleDepartment",
            },
        ]);
        return await new Promise(function (resolve, Reject) {
            connection.query(`INSERT INTO role (title, salary, department_id)
            VALUES (?, ?, ?)`, [words.roleName, parseInt(words.roleSalary), words.roleDepartment], (err, results) => {
                resolve(words.roleName);
            });
        });
    }
    async addEmployee(connection) {
        const managers = await new Promise(function (resolve, Reject) {
            connection.query("SELECT * FROM employee", (err, results) => {
                let outputArray = [];
                for (const element of results){
                    outputArray.push({
                        name: element.first_name + " " + element.last_name,
                        value: element.id
                    });
                }
                outputArray.unshift({
                    name: "none",
                    value: null
                })
                resolve(outputArray);
            });
        }); 
        const roles = await new Promise(function (resolve, Reject) {
            connection.query("SELECT * FROM role", (err, results) => {
                let outputArray = [];
                for (const element of results){
                    outputArray.push({
                        name: element.title,
                        value: element.id
                    });
                }
                resolve(outputArray);
            });
        }); 
        const words = await inquirer.prompt([
            {
                type: "input",
                message: "What is the new Employee's first name?",
                name: "employeeFName",
            },
            {
                type: "input",
                message: "What is the new Employee's last name?",
                name: "employeeLName",
            },
            {
                type: "list",
                message: "What is the new Employee's Role?",
                choices: roles,
                name: "employeeRole",
            },
            {
                type: "list",
                message: "What is the new Employee's Manager?",
                choices: managers,
                name: "employeeManager",
            },
        ]);
        return await new Promise(function (resolve, Reject) {
            console.log(words);
            connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES (?, ?, ?, ?)`, [words.employeeFName, words.employeeLName, words.employeeRole, words.employeeManager], (err, results) => {
                resolve(words.employeeFName + " " + words.employeeLName);
            });
        });
    }
}
module.exports = new Database();