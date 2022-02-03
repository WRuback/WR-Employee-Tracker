const inquirer = require("inquirer");
class Database {
    // Gets the Object of the departments table from MySql.
    async viewDepartments(connection) {
        return await new Promise(function (resolve, Reject) {
            connection.query("SELECT * FROM department", (err, results) => {
                resolve(results);
            });
        });
    }
    // Gets the Object of the Roles table from MySql. 
    // Joins from department to display the deparment name.
    async viewRoles(connection) {
        return await new Promise(function (resolve, Reject) {
            connection.query("SELECT role.id, role.title, role.salary, department.name AS department_name FROM role LEFT JOIN department ON role.department_id = department.id ORDER BY role.id;", (err, results) => {
                resolve(results);
            });
        });
    }
    // Gets the Object of the Employee table from MySql. 
    // Joins from roles, the department to display the role and deparment names.
    async viewEmployees(connection) {
        return await new Promise(function (resolve, Reject) {
            connection.query(`SELECT e.id, 
        e.first_name, 
        e.last_name, 
        ROLE.title AS role, 
        ROLE.salary AS salary, 
        department.name AS department,
        concat(m.first_name, ' ', m.last_name) AS Manager
        FROM employee e
        LEFT JOIN ROLE ON e.role_id = ROLE.id 
        LEFT JOIN department ON ROLE.department_id = department.id
        LEFT JOIN employee m ON e.manager_id  = m.id 
        ORDER BY e.id; `, (err, results) => {
                resolve(results);
            });
        });
    }
    // Calls the Object of the employee Table, but orders them by manager, 
    // Using inner join to not get those with no manager.
    async viewEmployeesByManager(connection) {
        return await new Promise(function (resolve, Reject) {
            connection.query(`SELECT concat(m.first_name, ' ', m.last_name) AS Manager,
        e.first_name, 
        e.last_name,
        e.id, 
        ROLE.title AS role, 
        ROLE.salary AS salary, 
        department.name AS department
        FROM employee e
        LEFT JOIN ROLE ON e.role_id = ROLE.id 
        LEFT JOIN department ON ROLE.department_id = department.id
        INNER JOIN employee m ON e.manager_id  = m.id 
        ORDER BY m.first_name; `, (err, results) => {
                resolve(results);
            });
        });
    }
    // Calls the Object of the employee Table, but orders them by department, 
    // Using left join to get those with no department.
    async viewEmployeesByDepartment(connection) {
        return await new Promise(function (resolve, Reject) {
            connection.query(`SELECT department.name AS department,
        e.first_name, 
        e.last_name,
        e.id, 
        ROLE.title AS role, 
        ROLE.salary AS salary, 
        concat(m.first_name, ' ', m.last_name) AS Manager
        FROM employee e
        LEFT JOIN ROLE ON e.role_id = ROLE.id 
        LEFT JOIN department ON ROLE.department_id = department.id
        LEFT JOIN employee m ON e.manager_id  = m.id 
        ORDER BY department.name; `, (err, results) => {
                resolve(results);
            });
        });
    }
    // Get the department name and total slaries paid by them.
    // Does this by using the employee, getting the roles and department from Inner Joins,
    // Then groups them by department name for a sum function.
    async viewBudgets(connection) {
        return await new Promise(function (resolve, Reject) {
            connection.query(`SELECT department.name, SUM(role.salary) AS Salary_Budget
            FROM employee
            INNER JOIN role ON employee.role_id = role.id
            INNER JOIN department ON role.department_id = department.id 
            GROUP BY department.name`, (err, results) => {
                resolve(results);
            });
        });
    }
    // Inquirer prompts for the department name, then adds the department with a insert query.
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
    // Inquirer prompts for the role name and salary, 
    // Then prompts from the list of departments,
    // Then adds the role with a insert query.
    async addRole(connection) {
        // Queries for the departments, and reformats them to be used as a list in the inquirer prompts.
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
    // Inquirer prompts for the first name and last name, 
    // Then prompts from the list of roles and departments,
    // Then adds the employee with a insert query.
    async addEmployee(connection) {
        // Queries for the employees, and reformats them to be used as a list in the inquirer prompts.
        const managers = await new Promise(function (resolve, Reject) {
            connection.query("SELECT * FROM employee", (err, results) => {
                let outputArray = [];
                for (const element of results) {
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
        // Queries for the Roles, and reformats them to be used as a list in the inquirer prompts.
        const roles = await new Promise(function (resolve, Reject) {
            connection.query("SELECT * FROM role", (err, results) => {
                let outputArray = [];
                for (const element of results) {
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
    // Inquirer prompts from a list of employees, 
    // Then prompts from the list of roles,
    // Then updates the employee with a new role with the update query.
    async updateRole(connection) {
        // Queries for the employees, and reformats them to be used as a list in the inquirer prompts.
        const employee = await new Promise(function (resolve, Reject) {
            connection.query("SELECT * FROM employee", (err, results) => {
                let outputArray = [];
                for (const element of results) {
                    outputArray.push({
                        name: element.first_name + " " + element.last_name,
                        value: element.id
                    });
                }
                resolve(outputArray);
            });
        });
        const employeeSelection = await inquirer.prompt([
            {
                type: "list",
                message: "Which Employee is changing Roles?",
                choices: employee,
                name: "employee",
            }
        ]);
        // Queries for the Roles, and reformats them to be used as a list in the inquirer prompts.
        const roles = await new Promise(function (resolve, Reject) {
            connection.query("SELECT * FROM role", (err, results) => {
                let outputArray = [];
                for (const element of results) {
                    outputArray.push({
                        name: element.title,
                        value: element.id
                    });
                }
                resolve(outputArray);
            });
        });
        const roleSelection = await inquirer.prompt([
            {
                type: "list",
                message: "What is their new Role?",
                choices: roles,
                name: "role",
            }
        ]);
        return await new Promise(function (resolve, Reject) {
            connection.query(`UPDATE employee
            SET role_id = ?
            WHERE id = ?;`, [roleSelection.role, employeeSelection.employee], (err, results) => {
                resolve("complete");
            });
        });
    }
    // Inquirer prompts from a list of employees, 
    // Then prompts from the list of employees to be the manager,
    // Then updates the employee with a new manager with the update query.
    async updateManager(connection) {
        // Queries for the employees, and reformats them to be used as a list in the inquirer prompts.
        const employee = await new Promise(function (resolve, Reject) {
            connection.query("SELECT * FROM employee", (err, results) => {
                let outputArray = [];
                for (const element of results) {
                    outputArray.push({
                        name: element.first_name + " " + element.last_name,
                        value: element.id
                    });
                }
                resolve(outputArray);
            });
        });
        const employeeSelection = await inquirer.prompt([
            {
                type: "list",
                message: "Which Employee is changing Managers?",
                choices: employee,
                name: "employee",
            }
        ]);
        // Queries for the employees, excludes the current one, and reformats them to be used as a list in the inquirer prompts.
        const manager = await new Promise(function (resolve, Reject) {
            connection.query("SELECT * FROM employee", (err, results) => {
                let outputArray = [];
                for (const element of results) {
                    if (employeeSelection.employee !== element.id) {
                        outputArray.push({
                            name: element.first_name + " " + element.last_name,
                            value: element.id
                        });
                    }
                }
                outputArray.unshift({
                    name: "none",
                    value: null
                })
                resolve(outputArray);
            });
        });
        const managerSelection = await inquirer.prompt([
            {
                type: "list",
                message: "Who is their new Manager?",
                choices: manager,
                name: "manager",
            }
        ]);
        return await new Promise(function (resolve, Reject) {
            connection.query(`UPDATE employee
            SET manager_id = ?
            WHERE id = ?;`, [managerSelection.manager, employeeSelection.employee], (err, results) => {
                resolve("complete");
            });
        });
    }
    // Inquirer prompts from a list of departments, 
    // Then deletes the department with a query.
    // Does not remove the employees or roles linked to them.
    async deleteDepartment(connection) {
        // Queries for the departments, and reformats them to be used as a list in the inquirer prompts.
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
                type: "list",
                message: "What is the Department you want to delete?",
                choices: departments,
                name: "departmentID",
            }
        ]);
        return await new Promise(function (resolve, Reject) {
            connection.query(`DELETE FROM department
            WHERE id = ?;`, [words.departmentID], (err, results) => {
                resolve(words.departmentID);
            });
        });
    }
    // Inquirer prompts from a list of roles, 
    // Then deletes the roles with a query.
    // Does not remove the employeeslinked to them.
    async deleteRole(connection) {
        // Queries for the roles, and reformats them to be used as a list in the inquirer prompts.
        const roles = await new Promise(function (resolve, Reject) {
            connection.query("SELECT * FROM role", (err, results) => {
                let outputArray = [];
                results.forEach(element => {
                    outputArray.push({
                        name: element.title,
                        value: element.id
                    });
                });
                resolve(outputArray);
            });
        });
        const words = await inquirer.prompt([
            {
                type: "list",
                message: "What is the Role you want to delete?",
                choices: roles,
                name: "roleID",
            }
        ]);
        return await new Promise(function (resolve, Reject) {
            connection.query(`DELETE FROM role
            WHERE id = ?;`, [words.roleID], (err, results) => {
                resolve(words.roleID);
            });
        });
    }
    // Inquirer prompts from a list of employees, 
    // Then deletes the employee with a query.
    async deleteEmployee(connection) {
        // Queries for the employees, and reformats them to be used as a list in the inquirer prompts.
        const employee = await new Promise(function (resolve, Reject) {
            connection.query("SELECT * FROM employee", (err, results) => {
                let outputArray = [];
                for (const element of results) {
                    outputArray.push({
                        name: element.first_name + " " + element.last_name,
                        value: element.id
                    });
                }
                resolve(outputArray);
            });
        });
        const words = await inquirer.prompt([
            {
                type: "list",
                message: "Who is the Employee you want to delete?",
                choices: employee,
                name: "employeeID",
            }
        ]);
        return await new Promise(function (resolve, Reject) {
            connection.query(`DELETE FROM employee
            WHERE id = ?;`, [words.employeeID], (err, results) => {
                resolve(words.employeeID);
            });
        });
    }
}

// Eports to be used in the database.
module.exports = new Database();