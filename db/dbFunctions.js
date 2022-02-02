const connection = require("./connection.js");

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
}
module.exports = new Database();