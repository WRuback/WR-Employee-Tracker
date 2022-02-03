module.exports = [
    {
        type: "list",
        message: "What would you like to do?",
        choices: ["view all departments", 
        "view all roles", 
        "view all employees", 
        "add a department", 
        "add a role", 
        "add an employee", 
        "update an employee role",
        "update employee manager",
        "View employees by manager",
        "delete a department.",
        "delete a role.",
        "delete an employee.",
        "view total budget (combined salary) of a department.",
        "end this program."],
        name: "userChoice",
        pageSize: 6
    }
]